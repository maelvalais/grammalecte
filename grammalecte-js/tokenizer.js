// JavaScript
// Very simple tokenizer

"use strict";

const helpers = require("resource://grammalecte/helpers.js");


const aPatterns = {
    // All regexps must start with ^.
    "default":
        [
            [/^[ ,.;!?«»“” ]+/, 'SEPARATOR'],
            [/^(?:https?:\/\/|www[.]|[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ_]+[@.][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ_]+[@.])[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ_.\/?&!%=+*"'@$#-]+/, 'LINK'],
            [/^[#@][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ_-]+/, 'TAG'],
            [/^<[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]+.*?>|<\/[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]+ *>/, 'HTML'],
            [/^\[\/?[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]+\]/, 'PSEUDOHTML'],
            [/^&\w+;(?:\w+;|)/, 'HTMLENTITY'],
            [/^\d\d?h\d\d\b/, 'HOUR'],
            [/^-?\d+(?:[.,]\d+|)/, 'NUM'],
            [/^[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]+(?:[’'`-][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]+)*/, 'WORD']
        ],
    "fr":
        [
            [/^[ ,.;!?«»“” ]+/, 'SEPARATOR'],
            [/^(?:https?:\/\/|www[.]|[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ_]+[@.][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ_]+[@.])[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ_.\/?&!%=+*"'@$#-]+/, 'LINK'],
            [/^[#@][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ_-]+/, 'TAG'],
            [/^<[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]+.*?>|<\/[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]+ *>/, 'HTML'],
            [/^\[\/?[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]+\]/, 'PSEUDOHTML'],
            [/^&\w+;(?:\w+;|)/, 'HTMLENTITY'],
            [/^(?:l|d|n|m|t|s|j|c|ç|lorsqu|puisqu|jusqu|quoiqu|qu)['’`]/i, 'ELPFX'],
            [/^\d\d?[hm]\d\d\b/, 'HOUR'],
            [/^\d+(?:er|nd|e|de|ième|ème|eme)\b/, 'ORDINAL'],
            [/^-?\d+(?:[.,]\d+|)/, 'NUM'],
            [/^[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]+(?:[’'`-][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]+)*/, 'WORD']
        ]
}


class Tokenizer {

    constructor (sLang) {
        this.sLang = sLang;
        if (!aPatterns.hasOwnProperty(sLang)) {
            this.sLang = "default";
        }
        this.aRules = aPatterns[sLang];
    };

    * genTokens (sText) {
        let m;
        let i = 0;
        while (sText) {
            let nCut = 1;
            for (let [zRegex, sType] of this.aRules) {
                try {
                    if ((m = zRegex.exec(sText)) !== null) {
                        yield { "sType": sType, "sValue": m[0], "nStart": i, "nEnd": i + m[0].length }
                        nCut = m[0].length;
                        break;
                    }
                }
                catch (e) {
                    helpers.logerror(e);
                }
            }
            i += nCut;
            sText = sText.slice(nCut);
        }
    }
}

exports.Tokenizer = Tokenizer;
