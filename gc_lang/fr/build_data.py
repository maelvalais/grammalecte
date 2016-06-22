#!python3

# FRENCH DATA BUILDER
#
# by Olivier R.
# License: MPL 2


from string import Template

import grammalecte.ibdawg as ibdawg
from grammalecte.echo import echo


def defineSuffixCode (s1, s2):
    """ Returns a string defining how to get s2 from s1
            "n(sfx)"
        with n: a char with numeric meaning, "0" = 0, "1" = 1, ... ":" = 10, etc. (See ASCII table.) Says how many letters to strip from flexion.
             sfx [optional]: string to add on flexion
        Examples:
            "0": strips nothing, adds nothing
            "1er": strips 1 letter, adds "er"
            "2": strips 2 letters, adds nothing
    """
    if s1 == s2:
        return "0"
    jSfx = 0
    for i in range(min(len(s1), len(s2))):
        if s1[i] != s2[i]:
            break
        jSfx += 1
    return chr(len(s1)-jSfx+48) + s2[jSfx:] # 48 is the ASCII code for "0"

def modifyStringWithSuffixCode (s, sSfx):
    if sSfx == "0":
        return s
    return s[:-(ord(sSfx[0])-48)] + sSfx[1:]  if sSfx[0] != '0'  else s + sSfx[1:] # 48 is the ASCII code for "0"


