// Grammar checker engine


// String

String.prototype._count = function (sSearch, bOverlapping) {
    // http://jsperf.com/string-ocurrence-split-vs-match/8
    if (sSearch.length <= 0) {
        return this.length + 1;
    }
    let nOccur = 0;
    let iPos = 0;
    let nStep = (bOverlapping) ? 1 : sSearch.length;
    while ((iPos = this.indexOf(sSearch, iPos)) >= 0) {
        nOccur++;
        iPos += nStep;
    }
    return nOccur;
}
String.prototype._isDigit = function () {
    return (this.search(/^[0-9⁰¹²³⁴⁵⁶⁷⁸⁹]+$/) !== -1);
}
String.prototype._isLowerCase = function () {
    return (this.search(/^[a-zà-öø-ÿ0-9-]+$/) !== -1);
}
String.prototype._isUpperCase = function () {
    return (this.search(/^[A-ZÀ-ÖØ-ß0-9-]+$/) !== -1);
}
String.prototype._isTitle = function () {
    return (this.search(/^[A-ZÀ-ÖØ-ß][a-zà-öø-ÿ0-9'’-]+$/) !== -1);
}
String.prototype._toCapitalize = function () {
    return this.slice(0,1).toUpperCase() + this.slice(1).toLowerCase();
}
String.prototype._expand = function (oMatch) {
    let sNew = this;
    for (let i = 0; i < oMatch.length ; i++) {
        let z = new RegExp("\\\\"+parseInt(i), "g");
        sNew = sNew.replace(z, oMatch[i]);
    }
    return sNew;
}
String.prototype._trimRight = function (sChars) {
    let z = new RegExp("["+sChars+"]+$");
    return this.replace(z, "");
}
String.prototype._trimLeft = function (sChars) {
    let z = new RegExp("^["+sChars+"]+");
    return this.replace(z, "");
}
String.prototype._trim = function (sChars) {
    let z1 = new RegExp("^["+sChars+"]+");
    let z2 = new RegExp("["+sChars+"]+$");
    return this.replace(z1, "").replace(z2, "");
}


// regex

RegExp.prototype._exec2 = function (sText, aGroupsPos, aNegLookBefore=null) {
    let m;
    while ((m = this.exec(sText)) !== null) {
        // we have to iterate over sText here too
        // because first match doesn’t imply it’s a valid match according to negative lookbefore assertions,
        // and even if first match is finally invalid, it doesn’t mean the following eligible matchs would be invalid too.
        if (aNegLookBefore !== null) {
            // check negative look before assertions
            if ( !aNegLookBefore.some(sRegEx  =>  (RegExp.leftContext.search(sRegEx) >= 0)) ) {
                break;
            }
        } else {
            break;
        }
    }
    if (m === null) {
        return null;
    }

    let codePos;
    let iPos = 0;
    m.start = [m.index];
    m.end = [this.lastIndex];
    if (m.length > 1) {
        // there is subgroup(s)
        if (aGroupsPos !== null) {
            // aGroupsPos is defined
            for (let i = 1; i <= m.length-1; i++) {
                codePos = aGroupsPos[i-1];
                if (typeof codePos === "number") {
                    m.start.push(m.index + codePos);
                    m.end.push(m.index + codePos + m[i].length);
                } else if (codePos === "$") {
                    m.start.push(this.lastIndex - m[i].length);
                    m.end.push(this.lastIndex);
                } else if (codePos === "w") {
                    iPos = m[0].search("[ ~]"+m[i]+"[ ,]") + 1 + m.index
                    m.start.push(iPos);
                    m.end.push(iPos + m[i].length)
                } else if (codePos === "*") {
                    iPos = m[0].indexOf(m[i]) + m.index;
                    m.start.push(iPos);
                    m.end.push(iPos + m[i].length)
                } else if (codePos === "**") {
                    iPos = m[0].indexOf(m[i], m.end[i-1]-m.index) + m.index;
                    //console.log("i:"+i+" pos:"+iPos+" end(-1):"+m.end[i-1])
                    m.start.push(iPos);
                    m.end.push(iPos + m[i].length)
                } else if (codePos.startsWith(">")) {
                    // >x:_
                    // todo: look in substring x
                    iPos = m[0].indexOf(m[i]) + m.index;
                    m.start.push(iPos);
                    m.end.push(iPos + m[i].length);
                } else {
                    console.error("# Error: unknown positioning code in regex [" + this.source + "], for group[" + i.toString() +"], code: [" + codePos + "]");
                }
            }
        } else {
            // no aGroupsPos
            for (let subm of m.slice(1)) {
                iPos = m[0].indexOf(subm) + m.index;
                m.start.push(iPos);
                m.end.push(iPos + subm.length);
            }
        }
    }
    return m;
}


// Map

Map.prototype._shallowCopy = function () {
    let oNewMap = new Map();
    for (let [key, val] of this.entries()) {
        oNewMap.set(key, val);
    }
    return oNewMap;
}

Map.prototype._get = function (key, defaultValue) {
    let res = this.get(key);
    if (res !== undefined) {
        return res;
    }
    return defaultValue;
}

Map.prototype._toString = function () {
    // Default .toString() gives nothing useful
    let sRes = "{ ";
    for (let [k, v] of this.entries()) {
        sRes += (typeof k === "string") ? '"' + k + '": ' : k.toString() + ": ";
        sRes += (typeof v === "string") ? '"' + v + '", ' : v.toString() + ", ";
    }
    sRes = sRes.slice(0, -2) + " }"
    return sRes;
}

Map.prototype._update = function (dDict) {
    for (let [k, v] of dDict.entries()) {
        this.set(k, v);
    }
}

Map.prototype._updateOnlyExistingKeys = function (dDict) {
    for (let [k, v] of dDict.entries()) {
        if (this.has(k)){
            this.set(k, v);
        }
    }
}



function capitalizeArray (aArray) {
    // can’t map on user defined function??
    let aNew = [];
    for (let i = 0; i < aArray.length; i = i + 1) {
        aNew[i] = aArray[i]._toCapitalize();
    }
    return aNew;
}

const ibdawg = require("resource://grammalecte/ibdawg.js");
const helpers = require("resource://grammalecte/helpers.js");
const gc_options = require("resource://grammalecte/fr/gc_options.js");
const cr = require("resource://grammalecte/fr/cregex.js")
const text = require("resource://grammalecte/text.js");
const echo = require("resource://grammalecte/helpers.js").echo;

const lang = "fr";
const locales = {'fr-FR': ['fr', 'FR', ''], 'fr-BE': ['fr', 'BE', ''], 'fr-MC': ['fr', 'MC', ''], 'fr-LU': ['fr', 'LU', ''], 'fr-CH': ['fr', 'CH', ''], 'fr-CA': ['fr', 'CA', '']};
const pkg = "grammalecte";
const name = "Grammalecte";
const version = "0.5.4";
const author = "Olivier R.";

// commons regexes
const _zEndOfSentence = new RegExp ('([.?!:;…][ .?!… »”")]*|.$)', "g");
const _zBeginOfParagraph = new RegExp ("^[-  –—.,;?!…]*", "ig");
const _zEndOfParagraph = new RegExp ("[-  .,;?!…–—]*$", "ig");

// grammar rules and dictionary
//const _rules = require("./gc_rules.js");
const _rules = require("resource://grammalecte/fr/gc_rules.js");
let _dOptions = gc_options.dOpt._shallowCopy();     // duplication necessary, to be able to reset to default
let _aIgnoredRules = new Set();
let _oDict = null
let _dAnalyses = new Map();                        // cache for data from dictionary


///// Parsing

function parse (sText, sCountry="FR", bDebug=false) {
    // analyses the paragraph sText and returns list of errors
    let aErrors;
    let errs;
    let sAlt = sText;
    let dDA = new Map();
    let sNew = "";

    // analyze by paragraph
    try {
        [sNew, aErrors] = _proofread(sText, sAlt, 0, true, dDA, sCountry, bDebug);
        if (sNew) {
            sText = sNew;
        }
    }
    catch (e) {
        helpers.logerror(e);
    }

    for (let [iStart, iEnd] of _getSentenceBoundaries(sText)) {
        if (4 < (iEnd - iStart) < 2000) {
            dDA.clear();
            try {
                [sNew, errs] = _proofread(sText.slice(iStart, iEnd), sAlt.slice(iStart, iEnd), iStart, false, dDA, sCountry, bDebug);
                if (sNew) {
                    sText = sText.slice(0, iStart) + sNew + sText.slice(iEnd);
                }
                aErrors = aErrors.concat(errs);
            }
            catch (e) {
                helpers.logerror(e);
            }
        }
    }
    return aErrors;
}

function* _getSentenceBoundaries (sText) {
    let mBeginOfSentence = _zBeginOfParagraph.exec(sText)
    let iStart = _zBeginOfParagraph.lastIndex;
    let m;
    while ((m = _zEndOfSentence.exec(sText)) !== null) {
        yield [iStart, _zEndOfSentence.lastIndex];
        iStart = _zEndOfSentence.lastIndex;
    }
}

function _proofread (s, sx, nOffset, bParagraph, dDA, sCountry, bDebug) {
    let aErrs = [];
    let bChange = false;
    //echo("s: " + s);
    if (!bParagraph) {
        // after the first pass, we remove automatically some characters, and change some others
        if (s.includes(" ")) {
            s = s.replace(/ /g, ' '); // nbsp
            bChange = true;
        }
        if (s.includes(" ")) {
            s = s.replace(/ /g, ' '); // snbsp
            bChange = true;
        }
        if (s.includes("@")) {
            s = s.replace(/@/g, ' ');
            bChange = true;
        }
        if (s.includes("'")) {
            s = s.replace(/'/g, "’");
            bChange = true;
        }
        if (s.includes("‑")) {
            s = s.replace(/‑/g, "-"); // nobreakdash
            bChange = true;
        }
    }

    let bIdRule = option('idrule');
    let m;

    for (let [sOption, zRegex, bUppercase, sRuleId, lActions, lGroups, lNegLookBefore] of _getRules(bParagraph)) {
        if ((!sOption || option(sOption)) && !_aIgnoredRules.has(sRuleId)) {
            while ((m = zRegex._exec2(s, lGroups, lNegLookBefore)) !== null) {
                /*if (bDebug) {
                    echo(">>>> Rule # " + sRuleId + " - Text: " + s + " opt: "+ sOption);
                }*/
                for (let [sFuncCond, cActionType, sWhat, ...eAct] of lActions) {
                // action in lActions: [ condition, action type, replacement/suggestion/action[, iGroup[, message, URL]] ]
                    try {
                        //echo(oEvalFunc[sFuncCond]);
                        if (!sFuncCond || oEvalFunc[sFuncCond](s, sx, m, dDA, sCountry)) {
                            switch (cActionType) {
                                case "-":
                                    // grammar error
                                    //echo("-> error detected in " + sRuleId + "\nzRegex: " + zRegex.source);
                                    aErrs.push(_createError(s, sWhat, nOffset, m, eAct[0], sRuleId, bUppercase, eAct[1], eAct[2], bIdRule, sOption));
                                    break;
                                case "~":
                                    // text processor
                                    //echo("-> text processor by " + sRuleId + "\nzRegex: " + zRegex.source);
                                    s = _rewrite(s, sWhat, eAct[0], m, bUppercase);
                                    bChange = true;
                                    if (bDebug) {
                                        echo("~ " + s + "  -- " + m[eAct[0]] + "  # " + sRuleId);
                                    }
                                    break;
                                case "=":
                                    // disambiguation
                                    //echo("-> disambiguation by " + sRuleId + "\nzRegex: " + zRegex.source);
                                    oEvalFunc[sWhat](s, m, dDA);
                                    if (bDebug) {
                                        echo("= " + m[0] + "  # " + sRuleId + "\nDA: " + dDA._toString());
                                    }
                                    break;
                                default:
                                    echo("# error: unknown action at " + sRuleId);
                            }
                        }
                    }
                    catch (e) {
                        echo("# id-rule:" + sRuleId);
                        helpers.logerror(e);
                    }
                }
            }
        }
    }
    if (bChange) {
        return [s, aErrs];
    }
    return [false, aErrs];
}

function _createError (s, sRepl, nOffset, m, iGroup, sId, bUppercase, sMsg, sURL, bIdRule, sOption) {
    let oErr = {};
    oErr["nStart"] = nOffset + m.start[iGroup];
    oErr["nEnd"] = nOffset + m.end[iGroup];
    oErr["sRuleId"] = sId;
    oErr["sType"] = sOption;
    // suggestions
    if (sRepl[0] === "=") {
        let sugg = oEvalFunc[sRepl.slice(1)](s, m);
        if (sugg) {
            if (bUppercase && m[iGroup].slice(0,1)._isUpperCase()) {
                oErr["aSuggestions"] = capitalizeArray(sugg.split("|"));
            } else {
                oErr["aSuggestions"] = sugg.split("|");
            }
        } else {
            oErr["aSuggestions"] = [];
        }
    } else if (sRepl == "_") {
        oErr["aSuggestions"] = [];
    } else {
        if (bUppercase && m[iGroup].slice(0,1)._isUpperCase()) {
            oErr["aSuggestions"] = capitalizeArray(sRepl._expand(m).split("|"));
        } else {
            oErr["aSuggestions"] = sRepl._expand(m).split("|");
        }
    }
    // Message
    if (sMsg[0] === "=") {
        sMessage = oEvalFunc[sMsg.slice(1)](s, m)
    } else {
        sMessage = sMsg._expand(m);
    }
    if (bIdRule) {
        sMessage += "  # " + sId;
    }
    oErr["sMessage"] = sMessage;
    // URL
    oErr["URL"] = sURL || "";
    return oErr;
}

function _rewrite (s, sRepl, iGroup, m, bUppercase) {
    // text processor: write sRepl in s at iGroup position"
    let ln = m.end[iGroup] - m.start[iGroup];
    let sNew = "";
    if (sRepl === "*") {
        sNew = " ".repeat(ln);
    } else if (sRepl === ">" || sRepl === "_" || sRepl === "~") {
        sNew = sRepl + " ".repeat(ln-1);
    } else if (sRepl === "@") {
        sNew = "@".repeat(ln);
    } else if (sRepl.slice(0,1) === "=") {
        if (sRepl.slice(1,2) != "@") {
            sNew = oEvalFunc[sRepl.slice(1)](s, m);
            sNew = sNew + " ".repeat(ln-sNew.length);
        } else {
            sNew = oEvalFunc[sRepl.slice(2)](s, m);
            sNew = sNew + "@".repeat(ln-sNew.length);
        }
        if (bUppercase && m[iGroup].slice(0,1).isupper()) {
            sNew = sNew._toCapitalize();
        }
    } else {
        sNew = sRepl._expand(m);
        sNew = sNew + " ".repeat(ln-sNew.length);
    }
    //echo("\n"+s+"\nstart: "+m.start[iGroup]+" end:"+m.end[iGroup])
    return s.slice(0, m.start[iGroup]) + sNew + s.slice(m.end[iGroup]);
}

function ignoreRule (sId) {
    _aIgnoredRules.add(sId);
}

function resetIgnoreRules () {
    _aIgnoredRules.clear();
}


//////// init

function load () {
    try {
        _oDict = new ibdawg.IBDAWG("fr");
    }
    catch (e) {
        helpers.logerror(e);
    }
}

function setOptions (dOpt) {
    _dOptions._update(dOpt)
}

function getOptions () {
    return _dOptions;
}

function resetOptions () {
    _dOptions = gc_options.dOpt._shallowCopy();
}

function getDictionary () {
    return _oDict;
}

function _getRules (bParagraph) {
    if (!bParagraph) {
        return _rules.lSentenceRules;
    }
    return _rules.lParagraphRules;
}



//////// common functions

function option (sOpt) {
    // return true if option sOpt is active
    return _dOptions.get(sOpt);
}

function displayInfo (dDA, aWord) {
    // for debugging: info of word
    if (!aWord) {
        echo("> nothing to find");
        return true;
    }
    if (!_dAnalyses.has(aWord[1]) && !_storeMorphFromFSA(aWord[1])) {
        echo("> not in FSA");
        return true;
    }
    if (dDA.has(aWord[0])) {
        echo("DA: " + dDA.get(aWord[0]));
    }
    echo("FSA: " + _dAnalyses.get(aWord[1]));
    return true;
}

function _storeMorphFromFSA (sWord) {
    // retrieves morphologies list from _oDict -> _dAnalyses
    //echo("register: "+sWord + " " + _oDict.getMorph(sWord).toString())
    _dAnalyses.set(sWord, _oDict.getMorph(sWord));
    return !!_dAnalyses.get(sWord);
}

function morph (dDA, aWord, sPattern, bStrict=true, bNoWord=false) {
    // analyse a tuple (position, word), return true if sPattern in morphologies (disambiguation on)
    if (!aWord) {
        //echo("morph: noword, returns " + bNoWord);
        return bNoWord;
    }
    //echo("aWord: "+aWord.toString());
    if (!_dAnalyses.has(aWord[1]) && !_storeMorphFromFSA(aWord[1])) {
        return false;
    }
    lMorph = dDA.has(aWord[0]) ? dDA.get(aWord[0]) : _dAnalyses.get(aWord[1]);
    //echo("lMorph: "+lMorph.toString());
    if (lMorph.length === 0) {
        return false;
    }
    //echo("***");
    if (bStrict) {
        return lMorph.every(s  =>  (s.search(sPattern) !== -1));
    }
    return lMorph.some(s  =>  (s.search(sPattern) !== -1));
}

function morphex (dDA, aWord, sPattern, sNegPattern, bNoWord=false) {
    // analyse a tuple (position, word), returns true if not sNegPattern in word morphologies and sPattern in word morphologies (disambiguation on)
    if (!aWord) {
        //echo("morph: noword, returns " + bNoWord);
        return bNoWord;
    }
    //echo("aWord: "+aWord.toString());
    if (!_dAnalyses.has(aWord[1]) && !_storeMorphFromFSA(aWord[1])) {
        return false;
    }
    lMorph = dDA.has(aWord[0]) ? dDA.get(aWord[0]) : _dAnalyses.get(aWord[1]);
    //echo("lMorph: "+lMorph.toString());
    if (lMorph.length === 0) {
        return false;
    }
    //echo("***");
    // check negative condition
    if (lMorph.some(s  =>  (s.search(sNegPattern) !== -1))) {
        return false;
    }
    // search sPattern
    return lMorph.some(s  =>  (s.search(sPattern) !== -1));
}

function analyse (sWord, sPattern, bStrict=true) {
    // analyse a word, return true if sPattern in morphologies (disambiguation off)
    if (!_dAnalyses.has(sWord) && !_storeMorphFromFSA(sWord)) {
        return false;
    }
    if (bStrict) {
        return _dAnalyses.get(sWord).every(s  =>  (s.search(sPattern) !== -1));
    }
    return _dAnalyses.get(sWord).some(s  =>  (s.search(sPattern) !== -1));
}

function analysex (sWord, sPattern, sNegPattern) {
    // analyse a word, returns True if not sNegPattern in word morphologies and sPattern in word morphologies (disambiguation off)
    if (!_dAnalyses.has(sWord) && !_storeMorphFromFSA(sWord)) {
        return false;
    }
    // check negative condition
    if (_dAnalyses.get(sWord).some(s  =>  (s.search(sNegPattern) !== -1))) {
        return false;
    }
    // search sPattern
    return _dAnalyses.get(sWord).some(s  =>  (s.search(sPattern) !== -1));
}

function stem (sWord) {
    // returns a list of sWord's stems
    if (!sWord) {
        return [];
    }
    if (!_dAnalyses.has(sWord) && !_storeMorphFromFSA(sWord)) {
        return [];
    }
    return [ for (s of _dAnalyses.get(sWord))  s.slice(1, s.indexOf(" ")) ];
}


//// functions to get text outside pattern scope

// warning: check compile_rules.py to understand how it works

function nextword (s, iStart, n) {
    // get the nth word of the input string or empty string
    let z = new RegExp("^( +[a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ%-]+){" + (n-1).toString() + "} +([a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ%-]+)", "i");
    let m = z.exec(s.slice(iStart));
    if (!m) {
        return null;
    }
    return [iStart + RegExp.lastIndex - m[2].length, m[2]];
}

function prevword (s, iEnd, n) {
    // get the (-)nth word of the input string or empty string
    let z = new RegExp("([a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ%-]+) +([a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ%-]+ +){" + (n-1).toString() + "}$", "i");
    let m = z.exec(s.slice(0, iEnd));
    if (!m) {
        return null;
    }
    return [m.index, m[1]];
}

const _zNextWord = new RegExp ("^ +([a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ][a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ-]*)", "i");
const _zPrevWord = new RegExp ("([a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ][a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ-]*) +$", "i");

function nextword1 (s, iStart) {
    // get next word (optimization)
    let m = _zNextWord.exec(s.slice(iStart));
    if (!m) {
        return null;
    }
    return [iStart + RegExp.lastIndex - m[1].length, m[1]];
}

function prevword1 (s, iEnd) {
    // get previous word (optimization)
    //echo("prev1, s:"+s);
    //echo("prev1, s.slice(0, iEnd):"+s.slice(0, iEnd));
    let m = _zPrevWord.exec(s.slice(0, iEnd));
    //echo("prev1, m:"+m);
    if (!m) {
        return null;
    }
    //echo("prev1: " + m.index + " " + m[1]);
    return [m.index, m[1]];
}

function look (s, zPattern, zNegPattern=null) {
    // seek zPattern in s (before/after/fulltext), if antipattern zNegPattern not in s
    try {
        if (zNegPattern && zNegPattern.test(s)) {
            return false;
        }
        return zPattern.test(s);
    }
    catch (e) {
        helpers.logerror(e);
    }
    return false;
}

function look_chk1 (dDA, s, nOffset, zPattern, sPatternGroup1, sNegPatternGroup1=null) {
    // returns True if s has pattern zPattern and m.group(1) has pattern sPatternGroup1
    let m = zPattern._exec2(s, null);
    if (!m) {
        return false;
    }
    try {
        let sWord = m[1];
        let nPos = m.start[1] + nOffset;
        if (sNegPatternGroup1) {
            return morphex(dDA, [nPos, sWord], sPatternGroup1, sNegPatternGroup1);
        } 
        return morph(dDA, [nPos, sWord], sPatternGroup1, false);
    }
    catch (e) {
        helpers.logerror(e);
        return false;
    }
}


//////// Disambiguator

function select (dDA, nPos, sWord, sPattern, lDefault=null) {
    if (!sWord) {
        return true;
    }
    if (dDA.has(nPos)) {
        return true;
    }
    if (!_dAnalyses.has(sWord) && !_storeMorphFromFSA(sWord)) {
        return true;
    }
    //echo("morph: "+_dAnalyses.get(sWord).toString());
    if (_dAnalyses.get(sWord).length === 1) {
        return true;
    }
    let lSelect = [ for (sMorph of _dAnalyses.get(sWord))  if (sMorph.search(sPattern) !== -1)  sMorph ];
    //echo("lSelect: "+lSelect.toString());
    if (lSelect.length > 0) {
        if (lSelect.length != _dAnalyses.get(sWord).length) {
            dDA.set(nPos, lSelect);
        }
    } else if (lDefault) {
        dDA.set(nPos, lDefaul);
    }
    return true;
}

function exclude (dDA, nPos, sWord, sPattern, lDefault=null) {
    if (!sWord) {
        return true;
    }
    if (dDA.has(nPos)) {
        return true;
    }
    if (!_dAnalyses.has(sWord) && !_storeMorphFromFSA(sWord)) {
        return true;
    }
    if (_dAnalyses.get(sWord).length === 1) {
        return true;
    }
    let lSelect = [ for (sMorph of _dAnalyses.get(sWord))  if (sMorph.search(sPattern) === -1)  sMorph ];
    //echo("lSelect: "+lSelect.toString());
    if (lSelect.length > 0) {
        if (lSelect.length != _dAnalyses.get(sWord).length) {
            dDA.set(nPos, lSelect);
        }
    } else if (lDefault) {
        dDA.set(nPos, lDefault);
    }
    return true;
}

function define (dDA, nPos, lMorph) {
    dDA.set(nPos, lMorph);
    return true;
}

//////// GRAMMAR CHECKER PLUGINS



//// GRAMMAR CHECKING ENGINE PLUGIN: Parsing functions for French language

function rewriteSubject (s1, s2) {
    // s1 is supposed to be prn/patr/npr (M[12P])
    if (s2 == "lui") {
        return "ils";
    }
    if (s2 == "moi") {
        return "nous";
    }
    if (s2 == "toi") {
        return "vous";
    }
    if (s2 == "nous") {
        return "nous";
    }
    if (s2 == "vous") {
        return "vous";
    }
    if (s2 == "eux") {
        return "ils";
    }
    if (s2 == "elle" || s2 == "elles") {
        // We don’t check if word exists in _dAnalyses, for it is assumed it has been done before
        if (cr.mbNprMasNotFem(_dAnalyses._get(s1, ""))) {
            return "ils";
        }
        // si épicène, indéterminable, mais OSEF, le féminin l’emporte
        return "elles";
    }
    return s1 + " et " + s2;
}

function apposition (sWord1, sWord2) {
    // returns true if nom + nom (no agreement required)
    // We don’t check if word exists in _dAnalyses, for it is assumed it has been done before
    return cr.mbNomNotAdj(_dAnalyses._get(sWord2, "")) && cr.mbPpasNomNotAdj(_dAnalyses._get(sWord1, ""));
}

function isAmbiguousNAV (sWord) {
    // words which are nom|adj and verb are ambiguous (except être and avoir)
    if (!_dAnalyses.has(sWord) && !_storeMorphFromFSA(sWord)) {
        return false;
    }
    if (!cr.mbNomAdj(_dAnalyses._get(sWord, "")) || sWord == "est") {
        return false;
    }
    if (cr.mbVconj(_dAnalyses._get(sWord, "")) && !cr.mbMG(_dAnalyses._get(sWord, ""))) {
        return true;
    }
    return false;
}

function isAmbiguousAndWrong (sWord1, sWord2, sReqMorphNA, sReqMorphConj) {
    //// use it if sWord1 won’t be a verb; word2 is assumed to be true via isAmbiguousNAV
    // We don’t check if word exists in _dAnalyses, for it is assumed it has been done before
    let a2 = _dAnalyses._get(sWord2, null);
    if (!a2 || a2.length === 0) {
        return false;
    }
    if (cr.checkConjVerb(a2, sReqMorphConj)) {
        // verb word2 is ok
        return false;
    }
    let a1 = _dAnalyses._get(sWord1, null);
    if (!a1 || a1.length === 0) {
        return false;
    }
    if (cr.checkAgreement(a1, a2, sReqMorphNA) && (cr.mbAdj(a2) || cr.mbAdj(a1))) {
        return false;
    }
    return true;
}

function isVeryAmbiguousAndWrong (sWord1, sWord2, sReqMorphNA, sReqMorphConj, bLastHopeCond) {
    //// use it if sWord1 can be also a verb; word2 is assumed to be true via isAmbiguousNAV
    // We don’t check if word exists in _dAnalyses, for it is assumed it has been done before
    let a2 = _dAnalyses._get(sWord2, null)
    if (!a2 || a2.length === 0) {
        return false;
    }
    if (cr.checkConjVerb(a2, sReqMorphConj)) {
        // verb word2 is ok
        return false;
    }
    let a1 = _dAnalyses._get(sWord1, null);
    if (!a1 || a1.length === 0) {
        return false;
    }
    if (cr.checkAgreement(a1, a2, sReqMorphNA) && (cr.mbAdj(a2) || cr.mbAdjNb(a1))) {
        return false;
    }
    // now, we know there no agreement, and conjugation is also wrong
    if (cr.isNomAdj(a1)) {
        return true;
    }
    //if cr.isNomAdjVerb(a1): # considered true
    if (bLastHopeCond) {
        return true;
    }
    return false;
}

function mbUnit (s) {
    if (/[µ\/⁰¹²³⁴⁵⁶⁷⁸⁹Ωℓ·]/.test(s)) {
        return true;
    }
    if (s.length > 1 && s.length < 16 && s.slice(0, 1)._isLowerCase() && (!s.slice(1)._isLowerCase() || /[0-9]/.test(s))) {
        return true;
    }
    return false;
}


//// Syntagmes

const _zEndOfNG1 = new RegExp ("^ +(?:, +|)(?:n(?:’|e |o(?:u?s|tre) )|l(?:’|e(?:urs?|s|) |a )|j(?:’|e )|m(?:’|es? |a |on )|t(?:’|es? |a |u )|s(?:’|es? |a )|c(?:’|e(?:t|tte|s|) )|ç(?:a |’)|ils? |vo(?:u?s|tre) )");
const _zEndOfNG2 = new RegExp ("^ +([a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ][a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ-]+)");
const _zEndOfNG3 = new RegExp ("^ *, +([a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ][a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ-]+)");

function isEndOfNG (dDA, s, iOffset) {
    if (_zEndOfNG1.test(s)) {
        return true;
    }
    let m = _zEndOfNG2._exec2(s, ["$"]);
    if (m && morphex(dDA, [iOffset+m.start[1], m[1]], ":[VR]", ":[NAQP]")) {
        return true;
    }
    m = _zEndOfNG3._exec2(s, ["$"]);
    if (m && !morph(dDA, [iOffset+m.start[1], m[1]], ":[NA]", false)) {
        return true;
    }
    return false;
}

//// Exceptions

const aREGULARPLURAL = new Set(["abricot", "amarante", "aubergine", "acajou", "anthracite", "brique", "caca", "café",
                                "carotte", "cerise", "chataigne", "corail", "citron", "crème", "grave", "groseille",
                                "jonquille", "marron", "olive", "pervenche", "prune", "sable"]);
const aSHOULDBEVERB = new Set(["aller", "manger"]);


//// GRAMMAR CHECKING ENGINE PLUGIN

// Check date validity

// WARNING: when creating a Date, month must be between 0 and 11


const _lDay = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const _dMonth = new Map ([
    ["janvier", 1], ["février", 2], ["mars", 3], ["avril", 4], ["mai", 5], ["juin", 6], ["juillet", 7],
    ["août", 8], ["aout", 8], ["septembre", 9], ["octobre", 10], ["novembre", 11], ["décembre", 12]
]);
const _dDaysInMonth = new Map ([
    [1, 31], [2, 28], [3, 31], [4, 30], [5, 31], [6, 30], [7, 31],
    [8, 31], [8, 31], [9, 30], [10, 31], [11, 30], [12, 31]
]);

function _checkDate (nDay, nMonth, nYear) {
    // returns true or false
    if (nMonth > 12 || nMonth < 1 || nDay > 31 || nDay < 1) {
        return false;
    }
    if (nDay <= _dDaysInMonth.get(nMonth)) {
        return true;
    }
    if (nDay === 29) {
        // leap years, http://jsperf.com/ily/15
        return !(nYear & 3 || !(nYear % 25) && nYear & 15);
    }
    return false;
}

function checkDate (sDay, sMonth, sYear) {
    // to use if sMonth is a number
    return _checkDate(parseInt(sDay, 10), parseInt(sMonth, 10), parseInt(sYear, 10));
}

function checkDateWithString (sDay, sMonth, sYear) {
    // to use if sMonth is a noun
    return _checkDate(parseInt(sDay, 10), _dMonth.get(sMonth.toLowerCase()), parseInt(sYear, 10));
}

function checkDay (sWeekday, sDay, sMonth, sYear) {
    // to use if sMonth is a number
    if (checkDate(sDay, sMonth, sYear)) {
        let oDate = new Date(parseInt(sYear, 10), parseInt(sMonth, 10)-1, parseInt(sDay, 10));
        if (_lDay[oDate.getDay()] != sWeekday.toLowerCase()) {
            return false;
        }
        return true;
    }
    return false;
}

function checkDayWithString (sWeekday, sDay, sMonth, sYear) {
    // to use if sMonth is a noun
    if (checkDateWithString(sDay, sMonth, sYear)) {
        let oDate = new Date(parseInt(sYear, 10), _dMonth.get(sMonth.toLowerCase())-1, parseInt(sDay, 10));
        if (_lDay[oDate.getDay()] != sWeekday.toLowerCase()) {
            return false;
        }
        return true;
    }
    return false;
}

function getDay (sDay, sMonth, sYear) {
    // to use if sMonth is a number
    let oDate = new Date(parseInt(sYear, 10), parseInt(sMonth, 10)-1, parseInt(sDay, 10));
    return _lDay[oDate.getDay()];
}

function getDayWithString (sDay, sMonth, sYear) {
    // to use if sMonth is a noun
    let oDate = new Date(parseInt(sYear, 10), _dMonth.get(sMonth.toLowerCase())-1, parseInt(sDay, 10));
    return _lDay[oDate.getDay()];
}


//// GRAMMAR CHECKING ENGINE PLUGIN: Suggestion mechanisms

const conj = require("resource://grammalecte/fr/conj.js");
const mfsp = require("resource://grammalecte/fr/mfsp.js");
const phonet = require("resource://grammalecte/fr/phonet.js");


//// verbs

function suggVerb (sFlex, sWho, funcSugg2=null) {
    // we don’t check if word exists in _dAnalyses, for it is assumed it has been done before
    let aSugg = new Set();
    for (let sStem of stem(sFlex)) {
        let tTags = conj._getTags(sStem);
        if (tTags) {
            // we get the tense
            let aTense = new Set();
            for (let sMorph of _dAnalyses._get(sFlex, [])) {
                let m;
                let zVerb = new RegExp (sStem+" .*?(:(?:Y|I[pqsf]|S[pq]|K))", "g");
                while (m = zVerb.exec(sMorph)) {
                    // stem must be used in regex to prevent confusion between different verbs (e.g. sauras has 2 stems: savoir and saurer)
                    if (m) {
                        if (m[1] === ":Y") {
                            aTense.add(":Ip");
                            aTense.add(":Iq");
                            aTense.add(":Is");
                        } else if (m[1] === ":P") {
                            aTense.add(":Ip");
                        } else {
                            aTense.add(m[1]);
                        }
                    }
                }
            }
            for (let sTense of aTense) {
                if (sWho === ":1ś" && !conj._hasConjWithTags(tTags, sTense, ":1ś")) {
                    sWho = ":1s";
                }
                if (conj._hasConjWithTags(tTags, sTense, sWho)) {
                    aSugg.add(conj._getConjWithTags(sStem, tTags, sTense, sWho));
                }
            }
        }
    }
    if (funcSugg2) {
        let aSugg2 = funcSugg2(sFlex);
        if (aSugg2.size > 0) {
            aSugg.add(aSugg2);
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggVerbPpas (sFlex, sWhat=null) {
    let aSugg = new Set();
    for (let sStem of stem(sFlex)) {
        let tTags = conj._getTags(sStem);
        if (tTags) {
            if (!sWhat) {
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":PQ", ":Q1"));
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":PQ", ":Q2"));
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":PQ", ":Q3"));
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":PQ", ":Q4"));
                aSugg.delete("");
            } else if (sWhat === ":m:s") {
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":PQ", ":Q1"));
            } else if (sWhat === ":m:p") {
                if (conj._hasConjWithTags(tTags, ":PQ", ":Q2")) {
                    aSugg.add(conj._getConjWithTags(sStem, tTags, ":PQ", ":Q2"));
                } else {
                    aSugg.add(conj._getConjWithTags(sStem, tTags, ":PQ", ":Q1"));
                }
            } else if (sWhat === ":f:s") {
                if (conj._hasConjWithTags(sStem, tTags, ":PQ", ":Q3")) {
                    aSugg.add(conj._getConjWithTags(sStem, tTags, ":PQ", ":Q3"));
                } else {
                    aSugg.add(conj._getConjWithTags(sStem, tTags, ":PQ", ":Q1"));
                }
            } else if (sWhat === ":f:p") {
                if (conj._hasConjWithTags(sStem, tTags, ":PQ", ":Q4")) {
                    aSugg.add(conj._getConjWithTags(sStem, tTags, ":PQ", ":Q4"));
                } else {
                    aSugg.add(conj._getConjWithTags(sStem, tTags, ":PQ", ":Q1"));
                }
            } else {
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":PQ", ":Q1"));
            }
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggVerbTense (sFlex, sTense, sWho) {
    let aSugg = new Set();
    for (let sStem of stem(sFlex)) {
        if (conj.hasConj(sStem, ":E", sWho)) {
            aSugg.add(conj.getConj(sStem, ":E", sWho));
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggVerbImpe (sFlex) {
    let aSugg = new Set();
    for (let sStem of stem(sFlex)) {
        let tTags = conj._getTags(sStem);
        if (tTags) {
            if (conj._hasConjWithTags(tTags, ":E", ":2s")) {
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":E", ":2s"));
            }
            if (conj._hasConjWithTags(tTags, ":E", ":1p")) {
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":E", ":1p"));
            }
            if (conj._hasConjWithTags(tTags, ":E", ":2p")) {
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":E", ":2p"));
            }
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggVerbInfi (sFlex) {
    return stem(sFlex).join("|");
}


