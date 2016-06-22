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
    return (this.search(/^[A-ZÀ-ÖØ-ß][a-zà-öø-ÿ'’-]+$/) !== -1);
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
const locales = {'fr-BE': ['fr', 'BE', ''], 'fr-FR': ['fr', 'FR', ''], 'fr-CH': ['fr', 'CH', ''], 'fr-MC': ['fr', 'MC', ''], 'fr-CA': ['fr', 'CA', ''], 'fr-LU': ['fr', 'LU', '']};
const pkg = "grammalecte";
const name = "Grammalecte";
const version = "0.5.7";
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

    for (let [sOption, lRuleGroup] of _getRules(bParagraph)) {
        if (!sOption || option(sOption)) {
            for (let [zRegex, bUppercase, sRuleId, lActions, lGroups, lNegLookBefore] of lRuleGroup) {
                if (!_aIgnoredRules.has(sRuleId)) {
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
    oErr["sType"] = (sOption) ? sOption : "notype";
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
    let z = new RegExp("^( +[a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ%_-]+){" + (n-1).toString() + "} +([a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ%_-]+)", "i");
    let m = z.exec(s.slice(iStart));
    if (!m) {
        return null;
    }
    return [iStart + RegExp.lastIndex - m[2].length, m[2]];
}

function prevword (s, iEnd, n) {
    // get the (-)nth word of the input string or empty string
    let z = new RegExp("([a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ%_-]+) +([a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ%_-]+ +){" + (n-1).toString() + "}$", "i");
    let m = z.exec(s.slice(0, iEnd));
    if (!m) {
        return null;
    }
    return [m.index, m[1]];
}

const _zNextWord = new RegExp ("^ +([a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ_][a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ_-]*)", "i");
const _zPrevWord = new RegExp ("([a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ_][a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ_-]*) +$", "i");

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
    if (cr.checkAgreement(a1, a2) && (cr.mbAdj(a2) || cr.mbAdj(a1))) {
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
    if (cr.checkAgreement(a1, a2) && (cr.mbAdj(a2) || cr.mbAdjNb(a1))) {
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

function checkAgreement (sWord1, sWord2) {
    // We don’t check if word exists in _dAnalyses, for it is assumed it has been done before
    let a2 = _dAnalyses._get(sWord2, null)
    if (!a2 || a2.length === 0) {
        return true;
    }
    let a1 = _dAnalyses._get(sWord1, null);
    if (!a1 || a1.length === 0) {
        return true;
    }
    return cr.checkAgreement(a1, a2);
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
    c64p_1: function (s, sx, m, dDA, sCountry) {
        return option("num");
    },
    s64p_1: function (s, m) {
        return m[0].replace(/\./g, " ");
    },
    p64p_2: function (s, m) {
        return m[0].replace(/\./g, " ");
    },
    p77p_1: function (s, m) {
        return m[1].replace(/\./g, "")+".";
    },
    c79p_1: function (s, sx, m, dDA, sCountry) {
        return m[0] != "i.e." && m[0] != "s.t.p.";
    },
    s79p_1: function (s, m) {
        return m[0].replace(/\./g, "").toUpperCase();
    },
    p79p_2: function (s, m) {
        return m[0].replace(/\./g, "");
    },
    c83p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^etc/i) >= 0);
    },
    c88p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false) && (morph(dDA, [m.start[3], m[3]], ":(?:M[12]|V)", false) || ! _oDict.isValid(m[3]));
    },
    c89p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false) && look(s.slice(m.end[0]), /^\W+[a-zéèêîïâ]/);
    },
    c131p_1: function (s, sx, m, dDA, sCountry) {
        return option("typo") && ! m[0].endsWith("·e·s");
    },
    c131p_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    d131p_2: function (s, m, dDA) {
        return define(dDA, m.start[0], ":N:A:Q:e:i");
    },
    c143p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^(?:etc|[A-Z]|chap|cf|fig|hab|litt|circ|coll|r[eé]f|étym|suppl|bibl|bibliogr|cit|op|vol|déc|nov|oct|janv|juil|avr|sept)$/i) >= 0) && morph(dDA, [m.start[1], m[1]], ":", false) && morph(dDA, [m.start[2], m[2]], ":", false);
    },
    s143p_1: function (s, m) {
        return m[2]._toCapitalize();
    },
    c154p_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":[DR]", false);
    },
    c184p_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1]._isDigit();
    },
    c186p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]);
    },
    s207p_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    s208p_1: function (s, m) {
        return m[1].slice(1,3) == "os"  ? "nᵒˢ"  : "nᵒ";
    },
    c216p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /etc$/i);
    },
    s217p_1: function (s, m) {
        return m[0].replace(/\.\.\./g, "…")._trimRight(".");
    },
    c233p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^(?:etc|[A-Z]|fig|hab|litt|circ|coll|ref|étym|suppl|bibl|bibliogr|cit|vol|déc|nov|oct|janv|juil|avr|sept)$/) >= 0);
    },
    s266p_1: function (s, m) {
        return m[0][0] + "|" + m[0][1];
    },
    s267p_1: function (s, m) {
        return m[0][0] + "|" + m[0][1];
    },
    s268p_1: function (s, m) {
        return m[0][0] + "|" + m[0][1];
    },
    c277p_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[3], m[3]], ";S", ":[VCR]") || mbUnit(m[3]) || ! _oDict.isValid(m[3]);
    },
    c281p_1: function (s, sx, m, dDA, sCountry) {
        return (! (m[2].search(/^[0-9][0-9]{1,3}$/) >= 0) && ! _oDict.isValid(m[3])) || morphex(dDA, [m.start[3], m[3]], ";S", ":[VCR]") || mbUnit(m[3]);
    },
    c303p_1: function (s, sx, m, dDA, sCountry) {
        return sCountry != "CA";
    },
    s303p_1: function (s, m) {
        return " "+m[0];
    },
    s349p_1: function (s, m) {
        return undoLigature(m[0]);
    },
    c395p_1: function (s, sx, m, dDA, sCountry) {
        return ! option("mapos") && morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    s395p_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c398p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    s398p_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c402p_1: function (s, sx, m, dDA, sCountry) {
        return option("mapos") && ! look(s.slice(0,m.index), /(?:lettre|caractère|glyphe|dimension|variable|fonction|point) *$/i);
    },
    s402p_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c416p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:onz[ei]|énième|iourte|ouistiti|ouate|one-?step|Ouagadougou|I(?:I|V|X|er|ᵉʳ|ʳᵉ|è?re))/i) >= 0) && ! m[2]._isUpperCase() && ! morph(dDA, [m.start[2], m[2]], ":G", false);
    },
    s416p_1: function (s, m) {
        return m[1][0]+"’";
    },
    c432p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:onz|énième)/i) >= 0) && morph(dDA, [m.start[2], m[2]], ":[me]");
    },
    c440p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].search(/^NF (?:C|E|P|Q|S|X|Z|EN(?: ISO|)) [0-9]+(?:‑[0-9]+|)/) >= 0);
    },
    s440p_1: function (s, m) {
        return formatNF(m[0]);
    },
    s445p_1: function (s, m) {
        return m[0].replace(/2/g, "₂").replace(/3/g, "₃").replace(/4/g, "₄");
    },
    c453p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /NF[  -]?(C|E|P|Q|X|Z|EN(?:[  -]ISO|)) */);
    },
    s453p_1: function (s, m) {
        return formatNumber(m[0]);
    },
    c467p_1: function (s, sx, m, dDA, sCountry) {
        return ! option("ocr");
    },
    s467p_1: function (s, m) {
        return m[0].replace(/O/g, "0");
    },
    c468p_1: function (s, sx, m, dDA, sCountry) {
        return ! option("ocr");
    },
    s468p_1: function (s, m) {
        return m[0].replace(/O/g, "0");
    },
    c486p_1: function (s, sx, m, dDA, sCountry) {
        return ! checkDate(m[1], m[2], m[3]) && ! look(s.slice(0,m.index), /\bversions? +$/i);
    },
    c489p_1: function (s, sx, m, dDA, sCountry) {
        return ! checkDateWithString(m[1], m[2], m[3]);
    },
    c492p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +av(?:ant|\.) J(?:\.-C\.|ésus-Christ)/) && ! checkDay(m[1], m[2], m[3], m[4]);
    },
    s492p_1: function (s, m) {
        return getDay(m[2], m[3], m[4]);
    },
    c497p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +av(?:ant|\.) J(?:\.-C\.|ésus-Christ)/) && ! checkDayWithString(m[1], m[2], m[3], m[4]);
    },
    s497p_1: function (s, m) {
        return getDayWithString(m[2], m[3], m[4]);
    },
    c535p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false) || m[1] == "en";
    },
    c542p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":", false);
    },
    c546p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NB]", false);
    },
    c547p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NB]", false) && ! nextword1(s, m.end[0]);
    },
    c550p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":N") && ! (m[1].search(/^(?:aequo|nihilo|cathedra|absurdo|abrupto)/i) >= 0);
    },
    c552p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c553p_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":N", ":[AGW]");
    },
    c556p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c558p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":", false);
    },
    c562p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":", false) && morph(dDA, prevword1(s, m.index), ":D", false, ! Boolean((m[1].search(/^s(?:ans|ous)$/i) >= 0)));
    },
    c566p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":N", false) && morph(dDA, prevword1(s, m.index), ":(?:D|V0e)", false, true) && ! (morph(dDA, [m.start[1], m[1]], ":G", false) && morph(dDA, [m.start[2], m[2]], ":[GYB]", false));
    },
    s573p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    s574p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c585p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":Cs", false, true);
    },
    s591p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c597p_1: function (s, sx, m, dDA, sCountry) {
        return ! nextword1(s, m.end[0]);
    },
    c599p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":G");
    },
    c603p_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /\b(?:les?|du|des|un|ces?|[mts]on) +/i);
    },
    c610p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":D", false);
    },
    c612p_1: function (s, sx, m, dDA, sCountry) {
        return ! ( morph(dDA, prevword1(s, m.index), ":R", false) && look(s.slice(m.end[0]), /^ +qu[e’]/) );
    },
    s660p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c662p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /quatre $/i);
    },
    s662p_1: function (s, m) {
        return m[0].replace(/ /g, "-").replace(/vingts/g, "vingt");
    },
    s664p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    s666p_1: function (s, m) {
        return m[0].replace(/ /g, "-").replace(/vingts/g, "vingt");
    },
    s690p_1: function (s, m) {
        return m[0].replace(/-/g, " ");
    },
    c692p_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    s695p_1: function (s, m) {
        return m[0].replace(/-/g, " ");
    },
    s696p_1: function (s, m) {
        return m[0].replace(/-/g, " ");
    },
    c744p_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:G|V0)|>(?:t(?:antôt|emps|rès)|loin|souvent|parfois|quelquefois|côte|petit) ", false) && ! m[1][0]._isUpperCase();
    },
    p760p_1: function (s, m) {
        return m[0].replace(/‑/g, "");
    },
    p761p_1: function (s, m) {
        return m[0].replace(/‑/g, "");
    },
    c797s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[0], m[0]], ":", false);
    },
    c800s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false);
    },
    c801s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":A", false) && ! morph(dDA, prevword1(s, m.index), ":D", false);
    },
    c838s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:O[sp]|X)", false);
    },
    d838s_1: function (s, m, dDA) {
        return select(dDA, m.start[1], m[1], ":V");
    },
    d840s_1: function (s, m, dDA) {
        return select(dDA, m.start[1], m[1], ":V");
    },
    c842s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":[YD]", false);
    },
    d842s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    d844s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    d846s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    c848s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":Y", false);
    },
    d848s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    c859s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":M", ":G") && ! morph(dDA, [m.start[2], m[2]], ":N", false) && ! prevword1(s, m.index);
    },
    c869s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":E", false) && morph(dDA, [m.start[3], m[3]], ":M", false);
    },
    c881s_1: function (s, sx, m, dDA, sCountry) {
        return option("mapos");
    },
    s881s_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c888s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[GNAY]", ":(?:Q|3s)|>(?:priori|post[eé]riori|contrario|capella) ");
    },
    c903s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[0]._isDigit();
    },
    s903s_1: function (s, m) {
        return m[0].replace(/O/g, "0").replace(/I/g, "1");
    },
    s906s_1: function (s, m) {
        return m[0].replace(/n/g, "");
    },
    c918s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b([jn]’|il |on |elle )$/i);
    },
    c921s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b[jn]e +$/i);
    },
    c927s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":N.*:f:s", false);
    },
    c930s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:f:[si]");
    },
    c933s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ">(?:et|o[uù]) ");
    },
    c942s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:p", false, false);
    },
    c943s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":[VNA]", false, true);
    },
    c947s_1: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("o");
    },
    c947s_2: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("s") && ! morph(dDA, prevword1(s, m.index), ":D.*:[me]", false, false);
    },
    c952s_1: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("s") && ! morph(dDA, prevword1(s, m.index), ":D.*:m:p", false, false);
    },
    c952s_2: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("é") && ! morph(dDA, prevword1(s, m.index), ":D.*:m:[si]", false, false);
    },
    c966s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":(?:O[on]|3s)", false);
    },
    c970s_1: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("U");
    },
    c970s_2: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("s");
    },
    c975s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[0].endsWith("s");
    },
    c975s_2: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("s");
    },
    s980s_1: function (s, m) {
        return m[0].replace(/o/g, "e");
    },
    c983s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/) || ! morph(dDA, [m.start[1], m[1]], ":Y", false);
    },
    s987s_1: function (s, m) {
        return m[0].replace(/é/g, "e").replace(/É/g, "E").replace(/è/g, "e").replace(/È/g, "E");
    },
    c994s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:V0|N.*:m:[si])", false, false);
    },
    c1000s_1: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("e") && ! morph(dDA, prevword1(s, m.index), ":D.*:[me]:[si]", false, false);
    },
    c1000s_2: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("s") && ! morph(dDA, prevword1(s, m.index), ":D.*:[me]:[pi]", false, false);
    },
    s1004s_1: function (s, m) {
        return m[0].replace(/è/g, "ê").replace(/È/g, "Ê");
    },
    s1005s_1: function (s, m) {
        return m[0].replace(/é/g, "ê").replace(/É/g, "Ê");
    },
    c1021s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:ne|il|on|elle|je) +$/i) && morph(dDA, [m.start[1], m[1]], ":[NA].*:[me]:[si]", false);
    },
    c1023s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:ne|il|on|elle) +$/i) && morph(dDA, [m.start[1], m[1]], ":[NA].*:[fe]:[si]", false);
    },
    c1025s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:ne|tu) +$/i) && morph(dDA, [m.start[1], m[1]], ":[NA].*:[pi]", false);
    },
    c1032s_1: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("") && ! morph(dDA, prevword1(s, m.index), ":D.*:m:s", false, false);
    },
    c1032s_2: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("x") && ! morph(dDA, prevword1(s, m.index), ":D.*:m:p", false, false);
    },
    c1040s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:m:p", false, false);
    },
    c1043s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:f:s", false, false);
    },
    c1046s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:[me]:p", false, false);
    },
    c1052s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:m:s", false, false);
    },
    c1061s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":A.*:f", false) || morph(dDA, prevword1(s, m.index), ":D:*:f", false, false);
    },
    s1061s_1: function (s, m) {
        return m[1].replace(/è/g, "ê").replace(/È/g, "Ê");
    },
    s1069s_1: function (s, m) {
        return m[0].replace(/a/g, "o").replace(/A/g, "O");
    },
    c1075s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:ce|d[eu]|un|quel|leur) +/i);
    },
    c1089s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^([nv]ous|faire|en|la|lui|donnant|œuvre|h[éo]|olé|joli|Bora|couvent|dément|sapiens|très|vroum|[0-9]+)$/i) >= 0) && ! ((m[1].search(/^(?:est|une?)$/) >= 0) && look(s.slice(0,m.index), /[’']$/)) && ! (m[1] == "mieux" && look(s.slice(0,m.index), /qui +$/i));
    },
    s1103s_1: function (s, m) {
        return suggSimil(m[2], ":[NA].*:[pi]");
    },
    s1105s_1: function (s, m) {
        return suggSimil(m[2], ":[NA].*:[si]");
    },
    c1128s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^avoir$/i) >= 0) && morph(dDA, [m.start[1], m[1]], ">avoir ", false);
    },
    c1143s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|mettre) ", false);
    },
    c1174s_1: function (s, sx, m, dDA, sCountry) {
        return ! look_chk1(dDA, s.slice(m.end[0]), m.end[0], / [a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+ en ([aeo][a-zû]*)/i, ":V0a");
    },
    c1194s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">abolir ", false);
    },
    c1196s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">achever ", false);
    },
    c1197s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), / +de?\b/);
    },
    c1206s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":A|>un", false);
    },
    c1212s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">comparer ");
    },
    c1213s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">contraindre ", false);
    },
    c1224s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">joindre ");
    },
    c1250s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">suffire ");
    },
    c1251s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">talonner ");
    },
    c1258s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:prévenir|prévoir|prédire|présager|préparer|pressentir|pronostiquer|avertir|devancer|réserver) ", false);
    },
    c1263s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:ajourner|différer|reporter) ", false);
    },
    c1330s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]") && m[2][0]._isLowerCase();
    },
    s1330s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[fe]:[si]");
    },
    c1334s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":N.*:[fe]|:[AW]") && m[2][0]._isLowerCase() || m[2] == "va";
    },
    c1334s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]") && m[2][0]._isLowerCase() && hasSimil(m[2]);
    },
    s1334s_2: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[fe]:[si]");
    },
    c1340s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]") && m[2][0]._isLowerCase();
    },
    s1340s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[me]:[si]");
    },
    c1344s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]|:V0e.*:3[sp]|>devoir") && m[2][0]._isLowerCase() && hasSimil(m[2]);
    },
    s1344s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[me]:[si]");
    },
    c1348s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]") && m[2][0]._isLowerCase();
    },
    s1348s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:.:[si]");
    },
    c1352s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V.*:(?:Y|[123][sp])") && m[1][0]._isLowerCase() && ! prevword1(s, m.index);
    },
    s1352s_1: function (s, m) {
        return suggSimil(m[1], ":[NAQ]:[me]:[si]");
    },
    c1356s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[pi]") && m[2][0]._isLowerCase() && ! (m[0].search(/^quelques? soi(?:ent|t|s)\b/i) >= 0);
    },
    s1356s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:.:[pi]");
    },
    c1360s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[pi]") && m[2][0]._isLowerCase();
    },
    s1360s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[me]:[pi]");
    },
    c1364s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[pi]") && m[2][0]._isLowerCase();
    },
    s1364s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[fe]:[pi]");
    },
    c1368s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[NAQ]");
    },
    s1368s_1: function (s, m) {
        return suggSimil(m[1], ":(?:[NAQ]:[fe]:[si])");
    },
    c1375s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]", ":[YG]") && m[2][0]._isLowerCase();
    },
    c1375s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false);
    },
    s1375s_2: function (s, m) {
        return suggSimil(m[2], ":Y");
    },
    c1384s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[NAQ]");
    },
    s1384s_1: function (s, m) {
        return suggSimil(m[1], ":(?:[NAQ]:.:[si])");
    },
    c1391s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Y|[123][sp])") && ! look(s.slice(0,m.index), /(?:dont|sauf|un à) +$/i);
    },
    s1391s_1: function (s, m) {
        return suggSimil(m[1], ":[NAQ]:[me]:[si]");
    },
    c1395s_1: function (s, sx, m, dDA, sCountry) {
        return m[1][0]._isLowerCase() && morph(dDA, [m.start[1], m[1]], ":V.*:[123][sp]");
    },
    s1395s_1: function (s, m) {
        return suggSimil(m[1], ":[NA]");
    },
    c1399s_1: function (s, sx, m, dDA, sCountry) {
        return m[1][0]._isLowerCase() && morphex(dDA, [m.start[1], m[1]], ":V.*:[123][sp]", ":[GNA]");
    },
    s1399s_1: function (s, m) {
        return suggSimil(m[1], ":[NAQ]");
    },
    c1403s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":", ":(?:[123][sp]|O[onw]|X)|ou ") && morphex(dDA, prevword1(s, m.index), ":", ":3s", true);
    },
    s1403s_1: function (s, m) {
        return suggSimil(m[1], ":(?:3s|Oo)");
    },
    c1407s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":", ":(?:[123][sp]|O[onw]|X)|ou ") && morphex(dDA, prevword1(s, m.index), ":", ":3p", true);
    },
    s1407s_1: function (s, m) {
        return suggSimil(m[1], ":(?:3p|Oo)");
    },
    c1411s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":", ":(?:[123][sp]|O[onw]|X)") && morphex(dDA, prevword1(s, m.index), ":", ":1s", true);
    },
    s1411s_1: function (s, m) {
        return suggSimil(m[1], ":(?:1s|Oo)");
    },
    c1415s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":", ":(?:[123][sp]|O[onw]|X)") && morphex(dDA, prevword1(s, m.index), ":", ":(?:2s|V0e)", true);
    },
    s1415s_1: function (s, m) {
        return suggSimil(m[1], ":(?:2s|Oo)");
    },
    c1428s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":P", false);
    },
    c1429s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]");
    },
    c1435s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|O[on]|X)|>(?:[lmts]|surtout|guère) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1435s_1: function (s, m) {
        return suggSimil(m[2], ":(?:V|Oo)");
    },
    c1438s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].search(/^se que?/i) >= 0) && _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|Oo)|>[lmts] ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1438s_1: function (s, m) {
        return suggSimil(m[2], ":(?:V|Oo)");
    },
    c1442s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|Oo)", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1442s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1445s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|O[onw]|X)", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1445s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1448s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|O[onw])", false);
    },
    s1448s_1: function (s, m) {
        return suggSimil(m[2], ":[123][sp]");
    },
    c1451s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P)|>(?:en|y|ils?) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1451s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1454s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P)|>(?:en|y|ils?|elles?) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1454s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1457s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":[123][sp]|>(?:en|y) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|dire)$/i) >= 0);
    },
    s1457s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1475s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Y|[123][sp])", ":[GAQW]");
    },
    c1479s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":(?:G|N|A|Q|W|M[12])");
    },
    c1486s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1][0]._isUpperCase() && morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[GNAQM]");
    },
    c1490s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1][0]._isUpperCase() && morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[GNAQM]") && ! morph(dDA, prevword1(s, m.index), ":[NA]:[me]:si", false);
    },
    c1494s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":(?:G|N|A|Q|W|M[12]|T)");
    },
    c1498s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y)", ":[GAQW]") && ! morph(dDA, prevword1(s, m.index), ":V[123].*:[123][sp]", false, false);
    },
    c1505s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":[VN]", false, true);
    },
    c1506s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1509s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:[lmts]a|leur|une|en) +$/i);
    },
    c1511s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":(?:D|Oo|M)", false);
    },
    c1512s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">être ") && ! look(s.slice(0,m.index), /\bce que? /i);
    },
    c1531s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:côtés?|coups?|peu(?:-près|)|pics?|propos|valoir|plat-ventrismes?)/i) >= 0);
    },
    c1531s_2: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^(?:côtés?|coups?|peu(?:-pr(?:ès|êts?|és?)|)|pics?|propos|valoir|plat-ventrismes?)/i) >= 0);
    },
    c1536s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":3s", false, false);
    },
    c1539s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:3s|R)", false, false) && ! morph(dDA, nextword1(s, m.end[0]), ":Oo", false);
    },
    c1544s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":Q", ":M[12P]");
    },
    c1547s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:Y|Oo)");
    },
    c1551s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:Y|Oo)");
    },
    c1558s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\bce que?\b/i);
    },
    c1560s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":(?:M[12]|D|Oo)");
    },
    c1565s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]") && ! m[2].slice(0,1)._isUpperCase() && ! m[2].startsWith("tord");
    },
    c1568s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /[ln]’$|\b(?:il|elle|on|y|n’en) +$/i);
    },
    c1572s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /(\bque?\\b|[ln]’$|\b(?:il|elle|on|y|n’en) +$)/i);
    },
    c1575s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /(\bque?\b|[ln]’$|\b(?:il|elle|on|y|n’en) +$)/i);
    },
    c1579s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":Y", false) && ! look(s.slice(0,m.index), /\bque? |(?:il|elle|on|n’(?:en|y)) +$/i);
    },
    c1619s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1626s_1: function (s, sx, m, dDA, sCountry) {
        return ! nextword1(s, m.end[0]) || look(s.slice(m.end[0]), /^ +que? /i);
    },
    c1628s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":G", ">(?:tr(?:ès|op)|peu|bien|plus|moins|toute) |:[NAQ].*:f");
    },
    c1632s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f") && ! (m[2].search(/^seule?s?/) >= 0);
    },
    c1635s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:[oO]h|[aA]h) +$/);
    },
    c1637s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R");
    },
    c1650s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":([123][sp]|Y|P|Q)|>l[ea]? ");
    },
    c1653s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":Y")  && m[1] != "CE";
    },
    c1655s_1: function (s, sx, m, dDA, sCountry) {
        return (m[0].indexOf(",") >= 0 || morphex(dDA, [m.start[2], m[2]], ":G", ":[AYD]"));
    },
    c1658s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V[123].*:(?:Y|[123][sp])") && ! morph(dDA, [m.start[2], m[2]], ">(?:devoir|pouvoir) ") && m[2][0]._isLowerCase() && m[1] != "CE";
    },
    c1665s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1667s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V", ":[NAQ].*:[me]") || look(s.slice(0,m.index), /\b[cs]e +/i);
    },
    c1670s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(m.end[0]), /^ +[ldmtsc]es /) || ( morph(dDA, prevword1(s, m.index), ":Cs", false, true) && ! look(s.slice(0,m.index), /, +$/) && ! look(s.slice(m.end[0]), /^ +(?:ils?|elles?)\b/) && ! morph(dDA, nextword1(s, m.end[0]), ":Q", false, false) );
    },
    c1676s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":N.*:s", ":(?:A.*:[pi]|P)");
    },
    c1698s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":N.*:p", ":(?:G|W|A.*:[si])");
    },
    c1707s_1: function (s, sx, m, dDA, sCountry) {
        return m[1].endsWith("en") || look(s.slice(0,m.index), /^ *$/);
    },
    c1713s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1716s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1].startsWith("B");
    },
    c1731s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":E|>le ", false, false);
    },
    c1741s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y)", ":(?:G|N|A|M[12P])") && ! look(s.slice(0,m.index), /\bles *$/i);
    },
    c1756s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":W", false) && ! morph(dDA, prevword1(s, m.index), ":V.*:3s", false, false);
    },
    s1768s_1: function (s, m) {
        return m[1].replace(/pal/g, "pâl");
    },
    s1771s_1: function (s, m) {
        return m[1].replace(/pal/g, "pâl");
    },
    c1783s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AQ]", false);
    },
    c1799s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ">(?:arriver|venir|à|revenir|partir|aller) ");
    },
    c1804s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":P", false);
    },
    c1815s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:G|[123][sp]|W)");
    },
    s1815s_1: function (s, m) {
        return m[1].replace(/ /g, "");
    },
    c1820s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c1828s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    c1831s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":V", false) && ! ( m[1] == "sans" && morph(dDA, [m.start[2], m[2]], ":[NY]", false) );
    },
    c1852s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AQ].*:[pi]", false);
    },
    c1855s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1857s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:d[eu]|avant|après|sur|malgré) +$/i);
    },
    c1859s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:d[eu]|avant|après|sur|malgré) +$/i) && ! morph(dDA, [m.start[2], m[2]], ":(?:3s|Oo)", false);
    },
    c1862s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:d[eu]|avant|après|sur|malgré) +$/i);
    },
    c1868s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":f") && ! look(s.slice(0,m.index), /(?:à|pas|de|[nv]ous|eux) +$/i);
    },
    c1871s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":m") && ! look(s.slice(0,m.index), /(?:à|pas|de|[nv]ous|eux) +$/i);
    },
    c1875s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":N.*:[fp]", ":(?:A|W|G|M[12P]|Y|[me]:i|3s)") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s1875s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c1879s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[mp]") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s1879s_1: function (s, m) {
        return suggFemSing(m[1]);
    },
    c1883s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[fs]") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s1883s_1: function (s, m) {
        return suggMasPlur(m[1]);
    },
    c1887s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[ms]") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s1887s_1: function (s, m) {
        return suggFemPlur(m[1]);
    },
    c1898s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins)\b/));
    },
    c1902s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins)\b/));
    },
    c1906s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins)\b/));
    },
    c1910s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins)\b/));
    },
    c1925s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:Y|W|O[ow])", false) && _oDict.isValid(m[1]);
    },
    s1925s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c1949s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    c2184s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":G");
    },
    c2191s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    c2202s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)s?$/i) >= 0);
    },
    c2235s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c2235s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c2254s_1: function (s, sx, m, dDA, sCountry) {
        return m[2]._isDigit() || morph(dDA, [m.start[2], m[2]], ":B", false);
    },
    c2267s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">prendre ", false);
    },
    c2271s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">rester ", false);
    },
    c2276s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:sembler|para[îi]tre) ") && morphex(dDA, [m.start[3], m[3]], ":A", ":G");
    },
    c2277s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:une|la|cette|[mts]a|[nv]otre|de) +/);
    },
    c2280s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">tenir ", false);
    },
    c2282s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">trier ", false);
    },
    c2284s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">venir ", false);
    },
    c2298s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", ":(?:G|3p)");
    },
    c2303s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", ":(?:G|3p)");
    },
    c2310s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":B", false);
    },
    c2311s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":V0", false) || ! morph(dDA, nextword1(s, m.end[0]), ":A", false);
    },
    c2312s_1: function (s, sx, m, dDA, sCountry) {
        return isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c2313s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":W", false);
    },
    c2314s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":A .*:m:s", false);
    },
    c2316s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":(?:R|C[sc])", false, true);
    },
    c2317s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":B", false) || (m[1].search(/^(?:plusieurs|maintes)/i) >= 0);
    },
    c2318s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, nextword1(s, m.end[0]), ":[NAQ]", false, true);
    },
    c2319s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":V0");
    },
    c2321s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":D", false);
    },
    c2322s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":D.*:[me]:[si]", false);
    },
    c2323s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":([AQ].*:[me]:[pi])", false, false);
    },
    c2324s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":A", false);
    },
    c2325s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:croire|devoir|estimer|imaginer|penser) ");
    },
    c2327s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:R|D|[123]s|X)", false);
    },
    c2328s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c2329s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\bt(?:u|oi qui)\b/i);
    },
    c2330s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c2331s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":A", false);
    },
    c2332s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c2333s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":W", false);
    },
    c2334s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[AW]", ":G");
    },
    c2335s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[AW]", false);
    },
    c2336s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":Y", false);
    },
    c2339s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NV]", ":D");
    },
    c2340s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":(?:3s|X)", false);
    },
    c2341s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[me]", false);
    },
    c2345s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false) && (morph(dDA, [m.start[2], m[2]], ":(?:M[12]|V)", false) || ! _oDict.isValid(m[2]));
    },
    c2346s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M", false) && morph(dDA, [m.start[2], m[2]], ":M", false);
    },
    c2347s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M", false);
    },
    c2348s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:M[12]|N)") && morph(dDA, [m.start[2], m[2]], ":(?:M[12]|N)");
    },
    c2349s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":MP");
    },
    c2350s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false);
    },
    c2351s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false);
    },
    c2354s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[MT]", false) && morph(dDA, prevword1(s, m.index), ":Cs", false, true) && ! look(s.slice(0,m.index), /\b(?:plus|moins|aussi) .* que +$/);
    },
    p2354s_1: function (s, m) {
        return rewriteSubject(m[1],m[2]);
    },
    c2359s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c2361s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c2363s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:V0e|N)", false) && morph(dDA, [m.start[3], m[3]], ":[AQ]", false);
    },
    c2365s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false);
    },
    c2367s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false) && morph(dDA, [m.start[3], m[3]], ":[QY]", false);
    },
    c2369s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && ! (m[2] == "crainte" && look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/));
    },
    c2371s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c2373s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morph(dDA, [m.start[3], m[3]], ":B", false) && morph(dDA, [m.start[4], m[4]], ":(?:Q|V1.*:Y)", false);
    },
    c2377s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c2378s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V[123]");
    },
    c2379s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V[123]", false);
    },
    c2380s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c2383s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":G");
    },
    c2386s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], "[NAQ].*:[me]:[si]", false);
    },
    c2388s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[me]", ":G") && morph(dDA, [m.start[3], m[3]], ":[AQ].*:[me]", false);
    },
    c2390s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[fe]", ":G") && morph(dDA, [m.start[3], m[3]], ":[AQ].*:[fe]", false);
    },
    c2392s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", ":[123][sp]") && morph(dDA, [m.start[3], m[3]], ":[AQ].*:[pi]", false);
    },
    c2395s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AW]");
    },
    c2397s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AW]", false);
    },
    c2399s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AQ]", false);
    },
    c2401s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":W", ":3p");
    },
    c2403s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[AW]", ":[123][sp]");
    },
    c2407s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && morph(dDA, [m.start[3], m[3]], ":W", false) && morph(dDA, [m.start[4], m[4]], ":[AQ]", false);
    },
    c2409s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, true);
    },
    c2410s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":W\\b");
    },
    c2413s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c2417s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:N|A|Q|V0e)", false);
    },
    c2480s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":1s", false, false);
    },
    c2481s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":2s", false, false);
    },
    c2482s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":3s", false, false);
    },
    c2483s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":1p", false, false);
    },
    c2484s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":2p", false, false);
    },
    c2485s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":3p", false, false);
    },
    c2486s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]");
    },
    c2492s_1: function (s, sx, m, dDA, sCountry) {
        return isAmbiguousNAV(m[3]) && morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c2495s_1: function (s, sx, m, dDA, sCountry) {
        return isAmbiguousNAV(m[3]) && morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && ! (m[0].search(/^[dD](?:’une?|e la) /) >= 0);
    },
    c2498s_1: function (s, sx, m, dDA, sCountry) {
        return isAmbiguousNAV(m[3]) && ( morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":3[sp]") && ! prevword1(s, m.index)) );
    },
    c2514s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:G|V0)", false);
    },
    c2524s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    c2527s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    c2530s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f", false);
    },
    c2545s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)");
    },
    c2548s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)") || ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[me]") && morphex(dDA, [m.start[1], m[1]], ":R", ">(?:e[tn]|ou) ") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[3], m[3]], ":Y", false)) );
    },
    c2552s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|P|G|W|Y)");
    },
    c2556s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    c2559s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|G|W|V0|3s)");
    },
    c2562s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|G|W|P)");
    },
    c2565s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    c2568s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    c2571s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:s", ":[GWme]");
    },
    c2575s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:e|f|P|G|W|[1-3][sp]|Y)");
    },
    c2578s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":(?:e|f|P|G|W|[1-3][sp]|Y)") || ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[fe]") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou) ") && ! (morph(dDA, [m.start[1], m[1]], ":(?:Rv|C)", false) && morph(dDA, [m.start[3], m[3]], ":Y", false)) );
    },
    c2582s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efPGWY]");
    },
    c2586s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    c2589s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:e|f|G|W|V0|3s|P)") && ! ( m[2] == "demi" && morph(dDA, nextword1(s, m.end[0]), ":N.*:f") );
    },
    c2592s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:e|f|G|W|V0|3s)");
    },
    c2595s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGWP]");
    },
    c2598s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    c2601s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    s2601s_1: function (s, m) {
        return suggCeOrCet(m[2]);
    },
    c2605s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    s2605s_1: function (s, m) {
        return m[1].replace(/on/g, "a");
    },
    c2608s_1: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^[aâeéèêiîoôuûyœæ]/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[eGW]");
    },
    s2608s_1: function (s, m) {
        return m[1].replace(/a/g, "on");
    },
    c2608s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    s2608s_2: function (s, m) {
        return m[1].replace(/a/g, "on");
    },
    c2615s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    c2621s_1: function (s, sx, m, dDA, sCountry) {
        return ( morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false)) ) || m[1] in aREGULARPLURAL;
    },
    s2621s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2625s_1: function (s, sx, m, dDA, sCountry) {
        return ( morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") || (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[pi]|>avoir") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou) ") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[2], m[2]], ":Y", false))) ) && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false));
    },
    s2625s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2630s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ipYPGW]") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[1] in aREGULARPLURAL;
    },
    s2630s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2635s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ipGW]") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[1] in aREGULARPLURAL;
    },
    s2635s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2640s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":(?:[ipGW]|[123][sp])") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[2] in aREGULARPLURAL;
    },
    s2640s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2640s_2: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":(?:[ipGW]|[123][sp])") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[2] in aREGULARPLURAL;
    },
    c2649s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ipPGW]") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[1] in aREGULARPLURAL;
    },
    s2649s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2659s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ip]|>o(?:nde|xydation|or)\\b") && morphex(dDA, prevword1(s, m.index), ":(?:G|[123][sp])", ":[AD]", true)) || m[1] in aREGULARPLURAL;
    },
    s2659s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2665s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ip]") || m[1] in aREGULARPLURAL;
    },
    s2665s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2669s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ip]") || m[1] in aREGULARPLURAL;
    },
    s2669s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2673s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[123][sp]|:[si]");
    },
    s2673s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2677s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p");
    },
    s2677s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2680s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") || ( morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[si]") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou)") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[2], m[2]], ":Y", false)) );
    },
    s2680s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2684s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[siGW]");
    },
    s2684s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2688s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p");
    },
    c2688s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p");
    },
    s2688s_2: function (s, m) {
        return suggSing(m[2]);
    },
    c2691s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":[NAQ].*:p") || ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[si]") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou)") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[3], m[3]], ":Y", false)) );
    },
    c2691s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":[NAQ].*:p") || ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[si]") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou)") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[3], m[3]], ":Y", false)) );
    },
    s2691s_2: function (s, m) {
        return suggSing(m[3]);
    },
    c2696s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    c2696s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    s2696s_2: function (s, m) {
        return suggSing(m[2]);
    },
    c2700s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[siGW]");
    },
    s2700s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2704s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    c2708s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siG]");
    },
    c2712s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[siGW]") && ! morph(dDA, prevword(s, m.index, 2), ":B", false);
    },
    s2712s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2755s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! (m[2].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$/i) >= 0)) || m[2] in aREGULARPLURAL;
    },
    s2755s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2761s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! morph(dDA, prevword1(s, m.index), ":N", false) && ! (m[2].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$/i) >= 0)) || m[2] in aREGULARPLURAL;
    },
    s2761s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2767s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") || m[1] in aREGULARPLURAL) && ! look(s.slice(0,m.index), /\b(?:le|un|ce|du) +$/i);
    },
    s2767s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2771s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && ! (m[1].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor|Rois|Corinthiens|Thessaloniciens)$/i) >= 0);
    },
    s2771s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2775s_1: function (s, sx, m, dDA, sCountry) {
        return (m[1] != "1" && m[1] != "0" && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! (m[2].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$/i) >= 0)) || m[1] in aREGULARPLURAL;
    },
    s2775s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2783s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:p", ":(?:V0e|[NAQ].*:[me]:[si])");
    },
    c2783s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:p", ":(?:V0e|[NAQ].*:[me]:[si])");
    },
    c2783s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:[si]", ":(?:V0e|[NAQ].*:[me]:[si])");
    },
    c2787s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:s", ":(?:V0e|[NAQ].*:[me]:[pi])");
    },
    c2787s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:s", ":(?:V0e|[NAQ].*:[me]:[pi])");
    },
    c2787s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:[pi]", ":(?:V0e|[NAQ].*:[me]:[pi])");
    },
    c2791s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:p", ":(?:V0e|[NAQ].*:[fe]:[si])");
    },
    c2791s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:p", ":(?:V0e|[NAQ].*:[fe]:[si])");
    },
    c2791s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:[si]", ":(?:V0e|[NAQ].*:[fe]:[si])");
    },
    c2795s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:s", ":(?:V0e|[NAQ].*:[fe]:[pi])");
    },
    c2795s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:s", ":(?:V0e|[NAQ].*:[fe]:[pi])");
    },
    c2795s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:[pi]", ":(?:V0e|[NAQ].*:[fe]:[pi])");
    },
    c2807s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/);
    },
    c2810s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/);
    },
    s2810s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c2814s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[me]");
    },
    c2818s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[fe]");
    },
    c2822s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[me]");
    },
    c2826s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[fe]");
    },
    c2842s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false);
    },
    c2845s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false) && morphex(dDA, [m.start[4], m[4]], ":[NAQ].*:m", ":[fe]");
    },
    s2845s_1: function (s, m) {
        return m[1].replace(/lle/g, "l");
    },
    c2850s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false);
    },
    c2853s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false) && morphex(dDA, [m.start[4], m[4]], ":[NAQ].*:f", ":[me]");
    },
    s2853s_1: function (s, m) {
        return m[1].replace(/l/g, "lle");
    },
    c2872s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">trouver ", false) && morphex(dDA, [m.start[3], m[3]], ":A.*:(?:f|m:p)", ":(?:G|3[sp]|M[12P])");
    },
    s2872s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c2883s_1: function (s, sx, m, dDA, sCountry) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]);
    },
    s2883s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c2883s_2: function (s, sx, m, dDA, sCountry) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s"))) && ! apposition(m[1], m[2]);
    },
    s2883s_2: function (s, m) {
        return switchPlural(m[2]);
    },
    c2891s_1: function (s, sx, m, dDA, sCountry) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2891s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c2891s_2: function (s, sx, m, dDA, sCountry) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2891s_2: function (s, m) {
        return switchPlural(m[2]);
    },
    c2903s_1: function (s, sx, m, dDA, sCountry) {
        return ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":[GYfe]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":[GYme]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2903s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c2903s_2: function (s, sx, m, dDA, sCountry) {
        return ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[GYsi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[GYpi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2903s_2: function (s, m) {
        return switchPlural(m[2]);
    },
    c2915s_1: function (s, sx, m, dDA, sCountry) {
        return ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":(?:[Gfe]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":(?:[Gme]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2915s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c2915s_2: function (s, sx, m, dDA, sCountry) {
        return ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":(?:[Gsi]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":(?:[Gpi]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2915s_2: function (s, m) {
        return switchPlural(m[2]);
    },
    c2933s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^air$/i) >= 0) && ! m[2].startsWith("seul") && ((morph(dDA, [m.start[1], m[1]], ":m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2933s_1: function (s, m) {
        return switchGender(m[2], false);
    },
    c2933s_2: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^air$/i) >= 0) && ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[si]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2933s_2: function (s, m) {
        return suggSing(m[2]);
    },
    c2942s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && ((morph(dDA, [m.start[1], m[1]], ":m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]", false, false) && ! apposition(m[1], m[2]);
    },
    s2942s_1: function (s, m) {
        return switchGender(m[2], false);
    },
    c2942s_2: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^air$/i) >= 0) && ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[si]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! morph(dDA, prevword1(s, m.index), ":[NAQ]", false, false) && ! apposition(m[1], m[2]);
    },
    s2942s_2: function (s, m) {
        return suggSing(m[2]);
    },
    c2957s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "fois" && ! m[2].startsWith("seul") && ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":[fe]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":[me]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && morph(dDA, prevword1(s, m.index), ":[VRBX]", true, true) && ! apposition(m[1], m[2]);
    },
    s2957s_1: function (s, m) {
        return switchGender(m[2], true);
    },
    c2957s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && morph(dDA, prevword1(s, m.index), ":[VRBX]", true, true) && ! apposition(m[1], m[2]);
    },
    s2957s_2: function (s, m) {
        return suggPlur(m[2]);
    },
    c2978s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "fois" && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! m[2].startsWith("seul") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|d’) *$/);
    },
    s2978s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2982s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "fois" && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! m[2].startsWith("seul") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQB]", false, false);
    },
    s2982s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2992s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]", ":(?:B|G|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f") && ! apposition(m[2], m[3]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2992s_1: function (s, m) {
        return (m[1].search(/^(?:certains|quels)/i) >= 0) ? suggMasPlur(m[3])  : suggMasSing(m[3]);
    },
    c2998s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]", ":(?:B|G|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f") && ! apposition(m[2], m[3]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s2998s_1: function (s, m) {
        return (m[1].search(/^(?:certains|quels)/i) >= 0) ? suggMasPlur(m[3])  : suggMasSing(m[3]);
    },
    c3006s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:B|G|e|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f") && ! apposition(m[2], m[3]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s3006s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c3011s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:B|G|e|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f") && ! apposition(m[2], m[3]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s3011s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c3018s_1: function (s, sx, m, dDA, sCountry) {
        return m[2] != "fois" && ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:m") && ! apposition(m[2], m[3]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s3018s_1: function (s, m) {
        return (m[1].search(/^(?:certaines|quelles)/i) >= 0)  ? suggFemPlur(m[3])  : suggFemSing(m[3]);
    },
    c3024s_1: function (s, sx, m, dDA, sCountry) {
        return m[2] != "fois" && ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:m") && ! apposition(m[2], m[3]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s3024s_1: function (s, m) {
        return (m[1].search(/^(?:certaines|quelles)/i) >= 0)  ? suggFemPlur(m[3])  : suggFemSing(m[3]);
    },
    c3032s_1: function (s, sx, m, dDA, sCountry) {
        return m[2] != "fois" && ! m[3].startsWith("seul") && ! (m[0].search(/^quelque chose/i) >= 0) && ((morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:B|e|G|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:B|e|G|V0|m)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:m"))) && ! apposition(m[2], m[3]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s3032s_1: function (s, m) {
        return switchGender(m[3], m[1].endsWith("s"));
    },
    c3037s_1: function (s, sx, m, dDA, sCountry) {
        return m[2] != "fois" && ! m[3].startsWith("seul") && ! (m[0].search(/^quelque chose/i) >= 0) && ((morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:B|e|G|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:B|e|G|V0|m)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:m"))) && ! apposition(m[2], m[3]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s3037s_1: function (s, m) {
        return switchGender(m[3], m[1].endsWith("s"));
    },
    c3046s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s3046s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c3051s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s3051s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c3058s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWi]") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s3058s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c3063s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWi]") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s3063s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c3070s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! apposition(m[1], m[2]) && ! look_chk1(dDA, s.slice(m.end[0]), m.end[0], /^ +et +([a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+)/i, ":A");
    },
    s3070s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c3076s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! apposition(m[1], m[2]) && ! look_chk1(dDA, s.slice(m.end[0]), m.end[0], /^ +et +([a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+)/i, ":A") && ! look(s.slice(0,m.index), /\bune? de /i);
    },
    s3076s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c3110s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:s")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:p"));
    },
    s3110s_1: function (s, m) {
        return switchPlural(m[3]);
    },
    c3115s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:s");
    },
    s3115s_1: function (s, m) {
        return suggPlur(m[3]);
    },
    c3119s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:[pi]", ":G") && morph(dDA, [m.start[4], m[4]], ":[NAQ].*:s") && ! look(s.slice(0,m.index), /\bune? de /i);
    },
    s3119s_1: function (s, m) {
        return suggPlur(m[4]);
    },
    c3124s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:[si]", ":G") && morph(dDA, [m.start[4], m[4]], ":[NAQ].*:p");
    },
    s3124s_1: function (s, m) {
        return suggSing(m[4]);
    },
    c3134s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:(?:m|f:p)", ":(?:G|P|[fe]:[is]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s3134s_1: function (s, m) {
        return suggFemSing(m[2]);
    },
    c3138s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s3138s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c3142s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":[NAQ].*:f|>[aéeiou].*:e", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|m:[is]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s3142s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c3146s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":G|>[aéeiou].*:[ef]") && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") && ! apposition(m[2], m[3]);
    },
    s3146s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c3151s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":G|>[aéeiou].*:[ef]") && ! morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f|>[aéeiou].*:e", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") && ! apposition(m[2], m[3]);
    },
    s3151s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c3156s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":(?:G|P|[me]:[ip]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s3156s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c3174s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":B.*:p", false) && m[2] != "cents";
    },
    c3209s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c3210s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c3211s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c3217s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\bquatre $/i);
    },
    c3220s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":B", false) && ! look(s.slice(0,m.index), /\b(?:numéro|page|chapitre|référence|année|test|série)s? +$/i);
    },
    c3231s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":B|>une?", false, true) && ! look(s.slice(0,m.index), /\b(?:numéro|page|chapitre|référence|année|test|série)s? +$/i);
    },
    c3235s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, nextword1(s, m.end[0]), ":B|>une?", false, false);
    },
    c3238s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", ":G") && morphex(dDA, prevword1(s, m.index), ":[VR]", ":B", true);
    },
    c3243s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, nextword1(s, m.end[0]), ":B") || (morph(dDA, prevword1(s, m.index), ":B") && morph(dDA, nextword1(s, m.end[0]), ":[NAQ]", false));
    },
    c3254s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c3257s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false) && morph(dDA, [m.start[3], m[3]], ":(?:N|MP)");
    },
    s3300s_1: function (s, m) {
        return m[1]._trimRight("e");
    },
    c3305s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:V0e|W)|>très", false);
    },
    c3313s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:co[ûu]ter|payer) ", false);
    },
    c3330s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">donner ", false);
    },
    c3345s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:mettre|mise) ", false);
    },
    c3357s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:avoir|perdre) ", false);
    },
    c3360s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:lit|fauteuil|armoire|commode|guéridon|tabouret|chaise)s?\b/i);
    },
    c3367s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":(?:V|[NAQ].*:s)", ":(?:[NA]:.:[pi]|V0e.*:[123]p)", true);
    },
    c3416s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:aller|partir) ", false);
    },
    c3424s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":V0e.*:3p", false, false) || morph(dDA, nextword1(s, m.end[0]), ":Q", false, false);
    },
    c3442s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|devenir|para[îi]tre|rendre|sembler) ", false);
    },
    s3442s_1: function (s, m) {
        return m[2].replace(/oc/g, "o");
    },
    c3464s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">tenir ");
    },
    c3478s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">mettre ", false);
    },
    c3479s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c3500s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|aller) ", false);
    },
    s3502s_1: function (s, m) {
        return m[1].replace(/auspice/g, "hospice");
    },
    s3504s_1: function (s, m) {
        return m[1].replace(/auspice/g, "hospice");
    },
    c3525s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":[AQ]");
    },
    s3539s_1: function (s, m) {
        return m[1].replace(/cane/g, "canne");
    },
    c3546s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:appuyer|battre|frapper|lever|marcher) ", false);
    },
    s3546s_1: function (s, m) {
        return m[2].replace(/cane/g, "canne");
    },
    c3552s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^C(?:annes|ANNES)/) >= 0);
    },
    c3555s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^C(?:annes|ANNES)/) >= 0);
    },
    c3570s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c3578s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c3580s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":[VR]", false);
    },
    c3584s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].search(/^à cor et à cri$/i) >= 0);
    },
    c3591s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">tordre ", false);
    },
    c3593s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">rendre ", false);
    },
    c3604s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">couper ");
    },
    c3605s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:avoir|donner) ", false);
    },
    c3617s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V.[^:]:(?!Q)");
    },
    c3623s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:[lmtsc]es|des?|[nv]os|leurs|quels) +$/i);
    },
    c3634s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, nextword1(s, m.end[0]), ":[GV]", ":[NAQ]", true);
    },
    c3637s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, nextword1(s, m.end[0]), ":[GV]", ":[NAQ]");
    },
    c3640s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, nextword1(s, m.end[0]), ":[GV]", ":[NAQ]", true);
    },
    c3643s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, nextword1(s, m.end[0]), ":G", ":[NAQ]");
    },
    c3646s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    s3646s_1: function (s, m) {
        return m[2].replace(/nd/g, "nt");
    },
    c3656s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":V0e", false, false);
    },
    c3662s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ">(?:abandonner|céder|résister) ", false) && ! look(s.slice(m.end[0]), /^ d(?:e |’)/);
    },
    s3675s_1: function (s, m) {
        return m[1].replace(/nt/g, "mp");
    },
    c3690s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false) && morph(dDA, [m.start[3], m[3]], ":(?:Y|Oo)", false);
    },
    s3690s_1: function (s, m) {
        return m[2].replace(/sens/g, "cens");
    },
    s3699s_1: function (s, m) {
        return m[1].replace(/o/g, "ô");
    },
    c3714s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c3731s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:desceller|desseller) ", false);
    },
    s3731s_1: function (s, m) {
        return m[2].replace(/descell/g, "décel").replace(/dessell/g, "décel");
    },
    c3735s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:desceller|desseller) ", false);
    },
    s3735s_1: function (s, m) {
        return m[1].replace(/descell/g, "décel").replace(/dessell/g, "décel");
    },
    c3749s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false);
    },
    s3749s_1: function (s, m) {
        return m[2].replace(/î/g, "i");
    },
    c3752s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:[vn]ous|lui|leur|et toi) +$|[nm]’$/i);
    },
    s3760s_1: function (s, m) {
        return m[1].replace(/and/g, "ant");
    },
    c3766s_1: function (s, sx, m, dDA, sCountry) {
        return ! ( m[1] == "bonne" && look(s.slice(0,m.index), /\bune +$/i) && look(s.slice(m.end[0]), /^ +pour toute/i) );
    },
    c3769s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:faire|perdre|donner) ", false);
    },
    c3794s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":D");
    },
    s3864s_1: function (s, m) {
        return m[0].slice(0,-1).replace(/ /g, "-")+"à";
    },
    c3865s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":[NAQ]");
    },
    c3866s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":[123][sp]");
    },
    c3870s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[GQ]");
    },
    c3872s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[GQ]");
    },
    c3876s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[GQ]");
    },
    c3884s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":Y", ":[NA].*:[pe]") && ! look(s.slice(0,m.index), /\b[ld]es +$/i);
    },
    c3892s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">soulever ", false);
    },
    s3892s_1: function (s, m) {
        return m[1].slice(3);
    },
    c3904s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|habiter|trouver|situer|rester|demeurer?) ", false);
    },
    c3915s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c3919s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c3933s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1] == "Notre" && look(s.slice(m.end[0]), /Père/));
    },
    s3933s_1: function (s, m) {
        return m[1].replace(/otre/g, "ôtre");
    },
    c3935s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(les?|la|du|des|aux?) +/i) && morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    s3935s_1: function (s, m) {
        return m[1].replace(/ôtre/g, "otre")._trimRight("s");
    },
    c3943s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c3954s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c3957s_1: function (s, sx, m, dDA, sCountry) {
        return ( (m[2].search(/^[nmts]e$/) >= 0) || (! (m[2].search(/^(?:confiance|envie|peine|prise|crainte|affaire|hâte|force|recours|somme)$/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[AG]")) ) && ! prevword1(s, m.index);
    },
    c3962s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:[1-3][sp])", ":(?:G|1p)") && ! ( m[0].indexOf(" leur ") && morph(dDA, [m.start[2], m[2]], ":[NA].*:[si]", false) ) && ! prevword1(s, m.index);
    },
    c3968s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false) && ! look(s.slice(m.end[0]), /^ +>/) && ! morph(dDA, nextword1(s, m.end[0]), ":3s", false);
    },
    c3976s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V.[a-z_!?]+:(?!Y)");
    },
    c3977s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V0e", ":Y");
    },
    c3979s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    s3985s_1: function (s, m) {
        return m[1].replace(/pin/g, "pain");
    },
    c3987s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:manger|dévorer|avaler|engloutir) ");
    },
    s3987s_1: function (s, m) {
        return m[2].replace(/pin/g, "pain");
    },
    c3994s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">aller ", false);
    },
    c4001s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    s4001s_1: function (s, m) {
        return m[2].replace(/pal/g, "pâl");
    },
    s4004s_1: function (s, m) {
        return m[2].replace(/pal/g, "pâl");
    },
    c4010s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">prendre ", false);
    },
    c4011s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">tirer ", false);
    },
    c4012s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c4014s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">prendre ", false);
    },
    c4022s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ]");
    },
    c4023s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c4029s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":A") && ! (m[2].search(/^seule?s?$/i) >= 0);
    },
    c4034s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:N|A|Q|G|MP)");
    },
    c4047s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":(?:Y|M[12P])");
    },
    c4050s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /(?:peu|de) $/i) && morph(dDA, [m.start[2], m[2]], ":Y|>(tout|les?|la) ");
    },
    c4062s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c4068s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":Q");
    },
    c4076s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":[AQ]", false);
    },
    c4096s_1: function (s, sx, m, dDA, sCountry) {
        return ! nextword1(s, m.end[0]);
    },
    c4099s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">résonner ", false);
    },
    s4099s_1: function (s, m) {
        return m[1].replace(/réso/g, "raiso");
    },
    c4109s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M1", false);
    },
    s4122s_1: function (s, m) {
        return m[1].replace(/sale/g, "salle");
    },
    c4126s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    s4126s_1: function (s, m) {
        return m[2].replace(/salle/g, "sale");
    },
    s4140s_1: function (s, m) {
        return m[1].replace(/scep/g,"sep");
    },
    c4143s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">être ", false);
    },
    s4143s_1: function (s, m) {
        return m[2].replace(/sep/g, "scep");
    },
    c4151s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">suivre ", false);
    },
    c4159s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), / soit /);
    },
    c4160s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, nextword1(s, m.end[0]), ":[GY]", true, true) && ! look(s.slice(0,m.index), /quel(?:s|les?|) qu $|on $|il $/i) && ! look(s.slice(m.end[0]), / soit /);
    },
    c4177s_1: function (s, sx, m, dDA, sCountry) {
        return ( morphex(dDA, [m.start[2], m[2]], ":N.*:[me]:s", ":[GW]") || ((m[2].search(/^[aeéiîou]/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":N.*:f:s", ":G")) ) && ( look(s.slice(0,m.index), /^ *$|\b(?:à|avec|chez|dès|contre|devant|derrière|en|par|pour|sans|sur) +$|, +$/i) || (morphex(dDA, prevword1(s, m.index), ":V", ":(?:G|W|[NA].*:[pi])") && ! look(s.slice(0,m.index), /\bce que?\b/i)) );
    },
    s4197s_1: function (s, m) {
        return m[1].replace(/sur/g, "sûr");
    },
    s4200s_1: function (s, m) {
        return m[1].replace(/sur/g, "sûr");
    },
    c4206s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":M1", false);
    },
    c4209s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":Y", false);
    },
    s4209s_1: function (s, m) {
        return m[1].replace(/sur/g, "sûr");
    },
    c4218s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":N", ":[GMY]|>(?:fond|envergure|ampleur|importance) ");
    },
    s4218s_1: function (s, m) {
        return m[1].replace(/â/g, "a");
    },
    s4222s_1: function (s, m) {
        return m[1].replace(/â/g, "a");
    },
    c4232s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ">aller ", false);
    },
    c4235s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    s4238s_1: function (s, m) {
        return m[1].replace(/taule/g, "tôle");
    },
    c4248s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false) && morph(dDA, [m.start[3], m[3]], ":Y", false);
    },
    c4256s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false);
    },
    c4281s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]:s");
    },
    c4300s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">ouvrir ", false);
    },
    c4309s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":A") && ! morph(dDA, nextword1(s, m.end[0]), ":D", false, false);
    },
    c4338s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1]._isDigit() && ! m[2]._isDigit() && ! morph(dDA, [m.start[0], m[0]], ":", false) && ! morph(dDA, [m.start[2], m[2]], ":G", false) && _oDict.isValid(m[1]+m[2]);
    },
    c4338s_2: function (s, sx, m, dDA, sCountry) {
        return m[2] != "là" && ! (m[1].search(/^(?:ex|mi|quasi|semi|non|demi|pro|anti|multi|pseudo|proto|extra)$/i) >= 0) && ! m[1]._isDigit() && ! m[2]._isDigit() && ! morph(dDA, [m.start[2], m[2]], ":G", false) && ! morph(dDA, [m.start[0], m[0]], ":", false) && ! _oDict.isValid(m[1]+m[2]);
    },
    c4351s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ,] +$/);
    },
    s4351s_1: function (s, m) {
        return m[0].toLowerCase();
    },
    c4356s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ,] +$/) && !( ( m[0]=="Juillet" && look(s.slice(0,m.index), /monarchie +de +$/i) ) || ( m[0]=="Octobre" && look(s.slice(0,m.index), /révolution +d’$/i) ) );
    },
    s4356s_1: function (s, m) {
        return m[0].toLowerCase();
    },
    c4375s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].search(/^fonctions? /i) >= 0) || ! look(s.slice(0,m.index), /\ben $/i);
    },
    c4382s_1: function (s, sx, m, dDA, sCountry) {
        return m[2]._isTitle() && morphex(dDA, [m.start[1], m[1]], ":N", ":(?:A|V0e|D|R|B)") && ! (m[0].search(/^[oO]céan Indien/i) >= 0);
    },
    s4382s_1: function (s, m) {
        return m[2].toLowerCase();
    },
    c4382s_2: function (s, sx, m, dDA, sCountry) {
        return m[2]._isLowerCase() && ! m[2].startsWith("canadienne") && ( (m[1].search(/^(?:certaine?s?|cette|ce[ts]?|[dl]es|[nv]os|quelques|plusieurs|chaque|une)$/i) >= 0) || ( (m[1].search(/^un$/i) >= 0) && ! look(s.slice(m.end[0]), /(?:approximatif|correct|courant|parfait|facile|aisé|impeccable|incompréhensible)/) ) );
    },
    s4382s_2: function (s, m) {
        return m[2]._toCapitalize();
    },
    s4396s_1: function (s, m) {
        return m[1]._toCapitalize();
    },
    c4400s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:parler|cours|leçon|apprendre|étudier|traduire|enseigner|professeur|enseignant|dictionnaire|méthode) ", false);
    },
    s4400s_1: function (s, m) {
        return m[2].toLowerCase();
    },
    s4405s_1: function (s, m) {
        return m[1].toLowerCase();
    },
    c4417s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c4429s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/);
    },
    s4440s_1: function (s, m) {
        return m[1]._toCapitalize();
    },
    s4442s_1: function (s, m) {
        return m[1]._toCapitalize();
    },
    c4450s_1: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^(?:Mètre|Watt|Gramme|Seconde|Ampère|Kelvin|Mole|Cand[eé]la|Hertz|Henry|Newton|Pascal|Joule|Coulomb|Volt|Ohm|Farad|Tesla|W[eé]ber|Radian|Stéradian|Lumen|Lux|Becquerel|Gray|Sievert|Siemens|Katal)s?|(?:Exa|P[ée]ta|Téra|Giga|Méga|Kilo|Hecto|Déc[ai]|Centi|Mi(?:lli|cro)|Nano|Pico|Femto|Atto|Ze(?:pto|tta)|Yo(?:cto|etta))(?:mètre|watt|gramme|seconde|ampère|kelvin|mole|cand[eé]la|hertz|henry|newton|pascal|joule|coulomb|volt|ohm|farad|tesla|w[eé]ber|radian|stéradian|lumen|lux|becquerel|gray|sievert|siemens|katal)s?/) >= 0);
    },
    s4450s_1: function (s, m) {
        return m[2].toLowerCase();
    },
    c4477s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":Y", false);
    },
    c4479s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V1") && ! look(s.slice(0,m.index), /\b(?:quelqu(?:e chose|’une?)|(?:l(es?|a)|nous|vous|me|te|se)[ @]trait|personne|rien(?: +[a-zéèêâîûù]+|) +$)/i);
    },
    s4479s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4482s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":M[12P]");
    },
    s4482s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4484s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V1", false);
    },
    s4484s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4486s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":[123][sp]");
    },
    c4488s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":[NM]") && ! morph(dDA, prevword1(s, m.index), ">(?:tenir|passer) ", false);
    },
    s4488s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4491s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V1", false);
    },
    s4491s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4493s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":[NM]");
    },
    s4493s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4495s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":Q", false);
    },
    c4497s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Q|2p)", false);
    },
    s4497s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4499s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":Q", false) && ! morph(dDA, prevword1(s, m.index), "V0.*[12]p", false);
    },
    c4501s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:devoir|savoir|pouvoir) ", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Q|A|[13]s|2[sp])", ":[GYW]");
    },
    s4501s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c4504s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|A|[13]s|2[sp])", ":[GYWM]");
    },
    s4504s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    s4513s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c4538s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c4542s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">sembler ", false);
    },
    c4556s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4559s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V[123]_i_._") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4561s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":A", false) && morphex(dDA, [m.start[2], m[2]], ":A", ":[GM]");
    },
    c4563s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":A", false);
    },
    c4565s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GV]") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4567s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":N", ":[GY]") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4570s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":V0") && morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:G|[123][sp]|P)");
    },
    c4581s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4585s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /[jn]’$/);
    },
    c4593s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":G") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4596s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4599s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4603s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c4606s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":N", ":[GY]") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4608s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4610s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":Y") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4642s_1: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^(?:fini|terminé)s?/i) >= 0) && morph(dDA, prevword1(s, m.index), ":C", false, true);
    },
    c4642s_2: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^(?:assez|trop)$/i) >= 0) && (look(s.slice(m.end[0]), /^ +d(?:e |’)/) || ! nextword1(s, m.end[0]));
    },
    c4642s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":A", ":[GVW]") && morph(dDA, prevword1(s, m.index), ":C", false, true);
    },
    c4654s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">aller", false) && ! look(s.slice(m.end[0]), / soit /);
    },
    c4662s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    s4662s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4664s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    s4664s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4666s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    s4666s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4669s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:faire|vouloir) ", false) && ! look(s.slice(0,m.index), /\b(?:en|[mtsld]es?|[nv]ous|un) +$/i) && morphex(dDA, [m.start[2], m[2]], ":V", ":M");
    },
    s4669s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c4672s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">savoir :V", false) && morph(dDA, [m.start[2], m[2]], ":V", false) && ! look(s.slice(0,m.index), /\b(?:[mts]e|[vn]ous|les?|la|un) +$/i);
    },
    s4672s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c4675s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Q|2p)", false);
    },
    s4675s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4678s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|2p)", ":N");
    },
    s4678s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4722s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s4722s_1: function (s, m) {
        return suggSing(m[3]);
    },
    c4726s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[1], m[1]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[1].endsWith(" été")) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s4726s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c4730s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]"));
    },
    s4730s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4735s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[GWYsi]") || ( morphex(dDA, [m.start[1], m[1]], ":[AQ].*:f", ":[GWYme]") && ! morph(dDA, nextword1(s, m.end[0]), ":N.*:f", false, false) );
    },
    s4735s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c4739s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[GWYsi]") || ( morphex(dDA, [m.start[1], m[1]], ":[AQ].*:f", ":[GWYme]") && ! morph(dDA, nextword1(s, m.end[0]), ":N.*:f", false, false) );
    },
    s4739s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c4743s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s4743s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4749s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && ! morph(dDA, prevword1(s, m.index), ":R|>de ", false, false);
    },
    s4749s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c4755s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]"));
    },
    s4755s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c4760s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^légion$/i) >= 0) && ! look(s.slice(0,m.index), /\b(?:nous|ne) +$/i) && ((morph(dDA, [m.start[1], m[1]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) && morph(dDA, [m.start[1], m[1]], ":1p", false)) || m[1].endsWith(" été")) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWYpi]");
    },
    s4760s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4766s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && ! look(s.slice(0,m.index), /ce que? +$/i) && (! (m[1].search(/^(?:ceux-(?:ci|là)|lesquels)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4766s_1: function (s, m) {
        return suggMasPlur(m[3]);
    },
    c4772s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && (! (m[1].search(/^(?:elles|celles-(?:ci|là)|lesquelles)$/i) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4772s_1: function (s, m) {
        return suggFemPlur(m[3]);
    },
    c4778s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false) && morphex(dDA, [m.start[2], m[2]], ":[123]s", ":[GNAQWY]");
    },
    s4778s_1: function (s, m) {
        return suggVerbPpas(m[2]);
    },
    c4859s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s4859s_1: function (s, m) {
        return suggSing(m[3]);
    },
    c4863s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s4863s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c4867s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]"));
    },
    s4867s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4872s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[MWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s4872s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4878s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s4878s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c4884s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[MWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]"));
    },
    s4884s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c4889s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^légion$/i) >= 0) && morph(dDA, [m.start[1], m[1]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && morph(dDA, [m.start[1], m[1]], ":1p", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWYpi]");
    },
    s4889s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4894s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && (! (m[1].search(/^(?:ceux-(?:ci|là)|lesquels)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4894s_1: function (s, m) {
        return suggMasPlur(m[3]);
    },
    c4900s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && (! (m[1].search(/^(?:elles|celles-(?:ci|là)|lesquelles)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4900s_1: function (s, m) {
        return suggFemPlur(m[3]);
    },
    c4931s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GMWYsi]") && ! morph(dDA, [m.start[1], m[1]], ":G", false);
    },
    s4931s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c4935s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^légion$/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWYpi]") && ! morph(dDA, [m.start[1], m[1]], ":G", false);
    },
    s4935s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4940s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && ((morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWme]") && morphex(dDA, [m.start[2], m[2]], ":m", ":[Gfe]")) || (morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWfe]") && morphex(dDA, [m.start[2], m[2]], ":f", ":[Gme]"))) && ! ( morph(dDA, [m.start[3], m[3]], ":p", false) && morph(dDA, [m.start[2], m[2]], ":s", false) ) && ! morph(dDA, prevword1(s, m.index), ":(?:R|P|Q|Y|[123][sp])", false, false) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4940s_1: function (s, m) {
        return switchGender(m[3]);
    },
    c4947s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^légion$/i) >= 0) && ((morphex(dDA, [m.start[1], m[1]], ":M[1P].*:f", ":[GWme]") && morphex(dDA, [m.start[2], m[2]], ":m", ":[GWfe]")) || (morphex(dDA, [m.start[1], m[1]], ":M[1P].*:m", ":[GWfe]") && morphex(dDA, [m.start[2], m[2]], ":f", ":[GWme]"))) && ! morph(dDA, prevword1(s, m.index), ":(?:R|P|Q|Y|[123][sp])", false, false) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4947s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c4956s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:p", ":(?:G|E|M1|W|s|i)");
    },
    s4956s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c4960s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[fp]", ":(?:G|E|M1|W|m:[si])");
    },
    s4960s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c4964s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[mp]", ":(?:G|E|M1|W|f:[si])|>(?:désoler|pire) ");
    },
    s4964s_1: function (s, m) {
        return suggFemSing(m[1]);
    },
    c4968s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[fs]", ":(?:G|E|M1|W|m:[pi])|>(?:désoler|pire) ");
    },
    s4968s_1: function (s, m) {
        return suggMasPlur(m[1]);
    },
    c4972s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[ms]", ":(?:G|E|M1|W|f:[pi])|>(?:désoler|pire) ");
    },
    s4972s_1: function (s, m) {
        return suggFemPlur(m[1]);
    },
    c4989s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], "V0e", false);
    },
    c4996s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]");
    },
    s4996s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c4999s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]");
    },
    s4999s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c5002s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|[NAQ].*:[pf])", ":(?:G|W|[me]:[si])") && ! (m[1] == "ce" && morph(dDA, [m.start[2], m[2]], ":Y", false));
    },
    s5002s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c5005s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:[pm])", ":(?:G|W|[fe]:[si])");
    },
    s5005s_1: function (s, m) {
        return suggFemSing(m[1]);
    },
    c5008s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]");
    },
    s5008s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c5011s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^légion$/i) >= 0) && (morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]") || morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|[AQ].*:f)", ":[GWme]"));
    },
    s5011s_1: function (s, m) {
        return suggMasPlur(m[1]);
    },
    c5014s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^légion$/i) >= 0) && (morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]") || morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|[AQ].*:m)", ":[GWfe]"));
    },
    s5014s_1: function (s, m) {
        return suggFemPlur(m[1]);
    },
    c5043s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":[QWGBMpi]") && ! (m[1].search(/^(?:légion|nombre|cause)$/i) >= 0) && ! look(s.slice(0,m.index), /\bce que?\b/i);
    },
    s5043s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c5043s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:N|A|Q|W|G|3p)") && ! look(s.slice(0,m.index), /\bce que?\b/i);
    },
    s5043s_2: function (s, m) {
        return suggVerbPpas(m[1], ":m:p");
    },
    c5054s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWsi]");
    },
    s5054s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c5058s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWsi]");
    },
    s5058s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c5062s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWsi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[GWme]")) && (! (m[1].search(/^(?:celui-(?:ci|là)|lequel)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s5062s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c5068s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWsi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[GWfe]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s5068s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c5074s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWsi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[GWfe]"));
    },
    s5074s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c5079s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWpi]");
    },
    s5079s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c5083s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWpi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[GWme]")) && (! (m[1].search(/^(?:ceux-(?:ci|là)|lesquels)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s5083s_1: function (s, m) {
        return suggMasPlur(m[3]);
    },
    c5089s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWpi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[GWfe]")) && (! (m[1].search(/^(?:elles|celles-(?:ci|là)|lesquelles)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s5089s_1: function (s, m) {
        return suggFemPlur(m[3]);
    },
    c5097s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) ", false) && morphex(dDA, [m.start[2], m[2]], ":[AQ]:(?:m:p|f)", ":(?:G|[AQ]:m:[is])");
    },
    s5097s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c5100s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) ", false) && morphex(dDA, [m.start[2], m[2]], ":[AQ]:(?:f:p|m)", ":(?:G|[AQ]:f:[is])");
    },
    s5100s_1: function (s, m) {
        return suggFemSing(m[2]);
    },
    c5103s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) ", false) && morphex(dDA, [m.start[2], m[2]], ":[AQ].*:s", ":(?:G|[AQ].*:[ip])");
    },
    s5103s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c5106s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:trouver|considérer|croire) ", false) && morphex(dDA, [m.start[3], m[3]], ":[AQ].*:p", ":(?:G|[AQ].*:[is])");
    },
    s5106s_1: function (s, m) {
        return suggSing(m[3]);
    },
    c5109s_1: function (s, sx, m, dDA, sCountry) {
        return ( morphex(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) ", ":1p") || (morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) .*:1p", false) && look(s.slice(0,m.index), /\bn(?:ous|e) +$/)) ) && morphex(dDA, [m.start[2], m[2]], ":[AQ].*:s", ":(?:G|[AQ].*:[ip])");
    },
    s5109s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c5131s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$/i) >= 0) && morph(dDA, [m.start[2], m[2]], ":V0a", false) && morphex(dDA, [m.start[3], m[3]], ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])");
    },
    s5131s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c5137s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[4].search(/^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$/i) >= 0) && morph(dDA, [m.start[3], m[3]], ":V0a", false) && morphex(dDA, [m.start[4], m[4]], ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])");
    },
    s5137s_1: function (s, m) {
        return suggMasSing(m[4]);
    },
    c5143s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:s", ":[GWpi]") && ! morph(dDA, nextword1(s, m.end[0]), ":V", false);
    },
    s5143s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c5148s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t_.*:Q.*:s", ":[GWpi]") && ! look(s.slice(0,m.index), /\bque?\b/);
    },
    s5148s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c5153s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]") && ! morph(dDA, nextword1(s, m.end[0]), ":V", false);
    },
    s5153s_1: function (s, m) {
        return m[2].slice(0,-1);
    },
    c5158s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0a", false) && morphex(dDA, [m.start[3], m[3]], ":V[0-3]..t_.*:Q.*:p", ":[GWsi]") && ! look(s.slice(0,m.index), /\bque?\b/) && ! morph(dDA, nextword1(s, m.end[0]), ":V", false);
    },
    s5158s_1: function (s, m) {
        return m[3].slice(0,-1);
    },
    c5163s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":Q.*:(?:f|m:p)", ":m:[si]");
    },
    s5163s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c5169s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$/i) >= 0) && morphex(dDA, [m.start[1], m[1]], ":Q.*:(?:f|m:p)", ":m:[si]") && look(s.slice(0,m.index), /(?:après +$|sans +$|pour +$|que? +$|quand +$|, +$|^ *$)/i);
    },
    s5169s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c5199s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":V0a", false) && ! ((m[4].search(/^(?:décidé|essayé|tenté)$/) >= 0) && look(s.slice(m.end[0]), / +d(?:e |’)/)) && morph(dDA, [m.start[2], m[2]], ":[NAQ]", false) && morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:s", ":[GWpi]") && ! morph(dDA, nextword1(s, m.end[0]), ":(?:Y|Oo)", false);
    },
    s5199s_1: function (s, m) {
        return suggPlur(m[4], m[2]);
    },
    c5207s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":V0a", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m", false) && (morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:f", ":[GWme]") || morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]"));
    },
    s5207s_1: function (s, m) {
        return suggMasSing(m[4]);
    },
    c5214s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":V0a", false) && ! ((m[4].search(/^(?:décidé|essayé|tenté)$/) >= 0) && look(s.slice(m.end[0]), / +d(?:e |’)/)) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f", false) && (morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:m", ":[GWfe]") || morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]")) && ! morph(dDA, nextword1(s, m.end[0]), ":(?:Y|Oo)|>que?", false);
    },
    s5214s_1: function (s, m) {
        return suggFemSing(m[4]);
    },
    c5234s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && (morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:f", ":[GWme]") || morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]"));
    },
    s5234s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c5240s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^(?:A|avions)$/) >= 0) && morph(dDA, [m.start[1], m[1]], ":V0a", false) && morph(dDA, [m.start[2], m[2]], ":V.+:(?:Y|2p)", false);
    },
    s5240s_1: function (s, m) {
        return suggVerbPpas(m[2], ":m:s");
    },
    c5246s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && (morph(dDA, [m.start[3], m[3]], ":Y") || (m[3].search(/^(?:[mtsn]e|[nv]ous|leur|lui)$/) >= 0));
    },
    c5250s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && (morph(dDA, [m.start[3], m[3]], ":Y") || (m[3].search(/^(?:[mtsn]e|[nv]ous|leur|lui)$/) >= 0));
    },
    c5256s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":[NAQ].*:[me]", false);
    },
    c5258s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c5275s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Y|2p|Q.*:[fp])", ":m:[si]") && m[2] != "prise" && ! morph(dDA, prevword1(s, m.index), ">(?:les|[nv]ous|en)|:[NAQ].*:[fp]", false) && ! look(s.slice(0,m.index), /\bquel(?:le|)s?\b/i);
    },
    s5275s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c5281s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0a", false) && morphex(dDA, [m.start[3], m[3]], ":(?:Y|2p|Q.*:p)", ":[si]");
    },
    s5281s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c5286s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[123]..t.* :Q.*:s", ":[GWpi]");
    },
    s5286s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c5292s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:G|Y|P|1p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|tu|ils?|elles?|on|[vn]ous) /);
    },
    s5292s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c5298s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:G|Y|P|2p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|ils?|elles?|on|[vn]ous) /);
    },
    s5298s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c5335s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":G");
    },
    c5343s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V[13].*:Ip.*:2s", ":[GNA]");
    },
    s5343s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c5346s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V[13].*:Ip.*:2s", ":G");
    },
    s5346s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c5351s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[MOs]");
    },
    c5354s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V[23].*:Ip.*:3s", ":[GNA]") && analyse(m[1].slice(0,-1)+"s", ":E:2s", false) && ! (m[1].search(/^doit$/i) >= 0) && ! ((m[1].search(/^vient$/i) >= 0) && look(s.slice(m.end[0]), / +l[ea]/));
    },
    s5354s_1: function (s, m) {
        return m[1].slice(0,-1)+"s";
    },
    c5358s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V[23].*:Ip.*:3s", ":G") && analyse(m[1].slice(0,-1)+"s", ":E:2s", false);
    },
    s5358s_1: function (s, m) {
        return m[1].slice(0,-1)+"s";
    },
    c5363s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V3.*:Ip.*:3s", ":[GNA]");
    },
    c5366s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V3.*:Ip.*:3s", ":G");
    },
    c5376s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":A", ":G") && ! look(s.slice(m.end[0]), /\bsoit\b/);
    },
    c5387s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":E|>chez", false) && _oDict.isValid(m[1]);
    },
    s5387s_1: function (s, m) {
        return suggVerbImpe(m[1]);
    },
    c5392s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":E|>chez", false) && _oDict.isValid(m[1]);
    },
    s5392s_1: function (s, m) {
        return suggVerbTense(m[1], ":E", ":2s");
    },
    c5417s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]");
    },
    c5422s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:Y|3[sp])", true) && morph(dDA, prevword1(s, m.index), ":Cc", false, true) && ! look(s.slice(0,m.index), /~ +$/);
    },
    c5427s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:N|A|Q|Y|B|3[sp])", true) && morph(dDA, prevword1(s, m.index), ":Cc", false, true) && ! look(s.slice(0,m.index), /~ +$/);
    },
    c5432s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:N|A|Q|Y|MP)", true) && morph(dDA, prevword1(s, m.index), ":Cc", false, true) && ! look(s.slice(0,m.index), /~ +$/);
    },
    c5450s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":(?:G|M[12])") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:Y|[123][sp])", true);
    },
    s5450s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5455s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":E", false);
    },
    s5455s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5460s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":E", false) && morphex(dDA, nextword1(s, m.end[0]), ":[RC]", ":[NAQ]", true);
    },
    s5460s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5465s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":E", false) && morphex(dDA, nextword1(s, m.end[0]), ":[RC]", ":Y", true);
    },
    s5465s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5471s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    s5471s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5473s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    s5475s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5501s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, true);
    },
    c5502s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    c5504s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    c5506s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]");
    },
    c5507s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":[123]s", false, false);
    },
    c5508s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:[123]s|R)", false, false);
    },
    c5509s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:[123]p|R)", false, false);
    },
    c5510s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":3p", false, false);
    },
    c5511s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false);
    },
    c5512s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:[NAQ].*:m:[si]|G|M)");
    },
    c5513s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:[NAQ].*:f:[si]|G|M)");
    },
    c5514s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:[NAQ].*:[si]|G|M)");
    },
    c5515s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:[NAQ].*:[si]|G|M)");
    },
    c5517s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:A|G|M|1p)");
    },
    c5518s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:A|G|M|2p)");
    },
    c5520s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    c5521s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    c5522s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":2s", false) || look(s.slice(0,m.index), /\b(?:je|tu|on|ils?|elles?|nous) +$/i);
    },
    c5523s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":2s|>(ils?|elles?|on) ", false) || look(s.slice(0,m.index), /\b(?:je|tu|on|ils?|elles?|nous) +$/i);
    },
    c5537s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c5540s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":Y");
    },
    c5554s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:ce que?|tout) /i);
    },
    c5567s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":M") && ! (m[1].endsWith("ez") && look(s.slice(m.end[0]), / +vous/));
    },
    s5567s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c5570s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|2p)", ":M");
    },
    s5570s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c5573s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:aimer|aller|désirer|devoir|espérer|pouvoir|préférer|souhaiter|venir) ", false) && ! morph(dDA, [m.start[1], m[1]], ":[GN]", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":M");
    },
    s5573s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5577s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">devoir ", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":M") && ! morph(dDA, prevword1(s, m.index), ":D", false);
    },
    s5577s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5580s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:cesser|décider|défendre|suggérer|commander|essayer|tenter|choisir|permettre|interdire) ", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Q|2p)", ":M");
    },
    s5580s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5583s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|2p)", ":M");
    },
    s5583s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c5586s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">valoir ", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Q|2p)", ":[GM]");
    },
    s5586s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5589s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":[NM]") && ! m[1]._isTitle() && ! look(s.slice(0,m.index), /> +$/);
    },
    s5589s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c5592s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V1", ":N");
    },
    s5592s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5605s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false) && (morphex(dDA, [m.start[2], m[2]], ":Y", ":[NAQ]") || m[2] in aSHOULDBEVERB) && ! (m[1].search(/^(?:soit|été)$/i) >= 0) && ! morph(dDA, prevword1(s, m.index), ":Y|>ce", false, false) && ! look(s.slice(0,m.index), /ce (?:>|qu|que >) $/i) && ! look_chk1(dDA, s.slice(0,m.index), 0, /([a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+) +> $/i, ":Y") && ! look_chk1(dDA, s.slice(0,m.index), 0, /^ *>? *([a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+)/i, ":Y");
    },
    s5605s_1: function (s, m) {
        return suggVerbPpas(m[2]);
    },
    c5616s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":1s|>(?:en|y)", false);
    },
    s5616s_1: function (s, m) {
        return suggVerb(m[1], ":1s");
    },
    c5619s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:1s", false, false));
    },
    s5619s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c5622s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G|1p)");
    },
    s5622s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c5625s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G|1p)");
    },
    s5625s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c5628s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G|1p|3p!)");
    },
    s5628s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c5648s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|[ISK].*:2s)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:2s", false, false));
    },
    s5648s_1: function (s, m) {
        return suggVerb(m[2], ":2s");
    },
    c5651s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|[ISK].*:2s)");
    },
    s5651s_1: function (s, m) {
        return suggVerb(m[2], ":2s");
    },
    c5654s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|2p|3p!|[ISK].*:2s)");
    },
    s5654s_1: function (s, m) {
        return suggVerb(m[2], ":2s");
    },
    c5665s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3s", false, false));
    },
    s5665s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5668s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)");
    },
    s5668s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5683s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:N|A|3s|P|Q|G|V0e.*:3p)");
    },
    s5683s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5687s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|Q|G)");
    },
    s5687s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5695s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|Q|G|3p!)") && ! morph(dDA, prevword1(s, m.index), ":[VR]|>de", false, false) && !(m[1].endsWith("out") && morph(dDA, [m.start[2], m[2]], ":Y", false));
    },
    s5695s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5712s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3s|P|G|3p!)") && ! morph(dDA, prevword1(s, m.index), ":R|>(?:et|ou)", false, false) && ! (morph(dDA, [m.start[1], m[1]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3s", false, false));
    },
    s5712s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c5716s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3s|P|G|3p!)") && ! morph(dDA, prevword1(s, m.index), ":R|>(?:et|ou)", false, false);
    },
    s5716s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c5733s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":3p", ":(?:G|3s)");
    },
    c5736s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":3s", ":(?:G|3p)");
    },
    c5739s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":3p", ":(?:G|3s)") && (! prevword1(s, m.index) || look(s.slice(0,m.index), /\b(?:parce que?|quoi ?que?|pour ?quoi|puisque?|quand|com(?:ment|bien)|car|tandis que?) +$/i));
    },
    c5743s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":3s", ":(?:G|3p)") && (! prevword1(s, m.index) || look(s.slice(0,m.index), /\b(?:parce que?|quoi ?que?|pour ?quoi|puisque?|quand|com(?:ment|bien)|car|tandis que?) +$/i));
    },
    s5751s_1: function (s, m) {
        return m[1].slice(0,-1)+"t";
    },
    c5754s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P|Q|[123][sp]|R)", true) && !( m[1].endsWith("ien") && look(s.slice(0,m.index), /> +$/) && morph(dDA, [m.start[2], m[2]], ":Y", false) );
    },
    s5754s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5772s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G|Q)") && morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P|Q|[123][sp]|R)", true);
    },
    s5772s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5776s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P|Q|[123][sp]|R)", true);
    },
    s5776s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5784s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":Y", false) && morph(dDA, [m.start[2], m[2]], ":V.[a-z_!?]+(?!.*:(?:3s|P|Q|Y|3p!))");
    },
    s5784s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5792s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:3s|P|Q|Y|3p!|G)") && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":[1-3]p", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i) && ! checkAgreement(m[2], m[3]);
    },
    s5792s_1: function (s, m) {
        return suggVerb(m[3], ":3s");
    },
    c5796s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:3s|1p|P|Q|Y|3p!|G)") && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":[123]p", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i);
    },
    s5796s_1: function (s, m) {
        return suggVerb(m[3], ":3s");
    },
    c5819s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && isAmbiguousAndWrong(m[2], m[3], ":s", ":3s") && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":(?:[123]p|p)", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i);
    },
    s5819s_1: function (s, m) {
        return suggVerb(m[3], ":3s", suggSing);
    },
    c5824s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && isVeryAmbiguousAndWrong(m[2], m[3], ":s", ":3s", ! prevword1(s, m.index)) && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":(?:[123]p|p)", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i);
    },
    s5824s_1: function (s, m) {
        return suggVerb(m[3], ":3s", suggSing);
    },
    c5830s_1: function (s, sx, m, dDA, sCountry) {
        return ( morph(dDA, [m.start[0], m[0]], ":1s") || ( look(s.slice(0,m.index), /> +$/) && morph(dDA, [m.start[0], m[0]], ":1s", false) ) ) && ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) )/i);
    },
    s5830s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5834s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":2s", ":(?:E|G|W|M|J|[13][sp]|2p)") && ! m[0].slice(0,1)._isUpperCase() && ! look(s.slice(0,m.index), /^ *$/) && ( ! morph(dDA, [m.start[0], m[0]], ":[NAQ]", false) || look(s.slice(0,m.index), /> +$/) ) && ! look(sx.slice(0,m.index), /\bt(?:u |[’']|oi,? qui |oi seul )/i);
    },
    s5834s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5839s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":2s", ":(?:G|W|M|J|[13][sp]|2p)") && ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ( ! morph(dDA, [m.start[0], m[0]], ":[NAQ]", false) || look(s.slice(0,m.index), /> +$/) ) && ! look(sx.slice(0,m.index), /\bt(?:u |[’']|oi,? qui |oi seul )/i);
    },
    s5839s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5844s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":[12]s", ":(?:E|G|W|M|J|3[sp]|2p|1p)") && ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ( ! morph(dDA, [m.start[0], m[0]], ":[NAQ]", false) || look(s.slice(0,m.index), /> +$/) || ( (m[0].search(/^étais$/i) >= 0) && ! morph(dDA, prevword1(s, m.index), ":[DA].*:p", false, true) ) ) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))/i);
    },
    s5844s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5849s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))/i);
    },
    s5849s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5852s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))/i);
    },
    s5852s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5860s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:1p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|tu|ils?|elles?|on|[vn]ous)/);
    },
    s5860s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c5863s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":1p") && ! look(s.slice(m.end[0]), /^ +(?:je|tu|ils?|elles?|on|[vn]ous)/);
    },
    s5863s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c5866s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":1p") && ! look(s.slice(m.end[0]), /^ +(?:ils|elles)/);
    },
    s5866s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c5875s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:2p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|ils?|elles?|on|[vn]ous)/);
    },
    s5875s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c5878s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":2p") && ! look(s.slice(m.end[0]), /^ +(?:je|ils?|elles?|on|[vn]ous)/);
    },
    s5878s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c5887s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":V.*:1p", ":[EGMNAJ]") && ! (m[0].slice(0,1)._isUpperCase() && look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(s.slice(0,m.index), /\b(?:[nN]ous(?:-mêmes?|)|[eE]t moi),? /);
    },
    s5887s_1: function (s, m) {
        return suggVerb(m[0], ":3p");
    },
    c5891s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":V.*:2p", ":[EGMNAJ]") && ! (m[0].slice(0,1)._isUpperCase() && look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(s.slice(0,m.index), /\b(?:[vV]ous(?:-mêmes?|)|[eE]t toi|[tT]oi et),? /);
    },
    c5900s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3p", false, false));
    },
    s5900s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5903s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)");
    },
    s5903s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5907s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)");
    },
    s5907s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5911s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false);
    },
    s5911s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5915s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":R", false, false) && ! (morph(dDA, [m.start[1], m[1]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3p", false, false));
    },
    s5915s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c5918s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s5918s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c5933s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:à|avec|sur|chez|par|dans|parmi|contre|ni|de|pour|sous) +$/i);
    },
    c5940s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|mg)") && ! morph(dDA, prevword1(s, m.index), ":[VR]|>de ", false, false);
    },
    s5940s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5944s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false);
    },
    s5944s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5954s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|N|A|3p|P|Q)") && ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false);
    },
    s5954s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5961s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:[13]p|P|Q|Y|G|A.*:e:[pi])") && morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && ! checkAgreement(m[2], m[3]);
    },
    s5961s_1: function (s, m) {
        return suggVerb(m[3], ":3p");
    },
    c5964s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:[13]p|P|Y|G)") && morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true);
    },
    s5964s_1: function (s, m) {
        return suggVerb(m[3], ":3p");
    },
    c5984s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":(?:[13]p|P|G|Q.*:p)") && morph(dDA, nextword1(s, m.end[0]), ":(?:R|D.*:p)|>au ", false, true);
    },
    s5984s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5987s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":(?:[13]p|P|G)");
    },
    s5987s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5993s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isAmbiguousAndWrong(m[2], m[3], ":p", ":3p");
    },
    s5993s_1: function (s, m) {
        return suggVerb(m[3], ":3p", suggPlur);
    },
    c5997s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isVeryAmbiguousAndWrong(m[1], m[2], ":p", ":3p", ! prevword1(s, m.index));
    },
    s5997s_1: function (s, m) {
        return suggVerb(m[2], ":3p", suggPlur);
    },
    c6001s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isVeryAmbiguousAndWrong(m[1], m[2], ":m:p", ":3p", ! prevword1(s, m.index));
    },
    s6001s_1: function (s, m) {
        return suggVerb(m[2], ":3p", suggMasPlur);
    },
    c6005s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isVeryAmbiguousAndWrong(m[1], m[2], ":f:p", ":3p", ! prevword1(s, m.index));
    },
    s6005s_1: function (s, m) {
        return suggVerb(m[2], ":3p", suggFemPlur);
    },
    c6038s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V0e", ":3s");
    },
    s6038s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c6042s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V0e.*:3s", ":3p");
    },
    s6042s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c6048s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V0e", ":3p");
    },
    s6048s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c6052s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V0e.*:3p", ":3s");
    },
    c6063s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:et |ou |[dD][eu] |ni |[dD]e l’) *$/) && morph(dDA, [m.start[1], m[1]], ":M", false) && morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:G|3s|3p!|P|M|[AQ].*:[si])") && ! morph(dDA, prevword1(s, m.index), ":[VRD]", false, false) && ! look(s.slice(0,m.index), /([A-ZÉÈ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+), +([A-ZÉÈ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+), +$/);
    },
    s6063s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c6070s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M", false) && morph(dDA, [m.start[2], m[2]], ":M", false) && morphex(dDA, [m.start[3], m[3]], ":[123][sp]", ":(?:G|3p|P|Q.*:[pi])") && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s6070s_1: function (s, m) {
        return suggVerb(m[3], ":3p");
    },
    c6088s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[12]s|3p)", ":(?:3s|G|W|3p!)") && ! look(s.slice(m.end[0]), /^ +et (?:l(?:es? |a |’|eurs? )|[mts](?:a|on|es) |ce(?:tte|ts|) |[nv]o(?:s|tre) |du )/);
    },
    s6088s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c6093s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123]s", ":(?:3p|G|W)");
    },
    s6093s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c6098s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[12][sp]", ":(?:G|W|3[sp]|Y|P|Q)");
    },
    c6103s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[12][sp]", ":(?:G|W|3[sp])");
    },
    c6117s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V.*:1s", ":[GNW]") && ! look(s.slice(0,m.index), /\bje +>? *$/i);
    },
    s6117s_1: function (s, m) {
        return m[1].slice(0,-1)+"é-je";
    },
    c6120s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V.*:1s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:je|tu) +>? *$/i);
    },
    c6123s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:2s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:je|tu) +>? *$/i);
    },
    c6126s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:3s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:ce|il|elle|on) +>? *$/i);
    },
    s6126s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c6129s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:3s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:ce|il|elle|on) +>? *$/i);
    },
    c6132s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:1p", ":[GNW]") && ! morph(dDA, prevword1(s, m.index), ":Os", false, false) && ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    c6136s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && ! m[1].endsWith("euillez") && morphex(dDA, [m.start[1], m[1]], ":V.*:2pl", ":[GNW]") && ! morph(dDA, prevword1(s, m.index), ":Os", false, false) && ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    c6140s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:3p", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:ce|ils|elles) +>? *$/i);
    },
    s6140s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c6145s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":1[sśŝ]", false) && _oDict.isValid(m[1]) && ! (m[1].search(/^vite$/i) >= 0);
    },
    s6145s_1: function (s, m) {
        return suggVerb(m[1], ":1ś");
    },
    c6148s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":[ISK].*:2s", false) && _oDict.isValid(m[1]) && ! (m[1].search(/^vite$/i) >= 0);
    },
    s6148s_1: function (s, m) {
        return suggVerb(m[1], ":2s");
    },
    c6151s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "t" && ! morph(dDA, [m.start[1], m[1]], ":3s", false) && (! m[1].endsWith("oilà") || m[2] != "il") && _oDict.isValid(m[1]) && ! (m[1].search(/^vite$/i) >= 0);
    },
    s6151s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c6154s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":3p", ":3s") && _oDict.isValid(m[1]);
    },
    c6157s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:1p|E:2[sp])", false) && _oDict.isValid(m[1]) && ! (m[1].search(/^(?:vite|chez)$/i) >= 0);
    },
    s6157s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c6160s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":2p", false) && _oDict.isValid(m[1]) && ! (m[1].search(/^(?:tes|vite)$/i) >= 0) && ! _oDict.isValid(m[0]);
    },
    s6160s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c6163s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "t" && ! morph(dDA, [m.start[1], m[1]], ":3p", false) && _oDict.isValid(m[1]);
    },
    s6163s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c6167s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":V", false) && ! (m[1].search(/^vite$/i) >= 0) && _oDict.isValid(m[1]) && ! ( m[0].endsWith("il") && m[1].endsWith("oilà") ) && ! ( m[1] == "t" && (m[0].search(/(?:ils?|elles?|on)$/) >= 0) );
    },
    c6186s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false) && morph(dDA, [m.start[2], m[2]], ":V.......e_.*:Q", false);
    },
    c6188s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false) && morph(dDA, [m.start[2], m[2]], ":V.......e_.*:Q", false);
    },
    c6198s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && morphex(dDA, [m.start[2], m[2]], ":[SK]", ":(?:G|V0|I)") && ! prevword1(s, m.index);
    },
    c6201s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[SK]", ":(?:G|V0|I)") && ! prevword1(s, m.index);
    },
    c6207s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && morphex(dDA, [m.start[2], m[2]], ":S", ":[IG]");
    },
    s6207s_1: function (s, m) {
        return suggVerbMode(m[2], ":I", m[1]);
    },
    c6207s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && morph(dDA, [m.start[2], m[2]], ":K", false);
    },
    s6207s_2: function (s, m) {
        return suggVerbMode(m[2], ":If", m[1]);
    },
    c6218s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:afin|pour|quoi|permettre|falloir|vouloir|ordonner|exiger|désirer|douter|suffire) ", false) && morph(dDA, [m.start[2], m[2]], ":(?:Os|M)", false) && ! morph(dDA, [m.start[3], m[3]], ":[GYS]", false) && ! (morph(dDA, [m.start[1], m[1]], ">douter ", false) && morph(dDA, [m.start[3], m[3]], ":(?:If|K)", false));
    },
    s6218s_1: function (s, m) {
        return suggVerbMode(m[3], ":S", m[2]);
    },
    c6233s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && ! morph(dDA, [m.start[2], m[2]], ":[GYS]", false);
    },
    s6233s_1: function (s, m) {
        return suggVerbMode(m[2], ":S", m[1]);
    },
    c6241s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":S", ":[GIK]") && ! (m[2].search(/^e(?:usse|û[mt]es|ût)/) >= 0);
    },
    s6241s_1: function (s, m) {
        return suggVerbMode(m[2], ":I", m[1]);
    },
    c6244s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":S", ":[GIK]") && m[1] != "eusse";
    },
    s6244s_1: function (s, m) {
        return suggVerbMode(m[1], ":I", "je");
    },
    c6254s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && (morph(dDA, [m.start[2], m[2]], ":V.*:S") || morph(dDA, [m.start[2], m[2]], ":V0e.*:S", false));
    },
    s6254s_1: function (s, m) {
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
