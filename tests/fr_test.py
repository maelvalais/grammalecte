#! python3
# coding: UTF-8

import unittest
import os
import re
import time

try:
    import grammalecte.ibdawg as ibdawg
    import grammalecte.fr as gce
    import grammalecte.fr.conj as conj
    import grammalecte.fr.phonet as phonet
    import grammalecte.fr.mfsp as mfsp
except ImportError:
    import sys
    sys.path.append(os.path.abspath('.'))
    sys.path.append(os.path.abspath('..'))
    import grammalecte.ibdawg as ibdawg
    import grammalecte.fr as gce
    import grammalecte.fr.conj as conj
    import grammalecte.fr.phonet as phonet
    import grammalecte.fr.mfsp as mfsp


class TestDictionary (unittest.TestCase):

    @classmethod
    def setUpClass (cls):
        cls.oDic = ibdawg.IBDAWG("french.bdic")

    def test_lookup (self):
        for sWord in ["branche", "Émilie"]:
            self.assertTrue(self.oDic.lookup(sWord), sWord)

    def test_lookup_failed (self):
        for sWord in ["Branche", "BRANCHE", "BranchE", "BRanche", "BRAnCHE", "émilie"]:
            self.assertFalse(self.oDic.lookup(sWord), sWord)

    def test_isvalid (self):
        for sWord in ["Branche", "branche", "BRANCHE", "Émilie", "ÉMILIE", "aujourd'hui", "aujourd’hui", "Aujourd'hui", "Aujourd’hui"]:
            self.assertTrue(self.oDic.isValid(sWord), sWord)

    def test_isvalid_failed (self):
        for sWord in ["BranchE", "BRanche", "BRAnCHE", "émilie", "éMILIE", "émiLie"]:
            self.assertFalse(self.oDic.isValid(sWord), sWord)


class TestConjugation (unittest.TestCase):

    @classmethod
    def setUpClass (cls):
        pass

    def test_isverb (self):
        for sVerb in ["avoir", "être", "aller", "manger", "courir", "venir", "faire", "finir"]:
            self.assertTrue(conj.isVerb(sVerb), sVerb)
        for sVerb in ["berk", "a", "va", "contre", "super", "", "à"]:
            self.assertFalse(conj.isVerb(sVerb), sVerb)

    def test_hasconj (self):
        for sVerb, sTense, sWho in [("aller", ":E", ":2s"), ("avoir", ":Is", ":1s"), ("être", ":Ip", ":2p"),
                                    ("manger", ":Sp", ":3s"), ("finir", ":K", ":3p"), ("prendre", ":If", ":1p")]:
            self.assertTrue(conj.hasConj(sVerb, sTense, sWho), sVerb)

    def test_getconj (self):
        for sVerb, sTense, sWho, sConj in [("aller", ":E", ":2s", "va"), ("avoir", ":Iq", ":1s", "avais"), ("être", ":Ip", ":2p", "êtes"),
                                           ("manger", ":Sp", ":3s", "mange"), ("finir", ":K", ":3p", "finiraient"), ("prendre", ":If", ":1p", "prendrons")]:
            self.assertEqual(conj.getConj(sVerb, sTense, sWho), sConj, sVerb)


class TestPhonet (unittest.TestCase):

    @classmethod
    def setUpClass (cls):
        cls.lSet = [
            ["ce", "se"],
            ["ces", "ses", "sais", "sait"],
            ["cet", "cette", "sept", "set", "sets"],
            ["dé", "dés", "dès", "dais", "des"],
            ["don", "dons", "dont"],
            ["été", "étais", "était", "étai", "étés", "étaient"],
            ["faire", "faire", "fer", "fers", "ferre", "ferres", "ferrent"],
            ["fois", "foi", "foie", "foies"],
            ["la", "là", "las"],
            ["mes", "mets", "met", "mai", "mais"],
            ["mon", "mont", "monts"],
            ["mot", "mots", "maux"],
            ["moi", "mois"],
            ["notre", "nôtre", "nôtres"],
            ["or", "ors", "hors"],
            ["ou", "où", "houx"],
            ["pair", "pairs", "paire", "paires", "père", "pères"],
            ["peu", "peux", "peut"],
            ["ses", "ces", "sais", "sait"],
            ["son", "sons", "sont"],
            ["tes", "taie", "taies", "thé", "thés"],
            ["toi", "toit", "toits"],
            ["ton", "tons", "thon", "thons"],
            ["veau", "veaux", "vaux", "vaut"],
            ["voir", "voire"]
        ]

    def test_getsimil (self):
        for aSet in self.lSet:
            for sWord in aSet:
                self.assertListEqual(phonet.getSimil(sWord), sorted(aSet))