const _dQuiEst = new Map ([
    ["je", ":1s"], ["j’", ":1s"], ["j’en", ":1s"], ["j’y", ":1s"],
    ["tu", ":2s"], ["il", ":3s"], ["on", ":3s"], ["elle", ":3s"],
    ["nous", ":1p"], ["vous", ":2p"], ["ils", ":3p"], ["elles", ":3p"]
]);
const _lIndicatif = [":Ip", ":Iq", ":Is", ":If"];
const _lSubjonctif = [":Sp", ":Sq"];

function suggVerbMode (sFlex, cMode, sSuj) {
    let lMode;
    if (cMode == ":I") {
        lMode = _lIndicatif;
    } else if (cMode == ":S") {
        lMode = _lSubjonctif;
    } else if (cMode.startsWith(":I") || cMode.startsWith(":S")) {
        lMode = [cMode];
    } else {
        return "";
    }
    let sWho = _dQuiEst._get(sSuj.toLowerCase(), null);
    if (!sWho) {
        if (sSuj[0]._isLowerCase()) { // pas un pronom, ni un nom propre
            return "";
        }
        sWho = ":3s";
    }
    let aSugg = new Set();
    for (let sStem of stem(sFlex)) {
        let tTags = conj._getTags(sStem);
        if (tTags) {
            for (let sTense of lMode) {
                if (conj._hasConjWithTags(tTags, sTense, sWho)) {
                    aSugg.add(conj._getConjWithTags(sStem, tTags, sTense, sWho));
                }
            }
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

//// Nouns and adjectives

function suggPlur (sFlex, sWordToAgree=null) {
    // returns plural forms assuming sFlex is singular
    if (sWordToAgree) {
        if (!_dAnalyses.has(sWordToAgree) && !_storeMorphFromFSA(sWordToAgree)) {
            return "";
        }
        let sGender = cr.getGender(_dAnalyses._get(sWordToAgree, []));
        if (sGender == ":m") {
            return suggMasPlur(sFlex);
        } else if (sGender == ":f") {
            return suggFemPlur(sFlex);
        }
    }
    let aSugg = new Set();
    if (!sFlex.includes("-")) {
        if (sFlex.endsWith("l")) {
            if (sFlex.endsWith("al") && sFlex.length > 2 && _oDict.isValid(sFlex.slice(0,-1)+"ux")) {
                aSugg.add(sFlex.slice(0,-1)+"ux");
            }
            if (sFlex.endsWith("ail") && sFlex.length > 3 && _oDict.isValid(sFlex.slice(0,-2)+"ux")) {
                aSugg.add(sFlex.slice(0,-2)+"ux");
            }
        }
        if (_oDict.isValid(sFlex+"s")) {
            aSugg.add(sFlex+"s");
        }
        if (_oDict.isValid(sFlex+"x")) {
            aSugg.add(sFlex+"x");
        }
    }
    if (mfsp.hasMiscPlural(sFlex)) {
        mfsp.getMiscPlural(sFlex).forEach(function(x) { aSugg.add(x); });
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggSing (sFlex) {
    // returns singular forms assuming sFlex is plural
    if (sFlex.includes("-")) {
        return "";
    }
    let aSugg = new Set();
    if (sFlex.endsWith("ux")) {
        if (_oDict.isValid(sFlex.slice(0,-2)+"l")) {
            aSugg.add(sFlex.slice(0,-2)+"l");
        }
        if (_oDict.isValid(sFlex.slice(0,-2)+"il")) {
            aSugg.add(sFlex.slice(0,-2)+"il");
        }
    }
    if (_oDict.isValid(sFlex.slice(0,-1))) {
        aSugg.add(sFlex.slice(0,-1));
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggMasSing (sFlex) {
    // returns masculine singular forms
    // we don’t check if word exists in _dAnalyses, for it is assumed it has been done before
    let aSugg = new Set();
    for (let sMorph of _dAnalyses._get(sFlex, [])) {
        if (!sMorph.includes(":V")) {
            // not a verb
            if (sMorph.includes(":m") || sMorph.includes(":e")) {
                aSugg.add(suggSing(sFlex));
            } else {
                let sStem = cr.getLemmaOfMorph(sMorph);
                if (mfsp.isFemForm(sStem)) {
                    mfsp.getMasForm(sStem, false).forEach(function(x) { aSugg.add(x); });
                }
            }
        } else {
            // a verb
            let sVerb = cr.getLemmaOfMorph(sMorph);
            if (conj.hasConj(sVerb, ":PQ", ":Q1")) {
                aSugg.add(conj.getConj(sVerb, ":PQ", ":Q1"));
            }
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggMasPlur (sFlex) {
    // returns masculine plural forms
    // we don’t check if word exists in _dAnalyses, for it is assumed it has been done before
    let aSugg = new Set();
    for (let sMorph of _dAnalyses._get(sFlex, [])) {
        if (!sMorph.includes(":V")) {
            // not a verb
            if (sMorph.includes(":m") || sMorph.includes(":e")) {
                aSugg.add(suggPlur(sFlex));
            } else {
                let sStem = cr.getLemmaOfMorph(sMorph);
                if (mfsp.isFemForm(sStem)) {
                    mfsp.getMasForm(sStem, true).forEach(function(x) { aSugg.add(x); });
                }
            }
        } else {
            // a verb
            let sVerb = cr.getLemmaOfMorph(sMorph);
            if (conj.hasConj(sVerb, ":PQ", ":Q2")) {
                aSugg.add(conj.getConj(sVerb, ":PQ", ":Q2"));
            } else if (conj.hasConj(sVerb, ":PQ", ":Q1")) {
                aSugg.add(conj.getConj(sVerb, ":PQ", ":Q1"));
            }
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggFemSing (sFlex) {
    // returns feminine singular forms
    // we don’t check if word exists in _dAnalyses, for it is assumed it has been done before
    let aSugg = new Set();
    for (let sMorph of _dAnalyses._get(sFlex, [])) {
        if (!sMorph.includes(":V")) {
            // not a verb
            if (sMorph.includes(":f") || sMorph.includes(":e")) {
                aSugg.add(suggSing(sFlex));
            } else {
                let sStem = cr.getLemmaOfMorph(sMorph);
                if (mfsp.isFemForm(sStem)) {
                    aSugg.add(sStem);
                }
            }
        } else {
            // a verb
            let sVerb = cr.getLemmaOfMorph(sMorph);
            if (conj.hasConj(sVerb, ":PQ", ":Q3")) {
                aSugg.add(conj.getConj(sVerb, ":PQ", ":Q3"));
            }
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggFemPlur (sFlex) {
    // returns feminine plural forms
    // we don’t check if word exists in _dAnalyses, for it is assumed it has been done before
    let aSugg = new Set();
    for (let sMorph of _dAnalyses._get(sFlex, [])) {
        if (!sMorph.includes(":V")) {
            // not a verb
            if (sMorph.includes(":f") || sMorph.includes(":e")) {
                aSugg.add(suggPlur(sFlex));
            } else {
                let sStem = cr.getLemmaOfMorph(sMorph);
                if (mfsp.isFemForm(sStem)) {
                    aSugg.add(sStem+"s");
                }
            }
        } else {
            // a verb
            let sVerb = cr.getLemmaOfMorph(sMorph);
            if (conj.hasConj(sVerb, ":PQ", ":Q4")) {
                aSugg.add(conj.getConj(sVerb, ":PQ", ":Q4"));
            }
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function switchGender (sFlex, bPlur=null) {
    // we don’t check if word exists in _dAnalyses, for it is assumed it has been done before
    let aSugg = new Set();
    if (bPlur === null) {
        for (let sMorph of _dAnalyses._get(sFlex, [])) {
            if (sMorph.includes(":f")) {
                if (sMorph.includes(":s")) {
                    aSugg.add(suggMasSing(sFlex));
                } else if (sMorph.includes(":p")) {
                    aSugg.add(suggMasPlur(sFlex));
                }
            } else if (sMorph.includes(":m")) {
                if (sMorph.includes(":s")) {
                    aSugg.add(suggFemSing(sFlex));
                } else if (sMorph.includes(":p")) {
                    aSugg.add(suggFemPlur(sFlex));
                } else {
                    aSugg.add(suggFemSing(sFlex));
                    aSugg.add(suggFemPlur(sFlex));
                }
            }
        }
    } else if (bPlur) {
        for (let sMorph of _dAnalyses._get(sFlex, [])) {
            if (sMorph.includes(":f")) {
                aSugg.add(suggMasPlur(sFlex));
            } else if (sMorph.includes(":m")) {
                aSugg.add(suggFemPlur(sFlex));
            }
        }
    } else {
        for (let sMorph of _dAnalyses._get(sFlex, [])) {
            if (sMorph.includes(":f")) {
                aSugg.add(suggMasSing(sFlex));
            } else if (sMorph.includes(":m")) {
                aSugg.add(suggFemSing(sFlex));
            }
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function switchPlural (sFlex) {
    let aSugg = new Set();
    for (let sMorph of _dAnalyses._get(sFlex, [])) { // we don’t check if word exists in _dAnalyses, for it is assumed it has been done before
        if (sMorph.includes(":s")) {
            aSugg.add(suggPlur(sFlex));
        } else if (sMorph.includes(":p")) {
            aSugg.add(suggSing(sFlex));
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function hasSimil (sWord) {
    return phonet.hasSimil(sWord);
}

function suggSimil (sWord, sPattern) {
    // return list of words phonetically similar to sWord and whom POS is matching sPattern
    let lSet = phonet.getSimil(sWord);
    if (lSet.length == 0) {
        return "";
    }
    let aSugg = new Set();
    for (let sSimil of lSet) {
        if (!_dAnalyses.has(sSimil)) {
            _storeMorphFromFSA(sSimil);
        }
        for (let sMorph of _dAnalyses._get(sSimil, [])) {
            if (sMorph.search(sPattern) >= 0) {
                aSugg.add(sSimil);
            }
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggCeOrCet (s) {
    if (/^[aeéèêiouyâîï]/i.test(s)) {
        return "cet";
    }
    if (s[0] == "h" || s[0] == "H") {
        return "ce|cet";
    }
    return "ce";
}

function formatNumber (s) {
    let nLen = s.length;
    if (nLen == 10) {
        let sRes = s[0] + " " + s.slice(1,4) + " " + s.slice(4,7) + " " + s.slice(7);                       // nombre ordinaire
        if (s.startsWith("0")) {
            sRes += "|" + s.slice(0,2) + " " + s.slice(2,4) + " " + s.slice(4,6) + " " + s.slice(6,8) + " " + s.slice(8);   // téléphone français
            if (s[1] == "4" && (s[2]=="7" || s[2]=="8" || s[2]=="9")) {
                sRes += "|" + s.slice(0,4) + " " + s.slice(4,6) + " " + s.slice(6,8) + " " + s.slice(8);    // mobile belge
            }
            sRes += "|" + s.slice(0,3) + " " + s.slice(3,6) + " " + s.slice(6,8) + " " + s.slice(8);        // téléphone suisse
        }
        sRes += "|" + s.slice(0,4) + " " + s.slice(4,7) + "-" + s.slice(7);                                 // téléphone canadien ou américain
        return sRes;
    } else if (nLen == 9) {
        let sRes = s.slice(0,3) + " " + s.slice(3,6) + " " + s.slice(6);                                    // nombre ordinaire
        if (s.startsWith("0")) {
            sRes += "|" + s.slice(0,3) + " " + s.slice(3,5) + " " + s.slice(5,7) + " " + s.slice(7,9);      // fixe belge 1
            sRes += "|" + s.slice(0,2) + " " + s.slice(2,5) + " " + s.slice(5,7) + " " + s.slice(7,9);      // fixe belge 2
        }
        return sRes;
    } else if (nLen < 4) {
        return "";
    }
    let sRes = "";
    let nEnd = nLen;
    while (nEnd > 0) {
        let nStart = Math.max(nEnd-3, 0);
        sRes = sRes ? s.slice(nStart, nEnd) + " " + sRes : sRes = s.slice(nStart, nEnd);
        nEnd = nEnd - 3;
    }
    return sRes;
}

function formatNF (s) {
    try {
        let m = /NF[  -]?(C|E|P|Q|S|X|Z|EN(?:[  -]ISO|))[  -]?([0-9]+(?:[\/‑-][0-9]+|))/i.exec(s);
        if (!m) {
            return "";
        }
        return "NF " + m[1].toUpperCase().replace(/ /g, " ").replace(/-/g, " ") + " " + m[2].replace(/\//g, "‑").replace(/-/g, "‑");
    }
    catch (e) {
        helpers.logerror(e);
        return "# erreur #";
    }
}

function undoLigature (c) {
    if (c == "ﬁ") {
        return "fi";
    } else if (c == "ﬂ") {
        return "fl";
    } else if (c == "ﬀ") {
        return "ff";
    } else if (c == "ﬃ") {
        return "ffi";
    } else if (c == "ﬄ") {
        return "ffl";
    } else if (c == "ﬅ") {
        return "ft";
    } else if (c == "ﬆ") {
        return "st";
    }
    return "_";
}



// generated code, do not edit
var oEvalFunc = {
    p73p_1: function (s, m) {
        return m[1].replace(/\./g, "")+".";
    },
    c75p_1: function (s, sx, m, dDA, sCountry) {
        return m[0] != "i.e." && m[0] != "s.t.p.";
    },
    s75p_1: function (s, m) {
        return m[0].replace(/\./g, "").toUpperCase();
    },
    p75p_2: function (s, m) {
        return m[0].replace(/\./g, "");
    },
    c79p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^etc/i) >= 0);
    },
    c84p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false) && look(s.slice(m.end[0]), /^\W+[a-zéèêîïâ]/);
    },
    c118p_1: function (s, sx, m, dDA, sCountry) {
        return option("typo") && ! m[0].endsWith("·e·s");
    },
    c118p_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    d118p_2: function (s, m, dDA) {
        return define(dDA, m.start[0], ":N:A:Q:e:i");
    },
    c130p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^(?:etc|[A-Z]|chap|cf|fig|hab|litt|circ|coll|r[eé]f|étym|suppl|bibl|bibliogr|cit|op|vol|déc|nov|oct|janv|juil|avr|sept)$/i) >= 0) && morph(dDA, [m.start[1], m[1]], ":", false) && morph(dDA, [m.start[2], m[2]], ":", false);
    },
    s130p_1: function (s, m) {
        return m[2]._toCapitalize();
    },
    c141p_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":[DR]", false);
    },
    c147p_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":M", ":G") && ! morph(dDA, [m.start[2], m[2]], ":N", false) && ! look(s.slice(0,m.index), /quel(?:le|)s? +/i);
    },
    c172p_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1]._isDigit();
    },
    c174p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]);
    },
    s195p_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    s196p_1: function (s, m) {
        return m[1].slice(1,3) == "os"  ? "nᵒˢ"  : "nᵒ";
    },
    c204p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /etc$/i);
    },
    s205p_1: function (s, m) {
        return m[0].replace(/\.\.\./g, "…")._trimRight(".");
    },
    c221p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^(?:etc|[A-Z]|fig|hab|litt|circ|coll|ref|étym|suppl|bibl|bibliogr|cit|vol|déc|nov|oct|janv|juil|avr|sept)$/) >= 0);
    },
    s254p_1: function (s, m) {
        return m[0][0] + "|" + m[0][1];
    },
    s255p_1: function (s, m) {
        return m[0][0] + "|" + m[0][1];
    },
    s256p_1: function (s, m) {
        return m[0][0] + "|" + m[0][1];
    },
    c268p_1: function (s, sx, m, dDA, sCountry) {
        return (! (m[2].search(/^[0-9][0-9]{1,3}$/) >= 0) && ! _oDict.isValid(m[3])) || morphex(dDA, [m.start[3], m[3]], ";S", ":V") || mbUnit(m[3]);
    },
    c289p_1: function (s, sx, m, dDA, sCountry) {
        return sCountry != "CA";
    },
    s289p_1: function (s, m) {
        return " "+m[0];
    },
    s327p_1: function (s, m) {
        return undoLigature(m[0]);
    },
    c373p_1: function (s, sx, m, dDA, sCountry) {
        return ! option("mapos") && morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    s373p_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c376p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    s376p_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c380p_1: function (s, sx, m, dDA, sCountry) {
        return option("mapos") && ! look(s.slice(0,m.index), /(?:lettre|caractère|glyphe|dimension|variable|fonction|point) *$/i);
    },
    s380p_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c394p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:onz[ei]|énième|iourte|ouistiti|ouate|one-?step|Ouagadougou|I(?:I|V|X|er|ᵉʳ|ʳᵉ|è?re))/i) >= 0) && ! m[2]._isUpperCase() && ! morph(dDA, [m.start[2], m[2]], ":G", false);
    },
    s394p_1: function (s, m) {
        return m[1][0]+"’";
    },
    c410p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:onz|énième)/i) >= 0) && morph(dDA, [m.start[2], m[2]], ":[me]");
    },
    c418p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].search(/^NF (?:C|E|P|Q|S|X|Z|EN(?: ISO|)) [0-9]+(?:‑[0-9]+|)/) >= 0);
    },
    s418p_1: function (s, m) {
        return formatNF(m[0]);
    },
    s423p_1: function (s, m) {
        return m[0].replace(/2/g, "₂").replace(/3/g, "₃").replace(/4/g, "₄");
    },
    c431p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /NF[  -]?(C|E|P|Q|X|Z|EN(?:[  -]ISO|)) */);
    },
    s431p_1: function (s, m) {
        return formatNumber(m[0]);
    },
    s445p_1: function (s, m) {
        return m[0].replace(/O/g, "0");
    },
    s446p_1: function (s, m) {
        return m[0].replace(/O/g, "0");
    },
    c464p_1: function (s, sx, m, dDA, sCountry) {
        return ! checkDate(m[1], m[2], m[3]) && ! look(s.slice(0,m.index), /\bversions? +$/i);
    },
    c467p_1: function (s, sx, m, dDA, sCountry) {
        return ! checkDateWithString(m[1], m[2], m[3]);
    },
    c470p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +av(?:ant|\.) J(?:\.-C\.|ésus-Christ)/) && ! checkDay(m[1], m[2], m[3], m[4]);
    },
    s470p_1: function (s, m) {
        return getDay(m[2], m[3], m[4]);
    },
    c475p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +av(?:ant|\.) J(?:\.-C\.|ésus-Christ)/) && ! checkDayWithString(m[1], m[2], m[3], m[4]);
    },
    s475p_1: function (s, m) {
        return getDayWithString(m[2], m[3], m[4]);
    },
    c512p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false) || m[1] == "en";
    },
    c515p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":", false);
    },
    c519p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NB]", false);
    },
    c520p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NB]", false) && ! nextword1(s, m.end[0]);
    },
    c523p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":N") && ! (m[1].search(/^(?:aequo|nihilo|cathedra|absurdo|abrupto)/i) >= 0);
    },
    c525p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c526p_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":N", ":[AGW]");
    },
    c529p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c531p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":", false);
    },
    c535p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":", false) && morph(dDA, prevword1(s, m.index), ":D", false, ! Boolean((m[1].search(/^s(?:ans|ous)$/i) >= 0)));
    },
    c539p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":N", false) && morph(dDA, prevword1(s, m.index), ":(?:D|V0e)", false, true) && ! (morph(dDA, [m.start[1], m[1]], ":G", false) && morph(dDA, [m.start[2], m[2]], ":[GYB]", false));
    },
    s546p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    s547p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c558p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":Cs", false, true);
    },
    s564p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c570p_1: function (s, sx, m, dDA, sCountry) {
        return ! nextword1(s, m.end[0]);
    },
    c572p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":G");
    },
    c576p_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /\b(?:les?|du|des|un|ces?|[mts]on) +/i);
    },
    c583p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":D", false);
    },
    c585p_1: function (s, sx, m, dDA, sCountry) {
        return ! ( morph(dDA, prevword1(s, m.index), ":R", false) && look(s.slice(m.end[0]), /^ +qu[e’]/) );
    },
    s633p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c635p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /quatre $/i);
    },
    s635p_1: function (s, m) {
        return m[0].replace(/ /g, "-").replace(/vingts/g, "vingt");
    },
    s637p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    s639p_1: function (s, m) {
        return m[0].replace(/ /g, "-").replace(/vingts/g, "vingt");
    },
    s663p_1: function (s, m) {
        return m[0].replace(/-/g, " ");
    },
    c665p_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    s668p_1: function (s, m) {
        return m[0].replace(/-/g, " ");
    },
    s669p_1: function (s, m) {
        return m[0].replace(/-/g, " ");
    },
    c717p_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:G|V0)|>(?:t(?:antôt|emps|rès)|loin|souvent|parfois|quelquefois|côte|petit) ", false) && ! m[1][0]._isUpperCase();
    },
    p727p_1: function (s, m) {
        return m[0].replace(/‑/g, "");
    },
    p728p_1: function (s, m) {
        return m[0].replace(/‑/g, "");
    },
    c762s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[0], m[0]], ":", false);
    },
    c765s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false);
    },
    c766s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":A", false) && ! morph(dDA, prevword1(s, m.index), ":D", false);
    },
    c803s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:O[sp]|X)", false);
    },
    d803s_1: function (s, m, dDA) {
        return select(dDA, m.start[1], m[1], ":V");
    },
    d805s_1: function (s, m, dDA) {
        return select(dDA, m.start[1], m[1], ":V");
    },
    c807s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":[YD]", false);
    },
    d807s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    d809s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    c811s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":Y", false);
    },
    d811s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    c822s_1: function (s, sx, m, dDA, sCountry) {
        return option("mapos");
    },
    s822s_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c829s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[GNAY]", ":Q|>(?:priori|post[eé]riori|contrario|capella) ");
    },
    c847s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ">(?:et|o[uù]) ");
    },
    c851s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":N.*:f:s", false);
    },
    c856s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":(O[on]|3s)", false);
    },
    c861s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":A.*:f", false) || morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    s861s_1: function (s, m) {
        return m[1].replace(/è/g, "ê").replace(/È/g, "Ê");
    },
    c867s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":V", false, true);
    },
    c872s_1: function (s, sx, m, dDA, sCountry) {
        return m[2].endsWith("e") && ( (m[1].search(/^(?:quand|comme|que)$/i) >= 0) || morphex(dDA, [m.start[1], m[1]], ":[NV]", ":[GA]") );
    },
    c872s_2: function (s, sx, m, dDA, sCountry) {
        return m[2].endsWith("s") && ! (m[1].search(/^(?:les|[mtscd]es|quels)$/i) >= 0);
    },
    c882s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^([nv]ous|faire|en|la|lui|donnant|œuvre|h[éo]|olé|joli|Bora|couvent|dément|sapiens|très|vroum|[0-9]+)$/i) >= 0) && ! ((m[1].search(/^(?:est|une?)$/) >= 0) && look(s.slice(0,m.index), /[’']$/)) && ! (m[1] == "mieux" && look(s.slice(0,m.index), /qui +$/i));
    },
    c916s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^avoir$/i) >= 0) && morph(dDA, [m.start[1], m[1]], ">avoir ", false);
    },
    c931s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|mettre) ", false);
    },
    c962s_1: function (s, sx, m, dDA, sCountry) {
        return ! look_chk1(dDA, s.slice(m.end[0]), m.end[0], / [a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+ en ([aeo][a-zû]*)/i, ":V0a");
    },
    c982s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">abolir ", false);
    },
    c984s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">achever ", false);
    },
    c985s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), / +de?\b/);
    },
    c994s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":A|>un", false);
    },
    c1000s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">comparer ");
    },
    c1001s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">contraindre ", false);
    },
    c1012s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">joindre ");
    },
    c1038s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">suffire ");
    },
    c1039s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">talonner ");
    },
    c1046s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:prévenir|prévoir|prédire|présager|préparer|pressentir|pronostiquer|avertir|devancer|réserver) ", false);
    },
    c1051s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:ajourner|différer|reporter) ", false);
    },
    c1118s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]") && m[2][0]._isLowerCase();
    },
    s1118s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[fe]:[si]");
    },
    c1122s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":N.*:[fe]|:[AW]") && m[2][0]._isLowerCase() || m[2] == "va";
    },
    c1122s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]") && m[2][0]._isLowerCase() && hasSimil(m[2]);
    },
    s1122s_2: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[fe]:[si]");
    },
    c1128s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]") && m[2][0]._isLowerCase();
    },
    s1128s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[me]:[si]");
    },
    c1132s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]|:V0e.*:3[sp]|>devoir") && m[2][0]._isLowerCase() && hasSimil(m[2]);
    },
    s1132s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[me]:[si]");
    },
    c1136s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]") && m[2][0]._isLowerCase();
    },
    s1136s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:.:[si]");
    },
    c1140s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V.*:(?:Y|[123][sp])") && m[1][0]._isLowerCase() && ! prevword1(s, m.index);
    },
    s1140s_1: function (s, m) {
        return suggSimil(m[1], ":[NAQ]:[me]:[si]");
    },
    c1144s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[pi]") && m[2][0]._isLowerCase() && ! (m[0].search(/^quelques? soi(?:ent|t|s)\b/i) >= 0);
    },
    s1144s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:.:[pi]");
    },
    c1148s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[pi]") && m[2][0]._isLowerCase();
    },
    s1148s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[me]:[pi]");
    },
    c1152s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[pi]") && m[2][0]._isLowerCase();
    },
    s1152s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[fe]:[pi]");
    },
    c1156s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[NAQ]");
    },
    s1156s_1: function (s, m) {
        return suggSimil(m[1], ":(?:[NAQ]:[fe]:[si])");
    },
    c1160s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]", ":[YG]") && m[2][0]._isLowerCase();
    },
    c1160s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false);
    },
    s1160s_2: function (s, m) {
        return suggSimil(m[2], ":Y");
    },
    c1166s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Y|[123][sp])") && ! look(s.slice(0,m.index), /(?:dont|sauf|un à) +$/i);
    },
    s1166s_1: function (s, m) {
        return suggSimil(m[1], ":[NAQ]:[me]:[si]");
    },
    c1170s_1: function (s, sx, m, dDA, sCountry) {
        return m[1][0]._isLowerCase() && morph(dDA, [m.start[1], m[1]], ":V.*:[123][sp]");
    },
    s1170s_1: function (s, m) {
        return suggSimil(m[1], ":[NA]");
    },
    c1174s_1: function (s, sx, m, dDA, sCountry) {
        return m[1][0]._isLowerCase() && morphex(dDA, [m.start[1], m[1]], ":V.*:[123][sp]", ":[GNA]");
    },
    s1174s_1: function (s, m) {
        return suggSimil(m[1], ":[NAQ]");
    },
    c1183s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":P", false);
    },
    c1184s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]");
    },
    c1189s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|O[on]|X)|>(?:[lmts]|surtout|guère) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1189s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1192s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].search(/^se que?/i) >= 0) && _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|Oo)|>[lmts] ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1192s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1196s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|Oo)", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1196s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1199s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|O[onw]|X)", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1199s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1202s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|O[onw])", false);
    },
    s1202s_1: function (s, m) {
        return suggSimil(m[2], ":[123][sp]");
    },
    c1205s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P)|>(?:en|y|ils?) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1205s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1208s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P)|>(?:en|y|ils?|elles?) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1208s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1211s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":[123][sp]|>(?:en|y) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|dire)$/i) >= 0);
    },
    s1211s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1228s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Y|[123][sp])", ":[GAQW]");
    },
    c1232s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":(?:G|N|A|Q|W|M[12])");
    },
    c1236s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1][0]._isUpperCase() && morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[GNAQM]");
    },
    c1240s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1][0]._isUpperCase() && morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[GNAQM]") && ! morph(dDA, prevword1(s, m.index), ":[NA]:[me]:si", false);
    },
    c1244s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":(?:G|N|A|Q|W|M[12]|T)");
    },
    c1248s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y)", ":[GAQW]") && ! morph(dDA, prevword1(s, m.index), ":V[123].*:[123][sp]", false, false);
    },
    c1254s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":[VN]", false, true);
    },
    c1255s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1258s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:[lmts]a|leur|une|en) +$/i);
    },
    c1260s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">être ") && ! look(s.slice(0,m.index), /\bce que? /i);
    },
    c1279s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:côtés?|coups?|peu(?:-près|)|pics?|propos|valoir|plat-ventrismes?)/i) >= 0);
    },
    c1279s_2: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^(?:côtés?|coups?|peu(?:-pr(?:ès|êts?|és?)|)|pics?|propos|valoir|plat-ventrismes?)/i) >= 0);
    },
    c1284s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":3s", false, false);
    },
    c1287s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:3s|R)", false, false) && ! morph(dDA, nextword1(s, m.end[0]), ":Oo", false);
    },
    c1292s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":Q", ":M[12P]");
    },
    c1295s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:Y|Oo)");
    },
    c1299s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:Y|Oo)");
    },
    c1306s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\bce que?\b/i);
    },
    c1308s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":(?:M[12]|D|Oo)");
    },
    c1313s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]") && ! m[2].slice(0,1)._isUpperCase() && ! m[2].startsWith("tord");
    },
    c1316s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /[ln]’$|\b(?:il|elle|on|y|n’en) +$/i);
    },
    c1320s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /(\bque?\\b|[ln]’$|\b(?:il|elle|on|y|n’en) +$)/i);
    },
    c1323s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /(\bque?\b|[ln]’$|\b(?:il|elle|on|y|n’en) +$)/i);
    },
    c1327s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":Y", false) && ! look(s.slice(0,m.index), /\bque? |(?:il|elle|on|n’(?:en|y)) +$/i);
    },
    c1364s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1370s_1: function (s, sx, m, dDA, sCountry) {
        return ! nextword1(s, m.end[0]) || look(s.slice(m.end[0]), /^ +que? /i);
    },
    c1372s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":G", ">(?:tr(?:ès|op)|peu|bien|plus|moins) |:[NAQ].*:f");
    },
    c1376s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f") && ! (m[2].search(/^seule?s?/) >= 0);
    },
    c1379s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:[oO]h|[aA]h) +$/);
    },
    c1381s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R");
    },
    c1392s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":([123][sp]|Y|P|Q)|>l[ea]? ");
    },
    c1395s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":Y")  && m[1] != "CE";
    },
    c1397s_1: function (s, sx, m, dDA, sCountry) {
        return (m[0].indexOf(",") >= 0 || morphex(dDA, [m.start[2], m[2]], ":G", ":[AYD]"));
    },
    c1400s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V[123].*:(?:Y|[123][sp])") && ! morph(dDA, [m.start[2], m[2]], ">(?:devoir|pouvoir) ") && m[2][0]._isLowerCase() && m[1] != "CE";
    },
    c1407s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1409s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V", ":[NAQ].*:[me]") || look(s.slice(0,m.index), /\b[cs]e +/i);
    },
    c1412s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(m.end[0]), /^ +[ldmtsc]es /) || ( morph(dDA, prevword1(s, m.index), ":Cs", false, true) && ! look(s.slice(0,m.index), /, +$/) && ! look(s.slice(m.end[0]), /^ +(?:ils?|elles?)\b/) && ! morph(dDA, nextword1(s, m.end[0]), ":Q", false, false) );
    },
    c1418s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":N.*:s", ":(?:A.*:[pi]|P)");
    },
    c1440s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":N.*:p", ":(?:G|W|A.*:[si])");
    },
    c1449s_1: function (s, sx, m, dDA, sCountry) {
        return m[1].endsWith("en") || look(s.slice(0,m.index), /^ *$/);
    },
    c1455s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1458s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1].startsWith("B");
    },
    c1470s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":E|>le ", false, false);
    },
    c1480s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y)", ":(?:G|N|A|M[12P])") && ! look(s.slice(0,m.index), /\bles *$/i);
    },
    c1488s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":W", false) && ! morph(dDA, prevword1(s, m.index), ":V.*:3s", false, false);
    },
    s1500s_1: function (s, m) {
        return m[1].replace(/pal/g, "pâl");
    },
    s1503s_1: function (s, m) {
        return m[1].replace(/pal/g, "pâl");
    },
    c1511s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AQ]", false);
    },
    c1521s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ">(?:arriver|venir|à|revenir|partir|aller) ");
    },
    c1526s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":P", false);
    },
    c1537s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:G|[123][sp]|W)");
    },
    s1537s_1: function (s, m) {
        return m[1].replace(/ /g, "");
    },
    c1542s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c1550s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    c1553s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":V", false) && ! ( m[1] == "sans" && morph(dDA, [m.start[2], m[2]], ":[NY]", false) );
    },
    c1574s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AQ].*:[pi]", false);
    },
    c1577s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1579s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:d[eu]|avant|après|sur|malgré) +$/i);
    },
    c1581s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:d[eu]|avant|après|sur|malgré) +$/i);
    },
    c1586s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":f") && ! look(s.slice(0,m.index), /(?:à|pas|de|[nv]ous|eux) +$/i);
    },
    c1589s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":m") && ! look(s.slice(0,m.index), /(?:à|pas|de|[nv]ous|eux) +$/i);
    },
    c1593s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":N.*:[fp]", ":(?:A|W|G|M[12P]|Y|[me]:i|3s)") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s1593s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c1597s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[mp]") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s1597s_1: function (s, m) {
        return suggFemSing(m[1]);
    },
    c1601s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[fs]") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s1601s_1: function (s, m) {
        return suggMasPlur(m[1]);
    },
    c1605s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[ms]") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s1605s_1: function (s, m) {
        return suggFemPlur(m[1]);
    },
    c1615s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins)\b/));
    },
    c1619s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins)\b/));
    },
    c1623s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins)\b/));
    },
    c1627s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins)\b/));
    },
    c1642s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:Y|W|Oo)", false) && _oDict.isValid(m[1]);
    },
    s1642s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c1665s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    c1899s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":G");
    },
    c1906s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    c1917s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)s?$/i) >= 0);
    },
    c1950s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c1951s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c1968s_1: function (s, sx, m, dDA, sCountry) {
        return m[2]._isDigit() || morph(dDA, [m.start[2], m[2]], ":B", false);
    },
    c1981s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">prendre ", false);
    },
    c1985s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">rester ", false);
    },
    c1990s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:sembler|para[îi]tre) ") && morphex(dDA, [m.start[3], m[3]], ":A", ":G");
    },
    c1991s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:une|la|cette|[mts]a|[nv]otre|de) +/);
    },
    c1994s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">tenir ", false);
    },
    c1996s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">trier ", false);
    },
    c1998s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">venir ", false);
    },
    c2012s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", ":(?:G|3p)");
    },
    c2017s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", ":(?:G|3p)");
    },
    c2024s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":B", false);
    },
    c2025s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":V0", false) || ! morph(dDA, nextword1(s, m.end[0]), ":A", false);
    },
    c2026s_1: function (s, sx, m, dDA, sCountry) {
        return isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c2027s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":W", false);
    },
    c2028s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":A .*:m:s", false);
    },
    c2030s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":(?:R|C[sc])", false, true);
    },
    c2031s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":B", false) || (m[1].search(/^(?:plusieurs|maintes)/i) >= 0);
    },
    c2032s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, nextword1(s, m.end[0]), ":[NAQ]", false, true);
    },
    c2033s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":V0");
    },
    c2035s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":D", false);
    },
    c2036s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":D.*:[me]:[si]", false);
    },
    c2037s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":A", false);
    },
    c2038s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:croire|devoir|estimer|imaginer|penser) ");
    },
    c2040s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:R|D|[123]s|X)", false);
    },
    c2041s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c2042s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\bt(?:u|oi qui)\b/i);
    },
    c2043s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c2044s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":A", false);
    },
    c2045s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c2046s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":W", false);
    },
    c2047s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[AW]", ":G");
    },
    c2048s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[AW]", false);
    },
    c2049s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":Y", false);
    },
    c2052s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NV]", ":D");
    },
    c2053s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":(?:3s|X)", false);
    },
    c2054s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[me]", false);
    },
    c2058s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false) && (morph(dDA, [m.start[2], m[2]], ":(?:M[12]|V)", false) || ! _oDict.isValid(m[2]));
    },
    c2059s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M", false) && morph(dDA, [m.start[2], m[2]], ":M", false);
    },
    c2060s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M", false);
    },
    c2061s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:M[12]|N)") && morph(dDA, [m.start[2], m[2]], ":(?:M[12]|N)");
    },
    c2062s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":MP");
    },
    c2063s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false);
    },
    c2064s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false);
    },
    c2067s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[MT]", false) && morph(dDA, prevword1(s, m.index), ":Cs", false, true) && ! look(s.slice(0,m.index), /\b(?:plus|moins|aussi) .* que +$/);
    },
    p2067s_1: function (s, m) {
        return rewriteSubject(m[1],m[2]);
    },
    c2072s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c2074s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c2076s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:V0e|N)", false) && morph(dDA, [m.start[3], m[3]], ":[AQ]", false);
    },
    c2078s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false);
    },
    c2080s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false) && morph(dDA, [m.start[3], m[3]], ":[QY]", false);
    },
    c2082s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && ! (m[2] == "crainte" && look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/));
    },
    c2084s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morph(dDA, [m.start[3], m[3]], ":B", false) && morph(dDA, [m.start[4], m[4]], ":(?:Q|V1.*:Y)", false);
    },
    c2088s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c2089s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V[123]");
    },
    c2090s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V[123]", false);
    },
    c2091s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c2094s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":G");
    },
    c2097s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], "[NAQ].*:[me]:[si]", false);
    },
    c2099s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[me]", ":G") && morph(dDA, [m.start[3], m[3]], ":[AQ].*:[me]", false);
    },
    c2101s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[fe]", ":G") && morph(dDA, [m.start[3], m[3]], ":[AQ].*:[fe]", false);
    },
    c2103s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", ":[123][sp]") && morph(dDA, [m.start[3], m[3]], ":[AQ].*:[pi]", false);
    },
    c2106s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AW]");
    },
    c2108s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AW]", false);
    },
    c2110s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AQ]", false);
    },
    c2112s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":W", ":3p");
    },
    c2114s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[AW]", ":[123][sp]");
    },
    c2118s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && morph(dDA, [m.start[3], m[3]], ":W", false) && morph(dDA, [m.start[4], m[4]], ":[AQ]", false);
    },
    c2120s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, true);
    },
    c2121s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":W\\b");
    },
    c2124s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c2128s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:N|A|Q|V0e)", false);
    },
    c2186s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":1s", false, false);
    },
    c2187s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":2s", false, false);
    },
    c2188s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":3s", false, false);
    },
    c2189s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":1p", false, false);
    },
    c2190s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":2p", false, false);
    },
    c2191s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":3p", false, false);
    },
    c2192s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]");
    },
    c2198s_1: function (s, sx, m, dDA, sCountry) {
        return isAmbiguousNAV(m[3]) && morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c2201s_1: function (s, sx, m, dDA, sCountry) {
        return isAmbiguousNAV(m[3]) && morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && ! (m[0].search(/^[dD](?:’une?|e la) /) >= 0);
    },
    c2204s_1: function (s, sx, m, dDA, sCountry) {
        return isAmbiguousNAV(m[3]) && ( morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":3[sp]") && ! prevword1(s, m.index)) );
    },
    c2220s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:G|V0)", false);
    },
    c2230s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    c2233s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    c2236s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f", false);
    },
    c2251s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)");
    },
    c2254s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)") || ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[me]") && morphex(dDA, [m.start[1], m[1]], ":R", ">(?:e[tn]|ou) ") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[3], m[3]], ":Y", false)) );
    },
    c2258s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|P|G|W|Y)");
    },
    c2262s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    c2265s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|G|W|V0|3s)");
    },
    c2268s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|G|W|P)");
    },
    c2271s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    c2274s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    c2277s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:s", ":[GWme]");
    },
    c2281s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:e|f|P|G|W|[1-3][sp]|Y)");
    },
    c2284s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":(?:e|f|P|G|W|[1-3][sp]|Y)") || ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[fe]") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou) ") && ! (morph(dDA, [m.start[1], m[1]], ":(?:Rv|C)", false) && morph(dDA, [m.start[3], m[3]], ":Y", false)) );
    },
    c2288s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efPGWY]");
    },
    c2292s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    c2295s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:e|f|G|W|V0|3s|P)") && ! ( m[2] == "demi" && morph(dDA, nextword1(s, m.end[0]), ":N.*:f") );
    },
    c2298s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:e|f|G|W|V0|3s)");
    },
    c2301s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGWP]");
    },
    c2304s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    c2307s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    s2307s_1: function (s, m) {
        return suggCeOrCet(m[2]);
    },
    c2311s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    s2311s_1: function (s, m) {
        return m[1].replace(/on/g, "a");
    },
    c2314s_1: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^[aâeéèêiîoôuûyœæ]/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[eGW]");
    },
    s2314s_1: function (s, m) {
        return m[1].replace(/a/g, "on");
    },
    c2314s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    s2314s_2: function (s, m) {
        return m[1].replace(/a/g, "on");
    },
    c2321s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    c2327s_1: function (s, sx, m, dDA, sCountry) {
        return ( morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && ! (look(s.slice(m.end[0]), / +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false)) ) || m[1] in aREGULARPLURAL;
    },
    s2327s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2331s_1: function (s, sx, m, dDA, sCountry) {
        return ( morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") || (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[pi]|>avoir") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou) ") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[2], m[2]], ":Y", false))) ) && ! (look(s.slice(m.end[0]), / +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false));
    },
    s2331s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2336s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ipYPGW]") && ! (look(s.slice(m.end[0]), / +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[1] in aREGULARPLURAL;
    },
    s2336s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2341s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[ipGW]") && ! (look(s.slice(m.end[0]), / +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[2] in aREGULARPLURAL;
    },
    s2341s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2346s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ipPGW]") && ! (look(s.slice(m.end[0]), / +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[1] in aREGULARPLURAL;
    },
    s2346s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2352s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ip]|>o(?:nde|xydation|or)\\b") && morphex(dDA, prevword1(s, m.index), ":(?:G|[123][sp])", ":[AD]", true)) || m[1] in aREGULARPLURAL;
    },
    s2352s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2358s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ip]") || m[1] in aREGULARPLURAL;
    },
    s2358s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2362s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ip]") || m[1] in aREGULARPLURAL;
    },
    s2362s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2366s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[123][sp]|:[si]");
    },
    s2366s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2370s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p");
    },
    s2370s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2373s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") || ( morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[si]") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou)") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[2], m[2]], ":Y", false)) );
    },
    s2373s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2377s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[siGW]");
    },
    s2377s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2381s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[siGW]");
    },
    s2381s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2385s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    c2389s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siG]");
    },
    c2393s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[siGW]") && ! morph(dDA, prevword(s, m.index, 2), ":B", false);
    },
    s2393s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2435s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! (m[2].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$/i) >= 0)) || m[2] in aREGULARPLURAL;
    },
    s2435s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2441s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! morph(dDA, prevword1(s, m.index), ":N", false) && ! (m[2].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$/i) >= 0)) || m[2] in aREGULARPLURAL;
    },
    s2441s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2447s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") || m[1] in aREGULARPLURAL) && ! look(s.slice(0,m.index), /\b(?:le|un|ce|du) +$/i);
    },
    s2447s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2451s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && ! (m[1].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor|Rois|Corinthiens|Thessaloniciens)$/i) >= 0);
    },
    s2451s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2455s_1: function (s, sx, m, dDA, sCountry) {
        return (m[1] != "1" && m[1] != "0" && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! (m[2].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$/i) >= 0)) || m[1] in aREGULARPLURAL;
    },
    s2455s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2463s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:p", ":(?:V0e|[NAQ].*:[me]:[si])");
    },
    c2463s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:p", ":(?:V0e|[NAQ].*:[me]:[si])");
    },
    c2463s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:[si]", ":(?:V0e|[NAQ].*:[me]:[si])");
    },
    c2467s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:s", ":(?:V0e|[NAQ].*:[me]:[pi])");
    },
    c2467s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:s", ":(?:V0e|[NAQ].*:[me]:[pi])");
    },
    c2467s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:[pi]", ":(?:V0e|[NAQ].*:[me]:[pi])");
    },
    c2471s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:p", ":(?:V0e|[NAQ].*:[fe]:[si])");
    },
    c2471s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:p", ":(?:V0e|[NAQ].*:[fe]:[si])");
    },
    c2471s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:[si]", ":(?:V0e|[NAQ].*:[fe]:[si])");
    },
    c2475s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:s", ":(?:V0e|[NAQ].*:[fe]:[pi])");
    },
    c2475s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:s", ":(?:V0e|[NAQ].*:[fe]:[pi])");
    },
    c2475s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:[pi]", ":(?:V0e|[NAQ].*:[fe]:[pi])");
    },
    c2487s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/);
    },
    c2490s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/);
    },
    s2490s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c2494s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[me]");
    },
    c2498s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[fe]");
    },
    c2502s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[me]");
    },
    c2506s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[fe]");
    },
    c2522s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false);
    },
    c2525s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false) && morphex(dDA, [m.start[4], m[4]], ":[NAQ].*:m", ":[fe]");
    },
    s2525s_1: function (s, m) {
        return m[1].replace(/lle/g, "l");
    },
    c2530s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false);
    },
    c2533s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false) && morphex(dDA, [m.start[4], m[4]], ":[NAQ].*:f", ":[me]");
    },
    s2533s_1: function (s, m) {
        return m[1].replace(/l/g, "lle");
    },
    c2552s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">trouver ", false) && morphex(dDA, [m.start[3], m[3]], ":A.*:(?:f|m:p)", ":(?:G|3[sp]|M[12P])");
    },
    s2552s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c2563s_1: function (s, sx, m, dDA, sCountry) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]);
    },
    s2563s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c2563s_2: function (s, sx, m, dDA, sCountry) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s"))) && ! apposition(m[1], m[2]);
    },
    s2563s_2: function (s, m) {
        return switchPlural(m[2]);
    },
    c2571s_1: function (s, sx, m, dDA, sCountry) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2571s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c2571s_2: function (s, sx, m, dDA, sCountry) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2571s_2: function (s, m) {
        return switchPlural(m[2]);
    },
    c2583s_1: function (s, sx, m, dDA, sCountry) {
        return ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":[GYfe]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":[GYme]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2583s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c2583s_2: function (s, sx, m, dDA, sCountry) {
        return ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[GYsi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[GYpi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2583s_2: function (s, m) {
        return switchPlural(m[2]);
    },
    c2595s_1: function (s, sx, m, dDA, sCountry) {
        return ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":(?:[Gfe]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":(?:[Gme]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2595s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c2595s_2: function (s, sx, m, dDA, sCountry) {
        return ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":(?:[Gsi]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":(?:[Gpi]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2595s_2: function (s, m) {
        return switchPlural(m[2]);
    },
    c2613s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^air$/i) >= 0) && ! m[2].startsWith("seul") && ((morph(dDA, [m.start[1], m[1]], ":m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2613s_1: function (s, m) {
        return switchGender(m[2], false);
    },
    c2613s_2: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^air$/i) >= 0) && ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[si]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2613s_2: function (s, m) {
        return suggSing(m[2]);
    },
    c2622s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && ((morph(dDA, [m.start[1], m[1]], ":m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]", false, false) && ! apposition(m[1], m[2]);
    },
    s2622s_1: function (s, m) {
        return switchGender(m[2], false);
    },
    c2622s_2: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^air$/i) >= 0) && ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[si]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! morph(dDA, prevword1(s, m.index), ":[NAQ]", false, false) && ! apposition(m[1], m[2]);
    },
    s2622s_2: function (s, m) {
        return suggSing(m[2]);
    },
    c2637s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "fois" && ! m[2].startsWith("seul") && ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":[fe]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":[me]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && morph(dDA, prevword1(s, m.index), ":[VRBX]", true, true) && ! apposition(m[1], m[2]);
    },
    s2637s_1: function (s, m) {
        return switchGender(m[2], true);
    },
    c2637s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && morph(dDA, prevword1(s, m.index), ":[VRBX]", true, true) && ! apposition(m[1], m[2]);
    },
    s2637s_2: function (s, m) {
        return suggPlur(m[2]);
    },
    c2658s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "fois" && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! m[2].startsWith("seul") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|d’) *$/);
    },
    s2658s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2662s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "fois" && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! m[2].startsWith("seul") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQB]", false, false);
    },
    s2662s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2672s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]", ":(?:B|G|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f") && ! apposition(m[2], m[3]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2672s_1: function (s, m) {
        return (m[1].search(/^(?:certains|quels)/i) >= 0) ? suggMasPlur(m[3])  : suggMasSing(m[3]);
    },
    c2678s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]", ":(?:B|G|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f") && ! apposition(m[2], m[3]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s2678s_1: function (s, m) {
        return (m[1].search(/^(?:certains|quels)/i) >= 0) ? suggMasPlur(m[3])  : suggMasSing(m[3]);
    },
    c2686s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:B|G|e|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f") && ! apposition(m[2], m[3]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2686s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c2691s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:B|G|e|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f") && ! apposition(m[2], m[3]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s2691s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c2698s_1: function (s, sx, m, dDA, sCountry) {
        return m[2] != "fois" && ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:m") && ! apposition(m[2], m[3]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2698s_1: function (s, m) {
        return (m[1].search(/^(?:certaines|quelles)/i) >= 0)  ? suggFemPlur(m[3])  : suggFemSing(m[3]);
    },
    c2704s_1: function (s, sx, m, dDA, sCountry) {
        return m[2] != "fois" && ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:m") && ! apposition(m[2], m[3]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s2704s_1: function (s, m) {
        return (m[1].search(/^(?:certaines|quelles)/i) >= 0)  ? suggFemPlur(m[3])  : suggFemSing(m[3]);
    },
    c2712s_1: function (s, sx, m, dDA, sCountry) {
        return m[2] != "fois" && ! m[3].startsWith("seul") && ! (m[0].search(/^quelque chose/i) >= 0) && ((morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:B|e|G|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:B|e|G|V0|m)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:m"))) && ! apposition(m[2], m[3]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2712s_1: function (s, m) {
        return switchGender(m[3], m[1].endsWith("s"));
    },
    c2717s_1: function (s, sx, m, dDA, sCountry) {
        return m[2] != "fois" && ! m[3].startsWith("seul") && ! (m[0].search(/^quelque chose/i) >= 0) && ((morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:B|e|G|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:B|e|G|V0|m)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:m"))) && ! apposition(m[2], m[3]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s2717s_1: function (s, m) {
        return switchGender(m[3], m[1].endsWith("s"));
    },
    c2726s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2726s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2731s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s2731s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2738s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWi]") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2738s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2743s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWi]") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s2743s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2750s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! apposition(m[1], m[2]);
    },
    s2750s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2755s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! morph(dDA, [m.start[3], m[3]], ":A", false) && ! apposition(m[1], m[2]);
    },
    s2755s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2761s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\bune? de /i);
    },
    s2761s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2794s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:s")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:p"));
    },
    s2794s_1: function (s, m) {
        return switchPlural(m[3]);
    },
    c2799s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:s");
    },
    s2799s_1: function (s, m) {
        return suggPlur(m[3]);
    },
    c2803s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:[pi]", ":G") && morph(dDA, [m.start[4], m[4]], ":[NAQ].*:s") && ! look(s.slice(0,m.index), /\bune? de /i);
    },
    s2803s_1: function (s, m) {
        return suggPlur(m[4]);
    },
    c2808s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:[si]", ":G") && morph(dDA, [m.start[4], m[4]], ":[NAQ].*:p");
    },
    s2808s_1: function (s, m) {
        return suggSing(m[4]);
    },
    c2815s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:(?:m|f:p)", ":(?:G|P|[fe]:[is]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s2815s_1: function (s, m) {
        return suggFemSing(m[2]);
    },
    c2819s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s2819s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c2823s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":[NAQ].*:f|>[aéeiou].*:e", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|m:[is]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s2823s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c2827s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":G|>[aéeiou].*:[ef]") && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") && ! apposition(m[2], m[3]);
    },
    s2827s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c2832s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":G|>[aéeiou].*:[ef]") && ! morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f|>[aéeiou].*:e", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") && ! apposition(m[2], m[3]);
    },
    s2832s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c2837s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":(?:G|P|[me]:[ip]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s2837s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2855s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":B.*:p", false) && m[2] != "cents";
    },
    c2890s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c2891s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c2892s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c2898s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\bquatre $/i);
    },
    c2901s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":B", false) && ! look(s.slice(0,m.index), /\b(?:numéro|page|chapitre|référence|année|test|série)s? +$/i);
    },
    c2912s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":B|>une?", false, true) && ! look(s.slice(0,m.index), /\b(?:numéro|page|chapitre|référence|année|test|série)s? +$/i);
    },
    c2916s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, nextword1(s, m.end[0]), ":B|>une?", false, false);
    },
    c2919s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", ":G") && morphex(dDA, prevword1(s, m.index), ":[VR]", ":B", true);
    },
    c2924s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, nextword1(s, m.end[0]), ":B") || (morph(dDA, prevword1(s, m.index), ":B") && morph(dDA, nextword1(s, m.end[0]), ":[NAQ]", false));
    },
    c2935s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c2938s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false) && morph(dDA, [m.start[3], m[3]], ":(?:N|MP)");
    },
    s2968s_1: function (s, m) {
        return m[1]._trimRight("e");
    },
    c2973s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:V0e|W)|>très", false);
    },
    c2978s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:co[ûu]ter|payer) ", false);
    },
    c2992s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">donner ", false);
    },
    c3000s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:mettre|mise) ", false);
    },
    c3012s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:avoir|perdre) ", false);
    },
    c3015s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:lit|fauteuil|armoire|commode|guéridon|tabouret|chaise)s?\b/i);
    },
    c3021s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":(?:V|[NAQ].*:s)", ":(?:[NA]:.:[pi]|V0e.*:[123]p)", true);
    },
    c3055s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:aller|partir) ", false);
    },
    c3070s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:[lmtsn]|soussignée?s?|seule?s?)$/i) >= 0) && morph(dDA, [m.start[2], m[2]], ":[NAQ]") && ! morph(dDA, prevword1(s, m.index), ":V0");
    },
    s3070s_1: function (s, m) {
        return suggSimil(m[2], ":[123][sp]");
    },
    c3076s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|devenir|para[îi]tre|rendre|sembler) ", false);
    },
    s3076s_1: function (s, m) {
        return m[2].replace(/oc/g, "o");
    },
    c3098s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">tenir ");
    },
    c3112s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">mettre ", false);
    },
    c3113s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c3133s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|aller) ", false);
    },
    s3135s_1: function (s, m) {
        return m[1].replace(/auspice/g, "hospice");
    },
    s3137s_1: function (s, m) {
        return m[1].replace(/auspice/g, "hospice");
    },
    c3158s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":[AQ]");
    },
    s3172s_1: function (s, m) {
        return m[1].replace(/cane/g, "canne");
    },
    c3179s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:appuyer|battre|frapper|lever|marcher) ", false);
    },
    s3179s_1: function (s, m) {
        return m[2].replace(/cane/g, "canne");
    },
    c3185s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^C(?:annes|ANNES)/) >= 0);
    },
    c3188s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^C(?:annes|ANNES)/) >= 0);
    },
    c3203s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c3210s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c3212s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":[VR]", false);
    },
    c3219s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">tordre ", false);
    },
    c3221s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">rendre ", false);
    },
    c3228s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">couper ");
    },
    c3229s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:avoir|donner) ", false);
    },
    c3241s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V.[^:]:(?!Q)");
    },
    c3247s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:[lmtsc]es|des?|[nv]os|leurs|quels) +$/i);
    },
    c3252s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, nextword1(s, m.end[0]), ":[GV]", ":[NAQ]", true);
    },
    c3255s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, nextword1(s, m.end[0]), ":[GV]", ":[NAQ]");
    },
    c3258s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, nextword1(s, m.end[0]), ":[GV]", ":[NAQ]", true);
    },
    c3261s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, nextword1(s, m.end[0]), ":G", ":[NAQ]");
    },
    c3264s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    s3264s_1: function (s, m) {
        return m[2].replace(/nd/g, "nt");
    },
    c3274s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":V0e", false);
    },
    c3277s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ">(?:abandonner|céder|résister) ", false);
    },
    s3284s_1: function (s, m) {
        return m[1].replace(/nt/g, "mp");
    },
    c3292s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false) && morph(dDA, [m.start[3], m[3]], ":Y", false);
    },
    s3292s_1: function (s, m) {
        return m[2].replace(/sens/g, "cens");
    },
    s3297s_1: function (s, m) {
        return m[1].replace(/o/g, "ô");
    },
    c3312s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c3329s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:desceller|desseller) ", false);
    },
    s3329s_1: function (s, m) {
        return m[2].replace(/descell/g, "décel").replace(/dessell/g, "décel");
    },
    c3333s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:desceller|desseller) ", false);
    },
    s3333s_1: function (s, m) {
        return m[1].replace(/descell/g, "décel").replace(/dessell/g, "décel");
    },
    c3343s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false);
    },
    s3343s_1: function (s, m) {
        return m[2].replace(/î/g, "i");
    },
    c3346s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:[vn]ous|lui|leur|et toi) +$|[nm]’$/i);
    },
    s3354s_1: function (s, m) {
        return m[1].replace(/and/g, "ant");
    },
    c3357s_1: function (s, sx, m, dDA, sCountry) {
        return ! ( m[1] == "bonne" && look(s.slice(0,m.index), /\bune +$/i) && look(s.slice(m.end[0]), /^ +pour toute/i) );
    },
    c3360s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:faire|perdre) ");
    },
    c3375s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":D");
    },
    s3434s_1: function (s, m) {
        return m[0].slice(0,-1).replace(/ /g, "-")+"à";
    },
    c3435s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":[NAQ]");
    },
    c3436s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":[123][sp]");
    },
    c3440s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[GQ]");
    },
    c3442s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[GQ]");
    },
    c3446s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[GQ]");
    },
    c3454s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":Y", ":[NA].*:[pe]") && ! look(s.slice(0,m.index), /\b[ld]es +$/i);
    },
    c3462s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">soulever ", false);
    },
    s3462s_1: function (s, m) {
        return m[1].slice(3);
    },
    c3474s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|habiter|trouver|situer|rester|demeurer?) ", false);
    },
    c3485s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c3489s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c3503s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1] == "Notre" && look(s.slice(m.end[0]), /Père/));
    },
    s3503s_1: function (s, m) {
        return m[1].replace(/otre/g, "ôtre");
    },
    c3505s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(les?|la|du|des|aux?) +/i) && morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    s3505s_1: function (s, m) {
        return m[1].replace(/ôtre/g, "otre")._trimRight("s");
    },
    c3513s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c3524s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c3527s_1: function (s, sx, m, dDA, sCountry) {
        return ( (m[2].search(/^[nmts]e$/) >= 0) || (! (m[2].search(/^(?:confiance|envie|peine|prise|crainte|affaire|hâte|force|recours|somme)$/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[AG]")) ) && ! prevword1(s, m.index);
    },
    c3532s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:[1-3][sp])", ":(?:G|1p)") && ! ( m[0].indexOf(" leur ") && morph(dDA, [m.start[2], m[2]], ":[NA].*:[si]", false) ) && ! prevword1(s, m.index);
    },
    c3538s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false) && ! look(s.slice(m.end[0]), /^ +>/) && ! morph(dDA, nextword1(s, m.end[0]), ":3s", false);
    },
    c3546s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V.[a-z_!?]+:(?!Y)");
    },
    c3547s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V0e", ":Y");
    },
    c3549s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    s3555s_1: function (s, m) {
        return m[1].replace(/pin/g, "pain");
    },
    c3557s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:manger|dévorer|avaler|engloutir) ");
    },
    s3557s_1: function (s, m) {
        return m[2].replace(/pin/g, "pain");
    },
    c3564s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">aller ", false);
    },
    c3571s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    s3571s_1: function (s, m) {
        return m[2].replace(/pal/g, "pâl");
    },
    s3574s_1: function (s, m) {
        return m[2].replace(/pal/g, "pâl");
    },
    c3580s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">prendre ", false);
    },
    c3581s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">tirer ", false);
    },
    c3582s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c3584s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">prendre ", false);
    },
    c3592s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ]");
    },
    c3593s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c3599s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":A") && ! (m[2].search(/^seule?s?$/i) >= 0);
    },
    c3604s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:N|A|Q|G|MP)");
    },
    c3617s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":(?:Y|M[12P])");
    },
    c3620s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /(?:peu|de) $/i) && morph(dDA, [m.start[2], m[2]], ":Y|>(tout|les?|la) ");
    },
    c3632s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c3638s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":Q");
    },
    c3646s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":[AQ]", false);
    },
    c3666s_1: function (s, sx, m, dDA, sCountry) {
        return ! nextword1(s, m.end[0]);
    },
    c3669s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">résonner ", false);
    },
    s3669s_1: function (s, m) {
        return m[1].replace(/réso/g, "raiso");
    },
    c3679s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M1", false);
    },
    s3692s_1: function (s, m) {
        return m[1].replace(/sale/g, "salle");
    },
    c3696s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    s3696s_1: function (s, m) {
        return m[2].replace(/salle/g, "sale");
    },
    s3710s_1: function (s, m) {
        return m[1].replace(/scep/g,"sep");
    },
    c3713s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">être ", false);
    },
    s3713s_1: function (s, m) {
        return m[2].replace(/sep/g, "scep");
    },
    c3721s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">suivre ", false);
    },
    c3729s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), / soit /);
    },
    c3730s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, nextword1(s, m.end[0]), ":[GY]", true, true) && ! look(s.slice(0,m.index), /quel(?:s|les?|) qu $|on $|il $/i) && ! look(s.slice(m.end[0]), / soit /);
    },
    c3747s_1: function (s, sx, m, dDA, sCountry) {
        return ( morphex(dDA, [m.start[2], m[2]], ":N.*:[me]:s", ":[GW]") || ((m[2].search(/^[aeéiîou]/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":N.*:f:s", ":G")) ) && ( look(s.slice(0,m.index), /^ *$|\b(?:à|avec|chez|dès|contre|devant|derrière|en|par|pour|sans|sur) +$|, +$/i) || (morphex(dDA, prevword1(s, m.index), ":V", ":(?:G|W|[NA].*:[pi])") && ! look(s.slice(0,m.index), /\bce que?\b/i)) );
    },
    s3767s_1: function (s, m) {
        return m[1].replace(/sur/g, "sûr");
    },
    s3770s_1: function (s, m) {
        return m[1].replace(/sur/g, "sûr");
    },
    c3776s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":M1", false);
    },
    c3779s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":Y", false);
    },
    s3779s_1: function (s, m) {
        return m[1].replace(/sur/g, "sûr");
    },
    c3788s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":N", ":[MY]|>fond ");
    },
    s3788s_1: function (s, m) {
        return m[1].replace(/â/g, "a");
    },
    s3792s_1: function (s, m) {
        return m[1].replace(/â/g, "a");
    },
    c3801s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ">aller ", false);
    },
    c3804s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    s3807s_1: function (s, m) {
        return m[1].replace(/taule/g, "tôle");
    },
    c3817s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false) && morph(dDA, [m.start[3], m[3]], ":Y", false);
    },
    c3825s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false);
    },
    c3850s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]:s");
    },
    c3869s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">ouvrir ", false);
    },
    c3878s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":A") && ! morph(dDA, nextword1(s, m.end[0]), ":D", false, false);
    },
    c3907s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1]._isDigit() && ! m[2]._isDigit() && ! morph(dDA, [m.start[0], m[0]], ":", false) && ! morph(dDA, [m.start[2], m[2]], ":G", false) && _oDict.isValid(m[1]+m[2]);
    },
    c3907s_2: function (s, sx, m, dDA, sCountry) {
        return m[2] != "là" && ! (m[1].search(/^(?:ex|mi|quasi|semi|non|demi|pro|anti|multi|pseudo|proto|extra)$/i) >= 0) && ! m[1]._isDigit() && ! m[2]._isDigit() && ! morph(dDA, [m.start[2], m[2]], ":G", false) && ! morph(dDA, [m.start[0], m[0]], ":", false) && ! _oDict.isValid(m[1]+m[2]);
    },
    c3920s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ,] +$/);
    },
    s3920s_1: function (s, m) {
        return m[0].toLowerCase();
    },
    c3925s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ,] +$/) && !( ( m[0]=="Juillet" && look(s.slice(0,m.index), /monarchie +de +$/i) ) || ( m[0]=="Octobre" && look(s.slice(0,m.index), /révolution +d’$/i) ) );
    },
    s3925s_1: function (s, m) {
        return m[0].toLowerCase();
    },
    c3944s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].search(/^fonctions? /i) >= 0) || ! look(s.slice(0,m.index), /\ben $/i);
    },
    c3951s_1: function (s, sx, m, dDA, sCountry) {
        return m[2]._isTitle() && morphex(dDA, [m.start[1], m[1]], ":N", ":(?:A|V0e|D|R|B)");
    },
    s3951s_1: function (s, m) {
        return m[2].toLowerCase();
    },
    c3951s_2: function (s, sx, m, dDA, sCountry) {
        return m[2]._isLowerCase() && ! m[2].startsWith("canadienne") && ( (m[1].search(/^(?:certaine?s?|cette|ce[ts]?|[dl]es|[nv]os|quelques|plusieurs|chaque|une)$/i) >= 0) || ( (m[1].search(/^un$/i) >= 0) && ! look(s.slice(m.end[0]), /(?:approximatif|correct|courant|parfait|facile|aisé|impeccable|incompréhensible)/) ) );
    },
    s3951s_2: function (s, m) {
        return m[2]._toCapitalize();
    },
    s3963s_1: function (s, m) {
        return m[1]._toCapitalize();
    },
    c3967s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:parler|cours|leçon|apprendre|étudier|traduire|enseigner|professeur|enseignant|dictionnaire|méthode) ", false);
    },
    s3967s_1: function (s, m) {
        return m[2].toLowerCase();
    },
    s3972s_1: function (s, m) {
        return m[1].toLowerCase();
    },
    c3981s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c3993s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/);
    },
    s4003s_1: function (s, m) {
        return m[1]._toCapitalize();
    },
    s4005s_1: function (s, m) {
        return m[1]._toCapitalize();
    },
    c4010s_1: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^(?:Mètre|Watt|Gramme|Seconde|Ampère|Kelvin|Mole|Cand[eé]la|Hertz|Henry|Newton|Pascal|Joule|Coulomb|Volt|Ohm|Farad|Tesla|W[eé]ber|Radian|Stéradian|Lumen|Lux|Becquerel|Gray|Sievert|Siemens|Katal)s?|(?:Exa|P[ée]ta|Téra|Giga|Méga|Kilo|Hecto|Déc[ai]|Centi|Mi(?:lli|cro)|Nano|Pico|Femto|Atto|Ze(?:pto|tta)|Yo(?:cto|etta))(?:mètre|watt|gramme|seconde|ampère|kelvin|mole|cand[eé]la|hertz|henry|newton|pascal|joule|coulomb|volt|ohm|farad|tesla|w[eé]ber|radian|stéradian|lumen|lux|becquerel|gray|sievert|siemens|katal)s?/) >= 0);
    },
    s4010s_1: function (s, m) {
        return m[2].toLowerCase();
    },
    c4036s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":Y", false);
    },
    c4038s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V1") && ! look(s.slice(0,m.index), /\b(?:quelqu(?:e chose|’une?)|(?:l(es?|a)|nous|vous|me|te|se)[ @]trait|personne|rien(?: +[a-zéèêâîûù]+|) +$)/i);
    },
    s4038s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4041s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":M[12P]");
    },
    s4041s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4043s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V1", false);
    },
    s4043s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4045s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":[123][sp]");
    },
    c4047s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":[NM]") && ! morph(dDA, prevword1(s, m.index), ">(?:tenir|passer) ", false);
    },
    s4047s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4050s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V1", false);
    },
    s4050s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4052s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":[NM]");
    },
    s4052s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4054s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":Q", false);
    },
    c4056s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Q|2p)", false);
    },
    s4056s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4058s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":Q", false) && ! morph(dDA, prevword1(s, m.index), "V0.*[12]p", false);
    },
    c4060s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:devoir|savoir|pouvoir) ", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Q|A|[13]s|2[sp])", ":[GYW]");
    },
    s4060s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c4063s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|A|[13]s|2[sp])", ":[GYW]");
    },
    s4063s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    s4071s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c4097s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c4101s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">sembler ", false);
    },
    c4115s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4118s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V[123]_i_._") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4120s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":A", false) && morphex(dDA, [m.start[2], m[2]], ":A", ":[GM]");
    },
    c4122s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":A", false);
    },
    c4124s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GV]") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4126s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":N", ":[GY]") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4129s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":V0") && morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:G|[123][sp]|P)");
    },
    c4140s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4144s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /[jn]’$/);
    },
    c4152s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":G") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4155s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4158s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4162s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c4165s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":N", ":[GY]") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4167s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4169s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":Y") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4201s_1: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^(?:fini|terminé)s?/i) >= 0) && morph(dDA, prevword1(s, m.index), ":C", false, true);
    },
    c4201s_2: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^(?:assez|trop)$/i) >= 0) && (look(s.slice(m.end[0]), /^ +d(?:e |’)/) || ! nextword1(s, m.end[0]));
    },
    c4201s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":A", ":[GVW]") && morph(dDA, prevword1(s, m.index), ":C", false, true);
    },
    c4213s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">aller", false) && ! look(s.slice(m.end[0]), / soit /);
    },
    c4221s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    s4221s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4223s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    s4223s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4225s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    s4225s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4228s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:faire|vouloir) ", false) && ! look(s.slice(0,m.index), /\b(?:en|[mtsld]es?|[nv]ous|un) +$/i) && morphex(dDA, [m.start[2], m[2]], ":V", ":M");
    },
    s4228s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c4231s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">savoir :V", false) && morph(dDA, [m.start[2], m[2]], ":V", false) && ! look(s.slice(0,m.index), /\b(?:[mts]e|[vn]ous|les?|la|un) +$/i);
    },
    s4231s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c4234s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Q|2p)", false);
    },
    s4234s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4237s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|2p)", ":N");
    },
    s4237s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4280s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s4280s_1: function (s, m) {
        return suggSing(m[3]);
    },
    c4284s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[1], m[1]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[1].endsWith(" été")) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s4284s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c4288s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]"));
    },
    s4288s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4293s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[GWYsi]") || ( morphex(dDA, [m.start[1], m[1]], ":[AQ].*:f", ":[GWYme]") && ! morph(dDA, nextword1(s, m.end[0]), ":N.*:f", false, false) );
    },
    s4293s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c4297s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[GWYsi]") || ( morphex(dDA, [m.start[1], m[1]], ":[AQ].*:f", ":[GWYme]") && ! morph(dDA, nextword1(s, m.end[0]), ":N.*:f", false, false) );
    },
    s4297s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c4301s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s4301s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4307s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && ! morph(dDA, prevword1(s, m.index), ":R|>de ", false, false);
    },
    s4307s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c4313s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]"));
    },
    s4313s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c4318s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^légion$/i) >= 0) && ! look(s.slice(0,m.index), /\b(?:nous|ne) +$/i) && ((morph(dDA, [m.start[1], m[1]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) && morph(dDA, [m.start[1], m[1]], ":1p", false)) || m[1].endsWith(" été")) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWYpi]");
    },
    s4318s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4324s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && ! look(s.slice(0,m.index), /ce que? +$/) && (! (m[1].search(/^(?:ceux-(?:ci|là)|lesquels)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4324s_1: function (s, m) {
        return suggMasPlur(m[3]);
    },
    c4330s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && (! (m[1].search(/^(?:elles|celles-(?:ci|là)|lesquelles)$/i) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4330s_1: function (s, m) {
        return suggFemPlur(m[3]);
    },
    c4336s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false) && morphex(dDA, [m.start[2], m[2]], ":[123]s", ":[GNAQWY]");
    },
    s4336s_1: function (s, m) {
        return suggVerbPpas(m[2]);
    },
    c4417s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s4417s_1: function (s, m) {
        return suggSing(m[3]);
    },
    c4421s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s4421s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c4425s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]"));
    },
    s4425s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4430s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[MWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s4430s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4436s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s4436s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c4442s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[MWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]"));
    },
    s4442s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c4447s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^légion$/i) >= 0) && morph(dDA, [m.start[1], m[1]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && morph(dDA, [m.start[1], m[1]], ":1p", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWYpi]");
    },
    s4447s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4452s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && (! (m[1].search(/^(?:ceux-(?:ci|là)|lesquels)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4452s_1: function (s, m) {
        return suggMasPlur(m[3]);
    },
    c4458s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && (! (m[1].search(/^(?:elles|celles-(?:ci|là)|lesquelles)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4458s_1: function (s, m) {
        return suggFemPlur(m[3]);
    },
    c4489s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GMWYsi]") && ! morph(dDA, [m.start[1], m[1]], ":G", false);
    },
    s4489s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c4493s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^légion$/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWYpi]") && ! morph(dDA, [m.start[1], m[1]], ":G", false);
    },
    s4493s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4498s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && ((morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWme]") && morphex(dDA, [m.start[2], m[2]], ":m", ":[Gfe]")) || (morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWfe]") && morphex(dDA, [m.start[2], m[2]], ":f", ":[Gme]"))) && ! ( morph(dDA, [m.start[3], m[3]], ":p", false) && morph(dDA, [m.start[2], m[2]], ":s", false) ) && ! morph(dDA, prevword1(s, m.index), ":(?:R|P|Q|Y|[123][sp])", false, false) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4498s_1: function (s, m) {
        return switchGender(m[3]);
    },
    c4505s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^légion$/i) >= 0) && ((morphex(dDA, [m.start[1], m[1]], ":M[1P].*:f", ":[GWme]") && morphex(dDA, [m.start[2], m[2]], ":m", ":[GWfe]")) || (morphex(dDA, [m.start[1], m[1]], ":M[1P].*:m", ":[GWfe]") && morphex(dDA, [m.start[2], m[2]], ":f", ":[GWme]"))) && ! morph(dDA, prevword1(s, m.index), ":(?:R|P|Q|Y|[123][sp])", false, false) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4505s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c4513s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:p", ":(?:G|E|M1|s|i)");
    },
    s4513s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c4517s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[fp]", ":(?:G|E|M1|m:[si])");
    },
    s4517s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c4521s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[mp]", ":(?:G|E|M1|f:[si])");
    },
    s4521s_1: function (s, m) {
        return suggFemSing(m[1]);
    },
    c4525s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[fs]", ":(?:G|E|M1|m:[pi])");
    },
    s4525s_1: function (s, m) {
        return suggMasPlur(m[1]);
    },
    c4529s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[ms]", ":(?:G|E|M1|f:[pi])");
    },
    s4529s_1: function (s, m) {
        return suggFemPlur(m[1]);
    },
    c4535s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], "V0e", false);
    },
    c4542s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]");
    },
    s4542s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c4545s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]");
    },
    s4545s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c4548s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]") || morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|[AQ].*:f)", ":[GWme]"));
    },
    s4548s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c4551s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]") || morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|[AQ].*:m)", ":[GWfe]"));
    },
    s4551s_1: function (s, m) {
        return suggFemSing(m[1]);
    },
    c4554s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]");
    },
    s4554s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c4557s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^légion$/i) >= 0) && (morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]") || morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|[AQ].*:f)", ":[GWme]"));
    },
    s4557s_1: function (s, m) {
        return suggMasPlur(m[1]);
    },
    c4560s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^légion$/i) >= 0) && (morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]") || morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|[AQ].*:m)", ":[GWfe]"));
    },
    s4560s_1: function (s, m) {
        return suggFemPlur(m[1]);
    },
    c4588s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":[QWGBMpi]") && ! (m[1].search(/^(?:légion|nombre|cause)$/i) >= 0) && ! look(s.slice(0,m.index), /\bce que?\b/i);
    },
    s4588s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c4588s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:N|A|Q|W|G|3p)") && ! look(s.slice(0,m.index), /\bce que?\b/i);
    },
    s4588s_2: function (s, m) {
        return suggVerbPpas(m[1], ":m:p");
    },
    c4599s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWsi]");
    },
    s4599s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c4603s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWsi]");
    },
    s4603s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c4607s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWsi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[GWme]")) && (! (m[1].search(/^(?:celui-(?:ci|là)|lequel)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4607s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4613s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWsi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[GWfe]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s4613s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c4619s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWsi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[GWfe]"));
    },
    s4619s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c4624s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWpi]");
    },
    s4624s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4628s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWpi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[GWme]")) && (! (m[1].search(/^(?:ceux-(?:ci|là)|lesquels)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4628s_1: function (s, m) {
        return suggMasPlur(m[3]);
    },
    c4634s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWpi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[GWfe]")) && (! (m[1].search(/^(?:elles|celles-(?:ci|là)|lesquelles)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4634s_1: function (s, m) {
        return suggFemPlur(m[3]);
    },
    c4642s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) ", false) && morphex(dDA, [m.start[2], m[2]], ":[AQ]:(?:m:p|f)", ":(?:G|[AQ]:m:[is])");
    },
    s4642s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4645s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) ", false) && morphex(dDA, [m.start[2], m[2]], ":[AQ]:(?:f:p|m)", ":(?:G|[AQ]:f:[is])");
    },
    s4645s_1: function (s, m) {
        return suggFemSing(m[2]);
    },
    c4648s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) ", false) && morphex(dDA, [m.start[2], m[2]], ":[AQ].*:s", ":(?:G|[AQ].*:[ip])");
    },
    s4648s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4651s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:trouver|considérer|croire) ", false) && morphex(dDA, [m.start[3], m[3]], ":[AQ].*:p", ":(?:G|[AQ].*:[is])");
    },
    s4651s_1: function (s, m) {
        return suggSing(m[3]);
    },
    c4654s_1: function (s, sx, m, dDA, sCountry) {
        return ( morphex(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) ", ":1p") || (morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) .*:1p", false) && look(s.slice(0,m.index), /\bn(?:ous|e) +$/)) ) && morphex(dDA, [m.start[2], m[2]], ":[AQ].*:s", ":(?:G|[AQ].*:[ip])");
    },
    s4654s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4676s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$/i) >= 0) && morph(dDA, [m.start[2], m[2]], ":V0a", false) && morphex(dDA, [m.start[3], m[3]], ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])");
    },
    s4676s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4682s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[4].search(/^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$/i) >= 0) && morph(dDA, [m.start[3], m[3]], ":V0a", false) && morphex(dDA, [m.start[4], m[4]], ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])");
    },
    s4682s_1: function (s, m) {
        return suggMasSing(m[4]);
    },
    c4688s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:s", ":[GWpi]") && ! morph(dDA, nextword1(s, m.end[0]), ":V", false);
    },
    s4688s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4693s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t_.*:Q.*:s", ":[GWpi]") && ! look(s.slice(0,m.index), /\bque?\b/);
    },
    s4693s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4698s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]") && ! morph(dDA, nextword1(s, m.end[0]), ":V", false);
    },
    s4698s_1: function (s, m) {
        return m[2].slice(0,-1);
    },
    c4703s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0a", false) && morphex(dDA, [m.start[3], m[3]], ":V[0-3]..t_.*:Q.*:p", ":[GWsi]") && ! look(s.slice(0,m.index), /\bque?\b/) && ! morph(dDA, nextword1(s, m.end[0]), ":V", false);
    },
    s4703s_1: function (s, m) {
        return m[3].slice(0,-1);
    },
    c4708s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":Q.*:(?:f|m:p)", ":m:[si]");
    },
    s4708s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c4714s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$/i) >= 0) && morphex(dDA, [m.start[1], m[1]], ":Q.*:(?:f|m:p)", ":m:[si]") && look(s.slice(0,m.index), /(?:après +$|sans +$|pour +$|que? +$|quand +$|, +$|^ *$)/i);
    },
    s4714s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c4744s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":V0a", false) && ! ((m[4].search(/^(?:décidé|essayé|tenté)$/) >= 0) && look(s.slice(m.end[0]), / +d(?:e |’)/)) && morph(dDA, [m.start[2], m[2]], ":[NAQ]", false) && morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:s", ":[GWpi]") && ! morph(dDA, nextword1(s, m.end[0]), ":(?:Y|Oo)", false);
    },
    s4744s_1: function (s, m) {
        return suggPlur(m[4], m[2]);
    },
    c4752s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":V0a", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m", false) && (morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:f", ":[GWme]") || morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]"));
    },
    s4752s_1: function (s, m) {
        return suggMasSing(m[4]);
    },
    c4759s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":V0a", false) && ! ((m[4].search(/^(?:décidé|essayé|tenté)$/) >= 0) && look(s.slice(m.end[0]), / +d(?:e |’)/)) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f", false) && (morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:m", ":[GWfe]") || morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]")) && ! morph(dDA, nextword1(s, m.end[0]), ":(?:Y|Oo)|>que?", false);
    },
    s4759s_1: function (s, m) {
        return suggFemSing(m[4]);
    },
    c4779s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && (morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:f", ":[GWme]") || morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]"));
    },
    s4779s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4785s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^(?:A|avions)$/) >= 0) && morph(dDA, [m.start[1], m[1]], ":V0a", false) && morph(dDA, [m.start[2], m[2]], ":V.+:(?:Y|2p)", false);
    },
    s4785s_1: function (s, m) {
        return suggVerbPpas(m[2], ":m:s");
    },
    c4791s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && (morph(dDA, [m.start[3], m[3]], ":Y") || (m[3].search(/^(?:[mtsn]e|[nv]ous|leur|lui)$/) >= 0));
    },
    c4795s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && (morph(dDA, [m.start[3], m[3]], ":Y") || (m[3].search(/^(?:[mtsn]e|[nv]ous|leur|lui)$/) >= 0));
    },
    c4801s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":[NAQ].*:m", false);
    },
    c4803s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c4820s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Y|2p|Q.*:[fp])", ":m:[si]") && m[2] != "prise" && ! morph(dDA, prevword1(s, m.index), ">(?:les|[nv]ous|en)|:[NAQ].*:[fp]", false) && ! look(s.slice(0,m.index), /\bquel(?:le|)s?\b/i);
    },
    s4820s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4826s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0a", false) && morphex(dDA, [m.start[3], m[3]], ":(?:Y|2p|Q.*:p)", ":[si]");
    },
    s4826s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4831s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[123]..t.* :Q.*:s", ":[GWpi]");
    },
    s4831s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4837s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:G|Y|P|1p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|tu|ils?|elles?|on|[vn]ous) /);
    },
    s4837s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c4843s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:G|Y|P|2p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|ils?|elles?|on|[vn]ous) /);
    },
    s4843s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c4880s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":G");
    },
    c4888s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V[13].*:Ip.*:2s", ":[GNA]");
    },
    s4888s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c4891s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V[13].*:Ip.*:2s", ":G");
    },
    s4891s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c4896s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[MOs]");
    },
    c4899s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V[23].*:Ip.*:3s", ":[GNA]") && analyse(m[1].slice(0,-1)+"s", ":E:2s", false) && ! (m[1].search(/^doit$/i) >= 0) && ! ((m[1].search(/^vient$/i) >= 0) && look(s.slice(m.end[0]), / +l[ea]/));
    },
    s4899s_1: function (s, m) {
        return m[1].slice(0,-1)+"s";
    },
    c4903s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V[23].*:Ip.*:3s", ":G") && analyse(m[1].slice(0,-1)+"s", ":E:2s", false);
    },
    s4903s_1: function (s, m) {
        return m[1].slice(0,-1)+"s";
    },
    c4908s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V3.*:Ip.*:3s", ":[GNA]");
    },
    c4911s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V3.*:Ip.*:3s", ":G");
    },
    c4921s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":A", ":G") && ! look(s.slice(m.end[0]), /\bsoit\b/);
    },
    c4932s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":E|>chez", false) && _oDict.isValid(m[1]);
    },
    s4932s_1: function (s, m) {
        return suggVerbImpe(m[1]);
    },
    c4937s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":E|>chez", false) && _oDict.isValid(m[1]);
    },
    s4937s_1: function (s, m) {
        return suggVerbTense(m[1], ":E", ":2s");
    },
    c4962s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]");
    },
    c4967s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:Y|3[sp])", true) && morph(dDA, prevword1(s, m.index), ":Cc", false, true) && ! look(s.slice(0,m.index), /~ +$/);
    },
    c4972s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:N|A|Q|Y|B|3[sp])", true) && morph(dDA, prevword1(s, m.index), ":Cc", false, true) && ! look(s.slice(0,m.index), /~ +$/);
    },
    c4977s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:N|A|Q|Y|MP)", true) && morph(dDA, prevword1(s, m.index), ":Cc", false, true) && ! look(s.slice(0,m.index), /~ +$/);
    },
    c4990s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":(?:G|M[12])") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:Y|[123][sp])", true);
    },
    s4990s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c4995s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":E", false);
    },
    s4995s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5000s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":E", false) && morphex(dDA, nextword1(s, m.end[0]), ":[RC]", ":[NAQ]", true);
    },
    s5000s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5005s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":E", false) && morphex(dDA, nextword1(s, m.end[0]), ":[RC]", ":Y", true);
    },
    s5005s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5011s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    s5011s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5013s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    s5015s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5041s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, true);
    },
    c5042s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    c5044s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    c5046s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]");
    },
    c5047s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":[123]s", false, false);
    },
    c5048s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:[123]s|R)", false, false);
    },
    c5049s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:[123]p|R)", false, false);
    },
    c5050s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":3p", false, false);
    },
    c5051s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false);
    },
    c5052s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:[NAQ].*:m:[si]|G|M)");
    },
    c5053s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:[NAQ].*:f:[si]|G|M)");
    },
    c5054s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:[NAQ].*:[si]|G|M)");
    },
    c5055s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:[NAQ].*:[si]|G|M)");
    },
    c5057s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:A|G|M|1p)");
    },
    c5058s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:A|G|M|2p)");
    },
    c5060s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    c5061s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    c5062s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":2s", false) || look(s.slice(0,m.index), /\b(?:je|tu|on|ils?|elles?|nous) +$/i);
    },
    c5063s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":2s|>(ils?|elles?|on) ", false) || look(s.slice(0,m.index), /\b(?:je|tu|on|ils?|elles?|nous) +$/i);
    },
    c5077s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c5080s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":Y");
    },
    c5094s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:ce que?|tout) /i);
    },
    c5106s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":M") && ! (m[1].endsWith("ez") && look(s.slice(m.end[0]), / +vous/));
    },
    s5106s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c5109s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|2p)", ":M");
    },
    s5109s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c5112s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:aimer|aller|désirer|devoir|espérer|pouvoir|préférer|souhaiter|venir) ", false) && ! morph(dDA, [m.start[1], m[1]], ":[GN]", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":M");
    },
    s5112s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5116s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">devoir ", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":M") && ! morph(dDA, prevword1(s, m.index), ":D", false);
    },
    s5116s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5119s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:cesser|décider|défendre|suggérer|commander|essayer|tenter|choisir|permettre|interdire) ", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Q|2p)", ":M");
    },
    s5119s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5122s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|2p)", ":M");
    },
    s5122s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c5125s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">valoir ", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Q|2p)", ":[GM]");
    },
    s5125s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5128s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":[NM]") && ! look(s.slice(0,m.index), /> +$/);
    },
    s5128s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c5131s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V1", ":N");
    },
    s5131s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5144s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false) && (morphex(dDA, [m.start[2], m[2]], ":Y", ":[NAQ]") || m[2] in aSHOULDBEVERB) && ! (m[1].search(/^(?:soit|été)$/i) >= 0) && ! morph(dDA, prevword1(s, m.index), ":Y|>ce", false, false) && ! look(s.slice(0,m.index), /ce (?:>|qu|que >) $/i) && ! look_chk1(dDA, s.slice(0,m.index), 0, /([a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+) +> $/i, ":Y") && ! look_chk1(dDA, s.slice(0,m.index), 0, /^ *>? *([a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+)/i, ":Y");
    },
    s5144s_1: function (s, m) {
        return suggVerbPpas(m[2]);
    },
    c5155s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":1s|>(?:en|y)", false);
    },
    s5155s_1: function (s, m) {
        return suggVerb(m[1], ":1s");
    },
    c5158s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:1s", false, false));
    },
    s5158s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c5161s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G|1p)");
    },
    s5161s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c5164s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G|1p)");
    },
    s5164s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c5167s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G|1p|3p!)");
    },
    s5167s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c5187s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|[ISK].*:2s)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:2s", false, false));
    },
    s5187s_1: function (s, m) {
        return suggVerb(m[2], ":2s");
    },
    c5190s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|[ISK].*:2s)");
    },
    s5190s_1: function (s, m) {
        return suggVerb(m[2], ":2s");
    },
    c5193s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|2p|3p!|[ISK].*:2s)");
    },
    s5193s_1: function (s, m) {
        return suggVerb(m[2], ":2s");
    },
    c5204s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3s", false, false));
    },
    s5204s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5207s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)");
    },
    s5207s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5222s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:N|A|3s|P|Q|G|V0e.*:3p)");
    },
    s5222s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5226s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|Q|G)");
    },
    s5226s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5234s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|Q|G|3p!)") && ! morph(dDA, prevword1(s, m.index), ":[VR]|>de", false, false) && !(m[1].endsWith("out") && morph(dDA, [m.start[2], m[2]], ":Y", false));
    },
    s5234s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5251s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3s|P|G|3p!)") && ! morph(dDA, prevword1(s, m.index), ":R|>(?:et|ou)", false, false) && ! (morph(dDA, [m.start[1], m[1]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3s", false, false));
    },
    s5251s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c5255s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3s|P|G|3p!)") && ! morph(dDA, prevword1(s, m.index), ":R|>(?:et|ou)", false, false);
    },
    s5255s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c5272s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":3p", ":(?:G|3s)");
    },
    c5275s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":3s", ":(?:G|3p)");
    },
    c5278s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":3p", ":(?:G|3s)") && (! prevword1(s, m.index) || look(s.slice(0,m.index), /\b(?:parce que?|quoi ?que?|pour ?quoi|puisque?|quand|com(?:ment|bien)|car|tandis que?) +$/i));
    },
    c5282s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":3s", ":(?:G|3p)") && (! prevword1(s, m.index) || look(s.slice(0,m.index), /\b(?:parce que?|quoi ?que?|pour ?quoi|puisque?|quand|com(?:ment|bien)|car|tandis que?) +$/i));
    },
    s5290s_1: function (s, m) {
        return m[1].slice(0,-1)+"t";
    },
    c5293s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P|Q|[123][sp]|R)", true) && !( m[1].endsWith("ien") && look(s.slice(0,m.index), /> +$/) && morph(dDA, [m.start[2], m[2]], ":Y", false) );
    },
    s5293s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5311s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G|Q)") && morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P|Q|[123][sp]|R)", true);
    },
    s5311s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5315s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P|Q|[123][sp]|R)", true);
    },
    s5315s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5323s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":Y", false) && morph(dDA, [m.start[2], m[2]], ":V.[a-z_!?]+(?!.*:(?:3s|P|Q|Y|3p!))");
    },
    s5323s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5331s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:3s|P|Q|Y|3p!|G)") && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":[1-3]p", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i);
    },
    s5331s_1: function (s, m) {
        return suggVerb(m[3], ":3s");
    },
    c5335s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:3s|1p|P|Q|Y|3p!|G)") && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":[123]p", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i);
    },
    s5335s_1: function (s, m) {
        return suggVerb(m[3], ":3s");
    },
    c5357s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && isAmbiguousAndWrong(m[2], m[3], ":s", ":3s") && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":(?:[123]p|p)", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i);
    },
    s5357s_1: function (s, m) {
        return suggVerb(m[3], ":3s", suggSing);
    },
    c5362s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && isVeryAmbiguousAndWrong(m[2], m[3], ":s", ":3s", ! prevword1(s, m.index)) && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":(?:[123]p|p)", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i);
    },
    s5362s_1: function (s, m) {
        return suggVerb(m[3], ":3s", suggSing);
    },
    c5368s_1: function (s, sx, m, dDA, sCountry) {
        return ( morph(dDA, [m.start[0], m[0]], ":1s") || ( look(s.slice(0,m.index), /> +$/) && morph(dDA, [m.start[0], m[0]], ":1s", false) ) ) && ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) )/i);
    },
    s5368s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5372s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":2s", ":(?:E|G|W|M|J|[13][sp]|2p)") && ! m[0].slice(0,1)._isUpperCase() && ! look(s.slice(0,m.index), /^ *$/) && ( ! morph(dDA, [m.start[0], m[0]], ":[NAQ]", false) || look(s.slice(0,m.index), /> +$/) ) && ! look(sx.slice(0,m.index), /\bt(?:u |[’']|oi,? qui |oi seul )/i);
    },
    s5372s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5377s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":2s", ":(?:G|W|M|J|[13][sp]|2p)") && ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ( ! morph(dDA, [m.start[0], m[0]], ":[NAQ]", false) || look(s.slice(0,m.index), /> +$/) ) && ! look(sx.slice(0,m.index), /\bt(?:u |[’']|oi,? qui |oi seul )/i);
    },
    s5377s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5382s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":[12]s", ":(?:E|G|W|M|J|3[sp]|2p|1p)") && ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ( ! morph(dDA, [m.start[0], m[0]], ":[NAQ]", false) || look(s.slice(0,m.index), /> +$/) || ( (m[0].search(/^étais$/i) >= 0) && ! morph(dDA, prevword1(s, m.index), ":[DA].*:p", false, true) ) ) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))/i);
    },
    s5382s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5387s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))/i);
    },
    s5387s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5390s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))/i);
    },
    s5390s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5398s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:1p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|tu|ils?|elles?|on|[vn]ous)/);
    },
    s5398s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c5401s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":1p") && ! look(s.slice(m.end[0]), /^ +(?:je|tu|ils?|elles?|on|[vn]ous)/);
    },
    s5401s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c5404s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":1p") && ! look(s.slice(m.end[0]), /^ +(?:ils|elles)/);
    },
    s5404s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c5413s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:2p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|ils?|elles?|on|[vn]ous)/);
    },
    s5413s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c5416s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":2p") && ! look(s.slice(m.end[0]), /^ +(?:je|ils?|elles?|on|[vn]ous)/);
    },
    s5416s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c5425s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":V.*:1p", ":[EGMNAJ]") && ! (m[0].slice(0,1)._isUpperCase() && look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(s.slice(0,m.index), /\b(?:[nN]ous(?:-mêmes?|)|[eE]t moi),? /);
    },
    s5425s_1: function (s, m) {
        return suggVerb(m[0], ":3p");
    },
    c5429s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":V.*:2p", ":[EGMNAJ]") && ! (m[0].slice(0,1)._isUpperCase() && look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(s.slice(0,m.index), /\b(?:[vV]ous(?:-mêmes?|)|[eE]t toi|[tT]oi et),? /);
    },
    c5438s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3p", false, false));
    },
    s5438s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5441s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)");
    },
    s5441s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5445s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)");
    },
    s5445s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5449s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false);
    },
    s5449s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5453s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":R", false, false) && ! (morph(dDA, [m.start[1], m[1]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3p", false, false));
    },
    s5453s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c5456s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s5456s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c5471s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:à|avec|sur|chez|par|dans|parmi|contre|ni|de|pour|sous) +$/i);
    },
    c5478s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|mg)") && ! morph(dDA, prevword1(s, m.index), ":[VR]|>de ", false, false);
    },
    s5478s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5482s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false);
    },
    s5482s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5492s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|N|A|3p|P|Q)") && ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false);
    },
    s5492s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5499s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:[13]p|P|Q|Y|G)") && morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true);
    },
    s5499s_1: function (s, m) {
        return suggVerb(m[3], ":3p");
    },
    c5502s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:[13]p|P|Y|G)") && morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true);
    },
    s5502s_1: function (s, m) {
        return suggVerb(m[3], ":3p");
    },
    c5519s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":(?:[13]p|P|G|Q.*:p)") && morph(dDA, nextword1(s, m.end[0]), ":(?:R|D.*:p)|>au ", false, true);
    },
    s5519s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5522s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":(?:[13]p|P|G)");
    },
    s5522s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5528s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isAmbiguousAndWrong(m[2], m[3], ":p", ":3p");
    },
    s5528s_1: function (s, m) {
        return suggVerb(m[3], ":3p", suggPlur);
    },
    c5532s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isVeryAmbiguousAndWrong(m[1], m[2], ":p", ":3p", ! prevword1(s, m.index));
    },
    s5532s_1: function (s, m) {
        return suggVerb(m[2], ":3p", suggPlur);
    },
    c5536s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isVeryAmbiguousAndWrong(m[1], m[2], ":m:p", ":3p", ! prevword1(s, m.index));
    },
    s5536s_1: function (s, m) {
        return suggVerb(m[2], ":3p", suggMasPlur);
    },
    c5540s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isVeryAmbiguousAndWrong(m[1], m[2], ":f:p", ":3p", ! prevword1(s, m.index));
    },
    s5540s_1: function (s, m) {
        return suggVerb(m[2], ":3p", suggFemPlur);
    },
    c5573s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V0e", ":3s");
    },
    s5573s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c5577s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V0e.*:3s", ":3p");
    },
    s5577s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c5583s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V0e", ":3p");
    },
    s5583s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c5587s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V0e.*:3p", ":3s");
    },
    c5598s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /(?:et|ou|[dD][eu]|ni) +$/) && morph(dDA, [m.start[1], m[1]], ":M", false) && morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:G|3s|3p!|P|M|[AQ].*:[si])") && ! morph(dDA, prevword1(s, m.index), ":[VRD]", false, false) && ! look(s.slice(0,m.index), /([A-ZÉÈ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+), +([A-ZÉÈ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+), +$/);
    },
    s5598s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5605s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M", false) && morph(dDA, [m.start[2], m[2]], ":M", false) && morphex(dDA, [m.start[3], m[3]], ":[123][sp]", ":(?:G|3p|P|Q.*:[pi])") && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s5605s_1: function (s, m) {
        return suggVerb(m[3], ":3p");
    },
    c5622s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[12]s|3p)", ":(?:3s|G|W|3p!)") && ! look(s.slice(m.end[0]), /^ +et (?:l(?:es? |a |’|eurs? )|[mts](?:a|on|es) |ce(?:tte|ts|) |[nv]o(?:s|tre) |du )/);
    },
    s5622s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c5627s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123]s", ":(?:3p|G|W)");
    },
    s5627s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c5632s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[12][sp]", ":(?:G|W|3[sp]|Y|P|Q)");
    },
    c5637s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[12][sp]", ":(?:G|W|3[sp])");
    },
    c5651s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V.*:1s", ":[GNW]") && ! look(s.slice(0,m.index), /\bje +>? *$/i);
    },
    s5651s_1: function (s, m) {
        return m[1].slice(0,-1)+"é-je";
    },
    c5654s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V.*:1s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:je|tu) +>? *$/i);
    },
    c5657s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:2s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:je|tu) +>? *$/i);
    },
    c5660s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:3s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:ce|il|elle|on) +>? *$/i);
    },
    s5660s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5663s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:3s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:ce|il|elle|on) +>? *$/i);
    },
    c5666s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:1p", ":[GNW]") && ! morph(dDA, prevword1(s, m.index), ":Os", false, false) && ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    c5670s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && ! m[1].endsWith("euillez") && morphex(dDA, [m.start[1], m[1]], ":V.*:2pl", ":[GNW]") && ! morph(dDA, prevword1(s, m.index), ":Os", false, false) && ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    c5674s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:3p", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:ce|ils|elles) +>? *$/i);
    },
    s5674s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5679s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":1[sśŝ]", false) && _oDict.isValid(m[1]) && ! (m[1].search(/^vite$/i) >= 0);
    },
    s5679s_1: function (s, m) {
        return suggVerb(m[1], ":1ś");
    },
    c5682s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":[ISK].*:2s", false) && _oDict.isValid(m[1]) && ! (m[1].search(/^vite$/i) >= 0);
    },
    s5682s_1: function (s, m) {
        return suggVerb(m[1], ":2s");
    },
    c5685s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "t" && ! morph(dDA, [m.start[1], m[1]], ":3s", false) && (! m[1].endsWith("oilà") || m[2] != "il") && _oDict.isValid(m[1]) && ! (m[1].search(/^vite$/i) >= 0);
    },
    s5685s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c5688s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":3p", ":3s") && _oDict.isValid(m[1]);
    },
    c5691s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:1p|E:2[sp])", false) && _oDict.isValid(m[1]) && ! (m[1].search(/^(?:vite|chez)$/i) >= 0);
    },
    s5691s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c5694s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":2p", false) && _oDict.isValid(m[1]) && ! (m[1].search(/^(?:tes|vite)$/i) >= 0) && ! _oDict.isValid(m[0]);
    },
    s5694s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c5697s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "t" && ! morph(dDA, [m.start[1], m[1]], ":3p", false) && _oDict.isValid(m[1]);
    },
    s5697s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c5701s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":V", false) && ! (m[1].search(/^vite$/i) >= 0) && _oDict.isValid(m[1]) && ! ( m[0].endsWith("il") && m[1].endsWith("oilà") ) && ! ( m[1] == "t" && m[0].endsWith(("il", "elle", "on", "ils", "elles")) );
    },
    c5721s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && morphex(dDA, [m.start[2], m[2]], ":[SK]", ":(?:G|V0|I)") && ! prevword1(s, m.index);
    },
    c5724s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[SK]", ":(?:G|V0|I)") && ! prevword1(s, m.index);
    },
    c5728s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && morphex(dDA, [m.start[2], m[2]], ":S", ":[IG]");
    },
    s5728s_1: function (s, m) {
        return suggVerbMode(m[2], ":I", m[1]);
    },
    c5728s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && morph(dDA, [m.start[2], m[2]], ":K", false);
    },
    s5728s_2: function (s, m) {
        return suggVerbMode(m[2], ":If", m[1]);
    },
    c5735s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:afin|pour|quoi|permettre|falloir|vouloir|ordonner|exiger|désirer|douter|suffire) ", false) && morph(dDA, [m.start[2], m[2]], ":(?:Os|M)", false) && ! morph(dDA, [m.start[3], m[3]], ":[GYS]", false);
    },
    s5735s_1: function (s, m) {
        return suggVerbMode(m[3], ":S", m[2]);
    },
    c5743s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && ! morph(dDA, [m.start[2], m[2]], ":[GYS]", false);
    },
    s5743s_1: function (s, m) {
        return suggVerbMode(m[2], ":S", m[1]);
    },
    c5748s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":S", ":[GIK]") && ! (m[2].search(/^e(?:usse|û[mt]es|ût)/) >= 0);
    },
    s5748s_1: function (s, m) {
        return suggVerbMode(m[2], ":I", m[1]);
    },
    c5751s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":S", ":[GIK]") && m[1] != "eusse";
    },
    s5751s_1: function (s, m) {
        return suggVerbMode(m[1], ":I", "je");
    },
    c5756s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && morph(dDA, [m.start[2], m[2]], ":V.*:S");
    },
    s5756s_1: function (s, m) {
        return suggVerbMode(m[2], ":I", m[1]);
    },
}





exports.load = load;
exports.parse = parse;
exports.lang = lang;
exports.version = version;
exports.getDictionary = getDictionary;
exports.setOptions = setOptions;
exports.getOptions = getOptions;
exports.resetOptions = resetOptions;
