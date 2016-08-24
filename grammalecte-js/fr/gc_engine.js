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
const cr = require("resource://grammalecte/fr/cregex.js");
const text = require("resource://grammalecte/text.js");
const echo = require("resource://grammalecte/helpers.js").echo;

const lang = "fr";
const locales = {'fr-FR': ['fr', 'FR', ''], 'fr-BE': ['fr', 'BE', ''], 'fr-CH': ['fr', 'CH', ''], 'fr-CA': ['fr', 'CA', ''], 'fr-LU': ['fr', 'LU', ''], 'fr-MC': ['fr', 'MC', '']};
const pkg = "grammalecte";
const name = "Grammalecte";
const version = "0.5.8";
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
let _oDict = null;
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
                                echo(s);
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
    let lMorph = dDA.has(aWord[0]) ? dDA.get(aWord[0]) : _dAnalyses.get(aWord[1]);
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
    let lMorph = dDA.has(aWord[0]) ? dDA.get(aWord[0]) : _dAnalyses.get(aWord[1]);
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
    //return stem(sFlex).join("|");
    return [ for (sStem of stem(sFlex)) if (conj.isVerb(sStem)) sStem ].join("|");
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
    p74p_1: function (s, m) {
        return m[1].replace(/\./g, "")+".";
    },
    c76p_1: function (s, sx, m, dDA, sCountry) {
        return m[0] != "i.e." && m[0] != "s.t.p.";
    },
    s76p_1: function (s, m) {
        return m[0].replace(/\./g, "").toUpperCase();
    },
    p76p_2: function (s, m) {
        return m[0].replace(/\./g, "");
    },
    c80p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^etc/i) >= 0);
    },
    c86p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false) && (morph(dDA, [m.start[3], m[3]], ":(?:M[12]|V)", false) || ! _oDict.isValid(m[3]));
    },
    c87p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false) && look(s.slice(m.end[0]), /^\W+[a-zéèêîïâ]/);
    },
    c139p_1: function (s, sx, m, dDA, sCountry) {
        return option("typo") && ! m[0].endsWith("·e·s");
    },
    c139p_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    d139p_2: function (s, m, dDA) {
        return define(dDA, m.start[0], [":N:A:Q:e:i"]);
    },
    c151p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^(?:etc|[A-Z]|chap|cf|fig|hab|litt|circ|coll|r[eé]f|étym|suppl|bibl|bibliogr|cit|op|vol|déc|nov|oct|janv|juil|avr|sept)$/i) >= 0) && morph(dDA, [m.start[1], m[1]], ":", false) && morph(dDA, [m.start[2], m[2]], ":", false);
    },
    s151p_1: function (s, m) {
        return m[2]._toCapitalize();
    },
    c162p_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":[DR]", false);
    },
    c192p_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1]._isDigit();
    },
    c194p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]);
    },
    s215p_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    s216p_1: function (s, m) {
        return m[1].slice(1,3) == "os"  ? "nᵒˢ"  : "nᵒ";
    },
    c224p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /etc$/i);
    },
    s225p_1: function (s, m) {
        return m[0].replace(/\.\.\./g, "…")._trimRight(".");
    },
    c241p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^(?:etc|[A-Z]|fig|hab|litt|circ|coll|ref|étym|suppl|bibl|bibliogr|cit|vol|déc|nov|oct|janv|juil|avr|sept|pp?)$/) >= 0);
    },
    s282p_1: function (s, m) {
        return m[0][0] + "|" + m[0][1];
    },
    s283p_1: function (s, m) {
        return m[0][0] + "|" + m[0][1];
    },
    s284p_1: function (s, m) {
        return m[0][0] + "|" + m[0][1];
    },
    c293p_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[3], m[3]], ";S", ":[VCR]") || mbUnit(m[3]) || ! _oDict.isValid(m[3]);
    },
    c297p_1: function (s, sx, m, dDA, sCountry) {
        return (! (m[2].search(/^[0-9][0-9]{1,3}$/) >= 0) && ! _oDict.isValid(m[3])) || morphex(dDA, [m.start[3], m[3]], ";S", ":[VCR]") || mbUnit(m[3]);
    },
    c319p_1: function (s, sx, m, dDA, sCountry) {
        return sCountry != "CA";
    },
    s319p_1: function (s, m) {
        return " "+m[0];
    },
    s365p_1: function (s, m) {
        return undoLigature(m[0]);
    },
    c411p_1: function (s, sx, m, dDA, sCountry) {
        return ! option("mapos") && morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    s411p_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c414p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    s414p_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c418p_1: function (s, sx, m, dDA, sCountry) {
        return option("mapos") && ! look(s.slice(0,m.index), /(?:lettre|caractère|glyphe|dimension|variable|fonction|point) *$/i);
    },
    s418p_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c432p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:onz[ei]|énième|iourte|ouistiti|ouate|one-?step|ouf|Ouagadougou|I(?:I|V|X|er|ᵉʳ|ʳᵉ|è?re))/i) >= 0) && ! m[2]._isUpperCase() && ! morph(dDA, [m.start[2], m[2]], ":G", false);
    },
    s432p_1: function (s, m) {
        return m[1][0]+"’";
    },
    c448p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:onz|énième|ouf|énième|ouistiti|one-?step|I(?:I|V|X|er|ᵉʳ))/i) >= 0) && morph(dDA, [m.start[2], m[2]], ":[me]");
    },
    c456p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].search(/^NF (?:C|E|P|Q|S|X|Z|EN(?: ISO|)) [0-9]+(?:‑[0-9]+|)/) >= 0);
    },
    s456p_1: function (s, m) {
        return formatNF(m[0]);
    },
    s461p_1: function (s, m) {
        return m[0].replace(/2/g, "₂").replace(/3/g, "₃").replace(/4/g, "₄");
    },
    c469p_1: function (s, sx, m, dDA, sCountry) {
        return option("num");
    },
    s469p_1: function (s, m) {
        return m[0].replace(/\./g, " ");
    },
    p469p_2: function (s, m) {
        return m[0].replace(/\./g, " ");
    },
    c473p_1: function (s, sx, m, dDA, sCountry) {
        return option("num");
    },
    s473p_1: function (s, m) {
        return m[0].replace(/ /g, " ");
    },
    p473p_2: function (s, m) {
        return m[0].replace(/ /g, " ");
    },
    c478p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /NF[  -]?(C|E|P|Q|X|Z|EN(?:[  -]ISO|)) */);
    },
    s478p_1: function (s, m) {
        return formatNumber(m[0]);
    },
    c493p_1: function (s, sx, m, dDA, sCountry) {
        return ! option("ocr");
    },
    s493p_1: function (s, m) {
        return m[0].replace(/O/g, "0");
    },
    c494p_1: function (s, sx, m, dDA, sCountry) {
        return ! option("ocr");
    },
    s494p_1: function (s, m) {
        return m[0].replace(/O/g, "0");
    },
    c513p_1: function (s, sx, m, dDA, sCountry) {
        return ! checkDate(m[1], m[2], m[3]) && ! look(s.slice(0,m.index), /\bversions? +$/i);
    },
    c516p_1: function (s, sx, m, dDA, sCountry) {
        return ! checkDateWithString(m[1], m[2], m[3]);
    },
    c519p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +av(?:ant|\.) J(?:\.-C\.|ésus-Christ)/) && ! checkDay(m[1], m[2], m[3], m[4]);
    },
    s519p_1: function (s, m) {
        return getDay(m[2], m[3], m[4]);
    },
    c524p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +av(?:ant|\.) J(?:\.-C\.|ésus-Christ)/) && ! checkDayWithString(m[1], m[2], m[3], m[4]);
    },
    s524p_1: function (s, m) {
        return getDayWithString(m[2], m[3], m[4]);
    },
    c563p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false) || m[1] == "en";
    },
    c570p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":", false);
    },
    c574p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NB]", false);
    },
    c575p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NB]", false) && ! nextword1(s, m.end[0]);
    },
    c578p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":N") && ! (m[1].search(/^(?:aequo|nihilo|cathedra|absurdo|abrupto)/i) >= 0);
    },
    c580p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c581p_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":N", ":[AGW]");
    },
    c584p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c586p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":", false);
    },
    c590p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":N");
    },
    c590p_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":N");
    },
    p590p_2: function (s, m) {
        return m[1];
    },
    p593p_1: function (s, m) {
        return m[1];
    },
    c595p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":", false) && morph(dDA, prevword1(s, m.index), ":D", false, ! Boolean((m[1].search(/^s(?:ans|ous)$/i) >= 0)));
    },
    c599p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":N", false) && morph(dDA, prevword1(s, m.index), ":(?:D|V0e)", false, true) && ! (morph(dDA, [m.start[1], m[1]], ":G", false) && morph(dDA, [m.start[2], m[2]], ":[GYB]", false));
    },
    s606p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    s607p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c618p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":Cs", false, true);
    },
    s624p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c630p_1: function (s, sx, m, dDA, sCountry) {
        return ! nextword1(s, m.end[0]);
    },
    c632p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":G");
    },
    c636p_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /\b(?:les?|du|des|un|ces?|[mts]on) +/i);
    },
    c643p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":D", false);
    },
    c645p_1: function (s, sx, m, dDA, sCountry) {
        return ! ( morph(dDA, prevword1(s, m.index), ":R", false) && look(s.slice(m.end[0]), /^ +qu[e’]/) );
    },
    s693p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c695p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /quatre $/i);
    },
    s695p_1: function (s, m) {
        return m[0].replace(/ /g, "-").replace(/vingts/g, "vingt");
    },
    s697p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    s699p_1: function (s, m) {
        return m[0].replace(/ /g, "-").replace(/vingts/g, "vingt");
    },
    s723p_1: function (s, m) {
        return m[0].replace(/-/g, " ");
    },
    c725p_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    s726p_1: function (s, m) {
        return m[0].replace(/-/g, " ");
    },
    s728p_1: function (s, m) {
        return m[0].replace(/-/g, " ");
    },
    s729p_1: function (s, m) {
        return m[0].replace(/-/g, " ");
    },
    c777p_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:G|V0)|>(?:t(?:antôt|emps|rès)|loin|souvent|parfois|quelquefois|côte|petit) ", false) && ! m[1][0]._isUpperCase();
    },
    p793p_1: function (s, m) {
        return m[0].replace(/‑/g, "");
    },
    p794p_1: function (s, m) {
        return m[0].replace(/‑/g, "");
    },
    c840s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[0], m[0]], ":", false);
    },
    c843s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false);
    },
    c844s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":A", false) && ! morph(dDA, prevword1(s, m.index), ":D", false);
    },
    c881s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:O[sp]|X)", false);
    },
    d881s_1: function (s, m, dDA) {
        return select(dDA, m.start[1], m[1], ":V");
    },
    d883s_1: function (s, m, dDA) {
        return select(dDA, m.start[1], m[1], ":V");
    },
    c885s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":[YD]", false);
    },
    d885s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    d887s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    d889s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    c891s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":Y", false);
    },
    d891s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    d893s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":[123][sp]");
    },
    c904s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":M", ":G") && ! morph(dDA, [m.start[2], m[2]], ":N", false) && ! prevword1(s, m.index);
    },
    c914s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":E", false) && morph(dDA, [m.start[3], m[3]], ":M", false);
    },
    c924s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":Y", false) && morph(dDA, [m.start[2], m[2]], ":M", false);
    },
    c933s_1: function (s, sx, m, dDA, sCountry) {
        return option("mapos");
    },
    s933s_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c940s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[GNAY]", ":(?:Q|3s)|>(?:priori|post[eé]riori|contrario|capella) ");
    },
    c954s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[0]._isDigit();
    },
    s954s_1: function (s, m) {
        return m[0].replace(/O/g, "0").replace(/I/g, "1");
    },
    s957s_1: function (s, m) {
        return m[0].replace(/a/g, "â").replace(/A/g, "Â");
    },
    s960s_1: function (s, m) {
        return m[0].replace(/n/g, "");
    },
    c972s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b([jn]’|il |on |elle )$/i);
    },
    c975s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b[jn]e +$/i);
    },
    c981s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":N.*:f:s", false);
    },
    c984s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:f:[si]");
    },
    c987s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ">(?:et|o[uù]) ");
    },
    c996s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:p", false, false);
    },
    c997s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":[VNA]", false, true);
    },
    c1001s_1: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("o");
    },
    c1001s_2: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("s") && ! morph(dDA, prevword1(s, m.index), ":D.*:[me]", false, false);
    },
    c1006s_1: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("é") && ! morph(dDA, prevword1(s, m.index), ":D.*:m:[si]", false, false);
    },
    c1006s_2: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("s") && ! morph(dDA, prevword1(s, m.index), ":D.*:m:p", false, false);
    },
    c1011s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\bau /i);
    },
    c1032s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":(?:O[on]|3s)", false);
    },
    c1036s_1: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("U");
    },
    c1036s_2: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("s");
    },
    c1041s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[0].endsWith("s");
    },
    c1041s_2: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("s");
    },
    s1046s_1: function (s, m) {
        return m[0].replace(/o/g, "e");
    },
    c1049s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/) || ! morph(dDA, [m.start[2], m[2]], ":Y", false);
    },
    s1053s_1: function (s, m) {
        return m[0].replace(/é/g, "e").replace(/É/g, "E").replace(/è/g, "e").replace(/È/g, "E");
    },
    c1060s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:V0|N.*:m:[si])", false, false);
    },
    c1069s_1: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("e") && ! morph(dDA, prevword1(s, m.index), ":D.*:[me]:[si]", false, false);
    },
    c1069s_2: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("s") && ! morph(dDA, prevword1(s, m.index), ":D.*:[me]:[pi]", false, false);
    },
    s1073s_1: function (s, m) {
        return m[0].replace(/è/g, "ê").replace(/È/g, "Ê");
    },
    s1074s_1: function (s, m) {
        return m[0].replace(/é/g, "ê").replace(/É/g, "Ê");
    },
    c1090s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:ne|il|on|elle|je) +$/i) && morph(dDA, [m.start[1], m[1]], ":[NA].*:[me]:[si]", false);
    },
    c1092s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:ne|il|on|elle) +$/i) && morph(dDA, [m.start[1], m[1]], ":[NA].*:[fe]:[si]", false);
    },
    c1094s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:ne|tu) +$/i) && morph(dDA, [m.start[1], m[1]], ":[NA].*:[pi]", false);
    },
    c1101s_1: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("") && ! morph(dDA, prevword1(s, m.index), ":D.*:m:s", false, false);
    },
    c1101s_2: function (s, sx, m, dDA, sCountry) {
        return m[0].endsWith("x") && ! morph(dDA, prevword1(s, m.index), ":D.*:m:p", false, false);
    },
    c1109s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:m:p", false, false);
    },
    c1112s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:f:s", false, false);
    },
    c1115s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:[me]:p", false, false);
    },
    c1121s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:m:s", false, false);
    },
    c1130s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":A.*:f", false) || morph(dDA, prevword1(s, m.index), ":D:*:f", false, false);
    },
    s1130s_1: function (s, m) {
        return m[1].replace(/è/g, "ê").replace(/È/g, "Ê");
    },
    s1138s_1: function (s, m) {
        return m[0].replace(/a/g, "o").replace(/A/g, "O");
    },
    c1144s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:ce|d[eu]|un|quel|leur) +/i);
    },
    c1158s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^([nv]ous|faire|en|la|lui|donnant|œuvre|h[éo]|olé|joli|Bora|couvent|dément|sapiens|très|vroum|[0-9]+)$/i) >= 0) && ! ((m[1].search(/^(?:est|une?)$/) >= 0) && look(s.slice(0,m.index), /[’']$/)) && ! (m[1] == "mieux" && look(s.slice(0,m.index), /qui +$/i));
    },
    s1172s_1: function (s, m) {
        return suggSimil(m[2], ":[NA].*:[pi]");
    },
    s1174s_1: function (s, m) {
        return suggSimil(m[2], ":[NA].*:[si]");
    },
    c1197s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^avoir$/i) >= 0) && morph(dDA, [m.start[1], m[1]], ">avoir ", false);
    },
    c1212s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|mettre) ", false);
    },
    c1243s_1: function (s, sx, m, dDA, sCountry) {
        return ! look_chk1(dDA, s.slice(m.end[0]), m.end[0], / [a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+ en ([aeo][a-zû]*)/i, ":V0a");
    },
    c1263s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">abolir ", false);
    },
    c1265s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">achever ", false);
    },
    c1266s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), / +de?\b/);
    },
    c1275s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":A|>un", false);
    },
    c1281s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">comparer ");
    },
    c1282s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">contraindre ", false);
    },
    c1293s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">joindre ");
    },
    c1319s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">suffire ");
    },
    c1320s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">talonner ");
    },
    c1327s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:prévenir|prévoir|prédire|présager|préparer|pressentir|pronostiquer|avertir|devancer|réserver) ", false);
    },
    c1332s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:ajourner|différer|reporter) ", false);
    },
    c1399s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]") && m[2][0]._isLowerCase();
    },
    s1399s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[fe]:[si]");
    },
    c1403s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":N.*:[fe]|:[AW]") && m[2][0]._isLowerCase() || m[2] == "va";
    },
    c1403s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]") && m[2][0]._isLowerCase() && hasSimil(m[2]);
    },
    s1403s_2: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[fe]:[si]");
    },
    c1409s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]") && m[2][0]._isLowerCase() && ! (m[2] == "sortir" && (m[1].search(/au/i) >= 0));
    },
    s1409s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[me]:[si]");
    },
    c1414s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]|:V0e.*:3[sp]|>devoir") && m[2][0]._isLowerCase() && hasSimil(m[2]);
    },
    s1414s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[me]:[si]");
    },
    c1418s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]") && m[2][0]._isLowerCase();
    },
    s1418s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:.:[si]");
    },
    c1422s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V.*:(?:Y|[123][sp])") && m[1][0]._isLowerCase() && ! prevword1(s, m.index);
    },
    s1422s_1: function (s, m) {
        return suggSimil(m[1], ":[NAQ]:[me]:[si]");
    },
    c1426s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]") && m[2][0]._isLowerCase() && ! (m[0].search(/^quelques? soi(?:ent|t|s)\b/i) >= 0);
    },
    s1426s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:.:[pi]");
    },
    c1430s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]") && m[2][0]._isLowerCase();
    },
    s1430s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[me]:[pi]");
    },
    c1434s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]") && m[2][0]._isLowerCase();
    },
    s1434s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[fe]:[pi]");
    },
    c1438s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[NAQ]");
    },
    s1438s_1: function (s, m) {
        return suggSimil(m[1], ":(?:[NAQ]:[fe]:[si])");
    },
    c1446s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]", ":[YG]") && m[2][0]._isLowerCase();
    },
    c1446s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false);
    },
    s1446s_2: function (s, m) {
        return suggSimil(m[2], ":Y");
    },
    c1455s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[NAQ]");
    },
    s1455s_1: function (s, m) {
        return suggSimil(m[1], ":(?:[NAQ]:.:[si])");
    },
    c1462s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Y|[123][sp])") && ! look(s.slice(0,m.index), /(?:dont|sauf|un à) +$/i);
    },
    s1462s_1: function (s, m) {
        return suggSimil(m[1], ":[NAQ]:[me]:[si]");
    },
    c1466s_1: function (s, sx, m, dDA, sCountry) {
        return m[1][0]._isLowerCase() && morph(dDA, [m.start[1], m[1]], ":V.*:[123][sp]");
    },
    s1466s_1: function (s, m) {
        return suggSimil(m[1], ":[NA]");
    },
    c1470s_1: function (s, sx, m, dDA, sCountry) {
        return m[1][0]._isLowerCase() && morphex(dDA, [m.start[1], m[1]], ":V.*:[123][sp]", ":[GNA]");
    },
    s1470s_1: function (s, m) {
        return suggSimil(m[1], ":[NAQ]");
    },
    c1474s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":", ":(?:[123][sp]|O[onw]|X)|ou ") && morphex(dDA, prevword1(s, m.index), ":", ":3s", true);
    },
    s1474s_1: function (s, m) {
        return suggSimil(m[1], ":(?:3s|Oo)");
    },
    c1478s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":", ":(?:[123][sp]|O[onw]|X)|ou ") && morphex(dDA, prevword1(s, m.index), ":", ":3p", true);
    },
    s1478s_1: function (s, m) {
        return suggSimil(m[1], ":(?:3p|Oo)");
    },
    c1482s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":", ":(?:[123][sp]|O[onw]|X)") && morphex(dDA, prevword1(s, m.index), ":", ":1s", true);
    },
    s1482s_1: function (s, m) {
        return suggSimil(m[1], ":(?:1s|Oo)");
    },
    c1486s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":", ":(?:[123][sp]|O[onw]|X)") && morphex(dDA, prevword1(s, m.index), ":", ":(?:2s|V0e)", true);
    },
    s1486s_1: function (s, m) {
        return suggSimil(m[1], ":(?:2s|Oo)");
    },
    c1499s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":P", false);
    },
    c1500s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]");
    },
    c1506s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|O[on]|X)|>(?:[lmtsn]|surtout|guère|presque) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1506s_1: function (s, m) {
        return suggSimil(m[2], ":(?:V|Oo)");
    },
    c1509s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].search(/^se que?/i) >= 0) && _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|Oo)|>[lmts] ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1509s_1: function (s, m) {
        return suggSimil(m[2], ":(?:V|Oo)");
    },
    c1513s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|Oo)", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1513s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1516s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|O[onw]|X)", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1516s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1519s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|O[onw])", false);
    },
    s1519s_1: function (s, m) {
        return suggSimil(m[2], ":[123][sp]");
    },
    c1522s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P)|>(?:en|y|ils?) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1522s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1525s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P)|>(?:en|y|ils?|elles?) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1525s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1528s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":[123][sp]|>(?:en|y) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|dire)$/i) >= 0);
    },
    s1528s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1547s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Y|[123][sp])", ":[GAQW]");
    },
    c1551s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":(?:G|N|A|Q|W|M[12])");
    },
    c1558s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1][0]._isUpperCase() && morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[GNAQM]");
    },
    c1562s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1][0]._isUpperCase() && morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[GNAQM]") && ! morph(dDA, prevword1(s, m.index), ":[NA]:[me]:si", false);
    },
    c1566s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":(?:G|N|A|Q|W|M[12]|T)");
    },
    c1570s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y)", ":[GAQW]") && ! morph(dDA, prevword1(s, m.index), ":V[123].*:[123][sp]", false, false);
    },
    c1578s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":[VN]", false, true);
    },
    c1579s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1582s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:[lmts]a|leur|une|en) +$/i);
    },
    c1584s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":(?:D|Oo|M)", false);
    },
    c1585s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">être ") && ! look(s.slice(0,m.index), /\bce que? /i);
    },
    c1604s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:côtés?|coups?|peu(?:-près|)|pics?|propos|valoir|plat-ventrismes?)/i) >= 0);
    },
    c1604s_2: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^(?:côtés?|coups?|peu(?:-pr(?:ès|êts?|és?)|)|pics?|propos|valoir|plat-ventrismes?)/i) >= 0);
    },
    c1609s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":3s", false, false);
    },
    c1612s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:3s|R)", false, false) && ! morph(dDA, nextword1(s, m.end[0]), ":Oo", false);
    },
    c1617s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":Q", ":M[12P]");
    },
    c1620s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:Y|Oo)");
    },
    c1624s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:Y|Oo)");
    },
    c1631s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\bce que?\b/i);
    },
    c1633s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":(?:M[12]|D|Oo)");
    },
    c1638s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]") && ! m[2].slice(0,1)._isUpperCase() && ! m[2].startsWith("tord");
    },
    c1641s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /[ln]’$|\b(?:il|elle|on|y|n’en) +$/i);
    },
    c1645s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /(\bque?\\b|[ln]’$|\b(?:il|elle|on|y|n’en) +$)/i);
    },
    c1648s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /(\bque?\b|[ln]’$|\b(?:il|elle|on|y|n’en) +$)/i);
    },
    c1652s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":Y", false) && ! look(s.slice(0,m.index), /\bque? |(?:il|elle|on|n’(?:en|y)) +$/i);
    },
    c1693s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1700s_1: function (s, sx, m, dDA, sCountry) {
        return ! nextword1(s, m.end[0]) || look(s.slice(m.end[0]), /^ +que? /i);
    },
    c1702s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":G", ">(?:tr(?:ès|op)|peu|bien|plus|moins|toute) |:[NAQ].*:f");
    },
    c1706s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f") && ! (m[2].search(/^seule?s?/) >= 0);
    },
    c1709s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:[oO]h|[aA]h) +$/);
    },
    c1711s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R");
    },
    c1724s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":([123][sp]|Y|P|Q)|>l[ea]? ");
    },
    c1727s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":Y")  && m[1] != "CE";
    },
    c1729s_1: function (s, sx, m, dDA, sCountry) {
        return (m[0].indexOf(",") >= 0 || morphex(dDA, [m.start[2], m[2]], ":G", ":[AYD]"));
    },
    c1732s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V[123].*:(?:Y|[123][sp])") && ! morph(dDA, [m.start[2], m[2]], ">(?:devoir|pouvoir) ") && m[2][0]._isLowerCase() && m[1] != "CE";
    },
    c1739s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1741s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V", ":[NAQ].*:[me]") || look(s.slice(0,m.index), /\b[cs]e +/i);
    },
    c1746s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":N.*:s", ":(?:A.*:[pi]|P)");
    },
    c1768s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":N.*:p", ":(?:G|W|M|A.*:[si])");
    },
    c1778s_1: function (s, sx, m, dDA, sCountry) {
        return m[1].endsWith("en") || look(s.slice(0,m.index), /^ *$/);
    },
    c1784s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && ! morph(dDA, nextword1(s, m.end[0]), ":W", false, false);
    },
    c1787s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1].startsWith("B");
    },
    c1803s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":E|>le ", false, false);
    },
    c1813s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y)", ":(?:G|N|A|M[12P])") && ! look(s.slice(0,m.index), /\bles *$/i);
    },
    c1828s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":W", false) && ! morph(dDA, prevword1(s, m.index), ":V.*:3s", false, false);
    },
    s1840s_1: function (s, m) {
        return m[1].replace(/pal/g, "pâl");
    },
    s1843s_1: function (s, m) {
        return m[1].replace(/pal/g, "pâl");
    },
    c1852s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /très +$/);
    },
    c1855s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AQ]", false);
    },
    c1878s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ">(?:arriver|venir|à|revenir|partir|aller) ");
    },
    c1883s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":P", false);
    },
    c1894s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:G|[123][sp]|W)");
    },
    s1894s_1: function (s, m) {
        return m[1].replace(/ /g, "");
    },
    c1899s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c1907s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    c1910s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":V", false) && ! ( m[1] == "sans" && morph(dDA, [m.start[2], m[2]], ":[NY]", false) );
    },
    c1919s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":A");
    },
    c1941s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /\b(aux|[ldmts]es|[nv]os) +$/);
    },
    c1942s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AQ].*:[pi]", false);
    },
    c1946s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1948s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:d[eu]|avant|après|sur|malgré) +$/i);
    },
    c1950s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:d[eu]|avant|après|sur|malgré) +$/i) && ! morph(dDA, [m.start[2], m[2]], ":(?:3s|Oo)", false);
    },
    c1953s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:d[eu]|avant|après|sur|malgré) +$/i);
    },
    c1959s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":f") && ! look(s.slice(0,m.index), /(?:à|pas|de|[nv]ous|eux) +$/i);
    },
    c1962s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":m") && ! look(s.slice(0,m.index), /(?:à|pas|de|[nv]ous|eux) +$/i);
    },
    c1966s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":N.*:[fp]", ":(?:A|W|G|M[12P]|Y|[me]:i|3s)") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s1966s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c1970s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[mp]") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s1970s_1: function (s, m) {
        return suggFemSing(m[1]);
    },
    c1974s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[fs]") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s1974s_1: function (s, m) {
        return suggMasPlur(m[1]);
    },
    c1978s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[ms]") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s1978s_1: function (s, m) {
        return suggFemPlur(m[1]);
    },
    c1992s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins)\b/));
    },
    c1996s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins)\b/));
    },
    c2000s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins)\b/));
    },
    c2004s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins)\b/));
    },
    c2019s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:Y|W|O[ow])", false) && _oDict.isValid(m[1]);
    },
    s2019s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c2049s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":A.*:s", false);
    },
    c2291s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":G");
    },
    c2298s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    c2310s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)s?$/i) >= 0);
    },
    c2317s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:une|la|cette|[mts]a|[nv]otre|de) +/);
    },
    c2347s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c2347s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c2366s_1: function (s, sx, m, dDA, sCountry) {
        return m[2]._isDigit() || morph(dDA, [m.start[2], m[2]], ":B", false);
    },
    c2371s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /\b[lL]a +$/);
    },
    d2371s_1: function (s, m, dDA) {
        return define(dDA, m.start[0], [">numéro :N:f:s"]);
    },
    c2381s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">prendre ", false);
    },
    c2385s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">rester ", false);
    },
    c2390s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:sembler|para[îi]tre) ") && morphex(dDA, [m.start[3], m[3]], ":A", ":G");
    },
    c2393s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">tenir ", false);
    },
    c2395s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">trier ", false);
    },
    c2397s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">venir ", false);
    },
    c2411s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", ":(?:G|3p)");
    },
    c2416s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", ":(?:G|3p)");
    },
    c2423s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":B", false);
    },
    c2424s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":V0", false) || ! morph(dDA, nextword1(s, m.end[0]), ":A", false);
    },
    c2425s_1: function (s, sx, m, dDA, sCountry) {
        return isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c2426s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":W", false);
    },
    c2427s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":A .*:m:s", false);
    },
    c2429s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":(?:R|C[sc])", false, true);
    },
    c2430s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":B", false) || (m[1].search(/^(?:plusieurs|maintes)/i) >= 0);
    },
    c2431s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, nextword1(s, m.end[0]), ":[NAQR]", false, true);
    },
    c2432s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":V0");
    },
    c2434s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":D", false);
    },
    c2435s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":D.*:[me]:[si]", false);
    },
    c2436s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":([AQ].*:[me]:[pi])", false, false);
    },
    c2437s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":A", false);
    },
    c2438s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:croire|devoir|estimer|imaginer|penser) ");
    },
    c2440s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:R|D|[123]s|X)", false);
    },
    c2441s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":[AQ]:[ef]:[si]", false);
    },
    c2442s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":[AQ]:[em]:[si]", false);
    },
    c2443s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c2444s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\bt(?:u|oi qui)\b/i);
    },
    c2445s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c2446s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":A", false);
    },
    c2447s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c2448s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":W", false);
    },
    c2449s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[AW]", ":G");
    },
    c2450s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[AW]", false);
    },
    c2451s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":Y", false);
    },
    c2454s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NV]", ":D");
    },
    c2455s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":(?:3s|X)", false);
    },
    c2456s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[me]", false);
    },
    c2463s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false) && (morph(dDA, [m.start[2], m[2]], ":(?:M[12]|V)", false) || ! _oDict.isValid(m[2]));
    },
    c2464s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M", false) && morph(dDA, [m.start[2], m[2]], ":M", false);
    },
    c2465s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M", false);
    },
    c2466s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:M[12]|N)") && morph(dDA, [m.start[2], m[2]], ":(?:M[12]|N)");
    },
    c2467s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":MP");
    },
    c2468s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false);
    },
    c2469s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false);
    },
    c2472s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[MT]", false) && morph(dDA, prevword1(s, m.index), ":Cs", false, true) && ! look(s.slice(0,m.index), /\b(?:plus|moins|aussi) .* que +$/);
    },
    p2472s_1: function (s, m) {
        return rewriteSubject(m[1],m[2]);
    },
    c2477s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c2479s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c2481s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:V0e|N)", false) && morph(dDA, [m.start[3], m[3]], ":[AQ]", false);
    },
    c2483s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false);
    },
    c2485s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false) && morph(dDA, [m.start[3], m[3]], ":[QY]", false);
    },
    c2487s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && ! (m[2] == "crainte" && look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/));
    },
    c2489s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c2491s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morph(dDA, [m.start[3], m[3]], ":B", false) && morph(dDA, [m.start[4], m[4]], ":(?:Q|V1.*:Y)", false);
    },
    c2495s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c2496s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V[123]");
    },
    c2497s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V[123]", false);
    },
    c2498s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c2501s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":G");
    },
    c2504s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], "[NAQ].*:[me]:[si]", false);
    },
    c2506s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[me]", ":G") && morph(dDA, [m.start[3], m[3]], ":[AQ].*:[me]", false);
    },
    c2508s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[fe]", ":G") && morph(dDA, [m.start[3], m[3]], ":[AQ].*:[fe]", false);
    },
    c2510s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", ":[123][sp]") && morph(dDA, [m.start[3], m[3]], ":[AQ].*:[pi]", false);
    },
    c2513s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AW]");
    },
    c2515s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AW]", false);
    },
    c2517s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AQ]", false);
    },
    c2519s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":W", ":3p");
    },
    c2521s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[AW]", ":[123][sp]");
    },
    c2525s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && morph(dDA, [m.start[3], m[3]], ":W", false) && morph(dDA, [m.start[4], m[4]], ":[AQ]", false);
    },
    c2527s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, true);
    },
    c2528s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":W\\b");
    },
    c2531s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c2535s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:N|A|Q|V0e)", false);
    },
    c2608s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":1s", false, false);
    },
    c2609s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":2s", false, false);
    },
    c2610s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":3s", false, false);
    },
    c2611s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":1p", false, false);
    },
    c2612s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":2p", false, false);
    },
    c2613s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":3p", false, false);
    },
    c2614s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]");
    },
    c2620s_1: function (s, sx, m, dDA, sCountry) {
        return isAmbiguousNAV(m[3]) && morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c2623s_1: function (s, sx, m, dDA, sCountry) {
        return isAmbiguousNAV(m[3]) && morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && ! (m[0].search(/^[dD](?:’une?|e la) /) >= 0);
    },
    c2626s_1: function (s, sx, m, dDA, sCountry) {
        return isAmbiguousNAV(m[3]) && ( morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":3[sp]") && ! prevword1(s, m.index)) );
    },
    c2642s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:G|V0)", false);
    },
    c2652s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    c2655s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    c2658s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f", false);
    },
    c2673s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)");
    },
    c2676s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)") || ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[me]") && morphex(dDA, [m.start[1], m[1]], ":R", ">(?:e[tn]|ou) ") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[3], m[3]], ":Y", false)) );
    },
    c2680s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|P|G|W|Y)");
    },
    c2684s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    c2687s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|G|W|V0|3s)");
    },
    c2690s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|G|W|P)");
    },
    c2693s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    c2696s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    c2699s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:s", ":[GWme]");
    },
    c2703s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:e|f|P|G|W|[1-3][sp]|Y)");
    },
    c2706s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":(?:e|f|P|G|W|[1-3][sp]|Y)") || ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[fe]") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou) ") && ! (morph(dDA, [m.start[1], m[1]], ":(?:Rv|C)", false) && morph(dDA, [m.start[3], m[3]], ":Y", false)) );
    },
    c2710s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efPGWY]");
    },
    c2714s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    c2717s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:e|f|G|W|V0|3s|P)") && ! ( m[2] == "demi" && morph(dDA, nextword1(s, m.end[0]), ":N.*:f") );
    },
    c2720s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:e|f|G|W|V0|3s)");
    },
    c2723s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGWP]");
    },
    c2726s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    c2729s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    s2729s_1: function (s, m) {
        return suggCeOrCet(m[2]);
    },
    c2733s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    s2733s_1: function (s, m) {
        return m[1].replace(/on/g, "a");
    },
    c2736s_1: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^[aâeéèêiîoôuûyœæ]/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[eGW]");
    },
    s2736s_1: function (s, m) {
        return m[1].replace(/a/g, "on");
    },
    c2736s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    s2736s_2: function (s, m) {
        return m[1].replace(/a/g, "on");
    },
    c2743s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    c2749s_1: function (s, sx, m, dDA, sCountry) {
        return ( morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false)) ) || m[1] in aREGULARPLURAL;
    },
    s2749s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2753s_1: function (s, sx, m, dDA, sCountry) {
        return ( morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") || (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[pi]|>avoir") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou) ") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[2], m[2]], ":Y", false))) ) && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false));
    },
    s2753s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2758s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ipYPGW]") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[1] in aREGULARPLURAL;
    },
    s2758s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2763s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ipGW]") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[1] in aREGULARPLURAL;
    },
    s2763s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2768s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":(?:[ipGW]|[123][sp])") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[2] in aREGULARPLURAL;
    },
    s2768s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2768s_2: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":(?:[ipGW]|[123][sp])") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[2] in aREGULARPLURAL;
    },
    c2777s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ipPGW]") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[1] in aREGULARPLURAL;
    },
    s2777s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2787s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ip]|>o(?:nde|xydation|or)\\b") && morphex(dDA, prevword1(s, m.index), ":(?:G|[123][sp])", ":[AD]", true)) || m[1] in aREGULARPLURAL;
    },
    s2787s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2793s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ip]") || m[1] in aREGULARPLURAL;
    },
    s2793s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2797s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ip]") || m[1] in aREGULARPLURAL;
    },
    s2797s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2801s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[123][sp]|:[si]");
    },
    s2801s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2805s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p");
    },
    s2805s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2808s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") || ( morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[si]") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou)") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[2], m[2]], ":Y", false)) );
    },
    s2808s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2812s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[siGW]");
    },
    s2812s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2816s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p");
    },
    c2816s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p");
    },
    s2816s_2: function (s, m) {
        return suggSing(m[2]);
    },
    c2819s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":[NAQ].*:p") || ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[si]") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou)") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[3], m[3]], ":Y", false)) );
    },
    c2819s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":[NAQ].*:p") || ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[si]") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou)") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[3], m[3]], ":Y", false)) );
    },
    s2819s_2: function (s, m) {
        return suggSing(m[3]);
    },
    c2824s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    c2824s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    s2824s_2: function (s, m) {
        return suggSing(m[2]);
    },
    c2828s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[siGW]");
    },
    s2828s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2832s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    c2836s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siG]");
    },
    c2840s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[siGW]") && ! morph(dDA, prevword(s, m.index, 2), ":B", false);
    },
    s2840s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2883s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! (m[2].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$/i) >= 0)) || m[2] in aREGULARPLURAL;
    },
    s2883s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2889s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! morph(dDA, prevword1(s, m.index), ":N", false) && ! (m[2].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$/i) >= 0)) || m[2] in aREGULARPLURAL;
    },
    s2889s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2895s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") || m[1] in aREGULARPLURAL) && ! look(s.slice(0,m.index), /\b(?:le|un|ce|du) +$/i);
    },
    s2895s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2899s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && ! (m[1].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor|Rois|Corinthiens|Thessaloniciens)$/i) >= 0);
    },
    s2899s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2903s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^0*[01]$/) >= 0) && ((morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! (m[2].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$/i) >= 0)) || m[1] in aREGULARPLURAL);
    },
    s2903s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2915s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:p", ":(?:V0e|[NAQ].*:[me]:[si])");
    },
    c2915s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:p", ":(?:V0e|[NAQ].*:[me]:[si])");
    },
    c2915s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:[si]", ":(?:V0e|[NAQ].*:[me]:[si])");
    },
    c2919s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:s", ":(?:V0e|[NAQ].*:[me]:[pi])");
    },
    c2919s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:s", ":(?:V0e|[NAQ].*:[me]:[pi])");
    },
    c2919s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:[pi]", ":(?:V0e|[NAQ].*:[me]:[pi])");
    },
    c2923s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:p", ":(?:V0e|[NAQ].*:[fe]:[si])");
    },
    c2923s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:p", ":(?:V0e|[NAQ].*:[fe]:[si])");
    },
    c2923s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:[si]", ":(?:V0e|[NAQ].*:[fe]:[si])");
    },
    c2927s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:s", ":(?:V0e|[NAQ].*:[fe]:[pi])");
    },
    c2927s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:s", ":(?:V0e|[NAQ].*:[fe]:[pi])");
    },
    c2927s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:[pi]", ":(?:V0e|[NAQ].*:[fe]:[pi])");
    },
    c2939s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/);
    },
    c2942s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/);
    },
    s2942s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c2946s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[me]");
    },
    c2950s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[fe]");
    },
    c2954s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[me]");
    },
    c2958s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[fe]");
    },
    c2974s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false);
    },
    c2977s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false) && morphex(dDA, [m.start[4], m[4]], ":[NAQ].*:m", ":[fe]");
    },
    s2977s_1: function (s, m) {
        return m[1].replace(/lle/g, "l");
    },
    c2982s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false);
    },
    c2985s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false) && morphex(dDA, [m.start[4], m[4]], ":[NAQ].*:f", ":[me]");
    },
    s2985s_1: function (s, m) {
        return m[1].replace(/l/g, "lle");
    },
    c3004s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">trouver ", false) && morphex(dDA, [m.start[3], m[3]], ":A.*:(?:f|m:p)", ":(?:G|3[sp]|M[12P])");
    },
    s3004s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c3015s_1: function (s, sx, m, dDA, sCountry) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]);
    },
    s3015s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c3015s_2: function (s, sx, m, dDA, sCountry) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s"))) && ! apposition(m[1], m[2]);
    },
    s3015s_2: function (s, m) {
        return switchPlural(m[2]);
    },
    c3023s_1: function (s, sx, m, dDA, sCountry) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s3023s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c3023s_2: function (s, sx, m, dDA, sCountry) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s3023s_2: function (s, m) {
        return switchPlural(m[2]);
    },
    c3035s_1: function (s, sx, m, dDA, sCountry) {
        return ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":[GYfe]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":[GYme]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s3035s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c3035s_2: function (s, sx, m, dDA, sCountry) {
        return ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[GYsi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[GYpi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s3035s_2: function (s, m) {
        return switchPlural(m[2]);
    },
    c3047s_1: function (s, sx, m, dDA, sCountry) {
        return ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":(?:[Gfe]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":(?:[Gme]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s3047s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c3047s_2: function (s, sx, m, dDA, sCountry) {
        return ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":(?:[Gsi]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":(?:[Gpi]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s3047s_2: function (s, m) {
        return switchPlural(m[2]);
    },
    c3065s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^air$/i) >= 0) && ! m[2].startsWith("seul") && ((morph(dDA, [m.start[1], m[1]], ":m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s3065s_1: function (s, m) {
        return switchGender(m[2], false);
    },
    c3065s_2: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^air$/i) >= 0) && ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[si]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s3065s_2: function (s, m) {
        return suggSing(m[2]);
    },
    c3074s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && ((morph(dDA, [m.start[1], m[1]], ":m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]", false, false) && ! apposition(m[1], m[2]);
    },
    s3074s_1: function (s, m) {
        return switchGender(m[2], false);
    },
    c3074s_2: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^air$/i) >= 0) && ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[si]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! morph(dDA, prevword1(s, m.index), ":[NAQ]", false, false) && ! apposition(m[1], m[2]);
    },
    s3074s_2: function (s, m) {
        return suggSing(m[2]);
    },
    c3089s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "fois" && ! m[2].startsWith("seul") && ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":[fe]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":[me]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && morph(dDA, prevword1(s, m.index), ":[VRBX]|>comme ", true, true) && ! apposition(m[1], m[2]);
    },
    s3089s_1: function (s, m) {
        return switchGender(m[2], true);
    },
    c3089s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && morph(dDA, prevword1(s, m.index), ":[VRBX]|>comme ", true, true) && ! apposition(m[1], m[2]);
    },
    s3089s_2: function (s, m) {
        return suggPlur(m[2]);
    },
    c3110s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "fois" && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! m[2].startsWith("seul") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|d’) *$/);
    },
    s3110s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c3114s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "fois" && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! m[2].startsWith("seul") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQB]", false, false);
    },
    s3114s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c3124s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]", ":(?:B|G|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f") && ! apposition(m[2], m[3]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s3124s_1: function (s, m) {
        return (m[1].search(/^(?:certains|quels)/i) >= 0) ? suggMasPlur(m[3])  : suggMasSing(m[3]);
    },
    c3130s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]", ":(?:B|G|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f") && ! apposition(m[2], m[3]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s3130s_1: function (s, m) {
        return (m[1].search(/^(?:certains|quels)/i) >= 0) ? suggMasPlur(m[3])  : suggMasSing(m[3]);
    },
    c3138s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:B|G|e|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f") && ! apposition(m[2], m[3]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s3138s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c3143s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:B|G|e|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f") && ! apposition(m[2], m[3]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s3143s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c3150s_1: function (s, sx, m, dDA, sCountry) {
        return m[2] != "fois" && ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:m") && ! apposition(m[2], m[3]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s3150s_1: function (s, m) {
        return (m[1].search(/^(?:certaines|quelles)/i) >= 0)  ? suggFemPlur(m[3])  : suggFemSing(m[3]);
    },
    c3156s_1: function (s, sx, m, dDA, sCountry) {
        return m[2] != "fois" && ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:m") && ! apposition(m[2], m[3]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s3156s_1: function (s, m) {
        return (m[1].search(/^(?:certaines|quelles)/i) >= 0)  ? suggFemPlur(m[3])  : suggFemSing(m[3]);
    },
    c3164s_1: function (s, sx, m, dDA, sCountry) {
        return m[2] != "fois" && ! m[3].startsWith("seul") && ! (m[0].search(/^quelque chose/i) >= 0) && ((morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:B|e|G|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:B|e|G|V0|m)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:m"))) && ! apposition(m[2], m[3]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s3164s_1: function (s, m) {
        return switchGender(m[3], m[1].endsWith("s"));
    },
    c3169s_1: function (s, sx, m, dDA, sCountry) {
        return m[2] != "fois" && ! m[3].startsWith("seul") && ! (m[0].search(/^quelque chose/i) >= 0) && ((morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:B|e|G|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:B|e|G|V0|m)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:m"))) && ! apposition(m[2], m[3]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s3169s_1: function (s, m) {
        return switchGender(m[3], m[1].endsWith("s"));
    },
    c3178s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s3178s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c3183s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s3183s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c3190s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWi]") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s3190s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c3195s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWi]") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s3195s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c3202s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! apposition(m[1], m[2]) && ! look_chk1(dDA, s.slice(m.end[0]), m.end[0], /^ +et +([a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+)/i, ":A");
    },
    s3202s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c3208s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! apposition(m[1], m[2]) && ! look_chk1(dDA, s.slice(m.end[0]), m.end[0], /^ +et +([a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+)/i, ":A") && ! look(s.slice(0,m.index), /\bune? de /i);
    },
    s3208s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c3243s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:s")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:p"));
    },
    s3243s_1: function (s, m) {
        return switchPlural(m[3]);
    },
    c3248s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:s");
    },
    s3248s_1: function (s, m) {
        return suggPlur(m[3]);
    },
    c3252s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:[pi]", ":G") && morph(dDA, [m.start[4], m[4]], ":[NAQ].*:s") && ! look(s.slice(0,m.index), /\bune? de /i);
    },
    s3252s_1: function (s, m) {
        return suggPlur(m[4]);
    },
    c3257s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:[si]", ":G") && morph(dDA, [m.start[4], m[4]], ":[NAQ].*:p");
    },
    s3257s_1: function (s, m) {
        return suggSing(m[4]);
    },
    c3267s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:(?:m|f:p)", ":(?:G|P|[fe]:[is]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s3267s_1: function (s, m) {
        return suggFemSing(m[2]);
    },
    c3271s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s3271s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c3275s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":[NAQ].*:f|>[aéeiou].*:e", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|m:[is]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s3275s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c3279s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":G|>[aéeiou].*:[ef]") && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") && ! apposition(m[2], m[3]);
    },
    s3279s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c3284s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":G|>[aéeiou].*:[ef]") && ! morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f|>[aéeiou].*:e", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") && ! apposition(m[2], m[3]);
    },
    s3284s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c3289s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":(?:G|P|[me]:[ip]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s3289s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c3311s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":B.*:p", false) && m[2] != "cents";
    },
    c3346s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c3347s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c3348s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c3354s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\bquatre $/i);
    },
    c3357s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":B", false) && ! look(s.slice(0,m.index), /\b(?:numéro|page|chapitre|référence|année|test|série)s? +$/i);
    },
    c3368s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":B|>une?", false, true) && ! look(s.slice(0,m.index), /\b(?:numéro|page|chapitre|référence|année|test|série)s? +$/i);
    },
    c3372s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, nextword1(s, m.end[0]), ":B|>une?", false, false);
    },
    c3375s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", ":G") && morphex(dDA, prevword1(s, m.index), ":[VR]", ":B", true);
    },
    c3380s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, nextword1(s, m.end[0]), ":B") || (morph(dDA, prevword1(s, m.index), ":B") && morph(dDA, nextword1(s, m.end[0]), ":[NAQ]", false));
    },
    c3390s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":D.*:[si]", false, true);
    },
    s3395s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    s3398s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c3413s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c3416s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false) && morph(dDA, [m.start[3], m[3]], ":(?:N|MP)");
    },
    s3457s_1: function (s, m) {
        return m[1]._trimRight("e");
    },
    c3462s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:V0e|W)|>très", false);
    },
    c3470s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:co[ûu]ter|payer) ", false);
    },
    c3487s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">donner ", false);
    },
    c3502s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:mettre|mise) ", false);
    },
    c3514s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:avoir|perdre) ", false);
    },
    c3517s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:lit|fauteuil|armoire|commode|guéridon|tabouret|chaise)s?\b/i);
    },
    c3524s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":(?:V|[NAQ].*:s)", ":(?:[NA]:.:[pi]|V0e.*:[123]p)", true);
    },
    c3582s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:aller|partir) ", false);
    },
    c3591s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":V0e.*:3p", false, false) || morph(dDA, nextword1(s, m.end[0]), ":Q", false, false);
    },
    c3611s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|devenir|para[îi]tre|rendre|sembler) ", false);
    },
    s3611s_1: function (s, m) {
        return m[2].replace(/oc/g, "o");
    },
    s3615s_1: function (s, m) {
        return m[1].replace(/oc/g, "o");
    },
    c3633s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">tenir ");
    },
    c3650s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">mettre ", false);
    },
    c3651s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c3672s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|aller) ", false);
    },
    s3674s_1: function (s, m) {
        return m[1].replace(/auspice/g, "hospice");
    },
    s3676s_1: function (s, m) {
        return m[1].replace(/auspice/g, "hospice");
    },
    c3697s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":[AQ]");
    },
    s3711s_1: function (s, m) {
        return m[1].replace(/cane/g, "canne");
    },
    c3718s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:appuyer|battre|frapper|lever|marcher) ", false);
    },
    s3718s_1: function (s, m) {
        return m[2].replace(/cane/g, "canne");
    },
    c3724s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^C(?:annes|ANNES)/) >= 0);
    },
    c3727s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^C(?:annes|ANNES)/) >= 0);
    },
    c3741s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(m.end[0]), /^ +[ldmtsc]es /) || ( morph(dDA, prevword1(s, m.index), ":Cs", false, true) && ! look(s.slice(0,m.index), /, +$/) && ! look(s.slice(m.end[0]), /^ +(?:ils?|elles?)\b/) && ! morph(dDA, nextword1(s, m.end[0]), ":Q", false, false) );
    },
    c3750s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c3758s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c3760s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":[VR]", false);
    },
    c3764s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].search(/^à cor et à cri$/i) >= 0);
    },
    c3771s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">tordre ", false);
    },
    c3773s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">rendre ", false);
    },
    c3784s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">couper ");
    },
    c3785s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:avoir|donner) ", false);
    },
    c3797s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V.[^:]:(?!Q)");
    },
    c3803s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:[lmtsc]es|des?|[nv]os|leurs|quels) +$/i);
    },
    c3814s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, nextword1(s, m.end[0]), ":[GV]", ":[NAQ]", true);
    },
    c3817s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, nextword1(s, m.end[0]), ":[GV]", ":[NAQ]");
    },
    c3820s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, nextword1(s, m.end[0]), ":[GV]", ":[NAQ]", true);
    },
    c3823s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, nextword1(s, m.end[0]), ":G", ":[NAQ]");
    },
    c3826s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    s3826s_1: function (s, m) {
        return m[2].replace(/nd/g, "nt");
    },
    c3837s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":V0e", false, false);
    },
    c3843s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ">(?:abandonner|céder|résister) ", false) && ! look(s.slice(m.end[0]), /^ d(?:e |’)/);
    },
    s3856s_1: function (s, m) {
        return m[1].replace(/nt/g, "mp");
    },
    c3871s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false) && morph(dDA, [m.start[3], m[3]], ":(?:Y|Oo)", false);
    },
    s3871s_1: function (s, m) {
        return m[2].replace(/sens/g, "cens");
    },
    s3878s_1: function (s, m) {
        return m[1].replace(/c/g, "s").replace(/C/g, "S");
    },
    s3885s_1: function (s, m) {
        return m[1].replace(/o/g, "ô");
    },
    c3900s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c3917s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:desceller|desseller) ", false);
    },
    s3917s_1: function (s, m) {
        return m[2].replace(/descell/g, "décel").replace(/dessell/g, "décel");
    },
    c3921s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:desceller|desseller) ", false);
    },
    s3921s_1: function (s, m) {
        return m[1].replace(/descell/g, "décel").replace(/dessell/g, "décel");
    },
    c3935s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false);
    },
    s3935s_1: function (s, m) {
        return m[2].replace(/î/g, "i");
    },
    c3938s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:[vn]ous|lui|leur|et toi) +$|[nm]’$/i);
    },
    s3946s_1: function (s, m) {
        return m[1].replace(/and/g, "ant");
    },
    c3952s_1: function (s, sx, m, dDA, sCountry) {
        return ! ( m[1] == "bonne" && look(s.slice(0,m.index), /\bune +$/i) && look(s.slice(m.end[0]), /^ +pour toute/i) );
    },
    c3955s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:faire|perdre|donner) ", false);
    },
    c3980s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":D");
    },
    s4057s_1: function (s, m) {
        return m[0].slice(0,-1).replace(/ /g, "-")+"à";
    },
    c4058s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":[NAQ]");
    },
    c4059s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":[123][sp]");
    },
    c4068s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[GQ]");
    },
    c4070s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[GQ]");
    },
    c4074s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[GQ]");
    },
    c4085s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":Y", ":[NA].*:[pe]") && ! look(s.slice(0,m.index), /\b[ld]es +$/i);
    },
    c4095s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">soulever ", false);
    },
    s4095s_1: function (s, m) {
        return m[1].slice(3);
    },
    c4110s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|habiter|trouver|situer|rester|demeurer?) ", false);
    },
    c4121s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c4125s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c4139s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1] == "Notre" && look(s.slice(m.end[0]), /Père/));
    },
    s4139s_1: function (s, m) {
        return m[1].replace(/otre/g, "ôtre");
    },
    c4141s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(les?|la|du|des|aux?) +/i) && morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    s4141s_1: function (s, m) {
        return m[1].replace(/ôtre/g, "otre")._trimRight("s");
    },
    c4149s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c4160s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c4163s_1: function (s, sx, m, dDA, sCountry) {
        return ( (m[2].search(/^[nmts]e$/) >= 0) || (! (m[2].search(/^(?:confiance|envie|peine|prise|crainte|affaire|hâte|force|recours|somme)$/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[AG]")) ) && ! prevword1(s, m.index);
    },
    c4168s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:[1-3][sp])", ":(?:G|1p)") && ! ( m[0].indexOf(" leur ") && morph(dDA, [m.start[2], m[2]], ":[NA].*:[si]", false) ) && ! prevword1(s, m.index);
    },
    c4174s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false) && ! look(s.slice(m.end[0]), /^ +>/) && ! morph(dDA, nextword1(s, m.end[0]), ":3s", false);
    },
    c4182s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V.[a-z_!?]+:(?!Y)");
    },
    c4183s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V0e", ":Y");
    },
    c4185s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    s4192s_1: function (s, m) {
        return m[1].replace(/pin/g, "pain");
    },
    c4194s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:manger|dévorer|avaler|engloutir) ");
    },
    s4194s_1: function (s, m) {
        return m[2].replace(/pin/g, "pain");
    },
    c4201s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">aller ", false);
    },
    c4208s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    s4208s_1: function (s, m) {
        return m[2].replace(/pal/g, "pâl");
    },
    s4211s_1: function (s, m) {
        return m[2].replace(/pal/g, "pâl");
    },
    c4217s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">prendre ", false);
    },
    c4218s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">tirer ", false);
    },
    c4219s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c4221s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">prendre ", false);
    },
    c4229s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ]");
    },
    c4230s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c4236s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":A") && ! (m[2].search(/^seule?s?$/i) >= 0);
    },
    c4240s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:N|A|Q|G|MP)");
    },
    c4254s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":(?:Y|M[12P])");
    },
    c4257s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /(?:peu|de) $/i) && morph(dDA, [m.start[2], m[2]], ":Y|>(tout|les?|la) ");
    },
    c4269s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c4275s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":Q");
    },
    c4283s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":[AQ]", false);
    },
    c4303s_1: function (s, sx, m, dDA, sCountry) {
        return ! nextword1(s, m.end[0]);
    },
    c4306s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">résonner ", false);
    },
    s4306s_1: function (s, m) {
        return m[1].replace(/réso/g, "raiso");
    },
    c4316s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M1", false);
    },
    s4329s_1: function (s, m) {
        return m[1].replace(/sale/g, "salle");
    },
    c4333s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    s4333s_1: function (s, m) {
        return m[2].replace(/salle/g, "sale");
    },
    s4347s_1: function (s, m) {
        return m[1].replace(/scep/g,"sep");
    },
    c4350s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">être ", false);
    },
    s4350s_1: function (s, m) {
        return m[2].replace(/sep/g, "scep");
    },
    c4358s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">suivre ", false);
    },
    c4366s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), / soit /);
    },
    c4367s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, nextword1(s, m.end[0]), ":[GY]", true, true) && ! look(s.slice(0,m.index), /quel(?:s|les?|) qu $|on $|il $/i) && ! look(s.slice(m.end[0]), / soit /);
    },
    c4371s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":[YQ]|>(?:avec|contre|par|pour|sur) ", false, true);
    },
    c4385s_1: function (s, sx, m, dDA, sCountry) {
        return ( morphex(dDA, [m.start[2], m[2]], ":N.*:[me]:s", ":[GW]") || ((m[2].search(/^[aeéiîou]/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":N.*:f:s", ":G")) ) && ( look(s.slice(0,m.index), /^ *$|\b(?:à|avec|chez|dès|contre|devant|derrière|en|par|pour|sans|sur) +$|, +$/i) || (morphex(dDA, prevword1(s, m.index), ":V", ":(?:G|W|[NA].*:[pi])") && ! look(s.slice(0,m.index), /\bce que?\b/i)) );
    },
    s4405s_1: function (s, m) {
        return m[1].replace(/sur/g, "sûr");
    },
    s4408s_1: function (s, m) {
        return m[1].replace(/sur/g, "sûr");
    },
    c4414s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":M1", false);
    },
    c4417s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":Y", false);
    },
    s4417s_1: function (s, m) {
        return m[1].replace(/sur/g, "sûr");
    },
    c4426s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":N", ":[GMY]|>(?:fond|envergure|ampleur|importance|départ) ") && ! look(s.slice(0,m.index), /accompl|dél[éè]gu/);
    },
    s4426s_1: function (s, m) {
        return m[1].replace(/â/g, "a");
    },
    s4430s_1: function (s, m) {
        return m[1].replace(/â/g, "a");
    },
    c4442s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ">aller ", false);
    },
    c4445s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    s4448s_1: function (s, m) {
        return m[1].replace(/taule/g, "tôle");
    },
    c4458s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false) && morph(dDA, [m.start[3], m[3]], ":Y", false);
    },
    c4466s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false);
    },
    s4476s_1: function (s, m) {
        return m[1].replace(/vénén/g, "venim");
    },
    s4478s_1: function (s, m) {
        return m[1].replace(/venim/g, "vénén");
    },
    c4493s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]:s");
    },
    c4512s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">ouvrir ", false);
    },
    c4521s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":A") && ! morph(dDA, nextword1(s, m.end[0]), ":D", false, false);
    },
    c4550s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1]._isDigit() && ! m[2]._isDigit() && ! morph(dDA, [m.start[0], m[0]], ":", false) && ! morph(dDA, [m.start[2], m[2]], ":G", false) && _oDict.isValid(m[1]+m[2]);
    },
    c4550s_2: function (s, sx, m, dDA, sCountry) {
        return m[2] != "là" && ! (m[1].search(/^(?:ex|mi|quasi|semi|non|demi|pro|anti|multi|pseudo|proto|extra)$/i) >= 0) && ! m[1]._isDigit() && ! m[2]._isDigit() && ! morph(dDA, [m.start[2], m[2]], ":G", false) && ! morph(dDA, [m.start[0], m[0]], ":", false) && ! _oDict.isValid(m[1]+m[2]);
    },
    c4563s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ,] +$/);
    },
    s4563s_1: function (s, m) {
        return m[0].toLowerCase();
    },
    c4568s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ,] +$/) && !( ( m[0]=="Juillet" && look(s.slice(0,m.index), /monarchie +de +$/i) ) || ( m[0]=="Octobre" && look(s.slice(0,m.index), /révolution +d’$/i) ) );
    },
    s4568s_1: function (s, m) {
        return m[0].toLowerCase();
    },
    c4587s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].search(/^fonctions? /i) >= 0) || ! look(s.slice(0,m.index), /\ben $/i);
    },
    c4594s_1: function (s, sx, m, dDA, sCountry) {
        return m[2]._isTitle() && morphex(dDA, [m.start[1], m[1]], ":N", ":(?:A|V0e|D|R|B)") && ! (m[0].search(/^[oO]céan Indien/i) >= 0);
    },
    s4594s_1: function (s, m) {
        return m[2].toLowerCase();
    },
    c4594s_2: function (s, sx, m, dDA, sCountry) {
        return m[2]._isLowerCase() && ! m[2].startsWith("canadienne") && ( (m[1].search(/^(?:certaine?s?|cette|ce[ts]?|[dl]es|[nv]os|quelques|plusieurs|chaque|une|aux)$/i) >= 0) || ( (m[1].search(/^un$/i) >= 0) && ! look(s.slice(m.end[0]), /(?:approximatif|correct|courant|parfait|facile|aisé|impeccable|incompréhensible)/) ) );
    },
    s4594s_2: function (s, m) {
        return m[2]._toCapitalize();
    },
    s4611s_1: function (s, m) {
        return m[1]._toCapitalize();
    },
    c4615s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:parler|cours|leçon|apprendre|étudier|traduire|enseigner|professeur|enseignant|dictionnaire|méthode) ", false);
    },
    s4615s_1: function (s, m) {
        return m[2].toLowerCase();
    },
    s4620s_1: function (s, m) {
        return m[1].toLowerCase();
    },
    c4632s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c4644s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/);
    },
    s4655s_1: function (s, m) {
        return m[1]._toCapitalize();
    },
    s4657s_1: function (s, m) {
        return m[1]._toCapitalize();
    },
    c4665s_1: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^(?:Mètre|Watt|Gramme|Seconde|Ampère|Kelvin|Mole|Cand[eé]la|Hertz|Henry|Newton|Pascal|Joule|Coulomb|Volt|Ohm|Farad|Tesla|W[eé]ber|Radian|Stéradian|Lumen|Lux|Becquerel|Gray|Sievert|Siemens|Katal)s?|(?:Exa|P[ée]ta|Téra|Giga|Méga|Kilo|Hecto|Déc[ai]|Centi|Mi(?:lli|cro)|Nano|Pico|Femto|Atto|Ze(?:pto|tta)|Yo(?:cto|etta))(?:mètre|watt|gramme|seconde|ampère|kelvin|mole|cand[eé]la|hertz|henry|newton|pascal|joule|coulomb|volt|ohm|farad|tesla|w[eé]ber|radian|stéradian|lumen|lux|becquerel|gray|sievert|siemens|katal)s?/) >= 0);
    },
    s4665s_1: function (s, m) {
        return m[2].toLowerCase();
    },
    c4692s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":Y", false);
    },
    c4694s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V1") && ! look(s.slice(0,m.index), /\b(?:quelqu(?:e chose|’une?)|(?:l(es?|a)|nous|vous|me|te|se)[ @]trait|personne|rien(?: +[a-zéèêâîûù]+|) +$)/i);
    },
    s4694s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4697s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":M[12P]");
    },
    s4697s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4699s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V1", false);
    },
    s4699s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4701s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":[123][sp]");
    },
    c4703s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":[NM]") && ! morph(dDA, prevword1(s, m.index), ">(?:tenir|passer) ", false);
    },
    s4703s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4706s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V1", false);
    },
    s4706s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4708s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":[NM]");
    },
    s4708s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4710s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":Q", false);
    },
    c4712s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Q|2p)", false);
    },
    s4712s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4714s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":Q", false) && ! morph(dDA, prevword1(s, m.index), "V0.*[12]p", false);
    },
    c4716s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:devoir|savoir|pouvoir) ", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Q|A|[13]s|2[sp])", ":[GYW]");
    },
    s4716s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c4719s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|A|[13]s|2[sp])", ":[GYWM]");
    },
    s4719s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    s4728s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c4753s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c4757s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">sembler ", false);
    },
    c4771s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4776s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V[123]_i_._") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4778s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":A", false) && morphex(dDA, [m.start[2], m[2]], ":A", ":[GM]");
    },
    c4780s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":A", false);
    },
    c4782s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GV]") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4785s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":V0") && morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:G|[123][sp]|P)");
    },
    c4796s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4800s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /[jn]’$/);
    },
    c4808s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":G") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4811s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4814s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4818s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c4821s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":N", ":[GY]") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4823s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4825s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":Y") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4859s_1: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^(?:fini|terminé)s?/i) >= 0) && morph(dDA, prevword1(s, m.index), ":C", false, true);
    },
    c4859s_2: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^(?:assez|trop)$/i) >= 0) && (look(s.slice(m.end[0]), /^ +d(?:e |’)/) || ! nextword1(s, m.end[0]));
    },
    c4859s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":A", ":[GVW]") && morph(dDA, prevword1(s, m.index), ":C", false, true);
    },
    c4871s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">aller", false) && ! look(s.slice(m.end[0]), / soit /);
    },
    c4879s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    s4879s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4881s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    s4881s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4883s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    s4883s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4886s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:faire|vouloir) ", false) && ! look(s.slice(0,m.index), /\b(?:en|[mtsld]es?|[nv]ous|un) +$/i) && morphex(dDA, [m.start[2], m[2]], ":V", ":M");
    },
    s4886s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c4889s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":M");
    },
    s4889s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c4892s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":M");
    },
    s4892s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4895s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">savoir :V", false) && morph(dDA, [m.start[2], m[2]], ":V", false) && ! look(s.slice(0,m.index), /\b(?:[mts]e|[vn]ous|les?|la|un) +$/i);
    },
    s4895s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c4898s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Q|2p)", false);
    },
    s4898s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4901s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|2p)", ":N");
    },
    s4901s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4945s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s4945s_1: function (s, m) {
        return suggSing(m[3]);
    },
    c4965s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[1], m[1]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[1].endsWith(" été")) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s4965s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c4973s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]"));
    },
    s4973s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4986s_1: function (s, sx, m, dDA, sCountry) {
        return ! (morph(dDA, [m.start[1], m[1]], ">seule ", false) && look(s.slice(m.end[0]), /^ +que? /)) && ( morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[GWYsi]") || ( morphex(dDA, [m.start[1], m[1]], ":[AQ].*:f", ":[GWYme]") && ! morph(dDA, nextword1(s, m.end[0]), ":N.*:f", false, false) ) );
    },
    s4986s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c4996s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[GWYsi]") || ( morphex(dDA, [m.start[1], m[1]], ":[AQ].*:f", ":[GWYme]") && ! morph(dDA, nextword1(s, m.end[0]), ":N.*:f", false, false) );
    },
    s4996s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c5003s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s5003s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c5013s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && ! morph(dDA, prevword1(s, m.index), ":R|>de ", false, false);
    },
    s5013s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c5026s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]"));
    },
    s5026s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c5031s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^légion$/i) >= 0) && ! look(s.slice(0,m.index), /\b(?:nous|ne) +$/i) && ((morph(dDA, [m.start[1], m[1]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) && morph(dDA, [m.start[1], m[1]], ":1p", false)) || m[1].endsWith(" été")) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWYpi]");
    },
    s5031s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c5041s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && ! look(s.slice(0,m.index), /ce que? +$/i) && (! (m[1].search(/^(?:ceux-(?:ci|là)|lesquels)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s5041s_1: function (s, m) {
        return suggMasPlur(m[3]);
    },
    c5058s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && (! (m[1].search(/^(?:elles|celles-(?:ci|là)|lesquelles)$/i) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s5058s_1: function (s, m) {
        return suggFemPlur(m[3]);
    },
    c5070s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false) && morphex(dDA, [m.start[2], m[2]], ":[123]s", ":[GNAQWY]");
    },
    s5070s_1: function (s, m) {
        return suggVerbPpas(m[2]);
    },
    c5107s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s5107s_1: function (s, m) {
        return suggSing(m[3]);
    },
    c5111s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s5111s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c5115s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]"));
    },
    s5115s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c5120s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[MWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s5120s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c5126s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s5126s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c5132s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[MWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]"));
    },
    s5132s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c5137s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^légion$/i) >= 0) && morph(dDA, [m.start[1], m[1]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && morph(dDA, [m.start[1], m[1]], ":1p", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWYpi]");
    },
    s5137s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c5142s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && (! (m[1].search(/^(?:ceux-(?:ci|là)|lesquels)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s5142s_1: function (s, m) {
        return suggMasPlur(m[3]);
    },
    c5148s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && (! (m[1].search(/^(?:elles|celles-(?:ci|là)|lesquelles)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s5148s_1: function (s, m) {
        return suggFemPlur(m[3]);
    },
    c5179s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GMWYsi]") && ! morph(dDA, [m.start[1], m[1]], ":G", false);
    },
    s5179s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c5183s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^légion$/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWYpi]") && ! morph(dDA, [m.start[1], m[1]], ":G", false);
    },
    s5183s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c5188s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && ((morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWme]") && morphex(dDA, [m.start[2], m[2]], ":m", ":[Gfe]")) || (morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWfe]") && morphex(dDA, [m.start[2], m[2]], ":f", ":[Gme]"))) && ! ( morph(dDA, [m.start[3], m[3]], ":p", false) && morph(dDA, [m.start[2], m[2]], ":s", false) ) && ! morph(dDA, prevword1(s, m.index), ":(?:R|P|Q|Y|[123][sp])", false, false) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s5188s_1: function (s, m) {
        return switchGender(m[3]);
    },
    c5195s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^légion$/i) >= 0) && ((morphex(dDA, [m.start[1], m[1]], ":M[1P].*:f", ":[GWme]") && morphex(dDA, [m.start[2], m[2]], ":m", ":[GWfe]")) || (morphex(dDA, [m.start[1], m[1]], ":M[1P].*:m", ":[GWfe]") && morphex(dDA, [m.start[2], m[2]], ":f", ":[GWme]"))) && ! morph(dDA, prevword1(s, m.index), ":(?:R|P|Q|Y|[123][sp])", false, false) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s5195s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c5204s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:p", ":(?:G|E|M1|W|s|i)");
    },
    s5204s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c5208s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[fp]", ":(?:G|E|M1|W|m:[si])");
    },
    s5208s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c5212s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[mp]", ":(?:G|E|M1|W|f:[si])|>(?:désoler|pire) ");
    },
    s5212s_1: function (s, m) {
        return suggFemSing(m[1]);
    },
    c5216s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[fs]", ":(?:G|E|M1|W|m:[pi])|>(?:désoler|pire) ");
    },
    s5216s_1: function (s, m) {
        return suggMasPlur(m[1]);
    },
    c5220s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[ms]", ":(?:G|E|M1|W|f:[pi])|>(?:désoler|pire) ");
    },
    s5220s_1: function (s, m) {
        return suggFemPlur(m[1]);
    },
    c5237s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], "V0e", false);
    },
    c5244s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]");
    },
    s5244s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c5247s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]");
    },
    s5247s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c5250s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|[NAQ].*:[pf])", ":(?:G|W|[me]:[si])|question ") && ! (m[1] == "ce" && morph(dDA, [m.start[2], m[2]], ":Y", false));
    },
    s5250s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c5253s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:[pm])", ":(?:G|W|[fe]:[si])");
    },
    s5253s_1: function (s, m) {
        return suggFemSing(m[1]);
    },
    c5256s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]");
    },
    s5256s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c5259s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^légion$/i) >= 0) && (morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]") || morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|[AQ].*:f)", ":[GWme]"));
    },
    s5259s_1: function (s, m) {
        return suggMasPlur(m[1]);
    },
    c5262s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^légion$/i) >= 0) && (morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]") || morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|[AQ].*:m)", ":[GWfe]"));
    },
    s5262s_1: function (s, m) {
        return suggFemPlur(m[1]);
    },
    c5292s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":[QWGBMpi]") && ! (m[1].search(/^(?:légion|nombre|cause)$/i) >= 0) && ! look(s.slice(0,m.index), /\bce que?\b/i);
    },
    s5292s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c5292s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:N|A|Q|W|G|3p)") && ! look(s.slice(0,m.index), /\bce que?\b/i);
    },
    s5292s_2: function (s, m) {
        return suggVerbPpas(m[1], ":m:p");
    },
    c5303s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s5303s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c5307s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s5307s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c5311s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWsi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[GWYme]")) && (! (m[1].search(/^(?:celui-(?:ci|là)|lequel)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s5311s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c5317s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWsi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[GWYfe]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s5317s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c5323s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWsi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[GWYfe]"));
    },
    s5323s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c5328s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWpi]");
    },
    s5328s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c5332s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWpi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[GWYme]")) && (! (m[1].search(/^(?:ceux-(?:ci|là)|lesquels)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s5332s_1: function (s, m) {
        return suggMasPlur(m[3]);
    },
    c5338s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWpi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[GWYfe]")) && (! (m[1].search(/^(?:elles|celles-(?:ci|là)|lesquelles)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s5338s_1: function (s, m) {
        return suggFemPlur(m[3]);
    },
    c5346s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) ", false) && morphex(dDA, [m.start[2], m[2]], ":[AQ]:(?:m:p|f)", ":(?:G|Y|[AQ]:m:[is])");
    },
    s5346s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c5349s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) ", false) && morphex(dDA, [m.start[2], m[2]], ":[AQ]:(?:f:p|m)", ":(?:G|Y|[AQ]:f:[is])");
    },
    s5349s_1: function (s, m) {
        return suggFemSing(m[2]);
    },
    c5352s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) ", false) && morphex(dDA, [m.start[2], m[2]], ":[AQ].*:s", ":(?:G|Y|[AQ].*:[ip])");
    },
    s5352s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c5355s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:trouver|considérer|croire) ", false) && morphex(dDA, [m.start[3], m[3]], ":[AQ].*:p", ":(?:G|Y|[AQ].*:[is])");
    },
    s5355s_1: function (s, m) {
        return suggSing(m[3]);
    },
    c5358s_1: function (s, sx, m, dDA, sCountry) {
        return ( morphex(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) ", ":1p") || (morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) .*:1p", false) && look(s.slice(0,m.index), /\bn(?:ous|e) +$/)) ) && morphex(dDA, [m.start[2], m[2]], ":[AQ].*:s", ":(?:G|Y|[AQ].*:[ip])");
    },
    s5358s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c5381s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false) && morph(dDA, [m.start[3], m[3]], ":Y", false);
    },
    c5383s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$/i) >= 0) && morph(dDA, prevword1(s, m.index), ">puisque? ", false, true) && morph(dDA, [m.start[2], m[2]], ":V0a", false) && ! m[3]._isUpperCase() && morphex(dDA, [m.start[3], m[3]], ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])");
    },
    s5383s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c5389s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[4].search(/^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$/i) >= 0) && morph(dDA, prevword1(s, m.index), ">puisque? ", false, true) && morph(dDA, [m.start[3], m[3]], ":V0a", false) && ! m[4]._isUpperCase() && morphex(dDA, [m.start[4], m[4]], ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])");
    },
    s5389s_1: function (s, m) {
        return suggMasSing(m[4]);
    },
    c5395s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:s", ":[GWpi]");
    },
    s5395s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c5400s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(m.end[0]), /^ *$/) && morph(dDA, [m.start[2], m[2]], ":V0a", false) && morph(dDA, [m.start[1], m[1]], ":(?:M|Os)", false) && morphex(dDA, [m.start[3], m[3]], ":V[0-3]..t_.*:Q.*:s", ":[GWpi]") && ! look(s.slice(0,m.index), /\bque +$/);
    },
    s5400s_1: function (s, m) {
        return suggPlur(m[3]);
    },
    c5405s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]");
    },
    s5405s_1: function (s, m) {
        return m[2].slice(0,-1);
    },
    c5410s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0a", false) && morphex(dDA, [m.start[3], m[3]], ":V[0-3]..t_.*:Q.*:p", ":[GWsi]") && ! look(s.slice(0,m.index), /\bque?\b/);
    },
    s5410s_1: function (s, m) {
        return m[3].slice(0,-1);
    },
    c5415s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":Q.*:(?:f|m:p)", ":m:[si]");
    },
    s5415s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c5421s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$/i) >= 0) && morphex(dDA, [m.start[1], m[1]], ":Q.*:(?:f|m:p)", ":m:[si]") && look(s.slice(0,m.index), /(?:après +$|sans +$|pour +$|que? +$|quand +$|, +$|^ *$)/i);
    },
    s5421s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c5460s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":V0a", false) && ! (((m[4].search(/^(?:décidé|essayé|tenté)$/) >= 0) && look(s.slice(m.end[0]), / +d(?:e |’)/)) || ((m[4].search(/^réussi$/) >= 0) && look(s.slice(m.end[0]), / +à/))) && morph(dDA, [m.start[2], m[2]], ":[NAQ]", false) && morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:s", ":[GWpi]") && ! morph(dDA, nextword1(s, m.end[0]), ":(?:Y|Oo|D)", false);
    },
    s5460s_1: function (s, m) {
        return suggPlur(m[4], m[2]);
    },
    c5473s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":V0a", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m", false) && (morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:f", ":[GWme]") || morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]"));
    },
    s5473s_1: function (s, m) {
        return suggMasSing(m[4]);
    },
    c5487s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":V0a", false) && ! (((m[4].search(/^(?:décidé|essayé|tenté)$/) >= 0) && look(s.slice(m.end[0]), / +d(?:e |’)/)) || ((m[4].search(/^réussi$/) >= 0) && look(s.slice(m.end[0]), / +à/))) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f", false) && (morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:m", ":[GWfe]") || morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]")) && ! morph(dDA, nextword1(s, m.end[0]), ":(?:Y|Oo)|>que?", false);
    },
    s5487s_1: function (s, m) {
        return suggFemSing(m[4]);
    },
    c5503s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && (morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:f", ":[GWme]") || morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]"));
    },
    s5503s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c5509s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^(?:A|avions)$/) >= 0) && morph(dDA, [m.start[1], m[1]], ":V0a", false) && morph(dDA, [m.start[2], m[2]], ":V.+:(?:Y|2p)", false);
    },
    s5509s_1: function (s, m) {
        return suggVerbPpas(m[2], ":m:s");
    },
    c5515s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && (morph(dDA, [m.start[3], m[3]], ":Y") || (m[3].search(/^(?:[mtsn]e|[nv]ous|leur|lui)$/) >= 0));
    },
    c5519s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && (morph(dDA, [m.start[3], m[3]], ":Y") || (m[3].search(/^(?:[mtsn]e|[nv]ous|leur|lui)$/) >= 0));
    },
    c5525s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":[NAQ].*:[me]", false);
    },
    c5527s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c5544s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Y|2p|Q.*:[fp])", ":m:[si]") && m[2] != "prise" && ! morph(dDA, prevword1(s, m.index), ">(?:les|[nv]ous|en)|:[NAQ].*:[fp]", false) && ! look(s.slice(0,m.index), /\bquel(?:le|)s?\b/i);
    },
    s5544s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c5550s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0a", false) && morphex(dDA, [m.start[3], m[3]], ":(?:Y|2p|Q.*:p)", ":[si]");
    },
    s5550s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c5555s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[123]..t.*:Q.*:s", ":[GWpi]");
    },
    s5555s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c5561s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:G|Y|P|1p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|tu|ils?|elles?|on|[vn]ous) /);
    },
    s5561s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c5567s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:G|Y|P|2p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|ils?|elles?|on|[vn]ous) /);
    },
    s5567s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c5607s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":G");
    },
    c5615s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V[13].*:Ip.*:2s", ":[GNAM]");
    },
    s5615s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c5618s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V[13].*:Ip.*:2s", ":G");
    },
    s5618s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c5623s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[MOs]");
    },
    c5630s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V[23].*:Ip.*:3s", ":[GNA]") && analyse(m[1].slice(0,-1)+"s", ":E:2s", false) && ! (m[1].search(/^doit$/i) >= 0) && ! ((m[1].search(/^vient$/i) >= 0) && look(s.slice(m.end[0]), / +l[ea]/));
    },
    s5630s_1: function (s, m) {
        return m[1].slice(0,-1)+"s";
    },
    c5634s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V[23].*:Ip.*:3s", ":G") && analyse(m[1].slice(0,-1)+"s", ":E:2s", false);
    },
    s5634s_1: function (s, m) {
        return m[1].slice(0,-1)+"s";
    },
    c5639s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V3.*:Ip.*:3s", ":[GNA]");
    },
    c5642s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V3.*:Ip.*:3s", ":G");
    },
    c5652s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":A", ":G") && ! look(s.slice(m.end[0]), /\bsoit\b/);
    },
    c5663s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":E|>chez", false) && _oDict.isValid(m[1]);
    },
    s5663s_1: function (s, m) {
        return suggVerbImpe(m[1]);
    },
    c5668s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":E|>chez", false) && _oDict.isValid(m[1]);
    },
    s5668s_1: function (s, m) {
        return suggVerbTense(m[1], ":E", ":2s");
    },
    c5693s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]");
    },
    c5698s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:Y|3[sp])", true) && morph(dDA, prevword1(s, m.index), ":Cc", false, true) && ! look(s.slice(0,m.index), /~ +$/);
    },
    c5703s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:N|A|Q|Y|B|3[sp])", true) && morph(dDA, prevword1(s, m.index), ":Cc", false, true) && ! look(s.slice(0,m.index), /~ +$/);
    },
    c5708s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:N|A|Q|Y|MP)", true) && morph(dDA, prevword1(s, m.index), ":Cc", false, true) && ! look(s.slice(0,m.index), /~ +$/);
    },
    c5727s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":(?:G|M[12])") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:Y|[123][sp])", true);
    },
    s5727s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5732s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":E", false);
    },
    s5732s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5737s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":E", false) && morphex(dDA, nextword1(s, m.end[0]), ":[RC]", ":[NAQ]", true);
    },
    s5737s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5742s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":E", false) && morphex(dDA, nextword1(s, m.end[0]), ":[RC]", ":Y", true);
    },
    s5742s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5748s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    s5748s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5750s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    s5752s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5778s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, true);
    },
    c5779s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    c5781s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    c5783s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]");
    },
    c5784s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":[123]s", false, false);
    },
    c5785s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:[123]s|R)", false, false);
    },
    c5786s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:[123]p|R)", false, false);
    },
    c5787s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":3p", false, false);
    },
    c5788s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false);
    },
    c5789s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:[NAQ].*:m:[si]|G|M)");
    },
    c5790s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:[NAQ].*:f:[si]|G|M)");
    },
    c5791s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:[NAQ].*:[si]|G|M)");
    },
    c5792s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:[NAQ].*:[si]|G|M)");
    },
    c5794s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:A|G|M|1p)");
    },
    c5795s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:A|G|M|2p)");
    },
    c5797s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    c5798s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c5799s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    c5800s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":2s", false) || look(s.slice(0,m.index), /\b(?:je|tu|on|ils?|elles?|nous) +$/i);
    },
    c5801s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":2s|>(ils?|elles?|on) ", false) || look(s.slice(0,m.index), /\b(?:je|tu|on|ils?|elles?|nous) +$/i);
    },
    c5815s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c5818s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":Y");
    },
    c5832s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:ce que?|tout) /i);
    },
    c5845s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":M") && ! (m[1].endsWith("ez") && look(s.slice(m.end[0]), / +vous/));
    },
    s5845s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c5848s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|2p)", ":M");
    },
    s5848s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c5851s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:aimer|aller|désirer|devoir|espérer|pouvoir|préférer|souhaiter|venir) ", false) && ! morph(dDA, [m.start[1], m[1]], ":[GN]", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":M");
    },
    s5851s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5855s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">devoir ", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":M") && ! morph(dDA, prevword1(s, m.index), ":D", false);
    },
    s5855s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5858s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:cesser|décider|défendre|suggérer|commander|essayer|tenter|choisir|permettre|interdire) ", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Q|2p)", ":M");
    },
    s5858s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5861s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|2p)", ":M");
    },
    s5861s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c5864s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">valoir ", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Q|2p)", ":[GM]");
    },
    s5864s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5867s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":[NM]") && ! m[1]._isTitle() && ! look(s.slice(0,m.index), /> +$/);
    },
    s5867s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c5870s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V1", ":N");
    },
    s5870s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5883s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false) && (morphex(dDA, [m.start[2], m[2]], ":Y", ":[NAQ]") || m[2] in aSHOULDBEVERB) && ! (m[1].search(/^(?:soit|été)$/i) >= 0) && ! morph(dDA, prevword1(s, m.index), ":Y|>ce", false, false) && ! look(s.slice(0,m.index), /ce (?:>|qu|que >) $/i) && ! look_chk1(dDA, s.slice(0,m.index), 0, /([a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+) +> $/i, ":Y") && ! look_chk1(dDA, s.slice(0,m.index), 0, /^ *>? *([a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+)/i, ":Y");
    },
    s5883s_1: function (s, m) {
        return suggVerbPpas(m[2]);
    },
    c5894s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":1s|>(?:en|y)", false);
    },
    s5894s_1: function (s, m) {
        return suggVerb(m[1], ":1s");
    },
    c5897s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:1s", false, false));
    },
    s5897s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c5900s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G|1p)");
    },
    s5900s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c5903s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G|1p)");
    },
    s5903s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c5906s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G|1p|3p!)");
    },
    s5906s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c5926s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|[ISK].*:2s)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:2s", false, false));
    },
    s5926s_1: function (s, m) {
        return suggVerb(m[2], ":2s");
    },
    c5929s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|[ISK].*:2s)");
    },
    s5929s_1: function (s, m) {
        return suggVerb(m[2], ":2s");
    },
    c5932s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|2p|3p!|[ISK].*:2s)");
    },
    s5932s_1: function (s, m) {
        return suggVerb(m[2], ":2s");
    },
    c5943s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3s", false, false));
    },
    s5943s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5946s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)");
    },
    s5946s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5961s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:N|A|3s|P|Q|G|V0e.*:3p)");
    },
    s5961s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5965s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|Q|G)");
    },
    s5965s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5973s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|Q|G|3p!)") && ! morph(dDA, prevword1(s, m.index), ":[VR]|>de", false, false) && !(m[1].endsWith("out") && (morph(dDA, [m.start[2], m[2]], ":(?:Y|N.*:m:[si])", false) || morph(dDA, prevword1(s, m.index), ":D", false, false)));
    },
    s5973s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5993s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3s|P|G|3p!)") && ! morph(dDA, prevword1(s, m.index), ":R|>(?:et|ou)", false, false) && ! (morph(dDA, [m.start[1], m[1]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3s", false, false));
    },
    s5993s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c5997s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3s|P|G|3p!)") && ! morph(dDA, prevword1(s, m.index), ":R|>(?:et|ou)", false, false);
    },
    s5997s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c6014s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":3p", ":(?:G|3s)");
    },
    c6017s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":3s", ":(?:G|3p)");
    },
    c6020s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":3p", ":(?:G|3s)") && (! prevword1(s, m.index) || look(s.slice(0,m.index), /\b(?:parce que?|quoi ?que?|pour ?quoi|puisque?|quand|com(?:ment|bien)|car|tandis que?) +$/i));
    },
    c6024s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":3s", ":(?:G|3p)") && (! prevword1(s, m.index) || look(s.slice(0,m.index), /\b(?:parce que?|quoi ?que?|pour ?quoi|puisque?|quand|com(?:ment|bien)|car|tandis que?) +$/i));
    },
    s6032s_1: function (s, m) {
        return m[1].slice(0,-1)+"t";
    },
    c6035s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P|Q|[123][sp]|R)", true) && !( m[1].endsWith("ien") && look(s.slice(0,m.index), /> +$/) && morph(dDA, [m.start[2], m[2]], ":Y", false) );
    },
    s6035s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c6053s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G|Q)") && morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P|Q|[123][sp]|R)", true);
    },
    s6053s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c6057s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P|Q|[123][sp]|R)", true);
    },
    s6057s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c6065s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":Y", false) && morph(dDA, [m.start[2], m[2]], ":V.[a-z_!?]+(?!.*:(?:3s|P|Q|Y|3p!))");
    },
    s6065s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c6073s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:3s|P|Q|Y|3p!|G)") && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":[1-3]p", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i) && ! checkAgreement(m[2], m[3]);
    },
    s6073s_1: function (s, m) {
        return suggVerb(m[3], ":3s");
    },
    c6077s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:3s|1p|P|Q|Y|3p!|G)") && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":[123]p", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i);
    },
    s6077s_1: function (s, m) {
        return suggVerb(m[3], ":3s");
    },
    c6100s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && isAmbiguousAndWrong(m[2], m[3], ":s", ":3s") && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":(?:[123]p|p)", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i);
    },
    s6100s_1: function (s, m) {
        return suggVerb(m[3], ":3s", suggSing);
    },
    c6105s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && isVeryAmbiguousAndWrong(m[2], m[3], ":s", ":3s", ! prevword1(s, m.index)) && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":(?:[123]p|p)", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i);
    },
    s6105s_1: function (s, m) {
        return suggVerb(m[3], ":3s", suggSing);
    },
    c6111s_1: function (s, sx, m, dDA, sCountry) {
        return ( morph(dDA, [m.start[0], m[0]], ":1s") || ( look(s.slice(0,m.index), /> +$/) && morph(dDA, [m.start[0], m[0]], ":1s", false) ) ) && ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) )/i);
    },
    s6111s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c6115s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":2s", ":(?:E|G|W|M|J|[13][sp]|2p)") && ! m[0].slice(0,1)._isUpperCase() && ! look(s.slice(0,m.index), /^ *$/) && ( ! morph(dDA, [m.start[0], m[0]], ":[NAQ]", false) || look(s.slice(0,m.index), /> +$/) ) && ! look(sx.slice(0,m.index), /\bt(?:u |[’']|oi,? qui |oi seul )/i);
    },
    s6115s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c6120s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":2s", ":(?:G|W|M|J|[13][sp]|2p)") && ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ( ! morph(dDA, [m.start[0], m[0]], ":[NAQ]", false) || look(s.slice(0,m.index), /> +$/) ) && ! look(sx.slice(0,m.index), /\bt(?:u |[’']|oi,? qui |oi seul )/i);
    },
    s6120s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c6125s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":[12]s", ":(?:E|G|W|M|J|3[sp]|2p|1p)") && ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ( ! morph(dDA, [m.start[0], m[0]], ":[NAQ]", false) || look(s.slice(0,m.index), /> +$/) || ( (m[0].search(/^étais$/i) >= 0) && ! morph(dDA, prevword1(s, m.index), ":[DA].*:p", false, true) ) ) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))/i);
    },
    s6125s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c6130s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))/i);
    },
    s6130s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c6133s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))/i);
    },
    s6133s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c6141s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:1p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|tu|ils?|elles?|on|[vn]ous)/);
    },
    s6141s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c6144s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":1p") && ! look(s.slice(m.end[0]), /^ +(?:je|tu|ils?|elles?|on|[vn]ous)/);
    },
    s6144s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c6147s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":1p") && ! look(s.slice(m.end[0]), /^ +(?:ils|elles)/);
    },
    s6147s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c6156s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:2p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|ils?|elles?|on|[vn]ous)/);
    },
    s6156s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c6159s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":2p") && ! look(s.slice(m.end[0]), /^ +(?:je|ils?|elles?|on|[vn]ous)/);
    },
    s6159s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c6168s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":V.*:1p", ":[EGMNAJ]") && ! (m[0].slice(0,1)._isUpperCase() && look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(sx.slice(0,m.index), /\b(?:[nN]ous(?:-mêmes?|)|[eE]t moi),? /);
    },
    s6168s_1: function (s, m) {
        return suggVerb(m[0], ":3p");
    },
    c6172s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":V.*:2p", ":[EGMNAJ]") && ! (m[0].slice(0,1)._isUpperCase() && look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(sx.slice(0,m.index), /\b(?:[vV]ous(?:-mêmes?|)|[eE]t toi|[tT]oi et),? /);
    },
    c6182s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3p", false, false));
    },
    s6182s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c6185s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)");
    },
    s6185s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c6189s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)");
    },
    s6189s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c6193s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false);
    },
    s6193s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c6197s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":R", false, false) && ! (morph(dDA, [m.start[1], m[1]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3p", false, false));
    },
    s6197s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c6200s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s6200s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c6215s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:à|avec|sur|chez|par|dans|parmi|contre|ni|de|pour|sous) +$/i);
    },
    c6222s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|mg)") && ! morph(dDA, prevword1(s, m.index), ":[VR]|>de ", false, false);
    },
    s6222s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c6226s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false);
    },
    s6226s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c6236s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|N|A|3p|P|Q)") && ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false);
    },
    s6236s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c6243s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:[13]p|P|Q|Y|G|A.*:e:[pi])") && morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && ! checkAgreement(m[2], m[3]);
    },
    s6243s_1: function (s, m) {
        return suggVerb(m[3], ":3p");
    },
    c6246s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:[13]p|P|Y|G)") && morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true);
    },
    s6246s_1: function (s, m) {
        return suggVerb(m[3], ":3p");
    },
    c6267s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":(?:[13]p|P|G|Q.*:p)") && morph(dDA, nextword1(s, m.end[0]), ":(?:R|D.*:p)|>au ", false, true);
    },
    s6267s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c6270s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":(?:[13]p|P|G)");
    },
    s6270s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c6276s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isAmbiguousAndWrong(m[2], m[3], ":p", ":3p");
    },
    s6276s_1: function (s, m) {
        return suggVerb(m[3], ":3p", suggPlur);
    },
    c6280s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isVeryAmbiguousAndWrong(m[1], m[2], ":p", ":3p", ! prevword1(s, m.index));
    },
    s6280s_1: function (s, m) {
        return suggVerb(m[2], ":3p", suggPlur);
    },
    c6284s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isVeryAmbiguousAndWrong(m[1], m[2], ":m:p", ":3p", ! prevword1(s, m.index));
    },
    s6284s_1: function (s, m) {
        return suggVerb(m[2], ":3p", suggMasPlur);
    },
    c6288s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isVeryAmbiguousAndWrong(m[1], m[2], ":f:p", ":3p", ! prevword1(s, m.index));
    },
    s6288s_1: function (s, m) {
        return suggVerb(m[2], ":3p", suggFemPlur);
    },
    c6321s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V0e", ":3s");
    },
    s6321s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c6325s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V0e.*:3s", ":3p");
    },
    s6325s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c6331s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V0e", ":3p");
    },
    s6331s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c6335s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V0e.*:3p", ":3s");
    },
    c6346s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:et |ou |[dD][eu] |ni |[dD]e l’) *$/) && morph(dDA, [m.start[1], m[1]], ":M", false) && morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:G|3s|3p!|P|M|[AQ].*:[si])") && ! morph(dDA, prevword1(s, m.index), ":[VRD]", false, false) && ! look(s.slice(0,m.index), /([A-ZÉÈ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+), +([A-ZÉÈ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+), +$/);
    },
    s6346s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c6353s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M", false) && morph(dDA, [m.start[2], m[2]], ":M", false) && morphex(dDA, [m.start[3], m[3]], ":[123][sp]", ":(?:G|3p|P|Q.*:[pi])") && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s6353s_1: function (s, m) {
        return suggVerb(m[3], ":3p");
    },
    c6371s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[12]s|3p)", ":(?:3s|G|W|3p!)") && ! look(s.slice(m.end[0]), /^ +et (?:l(?:es? |a |’|eurs? )|[mts](?:a|on|es) |ce(?:tte|ts|) |[nv]o(?:s|tre) |du )/);
    },
    s6371s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c6376s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123]s", ":(?:3p|G|W)");
    },
    s6376s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c6381s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[12][sp]", ":(?:G|W|3[sp]|Y|P|Q)");
    },
    c6386s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[12][sp]", ":(?:G|W|3[sp])");
    },
    c6400s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V.*:1s", ":[GNW]") && ! look(s.slice(0,m.index), /\bje +>? *$/i);
    },
    s6400s_1: function (s, m) {
        return m[1].slice(0,-1)+"é-je";
    },
    c6403s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V.*:1s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:je|tu) +>? *$/i);
    },
    c6406s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:2s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:je|tu) +>? *$/i);
    },
    c6409s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:3s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:ce|il|elle|on) +>? *$/i);
    },
    s6409s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c6412s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:3s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:ce|il|elle|on) +>? *$/i);
    },
    c6415s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:1p", ":[GNW]") && ! morph(dDA, prevword1(s, m.index), ":Os", false, false) && ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    c6419s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && ! m[1].endsWith("euillez") && morphex(dDA, [m.start[1], m[1]], ":V.*:2pl", ":[GNW]") && ! morph(dDA, prevword1(s, m.index), ":Os", false, false) && ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    c6423s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:3p", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:ce|ils|elles) +>? *$/i);
    },
    s6423s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c6428s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":1[sśŝ]", false) && _oDict.isValid(m[1]) && ! (m[1].search(/^vite$/i) >= 0);
    },
    s6428s_1: function (s, m) {
        return suggVerb(m[1], ":1ś");
    },
    c6431s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":[ISK].*:2s", false) && _oDict.isValid(m[1]) && ! (m[1].search(/^vite$/i) >= 0);
    },
    s6431s_1: function (s, m) {
        return suggVerb(m[1], ":2s");
    },
    c6434s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "t" && ! morph(dDA, [m.start[1], m[1]], ":3s", false) && (! m[1].endsWith("oilà") || m[2] != "il") && _oDict.isValid(m[1]) && ! (m[1].search(/^vite$/i) >= 0);
    },
    s6434s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c6437s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":3p", ":3s") && _oDict.isValid(m[1]);
    },
    c6440s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:1p|E:2[sp])", false) && _oDict.isValid(m[1]) && ! (m[1].search(/^(?:vite|chez)$/i) >= 0);
    },
    s6440s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c6443s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":2p", false) && _oDict.isValid(m[1]) && ! (m[1].search(/^(?:tes|vite)$/i) >= 0) && ! _oDict.isValid(m[0]);
    },
    s6443s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c6446s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "t" && ! morph(dDA, [m.start[1], m[1]], ":3p", false) && _oDict.isValid(m[1]);
    },
    s6446s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c6450s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":V", false) && ! (m[1].search(/^vite$/i) >= 0) && _oDict.isValid(m[1]) && ! ( m[0].endsWith("il") && m[1].endsWith("oilà") ) && ! ( m[1] == "t" && (m[0].search(/(?:ils?|elles?|on)$/) >= 0) );
    },
    c6469s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false) && morph(dDA, [m.start[2], m[2]], ":V.......e_.*:Q", false);
    },
    c6471s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false) && morph(dDA, [m.start[2], m[2]], ":V.......e_.*:Q", false);
    },
    c6483s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && morphex(dDA, [m.start[2], m[2]], ":[SK]", ":(?:G|V0|I)") && ! prevword1(s, m.index);
    },
    c6486s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[SK]", ":(?:G|V0|I)") && ! prevword1(s, m.index);
    },
    c6492s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && morphex(dDA, [m.start[2], m[2]], ":S", ":[IG]");
    },
    s6492s_1: function (s, m) {
        return suggVerbMode(m[2], ":I", m[1]);
    },
    c6492s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && morph(dDA, [m.start[2], m[2]], ":K", false);
    },
    s6492s_2: function (s, m) {
        return suggVerbMode(m[2], ":If", m[1]);
    },
    c6503s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:afin|pour|quoi|permettre|falloir|vouloir|ordonner|exiger|désirer|douter|préférer|suffire) ", false) && morph(dDA, [m.start[2], m[2]], ":(?:Os|M)", false) && ! morph(dDA, [m.start[3], m[3]], ":[GYS]", false) && ! (morph(dDA, [m.start[1], m[1]], ">douter ", false) && morph(dDA, [m.start[3], m[3]], ":(?:If|K)", false));
    },
    s6503s_1: function (s, m) {
        return suggVerbMode(m[3], ":S", m[2]);
    },
    c6518s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && ! morph(dDA, [m.start[2], m[2]], ":[GYS]", false);
    },
    s6518s_1: function (s, m) {
        return suggVerbMode(m[2], ":S", m[1]);
    },
    c6526s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":S", ":[GIK]") && ! (m[2].search(/^e(?:usse|û[mt]es|ût)/) >= 0);
    },
    s6526s_1: function (s, m) {
        return suggVerbMode(m[2], ":I", m[1]);
    },
    c6529s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":S", ":[GIK]") && m[1] != "eusse";
    },
    s6529s_1: function (s, m) {
        return suggVerbMode(m[1], ":I", "je");
    },
    c6539s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && (morph(dDA, [m.start[2], m[2]], ":V.*:S") || morph(dDA, [m.start[2], m[2]], ":V0e.*:S", false));
    },
    s6539s_1: function (s, m) {
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
