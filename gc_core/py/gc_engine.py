# -*- encoding: UTF-8 -*-

import re
import sys
import os
import traceback

from ..ibdawg import IBDAWG
from ..echo import echo
from . import gc_options


__all__ = [ "lang", "locales", "pkg", "name", "version", "author", \
            "load", "parse", "getDictionary", \
            "setOptions", "getOptions", "getOptionsLabels", "resetOptions", \
            "ignoreRule", "resetIgnoreRules" ]

__version__ = u"${version}"


lang = u"${lang}"
locales = ${loc}
pkg = u"${implname}"
name = u"${name}"
version = u"${version}"
author = u"${author}"

# commons regexes
_zEndOfSentence = re.compile(u'([.?!:;…][ .?!… »”")]*|.$)')
_zBeginOfParagraph = re.compile(u"^\W*")
_zEndOfParagraph = re.compile(u"\W*$")
_zNextWord = re.compile(u" +(\w[\w-]*)")
_zPrevWord = re.compile(u"(\w[\w-]*) +$")

# grammar rules and dictionary
_rules = None
_dOptions = dict(gc_options.dOpt)       # duplication necessary, to be able to reset to default
_aIgnoredRules = set()
_oDict = None
_dAnalyses = {}                         # cache for data from dictionary

_GLOBALS = globals()


#### Parsing

def parse (sText, sCountry="${country_default}", bDebug=False, dOptions=None):
    "analyses the paragraph sText and returns list of errors"
    aErrors = None
    sAlt = sText
    dDA = {}
    dOpt = _dOptions  if not dOptions  else dOptions

    # parse paragraph
    try:
        sNew, aErrors = _proofread(sText, sAlt, 0, True, dDA, sCountry, dOpt, bDebug)
        if sNew:
            sText = sNew
    except:
        raise

    # parse sentences
    for iStart, iEnd in _getSentenceBoundaries(sText):
        if 4 < (iEnd - iStart) < 2000:
            dDA.clear()
            try:
                _, errs = _proofread(sText[iStart:iEnd], sAlt[iStart:iEnd], iStart, False, dDA, sCountry, dOpt, bDebug)
                aErrors.extend(errs)
            except:
                raise
    return aErrors


def _getSentenceBoundaries (sText):
    iStart = _zBeginOfParagraph.match(sText).end()
    for m in _zEndOfSentence.finditer(sText):
        yield (iStart, m.end())
        iStart = m.end()


def _proofread (s, sx, nOffset, bParagraph, dDA, sCountry, dOptions, bDebug):
    aErrs = []
    bChange = False
    
    if not bParagraph:
        # after the first pass, we modify automatically some characters
        if u" " in s:
            s = s.replace(u" ", u' ') # nbsp
            bChange = True
        if u" " in s:
            s = s.replace(u" ", u' ') # nnbsp
            bChange = True
        if u"@" in s:
            s = s.replace(u"@", u' ')
            bChange = True
        if u"'" in s:
            s = s.replace(u"'", u"’")
            bChange = True
        if u"‑" in s:
            s = s.replace(u"‑", u"-") # nobreakdash
            bChange = True

    bIdRule = option('idrule')

    for sOption, lRuleGroup in _getRules(bParagraph):
        if not sOption or dOptions.get(sOption, False):
            for zRegex, bUppercase, sRuleId, lActions in lRuleGroup:
                if sRuleId not in _aIgnoredRules:
                    for m in zRegex.finditer(s):
                        for sFuncCond, cActionType, sWhat, *eAct in lActions:
                            # action in lActions: [ condition, action type, replacement/suggestion/action[, iGroup[, message, URL]] ]
                            try:
                                if not sFuncCond or _GLOBALS[sFuncCond](s, sx, m, dDA, sCountry):
                                    if cActionType == "-":
                                        # grammar error
                                        # (text, replacement, nOffset, m, iGroup, sId, bUppercase, sURL, bIdRule)
                                        aErrs.append(_createError(s, sWhat, nOffset, m, eAct[0], sRuleId, bUppercase, eAct[1], eAct[2], bIdRule, sOption))
                                    elif cActionType == "~":
                                        # text processor
                                        s = _rewrite(s, sWhat, eAct[0], m, bUppercase)
                                        bChange = True
                                        if bDebug:
                                            echo(u"~ " + s + "  -- " + m.group(eAct[0]) + "  # " + sRuleId)
                                    elif cActionType == "=":
                                        # disambiguation
                                        _GLOBALS[sWhat](s, m, dDA)
                                        if bDebug:
                                            echo(u"= " + m.group(0) + "  # " + sRuleId + "\nDA: " + str(dDA))
                                    else:
                                        echo("# error: unknown action at " + sRuleId)
                            except Exception as e:
                                raise Exception(str(e), sRuleId)
    if bChange:
        return (s, aErrs)
    return (False, aErrs)