def makeConj (sp, bJS=False):
    print("make conjugaison")
    dVerb = {}
    lVtyp = []; dVtyp = {}; nVtyp = 0
    lTags = []; dTags = {}; nTags = 0

    dPatternList = { ":PQ": [], ":Ip": [], ":Iq": [], ":Is": [], ":If": [], ":K": [], ":Sp": [], ":Sq": [], ":E": [] }
    dTrad = {   "infi": ":Y", "ppre": ":PQ", "ppas": ":PQ",
                "ipre": ":Ip", "iimp": ":Iq", "ipsi": ":Is", "ifut": ":If",
                "spre": ":Sp", "simp": ":Sq",
                "cond": ":K", "impe": ":E",
                "1sg": ":1s", "2sg": ":2s", "3sg": ":3s", "1pl": ":1p", "2pl": ":2p", "3pl": ":3p", "1isg": ":1ś",
                "mas sg": ":Q1", "mas pl": ":Q2", "mas inv": ":Q1", "fem sg": ":Q3", "fem pl": ":Q4", "epi inv": ":Q1"
            }

    # read lexicon
    with open(sp+"/data/dictConj.txt", 'r', encoding='utf-8') as hSrc:
        nStop = 0
        for n, line in enumerate(hSrc.readlines()):
            line = line.strip()
            nTab = line.count("\t")
            if nTab == 1:
                # new entry
                sLemma, sVtyp = line.split("\t")
                dConj = {   ":PQ": { ":P": "", ":Q1": "", ":Q2": "", ":Q3": "", ":Q4": ""},
                            ":Ip": { ":1s": "", ":2s": "", ":3s": "", ":1p": "", ":2p": "", ":3p": "", ":1ś": "" },
                            ":Iq": { ":1s": "", ":2s": "", ":3s": "", ":1p": "", ":2p": "", ":3p": "" },
                            ":Is": { ":1s": "", ":2s": "", ":3s": "", ":1p": "", ":2p": "", ":3p": "" },
                            ":If": { ":1s": "", ":2s": "", ":3s": "", ":1p": "", ":2p": "", ":3p": "" },
                            ":K": { ":1s": "", ":2s": "", ":3s": "", ":1p": "", ":2p": "", ":3p": "" },
                            ":Sp": { ":1s": "", ":2s": "", ":3s": "", ":1p": "", ":2p": "", ":3p": "", ":1ś": "" },
                            ":Sq": { ":1s": "", ":2s": "", ":3s": "", ":1p": "", ":2p": "", ":3p": "", ":1ś": "" },
                            ":E": { ":2s": "", ":1p": "", ":2p": "" }
                        }
                if sVtyp not in lVtyp:
                    dVtyp[sVtyp] = nVtyp
                    lVtyp.append(sVtyp)
                    nVtyp += 1
            elif nTab == 2:
                # flexion
                _, sTag, sFlex = line.split("\t")
                if sTag.count(" ") == 0:
                    if sTag == "ppre":
                        dConj[":PQ"][":P"] = defineSuffixCode(sLemma, sFlex)
                else:
                    mode, g = sTag.split(maxsplit=1)
                    try:
                        mode = dTrad[mode]
                        g = dTrad[g]
                        if dConj[mode][g] == "":
                            dConj[mode][g] = defineSuffixCode(sLemma, sFlex)
                        else:
                            # comment gérer les autres graphies ?
                            pass
                    except:
                        print(sLemma.encode("utf-8").decode("ascii"), " - non géré: ", mode, " / ", g)
            elif line == "$":
                # we store the dictionary of rules for this lemma
                if dConj[":Ip"][":1ś"] == "2è":
                    dConj[":Ip"][":1ś"] = "2é"
                elif sLemma == "pouvoir":
                    dConj[":Ip"][":1ś"] = "6uis"
                lConjTags = []
                for key in [":PQ", ":Ip", ":Iq", ":Is", ":If", ":K", ":Sp", ":Sq", ":E"]:
                    bFound = False
                    for i, d in enumerate(dPatternList[key]):
                        if dConj[key] == d:
                            bFound = True
                            lConjTags.append(i)
                            break
                    if not bFound:
                        lConjTags.append(len(dPatternList[key]))
                        dPatternList[key].append(dConj[key])
                tConjTags = tuple(lConjTags)
                if tConjTags not in lTags:
                    dTags[tConjTags] = nTags
                    lTags.append(tConjTags)
                    nTags += 1
                dVerb[sLemma] = (dVtyp[sVtyp], dTags[tConjTags])
            else:
                print("# Error - unknown line #", n)
        hSrc.close()

    # convert tuples to bytes string
    # si ça merde toute la partie conversion peut être supprimée
    # lBytesTags = []
    # for t in lTags:
    #     b = b""
    #     for n in t:
    #         if n > 255:
    #             print("Erreur : l'indice ne peut être supérieur à 256 pour utiliser des chaînes d’octets (bytes strings)")
    #             exit()
    #         b += n.to_bytes(1, byteorder="big")
    #     lBytesTags.append(b)
    # lTags = lBytesTags

    # for key in dVerb.keys():
    #     b = b""
    #     for n in dVerb[key]:
    #         if n > 255:
    #             print("Erreur : l'indice ne peut être supérieur à 256 pour utiliser des chaînes d’octets (bytes strings)")
    #             exit()
    #         b += n.to_bytes(1, byteorder="big")
    #     dVerb[key] = b
    # end conversion


    ## write file for Python
    dTpl = { "lVtyp": str(lVtyp), "lTags": str(lTags), "dPatternConj": str(dPatternList), "dVerb": str(dVerb) }
    with open(sp+"/modules/conj.py", "w", encoding="utf-8") as hDst:
        hDst.write( Template(open(sp+"/modules/conj.tpl.py", "r", encoding="utf-8").read()).safe_substitute(dTpl) )
    dTpl.clear()

    if bJS:
        ## write file for JavaScript
        for i, t in enumerate(lTags):
            lTags[i] = list(t)
        #
        lEntry = []
        while True:
            try:
                k, v = dVerb.popitem()
            except KeyError:
                break
            lEntry.append([k, list(v)])
        #
        sPatternConj = "[ "
        for k1, lDict in dPatternList.items():
            sPatternConj += "['" + k1 + "', ["
            for d in lDict:
                l = [ [k2, v2] for k2, v2 in d.items() ]
                sPatternConj += "new Map (" + str(l) + "), "
            sPatternConj = sPatternConj.rstrip(" ,") + "]],  "
        sPatternConj = sPatternConj.rstrip(" ,") + " ]"

        dTpl = { "lVtyp": str(lVtyp), "lTags": str(lTags), "dPatternConj": sPatternConj, "dVerb": str(lEntry) }
        with open(sp+"/modules-js/conj.js", "w", encoding="utf-8") as hDst:
            hDst.write( Template(open(sp+"/modules-js/conj.tpl.js", "r", encoding="utf-8").read()).safe_substitute(dTpl) )


