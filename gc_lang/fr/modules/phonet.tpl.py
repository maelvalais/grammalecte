# -*- encoding: UTF-8 -*-
# Grammalecte - Suggestion phonétique
# License: GPL 3

import re


## generated data

_dWord = ${dWord}

_lSet = ${lSet}

## end of generated data


def hasSimil (sWord):
    "return True if there is list of words phonetically similar to sWord"
    if not sWord:
        return False
    if sWord[0:1].isupper():
        sWord = sWord.lower()
    if sWord in _dWord:
        return True
    return False


def getSimil (sWord):
    "return list of words phonetically similar to sWord"
    if not sWord:
        return []
    if sWord[0:1].isupper():
        sWord = sWord.lower()
    if sWord in _dWord:
        return _lSet[_dWord[sWord]]
    return []