def _createWriterError (s, sRepl, nOffset, m, iGroup, sId, bUppercase, sMsg, sURL, bIdRule, sOption):
    "error for Writer (LO/OO)"
    xErr = SingleProofreadingError()
    #xErr = uno.createUnoStruct( "com.sun.star.linguistic2.SingleProofreadingError" )
    xErr.nErrorStart        = nOffset + m.start(iGroup)
    xErr.nErrorLength       = m.end(iGroup) - m.start(iGroup)
    xErr.nErrorType         = PROOFREADING
    xErr.aRuleIdentifier    = sId
    # suggestions
    if sRepl[0:1] == "=":
        sugg = _GLOBALS[sRepl[1:]](s, m)
        if sugg:
            if bUppercase and m.group(iGroup)[0:1].isupper():
                xErr.aSuggestions = tuple(map(str.capitalize, sugg.split("|")))
            else:
                xErr.aSuggestions = tuple(sugg.split("|"))
        else:
            xErr.aSuggestions = ()
    elif sRepl == "_":
        xErr.aSuggestions = ()
    else:
        if bUppercase and m.group(iGroup)[0:1].isupper():
            xErr.aSuggestions = tuple(map(str.capitalize, m.expand(sRepl).split("|")))
        else:
            xErr.aSuggestions = tuple(m.expand(sRepl).split("|"))
    # Message
    if sMsg[0:1] == "=":
        sMessage = _GLOBALS[sMsg[1:]](s, m)
    else:
        sMessage = m.expand(sMsg)
    xErr.aShortComment      = sMessage   # sMessage.split("|")[0]     # in context menu
    xErr.aFullComment       = sMessage   # sMessage.split("|")[-1]    # in dialog
    if bIdRule:
        xErr.aShortComment += "  # " + sId
    # URL
    if sURL:
        p = PropertyValue()
        p.Name = "FullCommentURL"
        p.Value = sURL
        xErr.aProperties    = (p,)
    else:
        xErr.aProperties    = ()
    return xErr


def _createDictError (s, sRepl, nOffset, m, iGroup, sId, bUppercase, sMsg, sURL, bIdRule, sOption):
    "error as a dictionary"
    dErr = {}
    dErr["nStart"]          = nOffset + m.start(iGroup)
    dErr["nEnd"]            = nOffset + m.end(iGroup)
    dErr["sRuleId"]         = sId
    dErr["sType"]           = sOption  if sOption  else "notype"
    # suggestions
    if sRepl[0:1] == "=":
        sugg = _GLOBALS[sRepl[1:]](s, m)
        if sugg:
            if bUppercase and m.group(iGroup)[0:1].isupper():
                dErr["aSuggestions"] = list(map(str.capitalize, sugg.split("|")))
            else:
                dErr["aSuggestions"] = sugg.split("|")
        else:
            dErr["aSuggestions"] = ()
    elif sRepl == "_":
        dErr["aSuggestions"] = ()
    else:
        if bUppercase and m.group(iGroup)[0:1].isupper():
            dErr["aSuggestions"] = list(map(str.capitalize, m.expand(sRepl).split("|")))
        else:
            dErr["aSuggestions"] = m.expand(sRepl).split("|")
    # Message
    if sMsg[0:1] == "=":
        sMessage = _GLOBALS[sMsg[1:]](s, m)
    else:
        sMessage = m.expand(sMsg)
    dErr["sMessage"]      = sMessage
    if bIdRule:
        dErr["sMessage"] += "  # " + sId
    # URL
    dErr["URL"] = sURL  if sURL  else ""
    return dErr


def _rewrite (s, sRepl, iGroup, m, bUppercase):
    "text processor: write sRepl in s at iGroup position"
    ln = m.end(iGroup) - m.start(iGroup)
    if sRepl == "*":
        sNew = " " * ln
    elif sRepl == ">" or sRepl == "_" or sRepl == u"~":
        sNew = sRepl + " " * (ln-1)
    elif sRepl == "@":
        sNew = "@" * ln
    elif sRepl[0:1] == "=":
        if sRepl[1:2] != "@":
            sNew = _GLOBALS[sRepl[1:]](s, m)
            sNew = sNew + " " * (ln-len(sNew))
        else:
            sNew = _GLOBALS[sRepl[2:]](s, m)
            sNew = sNew + "@" * (ln-len(sNew))
        if bUppercase and m.group(iGroup)[0:1].isupper():
            sNew = sNew.capitalize()
    else:
        sNew = m.expand(sRepl)
        sNew = sNew + " " * (ln-len(sNew))
    return s[0:m.start(iGroup)] + sNew + s[m.end(iGroup):]


