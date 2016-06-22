// Grammalecte - Suggestion phonétique

// generated data

const _dWord = new Map (${dWord});

const _lSet = ${lSet};

// end of generated data

function hasSimil (sWord) {
    // return True if there is list of words phonetically similar to sWord
    if (!sWord) {
        return false;
    }
    if (sWord.slice(0,1)._isUpperCase()) {
        sWord = sWord.toLowerCase();
    }
    return _dWord.has(sWord);
}

function getSimil (sWord) {
    // return list of words phonetically similar to sWord
    if (!sWord) {
        return [];
    }
    if (sWord.slice(0,1)._isUpperCase()) {
        sWord = sWord.toLowerCase();
    }
    if (_dWord.has(sWord)) {
        return _lSet[_dWord.get(sWord)];
    }
    return [];
}

exports.hasSimil = hasSimil;
exports.getSimil = getSimil;
