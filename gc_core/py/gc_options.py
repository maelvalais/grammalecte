# -*- encoding: UTF-8 -*-

def getUI (sLang):
    if sLang in _dOptLabel:
        return _dOptLabel[sLang]
    return _dOptLabel["fr"]

lStructOpt = ${lStructOpt}

dOpt = ${dOpt}

_dOptLabel = ${dOptLabel}