def ignoreRule (sId):
    _aIgnoredRules.add(sId)


def resetIgnoreRules ():
    _aIgnoredRules.clear()


#### init

try:
    # LibreOffice / OpenOffice
    from com.sun.star.linguistic2 import SingleProofreadingError
    from com.sun.star.text.TextMarkupType import PROOFREADING
    from com.sun.star.beans import PropertyValue
    #import lightproof_handler_${implname} as opt
    _createError = _createWriterError
except ImportError:
    _createError = _createDictError


def load ():
    global _oDict
    try:
        _oDict = IBDAWG("${binary_dic}")
    except:
        traceback.print_exc()


def setOptions (dOpt):
    _dOptions.update(dOpt)


def getOptions ():
    return _dOptions


def getOptionsLabels (sLang):
    return gc_options.getUI(sLang)


def resetOptions ():
    global _dOptions
    _dOptions = dict(gc_options.dOpt)


def getDictionary ():
    return _oDict


def _getRules (bParagraph):
    try:
        if not bParagraph:
            return _rules.lSentenceRules
        return _rules.lParagraphRules
    except:
        _loadRules()
    if not bParagraph:
        return _rules.lSentenceRules
    return _rules.lParagraphRules


def _loadRules2 ():
    from itertools import chain
    from . import gc_rules
    global _rules
    _rules = gc_rules
    # compile rules regex
    for rule in chain(_rules.lParagraphRules, _rules.lSentenceRules):
        try:
            rule[1] = re.compile(rule[1])
        except:
            echo("Bad regular expression in # " + str(rule[3]))
            rule[1] = "(?i)<Grammalecte>"


def _loadRules ():
    from itertools import chain
    from . import gc_rules
    global _rules
    _rules = gc_rules
    # compile rules regex
    for rulegroup in chain(_rules.lParagraphRules, _rules.lSentenceRules):
        for rule in rulegroup[1]:
            try:
                rule[0] = re.compile(rule[0])
            except:
                echo("Bad regular expression in # " + str(rule[2]))
                rule[0] = "(?i)<Grammalecte>"


def _getPath ():
    return os.path.join(os.path.dirname(sys.modules[__name__].__file__), __name__ + ".py")



#### common functions

def option (sOpt):
    "return True if option sOpt is active"
    return _dOptions.get(sOpt, False)


def displayInfo (dDA, tWord):
    "for debugging: retrieve info of word"
    if not tWord:
        echo("> nothing to find")
        return True
    if tWord[1] not in _dAnalyses and not _storeMorphFromFSA(tWord[1]):
        echo("> not in FSA")
        return True
    if tWord[0] in dDA:
        echo("DA: " + str(dDA[tWord[0]]))
    echo("FSA: " + str(_dAnalyses[tWord[1]]))
    return True


def _storeMorphFromFSA (sWord):
    "retrieves morphologies list from _oDict -> _dAnalyses"
    global _dAnalyses
    _dAnalyses[sWord] = _oDict.getMorph(sWord)
    return True  if _dAnalyses[sWord]  else False


def morph (dDA, tWord, sPattern, bStrict=True, bNoWord=False):
    "analyse a tuple (position, word), return True if sPattern in morphologies (disambiguation on)"
    if not tWord:
        return bNoWord
    if tWord[1] not in _dAnalyses and not _storeMorphFromFSA(tWord[1]):
        return False
    lMorph = dDA[tWord[0]]  if tWord[0] in dDA  else _dAnalyses[tWord[1]]
    if not lMorph:
        return False
    p = re.compile(sPattern)
    if bStrict:
        return all(p.search(s)  for s in lMorph)
    return any(p.search(s)  for s in lMorph)


def morphex (dDA, tWord, sPattern, sNegPattern, bNoWord=False):
    "analyse a tuple (position, word), returns True if not sNegPattern in word morphologies and sPattern in word morphologies (disambiguation on)"
    if not tWord:
        return bNoWord
    if tWord[1] not in _dAnalyses and not _storeMorphFromFSA(tWord[1]):
        return False
    lMorph = dDA[tWord[0]]  if tWord[0] in dDA  else _dAnalyses[tWord[1]]
    # check negative condition
    np = re.compile(sNegPattern)
    if any(np.search(s)  for s in lMorph):
        return False
    # search sPattern
    p = re.compile(sPattern)
    return any(p.search(s)  for s in lMorph)


def analyse (sWord, sPattern, bStrict=True):
    "analyse a word, return True if sPattern in morphologies (disambiguation off)"
    if sWord not in _dAnalyses and not _storeMorphFromFSA(sWord):
        return False
    if not _dAnalyses[sWord]:
        return False
    p = re.compile(sPattern)
    if bStrict:
        return all(p.search(s)  for s in _dAnalyses[sWord])
    return any(p.search(s)  for s in _dAnalyses[sWord])


