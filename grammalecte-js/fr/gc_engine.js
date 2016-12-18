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
    return (this.search(/^[A-ZÀ-ÖØ-ßŒ0-9-]+$/) !== -1);
}
String.prototype._isTitle = function () {
    return (this.search(/^[A-ZÀ-ÖØ-ßŒ][a-zà-öø-ÿ'’-]+$/) !== -1);
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
                    iPos = m[0].search("[ ~’,()«»“”]"+m[i]+"[ ,’~()«»“”]") + 1 + m.index
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
const locales = {'fr-CH': ['fr', 'CH', ''], 'fr-MC': ['fr', 'MC', ''], 'fr-BE': ['fr', 'BE', ''], 'fr-CA': ['fr', 'CA', ''], 'fr-BJ': ['fr', 'BJ', ''], 'fr-TG': ['fr', 'TG', ''], 'fr-CI': ['fr', 'CI', ''], 'fr-ML': ['fr', 'ML', ''], 'fr-LU': ['fr', 'LU', ''], 'fr-SN': ['fr', 'SN', ''], 'fr-BF': ['fr', 'BF', ''], 'fr-FR': ['fr', 'FR', ''], 'fr-NE': ['fr', 'NE', '']};
const pkg = "grammalecte";
const name = "Grammalecte";
const version = "0.5.14";
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

    // parse paragraph
    try {
        [sNew, aErrors] = _proofread(sText, sAlt, 0, true, dDA, sCountry, bDebug);
        if (sNew) {
            sText = sNew;
        }
    }
    catch (e) {
        helpers.logerror(e);
    }

    // cleanup
    if (sText.includes(" ")) {
        sText = sText.replace(/ /g, ' '); // nbsp
    }
    if (sText.includes(" ")) {
        sText = sText.replace(/ /g, ' '); // snbsp
    }
    if (sText.includes("'")) {
        sText = sText.replace(/'/g, "’");
    }
    if (sText.includes("‑")) {
        sText = sText.replace(/‑/g, "-"); // nobreakdash
    }

    // parse sentence
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
    let bIdRule = option('idrule');
    let m;
    let bCondMemo;

    for (let [sOption, lRuleGroup] of _getRules(bParagraph)) {
        if (!sOption || option(sOption)) {
            for (let [zRegex, bUppercase, sLineId, sRuleId, lActions, lGroups, lNegLookBefore] of lRuleGroup) {
                if (!_aIgnoredRules.has(sRuleId)) {
                    while ((m = zRegex._exec2(s, lGroups, lNegLookBefore)) !== null) {
                        bCondMemo = null;
                        /*if (bDebug) {
                            echo(">>>> Rule # " + sLineId + " - Text: " + s + " opt: "+ sOption);
                        }*/
                        for (let [sFuncCond, cActionType, sWhat, ...eAct] of lActions) {
                        // action in lActions: [ condition, action type, replacement/suggestion/action[, iGroup[, message, URL]] ]
                            try {
                                //echo(oEvalFunc[sFuncCond]);
                                bCondMemo = (!sFuncCond || oEvalFunc[sFuncCond](s, sx, m, dDA, sCountry, bCondMemo))
                                if (bCondMemo) {
                                    switch (cActionType) {
                                        case "-":
                                            // grammar error
                                            //echo("-> error detected in " + sLineId + "\nzRegex: " + zRegex.source);
                                            aErrs.push(_createError(s, sWhat, nOffset, m, eAct[0], sLineId, sRuleId, bUppercase, eAct[1], eAct[2], bIdRule, sOption));
                                            break;
                                        case "~":
                                            // text processor
                                            //echo("-> text processor by " + sLineId + "\nzRegex: " + zRegex.source);
                                            s = _rewrite(s, sWhat, eAct[0], m, bUppercase);
                                            bChange = true;
                                            if (bDebug) {
                                                echo("~ " + s + "  -- " + m[eAct[0]] + "  # " + sLineId);
                                            }
                                            break;
                                        case "=":
                                            // disambiguation
                                            //echo("-> disambiguation by " + sLineId + "\nzRegex: " + zRegex.source);
                                            oEvalFunc[sWhat](s, m, dDA);
                                            if (bDebug) {
                                                echo("= " + m[0] + "  # " + sLineId + "\nDA: " + dDA._toString());
                                            }
                                            break;
                                        case ">":
                                            // we do nothing, this test is just a condition to apply all following actions
                                            break;
                                        default:
                                            echo("# error: unknown action at " + sLineId);
                                    }
                                } else {
                                    if (cActionType == ">") {
                                        break;
                                    }
                                }
                            }
                            catch (e) {
                                echo(s);
                                echo("# id-rule:" + sLineId);
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

function _createError (s, sRepl, nOffset, m, iGroup, sLineId, sRuleId, bUppercase, sMsg, sURL, bIdRule, sOption) {
    let oErr = {};
    oErr["nStart"] = nOffset + m.start[iGroup];
    oErr["nEnd"] = nOffset + m.end[iGroup];
    oErr["sLineId"] = sLineId;
    oErr["sRuleId"] = sRuleId;
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
        sMessage += "  #" + sLineId + " #" + sRuleId;
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
        sNew = oEvalFunc[sRepl.slice(1)](s, m);
        sNew = sNew + " ".repeat(ln-sNew.length);
        if (bUppercase && m[iGroup].slice(0,1)._isUpperCase()) {
            sNew = sNew._toCapitalize();
        }
    } else {
        sNew = sRepl._expand(m);
        sNew = sNew + " ".repeat(ln-sNew.length);
    }
    //echo("\n"+s+"\nstart: "+m.start[iGroup]+" end:"+m.end[iGroup])
    return s.slice(0, m.start[iGroup]) + sNew + s.slice(m.end[iGroup]);
}

function ignoreRule (sRuleId) {
    _aIgnoredRules.add(sRuleId);
}

function resetIgnoreRules () {
    _aIgnoredRules.clear();
}

function reactivateRule (sRuleId) {
    _aIgnoredRules.delete(sRuleId);
}

function listRules (sFilter=null) {
    // generator: returns tuple (sOption, sLineId, sRuleId)
    try {
        for ([sOption, lRuleGroup] of _getRules(true)) {
            for ([_, _, sLineId, sRuleId, _] of lRuleGroup) {
                if (!sFilter || sRuleId.test(sFilter)) {
                    yield [sOption, sLineId, sRuleId];
                }
            }
        }
        for ([sOption, lRuleGroup] of _getRules(false)) {
            for ([_, _, sLineId, sRuleId, _] of lRuleGroup) {
                if (!sFilter || sRuleId.test(sFilter)) {
                    yield [sOption, sLineId, sRuleId];
                }
            }
        }
    }
    catch (e) {
        helpers.logerror(e);
    }
}


//////// init

function load () {
    try {
        _oDict = new ibdawg.IBDAWG("French.json");
    }
    catch (e) {
        helpers.logerror(e);
    }
}

function setOption (sOpt, bVal) {
    if (_dOptions.has(sOpt)) {
        _dOptions.set(sOpt, bVal);
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
    let z = new RegExp("^( +[a-zà-öA-Zø-ÿÀ-Ö0-9Ø-ßĀ-ʯﬁ-ﬆ%_-]+){" + (n-1).toString() + "} +([a-zà-öA-Zø-ÿÀ-Ö0-9Ø-ßĀ-ʯﬁ-ﬆ%_-]+)", "i");
    let m = z.exec(s.slice(iStart));
    if (!m) {
        return null;
    }
    return [iStart + RegExp.lastIndex - m[2].length, m[2]];
}

function prevword (s, iEnd, n) {
    // get the (-)nth word of the input string or empty string
    let z = new RegExp("([a-zà-öA-Zø-ÿÀ-Ö0-9Ø-ßĀ-ʯﬁ-ﬆ%_-]+) +([a-zà-öA-Zø-ÿÀ-Ö0-9Ø-ßĀ-ʯﬁ-ﬆ%_-]+ +){" + (n-1).toString() + "}$", "i");
    let m = z.exec(s.slice(0, iEnd));
    if (!m) {
        return null;
    }
    return [m.index, m[1]];
}

const _zNextWord = new RegExp ("^ +([a-zà-öA-Zø-ÿÀ-Ö0-9Ø-ßĀ-ʯﬁ-ﬆ_][a-zà-öA-Zø-ÿÀ-Ö0-9Ø-ßĀ-ʯﬁ-ﬆ_-]*)", "i");
const _zPrevWord = new RegExp ("([a-zà-öA-Zø-ÿÀ-Ö0-9Ø-ßĀ-ʯﬁ-ﬆ_][a-zà-öA-Zø-ÿÀ-Ö0-9Ø-ßĀ-ʯﬁ-ﬆ_-]*) +$", "i");

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
const _zEndOfNG2 = new RegExp ("^ +([a-zà-öA-Zø-ÿÀ-Ö0-9_Ø-ßĀ-ʯ][a-zà-öA-Zø-ÿÀ-Ö0-9_Ø-ßĀ-ʯ-]+)");
const _zEndOfNG3 = new RegExp ("^ *, +([a-zà-öA-Zø-ÿÀ-Ö0-9_Ø-ßĀ-ʯ][a-zà-öA-Zø-ÿÀ-Ö0-9_Ø-ßĀ-ʯ-]+)");

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


const _zNextIsNotCOD1 = new RegExp ("^ *,");
const _zNextIsNotCOD2 = new RegExp ("^ +(?:[mtsnj](e +|’)|[nv]ous |tu |ils? |elles? )");
const _zNextIsNotCOD3 = new RegExp ("^ +([a-zéèî][a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯ-]+)");

function isNextNotCOD (dDA, s, iOffset) {
    if (_zNextIsNotCOD1.test(s) || _zNextIsNotCOD2.test(s)) {
        return true;
    }
    let m = _zNextIsNotCOD3._exec2(s, ["$"]);
    if (m && morphex(dDA, [iOffset+m.start[1], m[1]], ":[123][sp]", ":[DM]")) {
        return true;
    }
    return false;
}


const _zNextIsVerb1 = new RegExp ("^ +[nmts](?:e |’) ");
const _zNextIsVerb2 = new RegExp ("^ +([a-zà-öA-Zø-ÿÀ-Ö0-9_Ø-ßĀ-ʯ][a-zà-öA-Zø-ÿÀ-Ö0-9_Ø-ßĀ-ʯ-]+)");

function isNextVerb (dDA, s, iOffset) {
    if (_zNextIsVerb1.test(s)) {
        return true;
    }
    let m = _zNextIsVerb2._exec2(s, ["$"]);
    if (m && morph(dDA, [iOffset+m.start[1], m[1]], ":[123][sp]", false)) {
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
        if (conj.hasConj(sStem, sTense, sWho)) {
            aSugg.add(conj.getConj(sStem, sTense, sWho));
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

function suggMasSing (sFlex, bSuggSimil=false) {
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
            if (conj.hasConj(sVerb, ":PQ", ":Q1") && conj.hasConj(sVerb, ":PQ", ":Q3")) {
                // We also check if the verb has a feminine form.
                // If not, we consider it’s better to not suggest the masculine one, as it can be considered invariable.
                aSugg.add(conj.getConj(sVerb, ":PQ", ":Q1"));
            }
        }
    }
    if (bSuggSimil) {
        for (let e of phonet.selectSimil(sFlex, ":m:[si]")) {
            aSugg.add(e);
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggMasPlur (sFlex, bSuggSimil=false) {
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
                let sSugg = conj.getConj(sVerb, ":PQ", ":Q1");
                // it is necessary to filter these flexions, like “succédé” or “agi” that are not masculine plural
                if (sSugg.endsWith("s")) {
                    aSugg.add(sSugg);
                }
            }
        }
    }
    if (bSuggSimil) {
        for (let e of phonet.selectSimil(sFlex, ":m:[pi]")) {
            aSugg.add(e);
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}


function suggFemSing (sFlex, bSuggSimil=false) {
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
    if (bSuggSimil) {
        for (let e of phonet.selectSimil(sFlex, ":f:[si]")) {
            aSugg.add(e);
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggFemPlur (sFlex, bSuggSimil=false) {
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
    if (bSuggSimil) {
        for (let e of phonet.selectSimil(sFlex, ":f:[pi]")) {
            aSugg.add(e);
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function hasFemForm (sFlex) {
    for (let sStem of stem(sFlex)) {
        if (mfsp.isFemForm(sStem) || conj.hasConj(sStem, ":PQ", ":Q3")) {
            return true;
        }
    }
    if (phonet.hasSimil(sFlex, ":f")) {
        return true;
    }
    return false;
}

function hasMasForm (sFlex) {
    for (let sStem of stem(sFlex)) {
        if (mfsp.isFemForm(sStem) || conj.hasConj(sStem, ":PQ", ":Q1")) {
            // what has a feminine form also has a masculine form
            return true;
        }
    }
    if (phonet.hasSimil(sFlex, ":m")) {
        return true;
    }
    return false;
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

function hasSimil (sWord, sPattern=null) {
    return phonet.hasSimil(sWord, sPattern);
}

function suggSimil (sWord, sPattern) {
    // return list of words phonetically similar to sWord and whom POS is matching sPattern
    let aSugg = phonet.selectSimil(sWord, sPattern);
    for (let sMorph of _dAnalyses._get(sWord, [])) {
        for (let e of conj.getSimil(sWord, sMorph)) {
            aSugg.add(e); 
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
const oEvalFunc = {
    c330p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\w$/);
    },
    c330p_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(m.end[0]), /^\w/);
    },
    c334p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\w$/);
    },
    c334p_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(m.end[0]), /^\w/);
    },
    p358p_1: function (s, m) {
        return m[1]._toCapitalize();
    },
    p371p_1: function (s, m) {
        return m[1].replace(/\./g, "")+".";
    },
    c372p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[0].search(/^(?:i\.e\.|s\.[tv]\.p\.|e\.g\.|a\.k\.a\.|c\.q\.f\.d\.|b\.a\.)$/i) >= 0);
    },
    s372p_1: function (s, m) {
        return m[0].replace(/\./g, "").toUpperCase();
    },
    c372p_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[0] != "b.a.";
    },
    p372p_2: function (s, m) {
        return m[0].replace(/\./g, "_");
    },
    p376p_1: function (s, m) {
        return m[0].replace(/\./g, "").replace(/-/g,"");
    },
    c378p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[1].search(/^etc/i) >= 0);
    },
    c384p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false) && (morph(dDA, [m.start[3], m[3]], ":(?:M[12]|V)", false) || ! _oDict.isValid(m[3]));
    },
    c385p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false) && look(s.slice(m.end[0]), /^\W+[a-zéèêîïâ]/);
    },
    c446p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return option("typo") && ! m[0].endsWith("·e·s");
    },
    c446p_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":G");
    },
    d446p_2: function (s, m, dDA) {
        return define(dDA, m.start[0], [":N:A:Q:e:i"]);
    },
    c461p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return option("typo") && ! m[0].endsWith("·e");
    },
    c461p_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    d461p_2: function (s, m, dDA) {
        return define(dDA, m.start[0], [":N:A:Q:e:s"]);
    },
    c472p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[1].search(/^(?:etc|[A-Z]|chap|cf|fig|hab|litt|circ|coll|r[eé]f|étym|suppl|bibl|bibliogr|cit|op|vol|déc|nov|oct|janv|juil|avr|sept)$/i) >= 0) && morph(dDA, [m.start[1], m[1]], ":", false) && morph(dDA, [m.start[2], m[2]], ":", false);
    },
    s472p_1: function (s, m) {
        return m[2]._toCapitalize();
    },
    c484p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[1], m[1]], ":[DR]", false);
    },
    c519p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[1]._isDigit();
    },
    c521p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return _oDict.isValid(m[1]);
    },
    s543p_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    s544p_1: function (s, m) {
        return (m[1].slice(1,3) == "os" ) ? "nᵒˢ"  : "nᵒ";
    },
    c552p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /etc$/i);
    },
    s553p_1: function (s, m) {
        return m[0].replace(/\.\.\./g, "…")._trimRight(".");
    },
    c569p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[1].search(/^(?:etc|[A-Z]|fig|hab|litt|circ|coll|ref|étym|suppl|bibl|bibliogr|cit|vol|déc|nov|oct|janv|juil|avr|sept|pp?)$/) >= 0);
    },
    s593p_1: function (s, m) {
        return ",|" + m[1];
    },
    s594p_1: function (s, m) {
        return ";|" + m[1];
    },
    s595p_1: function (s, m) {
        return ":|" + m[0][1];
    },
    c609p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[3], m[3]], ";S", ":[VCR]") || mbUnit(m[3]) || ! _oDict.isValid(m[3]);
    },
    c614p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (! (m[2].search(/^[0-9][0-9]{1,3}$/) >= 0) && ! _oDict.isValid(m[3])) || morphex(dDA, [m.start[3], m[3]], ";S", ":[VCR]") || mbUnit(m[3]);
    },
    c638p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return sCountry != "CA";
    },
    s638p_1: function (s, m) {
        return " "+m[0];
    },
    c673p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /[a-zA-Zéïîùàâäôö]$/);
    },
    s695p_1: function (s, m) {
        return undoLigature(m[0]);
    },
    s733p_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c735p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! option("mapos") && morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    s735p_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c739p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return option("mapos") && ! look(s.slice(0,m.index), /(?:lettre|caractère|glyphe|dimension|variable|fonction|point) *$/i);
    },
    s739p_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c756p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[2].search(/^(?:onz[ei]|énième|iourte|ouistiti|ouate|one-?step|ouf|Ouagadougou|I(?:I|V|X|er|ᵉʳ|ʳᵉ|è?re))/i) >= 0) && ! m[2]._isUpperCase() && ! morph(dDA, [m.start[2], m[2]], ":G", false);
    },
    s756p_1: function (s, m) {
        return m[1][0]+"’";
    },
    c774p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[2].search(/^(?:onz|énième|ouf|énième|ouistiti|one-?step|I(?:I|V|X|er|ᵉʳ))/i) >= 0) && morph(dDA, [m.start[2], m[2]], ":[me]");
    },
    c783p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[0].search(/^NF (?:C|E|P|Q|S|X|Z|EN(?: ISO|)) [0-9]+(?:‑[0-9]+|)/) >= 0);
    },
    s783p_1: function (s, m) {
        return formatNF(m[0]);
    },
    s792p_1: function (s, m) {
        return m[0].replace(/2/g, "₂").replace(/3/g, "₃").replace(/4/g, "₄");
    },
    c803p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /NF[  -]?(C|E|P|Q|X|Z|EN(?:[  -]ISO|)) */);
    },
    s803p_1: function (s, m) {
        return formatNumber(m[0]);
    },
    c818p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return option("num");
    },
    s818p_1: function (s, m) {
        return m[0].replace(/\./g, " ");
    },
    p818p_2: function (s, m) {
        return m[0].replace(/\./g, "");
    },
    c826p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return option("num");
    },
    s826p_1: function (s, m) {
        return m[0].replace(/ /g, " ");
    },
    p826p_2: function (s, m) {
        return m[0].replace(/ /g, "");
    },
    c838p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! checkDate(m[1], m[2], m[3]) && ! look(s.slice(0,m.index), /\bversions? +$/i);
    },
    p838p_2: function (s, m) {
        return m[0].replace(/\./g, "-").replace(/ /g, "-").replace(/\//g, "-");
    },
    c854p_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:G|V0)|>(?:t(?:antôt|emps|rès)|loin|souvent|parfois|quelquefois|côte|petit|même) ", false) && ! m[1][0]._isUpperCase();
    },
    c854p_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo;
    },
    p872p_1: function (s, m) {
        return m[0].replace(/‑/g, "");
    },
    p873p_1: function (s, m) {
        return m[0].replace(/‑/g, "");
    },
    c935s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[1].search(/^([nv]ous|faire|en|la|lui|donnant|œuvre|h[éoa]|hou|olé|joli|Bora|couvent|dément|sapiens|très|vroum|[0-9]+)$/i) >= 0) && ! ((m[1].search(/^(?:est|une?)$/) >= 0) && look(s.slice(0,m.index), /[’']$/)) && ! (m[1] == "mieux" && look(s.slice(0,m.index), /qui +$/i));
    },
    c951s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! option("ocr");
    },
    s951s_1: function (s, m) {
        return m[0].replace(/O/g, "0");
    },
    c952s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! option("ocr");
    },
    s952s_1: function (s, m) {
        return m[0].replace(/O/g, "0");
    },
    c973s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! checkDateWithString(m[1], m[2], m[3]);
    },
    c980s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(m.end[0]), /^ +av(?:ant|) +J(?:C|ésus-Christ)/) && ! checkDay(m[1], m[2], m[3], m[4]);
    },
    s980s_1: function (s, m) {
        return getDay(m[2], m[3], m[4]);
    },
    c988s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(m.end[0]), /^ +av(?:ant|) +J(?:C|ésus-Christ)/) && ! checkDayWithString(m[1], m[2], m[3], m[4]);
    },
    s988s_1: function (s, m) {
        return getDayWithString(m[2], m[3], m[4]);
    },
    c1036s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[0], m[0]], ":", false);
    },
    c1039s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false);
    },
    c1040s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":A", false) && ! morph(dDA, prevword1(s, m.index), ":D", false);
    },
    c1072s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return _oDict.isValid(m[0].replace(/ /g, "_"));
    },
    p1072s_1: function (s, m) {
        return m[0].replace(/ /g, "_");
    },
    c1084s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:O[sp]|X)", false);
    },
    d1084s_1: function (s, m, dDA) {
        return select(dDA, m.start[1], m[1], ":V");
    },
    d1086s_1: function (s, m, dDA) {
        return select(dDA, m.start[1], m[1], ":V");
    },
    c1088s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[1], m[1]], ":[YD]", false);
    },
    d1088s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    d1090s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    d1092s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    c1094s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[1], m[1]], ":Y", false);
    },
    d1094s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    d1096s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    d1098s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":[123][sp]");
    },
    c1100s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:p|>[a-z]+ièmes ", false, false);
    },
    d1100s_1: function (s, m, dDA) {
        return select(dDA, m.start[0], m[0], ":P");
    },
    c1168s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":", false);
    },
    c1176s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[NB]", false);
    },
    c1178s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[NB]", false) && ! nextword1(s, m.end[0]);
    },
    c1187s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":N") && ! (m[1].search(/^(?:aequo|nihilo|cathedra|absurdo|abrupto)/i) >= 0);
    },
    c1195s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c1201s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":N", ":[AGW]");
    },
    c1210s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":G");
    },
    c1216s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":", false);
    },
    c1227s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":N");
    },
    c1227s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":N");
    },
    c1236s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":", false) && morph(dDA, prevword1(s, m.index), ":D", false, ! Boolean((m[1].search(/^s(?:ans|ous)$/i) >= 0)));
    },
    c1244s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":N", false) && morph(dDA, prevword1(s, m.index), ":(?:D|V0e)", false, true) && ! (morph(dDA, [m.start[1], m[1]], ":G", false) && morph(dDA, [m.start[2], m[2]], ":[GYB]", false));
    },
    s1255s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    s1256s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    s1262s_1: function (s, m) {
        return m[0].replace(/ /g, "-").replace(/si/g, "ci");
    },
    c1266s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, prevword1(s, m.index), ":Cs", false, true);
    },
    s1273s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c1279s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! nextword1(s, m.end[0]);
    },
    c1281s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, prevword1(s, m.index), ":G");
    },
    c1286s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return look(s.slice(0,m.index), /\b(?:les?|du|des|un|ces?|[mts]on) +/i);
    },
    c1293s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":D", false);
    },
    c1295s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! ( morph(dDA, prevword1(s, m.index), ":R", false) && look(s.slice(m.end[0]), /^ +qu[e’]/) );
    },
    c1358s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(m.end[0]), /^ +s(?:i |’)/);
    },
    s1427s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c1430s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /quatre $/i);
    },
    s1430s_1: function (s, m) {
        return m[0].replace(/ /g, "-").replace(/vingts/g, "vingt");
    },
    s1433s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    s1436s_1: function (s, m) {
        return m[0].replace(/ /g, "-").replace(/vingts/g, "vingt");
    },
    s1465s_1: function (s, m) {
        return m[0].replace(/-/g, " ");
    },
    c1467s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    s1468s_1: function (s, m) {
        return m[0].replace(/-/g, " ");
    },
    s1469s_1: function (s, m) {
        return m[0].replace(/-/g, " ");
    },
    s1470s_1: function (s, m) {
        return m[0].replace(/-/g, " ");
    },
    c1483s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":V0|>en ", false);
    },
    c1493s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":M", ":G") && ! morph(dDA, [m.start[2], m[2]], ":N", false) && ! prevword1(s, m.index);
    },
    c1505s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":E", false) && morph(dDA, [m.start[3], m[3]], ":M", false);
    },
    c1516s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":Y", false) && morph(dDA, [m.start[2], m[2]], ":M", false) && ! morph(dDA, prevword1(s, m.index), ">à ", false, false);
    },
    c1527s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return option("mapos");
    },
    s1527s_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c1536s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[GNAY]", ":(?:Q|3s)|>(?:priori|post[eé]riori|contrario|capella|fortiori) ");
    },
    c1554s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[0] == "II";
    },
    c1554s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! bCondMemo && ! m[0]._isDigit();
    },
    s1554s_2: function (s, m) {
        return m[0].replace(/O/g, "0").replace(/I/g, "1");
    },
    s1563s_1: function (s, m) {
        return m[0].replace(/a/g, "â").replace(/A/g, "Â");
    },
    s1569s_1: function (s, m) {
        return m[0].replace(/n/g, "");
    },
    c1598s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b([jnlmts]’|il |on |elle )$/i);
    },
    c1604s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b[jn]e +$/i);
    },
    c1622s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":N.*:f:s", false);
    },
    c1628s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:f:[si]");
    },
    c1634s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, nextword1(s, m.end[0]), ">(?:et|o[uù]) ");
    },
    c1645s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[0].search(/^contre$/i) >= 0);
    },
    c1651s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:p", false, false);
    },
    c1652s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:p", false, false);
    },
    c1661s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[0].endsWith("é") && ! morph(dDA, prevword1(s, m.index), ":D.*:m:[si]", false, false);
    },
    c1661s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[0].endsWith("s") && ! morph(dDA, prevword1(s, m.index), ":D.*:m:p", false, false);
    },
    c1670s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[0].endsWith("o");
    },
    c1670s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! bCondMemo && ! morph(dDA, prevword1(s, m.index), ":D.*:[me]", false, false);
    },
    c1678s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\bau /i);
    },
    c1690s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[0].endsWith("e") && ( morph(dDA, prevword1(s, m.index), ":R", false, true) || isNextVerb(dDA, s.slice(m.end[0]), m.end[0]) );
    },
    c1690s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[0].endsWith("s") && ( morph(dDA, prevword1(s, m.index), ":R", false, true) || isNextVerb(dDA, s.slice(m.end[0]), m.end[0]) );
    },
    c1704s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /[0-9] +$/);
    },
    c1710s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[0].endsWith("l");
    },
    c1710s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! bCondMemo;
    },
    c1735s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":(?:O[on]|3s)", false);
    },
    c1742s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[0].endsWith("s");
    },
    c1742s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! bCondMemo;
    },
    c1750s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[0].endsWith("s");
    },
    c1750s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! bCondMemo;
    },
    s1758s_1: function (s, m) {
        return m[0].replace(/o/g, "e");
    },
    c1764s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ]/) || ! morph(dDA, [m.start[2], m[2]], ":Y", false);
    },
    c1774s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[0]._isTitle() && _oDict.isValid("v"+m[1]) && look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ]/);
    },
    c1774s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[0]._isTitle() && _oDict.isValid(m[1]) && look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ]/);
    },
    s1783s_1: function (s, m) {
        return m[0].replace(/é/g, "e").replace(/É/g, "E").replace(/è/g, "e").replace(/È/g, "E");
    },
    c1796s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:V0|N.*:m:[si])", false, false);
    },
    c1809s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D:[me]:p", false, false);
    },
    c1816s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[0].endsWith("e") && ! morph(dDA, prevword1(s, m.index), ":D.*:[me]:[si]", false, false);
    },
    c1816s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[0].endsWith("s") && ! morph(dDA, prevword1(s, m.index), ":D.*:[me]:[pi]", false, false);
    },
    s1819s_1: function (s, m) {
        return m[0].replace(/è/g, "ê").replace(/È/g, "Ê");
    },
    s1820s_1: function (s, m) {
        return m[0].replace(/é/g, "ê").replace(/É/g, "Ê");
    },
    c1854s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:ne|il|on|elle|je) +$/i) && morph(dDA, [m.start[2], m[2]], ":[NA].*:[me]:[si]", false);
    },
    c1856s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:ne|il|on|elle) +$/i) && morph(dDA, [m.start[2], m[2]], ":[NA].*:[fe]:[si]", false);
    },
    c1858s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:ne|tu) +$/i) && morph(dDA, [m.start[2], m[2]], ":[NA].*:[pi]", false);
    },
    c1873s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[0].endsWith("") && ! morph(dDA, prevword1(s, m.index), ":D.*:m:s", false, false);
    },
    c1873s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[0].endsWith("x") && ! morph(dDA, prevword1(s, m.index), ":D.*:m:p", false, false);
    },
    c1887s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:m:p", false, false);
    },
    c1893s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:f:s", false, false);
    },
    c1899s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:[me]:p", false, false);
    },
    c1911s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:m:s", false, false);
    },
    c1917s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[0].endsWith("s");
    },
    c1917s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! bCondMemo;
    },
    c1931s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:ce|[mts]on|du|un|le) $/i);
    },
    c1943s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:je|il|elle|on|ne) $/i);
    },
    s1943s_1: function (s, m) {
        return m[0].replace(/è/g, "ê").replace(/È/g, "Ê");
    },
    s1957s_1: function (s, m) {
        return m[0].replace(/a/g, "o").replace(/A/g, "O");
    },
    s1963s_1: function (s, m) {
        return m[0].replace(/n/g, "").replace(/N/g, "U");
    },
    c1969s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:ce|d[eu]|un|quel|leur|le) +/i);
    },
    c1993s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D:[me]" ,false, false);
    },
    s2002s_1: function (s, m) {
        return suggSimil(m[2], ":[NA].*:[pi]");
    },
    s2005s_1: function (s, m) {
        return suggSimil(m[2], ":[NA].*:[si]");
    },
    s2008s_1: function (s, m) {
        return suggSimil(m[2], ":[NA].*:[pi]");
    },
    c2036s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[1].search(/^avoir$/i) >= 0) && morph(dDA, [m.start[1], m[1]], ">avoir ", false);
    },
    c2053s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|mettre) ", false);
    },
    c2102s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look_chk1(dDA, s.slice(m.end[0]), m.end[0], / [a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ-]+ en ([aeo][a-zû]*)/i, ":V0a");
    },
    c2123s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">abolir ", false);
    },
    c2124s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">acculer ", false);
    },
    c2125s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">achever ", false);
    },
    c2126s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(m.end[0]), / +de?\b/);
    },
    c2132s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">avancer ", false);
    },
    c2135s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, prevword1(s, m.index), ":A|>un", false);
    },
    c2139s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">collaborer ", false);
    },
    c2141s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">comparer ", false);
    },
    c2142s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">contraindre ", false);
    },
    c2146s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">enchevêtrer ", false);
    },
    c2147s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">entraider ", false);
    },
    c2153s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">joindre ");
    },
    c2160s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">monter ", false);
    },
    c2171s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">rénov(?:er|ation) ", false);
    },
    c2173s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">réunir ", false);
    },
    c2174s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">recul(?:er|) ", false);
    },
    c2178s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">suffire ", false);
    },
    c2179s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">talonner ", false);
    },
    c2252s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:prévenir|prévoir|prédire|présager|préparer|pressentir|pronostiquer|avertir|devancer|deviner|réserver) ", false);
    },
    c2262s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:ajourner|différer|reporter) ", false);
    },
    c2288s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]") && m[2][0]._isLowerCase();
    },
    s2288s_1: function (s, m) {
        return suggSimil(m[2], ":[NA]:[fe]:[si]");
    },
    c2296s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":N.*:[fe]|:[AW]") && m[2][0]._isLowerCase() || m[2] == "va";
    },
    c2296s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]") && m[2][0]._isLowerCase() && hasSimil(m[2]);
    },
    s2296s_2: function (s, m) {
        return suggSimil(m[2], ":[NA]:[fe]:[si]");
    },
    c2307s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]") && m[2][0]._isLowerCase() && ! (m[2] == "sortir" && (m[1].search(/au/i) >= 0));
    },
    s2307s_1: function (s, m) {
        return suggSimil(m[2], ":[NA]:[me]:[si]");
    },
    c2315s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]|:V0e.*:3[sp]|>devoir") && m[2][0]._isLowerCase() && hasSimil(m[2]);
    },
    s2315s_1: function (s, m) {
        return suggSimil(m[2], ":[NA]:[me]:[si]");
    },
    c2323s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]") && m[2][0]._isLowerCase();
    },
    s2323s_1: function (s, m) {
        return suggSimil(m[2], ":[NA]:.:[si]");
    },
    c2331s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V.*:(?:Y|[123][sp])") && m[1][0]._isLowerCase() && ! prevword1(s, m.index);
    },
    s2331s_1: function (s, m) {
        return suggSimil(m[1], ":[NA]:[me]:[si]");
    },
    c2339s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]") && m[2][0]._isLowerCase() && ! (m[0].search(/^quelques? soi(?:ent|t|s)\b/i) >= 0);
    },
    s2339s_1: function (s, m) {
        return suggSimil(m[2], ":[NA]:.:[pi]");
    },
    c2347s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]") && m[2][0]._isLowerCase();
    },
    s2347s_1: function (s, m) {
        return suggSimil(m[2], ":[NA]:[me]:[pi]");
    },
    c2355s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]") && m[2][0]._isLowerCase();
    },
    s2355s_1: function (s, m) {
        return suggSimil(m[2], ":[NA]:[fe]:[pi]");
    },
    c2363s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[NAQ]");
    },
    s2363s_1: function (s, m) {
        return suggSimil(m[1], ":(?:[NA]:[fe]:[si])");
    },
    c2374s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]", ":[YG]") && m[2][0]._isLowerCase();
    },
    c2374s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false);
    },
    s2374s_2: function (s, m) {
        return suggSimil(m[2], ":Y");
    },
    c2382s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[NAQ]");
    },
    s2382s_1: function (s, m) {
        return suggSimil(m[1], ":(?:[NA]:.:[si])");
    },
    c2389s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Y|[123][sp])") && ! look(s.slice(0,m.index), /(?:dont|sauf|un à) +$/i);
    },
    s2389s_1: function (s, m) {
        return suggSimil(m[1], ":[NAQ]:[me]:[si]");
    },
    c2397s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1][0]._isLowerCase() && morph(dDA, [m.start[1], m[1]], ":V.*:[123][sp]");
    },
    s2397s_1: function (s, m) {
        return suggSimil(m[1], ":[NA]");
    },
    c2404s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1][0]._isLowerCase() && morphex(dDA, [m.start[1], m[1]], ":V.*:[123][sp]", ":[GNA]") && ! look(s.slice(0,m.index), /\b(?:plus|moins) +$/i);
    },
    s2404s_1: function (s, m) {
        return suggSimil(m[1], ":[NA]");
    },
    c2414s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":", ":(?:[123][sp]|O[onw]|X)|ou ") && morphex(dDA, prevword1(s, m.index), ":", ":3s", true);
    },
    s2414s_1: function (s, m) {
        return suggSimil(m[1], ":(?:3s|Oo)");
    },
    c2422s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":", ":(?:[123][sp]|O[onw]|X)|ou ") && morphex(dDA, prevword1(s, m.index), ":", ":3p", true);
    },
    s2422s_1: function (s, m) {
        return suggSimil(m[1], ":(?:3p|Oo)");
    },
    c2431s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":", ":(?:[123][sp]|O[onw]|X)") && morphex(dDA, prevword1(s, m.index), ":", ":1s", true);
    },
    s2431s_1: function (s, m) {
        return suggSimil(m[1], ":(?:1s|Oo)");
    },
    c2439s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":", ":(?:[123][sp]|O[onw]|X)") && morphex(dDA, prevword1(s, m.index), ":", ":(?:2s|V0e)", true);
    },
    s2439s_1: function (s, m) {
        return suggSimil(m[1], ":(?:2s|Oo)");
    },
    c2454s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":", ":P");
    },
    c2455s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]");
    },
    c2465s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|O[onw])", false);
    },
    s2465s_1: function (s, m) {
        return suggSimil(m[2], ":[123][sp]");
    },
    c2469s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|O[onw]|X)|>(?:[lmtsn]|surtout|guère|presque|même) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s2469s_1: function (s, m) {
        return suggSimil(m[2], ":(?:[123][sp]|Oo|Y)");
    },
    c2473s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|O[onw]|X)", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s2473s_1: function (s, m) {
        return suggSimil(m[2], ":(?:[123][sp]|Y)");
    },
    c2477s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[0].search(/^se que?/i) >= 0) && _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|Oo)|>[lmts] ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s2477s_1: function (s, m) {
        return suggSimil(m[2], ":(?:[123][sp]|Oo|Y)");
    },
    c2482s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|Oo)", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s2482s_1: function (s, m) {
        return suggSimil(m[2], ":(?:[123][sp]|Y)");
    },
    c2486s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P)|>(?:en|y|ils?) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s2486s_1: function (s, m) {
        return suggSimil(m[2], ":(?:[123][sp]|Y)");
    },
    c2490s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P)|>(?:en|y|ils?|elles?) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s2490s_1: function (s, m) {
        return suggSimil(m[2], ":(?:[123][sp]|Y)");
    },
    c2494s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":[123][sp]|>(?:en|y|que?) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|dire)$/i) >= 0);
    },
    s2494s_1: function (s, m) {
        return suggSimil(m[2], ":3s");
    },
    c2523s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Y|[123][sp])", ":[AQW]");
    },
    s2523s_1: function (s, m) {
        return suggSimil(m[1], ":[AW]");
    },
    c2530s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[GNAQWM]") && ! look(s.slice(0,m.index), /\bce que? /i);
    },
    c2541s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[1][0]._isUpperCase() && morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[GNAQM]");
    },
    c2548s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[1][0]._isUpperCase() && morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[GNAQM]") && ! morph(dDA, prevword1(s, m.index), ":[NA]:[me]:si", false);
    },
    c2556s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[GNAQWMT]") && morphex(dDA, nextword1(s, m.end[0]), ":", ":D", true);
    },
    s2556s_1: function (s, m) {
        return suggSimil(m[1], ":[AWGT]");
    },
    c2565s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y)", ":[GAQW]") && ! morph(dDA, prevword1(s, m.index), ":V[123].*:[123][sp]", false, false);
    },
    s2565s_1: function (s, m) {
        return suggVerbPpas(m[1]);
    },
    c2576s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, prevword1(s, m.index), ":[VN]", false, true);
    },
    c2577s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! prevword1(s, m.index);
    },
    c2580s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:[lmts]a|leur|une|en) +$/i);
    },
    c2582s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":(?:D|Oo|M)", false);
    },
    c2583s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">être :V") && ! look(s.slice(0,m.index), /\bce que? /i);
    },
    c2597s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[2].search(/^(?:côtés?|coups?|peu(?:-près|)|pics?|propos|valoir|plat-ventrismes?)/i) >= 0);
    },
    c2597s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (m[2].search(/^(?:côtés?|coups?|peu(?:-pr(?:ès|êts?|és?)|)|pics?|propos|valoir|plat-ventrismes?)/i) >= 0);
    },
    c2603s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":3s", false, false);
    },
    c2606s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:3s|R)", false, false) && ! morph(dDA, nextword1(s, m.end[0]), ":Oo|>qui ", false, false);
    },
    c2612s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":Q", ":M[12P]");
    },
    c2614s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:Y|Oo)");
    },
    c2617s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:Y|Oo)");
    },
    c2622s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\bce que?\b/i);
    },
    c2626s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":(?:M[12]|D|Oo)");
    },
    c2634s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]") && ! m[2].slice(0,1)._isUpperCase() && ! m[2].startsWith("tord");
    },
    c2640s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /[ln]’$|\b(?:il|elle|on|y|n’en) +$/i);
    },
    c2644s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /(?:\bque? |[ln]’$|\b(?:il|elle|on|y|n’en) +$)/i);
    },
    c2648s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /(?:\bque? |[ln]’$|\b(?:il|elle|on|y|n’en) +$)/i);
    },
    c2652s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":Y", false) && ! look(s.slice(0,m.index), /\bque? |(?:il|elle|on|n’(?:en|y)) +$/i);
    },
    c2718s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! prevword1(s, m.index);
    },
    c2730s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f") && ! (m[2].search(/^seule?s?/) >= 0);
    },
    c2732s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":G", ">(?:tr(?:ès|op)|peu|bien|plus|moins|toute) |:[NAQ].*:f");
    },
    c2735s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! nextword1(s, m.end[0]) || look(s.slice(m.end[0]), /^ +que? /i);
    },
    c2737s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:[oO]h|[aA]h) +$/);
    },
    c2738s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":R");
    },
    c2754s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":Y")  && m[1] != "CE";
    },
    c2757s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":V[123].*:(?:Y|[123][sp])") && ! morph(dDA, [m.start[2], m[2]], ">(?:devoir|pouvoir) ") && m[2][0]._isLowerCase() && m[1] != "CE";
    },
    c2761s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (m[0].indexOf(",") >= 0 || morphex(dDA, [m.start[2], m[2]], ":G", ":[AYD]"));
    },
    c2769s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! prevword1(s, m.index);
    },
    c2771s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":[NAQ].*:[me]") || look(s.slice(0,m.index), /\b[cs]e +/i);
    },
    c2778s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ">(?:être|pouvoir|devoir) .*:3s", false);
    },
    c2782s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[123]s", ":P");
    },
    c2785s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":([123][sp]|Y|P|Q)|>l[ea]? ");
    },
    c2788s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":N.*:s", ":(?:A.*:[pi]|P|R)|>autour ");
    },
    c2826s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":N.*:p", ":(?:G|W|M|A.*:[si])");
    },
    c2838s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1].endsWith("en") || look(s.slice(0,m.index), /^ *$/);
    },
    c2854s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":Q");
    },
    c2857s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[1], m[1]], ">(?:profiter|bénéficier) ", false);
    },
    c2863s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ]", ":G");
    },
    c2876s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! prevword1(s, m.index) && ! morph(dDA, nextword1(s, m.end[0]), ":[WAY]", false, false);
    },
    c2880s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[1].startsWith("B");
    },
    c2915s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":E|>le ", false, false);
    },
    c2934s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y)", ":(?:G|N|A|M[12P])") && ! look(s.slice(0,m.index), /\b[ld]es +$/i);
    },
    c2951s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":W", false) && ! morph(dDA, prevword1(s, m.index), ":V.*:3s", false, false);
    },
    s2964s_1: function (s, m) {
        return m[1].replace(/pal/g, "pâl");
    },
    s2968s_1: function (s, m) {
        return m[1].replace(/pal/g, "pâl");
    },
    c2978s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /très +$/);
    },
    c2984s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[AQ]", false);
    },
    c2990s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, prevword1(s, m.index), ":C", false, true);
    },
    c2996s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /(?:quelqu|l|d)’/i);
    },
    c3008s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":A") && ! (m[2].search(/^seule?s?$/i) >= 0);
    },
    c3043s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /(?:peu|de) $/i) && morph(dDA, [m.start[2], m[2]], ":Y|>(?:tout|les?|la) ");
    },
    c3046s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":(?:Y|M[12P])|>(?:en|y|les?) ", false);
    },
    c3059s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ">(?:arriver|venir|à|revenir|partir|aller) ");
    },
    c3064s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":P", false);
    },
    c3076s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:G|[123][sp]|W)");
    },
    s3076s_1: function (s, m) {
        return m[1].replace(/ /g, "");
    },
    c3084s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c3093s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    c3096s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":V", false) && ! ( m[1] == "sans" && morph(dDA, [m.start[2], m[2]], ":[NY]", false) );
    },
    c3106s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":M[12]", false);
    },
    c3145s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">ouvrir ", false);
    },
    c3160s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[2].search(/^(?:grand|petit|rouge)$/) >= 0) && morphex(dDA, [m.start[2], m[2]], ":A", ":[NGM]") && ! look(s.slice(0,m.index), /\bne (?:pas |jamais |) *$/i) && ! morph(dDA, prevword1(s, m.index), ":O[os]|>(?:ne|falloir|pouvoir|savoir|de) ", false);
    },
    c3167s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, prevword1(s, m.index), ":Cs|>(?:ni|et|sans|pour|falloir|[pv]ouvoir|aller) ", true, false);
    },
    c3213s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return look(s.slice(0,m.index), /\b(aux|[ldmts]es|[nv]os) +$/);
    },
    c3214s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[AQ].*:[pi]", false);
    },
    c3218s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! prevword1(s, m.index);
    },
    c3224s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:d[eu]|avant|après|sur|malgré) +$/i);
    },
    c3232s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:d[eu]|avant|après|sur|malgré) +$/i) && ! morph(dDA, [m.start[2], m[2]], ":(?:3s|Oo)", false);
    },
    c3240s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:d[eu]|avant|après|sur|malgré) +$/i);
    },
    c3257s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":f", ":[123][sp]") && morphex(dDA, prevword1(s, m.index), ":", ":(?:R|[123][sp]|Q)|>(?:[nv]ous|eux) ", true);
    },
    c3257s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s3257s_2: function (s, m) {
        return suggMasPlur(m[2], true);
    },
    c3262s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":m", ":[123][sp]") && morphex(dDA, prevword1(s, m.index), ":", ":(?:R|[123][sp]|Q)|>(?:[nv]ous|eux) ", true);
    },
    c3262s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s3262s_2: function (s, m) {
        return suggFemPlur(m[2], true);
    },
    c3272s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":N.*:[fp]", ":(?:A|W|G|M[12P]|Y|[me]:i|3s)") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s3272s_1: function (s, m) {
        return suggMasSing(m[1], true);
    },
    c3277s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[mp]") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s3277s_1: function (s, m) {
        return suggFemSing(m[1], true);
    },
    c3282s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[fs]") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s3282s_1: function (s, m) {
        return suggMasPlur(m[1], true);
    },
    c3287s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[ms]") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s3287s_1: function (s, m) {
        return suggFemPlur(m[1], true);
    },
    c3307s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[123][sp]", false) && ! ((m[2].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins) /));
    },
    c3312s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[123][sp]", false) && ! ((m[2].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins) /));
    },
    c3317s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins) /));
    },
    c3322s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins) /));
    },
    c3338s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:Y|W|O[ow])|>que? ", false) && _oDict.isValid(m[1]);
    },
    s3338s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c3372s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":[AN].*:[pi]", false, false);
    },
    c3373s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":A.*:s");
    },
    c3374s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":A.*:s", false);
    },
    p3527s_1: function (s, m) {
        return m[0].replace(/ /g, "_");
    },
    c3624s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":G");
    },
    c3631s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    c3643s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[2].search(/^(?:janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)s?$/i) >= 0);
    },
    c3650s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:une|la|cette|[mts]a|[nv]otre|de) +/);
    },
    c3682s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c3682s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c3701s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[2]._isDigit() || morph(dDA, [m.start[2], m[2]], ":B", false);
    },
    c3707s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return look(s.slice(0,m.index), /\b[lL]a +$/);
    },
    d3707s_1: function (s, m, dDA) {
        return define(dDA, m.start[0], [">numéro :N:f:s"]);
    },
    c3718s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">prendre ", false);
    },
    c3722s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">rester ", false);
    },
    c3727s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:sembler|para[îi]tre) ") && morphex(dDA, [m.start[3], m[3]], ":A", ":G");
    },
    c3731s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">tenir ", false);
    },
    c3734s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">trier ", false);
    },
    c3736s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">venir ", false);
    },
    c3751s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", ":(?:G|3p)");
    },
    c3756s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", ":(?:G|3p)");
    },
    c3763s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":B", false);
    },
    c3764s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, prevword1(s, m.index), ":V0", false) || ! morph(dDA, nextword1(s, m.end[0]), ":A", false);
    },
    c3765s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c3766s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":W", false);
    },
    c3767s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":A .*:m:s", false);
    },
    c3769s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, prevword1(s, m.index), ":(?:R|C[sc])", false, true);
    },
    c3770s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":B", false) || (m[1].search(/^(?:plusieurs|maintes)/i) >= 0);
    },
    c3771s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, nextword1(s, m.end[0]), ":[NAQR]", false, true);
    },
    c3772s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":V0");
    },
    c3774s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[1], m[1]], ":D", false);
    },
    c3775s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[1], m[1]], ":D.*:[me]:[si]", false);
    },
    c3776s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":([AQ].*:[me]:[pi])", false, false);
    },
    c3777s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":A", false);
    },
    c3778s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:croire|devoir|estimer|imaginer|penser) ");
    },
    c3780s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":(?:R|D|[123]s|X)", false);
    },
    c3781s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":[AQ]:[ef]:[si]", false);
    },
    c3782s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":[AQ]:[em]:[si]", false);
    },
    c3783s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:il +|n’)$/i);
    },
    c3784s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c3785s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\bt(?:u|oi qui)\b/i);
    },
    c3786s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c3787s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":A", false);
    },
    c3788s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c3789s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":W", false);
    },
    c3790s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[AW]", ":G");
    },
    c3791s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[AW]", false);
    },
    c3792s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":Y", false);
    },
    c3795s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NV]", ":D");
    },
    c3796s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":(?:3s|X)", false);
    },
    c3797s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[me]", false);
    },
    c3804s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false) && (morph(dDA, [m.start[2], m[2]], ":(?:M[12]|V)", false) || ! _oDict.isValid(m[2]));
    },
    c3805s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":M", false) && morph(dDA, [m.start[2], m[2]], ":M", false);
    },
    c3806s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":M", false);
    },
    c3807s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":(?:M[12]|N)") && morph(dDA, [m.start[2], m[2]], ":(?:M[12]|N)");
    },
    c3808s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":MP");
    },
    c3809s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false);
    },
    c3810s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false);
    },
    c3813s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[MT]", false) && morph(dDA, prevword1(s, m.index), ":Cs", false, true) && ! look(s.slice(0,m.index), /\b(?:plus|moins|aussi) .* que +$/);
    },
    p3813s_1: function (s, m) {
        return rewriteSubject(m[1],m[2]);
    },
    c3818s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c3820s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c3822s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":(?:V0e|N)", false) && morph(dDA, [m.start[3], m[3]], ":[AQ]", false);
    },
    c3824s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false);
    },
    c3826s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false) && morph(dDA, [m.start[3], m[3]], ":[QY]", false);
    },
    c3828s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && ! (m[2] == "crainte" && look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ]/));
    },
    c3830s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c3832s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morph(dDA, [m.start[3], m[3]], ":B", false) && morph(dDA, [m.start[4], m[4]], ":(?:Q|V1.*:Y)", false);
    },
    c3836s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":A:[fe]:s", false);
    },
    c3837s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":A:[fe]:p", false);
    },
    c3840s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c3841s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V[123]");
    },
    c3842s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V[123]", false);
    },
    c3843s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c3846s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":G");
    },
    c3849s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], "[NAQ].*:[me]:[si]", false);
    },
    c3851s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[me]", ":G") && morph(dDA, [m.start[3], m[3]], ":[AQ].*:[me]", false);
    },
    c3853s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[fe]", ":G") && morph(dDA, [m.start[3], m[3]], ":[AQ].*:[fe]", false);
    },
    c3855s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", ":[123][sp]") && morph(dDA, [m.start[3], m[3]], ":[AQ].*:[pi]", false);
    },
    c3858s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[AW]");
    },
    c3860s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[AW]", false);
    },
    c3862s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[AQ]", false);
    },
    c3864s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":W", ":3p");
    },
    c3866s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[AW]", ":[123][sp]");
    },
    c3870s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && morph(dDA, [m.start[3], m[3]], ":W", false) && morph(dDA, [m.start[4], m[4]], ":[AQ]", false);
    },
    c3872s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, true);
    },
    c3873s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":W\\b");
    },
    c3876s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c3880s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":(?:N|A|Q|V0e)", false);
    },
    c3904s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\bne +$/i);
    },
    c3930s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":A.*:[me]:[pi]", false);
    },
    c3931s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":(?:A.*:[fe]:[si]|Oo|[123][sp])", false);
    },
    c3932s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":(?:A.*:[me]:[si]|Oo|[123][sp])", false);
    },
    c3933s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":A.*:[me]:[si]", false);
    },
    c3934s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":A.*:[me]:[si]", false);
    },
    c3935s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":A.*:[me]:[pi]", false);
    },
    c3936s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":A.*:[fe]:[pi]", false);
    },
    c3937s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":A.*:[fe]:[pi]", false);
    },
    c3938s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":A.*:[fe]:[pi]", false);
    },
    c3939s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":A.*:[fe]:[pi]", false);
    },
    c3940s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":A.*:[me]:[pi]", false);
    },
    c3941s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":A.*:[me]:[si]", false);
    },
    c3987s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":1s", false, false);
    },
    c3988s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":2s", false, false);
    },
    c3989s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":3s", false, false);
    },
    c3990s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":1p", false, false);
    },
    c3991s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":2p", false, false);
    },
    c3992s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":3p", false, false);
    },
    c3999s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return isAmbiguousNAV(m[3]) && morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ">telle ");
    },
    c4002s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return isAmbiguousNAV(m[3]) && morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ">telle ") && ! (m[0].search(/^[dD](?:’une?|e l(?:a|eur)) /) >= 0);
    },
    c4005s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return isAmbiguousNAV(m[3]) && ( morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":3[sp]") && ! prevword1(s, m.index)) );
    },
    c4022s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:G|V0)|>même ", false);
    },
    c4022s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo;
    },
    c4041s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    c4043s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    c4045s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[fe]", false);
    },
    c4056s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[123][sp]|:[si]");
    },
    s4056s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c4063s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)");
    },
    c4063s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasMasForm(m[2]);
    },
    s4063s_2: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c4063s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p");
    },
    s4063s_3: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4068s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)") || ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[me]") && morphex(dDA, [m.start[1], m[1]], ":R", ">(?:e[tn]|ou) ") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[3], m[3]], ":Y", false)) );
    },
    c4068s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasMasForm(m[3]);
    },
    s4068s_2: function (s, m) {
        return suggMasSing(m[3], true);
    },
    c4068s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[3], m[3]], ":[NAQ].*:p") || ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[si]") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou)") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[3], m[3]], ":Y", false)) );
    },
    s4068s_3: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4077s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|P|G|W|Y)");
    },
    c4077s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasMasForm(m[2]);
    },
    s4077s_2: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c4077s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    s4077s_3: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4091s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    c4091s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasMasForm(m[2]);
    },
    s4091s_2: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c4091s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    s4091s_3: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4096s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|G|W|V0|3s)");
    },
    c4096s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasMasForm(m[2]);
    },
    s4096s_2: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c4096s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]") && ! morph(dDA, prevword(s, m.index, 2), ":B", false);
    },
    s4096s_3: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4101s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|G|W|V0|3s)");
    },
    c4101s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasMasForm(m[2]);
    },
    s4101s_2: function (s, m) {
        return suggMasPlur(m[2], true);
    },
    c4105s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    c4105s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasMasForm(m[2]);
    },
    s4105s_2: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c4105s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    s4105s_3: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4110s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    c4110s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasMasForm(m[2]);
    },
    s4110s_2: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c4110s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ">[bcçdfgjklmnpqrstvwxz].+:[NAQ].*:m", ":[efGW]");
    },
    c4110s_4: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    s4110s_4: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4116s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:3s|[GWme])");
    },
    c4116s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasMasForm(m[2]);
    },
    s4116s_2: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c4116s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]") && morph(dDA, [m.start[2], m[2]], ":3s", false);
    },
    c4116s_4: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    s4116s_4: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4122s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ">[bcdfgjklmnpqrstvwxz].*:[NAQ].*:f", ":[GWme]");
    },
    s4122s_1: function (s, m) {
        return m[1].replace(/on/g, "a");
    },
    c4122s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasMasForm(m[2]);
    },
    s4122s_2: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c4122s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    s4122s_3: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4127s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:s", ":[GWme]");
    },
    c4127s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasMasForm(m[2]);
    },
    s4127s_2: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c4127s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    s4127s_3: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4127s_4: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo;
    },
    c4148s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:e|f|P|G|W|[1-3][sp]|Y)");
    },
    c4148s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s4148s_2: function (s, m) {
        return suggFemSing(m[2], true);
    },
    c4148s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p");
    },
    s4148s_3: function (s, m) {
        return suggFemSing(m[2]);
    },
    c4153s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":(?:e|f|P|G|W|[1-3][sp]|Y)") || ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[fe]") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou) ") && ! (morph(dDA, [m.start[1], m[1]], ":(?:Rv|C)", false) && morph(dDA, [m.start[3], m[3]], ":Y", false)) );
    },
    c4153s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[3]);
    },
    s4153s_2: function (s, m) {
        return suggFemSing(m[3], true);
    },
    c4153s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[3], m[3]], ":[NAQ].*:p") || ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[si]") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou)") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[3], m[3]], ":Y", false)) );
    },
    s4153s_3: function (s, m) {
        return suggFemSing(m[3]);
    },
    c4162s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efPGWY]");
    },
    c4162s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s4162s_2: function (s, m) {
        return suggFemSing(m[2], true);
    },
    c4162s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    s4162s_3: function (s, m) {
        return suggFemSing(m[2]);
    },
    c4177s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    c4177s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s4177s_2: function (s, m) {
        return suggFemSing(m[2], true);
    },
    c4177s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    s4177s_3: function (s, m) {
        return suggFemSing(m[2]);
    },
    c4186s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:e|f|G|W|V0|3s|P)") && ! ( m[2] == "demi" && morph(dDA, nextword1(s, m.end[0]), ":N.*:f") );
    },
    c4186s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s4186s_2: function (s, m) {
        return suggFemSing(m[2], true);
    },
    c4186s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]") && ! morph(dDA, prevword(s, m.index, 2), ":B", false);
    },
    s4186s_3: function (s, m) {
        return suggFemSing(m[2]);
    },
    c4192s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:e|f|G|W|V0|3s)");
    },
    c4192s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s4192s_2: function (s, m) {
        return suggFemPlur(m[2], true);
    },
    c4204s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    s4204s_1: function (s, m) {
        return suggCeOrCet(m[2]);
    },
    c4204s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s4204s_2: function (s, m) {
        return suggFemSing(m[2], true);
    },
    c4204s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    s4204s_3: function (s, m) {
        return suggFemSing(m[2]);
    },
    c4209s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    s4209s_1: function (s, m) {
        return m[1].replace(/a/g, "on");
    },
    c4209s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && ! (m[2].search(/^[aâeéèêiîoôuûyœæ]/i) >= 0) && hasFemForm(m[2]);
    },
    s4209s_2: function (s, m) {
        return suggFemSing(m[2], true);
    },
    c4209s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ">[aâeéèêiîoôuûyœæ].+:[NAQ].*:f", ":[eGW]");
    },
    s4209s_3: function (s, m) {
        return m[1].replace(/a/g, "on");
    },
    c4209s_4: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    s4209s_4: function (s, m) {
        return suggFemSing(m[2]);
    },
    c4227s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[emGWP]");
    },
    c4227s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasMasForm(m[2]);
    },
    s4227s_2: function (s, m) {
        return suggMasPlur(m[2], true);
    },
    c4227s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":(?:[ipGWP]|V0)") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[1] in aREGULARPLURAL;
    },
    s4227s_3: function (s, m) {
        return suggPlur(m[2]);
    },
    c4235s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[emGW]");
    },
    c4235s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasMasForm(m[2]);
    },
    s4235s_2: function (s, m) {
        return suggMasPlur(m[2], true);
    },
    c4240s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGWP]");
    },
    c4240s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s4240s_2: function (s, m) {
        return suggFemPlur(m[2], true);
    },
    c4240s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[ipGWP]") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[2] in aREGULARPLURAL;
    },
    s4240s_3: function (s, m) {
        return suggPlur(m[1]);
    },
    c4248s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    c4248s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s4248s_2: function (s, m) {
        return suggFemPlur(m[2], true);
    },
    c4262s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p");
    },
    c4262s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo;
    },
    s4262s_2: function (s, m) {
        return suggSing(m[2]);
    },
    c4266s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[3], m[3]], ":[NAQ].*:p") || ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[si]") && morphex(dDA, [m.start[1], m[1]], ":[RC]|>de ", ">(?:e[tn]|ou)") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[3], m[3]], ":Y", false)) );
    },
    c4266s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo;
    },
    s4266s_2: function (s, m) {
        return suggSing(m[3]);
    },
    c4271s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    c4271s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo;
    },
    s4271s_2: function (s, m) {
        return suggSing(m[2]);
    },
    c4281s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[siGW]");
    },
    s4281s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c4288s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siG]");
    },
    c4297s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ( morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false)) ) || m[1] in aREGULARPLURAL;
    },
    s4297s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c4302s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ( morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") || (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[pi]|>avoir") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou) ") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[2], m[2]], ":Y", false))) ) && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false));
    },
    s4302s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4308s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ipYPGW]") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[1] in aREGULARPLURAL;
    },
    s4308s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c4322s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":(?:[ipGW]|[123][sp])") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[2] in aREGULARPLURAL;
    },
    s4322s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4322s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo;
    },
    c4333s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ipGW]") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[1] in aREGULARPLURAL;
    },
    s4333s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c4339s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ipGWP]") && ! (look(s.slice(m.end[0]), /^ +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[1] in aREGULARPLURAL;
    },
    s4339s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c4365s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ip]|>o(?:nde|xydation|or)\\b") && morphex(dDA, prevword1(s, m.index), ":(?:G|[123][sp])", ":[AD]", true)) || m[1] in aREGULARPLURAL;
    },
    s4365s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c4374s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ip]") || m[1] in aREGULARPLURAL;
    },
    s4374s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c4382s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ip]") || m[1] in aREGULARPLURAL;
    },
    s4382s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c4394s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":B.*:p", false) && m[2] != "cents";
    },
    c4419s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! (m[2].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$/i) >= 0)) || m[2] in aREGULARPLURAL;
    },
    s4419s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4429s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! morph(dDA, prevword1(s, m.index), ":N", false) && ! (m[2].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$/i) >= 0)) || m[2] in aREGULARPLURAL;
    },
    s4429s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4439s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") || m[1] in aREGULARPLURAL) && ! look(s.slice(0,m.index), /\b(?:le|un|ce|du) +$/i);
    },
    s4439s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c4447s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && ! (m[1].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor|Rois|Corinthiens|Thessaloniciens)$/i) >= 0);
    },
    s4447s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c4457s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[1].search(/^0*[01]$/) >= 0) && ((morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! (m[2].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$/i) >= 0)) || m[1] in aREGULARPLURAL);
    },
    s4457s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4469s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:p", ":(?:V0e|[NAQ].*:[me]:[si])");
    },
    c4469s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s4469s_2: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c4469s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:p", ":(?:V0e|[NAQ].*:[me]:[si])");
    },
    c4469s_4: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo;
    },
    s4469s_4: function (s, m) {
        return suggSing(m[2]);
    },
    c4469s_5: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:[si]", ":(?:V0e|[NAQ].*:[me]:[si])");
    },
    c4469s_6: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s4469s_6: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c4477s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:s", ":(?:V0e|[NAQ].*:[me]:[pi])");
    },
    c4477s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s4477s_2: function (s, m) {
        return suggMasPlur(m[2], true);
    },
    c4477s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:s", ":(?:V0e|[NAQ].*:[me]:[pi])");
    },
    c4477s_4: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo;
    },
    s4477s_4: function (s, m) {
        return suggPlur(m[2]);
    },
    c4477s_5: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:[pi]", ":(?:V0e|[NAQ].*:[me]:[pi])");
    },
    c4477s_6: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s4477s_6: function (s, m) {
        return suggMasPlur(m[2], true);
    },
    c4485s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:p", ":(?:V0e|[NAQ].*:[fe]:[si])");
    },
    c4485s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s4485s_2: function (s, m) {
        return suggFemSing(m[2], true);
    },
    c4485s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:p", ":(?:V0e|[NAQ].*:[fe]:[si])");
    },
    c4485s_4: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo;
    },
    s4485s_4: function (s, m) {
        return suggSing(m[2]);
    },
    c4485s_5: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:[si]", ":(?:V0e|[NAQ].*:[fe]:[si])");
    },
    c4485s_6: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s4485s_6: function (s, m) {
        return suggFemSing(m[2], true);
    },
    c4493s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:s", ":(?:V0e|[NAQ].*:[fe]:[pi])");
    },
    c4493s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s4493s_2: function (s, m) {
        return suggFemPlur(m[2], true);
    },
    c4493s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:s", ":(?:V0e|[NAQ].*:[fe]:[pi])");
    },
    c4493s_4: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo;
    },
    s4493s_4: function (s, m) {
        return suggPlur(m[2]);
    },
    c4493s_5: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:[pi]", ":(?:V0e|[NAQ].*:[fe]:[pi])");
    },
    c4493s_6: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[2]);
    },
    s4493s_6: function (s, m) {
        return suggFemPlur(m[2], true);
    },
    c4510s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/);
    },
    c4515s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/);
    },
    s4515s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c4520s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[me]");
    },
    c4525s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[fe]");
    },
    c4530s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[me]");
    },
    c4535s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[fe]");
    },
    c4552s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false);
    },
    c4556s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false) && morphex(dDA, [m.start[4], m[4]], ":[NAQ].*:m", ":[fe]");
    },
    s4556s_1: function (s, m) {
        return m[1].replace(/lle/g, "l");
    },
    c4568s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false);
    },
    c4572s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false) && morphex(dDA, [m.start[4], m[4]], ":[NAQ].*:f", ":[me]");
    },
    s4572s_1: function (s, m) {
        return m[1].replace(/l/g, "lle");
    },
    c4585s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">trouver ", false) && morphex(dDA, [m.start[3], m[3]], ":A.*:(?:f|m:p)", ":(?:G|3[sp]|M[12P])");
    },
    s4585s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4597s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]);
    },
    s4597s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c4597s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[1]);
    },
    s4597s_2: function (s, m) {
        return switchGender(m[1]);
    },
    c4597s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s"))) && ! apposition(m[1], m[2]);
    },
    s4597s_3: function (s, m) {
        return switchPlural(m[2]);
    },
    c4597s_4: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo;
    },
    s4597s_4: function (s, m) {
        return switchPlural(m[1]);
    },
    c4612s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ( (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m")) ) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s4612s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c4612s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[1]);
    },
    s4612s_2: function (s, m) {
        return switchGender(m[1]);
    },
    c4612s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ( (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p")) ) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s4612s_3: function (s, m) {
        return switchPlural(m[2]);
    },
    c4612s_4: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo;
    },
    s4612s_4: function (s, m) {
        return switchPlural(m[1]);
    },
    c4627s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ( (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":[GYfe]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":[GYme]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m")) ) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s4627s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c4627s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[1]);
    },
    s4627s_2: function (s, m) {
        return switchGender(m[1]);
    },
    c4627s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ( (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[GYsi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[GYpi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p")) ) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s4627s_3: function (s, m) {
        return switchPlural(m[2]);
    },
    c4627s_4: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo;
    },
    s4627s_4: function (s, m) {
        return switchPlural(m[1]);
    },
    c4642s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ( (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":(?:[Gfe]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":(?:[Gme]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m")) ) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s4642s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c4642s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[1]);
    },
    s4642s_2: function (s, m) {
        return switchGender(m[1]);
    },
    c4642s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ( (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":(?:[Gsi]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":(?:[Gpi]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p")) ) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s4642s_3: function (s, m) {
        return switchPlural(m[2]);
    },
    c4642s_4: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo;
    },
    s4642s_4: function (s, m) {
        return switchPlural(m[1]);
    },
    c4668s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[1].search(/^air$/i) >= 0) && ! m[2].startsWith("seul") && ( (morph(dDA, [m.start[1], m[1]], ":m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m")) ) && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4668s_1: function (s, m) {
        return switchGender(m[2], false);
    },
    c4668s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[1]);
    },
    s4668s_2: function (s, m) {
        return switchGender(m[1]);
    },
    c4668s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[1].search(/^air$/i) >= 0) && ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[si]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4668s_3: function (s, m) {
        return suggSing(m[2]);
    },
    c4679s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && ( (morph(dDA, [m.start[1], m[1]], ":m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m")) ) && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]", false, false);
    },
    s4679s_1: function (s, m) {
        return switchGender(m[2], false);
    },
    c4679s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[1]);
    },
    s4679s_2: function (s, m) {
        return switchGender(m[1]);
    },
    c4679s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[1].search(/^air$/i) >= 0) && ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[si]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]", false, false);
    },
    s4679s_3: function (s, m) {
        return suggSing(m[2]);
    },
    c4699s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[me]", ":(?:B|G|V0|f)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4699s_1: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c4699s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! m[2].startsWith("seul") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|d’) *$/);
    },
    s4699s_2: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4708s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[me]", ":(?:B|G|V0|f)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s4708s_1: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c4708s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! m[2].startsWith("seul") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQB]|>(?:et|ou) ", false, false);
    },
    s4708s_2: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4728s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4728s_1: function (s, m) {
        return suggFemSing(m[2], true);
    },
    c4728s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] != "fois" && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! m[2].startsWith("seul") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|d’) *$/);
    },
    s4728s_2: function (s, m) {
        return suggFemSing(m[2]);
    },
    c4737s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s4737s_1: function (s, m) {
        return suggFemSing(m[2], true);
    },
    c4737s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] != "fois" && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! m[2].startsWith("seul") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQB]|>(?:et|ou) ", false, false);
    },
    s4737s_2: function (s, m) {
        return suggFemSing(m[2]);
    },
    c4758s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[me]", ":(?:B|G|V0|f)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4758s_1: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c4758s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWsi]") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4758s_2: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4768s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[me]", ":(?:B|G|V0|f)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s4768s_1: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c4768s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWsi]") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s4768s_2: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4783s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":(?:B|G|e|V0|f)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4783s_1: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c4783s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWsi]") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4783s_2: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4793s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":(?:B|G|e|V0|f)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s4793s_1: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c4793s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWsi]") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s4793s_2: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4809s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] != "fois" && ! m[2].startsWith("seul") && morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4809s_1: function (s, m) {
        return suggFemSing(m[2], true);
    },
    c4809s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWsi]") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4809s_2: function (s, m) {
        return suggFemSing(m[2]);
    },
    c4819s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] != "fois" && ! m[2].startsWith("seul") && morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s4819s_1: function (s, m) {
        return suggFemSing(m[2], true);
    },
    c4819s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWsi]") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s4819s_2: function (s, m) {
        return suggFemSing(m[2]);
    },
    c4836s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] != "fois" && ! m[2].startsWith("seul") && ! (m[0].search(/^quelque chose/i) >= 0) && ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":(?:B|e|G|V0|f)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":(?:B|e|G|V0|m)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4836s_1: function (s, m) {
        return switchGender(m[2], false);
    },
    c4836s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[1]);
    },
    s4836s_2: function (s, m) {
        return switchGender(m[1], false);
    },
    c4836s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWsi]") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4836s_3: function (s, m) {
        return suggSing(m[2]);
    },
    c4847s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] != "fois" && ! m[2].startsWith("seul") && ! (m[0].search(/quelque chose/i) >= 0) && ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":(?:B|e|G|V0|f)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":(?:B|e|G|V0|m)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s4847s_1: function (s, m) {
        return switchGender(m[2], false);
    },
    c4847s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[1]);
    },
    s4847s_2: function (s, m) {
        return switchGender(m[1], false);
    },
    c4847s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWsi]") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s4847s_3: function (s, m) {
        return suggSing(m[2]);
    },
    c4864s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[me]", ":(?:B|G|V0|f)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4864s_1: function (s, m) {
        return suggMasPlur(m[2], true);
    },
    c4864s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! apposition(m[1], m[2]) && ! look_chk1(dDA, s.slice(m.end[0]), m.end[0], /^ +et +([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ-]+)/i, ":A") && ! look(s.slice(0,m.index), /\bune de /i);
    },
    s4864s_2: function (s, m) {
        return suggMasPlur(m[2]);
    },
    c4875s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[me]", ":(?:B|G|V0|f)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s4875s_1: function (s, m) {
        return suggMasPlur(m[2], true);
    },
    c4875s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! apposition(m[1], m[2]) && ! look_chk1(dDA, s.slice(m.end[0]), m.end[0], /^ +et +([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ-]+)/i, ":A") && ! ( look(s.slice(0,m.index), /\bune? de /i) || (m[0].startsWith("de") && look(s.slice(0,m.index), /\bune? +$/i)) );
    },
    s4875s_2: function (s, m) {
        return suggMasPlur(m[2]);
    },
    c4892s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] != "fois" && ! m[2].startsWith("seul") && morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4892s_1: function (s, m) {
        return suggFemPlur(m[2], true);
    },
    c4892s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! apposition(m[1], m[2]) && ! look_chk1(dDA, s.slice(m.end[0]), m.end[0], /^ +et +([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ-]+)/i, ":A") && ! look(s.slice(0,m.index), /\bune de /i);
    },
    s4892s_2: function (s, m) {
        return suggFemPlur(m[2]);
    },
    c4903s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] != "fois" && ! m[2].startsWith("seul") && morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s4903s_1: function (s, m) {
        return suggFemPlur(m[2], true);
    },
    c4903s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! apposition(m[1], m[2]) && ! look_chk1(dDA, s.slice(m.end[0]), m.end[0], /^ +et +([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ-]+)/i, ":A") && ! ( look(s.slice(0,m.index), /\bune? de /i) || (m[0].startsWith("de") && look(s.slice(0,m.index), /\bune? +$/i)) );
    },
    s4903s_2: function (s, m) {
        return suggFemPlur(m[2]);
    },
    c4920s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] != "fois" && ! m[2].startsWith("seul") && ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":(?:B|e|G|V0|f)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":(?:B|e|G|V0|m)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4920s_1: function (s, m) {
        return switchGender(m[2], true);
    },
    c4920s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[1]);
    },
    s4920s_2: function (s, m) {
        return switchGender(m[1], true);
    },
    c4920s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] != "fois" && ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! apposition(m[1], m[2]) && ! look_chk1(dDA, s.slice(m.end[0]), m.end[0], /^ +et +([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ-]+)/i, ":A") && ! look(s.slice(0,m.index), /\bune? de /i);
    },
    s4920s_3: function (s, m) {
        return suggPlur(m[2]);
    },
    c4932s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] != "fois" && ! m[2].startsWith("seul") && ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":(?:B|e|G|V0|f)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":(?:B|e|G|V0|m)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s4932s_1: function (s, m) {
        return switchGender(m[2], true);
    },
    c4932s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[1]);
    },
    s4932s_2: function (s, m) {
        return switchGender(m[1], true);
    },
    c4932s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] != "fois" && ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! apposition(m[1], m[2]) && ! look_chk1(dDA, s.slice(m.end[0]), m.end[0], /^ +et +([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ-]+)/i, ":A") && ! ( look(s.slice(0,m.index), /\bune? de /i) || (m[0].startsWith("de") && look(s.slice(0,m.index), /\bune? +$/i)) );
    },
    s4932s_3: function (s, m) {
        return suggPlur(m[2]);
    },
    c4953s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] != "fois" && ! m[2].startsWith("seul") && ( (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":[fe]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":[me]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m")) ) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRBX]|>comme ", true, true);
    },
    s4953s_1: function (s, m) {
        return switchGender(m[2], true);
    },
    c4953s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && hasFemForm(m[1]);
    },
    s4953s_2: function (s, m) {
        return switchGender(m[1]);
    },
    c4953s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! apposition(m[1], m[2]) && (morphex(dDA, [m.start[2], m[2]], ":N", ":[AQ]") || morph(dDA, prevword1(s, m.index), ":[VRBX]|>comme ", true, true));
    },
    s4953s_3: function (s, m) {
        return suggPlur(m[2]);
    },
    c4979s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:s")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:p"));
    },
    s4979s_1: function (s, m) {
        return switchPlural(m[3]);
    },
    c4988s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:s");
    },
    s4988s_1: function (s, m) {
        return suggPlur(m[3]);
    },
    c4996s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:[si]", ":G") && morph(dDA, [m.start[4], m[4]], ":[NAQ].*:p");
    },
    s4996s_1: function (s, m) {
        return suggSing(m[4]);
    },
    c5005s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:[pi]", ":G") && morph(dDA, [m.start[4], m[4]], ":[NAQ].*:s") && ! look(s.slice(0,m.index), /\bune? de /i);
    },
    s5005s_1: function (s, m) {
        return suggPlur(m[4]);
    },
    c5017s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:(?:m|f:p)", ":(?:G|P|[fe]:[is]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s5017s_1: function (s, m) {
        return suggFemSing(m[2], true);
    },
    c5022s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s5022s_1: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c5027s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[1], m[1]], ":[NAQ].*:f|>[aéeiou].*:e", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|m:[is]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s5027s_1: function (s, m) {
        return suggMasSing(m[2], true);
    },
    c5032s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":G|>[aéeiou].*:[ef]") && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") && ! apposition(m[2], m[3]);
    },
    s5032s_1: function (s, m) {
        return suggMasSing(m[3], true);
    },
    c5038s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":G|>[aéeiou].*:[ef]") && ! morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f|>[aéeiou].*:e", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") && ! apposition(m[2], m[3]);
    },
    s5038s_1: function (s, m) {
        return suggMasSing(m[3], true);
    },
    c5044s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":(?:G|P|[me]:[ip]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s5044s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c5085s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! prevword1(s, m.index);
    },
    c5087s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! prevword1(s, m.index);
    },
    c5089s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! prevword1(s, m.index);
    },
    c5103s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\bquatre $/i);
    },
    c5105s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":B", false) && ! look(s.slice(0,m.index), /\b(?:numéro|page|chapitre|référence|année|test|série)s? +$/i);
    },
    s5120s_1: function (s, m) {
        return m[0].slice(0,-1);
    },
    c5128s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":B|>une?", false, true) && ! look(s.slice(0,m.index), /\b(?:numéro|page|chapitre|référence|année|test|série)s? +$/i);
    },
    c5132s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, nextword1(s, m.end[0]), ":B|>une?", false, false);
    },
    c5136s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", ":G") && morphex(dDA, prevword1(s, m.index), ":[VR]", ":B", true);
    },
    c5147s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, nextword1(s, m.end[0]), ":B|:N.*:p", ":[QA]", false) || (morph(dDA, prevword1(s, m.index), ":B") && morph(dDA, nextword1(s, m.end[0]), ":[NAQ]", false));
    },
    c5160s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, prevword1(s, m.index), ":D.*:[si]", false, true);
    },
    s5168s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    s5173s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c5190s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:mettre|mise) ", false);
    },
    c5210s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c5213s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false) && morph(dDA, [m.start[3], m[3]], ":(?:N|MP)");
    },
    s5263s_1: function (s, m) {
        return m[1]._trimRight("e");
    },
    c5271s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":(?:V0e|W)|>très", false);
    },
    c5280s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:co[ûu]ter|payer) ", false);
    },
    c5289s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">donner ", false);
    },
    c5327s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:avoir|perdre) ", false);
    },
    c5330s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:lit|fauteuil|armoire|commode|guéridon|tabouret|chaise)s?\b/i);
    },
    c5343s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, prevword1(s, m.index), ":(?:V|[NAQ].*:s)", ":(?:[NA]:.:[pi]|V0e.*:[123]p)", true);
    },
    c5394s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (look(s.slice(m.end[0]), /^ [ldmtsc]es /) && ! look(s.slice(0,m.index), /\b(?:ils?|elles?|ne) +/i)) || ( morph(dDA, prevword1(s, m.index), ":Cs", false, true) && ! look(s.slice(0,m.index), /, +$/) && ! look(s.slice(m.end[0]), /^ +(?:ils?|elles?)\b/i) && ! morph(dDA, nextword1(s, m.end[0]), ":Q", false, false) );
    },
    c5421s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:f:s", false, false);
    },
    c5423s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:aller|partir) ", false);
    },
    c5434s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":V0e.*:3p", false, false) || morph(dDA, nextword1(s, m.end[0]), ":Q", false, false);
    },
    c5456s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|devenir|para[îi]tre|rendre|sembler) ", false);
    },
    s5456s_1: function (s, m) {
        return m[2].replace(/oc/g, "o");
    },
    s5461s_1: function (s, m) {
        return m[1].replace(/oc/g, "o");
    },
    c5481s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">tenir ");
    },
    c5498s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">mettre ", false);
    },
    c5500s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c5541s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|aller) ", false);
    },
    s5544s_1: function (s, m) {
        return m[1].replace(/auspice/g, "hospice");
    },
    s5547s_1: function (s, m) {
        return m[1].replace(/auspice/g, "hospice").replace(/Auspice/g, "Hospice");
    },
    c5581s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":[AQ]");
    },
    s5589s_1: function (s, m) {
        return m[0].replace(/ite/g, "itte");
    },
    c5596s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] != "bonne et due forme";
    },
    s5611s_1: function (s, m) {
        return m[1].replace(/cane/g, "canne");
    },
    c5621s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:appuyer|battre|frapper|lever|marcher) ", false);
    },
    s5621s_1: function (s, m) {
        return m[2].replace(/cane/g, "canne");
    },
    c5629s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[1].search(/^C(?:annes|ANNES)/) >= 0);
    },
    c5633s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[1].search(/^C(?:annes|ANNES)/) >= 0);
    },
    c5649s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c5666s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c5669s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, prevword1(s, m.index), ":[VR]", false);
    },
    c5678s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[0].search(/^à cor et à cri$/i) >= 0);
    },
    c5687s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">tordre ", false);
    },
    c5690s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">rendre ", false);
    },
    c5704s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">couper ");
    },
    c5706s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:avoir|donner|laisser) ", false);
    },
    c5724s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:[lmtsc]es|des?|[nv]os|leurs|quels) +$/i);
    },
    c5738s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, nextword1(s, m.end[0]), ":[GVX]", ":[NAQ]", true);
    },
    c5742s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, nextword1(s, m.end[0]), ":[GV]", ":[NAQ]", false);
    },
    c5746s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, nextword1(s, m.end[0]), ":[GV]", ":[NAQ]", true);
    },
    c5750s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, nextword1(s, m.end[0]), ":G", ":[NAQ]");
    },
    c5754s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    s5754s_1: function (s, m) {
        return m[2].replace(/nd/g, "nt");
    },
    c5770s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, prevword1(s, m.index), ":V0e", false, false);
    },
    c5777s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ">(?:abandonner|céder|résister) ", false) && ! look(s.slice(m.end[0]), /^ d(?:e |’)/);
    },
    s5791s_1: function (s, m) {
        return m[1].replace(/nt/g, "mp");
    },
    c5808s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false) && morph(dDA, [m.start[3], m[3]], ":(?:Y|Oo)", false);
    },
    s5808s_1: function (s, m) {
        return m[2].replace(/sens/g, "cens");
    },
    s5818s_1: function (s, m) {
        return m[1].replace(/c/g, "s").replace(/C/g, "S");
    },
    s5826s_1: function (s, m) {
        return m[1].replace(/o/g, "ô");
    },
    s5834s_1: function (s, m) {
        return m[1].replace(/o/g, "ô").replace(/tt/g, "t");
    },
    s5840s_1: function (s, m) {
        return m[1].replace(/ô/g, "o").replace(/tt/g, "t");
    },
    s5843s_1: function (s, m) {
        return m[1].replace(/ô/g, "o").replace(/t/g, "tt");
    },
    c5846s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c5877s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ">(?:desceller|desseller) ", false);
    },
    s5877s_1: function (s, m) {
        return m[2].replace(/descell/g, "décel").replace(/dessell/g, "décel");
    },
    c5882s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:desceller|desseller) ", false);
    },
    s5882s_1: function (s, m) {
        return m[1].replace(/descell/g, "décel").replace(/dessell/g, "décel");
    },
    c5895s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D.*:[me]:[sp]", false);
    },
    c5897s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false);
    },
    s5897s_1: function (s, m) {
        return m[2].replace(/î/g, "i");
    },
    c5907s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:[vn]ous|lui|leur|et toi) +$|[nm]’$/i);
    },
    s5917s_1: function (s, m) {
        return m[1].replace(/and/g, "ant");
    },
    c5924s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! ( m[1] == "bonne" && look(s.slice(0,m.index), /\bune +$/i) && look(s.slice(m.end[0]), /^ +pour toute/i) );
    },
    c5928s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:faire|perdre|donner) ", false);
    },
    c5959s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":D", false);
    },
    s6055s_1: function (s, m) {
        return m[0].slice(0,-1).replace(/ /g, "-")+"à";
    },
    c6057s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":[NAQ]");
    },
    c6059s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":[123][sp]");
    },
    c6072s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[GQ]");
    },
    c6075s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[GQ]");
    },
    c6081s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[GQ]");
    },
    s6102s_1: function (s, m) {
        return m[0].replace(/ée/g, "er");
    },
    c6109s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">soulever ", false);
    },
    s6109s_1: function (s, m) {
        return m[1].slice(3);
    },
    c6127s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|habiter|trouver|situer|rester|demeurer?) ", false);
    },
    c6132s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false);
    },
    c6150s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return look(s.slice(0,m.index), /(?:la|une|cette|quelle|cette|[mts]a) +$/i);
    },
    c6157s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c6166s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c6189s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[1] == "Notre" && look(s.slice(m.end[0]), /Père/));
    },
    s6189s_1: function (s, m) {
        return m[1].replace(/otre/g, "ôtre");
    },
    c6192s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(les?|la|du|des|aux?) +/i) && morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    s6192s_1: function (s, m) {
        return m[1].replace(/ôtre/g, "otre")._trimRight("s");
    },
    c6202s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c6223s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! prevword1(s, m.index);
    },
    c6226s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ( (m[2].search(/^[nmts]e$/) >= 0) || (! (m[2].search(/^(?:confiance|envie|peine|prise|crainte|affaire|hâte|force|recours|somme)$/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":[0123][sp]", ":[QG]")) ) && morph(dDA, prevword1(s, m.index), ":Cs", false, true);
    },
    c6232s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:[1-3][sp])", ":(?:G|1p)") && ! ( m[0].indexOf(" leur ") && morph(dDA, [m.start[2], m[2]], ":[NA].*:[si]", false) ) && ! prevword1(s, m.index);
    },
    c6241s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false) && ! morph(dDA, nextword1(s, m.end[0]), ":(?:3s|Oo|X)", false);
    },
    c6256s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":3[sp]", ":Y");
    },
    c6260s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    s6272s_1: function (s, m) {
        return m[1].replace(/pin/g, "pain");
    },
    c6275s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:manger|dévorer|avaler|engloutir) ");
    },
    s6275s_1: function (s, m) {
        return m[2].replace(/pin/g, "pain");
    },
    c6289s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">aller ", false);
    },
    c6297s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    s6297s_1: function (s, m) {
        return m[2].replace(/pal/g, "pâl");
    },
    s6301s_1: function (s, m) {
        return m[1].replace(/pal/g, "pâl");
    },
    c6311s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">prendre ", false);
    },
    c6313s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">tirer ", false);
    },
    c6315s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c6319s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">prendre ", false);
    },
    c6337s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ]");
    },
    c6346s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:N|A|Q|G|MP)");
    },
    c6373s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ( m[0].endsWith("s") && look(s.slice(0,m.index), /\b(?:[mtscd]es|[nv]os|leurs|quels) $/i) ) || ( m[0].endsWith("e") && look(s.slice(0,m.index), /\b(?:mon|ce|quel|un|du) $/i) );
    },
    s6373s_1: function (s, m) {
        return m[0].replace(/que/g, "c");
    },
    c6384s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c6391s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, nextword1(s, m.end[0]), ":(?:Os|C)", false, true);
    },
    c6402s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":[AQ]", false);
    },
    c6443s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! nextword1(s, m.end[0]);
    },
    c6450s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">résonner ", false);
    },
    s6450s_1: function (s, m) {
        return m[1].replace(/réso/g, "raiso");
    },
    c6466s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":M1", false) && morph(dDA, prevword1(s, m.index), ":(?:R|[123][sp])", false, true);
    },
    s6486s_1: function (s, m) {
        return m[1].replace(/sale/g, "salle");
    },
    c6490s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    s6490s_1: function (s, m) {
        return m[2].replace(/salle/g, "sale");
    },
    s6509s_1: function (s, m) {
        return m[1].replace(/scep/g,"sep");
    },
    c6512s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|demeurer) ", false);
    },
    s6512s_1: function (s, m) {
        return m[2].replace(/sep/g, "scep");
    },
    c6522s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">suivre ", false);
    },
    c6530s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[0].search(/^soi-disant$/i) >= 0);
    },
    c6538s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(m.end[0]), / soit /);
    },
    c6540s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, nextword1(s, m.end[0]), ":[GY]", true, true) && ! look(s.slice(0,m.index), /quel(?:s|les?|) qu $|on $|il $/i) && ! look(s.slice(m.end[0]), / soit /);
    },
    c6546s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, prevword1(s, m.index), ":[YQ]|>(?:avec|contre|par|pour|sur) ", false, true);
    },
    c6568s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ( morphex(dDA, [m.start[2], m[2]], ":N.*:[me]:s", ":[GW]") || ((m[2].search(/^[aeéiîou]/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":N.*:f:s", ":G")) ) && ( look(s.slice(0,m.index), /^ *$|\b(?:à|avec|chez|dès|contre|devant|derrière|par|pour|sans|sur) +$|, +$| en +$|^en +$/i) || (morphex(dDA, prevword1(s, m.index), ":V", ":(?:G|W|[NA].*:[pi])") && ! look(s.slice(0,m.index), /\bce que?\b/i)) );
    },
    s6594s_1: function (s, m) {
        return m[1].replace(/sur/g, "sûr");
    },
    s6598s_1: function (s, m) {
        return m[1].replace(/sur/g, "sûr");
    },
    c6606s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":Y", false);
    },
    s6606s_1: function (s, m) {
        return m[1].replace(/sur/g, "sûr");
    },
    c6624s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":N", ":[GMY]|>(?:fonds?|grande (?:envergure|ampleur|importance)|envergure|ampleur|importance|départ|surveillance) ") && ! look(s.slice(0,m.index), /accompl|dél[éè]gu/);
    },
    s6624s_1: function (s, m) {
        return m[1].replace(/â/g, "a");
    },
    s6629s_1: function (s, m) {
        return m[1].replace(/â/g, "a");
    },
    c6644s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">aller ", false);
    },
    c6647s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    s6650s_1: function (s, m) {
        return m[1].replace(/au/g, "ô");
    },
    c6662s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false) && morph(dDA, [m.start[3], m[3]], ":Y|>(?:ne|en|y) ", false);
    },
    c6684s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false);
    },
    s6695s_1: function (s, m) {
        return m[1].replace(/énén/g, "enim");
    },
    s6698s_1: function (s, m) {
        return m[1].replace(/enim/g, "énén");
    },
    s6710s_1: function (s, m) {
        return m[1].replace(/re/g, "").replace(/t/g, "");
    },
    c6720s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]:s");
    },
    c6759s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[1]._isDigit() && ! m[2]._isDigit() && ! morph(dDA, [m.start[0], m[0]], ":", false) && ! morph(dDA, [m.start[2], m[2]], ":G", false) && _oDict.isValid(m[1]+m[2]);
    },
    c6759s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[2] != "là" && ! (m[1].search(/^(?:ex|mi|quasi|semi|non|demi|pro|anti|multi|pseudo|proto|extra)$/i) >= 0) && ! m[1]._isDigit() && ! m[2]._isDigit() && ! morph(dDA, [m.start[2], m[2]], ":G", false) && ! morph(dDA, [m.start[0], m[0]], ":", false) && ! _oDict.isValid(m[1]+m[2]);
    },
    c6774s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ,] +$/);
    },
    s6774s_1: function (s, m) {
        return m[0].toLowerCase();
    },
    c6783s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ,] +$/) && !( ( m[0]=="Juillet" && look(s.slice(0,m.index), /monarchie +de +$/i) ) || ( m[0]=="Octobre" && look(s.slice(0,m.index), /révolution +d’$/i) ) );
    },
    s6783s_1: function (s, m) {
        return m[0].toLowerCase();
    },
    c6809s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[0].search(/^fonctions? /i) >= 0) || ! look(s.slice(0,m.index), /\ben $/i);
    },
    s6814s_1: function (s, m) {
        return m[1].replace(/é/g, "É");
    },
    c6826s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[2]._isTitle() && morphex(dDA, [m.start[1], m[1]], ":N", ":(?:A|V0e|D|R|B)") && ! (m[0].search(/^[oO]céan Indien/i) >= 0);
    },
    s6826s_1: function (s, m) {
        return m[2].toLowerCase();
    },
    c6826s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[2]._isLowerCase() && ! m[2].startsWith("canadienne") && ( (m[1].search(/^(?:certaine?s?|cette|ce[ts]?|[dl]es|[nv]os|quelques|plusieurs|chaque|une|aux)$/i) >= 0) || ( (m[1].search(/^un$/i) >= 0) && ! look(s.slice(m.end[0]), /(?:approximatif|correct|courant|parfait|facile|aisé|impeccable|incompréhensible)/) ) );
    },
    s6826s_2: function (s, m) {
        return m[2]._toCapitalize();
    },
    s6845s_1: function (s, m) {
        return m[1]._toCapitalize();
    },
    c6853s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:parler|cours|leçon|apprendre|étudier|traduire|enseigner|professeur|enseignant|dictionnaire|méthode) ", false);
    },
    s6853s_1: function (s, m) {
        return m[2].toLowerCase();
    },
    s6858s_1: function (s, m) {
        return m[1].toLowerCase();
    },
    c6886s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ]/);
    },
    s6900s_1: function (s, m) {
        return m[1]._toCapitalize();
    },
    s6903s_1: function (s, m) {
        return m[1]._toCapitalize();
    },
    c6913s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (m[2].search(/^(?:Mètre|Watt|Gramme|Seconde|Ampère|Kelvin|Mole|Cand[eé]la|Hertz|Henry|Newton|Pascal|Joule|Coulomb|Volt|Ohm|Farad|Tesla|W[eé]ber|Radian|Stéradian|Lumen|Lux|Becquerel|Gray|Sievert|Siemens|Katal)s?|(?:Exa|P[ée]ta|Téra|Giga|Méga|Kilo|Hecto|Déc[ai]|Centi|Mi(?:lli|cro)|Nano|Pico|Femto|Atto|Ze(?:pto|tta)|Yo(?:cto|etta))(?:mètre|watt|gramme|seconde|ampère|kelvin|mole|cand[eé]la|hertz|henry|newton|pascal|joule|coulomb|volt|ohm|farad|tesla|w[eé]ber|radian|stéradian|lumen|lux|becquerel|gray|sievert|siemens|katal)s?/) >= 0);
    },
    s6913s_1: function (s, m) {
        return m[2].toLowerCase();
    },
    c6929s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":Y");
    },
    s6929s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c6936s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V1") && ! m[1].slice(0,1)._isUpperCase() && (m[1].endsWith("z") || ! look(s.slice(0,m.index), /\b(?:quelqu(?:e chose|’une?)|(?:l(es?|a)|nous|vous|me|te|se)[ @]trait|personne|rien(?: +[a-zéèêâîûù]+|) +$)/i));
    },
    s6936s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c6946s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":M[12P]");
    },
    s6946s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c6953s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V1", false);
    },
    s6953s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c6960s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":[123][sp]");
    },
    c6967s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":[NM]") && ! morph(dDA, prevword1(s, m.index), ">(?:tenir|passer) ", false);
    },
    s6967s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c6975s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V1", false);
    },
    s6975s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c6982s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":[NM]");
    },
    s6982s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c6989s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":Q", false) && ! morph(dDA, prevword1(s, m.index), "V0.*[12]p", false);
    },
    c6996s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:devoir|savoir|pouvoir) ", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Q|A|[123][sp])", ":[GYW]");
    },
    s6996s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c7005s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:V1.*:Q|[13]s|2[sp])", ":[GYWM]") && ! look(s.slice(0,m.index), /\bque? +$/i);
    },
    s7005s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c7016s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:commencer|finir) ", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":[NGM]") && ! m[2].slice(0,1)._isUpperCase();
    },
    s7016s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c7027s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":A", false);
    },
    s7027s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c7047s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c7051s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">sembler ", false);
    },
    c7067s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c7072s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V[123]_i", false) && isNextNotCOD(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c7074s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":A", false) && morphex(dDA, [m.start[2], m[2]], ":A", ":[GM]");
    },
    c7076s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":A", false);
    },
    c7078s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GV]") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c7081s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":V0") && morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:G|[123][sp]|P)");
    },
    c7092s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c7096s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /[jn]’$/);
    },
    c7104s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":[GY]") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c7107s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c7110s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c7114s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! prevword1(s, m.index);
    },
    c7117s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":N", ":[GY]") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c7119s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c7121s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":Y") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c7173s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (m[2].search(/^(?:fini|terminé)s?/i) >= 0) && morph(dDA, prevword1(s, m.index), ":C", false, true);
    },
    c7173s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (m[2].search(/^(?:assez|trop)$/i) >= 0) && (look(s.slice(m.end[0]), /^ +d(?:e |’)/) || ! nextword1(s, m.end[0]));
    },
    c7173s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":A", ":[GVW]") && morph(dDA, prevword1(s, m.index), ":C", false, true);
    },
    c7193s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">aller", false) && ! look(s.slice(m.end[0]), / soit /);
    },
    c7201s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":[AN].*:[me]:[pi]|>(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) .*:[123]p|>(?:affirmer|trouver|croire|désirer|estime|préférer|penser|imaginer|voir|vouloir|aimer|adorer|souhaiter) ") && ! morph(dDA, nextword1(s, m.end[0]), ":A.*:[me]:[pi]", false);
    },
    c7218s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    s7218s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c7225s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    s7225s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c7232s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    s7232s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c7240s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:faire|vouloir) ", false) && ! look(s.slice(0,m.index), /\b(?:en|[mtsld]es?|[nv]ous|un) +$/i) && morphex(dDA, [m.start[2], m[2]], ":V", ":M") && ! ((m[1].search(/^(?:fait|vouloir)$/i) >= 0) && m[2].endsWith("é")) && ! ((m[1].search(/^(?:fait|vouloir)s$/i) >= 0) && m[2].endsWith("és"));
    },
    s7240s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c7251s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":M");
    },
    s7251s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c7259s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":M");
    },
    s7259s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c7267s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">savoir :V", false) && morph(dDA, [m.start[2], m[2]], ":V", false) && ! look(s.slice(0,m.index), /\b(?:[mts]e|[vn]ous|les?|la|un) +$/i);
    },
    s7267s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c7275s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Q|2p)", false);
    },
    s7275s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c7283s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|2p)", ":N");
    },
    s7283s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c7291s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":Q", false);
    },
    s7291s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c7300s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">être ", false);
    },
    c7300s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":Y", false);
    },
    s7300s_2: function (s, m) {
        return suggVerbPpas(m[2]);
    },
    c7300s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! bCondMemo && morph(dDA, [m.start[1], m[1]], ":[123]s", false) && morph(dDA, [m.start[2], m[2]], ":Q.*:p", false) && ! look(s.slice(0,m.index), /\bque?[, ]/i);
    },
    s7300s_3: function (s, m) {
        return suggSing(m[2]);
    },
    c7351s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (morph(dDA, [m.start[1], m[1]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[1].endsWith(" été")) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s7351s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c7372s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (morph(dDA, [m.start[1], m[1]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[1].endsWith(" été")) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s7372s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c7381s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]"));
    },
    s7381s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c7395s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (morph(dDA, [m.start[1], m[1]], ">seule ", false) && look(s.slice(m.end[0]), /^ +que? /)) && ( morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[GWYsi]") || ( morphex(dDA, [m.start[1], m[1]], ":[AQ].*:f", ":[GWYme]") && ! morph(dDA, nextword1(s, m.end[0]), ":N.*:f", false, false) ) );
    },
    s7395s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c7406s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[GWYsi]") || ( morphex(dDA, [m.start[1], m[1]], ":[AQ].*:f", ":[GWYme]") && ! morph(dDA, nextword1(s, m.end[0]), ":N.*:f", false, false) );
    },
    s7406s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c7414s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || ( morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]") && ! morph(dDA, nextword1(s, m.end[0]), ":N.*:f", false, false) ) ) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s7414s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c7426s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && ! morph(dDA, prevword1(s, m.index), ":R|>de ", false, false);
    },
    s7426s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c7440s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]"));
    },
    s7440s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c7449s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[2].search(/^légion$/i) >= 0) && ! look(s.slice(0,m.index), /\b(?:nous|ne) +$/i) && ((morph(dDA, [m.start[1], m[1]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) && morph(dDA, [m.start[1], m[1]], ":1p", false)) || m[1].endsWith(" été")) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWYpi]");
    },
    s7449s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c7460s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[3].search(/^légion$/i) >= 0) && (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && ! look(s.slice(0,m.index), /ce que? +$/i) && (! (m[1].search(/^(?:ceux-(?:ci|là)|lesquels)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s7460s_1: function (s, m) {
        return suggMasPlur(m[3]);
    },
    c7479s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[3].search(/^légion$/i) >= 0) && (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && (! (m[1].search(/^(?:elles|celles-(?:ci|là)|lesquelles)$/i) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s7479s_1: function (s, m) {
        return suggFemPlur(m[3]);
    },
    c7492s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false) && morphex(dDA, [m.start[2], m[2]], ":[123]s", ":[GNAQWY]");
    },
    s7492s_1: function (s, m) {
        return suggVerbPpas(m[2]);
    },
    c7504s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s7504s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c7517s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s7517s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c7527s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]"));
    },
    s7527s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c7540s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[MWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s7540s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c7550s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s7550s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c7560s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[MWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]"));
    },
    s7560s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c7569s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[2].search(/^légion$/i) >= 0) && morph(dDA, [m.start[1], m[1]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && morph(dDA, [m.start[1], m[1]], ":1p", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWYpi]");
    },
    s7569s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c7579s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[3].search(/^légion$/i) >= 0) && morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && (! (m[1].search(/^(?:ceux-(?:ci|là)|lesquels)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s7579s_1: function (s, m) {
        return suggMasPlur(m[3]);
    },
    c7589s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[3].search(/^légion$/i) >= 0) && morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && (! (m[1].search(/^(?:elles|celles-(?:ci|là)|lesquelles)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s7589s_1: function (s, m) {
        return suggFemPlur(m[3]);
    },
    c7607s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GMWYsi]") && ! morph(dDA, [m.start[1], m[1]], ":G", false);
    },
    s7607s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c7612s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[2].search(/^légion$/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWYpi]") && ! morph(dDA, [m.start[1], m[1]], ":G", false);
    },
    s7612s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c7620s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[3].search(/^légion$/i) >= 0) && ((morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWme]") && morphex(dDA, [m.start[2], m[2]], ":m", ":[Gfe]")) || (morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWfe]") && morphex(dDA, [m.start[2], m[2]], ":f", ":[Gme]"))) && ! ( morph(dDA, [m.start[3], m[3]], ":p", false) && morph(dDA, [m.start[2], m[2]], ":s", false) ) && ! morph(dDA, prevword1(s, m.index), ":(?:R|P|Q|Y|[123][sp])", false, false) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s7620s_1: function (s, m) {
        return switchGender(m[3]);
    },
    c7640s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[2].search(/^légion$/i) >= 0) && ((morphex(dDA, [m.start[1], m[1]], ":M[1P].*:f", ":[GWme]") && morphex(dDA, [m.start[2], m[2]], ":m", ":[GWfe]")) || (morphex(dDA, [m.start[1], m[1]], ":M[1P].*:m", ":[GWfe]") && morphex(dDA, [m.start[2], m[2]], ":f", ":[GWme]"))) && ! morph(dDA, prevword1(s, m.index), ":(?:R|P|Q|Y|[123][sp])", false, false) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s7640s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c7659s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:p", ":(?:G|E|M1|W|s|i)");
    },
    s7659s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c7667s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[fp]", ":(?:G|E|M1|W|m:[si])");
    },
    s7667s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c7675s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[mp]", ":(?:G|E|M1|W|f:[si])|>(?:désoler|pire) ");
    },
    s7675s_1: function (s, m) {
        return suggFemSing(m[1]);
    },
    c7683s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[fs]", ":(?:G|E|M1|W|m:[pi])|>(?:désoler|pire) ");
    },
    s7683s_1: function (s, m) {
        return suggMasPlur(m[1]);
    },
    c7695s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[ms]", ":(?:G|E|M1|W|f:[pi])|>(?:désoler|pire) ");
    },
    s7695s_1: function (s, m) {
        return suggFemPlur(m[1]);
    },
    c7705s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], "V0e", false) && m[3] != "rendu";
    },
    c7715s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]");
    },
    s7715s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c7719s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]");
    },
    s7719s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c7723s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|[NAQ].*:[pf])", ":(?:G|W|[me]:[si])|question ") && ! (m[1] == "ce" && morph(dDA, [m.start[2], m[2]], ":Y", false));
    },
    s7723s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c7727s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:[pm])", ":(?:G|W|[fe]:[si])");
    },
    s7727s_1: function (s, m) {
        return suggFemSing(m[1]);
    },
    c7731s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]");
    },
    s7731s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c7735s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[1].search(/^légion$/i) >= 0) && (morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]") || morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|[AQ].*:f)", ":[GWme]"));
    },
    s7735s_1: function (s, m) {
        return suggMasPlur(m[1]);
    },
    c7739s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[1].search(/^légion$/i) >= 0) && (morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]") || morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|[AQ].*:m)", ":[GWfe]"));
    },
    s7739s_1: function (s, m) {
        return suggFemPlur(m[1]);
    },
    c7770s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":[QWGBMpi]") && ! (m[1].search(/^(?:légion|nombre|cause)$/i) >= 0) && ! look(s.slice(0,m.index), /\bce que?\b/i);
    },
    s7770s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c7770s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! bCondMemo && morphex(dDA, [m.start[1], m[1]], ":V", ":(?:N|A|Q|W|G|3p)") && ! look(s.slice(0,m.index), /\bce que?\b/i);
    },
    s7770s_2: function (s, m) {
        return suggVerbPpas(m[1], ":m:p");
    },
    c7781s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s7781s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c7789s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s7789s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c7797s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWsi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[GWYme]")) && (! (m[1].search(/^(?:celui-(?:ci|là)|lequel)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s7797s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c7807s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWsi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[GWYfe]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s7807s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c7818s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWsi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[GWYfe]"));
    },
    s7818s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c7827s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWpi]");
    },
    s7827s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c7835s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWpi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[GWYme]")) && (! (m[1].search(/^(?:ceux-(?:ci|là)|lesquels)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s7835s_1: function (s, m) {
        return suggMasPlur(m[3]);
    },
    c7845s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWpi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[GWYfe]")) && (! (m[1].search(/^(?:elles|celles-(?:ci|là)|lesquelles)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s7845s_1: function (s, m) {
        return suggFemPlur(m[3]);
    },
    c7855s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire|rendre|voilà) ", false) && morphex(dDA, [m.start[2], m[2]], ":[AQ]:(?:[me]:p|f)", ":(?:G|Y|[AQ]:m:[is])");
    },
    s7855s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c7859s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire|rendre|voilà) ", false) && morphex(dDA, [m.start[2], m[2]], ":[AQ]:(?:[fe]:p|m)", ":(?:G|Y|[AQ]:f:[is])");
    },
    s7859s_1: function (s, m) {
        return suggFemSing(m[2]);
    },
    c7863s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire|rendre|voilà) ", false) && morphex(dDA, [m.start[2], m[2]], ":[AQ].*:s", ":(?:G|Y|[AQ].*:[ip])");
    },
    s7863s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c7867s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ">(?:trouver|considérer|croire|rendre|voilà) ", false) && morphex(dDA, [m.start[3], m[3]], ":[AQ].*:p", ":(?:G|Y|[AQ].*:[is])");
    },
    s7867s_1: function (s, m) {
        return suggSing(m[3]);
    },
    c7871s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire|rendre) .*:3s", false) && morphex(dDA, [m.start[2], m[2]], ":[AQ].*:p", ":(?:G|Y|[AQ].*:[is])");
    },
    s7871s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c7871s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire|rendre) .*:3p", false) && morphex(dDA, [m.start[2], m[2]], ":[AQ].*:s", ":(?:G|Y|[AQ].*:[ip])");
    },
    s7871s_2: function (s, m) {
        return suggSing(m[2]);
    },
    c7877s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ( morphex(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire|rendre|voilà) ", ":1p") || (morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) .*:1p", false) && look(s.slice(0,m.index), /\bn(?:ous|e) +$/)) ) && morphex(dDA, [m.start[2], m[2]], ":[AQ].*:s", ":(?:G|Y|[AQ].*:[ip])");
    },
    s7877s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c7907s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false) && morph(dDA, [m.start[3], m[3]], ":Y", false);
    },
    c7909s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[3].search(/^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$/i) >= 0) && morph(dDA, prevword1(s, m.index), ">puisque? ", false, true) && morph(dDA, [m.start[2], m[2]], ":V0a", false) && ! m[3]._isUpperCase() && morphex(dDA, [m.start[3], m[3]], ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])");
    },
    s7909s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c7919s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[4].search(/^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$/i) >= 0) && morph(dDA, prevword1(s, m.index), ">puisque? ", false, true) && morph(dDA, [m.start[3], m[3]], ":V0a", false) && ! m[4]._isUpperCase() && morphex(dDA, [m.start[4], m[4]], ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])");
    },
    s7919s_1: function (s, m) {
        return suggMasSing(m[4]);
    },
    c7930s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:s", ":[GWpi]");
    },
    s7930s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c7939s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return look(s.slice(m.end[0]), /^ *$/) && morph(dDA, [m.start[2], m[2]], ":V0a", false) && morphex(dDA, [m.start[1], m[1]], ":(?:M|Os|N)", ":R") && morphex(dDA, [m.start[3], m[3]], ":V[0-3]..t_.*:Q.*:s", ":[GWpi]") && ! look(s.slice(0,m.index), /\bque +$/);
    },
    s7939s_1: function (s, m) {
        return suggPlur(m[3]);
    },
    c7949s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]");
    },
    s7949s_1: function (s, m) {
        return m[2].slice(0,-1);
    },
    c7958s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":V0a", false) && morphex(dDA, [m.start[3], m[3]], ":V[0-3]..t_.*:Q.*:p", ":[GWsi]") && ! look(s.slice(0,m.index), /\bque? /);
    },
    s7958s_1: function (s, m) {
        return m[3].slice(0,-1);
    },
    c7967s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false) && morphex(dDA, [m.start[2], m[2]], ":Q.*:(?:f|m:p)", ":m:[si]");
    },
    s7967s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c7976s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[1].search(/^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$/i) >= 0) && morphex(dDA, [m.start[1], m[1]], ":Q.*:(?:f|m:p)", ":m:[si]") && look(s.slice(0,m.index), /(?:après +$|sans +$|pour +$|que? +$|quand +$|, +$|^ *$)/i);
    },
    s7976s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c8017s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Y|[123][sp])", ":[QGWMX]");
    },
    s8017s_1: function (s, m) {
        return suggVerbPpas(m[2], ":m:s");
    },
    c8030s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[3], m[3]], ":V0a", false) && ! (((m[4].search(/^(?:décidé|essayé|tenté)$/) >= 0) && look(s.slice(m.end[0]), / +d(?:e |’)/)) || ((m[4].search(/^réussi$/) >= 0) && look(s.slice(m.end[0]), / +à/))) && morph(dDA, [m.start[2], m[2]], ":[NAQ]", false) && morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:s", ":[GWpi]") && ! morph(dDA, nextword1(s, m.end[0]), ":(?:Y|Oo|D)", false);
    },
    s8030s_1: function (s, m) {
        return suggPlur(m[4], m[2]);
    },
    c8045s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[3], m[3]], ":V0a", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m", false) && (morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:f", ":[GWme]") || morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]"));
    },
    s8045s_1: function (s, m) {
        return suggMasSing(m[4]);
    },
    c8060s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[3], m[3]], ":V0a", false) && ! (((m[4].search(/^(?:décidé|essayé|tenté)$/) >= 0) && look(s.slice(m.end[0]), / +d(?:e |’)/)) || ((m[4].search(/^réussi$/) >= 0) && look(s.slice(m.end[0]), / +à/))) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f", false) && (morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:m", ":[GWfe]") || morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]")) && ! morph(dDA, nextword1(s, m.end[0]), ":(?:Y|Oo)|>que?", false);
    },
    s8060s_1: function (s, m) {
        return suggFemSing(m[4]);
    },
    c8077s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && (morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:f", ":[GWme]") || morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]"));
    },
    s8077s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c8087s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[1].search(/^(?:A|avions)$/) >= 0) && morph(dDA, [m.start[1], m[1]], ":V0a", false) && morph(dDA, [m.start[2], m[2]], ":V.+:(?:Y|2p)", false);
    },
    s8087s_1: function (s, m) {
        return suggVerbPpas(m[2], ":m:s");
    },
    c8096s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && (morph(dDA, [m.start[3], m[3]], ":Y") || (m[3].search(/^(?:[mtsn]e|[nv]ous|leur|lui)$/) >= 0));
    },
    c8101s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && (morph(dDA, [m.start[3], m[3]], ":Y") || (m[3].search(/^(?:[mtsn]e|[nv]ous|leur|lui)$/) >= 0));
    },
    c8110s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":[NAQ].*:[me]", false);
    },
    c8113s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c8137s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Y|2p|Q.*:[fp])", ":m:[si]") && m[2] != "prise" && ! morph(dDA, prevword1(s, m.index), ">(?:les|[nv]ous|en)|:[NAQ].*:[fp]", false) && ! look(s.slice(0,m.index), /\b(?:quel(?:le|)s?|combien) /i);
    },
    s8137s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c8144s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Y|2p|Q.*:[fp])", ":m:[si]") && m[2] != "prise" && ! morph(dDA, prevword1(s, m.index), ">(?:les|[nv]ous|en)|:[NAQ].*:[fp]", false) && ! look(s.slice(0,m.index), /\b(?:quel(?:le|)s?|combien) /i);
    },
    s8144s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c8151s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":V0a", false) && morphex(dDA, [m.start[3], m[3]], ":(?:Y|2p|Q.*:p)", ":[si]");
    },
    s8151s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c8157s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[123]..t.*:Q.*:s", ":[GWpi]");
    },
    s8157s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c8172s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:G|Y|P|1p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|tu|ils?|elles?|on|[vn]ous) /);
    },
    s8172s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c8179s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:G|Y|P|2p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|ils?|elles?|on|[vn]ous) /);
    },
    s8179s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c8192s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":2p", ":(?:3[sp]|P)");
    },
    s8192s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c8196s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":1p", ":(?:3[sp]|P)");
    },
    s8196s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c8225s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":G");
    },
    c8236s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V[13].*:Ip.*:2s", ":[GNAM]");
    },
    s8236s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c8240s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V[13].*:Ip.*:2s", ":G");
    },
    s8240s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c8253s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[MYOs]");
    },
    c8261s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V[23].*:Ip.*:3s", ":[GNA]") && analyse(m[1].slice(0,-1)+"s", ":E:2s", false) && ! (m[1].search(/^(?:doit|suffit)$/i) >= 0) && ! ((m[1].search(/^vient$/i) >= 0) && look(s.slice(m.end[0]), / +l[ea]/));
    },
    s8261s_1: function (s, m) {
        return m[1].slice(0,-1)+"s";
    },
    c8266s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V[23].*:Ip.*:3s", ":G") && analyse(m[1].slice(0,-1)+"s", ":E:2s", false);
    },
    s8266s_1: function (s, m) {
        return m[1].slice(0,-1)+"s";
    },
    c8277s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V3.*:Ip.*:3s", ":[GNA]");
    },
    c8281s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V3.*:Ip.*:3s", ":G");
    },
    c8299s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":A", ":G") && ! look(s.slice(m.end[0]), /\bsoit\b/);
    },
    c8320s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[1], m[1]], ":E|>chez", false) && _oDict.isValid(m[1]);
    },
    s8320s_1: function (s, m) {
        return suggVerbImpe(m[1]);
    },
    c8326s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[1], m[1]], ":E|>chez", false) && _oDict.isValid(m[1]);
    },
    s8326s_1: function (s, m) {
        return suggVerbTense(m[1], ":E", ":2s");
    },
    c8354s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]");
    },
    c8363s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:Y|3[sp])", true) && morph(dDA, prevword1(s, m.index), ":Cc", false, true) && ! look(s.slice(0,m.index), /~ +$/);
    },
    c8372s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:N|A|Q|Y|B|3[sp])", true) && morph(dDA, prevword1(s, m.index), ":Cc", false, true) && ! look(s.slice(0,m.index), /~ +$/);
    },
    c8381s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:N|A|Q|Y|MP)", true) && morph(dDA, prevword1(s, m.index), ":Cc", false, true) && ! look(s.slice(0,m.index), /~ +$/);
    },
    c8396s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[0].endsWith("t-en") && look(s.slice(0,m.index), /\bva$/i) && morph(dDA, nextword1(s, m.end[0]), ">guerre ", false, false));
    },
    c8404s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":(?:G|M[12])") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:Y|[123][sp])", true);
    },
    s8404s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c8413s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":E", false);
    },
    s8413s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c8422s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":E", false) && morphex(dDA, nextword1(s, m.end[0]), ":[RC]", ":[NAQ]", true);
    },
    s8422s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c8431s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":E", false) && morphex(dDA, nextword1(s, m.end[0]), ":[RC]", ":Y", true);
    },
    s8431s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c8440s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    s8440s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c8443s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! prevword1(s, m.index) && ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    s8446s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c8466s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, true);
    },
    c8467s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    c8469s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] == "le" && ! morph(dDA, [m.start[2], m[2]], ":N.*:[me]:[si]");
    },
    c8469s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] == "la" && ! morph(dDA, [m.start[2], m[2]], ":N.*:[fe]:[si]");
    },
    c8469s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] == "les" && ! morph(dDA, [m.start[2], m[2]], ":N.*:.:[pi]");
    },
    c8473s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    c8475s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]");
    },
    c8476s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":[123]s", false, false);
    },
    c8477s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:[123]s|R)", false, false);
    },
    c8478s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:[123]p|R)", false, false);
    },
    c8479s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, prevword1(s, m.index), ":3p", false, false);
    },
    c8480s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false);
    },
    c8481s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y)", ":(?:[NAQ].*:m:[si]|G|M)");
    },
    c8482s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y)", ":(?:[NAQ].*:f:[si]|G|M)");
    },
    c8483s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y)", ":(?:[NAQ].*:[si]|G|M)");
    },
    c8484s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y)", ":(?:[NAQ].*:[si]|G|M)");
    },
    c8486s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y)", ":(?:A|G|M|1p)");
    },
    c8487s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y)", ":(?:A|G|M|2p)");
    },
    c8489s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    c8490s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! prevword1(s, m.index);
    },
    c8491s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    c8492s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":2s", false) || look(s.slice(0,m.index), /\b(?:je|tu|on|ils?|elles?|nous) +$/i);
    },
    c8493s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":2s|>(ils?|elles?|on) ", false) || look(s.slice(0,m.index), /\b(?:je|tu|on|ils?|elles?|nous) +$/i);
    },
    c8507s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V", false) && m[2] != "A";
    },
    c8511s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V", false) && m[2] != "A";
    },
    c8515s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":Y") && m[2] != "A";
    },
    c8534s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:ce que?|tout) /i);
    },
    c8548s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":M") && ! (m[1].endsWith("ez") && look(s.slice(m.end[0]), / +vous/));
    },
    s8548s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c8556s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|2p)", ":M");
    },
    s8556s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c8564s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:aimer|aller|désirer|devoir|espérer|pouvoir|préférer|souhaiter|venir) ", false) && ! morph(dDA, [m.start[1], m[1]], ":[GN]", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":M");
    },
    s8564s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c8573s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">devoir ", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":M") && ! morph(dDA, prevword1(s, m.index), ":D", false);
    },
    s8573s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c8581s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:cesser|décider|défendre|suggérer|commander|essayer|tenter|choisir|permettre|interdire) ", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Q|2p)", ":M");
    },
    s8581s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c8589s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|2p)", ":M");
    },
    s8589s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c8597s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">valoir ", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Q|2p)", ":[GM]");
    },
    s8597s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c8605s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":[NM]") && ! m[1]._isTitle() && ! look(s.slice(0,m.index), /> +$/);
    },
    s8605s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c8614s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false) && morphex(dDA, [m.start[2], m[2]], ":V1", ":N");
    },
    s8614s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c8622s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[Q123][sp]?", ":Y");
    },
    s8622s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c8638s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false) && (morphex(dDA, [m.start[2], m[2]], ":Y", ":[NAQ]") || m[2] in aSHOULDBEVERB) && ! (m[1].search(/^(?:soit|été)$/i) >= 0) && ! morph(dDA, prevword1(s, m.index), ":Y|>ce", false, false) && ! look(s.slice(0,m.index), /ce (?:>|qu|que >) $/i) && ! look_chk1(dDA, s.slice(0,m.index), 0, /({w_2}) +> $/i, ":Y") && ! look_chk1(dDA, s.slice(0,m.index), 0, /^ *>? *([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ-]+)/i, ":Y");
    },
    s8638s_1: function (s, m) {
        return suggVerbPpas(m[2]);
    },
    c8651s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[1], m[1]], ":1s|>(?:en|y)", false);
    },
    s8651s_1: function (s, m) {
        return suggVerb(m[1], ":1s");
    },
    c8655s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:1s", false, false));
    },
    s8655s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c8659s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G|1p)");
    },
    s8659s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c8663s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G|1p)");
    },
    s8663s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c8667s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G|1p|3p!)");
    },
    s8667s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c8688s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|[ISK].*:2s)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:2s", false, false));
    },
    s8688s_1: function (s, m) {
        return suggVerb(m[2], ":2s");
    },
    c8692s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|[ISK].*:2s)");
    },
    s8692s_1: function (s, m) {
        return suggVerb(m[2], ":2s");
    },
    c8696s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|2p|3p!|[ISK].*:2s)");
    },
    s8696s_1: function (s, m) {
        return suggVerb(m[2], ":2s");
    },
    c8709s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3s", false, false));
    },
    s8709s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c8709s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && morph(dDA, [m.start[2], m[2]], ":3p", false);
    },
    c8714s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)");
    },
    s8714s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c8714s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && morph(dDA, [m.start[2], m[2]], ":3p", false);
    },
    c8732s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3s", false, false));
    },
    s8732s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c8736s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)");
    },
    s8736s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c8746s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3s|P|G|Q.*:m:[si])");
    },
    s8746s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c8750s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3s|P|G)");
    },
    s8750s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c8760s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:N|A|3s|P|Q|G|V0e.*:3p)");
    },
    s8760s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c8765s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|Q|G)");
    },
    s8765s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c8775s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|Q|G|3p!)") && ! morph(dDA, prevword1(s, m.index), ":[VR]|>de", false, false);
    },
    s8775s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c8795s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3s|P|Q|G|3p!)") && ! morph(dDA, prevword1(s, m.index), ":[VRD]|>de", false, false) && !( morph(dDA, [m.start[1], m[1]], ":(?:Y|N.*:m:[si])", false) && ! (m[0].search(/ (?:qui|>) /) >= 0) );
    },
    s8795s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c8806s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|Q|G|3p!)") && ! morph(dDA, prevword1(s, m.index), ":[VR]|>de", false, false) && !( morph(dDA, [m.start[2], m[2]], ":Y", false) && ! (m[0].search(/ (?:qui|>) /) >= 0) );
    },
    s8806s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c8817s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":3s", false);
    },
    s8817s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c8817s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[2], m[2]], ":3s", false) || look(s.slice(0,m.index), /\b(?:ils?|on) +/i);
    },
    c8830s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && ! morph(dDA, prevword1(s, m.index), ":R|>(?:et|ou)", false, false) && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3s", false, false));
    },
    s8830s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c8830s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && morph(dDA, [m.start[2], m[2]], ":3p", false);
    },
    c8836s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && ! morph(dDA, prevword1(s, m.index), ":R|>(?:et|ou)", false, false);
    },
    s8836s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c8836s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && morph(dDA, [m.start[2], m[2]], ":3p", false);
    },
    s8855s_1: function (s, m) {
        return m[1].slice(0,-1)+"t";
    },
    c8863s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P|Q|[123][sp]|R)", true) && !( m[1].endsWith("ien") && look(s.slice(0,m.index), /> +$/) && morph(dDA, [m.start[2], m[2]], ":Y", false) );
    },
    s8863s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c8882s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G|Q)") && morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P|Q|[123][sp]|R)", true);
    },
    s8882s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c8887s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P|Q|[123][sp]|R)", true);
    },
    s8887s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c8897s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":Y", false) && morph(dDA, [m.start[2], m[2]], ":V.[a-z_!?]+(?!.*:(?:3s|P|Q|Y|3p!))");
    },
    s8897s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c8906s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! ((m[0].search(/^une? +(?:dizaine|douzaine|quinzaine|vingtaine|trentaine|quarantaine|cinquantaine|soixantaine|centaine|majorité|minorité|millier|poignée) /i) >= 0) && morph(dDA, [m.start[3], m[3]], ":3p", false)) && morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:3s|P|Q|Y|3p!|G)") && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":[1-3]p", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i) && ! checkAgreement(m[2], m[3]);
    },
    s8906s_1: function (s, m) {
        return suggVerb(m[3], ":3s");
    },
    c8912s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! ((m[0].search(/^une? +(?:dizaine|douzaine|quinzaine|vingtaine|trentaine|quarantaine|cinquantaine|soixantaine|centaine|majorité|minorité|millier|poignée) /i) >= 0) && morph(dDA, [m.start[3], m[3]], ":3p", false)) && morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:3s|1p|P|Q|Y|3p!|G)") && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":[123]p", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i);
    },
    s8912s_1: function (s, m) {
        return suggVerb(m[3], ":3s");
    },
    c8939s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && isAmbiguousAndWrong(m[2], m[3], ":s", ":3s") && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":(?:[123]p|p)", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i);
    },
    s8939s_1: function (s, m) {
        return suggVerb(m[3], ":3s", suggSing);
    },
    c8945s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && isVeryAmbiguousAndWrong(m[2], m[3], ":s", ":3s", ! prevword1(s, m.index)) && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":(?:[123]p|p)", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i);
    },
    s8945s_1: function (s, m) {
        return suggVerb(m[3], ":3s", suggSing);
    },
    c8962s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ( morph(dDA, [m.start[0], m[0]], ":1s") || ( look(s.slice(0,m.index), /> +$/) && morph(dDA, [m.start[0], m[0]], ":1s", false) ) ) && ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ]/)) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) )/i);
    },
    s8962s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c8967s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[0], m[0]], ":2s", ":(?:E|G|W|M|J|[13][sp]|2p)") && ! m[0].slice(0,1)._isUpperCase() && ! look(s.slice(0,m.index), /^ *$/) && ( ! morph(dDA, [m.start[0], m[0]], ":[NAQ]", false) || look(s.slice(0,m.index), /> +$/) ) && ! look(sx.slice(0,m.index), /\bt(?:u |[’']|oi,? qui |oi seul )/i);
    },
    s8967s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c8973s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[0], m[0]], ":2s", ":(?:G|W|M|J|[13][sp]|2p)") && ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ]/)) && ( ! morph(dDA, [m.start[0], m[0]], ":[NAQ]", false) || look(s.slice(0,m.index), /> +$/) ) && ! look(sx.slice(0,m.index), /\bt(?:u |[’']|oi,? qui |oi seul )/i);
    },
    s8973s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c8979s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[0], m[0]], ":[12]s", ":(?:E|G|W|M|J|3[sp]|2p|1p)") && ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ]/)) && ( ! morph(dDA, [m.start[0], m[0]], ":[NAQ]", false) || look(s.slice(0,m.index), /> +$/) || ( (m[0].search(/^étais$/i) >= 0) && ! morph(dDA, prevword1(s, m.index), ":[DA].*:p", false, true) ) ) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))/i);
    },
    s8979s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c8985s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ]/)) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))/i);
    },
    s8985s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c8989s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ]/)) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))/i);
    },
    s8989s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c9002s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:1p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|tu|ils?|elles?|on|[vn]ous)/);
    },
    s9002s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c9006s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":1p") && ! look(s.slice(m.end[0]), /^ +(?:je|tu|ils?|elles?|on|[vn]ous)/);
    },
    s9006s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c9010s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":1p") && ! look(s.slice(m.end[0]), /^ +(?:ils|elles)/);
    },
    s9010s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c9022s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:2p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|ils?|elles?|on|[vn]ous)/);
    },
    s9022s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c9026s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":2p") && ! look(s.slice(m.end[0]), /^ +(?:je|ils?|elles?|on|[vn]ous)/);
    },
    s9026s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c9037s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[0], m[0]], ":V.*:1p", ":[EGMNAJ]") && ! (m[0].slice(0,1)._isUpperCase() && look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ]/)) && ! look(sx.slice(0,m.index), /\b(?:[nN]ous(?:-mêmes?|)|[eE]t moi(?:-même|)|[nN]i (?:moi|nous)),? /);
    },
    s9037s_1: function (s, m) {
        return suggVerb(m[0], ":3p");
    },
    c9042s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[0], m[0]], ":V.*:2p", ":[EGMNAJ]") && ! (m[0].slice(0,1)._isUpperCase() && look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ]/)) && ! look(sx.slice(0,m.index), /\b(?:[vV]ous(?:-mêmes?|)|[eE]t toi(?:-même|)|[tT]oi(?:-même|) et|[nN]i (?:vous|toi)),? /);
    },
    c9059s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3p", false, false));
    },
    s9059s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c9059s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && morph(dDA, [m.start[2], m[2]], ":3s", false);
    },
    c9064s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|G)");
    },
    s9064s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c9064s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && morph(dDA, [m.start[2], m[2]], ":3s", false);
    },
    c9074s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)");
    },
    s9074s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c9083s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false) && ! (morph(dDA, [m.start[2], m[2]], ":Y", false) && (m[1].search(/lesquel/i) >= 0) && ! (m[0].search(/ qui |>/) >= 0));
    },
    s9083s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c9093s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":R", false, false) && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3p", false, false));
    },
    s9093s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c9093s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && morph(dDA, [m.start[2], m[2]], ":3s", false);
    },
    c9098s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|G)") && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s9098s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c9098s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return bCondMemo && morph(dDA, [m.start[2], m[2]], ":3s", false);
    },
    c9118s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:à|avec|sur|chez|par|dans|parmi|contre|ni|de|pour|sous) +$/i);
    },
    c9129s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":[VR]|>de ", false, false);
    },
    s9129s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c9134s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false);
    },
    s9134s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c9147s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|N|A|3p|P|Q)") && ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false);
    },
    s9147s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c9156s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:[13]p|P|Q|Y|G|A.*:e:[pi])") && morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && ! checkAgreement(m[2], m[3]) && !( morph(dDA, [m.start[3], m[3]], ":3s", false) && look(s.slice(0,m.index), /\b(?:le|ce(?:tte|t|)|[mts](?:on|a)) .+ entre .+ et /i) );
    },
    s9156s_1: function (s, m) {
        return suggVerb(m[3], ":3p");
    },
    c9161s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:[13]p|P|Y|G)") && morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && !( morph(dDA, [m.start[3], m[3]], ":3s", false) && look(s.slice(0,m.index), /\b(?:le|ce(?:tte|t|)|[mts](?:on|a)) .+ entre .+ et /i) );
    },
    s9161s_1: function (s, m) {
        return suggVerb(m[3], ":3p");
    },
    c9185s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":(?:[13]p|P|G|Q)") && morph(dDA, nextword1(s, m.end[0]), ":(?:R|D.*:p)|>au ", false, true);
    },
    s9185s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c9189s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":(?:[13]p|P|G)");
    },
    s9189s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c9199s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isAmbiguousAndWrong(m[2], m[3], ":p", ":3p");
    },
    s9199s_1: function (s, m) {
        return suggVerb(m[3], ":3p", suggPlur);
    },
    c9208s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isVeryAmbiguousAndWrong(m[1], m[2], ":p", ":3p", ! prevword1(s, m.index));
    },
    s9208s_1: function (s, m) {
        return suggVerb(m[2], ":3p", suggPlur);
    },
    c9226s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isVeryAmbiguousAndWrong(m[1], m[2], ":m:p", ":3p", ! prevword1(s, m.index));
    },
    s9226s_1: function (s, m) {
        return suggVerb(m[2], ":3p", suggMasPlur);
    },
    c9234s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isVeryAmbiguousAndWrong(m[1], m[2], ":f:p", ":3p", ! prevword1(s, m.index));
    },
    s9234s_1: function (s, m) {
        return suggVerb(m[2], ":3p", suggFemPlur);
    },
    c9246s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V0e", ":3s");
    },
    s9246s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c9255s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V0e.*:3s", ":3p");
    },
    s9255s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c9265s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V0e", ":3p");
    },
    s9265s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c9274s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":V0e.*:3p", ":3s");
    },
    c9287s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(0,m.index), /\b(?:et |ou |[dD][eu] |ni |[dD]e l’) *$/) && morph(dDA, [m.start[1], m[1]], ":M", false) && morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:G|3s|3p!|P|M|[AQ].*:[si])") && ! morph(dDA, prevword1(s, m.index), ":[VRD]", false, false) && ! look(s.slice(0,m.index), /([A-ZÉÈ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ-]+), +([A-ZÉÈ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ-]+), +$/) && ! (morph(dDA, [m.start[2], m[2]], ":3p", false) && prevword1(s, m.index));
    },
    s9287s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c9305s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":M", false) && morph(dDA, [m.start[2], m[2]], ":M", false) && morphex(dDA, [m.start[3], m[3]], ":[123][sp]", ":(?:G|3p|P|Q.*:[pi])") && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s9305s_1: function (s, m) {
        return suggVerb(m[3], ":3p");
    },
    c9319s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[12]s|3p)", ":(?:3s|G|W|3p!)") && ! look(s.slice(m.end[0]), /^ +(?:et|ou) (?:l(?:es? |a |’|eurs? )|[mts](?:a|on|es) |ce(?:tte|ts|) |[nv]o(?:s|tre) |d(?:u|es) )/);
    },
    s9319s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c9335s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[123]s", ":(?:3p|G|W)");
    },
    s9335s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c9343s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[12][sp]", ":(?:G|W|3[sp]|Y|P|Q|N)");
    },
    s9343s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c9351s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[12][sp]", ":(?:G|W|3[sp])");
    },
    s9351s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c9361s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V.*:1[sŝś]", ":[GNW]") && ! look(s.slice(0,m.index), /\bje +>? *$/i) && ! morph(dDA, nextword1(s, m.end[0]), ":(?:Oo|X|1s)", false, false);
    },
    s9361s_1: function (s, m) {
        return m[1].slice(0,-1)+"é-je";
    },
    c9365s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V.*:1s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:je|tu) +>? *$/i) && ! morph(dDA, nextword1(s, m.end[0]), ":(?:Oo|X|1s)", false, false);
    },
    c9369s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:2s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:je|tu) +>? *$/i);
    },
    c9373s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:3s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:ce|il|elle|on) +>? *$/i);
    },
    s9373s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c9377s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:3s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:ce|il|elle|on) +>? *$/i);
    },
    c9381s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:1p", ":[GNW]") && ! morph(dDA, prevword1(s, m.index), ":Os", false, false) && ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    c9386s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && ! m[1].endsWith("euillez") && morphex(dDA, [m.start[1], m[1]], ":V.*:2p", ":[GNW]") && ! morph(dDA, prevword1(s, m.index), ":Os", false, false) && ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    c9391s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:3p", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:ce|ils|elles) +>? *$/i);
    },
    s9391s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c9408s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":1[sśŝ]");
    },
    s9408s_1: function (s, m) {
        return suggVerb(m[1], ":1ś");
    },
    c9408s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    s9408s_2: function (s, m) {
        return suggSimil(m[1], ":1[sśŝ]");
    },
    c9418s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":[ISK].*:2s");
    },
    s9418s_1: function (s, m) {
        return suggVerb(m[1], ":2s");
    },
    c9418s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    s9418s_2: function (s, m) {
        return suggSimil(m[1], ":2s");
    },
    c9427s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":3s");
    },
    s9427s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c9427s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] != "t" && (! m[1].endsWith("oilà") || m[2] != "il") && morphex(dDA, [m.start[1], m[1]], ":", ":V");
    },
    s9427s_2: function (s, m) {
        return suggSimil(m[1], ":3s");
    },
    c9427s_3: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! m[2].endsWith(("n", "N")) && morphex(dDA, [m.start[1], m[1]], ":3p", ":3s");
    },
    c9442s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:1p|E:2[sp])");
    },
    s9442s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c9442s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":", ":V|>chez ");
    },
    s9442s_2: function (s, m) {
        return suggSimil(m[1], ":1p");
    },
    c9451s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":2p");
    },
    s9451s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c9451s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return ! morph(dDA, [m.start[1], m[1]], ":V|>chez ", false);
    },
    s9451s_2: function (s, m) {
        return suggSimil(m[1], ":2p");
    },
    c9461s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":3p") && _oDict.isValid(m[1]);
    },
    s9461s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c9461s_2: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return m[1] != "t" && ! morph(dDA, [m.start[1], m[1]], ":V", false) && _oDict.isValid(m[1]);
    },
    s9461s_2: function (s, m) {
        return suggSimil(m[1], ":3p");
    },
    c9475s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false) && morph(dDA, [m.start[2], m[2]], ":V.......e_.*:Q", false);
    },
    c9478s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false) && morph(dDA, [m.start[2], m[2]], ":V.......e_.*:Q", false);
    },
    c9492s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":[YX]|>y ", "R");
    },
    c9508s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[2], m[2]], ":[YX]", false);
    },
    c9522s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && morphex(dDA, [m.start[2], m[2]], ":[SK]", ":(?:G|V0|I)") && ! prevword1(s, m.index);
    },
    c9526s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":[SK]", ":(?:G|V0|I)") && ! prevword1(s, m.index);
    },
    c9536s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && morphex(dDA, [m.start[2], m[2]], ":S", ":[IG]");
    },
    s9536s_1: function (s, m) {
        return suggVerbMode(m[2], ":I", m[1]);
    },
    c9547s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ">(?:afin|pour|quoi|permettre|falloir|vouloir|ordonner|exiger|désirer|douter|préférer|suffire) ", false) && morph(dDA, [m.start[2], m[2]], ":(?:Os|M)", false) && ! morph(dDA, [m.start[3], m[3]], ":[GYS]", false) && ! (morph(dDA, [m.start[1], m[1]], ">douter ", false) && morph(dDA, [m.start[3], m[3]], ":(?:If|K)", false));
    },
    s9547s_1: function (s, m) {
        return suggVerbMode(m[3], ":S", m[2]);
    },
    c9564s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && ! morph(dDA, [m.start[2], m[2]], ":[GYS]", false);
    },
    s9564s_1: function (s, m) {
        return suggVerbMode(m[2], ":S", m[1]);
    },
    c9572s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[2], m[2]], ":S", ":[GIK]") && ! (m[2].search(/^e(?:usse|û[mt]es|ût)/) >= 0);
    },
    s9572s_1: function (s, m) {
        return suggVerbMode(m[2], ":I", m[1]);
    },
    c9576s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morphex(dDA, [m.start[1], m[1]], ":S", ":[GIK]") && m[1] != "eusse";
    },
    s9576s_1: function (s, m) {
        return suggVerbMode(m[1], ":I", "je");
    },
    c9587s_1: function (s, sx, m, dDA, sCountry, bCondMemo) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && (morph(dDA, [m.start[2], m[2]], ":V.*:S") || morph(dDA, [m.start[2], m[2]], ":V0e.*:S", false));
    },
    s9587s_1: function (s, m) {
        return suggVerbMode(m[2], ":I", m[1]);
    },
}





exports.load = load;
exports.parse = parse;
exports.lang = lang;
exports.version = version;
exports.getDictionary = getDictionary;
exports.setOption = setOption;
exports.setOptions = setOptions;
exports.getOptions = getOptions;
exports.resetOptions = resetOptions;
exports.ignoreRule = ignoreRule;
exports.reactivateRule = reactivateRule;
exports.resetIgnoreRules = resetIgnoreRules;
exports.listRules = listRules;