def makeMfsp (sp, bJS=False):
    print("make masculin-féminin-singulier-pluriel")
    aPlurS = set()
    dTag = {}
    lTagMasForm = []
    lTagMiscPlur = []
    dMiscPlur = {}
    dMasForm = {}
    # read lexicon
    with open(sp+"/data/dictDecl.txt", 'r', encoding='utf-8') as hSrc:
        lTag = []
        lTagMasPl = []
        for n, line in enumerate(hSrc.readlines()):
            line = line.strip()
            nTab = line.count("\t")
            if nTab == 1:
                # new entry
                lTag.clear()
                lTagMasPl.clear()
                sLemma, sFlags = line.split("\t")
                if sFlags.startswith("S"):
                    cType = "s"
                elif sFlags.startswith("X"):
                    cType = "p"
                elif sFlags.startswith("A"):
                    cType = "p"
                elif sFlags.startswith("I"):
                    cType = "p"
                elif sFlags.startswith("F"):
                    cType = "m"
                elif sFlags.startswith("W"):
                    cType = "m"
                else:
                    cType = "?"
                    print(" > inconnu : " + sFlags)
            elif nTab == 2:
                if cType == "s":
                    continue
                _, sFlexTags, sFlex = line.split("\t")
                if cType == "p":
                    if sFlexTags.endswith("pl"):
                        lTag.append(defineSuffixCode(sLemma, sFlex))
                elif cType == "m":
                    if sFlexTags.endswith("mas sg") or sFlexTags.endswith("mas inv"):
                        lTag.append(defineSuffixCode(sLemma, sFlex))
                    if sFlexTags.endswith("mas pl"):
                        lTagMasPl.append(defineSuffixCode(sLemma, sFlex))
                else:
                    print("erreur: " + cType)
            elif line == "$":
                if cType == "s":
                    aPlurS.add(sLemma)
                elif cType == "p":
                    sTag = "|".join(lTag)
                    if sTag not in dTag:
                        dTag[sTag] = len(lTagMiscPlur)
                        lTagMiscPlur.append(sTag)
                    dMiscPlur[sLemma] = dTag[sTag]
                elif cType == "m":
                    sTag = "|".join(lTag)
                    if lTagMasPl:
                        sTag += "/" + "|".join(lTagMasPl)
                    if sTag not in dTag:
                        dTag[sTag] = len(lTagMasForm)
                        lTagMasForm.append(sTag)
                    dMasForm[sLemma] = dTag[sTag]
                else:
                    print("unknown tag: " + ctype)
            else:
                print("# Error - unknown line #", n)
        hSrc.close()

    ## write file for Python
    dTpl = { "lTagMasForm": str(lTagMasForm), "lTagMiscPlur": str(lTagMiscPlur), "dMiscPlur": str(dMiscPlur), "dMasForm": str(dMasForm) }
    with open(sp+"/modules/mfsp.py", "w", encoding="utf-8") as hDst:
        hDst.write( Template(open(sp+"/modules/mfsp.tpl.py", "r", encoding="utf-8").read()).safe_substitute(dTpl) )
    dTpl.clear()

    if bJS:
        ## write file for JavaScript
        dTpl = { "lTagMasForm": str(lTagMasForm), \
                 "lTagMiscPlur": str(lTagMiscPlur), \
                 "dMiscPlur": str([ [k,v]  for k, v in dMiscPlur.items() ]), \
                 "dMasForm": str([ [k,v]  for k, v in dMasForm.items() ]) }
        with open(sp+"/modules-js/mfsp.js", "w", encoding="utf-8") as hDst:
            hDst.write( Template(open(sp+"/modules-js/mfsp.tpl.js", "r", encoding="utf-8").read()).safe_substitute(dTpl) )


def makePhonetTable (sp, bJS=False):
    print("make phonet tables")
    
    try:
        oDict = ibdawg.IBDAWG("french.bdic")
    except:
        traceback.print_exc()
        return

    with open(sp+"/data/phonet_simil.txt", 'r', encoding='utf-8') as hSrc:
        lSet = []
        for sLine in hSrc.readlines():
            if not sLine.startswith("#") and sLine.strip():
                lSet.append(sorted(sLine.strip().split()))
        dWord = {}
        for i, aSet in enumerate(lSet):
            for sWord in aSet:
                if oDict.lookup(sWord):
                    dWord[sWord] = i  # warning, what if word in several sets?
                else:
                    echo("Mot inconnu : " + sWord)

    # write file for Python
    dTpl = { "dWord": str(dWord), "lSet": str(lSet) }
    with open(sp+"/modules/phonet.py", "w", encoding="utf-8") as hDst:
        hDst.write( Template(open(sp+"/modules/phonet.tpl.py", "r", encoding="utf-8").read()).safe_substitute(dTpl) )
    
    if bJS:
        ## write file for JavaScript
        dTpl = { "lSet": str(lSet), \
                 "dWord": str([ [k,v]  for k, v in dWord.items() ]) }

        with open(sp+"/modules-js/phonet.js", "w", encoding="utf-8") as hDst:
            hDst.write( Template(open(sp+"/modules-js/phonet.tpl.js", "r", encoding="utf-8").read()).safe_substitute(dTpl) )
    dTpl.clear()


def main (spLaunch, bJS=False):
    print("========== Build French data ==========")
    makeMfsp(spLaunch, bJS)
    makeConj(spLaunch, bJS)
    makePhonetTable(spLaunch, bJS)


if __name__ == '__main__':
    main(".")
        