def analysex (sWord, sPattern, sNegPattern):
    "analyse a word, returns True if not sNegPattern in word morphologies and sPattern in word morphologies (disambiguation off)"
    if sWord not in _dAnalyses and not _storeMorphFromFSA(sWord):
        return False
    # check negative condition
    np = re.compile(sNegPattern)
    if any(np.search(s)  for s in _dAnalyses[sWord]):
        return False
    # search sPattern
    p = re.compile(sPattern)
    return any(p.search(s)  for s in _dAnalyses[sWord])


def stem (sWord):
    "returns a list of sWord's stems"
    if not sWord:
        return []
    if sWord not in _dAnalyses and not _storeMorphFromFSA(sWord):
        return []
    return [ s[1:s.find(" ")]  for s in _dAnalyses[sWord] ]


## functions to get text outside pattern scope

# warning: check compile_rules.py to understand how it works

def nextword (s, iStart, n):
    "get the nth word of the input string or empty string"
    m = re.match(u"( +[\\w%-]+){" + str(n-1) + u"} +([\\w%-]+)", s[iStart:])
    if not m:
        return None
    return (iStart+m.start(2), m.group(2))


def prevword (s, iEnd, n):
    "get the (-)nth word of the input string or empty string"
    m = re.search(u"([\\w%-]+) +([\\w%-]+ +){" + str(n-1) + u"}$", s[:iEnd])
    if not m:
        return None
    return (m.start(1), m.group(1))


def nextword1 (s, iStart):
    "get next word (optimization)"
    m = _zNextWord.match(s[iStart:])
    if not m:
        return None
    return (iStart+m.start(1), m.group(1))


def prevword1 (s, iEnd):
    "get previous word (optimization)"
    m = _zPrevWord.search(s[:iEnd])
    if not m:
        return None
    return (m.start(1), m.group(1))


def look (s, sPattern, sNegPattern=None):
    "seek sPattern in s (before/after/fulltext), if sNegPattern not in s"
    if sNegPattern and re.search(sNegPattern, s):
        return False
    if re.search(sPattern, s):
        return True
    return False


def look_chk1 (dDA, s, nOffset, sPattern, sPatternGroup1, sNegPatternGroup1=None):
    "returns True if s has pattern sPattern and m.group(1) has pattern sPatternGroup1"
    m = re.search(sPattern, s)
    if not m:
        return False
    try:
        sWord = m.group(1)
        nPos = m.start(1) + nOffset
    except:
        #print("Missing group 1")
        return False
    if sNegPatternGroup1:
        return morphex(dDA, (nPos, sWord), sPatternGroup1, sNegPatternGroup1)
    return morph(dDA, (nPos, sWord), sPatternGroup1, False)


#### Disambiguator

def select (dDA, nPos, sWord, sPattern, lDefault=None):
    if not sWord:
        return True
    if nPos in dDA:
        return True
    if sWord not in _dAnalyses and not _storeMorphFromFSA(sWord):
        return True
    if len(_dAnalyses[sWord]) == 1:
        return True
    lSelect = [ sMorph  for sMorph in _dAnalyses[sWord]  if re.search(sPattern, sMorph) ]
    if lSelect:
        if len(lSelect) != len(_dAnalyses[sWord]):
            dDA[nPos] = lSelect
            #echo("= "+sWord+" "+str(dDA.get(nPos, "null")))
    elif lDefault:
        dDA[nPos] = lDefault
        #echo("= "+sWord+" "+str(dDA.get(nPos, "null")))
    return True


def exclude (dDA, nPos, sWord, sPattern, lDefault=None):
    if not sWord:
        return True
    if nPos in dDA:
        return True
    if sWord not in _dAnalyses and not _storeMorphFromFSA(sWord):
        return True
    if len(_dAnalyses[sWord]) == 1:
        return True
    lSelect = [ sMorph  for sMorph in _dAnalyses[sWord]  if not re.search(sPattern, sMorph) ]
    if lSelect:
        if len(lSelect) != len(_dAnalyses[sWord]):
            dDA[nPos] = lSelect
            #echo("= "+sWord+" "+str(dDA.get(nPos, "null")))
    elif lDefault:
        dDA[nPos] = lDefault
        #echo("= "+sWord+" "+str(dDA.get(nPos, "null")))
    return True


def define (dDA, nPos, lMorph):
    dDA[nPos] = lMorph
    #echo("= "+str(nPos)+" "+str(dDA[nPos]))
    return True


#### GRAMMAR CHECKER PLUGINS

${plugins}


${generated}
