// JavaScript

"use strict";


const helpers = require("resource://grammalecte/helpers.js");


class TestGrammarChecking {

    constructor (gce) {
        this.gce = gce;
    };

    * testParse (bDebug=false) {
        const t0 = Date.now();
        const aData = require("resource://grammalecte/"+this.gce.lang+"/tests_data.js").aData;
        let nInvalid = 0
        let nTotal = 0
        let sErrorText;
        let sSugg;
        let sExpectedErrors;
        let sTextToCheck;
        let sFoundErrors;
        let sListErr;
        let sLineNum;
        let i = 1;
        yield "Tests [" + this.gce.lang + "]: " + aData.length.toString();
        try {
            for (let sLine of aData) {
                sLineNum = sLine.slice(0,10).trim();
                sLine = sLine.slice(10).trim();
                if (sLine.length > 0 && !sLine.startsWith("#")) {
                    if (sLine.includes("->>")) {
                        [sErrorText, sSugg] = sLine.split("->>");
                        sErrorText = sErrorText.trim();
                        sSugg = sSugg.trim();
                    } else {
                        sErrorText = sLine.trim();
                    }
                    sExpectedErrors = this._getExpectedErrors(sErrorText);
                    sTextToCheck = sErrorText.replace(/\{\{/g, "").replace(/\}\}/g, "");
                    [sFoundErrors, sListErr] = this._getFoundErrors(sTextToCheck, bDebug);
                    if (sExpectedErrors !== sFoundErrors) {
                        yield "\n" + i.toString() +
                              "\n# Line num: " + sLineNum +
                              "\n> to check: " + sTextToCheck +
                              "\n  expected: " + sExpectedErrors +
                              "\n  found:    " + sFoundErrors +
                              "\n  errors:   \n" + sListErr;
                        nInvalid = nInvalid + 1
                    }
                    nTotal = nTotal + 1;
                }
                i = i + 1;
                if (i % 100 === 0) {
                    yield i.toString();
                }
            }
        }
        catch (e) {
            helpers.logerror(e);
        }

        const t1 = Date.now();
        yield "Tests parse finished in " + ((t1-t0)/1000).toString()
            + " s\nTotal errors: " + nInvalid.toString() + " / " + nTotal.toString();
    };

    _getExpectedErrors (sLine) {
        try {
            let sRes = " ".repeat(sLine.length);
            let z = /\{\{.+?\}\}/g;
            let m;
            let i = 0;
            while ((m = z.exec(sLine)) !== null) {
                let nStart = m.index - (4 * i);
                let nEnd = m.index + m[0].length - (4 * (i+1));
                sRes = sRes.slice(0, nStart) + "~".repeat(nEnd - nStart) + sRes.slice(nEnd, -4);
                i = i + 1;
                // Warning! JS sucks: infinite loop if writing directly /\{\{.+?\}\}/g.exec(sLine)
                // lines below to remove when I know why.
                if (i > 10) {
                    console.log("\ninfinite loop?\nline:"+sLine+"\nm: "+ m.toString());
                    break;
                }
            }
            return sRes;
        }
        catch (e) {
            helpers.logerror(e);
        }
        return " ".repeat(sLine.length);
    };

    _getFoundErrors (sLine, bDebug) {
        try {
            let aErrs = this.gce.parse(sLine, "FR", bDebug);
            let sRes = " ".repeat(sLine.length);
            let sListErr = "";
            for (let dErr of aErrs) {
                sRes = sRes.slice(0, dErr["nStart"]) + "~".repeat(dErr["nEnd"] - dErr["nStart"]) + sRes.slice(dErr["nEnd"]);
                sListErr += "    * {" + dErr['sRuleId'] + "}  at  " + dErr['nStart'] + ":" + dErr['nEnd'] + "\n";
            }
            return [sRes, sListErr];
        }
        catch (e) {
            helpers.logerror(e);
        }
        return [" ".repeat(sLine.length), ""];
    };

}

exports.TestGrammarChecking = TestGrammarChecking;