class TestMasFemSingPlur (unittest.TestCase):

    @classmethod
    def setUpClass (cls):
        cls.lPlural = [
            ("travail", ["travaux"]),
            ("vœu", ["vœux"]),
            ("gentleman", ["gentlemans", "gentlemen"])
        ]

    def test_getplural (self):
        for sSing, lPlur in self.lPlural:
            self.assertListEqual(mfsp.getMiscPlural(sSing), lPlur)


class TestGrammarChecking (unittest.TestCase):

    @classmethod
    def setUpClass (cls):
        gce.load()
        cls._zError = re.compile(r"\{\{.*?\}\}")

    def test_parse (self):
        for sf in [ "gc_test.txt" ]:
            with self.subTest(msg=sf):
                with open("./tests/fr/"+sf, "r", encoding="utf-8") as hSrc:
                    for sLine in ( s for s in hSrc if not s.startswith("#") and s.strip() ):
                        sLineNum = sLine[:10].strip()
                        sLine = sLine[10:].strip()
                        if "->>" in sLine:
                            sErrorText, sExceptedSuggs = self._splitTestLine(sLine)
                            if sExceptedSuggs.startswith('"') and sExceptedSuggs.endswith('"'):
                                sExceptedSuggs = sExceptedSuggs[1:-1]
                        else:
                            sErrorText = sLine.strip()
                            sExceptedSuggs = ""
                        sExpectedErrors = self._getExpectedErrors(sErrorText)
                        sTextToCheck = sErrorText.replace("}}", "").replace("{{", "")
                        sFoundErrors, sListErr, sFoundSuggs = self._getFoundErrors(sTextToCheck)
                        self.assertEqual(sExpectedErrors, sFoundErrors, \
                                         "\n# Line num: " + sLineNum + \
                                         "\n> to check: " + sTextToCheck + \
                                         "\n  expected: " + sExpectedErrors + \
                                         "\n  found:    " + sFoundErrors + \
                                         "\n  errors:   \n" + sListErr)
                        if sExceptedSuggs:
                            self.assertEqual(sExceptedSuggs, sFoundSuggs, "\n# Line num: " + sLineNum + "\n> to check: " + sTextToCheck + "\n  errors:   \n" + sListErr)

    def _splitTestLine (self, sLine):
        sText, sSugg = sLine.split("->>")
        return (sText.strip(), sSugg.strip())

    def _getFoundErrors (self, sLine):
        aErrs = gce.parse(sLine)
        sRes = " " * len(sLine)
        sListErr = ""
        lAllSugg = []
        for dErr in aErrs:
            sRes = sRes[:dErr["nStart"]] + "~" * (dErr["nEnd"] - dErr["nStart"]) + sRes[dErr["nEnd"]:]
            sListErr += "    * {sRuleId}  at  {nStart}:{nEnd}\n".format(**dErr)
            lAllSugg.append("|".join(dErr["aSuggestions"]))
        return sRes, sListErr, "|||".join(lAllSugg)

    def _getExpectedErrors (self, sLine):
        sRes = " " * len(sLine)
        for i, m in enumerate(self._zError.finditer(sLine)):
            nStart = m.start() - (4 * i)
            nEnd = m.end() - (4 * (i+1))
            sRes = sRes[:nStart] + "~" * (nEnd - nStart) + sRes[nEnd:-4]
        return sRes


from contextlib import contextmanager
@contextmanager
def timeblock (label, hDst):
    start = time.perf_counter()
    try:
        yield
    finally:
        end = time.perf_counter()
        print('{} : {}'.format(label, end - start))
        hDst.write("{:<12.6}".format(end-start))


def perf (sVersion):
    print("\nPerformance tests")
    gce.load()
    aErrs = gce.parse("OK, not important text, but necessary to compile rules")

    with open("./tests/fr/perf.txt", "r", encoding="utf-8") as hSrc, \
         open("./tests/fr/perf_memo.txt", "a", encoding="utf-8") as hDst:
        hDst.write("{:<12}{:<20}".format(sVersion, time.strftime("%Y.%m.%d %H:%M")))
        for sText in ( s.strip() for s in hSrc if not s.startswith("#") and s.strip() ):
            with timeblock(sText[:sText.find(".")], hDst):
                aErrs = gce.parse(sText)
        hDst.write("\n")

def main():
    unittest.main()


if __name__ == '__main__':
    main()
