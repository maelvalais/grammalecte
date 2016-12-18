# generated code, do not edit
def c330p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"\w$")
def c330p_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[m.end():], r"^\w")
def c334p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"\w$")
def c334p_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[m.end():], r"^\w")
def p358p_1 (s, m):
    return m.group(1).capitalize()
def p371p_1 (s, m):
    return m.group(1).replace(".", "")+"."
def c372p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search(r"(?i)^(?:i\.e\.|s\.[tv]\.p\.|e\.g\.|a\.k\.a\.|c\.q\.f\.d\.|b\.a\.)$", m.group(0))
def s372p_1 (s, m):
    return m.group(0).replace(".", "").upper()
def c372p_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(0) != "b.a."
def p372p_2 (s, m):
    return m.group(0).replace(".", "_")
def p376p_1 (s, m):
    return m.group(0).replace(".", "").replace("-","")
def c378p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^etc", m.group(1))
def c384p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":M[12]", False) and (morph(dDA, (m.start(3), m.group(3)), ":(?:M[12]|V)", False) or not _oDict.isValid(m.group(3)))
def c385p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":M[12]", False) and look(s[m.end():], "^\W+[a-zéèêîïâ]")
def c446p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return option("typo") and not m.group(0).endswith("·e·s")
def c446p_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":G")
def d446p_2 (s, m, dDA):
    return define(dDA, m.start(0), [":N:A:Q:e:i"])
def c461p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return option("typo") and not m.group(0).endswith("·e")
def c461p_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False)
def d461p_2 (s, m, dDA):
    return define(dDA, m.start(0), [":N:A:Q:e:s"])
def c472p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^(?:etc|[A-Z]|chap|cf|fig|hab|litt|circ|coll|r[eé]f|étym|suppl|bibl|bibliogr|cit|op|vol|déc|nov|oct|janv|juil|avr|sept)$", m.group(1)) and morph(dDA, (m.start(1), m.group(1)), ":", False) and morph(dDA, (m.start(2), m.group(2)), ":", False)
def s472p_1 (s, m):
    return m.group(2).capitalize()
def c484p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(1), m.group(1)), ":[DR]", False)
def c519p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(1).isdigit()
def c521p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return _oDict.isValid(m.group(1))
def s543p_1 (s, m):
    return m.group(1)[0:-1]
def s544p_1 (s, m):
    return "nᵒˢ"  if m.group(1)[1:3] == "os"  else "nᵒ"
def c552p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], "(?i)etc$")
def s553p_1 (s, m):
    return m.group(0).replace("...", "…").rstrip(".")
def c569p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("^(?:etc|[A-Z]|fig|hab|litt|circ|coll|ref|étym|suppl|bibl|bibliogr|cit|vol|déc|nov|oct|janv|juil|avr|sept|pp?)$", m.group(1))
def s593p_1 (s, m):
    return ",|" + m.group(1)
def s594p_1 (s, m):
    return ";|" + m.group(1)
def s595p_1 (s, m):
    return ":|" + m.group(0)[1]
def c609p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(3), m.group(3)), ";S", ":[VCR]") or mbUnit(m.group(3)) or not _oDict.isValid(m.group(3))
def c614p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (not re.search("^[0-9][0-9]{1,3}$", m.group(2)) and not _oDict.isValid(m.group(3))) or morphex(dDA, (m.start(3), m.group(3)), ";S", ":[VCR]") or mbUnit(m.group(3))
def c638p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return sCountry != "CA"
def s638p_1 (s, m):
    return " "+m.group(0)
def c673p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"[a-zA-Zéïîùàâäôö]$")
def s695p_1 (s, m):
    return undoLigature(m.group(0))
def s733p_1 (s, m):
    return m.group(1)[:-1]+"’"
def c735p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not option("mapos") and morph(dDA, (m.start(2), m.group(2)), ":V", False)
def s735p_1 (s, m):
    return m.group(1)[:-1]+"’"
def c739p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return option("mapos") and not look(s[:m.start()], "(?i)(?:lettre|caractère|glyphe|dimension|variable|fonction|point) *$")
def s739p_1 (s, m):
    return m.group(1)[:-1]+"’"
def c756p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^(?:onz[ei]|énième|iourte|ouistiti|ouate|one-?step|ouf|Ouagadougou|I(?:I|V|X|er|ᵉʳ|ʳᵉ|è?re))", m.group(2)) and not m.group(2).isupper() and not morph(dDA, (m.start(2), m.group(2)), ":G", False)
def s756p_1 (s, m):
    return m.group(1)[0]+"’"
def c774p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^(?:onz|énième|ouf|énième|ouistiti|one-?step|I(?:I|V|X|er|ᵉʳ))", m.group(2)) and morph(dDA, (m.start(2), m.group(2)), ":[me]")
def c783p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("^NF (?:C|E|P|Q|S|X|Z|EN(?: ISO|)) [0-9]+(?:‑[0-9]+|)", m.group(0))
def s783p_1 (s, m):
    return formatNF(m.group(0))
def s792p_1 (s, m):
    return m.group(0).replace("2", "₂").replace("3", "₃").replace("4", "₄")
def c803p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], "NF[  -]?(C|E|P|Q|X|Z|EN(?:[  -]ISO|)) *")
def s803p_1 (s, m):
    return formatNumber(m.group(0))
def c818p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return option("num")
def s818p_1 (s, m):
    return m.group(0).replace(".", " ")
def p818p_2 (s, m):
    return m.group(0).replace(".", "")
def c826p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return option("num")
def s826p_1 (s, m):
    return m.group(0).replace(" ", " ")
def p826p_2 (s, m):
    return m.group(0).replace(" ", "")
def c838p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not checkDate(m.group(1), m.group(2), m.group(3)) and not look(s[:m.start()], r"(?i)\bversions? +$")
def p838p_2 (s, m):
    return m.group(0).replace(".", "-").replace(" ", "-").replace("\/", "-")
def c854p_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(1), m.group(1)), ":(?:G|V0)|>(?:t(?:antôt|emps|rès)|loin|souvent|parfois|quelquefois|côte|petit|même) ", False) and not m.group(1)[0].isupper()
def c854p_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo
def p872p_1 (s, m):
    return m.group(0).replace("‑", "")
def p873p_1 (s, m):
    return m.group(0).replace("‑", "")
def c935s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^([nv]ous|faire|en|la|lui|donnant|œuvre|h[éoa]|hou|olé|joli|Bora|couvent|dément|sapiens|très|vroum|[0-9]+)$", m.group(1)) and not (re.search("^(?:est|une?)$", m.group(1)) and look(s[:m.start()], "[’']$")) and not (m.group(1) == "mieux" and look(s[:m.start()], "(?i)qui +$"))
def c951s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not option("ocr")
def s951s_1 (s, m):
    return m.group(0).replace("O", "0")
def c952s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not option("ocr")
def s952s_1 (s, m):
    return m.group(0).replace("O", "0")
def c973s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not checkDateWithString(m.group(1), m.group(2), m.group(3))
def c980s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[m.end():], r"^ +av(?:ant|) +J(?:C|ésus-Christ)") and not checkDay(m.group(1), m.group(2), m.group(3), m.group(4))
def s980s_1 (s, m):
    return getDay(m.group(2), m.group(3), m.group(4))
def c988s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[m.end():], r"^ +av(?:ant|) +J(?:C|ésus-Christ)") and not checkDayWithString(m.group(1), m.group(2), m.group(3), m.group(4))
def s988s_1 (s, m):
    return getDayWithString(m.group(2), m.group(3), m.group(4))
def c1036s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(0), m.group(0)), ":", False)
def c1039s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D", False)
def c1040s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":A", False) and not morph(dDA, prevword1(s, m.start()), ":D", False)
def c1072s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return _oDict.isValid(m.group(0).replace(" ", "_"))
def p1072s_1 (s, m):
    return m.group(0).replace(" ", "_")
def c1084s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(1), m.group(1)), ":(?:O[sp]|X)", False)
def d1084s_1 (s, m, dDA):
    return select(dDA, m.start(1), m.group(1), ":V")
def d1086s_1 (s, m, dDA):
    return select(dDA, m.start(1), m.group(1), ":V")
def c1088s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(1), m.group(1)), ":[YD]", False)
def d1088s_1 (s, m, dDA):
    return exclude(dDA, m.start(1), m.group(1), ":V")
def d1090s_1 (s, m, dDA):
    return exclude(dDA, m.start(1), m.group(1), ":V")
def d1092s_1 (s, m, dDA):
    return exclude(dDA, m.start(1), m.group(1), ":V")
def c1094s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(1), m.group(1)), ":Y", False)
def d1094s_1 (s, m, dDA):
    return exclude(dDA, m.start(1), m.group(1), ":V")
def d1096s_1 (s, m, dDA):
    return exclude(dDA, m.start(1), m.group(1), ":V")
def d1098s_1 (s, m, dDA):
    return exclude(dDA, m.start(1), m.group(1), ":[123][sp]")
def c1100s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D.*:p|>[a-z]+ièmes ", False, False)
def d1100s_1 (s, m, dDA):
    return select(dDA, m.start(0), m.group(0), ":P")
def c1168s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return _oDict.isValid(m.group(1)+"-"+m.group(2)) and analyse(m.group(1)+"-"+m.group(2), ":", False)
def c1176s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[NB]", False)
def c1178s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[NB]", False) and not nextword1(s, m.end())
def c1187s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":N") and not re.search("(?i)^(?:aequo|nihilo|cathedra|absurdo|abrupto)", m.group(1))
def c1195s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False)
def c1201s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":N", ":[AGW]")
def c1210s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":G")
def c1216s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return _oDict.isValid(m.group(1)+"-"+m.group(2)) and analyse(m.group(1)+"-"+m.group(2), ":", False)
def c1227s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":N")
def c1227s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":N")
def c1236s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return _oDict.isValid(m.group(1)+"-"+m.group(2)) and analyse(m.group(1)+"-"+m.group(2), ":", False) and morph(dDA, prevword1(s, m.start()), ":D", False, not bool(re.search("(?i)^s(?:ans|ous)$", m.group(1))))
def c1244s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return _oDict.isValid(m.group(1)+"-"+m.group(2)) and analyse(m.group(1)+"-"+m.group(2), ":N", False) and morph(dDA, prevword1(s, m.start()), ":(?:D|V0e)", False, True) and not (morph(dDA, (m.start(1), m.group(1)), ":G", False) and morph(dDA, (m.start(2), m.group(2)), ":[GYB]", False))
def s1255s_1 (s, m):
    return m.group(0).replace(" ", "-")
def s1256s_1 (s, m):
    return m.group(0).replace(" ", "-")
def s1262s_1 (s, m):
    return m.group(0).replace(" ", "-").replace("si", "ci")
def c1266s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, prevword1(s, m.start()), ":Cs", False, True)
def s1273s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c1279s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not nextword1(s, m.end())
def c1281s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, prevword1(s, m.start()), ":G")
def c1286s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return look(s[:m.start()], r"(?i)\b(?:les?|du|des|un|ces?|[mts]on) +")
def c1293s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":D", False)
def c1295s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not ( morph(dDA, prevword1(s, m.start()), ":R", False) and look(s[m.end():], "^ +qu[e’]") )
def c1358s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[m.end():], "^ +s(?:i |’)")
def s1427s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c1430s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], "(?i)quatre $")
def s1430s_1 (s, m):
    return m.group(0).replace(" ", "-").replace("vingts", "vingt")
def s1433s_1 (s, m):
    return m.group(0).replace(" ", "-")
def s1436s_1 (s, m):
    return m.group(0).replace(" ", "-").replace("vingts", "vingt")
def s1465s_1 (s, m):
    return m.group(0).replace("-", " ")
def c1467s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def s1468s_1 (s, m):
    return m.group(0).replace("-", " ")
def s1469s_1 (s, m):
    return m.group(0).replace("-", " ")
def s1470s_1 (s, m):
    return m.group(0).replace("-", " ")
def c1483s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":V0|>en ", False)
def c1493s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":M", ":G") and not morph(dDA, (m.start(2), m.group(2)), ":N", False) and not prevword1(s, m.start())
def c1505s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":E", False) and morph(dDA, (m.start(3), m.group(3)), ":M", False)
def c1516s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":Y", False) and morph(dDA, (m.start(2), m.group(2)), ":M", False) and not morph(dDA, prevword1(s, m.start()), ">à ", False, False)
def c1527s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return option("mapos")
def s1527s_1 (s, m):
    return m.group(1)[:-1]+"’"
def c1536s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[GNAY]", ":(?:Q|3s)|>(?:priori|post[eé]riori|contrario|capella|fortiori) ")
def c1554s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(0) == "II"
def c1554s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not bCondMemo and not m.group(0).isdigit()
def s1554s_2 (s, m):
    return m.group(0).replace("O", "0").replace("I", "1")
def s1563s_1 (s, m):
    return m.group(0).replace("a", "â").replace("A", "Â")
def s1569s_1 (s, m):
    return m.group(0).replace("n", "u")
def c1598s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b([jnlmts]’|il |on |elle )$")
def c1604s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b[jn]e +$")
def c1622s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":N.*:f:s", False)
def c1628s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D.*:f:[si]")
def c1634s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, nextword1(s, m.end()), ">(?:et|o[uù]) ")
def c1645s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^contre$", m.group(0))
def c1651s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D.*:p", False, False)
def c1652s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D.*:p", False, False)
def c1661s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(0).endswith("é") and not morph(dDA, prevword1(s, m.start()), ":D.*:m:[si]", False, False)
def c1661s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(0).endswith("s") and not morph(dDA, prevword1(s, m.start()), ":D.*:m:p", False, False)
def c1670s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(0).endswith("o")
def c1670s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not bCondMemo and not morph(dDA, prevword1(s, m.start()), ":D.*:[me]", False, False)
def c1678s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\bau ")
def c1690s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(0).endswith("e") and ( morph(dDA, prevword1(s, m.start()), ":R", False, True) or isNextVerb(dDA, s[m.end():], m.end()) )
def c1690s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(0).endswith("s") and ( morph(dDA, prevword1(s, m.start()), ":R", False, True) or isNextVerb(dDA, s[m.end():], m.end()) )
def c1704s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], "[0-9] +$")
def c1710s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(0).endswith("l")
def c1710s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not bCondMemo
def c1735s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not prevword1(s, m.start()) and morph(dDA, (m.start(2), m.group(2)), ":(?:O[on]|3s)", False)
def c1742s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(0).endswith("s")
def c1742s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not bCondMemo
def c1750s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(0).endswith("s")
def c1750s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not bCondMemo
def s1758s_1 (s, m):
    return m.group(0).replace("o", "e")
def c1764s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return look(s[:m.start()], r"\w") or not morph(dDA, (m.start(2), m.group(2)), ":Y", False)
def c1774s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(0).istitle() and _oDict.isValid("v"+m.group(1)) and look(s[:m.start()], r"\w")
def c1774s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(0).istitle() and _oDict.isValid(m.group(1)) and look(s[:m.start()], r"\w")
def s1783s_1 (s, m):
    return m.group(0).replace("é", "e").replace("É", "E").replace("è", "e").replace("È", "E")
def c1796s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":(?:V0|N.*:m:[si])", False, False)
def c1809s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D:[me]:p", False, False)
def c1816s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(0).endswith("e") and not morph(dDA, prevword1(s, m.start()), ":D.*:[me]:[si]", False, False)
def c1816s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(0).endswith("s") and not morph(dDA, prevword1(s, m.start()), ":D.*:[me]:[pi]", False, False)
def s1819s_1 (s, m):
    return m.group(0).replace("è", "ê").replace("È", "Ê")
def s1820s_1 (s, m):
    return m.group(0).replace("é", "ê").replace("É", "Ê")
def c1854s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b(?:ne|il|on|elle|je) +$") and morph(dDA, (m.start(2), m.group(2)), ":[NA].*:[me]:[si]", False)
def c1856s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b(?:ne|il|on|elle) +$") and morph(dDA, (m.start(2), m.group(2)), ":[NA].*:[fe]:[si]", False)
def c1858s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b(?:ne|tu) +$") and morph(dDA, (m.start(2), m.group(2)), ":[NA].*:[pi]", False)
def c1873s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(0).endswith("u") and not morph(dDA, prevword1(s, m.start()), ":D.*:m:s", False, False)
def c1873s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(0).endswith("x") and not morph(dDA, prevword1(s, m.start()), ":D.*:m:p", False, False)
def c1887s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D.*:m:p", False, False)
def c1893s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D.*:f:s", False, False)
def c1899s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D.*:[me]:p", False, False)
def c1911s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D.*:m:s", False, False)
def c1917s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(0).endswith("s")
def c1917s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not bCondMemo
def c1931s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b(?:ce|[mts]on|du|un|le) $")
def c1943s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b(?:je|il|elle|on|ne) $")
def s1943s_1 (s, m):
    return m.group(0).replace("è", "ê").replace("È", "Ê")
def s1957s_1 (s, m):
    return m.group(0).replace("a", "o").replace("A", "O")
def s1963s_1 (s, m):
    return m.group(0).replace("n", "u").replace("N", "U")
def c1969s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b(?:ce|d[eu]|un|quel|leur|le) +")
def c1993s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D:[me]" ,False, False)
def s2002s_1 (s, m):
    return suggSimil(m.group(2), ":[NA].*:[pi]")
def s2005s_1 (s, m):
    return suggSimil(m.group(2), ":[NA].*:[si]")
def s2008s_1 (s, m):
    return suggSimil(m.group(2), ":[NA].*:[pi]")
def c2036s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^avoir$", m.group(1)) and morph(dDA, (m.start(1), m.group(1)), ">avoir ", False)
def c2053s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:être|mettre) ", False)
def c2102s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look_chk1(dDA, s[m.end():], m.end(), r" \w[\w-]+ en ([aeo][a-zû]*)", ":V0a")
def c2123s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">abolir ", False)
def c2124s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">acculer ", False)
def c2125s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">achever ", False)
def c2126s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[m.end():], r" +de?\b")
def c2132s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">avancer ", False)
def c2135s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, prevword1(s, m.start()), ":A|>un", False)
def c2139s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">collaborer ", False)
def c2141s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">comparer ", False)
def c2142s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">contraindre ", False)
def c2146s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">enchevêtrer ", False)
def c2147s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">entraider ", False)
def c2153s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">joindre ")
def c2160s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">monter ", False)
def c2171s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">rénov(?:er|ation) ", False)
def c2173s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">réunir ", False)
def c2174s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">recul(?:er|) ", False)
def c2178s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">suffire ", False)
def c2179s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">talonner ", False)
def c2252s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:prévenir|prévoir|prédire|présager|préparer|pressentir|pronostiquer|avertir|devancer|deviner|réserver) ", False)
def c2262s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:ajourner|différer|reporter) ", False)
def c2288s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]") and m.group(2)[0].islower()
def s2288s_1 (s, m):
    return suggSimil(m.group(2), ":[NA]:[fe]:[si]")
def c2296s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":N.*:[fe]|:[AW]") and m.group(2)[0].islower() or m.group(2) == "va"
def c2296s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]") and m.group(2)[0].islower() and hasSimil(m.group(2))
def s2296s_2 (s, m):
    return suggSimil(m.group(2), ":[NA]:[fe]:[si]")
def c2307s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]") and m.group(2)[0].islower() and not (m.group(2) == "sortir" and re.search(r"(?i)au", m.group(1)))
def s2307s_1 (s, m):
    return suggSimil(m.group(2), ":[NA]:[me]:[si]")
def c2315s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]|:V0e.*:3[sp]|>devoir") and m.group(2)[0].islower() and hasSimil(m.group(2))
def s2315s_1 (s, m):
    return suggSimil(m.group(2), ":[NA]:[me]:[si]")
def c2323s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]") and m.group(2)[0].islower()
def s2323s_1 (s, m):
    return suggSimil(m.group(2), ":[NA]:.:[si]")
def c2331s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V.*:(?:Y|[123][sp])") and m.group(1)[0].islower() and not prevword1(s, m.start())
def s2331s_1 (s, m):
    return suggSimil(m.group(1), ":[NA]:[me]:[si]")
def c2339s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]") and m.group(2)[0].islower() and not re.search(r"(?i)^quelques? soi(?:ent|t|s)\b", m.group(0))
def s2339s_1 (s, m):
    return suggSimil(m.group(2), ":[NA]:.:[pi]")
def c2347s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]") and m.group(2)[0].islower()
def s2347s_1 (s, m):
    return suggSimil(m.group(2), ":[NA]:[me]:[pi]")
def c2355s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]") and m.group(2)[0].islower()
def s2355s_1 (s, m):
    return suggSimil(m.group(2), ":[NA]:[fe]:[pi]")
def c2363s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[123][sp]", ":[NAQ]")
def s2363s_1 (s, m):
    return suggSimil(m.group(1), ":(?:[NA]:[fe]:[si])")
def c2374s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[me]", ":[YG]") and m.group(2)[0].islower()
def c2374s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]", False)
def s2374s_2 (s, m):
    return suggSimil(m.group(2), ":Y")
def c2382s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[123][sp]", ":[NAQ]")
def s2382s_1 (s, m):
    return suggSimil(m.group(1), ":(?:[NA]:.:[si])")
def c2389s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Y|[123][sp])") and not look(s[:m.start()], "(?i)(?:dont|sauf|un à) +$")
def s2389s_1 (s, m):
    return suggSimil(m.group(1), ":[NAQ]:[me]:[si]")
def c2397s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1)[0].islower() and morph(dDA, (m.start(1), m.group(1)), ":V.*:[123][sp]")
def s2397s_1 (s, m):
    return suggSimil(m.group(1), ":[NA]")
def c2404s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1)[0].islower() and morphex(dDA, (m.start(1), m.group(1)), ":V.*:[123][sp]", ":[GNA]") and not look(s[:m.start()], r"(?i)\b(?:plus|moins) +$")
def s2404s_1 (s, m):
    return suggSimil(m.group(1), ":[NA]")
def c2414s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":", ":(?:[123][sp]|O[onw]|X)|ou ") and morphex(dDA, prevword1(s, m.start()), ":", ":3s", True)
def s2414s_1 (s, m):
    return suggSimil(m.group(1), ":(?:3s|Oo)")
def c2422s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":", ":(?:[123][sp]|O[onw]|X)|ou ") and morphex(dDA, prevword1(s, m.start()), ":", ":3p", True)
def s2422s_1 (s, m):
    return suggSimil(m.group(1), ":(?:3p|Oo)")
def c2431s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":", ":(?:[123][sp]|O[onw]|X)") and morphex(dDA, prevword1(s, m.start()), ":", ":1s", True)
def s2431s_1 (s, m):
    return suggSimil(m.group(1), ":(?:1s|Oo)")
def c2439s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":", ":(?:[123][sp]|O[onw]|X)") and morphex(dDA, prevword1(s, m.start()), ":", ":(?:2s|V0e)", True)
def s2439s_1 (s, m):
    return suggSimil(m.group(1), ":(?:2s|Oo)")
def c2454s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":", ":P")
def c2455s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]")
def c2465s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|O[onw])", False)
def s2465s_1 (s, m):
    return suggSimil(m.group(2), ":[123][sp]")
def c2469s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P|O[onw]|X)|>(?:[lmtsn]|surtout|guère|presque|même) ", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s2469s_1 (s, m):
    return suggSimil(m.group(2), ":(?:[123][sp]|Oo|Y)")
def c2473s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P|O[onw]|X)", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s2473s_1 (s, m):
    return suggSimil(m.group(2), ":(?:[123][sp]|Y)")
def c2477s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^se que?", m.group(0)) and _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P|Oo)|>[lmts] ", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s2477s_1 (s, m):
    return suggSimil(m.group(2), ":(?:[123][sp]|Oo|Y)")
def c2482s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P|Oo)", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s2482s_1 (s, m):
    return suggSimil(m.group(2), ":(?:[123][sp]|Y)")
def c2486s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P)|>(?:en|y|ils?) ", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s2486s_1 (s, m):
    return suggSimil(m.group(2), ":(?:[123][sp]|Y)")
def c2490s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P)|>(?:en|y|ils?|elles?) ", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s2490s_1 (s, m):
    return suggSimil(m.group(2), ":(?:[123][sp]|Y)")
def c2494s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":[123][sp]|>(?:en|y|que?) ", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|dire)$", m.group(2))
def s2494s_1 (s, m):
    return suggSimil(m.group(2), ":3s")
def c2523s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:Y|[123][sp])", ":[AQW]")
def s2523s_1 (s, m):
    return suggSimil(m.group(1), ":[AW]")
def c2530s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":[GNAQWM]") and not look(s[:m.start()], r"(?i)\bce que? ")
def c2541s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(1)[0].isupper() and morphex(dDA, (m.start(1), m.group(1)), ":[123][sp]", ":[GNAQM]")
def c2548s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(1)[0].isupper() and morphex(dDA, (m.start(1), m.group(1)), ":[123][sp]", ":[GNAQM]") and not morph(dDA, prevword1(s, m.start()), ":[NA]:[me]:si", False)
def c2556s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[123][sp]", ":[GNAQWMT]") and morphex(dDA, nextword1(s, m.end()), ":", ":D", True)
def s2556s_1 (s, m):
    return suggSimil(m.group(1), ":[AWGT]")
def c2565s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y)", ":[GAQW]") and not morph(dDA, prevword1(s, m.start()), ":V[123].*:[123][sp]", False, False)
def s2565s_1 (s, m):
    return suggVerbPpas(m.group(1))
def c2576s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, prevword1(s, m.start()), ":[VN]", False, True)
def c2577s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not prevword1(s, m.start())
def c2580s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b(?:[lmts]a|leur|une|en) +$")
def c2582s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":(?:D|Oo|M)", False)
def c2583s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">être :V") and not look(s[:m.start()], r"(?i)\bce que? ")
def c2597s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^(?:côtés?|coups?|peu(?:-près|)|pics?|propos|valoir|plat-ventrismes?)", m.group(2))
def c2597s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return re.search("(?i)^(?:côtés?|coups?|peu(?:-pr(?:ès|êts?|és?)|)|pics?|propos|valoir|plat-ventrismes?)", m.group(2))
def c2603s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":3s", False, False)
def c2606s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":(?:3s|R)", False, False) and not morph(dDA, nextword1(s, m.end()), ":Oo|>qui ", False, False)
def c2612s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":Q", ":M[12P]")
def c2614s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ]", ":(?:Y|Oo)")
def c2617s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ]", ":(?:Y|Oo)")
def c2622s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\bce que?\b")
def c2626s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":(?:M[12]|D|Oo)")
def c2634s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]") and not m.group(2)[0:1].isupper() and not m.group(2).startswith("tord")
def c2640s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)[ln]’$|(?<!-)\b(?:il|elle|on|y|n’en) +$")
def c2644s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)(?:\bque? |[ln]’$|(?<!-)\b(?:il|elle|on|y|n’en) +$)")
def c2648s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)(?:\bque? |[ln]’$|(?<!-)\b(?:il|elle|on|y|n’en) +$)")
def c2652s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":Y", False) and not look(s[:m.start()], r"(?i)\bque? |(?:il|elle|on|n’(?:en|y)) +$")
def c2718s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not prevword1(s, m.start())
def c2730s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f") and not re.search("^seule?s?", m.group(2))
def c2732s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":G", ">(?:tr(?:ès|op)|peu|bien|plus|moins|toute) |:[NAQ].*:f")
def c2735s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not nextword1(s, m.end()) or look(s[m.end():], "(?i)^ +que? ")
def c2737s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"\b(?:[oO]h|[aA]h) +$")
def c2738s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":R")
def c2754s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":Y")  and m.group(1) != "CE"
def c2757s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":V[123].*:(?:Y|[123][sp])") and not morph(dDA, (m.start(2), m.group(2)), ">(?:devoir|pouvoir) ") and m.group(2)[0].islower() and m.group(1) != "CE"
def c2761s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (m.group(0).find(",") >= 0 or morphex(dDA, (m.start(2), m.group(2)), ":G", ":[AYD]"))
def c2769s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not prevword1(s, m.start())
def c2771s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":[NAQ].*:[me]") or look(s[:m.start()], r"(?i)\b[cs]e +")
def c2778s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:être|pouvoir|devoir) .*:3s", False)
def c2782s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123]s", ":P")
def c2785s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ]", ":([123][sp]|Y|P|Q)|>l[ea]? ")
def c2788s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":N.*:s", ":(?:A.*:[pi]|P|R)|>autour ")
def c2826s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":N.*:p", ":(?:G|W|M|A.*:[si])")
def c2838s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1).endswith("en") or look(s[:m.start()], "^ *$")
def c2854s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":Q")
def c2857s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(1), m.group(1)), ">(?:profiter|bénéficier) ", False)
def c2863s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False) and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ]", ":G")
def c2876s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not prevword1(s, m.start()) and not morph(dDA, nextword1(s, m.end()), ":[WAY]", False, False)
def c2880s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(1).startswith("B")
def c2915s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":E|>le ", False, False)
def c2934s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y)", ":(?:G|N|A|M[12P])") and not look(s[:m.start()], r"(?i)\b[ld]es +$")
def c2951s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":W", False) and not morph(dDA, prevword1(s, m.start()), ":V.*:3s", False, False)
def s2964s_1 (s, m):
    return m.group(1).replace("pal", "pâl")
def s2968s_1 (s, m):
    return m.group(1).replace("pal", "pâl")
def c2978s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], "très +$")
def c2984s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[AQ]", False)
def c2990s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, prevword1(s, m.start()), ":C", False, True)
def c2996s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], "(?i)(?:quelqu|l|d)’")
def c3008s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":A") and not re.search("(?i)^seule?s?$", m.group(2))
def c3043s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], "(?i)(?:peu|de) $") and morph(dDA, (m.start(2), m.group(2)), ":Y|>(?:tout|les?|la) ")
def c3046s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":(?:Y|M[12P])|>(?:en|y|les?) ", False)
def c3059s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ">(?:arriver|venir|à|revenir|partir|aller) ")
def c3064s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":P", False)
def c3076s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ]", ":(?:G|[123][sp]|W)")
def s3076s_1 (s, m):
    return m.group(1).replace(" ", "")
def c3084s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def c3093s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not prevword1(s, m.start()) and morph(dDA, (m.start(2), m.group(2)), ":V", False)
def c3096s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not prevword1(s, m.start()) and morph(dDA, (m.start(2), m.group(2)), ":V", False) and not ( m.group(1) == "sans" and morph(dDA, (m.start(2), m.group(2)), ":[NY]", False) )
def c3106s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":M[12]", False)
def c3145s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">ouvrir ", False)
def c3160s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("^(?:grand|petit|rouge)$", m.group(2)) and morphex(dDA, (m.start(2), m.group(2)), ":A", ":[NGM]") and not look(s[:m.start()], r"(?i)\bne (?:pas |jamais |) *$") and not morph(dDA, prevword1(s, m.start()), ":O[os]|>(?:ne|falloir|pouvoir|savoir|de) ", False)
def c3167s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, prevword1(s, m.start()), ":Cs|>(?:ni|et|sans|pour|falloir|[pv]ouvoir|aller) ", True, False)
def c3213s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return look(s[:m.start()], r"\b(aux|[ldmts]es|[nv]os) +$")
def c3214s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[AQ].*:[pi]", False)
def c3218s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not prevword1(s, m.start())
def c3224s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b(?:d[eu]|avant|après|sur|malgré) +$")
def c3232s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b(?:d[eu]|avant|après|sur|malgré) +$") and not morph(dDA, (m.start(2), m.group(2)), ":(?:3s|Oo)", False)
def c3240s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b(?:d[eu]|avant|après|sur|malgré) +$")
def c3257s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":f", ":[123][sp]") and morphex(dDA, prevword1(s, m.start()), ":", ":(?:R|[123][sp]|Q)|>(?:[nv]ous|eux) ", True)
def c3257s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s3257s_2 (s, m):
    return suggMasPlur(m.group(2), True)
def c3262s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":m", ":[123][sp]") and morphex(dDA, prevword1(s, m.start()), ":", ":(?:R|[123][sp]|Q)|>(?:[nv]ous|eux) ", True)
def c3262s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s3262s_2 (s, m):
    return suggFemPlur(m.group(2), True)
def c3272s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":N.*:[fp]", ":(?:A|W|G|M[12P]|Y|[me]:i|3s)") and morph(dDA, prevword1(s, m.start()), ":R|>de ", False, True)
def s3272s_1 (s, m):
    return suggMasSing(m.group(1), True)
def c3277s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[mp]") and morph(dDA, prevword1(s, m.start()), ":R|>de ", False, True)
def s3277s_1 (s, m):
    return suggFemSing(m.group(1), True)
def c3282s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[fs]") and morph(dDA, prevword1(s, m.start()), ":R|>de ", False, True)
def s3282s_1 (s, m):
    return suggMasPlur(m.group(1), True)
def c3287s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[ms]") and morph(dDA, prevword1(s, m.start()), ":R|>de ", False, True)
def s3287s_1 (s, m):
    return suggFemPlur(m.group(1), True)
def c3307s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[123][sp]", False) and not (re.search("(?i)^(?:jamais|rien)$", m.group(2)) and look(s[:m.start()], r"\b(?:que?|plus|moins) "))
def c3312s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[123][sp]", False) and not (re.search("(?i)^(?:jamais|rien)$", m.group(2)) and look(s[:m.start()], r"\b(?:que?|plus|moins) "))
def c3317s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]", False) and not (re.search("(?i)^(?:jamais|rien)$", m.group(3)) and look(s[:m.start()], r"\b(?:que?|plus|moins) "))
def c3322s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]", False) and not (re.search("(?i)^(?:jamais|rien)$", m.group(3)) and look(s[:m.start()], r"\b(?:que?|plus|moins) "))
def c3338s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(1), m.group(1)), ":(?:Y|W|O[ow])|>que? ", False) and _oDict.isValid(m.group(1))
def s3338s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c3372s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, nextword1(s, m.end()), ":[AN].*:[pi]", False, False)
def c3373s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":A.*:s")
def c3374s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":A.*:s", False)
def p3527s_1 (s, m):
    return m.group(0).replace(" ", "_")
def c3624s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":G")
def c3631s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def c3643s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^(?:janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)s?$", m.group(2))
def c3650s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"\b(?:une|la|cette|[mts]a|[nv]otre|de) +")
def c3682s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c3682s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c3701s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(2).isdigit() or morph(dDA, (m.start(2), m.group(2)), ":B", False)
def c3707s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return look(s[:m.start()], r"\b[lL]a +$")
def d3707s_1 (s, m, dDA):
    return define(dDA, m.start(0), [">numéro :N:f:s"])
def c3718s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">prendre ", False)
def c3722s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">rester ", False)
def c3727s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:sembler|para[îi]tre) ") and morphex(dDA, (m.start(3), m.group(3)), ":A", ":G")
def c3731s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">tenir ", False)
def c3734s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">trier ", False)
def c3736s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">venir ", False)
def c3751s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", ":(?:G|3p)")
def c3756s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", ":(?:G|3p)")
def c3763s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":B", False)
def c3764s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, prevword1(s, m.start()), ":V0", False) or not morph(dDA, nextword1(s, m.end()), ":A", False)
def c3765s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return isEndOfNG(dDA, s[m.end():], m.end())
def c3766s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":W", False)
def c3767s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":A .*:m:s", False)
def c3769s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, prevword1(s, m.start()), ":(?:R|C[sc])", False, True)
def c3770s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":B", False) or re.search("(?i)^(?:plusieurs|maintes)", m.group(1))
def c3771s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, nextword1(s, m.end()), ":[NAQR]", False, True)
def c3772s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":V0")
def c3774s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(1), m.group(1)), ":D", False)
def c3775s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(1), m.group(1)), ":D.*:[me]:[si]", False)
def c3776s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, nextword1(s, m.end()), ":([AQ].*:[me]:[pi])", False, False)
def c3777s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":A", False)
def c3778s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:croire|devoir|estimer|imaginer|penser) ")
def c3780s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:R|D|[123]s|X)", False)
def c3781s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":[AQ]:[ef]:[si]", False)
def c3782s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":[AQ]:[em]:[si]", False)
def c3783s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b(?:il +|n’)$")
def c3784s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def c3785s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\bt(?:u|oi qui)\b")
def c3786s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def c3787s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":A", False)
def c3788s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def c3789s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":W", False)
def c3790s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[AW]", ":G")
def c3791s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[AW]", False)
def c3792s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":Y", False)
def c3795s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NV]", ":D")
def c3796s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":(?:3s|X)", False)
def c3797s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[me]", False)
def c3804s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":M[12]", False) and (morph(dDA, (m.start(2), m.group(2)), ":(?:M[12]|V)", False) or not _oDict.isValid(m.group(2)))
def c3805s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":M", False) and morph(dDA, (m.start(2), m.group(2)), ":M", False)
def c3806s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":M", False)
def c3807s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:M[12]|N)") and morph(dDA, (m.start(2), m.group(2)), ":(?:M[12]|N)")
def c3808s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":MP")
def c3809s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":M[12]", False)
def c3810s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":M[12]", False)
def c3813s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[MT]", False) and morph(dDA, prevword1(s, m.start()), ":Cs", False, True) and not look(s[:m.start()], r"\b(?:plus|moins|aussi) .* que +$")
def p3813s_1 (s, m):
    return rewriteSubject(m.group(1),m.group(2))
def c3818s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def c3820s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def c3822s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:V0e|N)", False) and morph(dDA, (m.start(3), m.group(3)), ":[AQ]", False)
def c3824s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0", False)
def c3826s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0", False) and morph(dDA, (m.start(3), m.group(3)), ":[QY]", False)
def c3828s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and not (m.group(2) == "crainte" and look(s[:m.start()], r"\w"))
def c3830s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False)
def c3832s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morph(dDA, (m.start(3), m.group(3)), ":B", False) and morph(dDA, (m.start(4), m.group(4)), ":(?:Q|V1.*:Y)", False)
def c3836s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":A:[fe]:s", False)
def c3837s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":A:[fe]:p", False)
def c3840s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def c3841s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V[123]")
def c3842s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V[123]", False)
def c3843s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def c3846s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":G")
def c3849s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), "[NAQ].*:[me]:[si]", False)
def c3851s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[me]", ":G") and morph(dDA, (m.start(3), m.group(3)), ":[AQ].*:[me]", False)
def c3853s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[fe]", ":G") and morph(dDA, (m.start(3), m.group(3)), ":[AQ].*:[fe]", False)
def c3855s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", ":[123][sp]") and morph(dDA, (m.start(3), m.group(3)), ":[AQ].*:[pi]", False)
def c3858s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[AW]")
def c3860s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[AW]", False)
def c3862s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[AQ]", False)
def c3864s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":W", ":3p")
def c3866s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[AW]", ":[123][sp]")
def c3870s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and morph(dDA, (m.start(3), m.group(3)), ":W", False) and morph(dDA, (m.start(4), m.group(4)), ":[AQ]", False)
def c3872s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, True)
def c3873s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":W\\b")
def c3876s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False)
def c3880s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:N|A|Q|V0e)", False)
def c3904s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\bne +$")
def c3930s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":A.*:[me]:[pi]", False)
def c3931s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":(?:A.*:[fe]:[si]|Oo|[123][sp])", False)
def c3932s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":(?:A.*:[me]:[si]|Oo|[123][sp])", False)
def c3933s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":A.*:[me]:[si]", False)
def c3934s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":A.*:[me]:[si]", False)
def c3935s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":A.*:[me]:[pi]", False)
def c3936s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":A.*:[fe]:[pi]", False)
def c3937s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":A.*:[fe]:[pi]", False)
def c3938s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":A.*:[fe]:[pi]", False)
def c3939s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":A.*:[fe]:[pi]", False)
def c3940s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":A.*:[me]:[pi]", False)
def c3941s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":A.*:[me]:[si]", False)
def c3987s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":1s", False, False)
def c3988s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":2s", False, False)
def c3989s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":3s", False, False)
def c3990s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":1p", False, False)
def c3991s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":2p", False, False)
def c3992s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":3p", False, False)
def c3999s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return isAmbiguousNAV(m.group(3)) and morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ">telle ")
def c4002s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return isAmbiguousNAV(m.group(3)) and morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ">telle ") and not re.search("^[dD](?:’une?|e l(?:a|eur)) ", m.group(0))
def c4005s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return isAmbiguousNAV(m.group(3)) and ( morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":3[sp]") and not prevword1(s, m.start())) )
def c4022s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(1), m.group(1)), ":(?:G|V0)|>même ", False)
def c4022s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo
def c4041s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ]", False)
def c4043s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ]", False)
def c4045s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[fe]", False)
def c4056s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[123][sp]|:[si]")
def s4056s_1 (s, m):
    return suggSing(m.group(1))
def c4063s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)")
def c4063s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasMasForm(m.group(2))
def s4063s_2 (s, m):
    return suggMasSing(m.group(2), True)
def c4063s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p")
def s4063s_3 (s, m):
    return suggMasSing(m.group(2))
def c4068s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)") or ( morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":[me]") and morphex(dDA, (m.start(1), m.group(1)), ":R", ">(?:e[tn]|ou) ") and not (morph(dDA, (m.start(1), m.group(1)), ":Rv", False) and morph(dDA, (m.start(3), m.group(3)), ":Y", False)) )
def c4068s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasMasForm(m.group(3))
def s4068s_2 (s, m):
    return suggMasSing(m.group(3), True)
def c4068s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p") or ( morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[si]") and morphex(dDA, (m.start(1), m.group(1)), ":[RC]", ">(?:e[tn]|ou)") and not (morph(dDA, (m.start(1), m.group(1)), ":Rv", False) and morph(dDA, (m.start(3), m.group(3)), ":Y", False)) )
def s4068s_3 (s, m):
    return suggMasSing(m.group(3))
def c4077s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":(?:e|m|P|G|W|Y)")
def c4077s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasMasForm(m.group(2))
def s4077s_2 (s, m):
    return suggMasSing(m.group(2), True)
def c4077s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]")
def s4077s_3 (s, m):
    return suggMasSing(m.group(2))
def c4091s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":[GWme]")
def c4091s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasMasForm(m.group(2))
def s4091s_2 (s, m):
    return suggMasSing(m.group(2), True)
def c4091s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]")
def s4091s_3 (s, m):
    return suggMasSing(m.group(2))
def c4096s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":(?:e|m|G|W|V0|3s)")
def c4096s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasMasForm(m.group(2))
def s4096s_2 (s, m):
    return suggMasSing(m.group(2), True)
def c4096s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]") and not morph(dDA, prevword(s, m.start(), 2), ":B", False)
def s4096s_3 (s, m):
    return suggMasSing(m.group(2))
def c4101s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":(?:e|m|G|W|V0|3s)")
def c4101s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasMasForm(m.group(2))
def s4101s_2 (s, m):
    return suggMasPlur(m.group(2), True)
def c4105s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":[GWme]")
def c4105s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasMasForm(m.group(2))
def s4105s_2 (s, m):
    return suggMasSing(m.group(2), True)
def c4105s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]")
def s4105s_3 (s, m):
    return suggMasSing(m.group(2))
def c4110s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":[GWme]")
def c4110s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasMasForm(m.group(2))
def s4110s_2 (s, m):
    return suggMasSing(m.group(2), True)
def c4110s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ">[bcçdfgjklmnpqrstvwxz].+:[NAQ].*:m", ":[efGW]")
def c4110s_4 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]")
def s4110s_4 (s, m):
    return suggMasSing(m.group(2))
def c4116s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":(?:3s|[GWme])")
def c4116s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasMasForm(m.group(2))
def s4116s_2 (s, m):
    return suggMasSing(m.group(2), True)
def c4116s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":[GWme]") and morph(dDA, (m.start(2), m.group(2)), ":3s", False)
def c4116s_4 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]")
def s4116s_4 (s, m):
    return suggMasSing(m.group(2))
def c4122s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ">[bcdfgjklmnpqrstvwxz].*:[NAQ].*:f", ":[GWme]")
def s4122s_1 (s, m):
    return m.group(1).replace("on", "a")
def c4122s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasMasForm(m.group(2))
def s4122s_2 (s, m):
    return suggMasSing(m.group(2), True)
def c4122s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]")
def s4122s_3 (s, m):
    return suggMasSing(m.group(2))
def c4127s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:s", ":[GWme]")
def c4127s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasMasForm(m.group(2))
def s4127s_2 (s, m):
    return suggMasSing(m.group(2), True)
def c4127s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]")
def s4127s_3 (s, m):
    return suggMasSing(m.group(2))
def c4127s_4 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo
def c4148s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":(?:e|f|P|G|W|[1-3][sp]|Y)")
def c4148s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s4148s_2 (s, m):
    return suggFemSing(m.group(2), True)
def c4148s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p")
def s4148s_3 (s, m):
    return suggFemSing(m.group(2))
def c4153s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":(?:e|f|P|G|W|[1-3][sp]|Y)") or ( morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[fe]") and morphex(dDA, (m.start(1), m.group(1)), ":[RC]", ">(?:e[tn]|ou) ") and not (morph(dDA, (m.start(1), m.group(1)), ":(?:Rv|C)", False) and morph(dDA, (m.start(3), m.group(3)), ":Y", False)) )
def c4153s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(3))
def s4153s_2 (s, m):
    return suggFemSing(m.group(3), True)
def c4153s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p") or ( morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[si]") and morphex(dDA, (m.start(1), m.group(1)), ":[RC]", ">(?:e[tn]|ou)") and not (morph(dDA, (m.start(1), m.group(1)), ":Rv", False) and morph(dDA, (m.start(3), m.group(3)), ":Y", False)) )
def s4153s_3 (s, m):
    return suggFemSing(m.group(3))
def c4162s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efPGWY]")
def c4162s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s4162s_2 (s, m):
    return suggFemSing(m.group(2), True)
def c4162s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]")
def s4162s_3 (s, m):
    return suggFemSing(m.group(2))
def c4177s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efGW]")
def c4177s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s4177s_2 (s, m):
    return suggFemSing(m.group(2), True)
def c4177s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]")
def s4177s_3 (s, m):
    return suggFemSing(m.group(2))
def c4186s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":(?:e|f|G|W|V0|3s|P)") and not ( m.group(2) == "demi" and morph(dDA, nextword1(s, m.end()), ":N.*:f") )
def c4186s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s4186s_2 (s, m):
    return suggFemSing(m.group(2), True)
def c4186s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]") and not morph(dDA, prevword(s, m.start(), 2), ":B", False)
def s4186s_3 (s, m):
    return suggFemSing(m.group(2))
def c4192s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":(?:e|f|G|W|V0|3s)")
def c4192s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s4192s_2 (s, m):
    return suggFemPlur(m.group(2), True)
def c4204s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efGW]")
def s4204s_1 (s, m):
    return suggCeOrCet(m.group(2))
def c4204s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s4204s_2 (s, m):
    return suggFemSing(m.group(2), True)
def c4204s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]")
def s4204s_3 (s, m):
    return suggFemSing(m.group(2))
def c4209s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efGW]")
def s4209s_1 (s, m):
    return m.group(1).replace("a", "on")
def c4209s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and not re.search("(?i)^[aâeéèêiîoôuûyœæ]", m.group(2)) and hasFemForm(m.group(2))
def s4209s_2 (s, m):
    return suggFemSing(m.group(2), True)
def c4209s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ">[aâeéèêiîoôuûyœæ].+:[NAQ].*:f", ":[eGW]")
def s4209s_3 (s, m):
    return m.group(1).replace("a", "on")
def c4209s_4 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]")
def s4209s_4 (s, m):
    return suggFemSing(m.group(2))
def c4227s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":[emGWP]")
def c4227s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasMasForm(m.group(2))
def s4227s_2 (s, m):
    return suggMasPlur(m.group(2), True)
def c4227s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return (morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":(?:[ipGWP]|V0)") and not (look(s[m.end():], "^ +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False))) or m.group(1) in aREGULARPLURAL
def s4227s_3 (s, m):
    return suggPlur(m.group(2))
def c4235s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":[emGW]")
def c4235s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasMasForm(m.group(2))
def s4235s_2 (s, m):
    return suggMasPlur(m.group(2), True)
def c4240s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efGWP]")
def c4240s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s4240s_2 (s, m):
    return suggFemPlur(m.group(2), True)
def c4240s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return (morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[ipGWP]") and not (look(s[m.end():], "^ +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False))) or m.group(2) in aREGULARPLURAL
def s4240s_3 (s, m):
    return suggPlur(m.group(1))
def c4248s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efGW]")
def c4248s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s4248s_2 (s, m):
    return suggFemPlur(m.group(2), True)
def c4262s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p")
def c4262s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo
def s4262s_2 (s, m):
    return suggSing(m.group(2))
def c4266s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p") or ( morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[si]") and morphex(dDA, (m.start(1), m.group(1)), ":[RC]|>de ", ">(?:e[tn]|ou)") and not (morph(dDA, (m.start(1), m.group(1)), ":Rv", False) and morph(dDA, (m.start(3), m.group(3)), ":Y", False)) )
def c4266s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo
def s4266s_2 (s, m):
    return suggSing(m.group(3))
def c4271s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]")
def c4271s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo
def s4271s_2 (s, m):
    return suggSing(m.group(2))
def c4281s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[siGW]")
def s4281s_1 (s, m):
    return suggSing(m.group(1))
def c4288s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siG]")
def c4297s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return ( morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s") and not (look(s[m.end():], "^ +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False)) ) or m.group(1) in aREGULARPLURAL
def s4297s_1 (s, m):
    return suggPlur(m.group(1))
def c4302s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return ( morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") or (morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[pi]|>avoir") and morphex(dDA, (m.start(1), m.group(1)), ":[RC]", ">(?:e[tn]|ou) ") and not (morph(dDA, (m.start(1), m.group(1)), ":Rv", False) and morph(dDA, (m.start(2), m.group(2)), ":Y", False))) ) and not (look(s[m.end():], "^ +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False))
def s4302s_1 (s, m):
    return suggPlur(m.group(2))
def c4308s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[ipYPGW]") and not (look(s[m.end():], "^ +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False))) or m.group(1) in aREGULARPLURAL
def s4308s_1 (s, m):
    return suggPlur(m.group(1))
def c4322s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":(?:[ipGW]|[123][sp])") and not (look(s[m.end():], "^ +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False))) or m.group(2) in aREGULARPLURAL
def s4322s_1 (s, m):
    return suggPlur(m.group(2))
def c4322s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo
def c4333s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[ipGW]") and not (look(s[m.end():], "^ +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False))) or m.group(1) in aREGULARPLURAL
def s4333s_1 (s, m):
    return suggPlur(m.group(1))
def c4339s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[ipGWP]") and not (look(s[m.end():], "^ +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False))) or m.group(1) in aREGULARPLURAL
def s4339s_1 (s, m):
    return suggPlur(m.group(1))
def c4365s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[ip]|>o(?:nde|xydation|or)\\b") and morphex(dDA, prevword1(s, m.start()), ":(?:G|[123][sp])", ":[AD]", True)) or m.group(1) in aREGULARPLURAL
def s4365s_1 (s, m):
    return suggPlur(m.group(1))
def c4374s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[ip]") or m.group(1) in aREGULARPLURAL
def s4374s_1 (s, m):
    return suggPlur(m.group(1))
def c4382s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[ip]") or m.group(1) in aREGULARPLURAL
def s4382s_1 (s, m):
    return suggPlur(m.group(1))
def c4394s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":B.*:p", False) and m.group(2) != "cents"
def c4419s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not re.search("(?i)^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$", m.group(2))) or m.group(2) in aREGULARPLURAL
def s4419s_1 (s, m):
    return suggPlur(m.group(2))
def c4429s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not morph(dDA, prevword1(s, m.start()), ":N", False) and not re.search("(?i)^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$", m.group(2))) or m.group(2) in aREGULARPLURAL
def s4429s_1 (s, m):
    return suggPlur(m.group(2))
def c4439s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s") or m.group(1) in aREGULARPLURAL) and not look(s[:m.start()], r"(?i)\b(?:le|un|ce|du) +$")
def s4439s_1 (s, m):
    return suggPlur(m.group(1))
def c4447s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p") and not re.search("(?i)^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor|Rois|Corinthiens|Thessaloniciens)$", m.group(1))
def s4447s_1 (s, m):
    return suggSing(m.group(1))
def c4457s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("^0*[01]$", m.group(1)) and ((morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not re.search("(?i)^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$", m.group(2))) or m.group(1) in aREGULARPLURAL)
def s4457s_1 (s, m):
    return suggPlur(m.group(2))
def c4469s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:p", ":(?:V0e|[NAQ].*:[me]:[si])")
def c4469s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s4469s_2 (s, m):
    return suggMasSing(m.group(2), True)
def c4469s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:p", ":(?:V0e|[NAQ].*:[me]:[si])")
def c4469s_4 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo
def s4469s_4 (s, m):
    return suggSing(m.group(2))
def c4469s_5 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:[si]", ":(?:V0e|[NAQ].*:[me]:[si])")
def c4469s_6 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s4469s_6 (s, m):
    return suggMasSing(m.group(2), True)
def c4477s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:s", ":(?:V0e|[NAQ].*:[me]:[pi])")
def c4477s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s4477s_2 (s, m):
    return suggMasPlur(m.group(2), True)
def c4477s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:s", ":(?:V0e|[NAQ].*:[me]:[pi])")
def c4477s_4 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo
def s4477s_4 (s, m):
    return suggPlur(m.group(2))
def c4477s_5 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:[pi]", ":(?:V0e|[NAQ].*:[me]:[pi])")
def c4477s_6 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s4477s_6 (s, m):
    return suggMasPlur(m.group(2), True)
def c4485s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:p", ":(?:V0e|[NAQ].*:[fe]:[si])")
def c4485s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s4485s_2 (s, m):
    return suggFemSing(m.group(2), True)
def c4485s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:p", ":(?:V0e|[NAQ].*:[fe]:[si])")
def c4485s_4 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo
def s4485s_4 (s, m):
    return suggSing(m.group(2))
def c4485s_5 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:[si]", ":(?:V0e|[NAQ].*:[fe]:[si])")
def c4485s_6 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s4485s_6 (s, m):
    return suggFemSing(m.group(2), True)
def c4493s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:s", ":(?:V0e|[NAQ].*:[fe]:[pi])")
def c4493s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s4493s_2 (s, m):
    return suggFemPlur(m.group(2), True)
def c4493s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:s", ":(?:V0e|[NAQ].*:[fe]:[pi])")
def c4493s_4 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo
def s4493s_4 (s, m):
    return suggPlur(m.group(2))
def c4493s_5 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:[pi]", ":(?:V0e|[NAQ].*:[fe]:[pi])")
def c4493s_6 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(2))
def s4493s_6 (s, m):
    return suggFemPlur(m.group(2), True)
def c4510s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$")
def c4515s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$")
def s4515s_1 (s, m):
    return m.group(1)[:-1]
def c4520s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$") and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":[me]")
def c4525s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$") and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[fe]")
def c4530s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$") and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":[me]")
def c4535s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$") and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[fe]")
def c4552s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":V0e", False)
def c4556s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":V0e", False) and morphex(dDA, (m.start(4), m.group(4)), ":[NAQ].*:m", ":[fe]")
def s4556s_1 (s, m):
    return m.group(1).replace("lle", "l")
def c4568s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":V0e", False)
def c4572s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":V0e", False) and morphex(dDA, (m.start(4), m.group(4)), ":[NAQ].*:f", ":[me]")
def s4572s_1 (s, m):
    return m.group(1).replace("l", "lle")
def c4585s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">trouver ", False) and morphex(dDA, (m.start(3), m.group(3)), ":A.*:(?:f|m:p)", ":(?:G|3[sp]|M[12P])")
def s4585s_1 (s, m):
    return suggMasSing(m.group(3))
def c4597s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return ((morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and not apposition(m.group(1), m.group(2))
def s4597s_1 (s, m):
    return switchGender(m.group(2))
def c4597s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(1))
def s4597s_2 (s, m):
    return switchGender(m.group(1))
def c4597s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return ((morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p")) or (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s"))) and not apposition(m.group(1), m.group(2))
def s4597s_3 (s, m):
    return switchPlural(m.group(2))
def c4597s_4 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo
def s4597s_4 (s, m):
    return switchPlural(m.group(1))
def c4612s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return ( (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m")) ) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s4612s_1 (s, m):
    return switchGender(m.group(2))
def c4612s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(1))
def s4612s_2 (s, m):
    return switchGender(m.group(1))
def c4612s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return ( (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s")) or (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p")) ) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s4612s_3 (s, m):
    return switchPlural(m.group(2))
def c4612s_4 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo
def s4612s_4 (s, m):
    return switchPlural(m.group(1))
def c4627s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return ( (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":[GYfe]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f", ":[GYme]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m")) ) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s4627s_1 (s, m):
    return switchGender(m.group(2))
def c4627s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(1))
def s4627s_2 (s, m):
    return switchGender(m.group(1))
def c4627s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return ( (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[GYsi]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[GYpi]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p")) ) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s4627s_3 (s, m):
    return switchPlural(m.group(2))
def c4627s_4 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo
def s4627s_4 (s, m):
    return switchPlural(m.group(1))
def c4642s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return ( (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":(?:[Gfe]|V0e|Y)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f", ":(?:[Gme]|V0e|Y)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m")) ) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s4642s_1 (s, m):
    return switchGender(m.group(2))
def c4642s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(1))
def s4642s_2 (s, m):
    return switchGender(m.group(1))
def c4642s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return ( (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":(?:[Gsi]|V0e|Y)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":(?:[Gpi]|V0e|Y)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p")) ) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s4642s_3 (s, m):
    return switchPlural(m.group(2))
def c4642s_4 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo
def s4642s_4 (s, m):
    return switchPlural(m.group(1))
def c4668s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^air$", m.group(1)) and not m.group(2).startswith("seul") and ( (morph(dDA, (m.start(1), m.group(1)), ":m") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morph(dDA, (m.start(1), m.group(1)), ":f") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m")) ) and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s4668s_1 (s, m):
    return switchGender(m.group(2), False)
def c4668s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(1))
def s4668s_2 (s, m):
    return switchGender(m.group(1))
def c4668s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^air$", m.group(1)) and not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[si]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s4668s_3 (s, m):
    return suggSing(m.group(2))
def c4679s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and ( (morph(dDA, (m.start(1), m.group(1)), ":m") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morph(dDA, (m.start(1), m.group(1)), ":f") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m")) ) and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]", False, False)
def s4679s_1 (s, m):
    return switchGender(m.group(2), False)
def c4679s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(1))
def s4679s_2 (s, m):
    return switchGender(m.group(1))
def c4679s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^air$", m.group(1)) and not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[si]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]", False, False)
def s4679s_3 (s, m):
    return suggSing(m.group(2))
def c4699s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[me]", ":(?:B|G|V0|f)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s4699s_1 (s, m):
    return suggMasSing(m.group(2), True)
def c4699s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not m.group(2).startswith("seul") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|d’) *$")
def s4699s_2 (s, m):
    return suggMasSing(m.group(2))
def c4708s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[me]", ":(?:B|G|V0|f)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s4708s_1 (s, m):
    return suggMasSing(m.group(2), True)
def c4708s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not m.group(2).startswith("seul") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQB]|>(?:et|ou) ", False, False)
def s4708s_2 (s, m):
    return suggMasSing(m.group(2))
def c4728s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s4728s_1 (s, m):
    return suggFemSing(m.group(2), True)
def c4728s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) != "fois" and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not m.group(2).startswith("seul") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|d’) *$")
def s4728s_2 (s, m):
    return suggFemSing(m.group(2))
def c4737s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s4737s_1 (s, m):
    return suggFemSing(m.group(2), True)
def c4737s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) != "fois" and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not m.group(2).startswith("seul") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQB]|>(?:et|ou) ", False, False)
def s4737s_2 (s, m):
    return suggFemSing(m.group(2))
def c4758s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[me]", ":(?:B|G|V0|f)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s4758s_1 (s, m):
    return suggMasSing(m.group(2), True)
def c4758s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWsi]") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s4758s_2 (s, m):
    return suggMasSing(m.group(2))
def c4768s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[me]", ":(?:B|G|V0|f)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s4768s_1 (s, m):
    return suggMasSing(m.group(2), True)
def c4768s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWsi]") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s4768s_2 (s, m):
    return suggMasSing(m.group(2))
def c4783s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":(?:B|G|e|V0|f)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s4783s_1 (s, m):
    return suggMasSing(m.group(2), True)
def c4783s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWsi]") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s4783s_2 (s, m):
    return suggMasSing(m.group(2))
def c4793s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":(?:B|G|e|V0|f)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s4793s_1 (s, m):
    return suggMasSing(m.group(2), True)
def c4793s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWsi]") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s4793s_2 (s, m):
    return suggMasSing(m.group(2))
def c4809s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) != "fois" and not m.group(2).startswith("seul") and morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s4809s_1 (s, m):
    return suggFemSing(m.group(2), True)
def c4809s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWsi]") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s4809s_2 (s, m):
    return suggFemSing(m.group(2))
def c4819s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) != "fois" and not m.group(2).startswith("seul") and morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s4819s_1 (s, m):
    return suggFemSing(m.group(2), True)
def c4819s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWsi]") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s4819s_2 (s, m):
    return suggFemSing(m.group(2))
def c4836s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) != "fois" and not m.group(2).startswith("seul") and not re.search("(?i)^quelque chose", m.group(0)) and ((morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":(?:B|e|G|V0|f)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f", ":(?:B|e|G|V0|m)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s4836s_1 (s, m):
    return switchGender(m.group(2), False)
def c4836s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(1))
def s4836s_2 (s, m):
    return switchGender(m.group(1), False)
def c4836s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWsi]") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s4836s_3 (s, m):
    return suggSing(m.group(2))
def c4847s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) != "fois" and not m.group(2).startswith("seul") and not re.search("(?i)quelque chose", m.group(0)) and ((morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":(?:B|e|G|V0|f)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f", ":(?:B|e|G|V0|m)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s4847s_1 (s, m):
    return switchGender(m.group(2), False)
def c4847s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(1))
def s4847s_2 (s, m):
    return switchGender(m.group(1), False)
def c4847s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWsi]") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s4847s_3 (s, m):
    return suggSing(m.group(2))
def c4864s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[me]", ":(?:B|G|V0|f)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s4864s_1 (s, m):
    return suggMasPlur(m.group(2), True)
def c4864s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not apposition(m.group(1), m.group(2)) and not look_chk1(dDA, s[m.end():], m.end(), r"^ +et +(\w[\w-]+)", ":A") and not look(s[:m.start()], r"(?i)\bune de ")
def s4864s_2 (s, m):
    return suggMasPlur(m.group(2))
def c4875s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[me]", ":(?:B|G|V0|f)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s4875s_1 (s, m):
    return suggMasPlur(m.group(2), True)
def c4875s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not apposition(m.group(1), m.group(2)) and not look_chk1(dDA, s[m.end():], m.end(), r"^ +et +(\w[\w-]+)", ":A") and not ( look(s[:m.start()], r"(?i)\bune? de ") or (m.group(0).startswith("de") and look(s[:m.start()], r"(?i)\bune? +$")) )
def s4875s_2 (s, m):
    return suggMasPlur(m.group(2))
def c4892s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) != "fois" and not m.group(2).startswith("seul") and morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s4892s_1 (s, m):
    return suggFemPlur(m.group(2), True)
def c4892s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not apposition(m.group(1), m.group(2)) and not look_chk1(dDA, s[m.end():], m.end(), r"^ +et +(\w[\w-]+)", ":A") and not look(s[:m.start()], r"(?i)\bune de ")
def s4892s_2 (s, m):
    return suggFemPlur(m.group(2))
def c4903s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) != "fois" and not m.group(2).startswith("seul") and morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s4903s_1 (s, m):
    return suggFemPlur(m.group(2), True)
def c4903s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not apposition(m.group(1), m.group(2)) and not look_chk1(dDA, s[m.end():], m.end(), r"^ +et +(\w[\w-]+)", ":A") and not ( look(s[:m.start()], r"(?i)\bune? de ") or (m.group(0).startswith("de") and look(s[:m.start()], r"(?i)\bune? +$")) )
def s4903s_2 (s, m):
    return suggFemPlur(m.group(2))
def c4920s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) != "fois" and not m.group(2).startswith("seul") and ((morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":(?:B|e|G|V0|f)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f", ":(?:B|e|G|V0|m)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s4920s_1 (s, m):
    return switchGender(m.group(2), True)
def c4920s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(1))
def s4920s_2 (s, m):
    return switchGender(m.group(1), True)
def c4920s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) != "fois" and not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not apposition(m.group(1), m.group(2)) and not look_chk1(dDA, s[m.end():], m.end(), r"^ +et +(\w[\w-]+)", ":A") and not look(s[:m.start()], r"(?i)\bune? de ")
def s4920s_3 (s, m):
    return suggPlur(m.group(2))
def c4932s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) != "fois" and not m.group(2).startswith("seul") and ((morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":(?:B|e|G|V0|f)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f", ":(?:B|e|G|V0|m)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s4932s_1 (s, m):
    return switchGender(m.group(2), True)
def c4932s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(1))
def s4932s_2 (s, m):
    return switchGender(m.group(1), True)
def c4932s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) != "fois" and not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not apposition(m.group(1), m.group(2)) and not look_chk1(dDA, s[m.end():], m.end(), r"^ +et +(\w[\w-]+)", ":A") and not ( look(s[:m.start()], r"(?i)\bune? de ") or (m.group(0).startswith("de") and look(s[:m.start()], r"(?i)\bune? +$")) )
def s4932s_3 (s, m):
    return suggPlur(m.group(2))
def c4953s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) != "fois" and not m.group(2).startswith("seul") and ( (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":[fe]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f", ":[me]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m")) ) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRBX]|>comme ", True, True)
def s4953s_1 (s, m):
    return switchGender(m.group(2), True)
def c4953s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and hasFemForm(m.group(1))
def s4953s_2 (s, m):
    return switchGender(m.group(1))
def c4953s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not apposition(m.group(1), m.group(2)) and (morphex(dDA, (m.start(2), m.group(2)), ":N", ":[AQ]") or morph(dDA, prevword1(s, m.start()), ":[VRBX]|>comme ", True, True))
def s4953s_3 (s, m):
    return suggPlur(m.group(2))
def c4979s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s")) or (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[si]") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p"))
def s4979s_1 (s, m):
    return switchPlural(m.group(3))
def c4988s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s")
def s4988s_1 (s, m):
    return suggPlur(m.group(3))
def c4996s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:[si]", ":G") and morph(dDA, (m.start(4), m.group(4)), ":[NAQ].*:p")
def s4996s_1 (s, m):
    return suggSing(m.group(4))
def c5005s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", False) and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:[pi]", ":G") and morph(dDA, (m.start(4), m.group(4)), ":[NAQ].*:s") and not look(s[:m.start()], r"(?i)\bune? de ")
def s5005s_1 (s, m):
    return suggPlur(m.group(4))
def c5017s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:(?:m|f:p)", ":(?:G|P|[fe]:[is]|V0|3[sp])") and not apposition(m.group(1), m.group(2))
def s5017s_1 (s, m):
    return suggFemSing(m.group(2), True)
def c5022s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") and not apposition(m.group(1), m.group(2))
def s5022s_1 (s, m):
    return suggMasSing(m.group(2), True)
def c5027s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f|>[aéeiou].*:e", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:(?:f|m:p)", ":(?:G|P|m:[is]|V0|3[sp])") and not apposition(m.group(1), m.group(2))
def s5027s_1 (s, m):
    return suggMasSing(m.group(2), True)
def c5032s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":G|>[aéeiou].*:[ef]") and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") and not apposition(m.group(2), m.group(3))
def s5032s_1 (s, m):
    return suggMasSing(m.group(3), True)
def c5038s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":G|>[aéeiou].*:[ef]") and not morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f|>[aéeiou].*:e", False) and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") and not apposition(m.group(2), m.group(3))
def s5038s_1 (s, m):
    return suggMasSing(m.group(3), True)
def c5044s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":(?:G|P|[me]:[ip]|V0|3[sp])") and not apposition(m.group(1), m.group(2))
def s5044s_1 (s, m):
    return suggPlur(m.group(2))
def c5085s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not prevword1(s, m.start())
def c5087s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not prevword1(s, m.start())
def c5089s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not prevword1(s, m.start())
def c5103s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\bquatre $")
def c5105s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, nextword1(s, m.end()), ":B", False) and not look(s[:m.start()], r"(?i)\b(?:numéro|page|chapitre|référence|année|test|série)s? +$")
def s5120s_1 (s, m):
    return m.group(0)[:-1]
def c5128s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, nextword1(s, m.end()), ":B|>une?", False, True) and not look(s[:m.start()], r"(?i)\b(?:numéro|page|chapitre|référence|année|test|série)s? +$")
def c5132s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, nextword1(s, m.end()), ":B|>une?", False, False)
def c5136s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", ":G") and morphex(dDA, prevword1(s, m.start()), ":[VR]", ":B", True)
def c5147s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, nextword1(s, m.end()), ":B|:N.*:p", ":[QA]", False) or (morph(dDA, prevword1(s, m.start()), ":B") and morph(dDA, nextword1(s, m.end()), ":[NAQ]", False))
def c5160s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, prevword1(s, m.start()), ":D.*:[si]", False, True)
def s5168s_1 (s, m):
    return suggPlur(m.group(1))
def s5173s_1 (s, m):
    return suggPlur(m.group(1))
def c5190s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:mettre|mise) ", False)
def c5210s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c5213s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False) and morph(dDA, (m.start(3), m.group(3)), ":(?:N|MP)")
def s5263s_1 (s, m):
    return m.group(1).rstrip("e")
def c5271s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:V0e|W)|>très", False)
def c5280s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:co[ûu]ter|payer) ", False)
def c5289s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">donner ", False)
def c5327s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:avoir|perdre) ", False)
def c5330s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b(?:lit|fauteuil|armoire|commode|guéridon|tabouret|chaise)s?\b")
def c5343s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, prevword1(s, m.start()), ":(?:V|[NAQ].*:s)", ":(?:[NA]:.:[pi]|V0e.*:[123]p)", True)
def c5394s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (look(s[m.end():], "^ [ldmtsc]es ") and not look(s[:m.start()], r"(?i)\b(?:ils?|elles?|ne) +")) or ( morph(dDA, prevword1(s, m.start()), ":Cs", False, True) and not look(s[:m.start()], ", +$") and not look(s[m.end():], r"(?i)^ +(?:ils?|elles?)\b") and not morph(dDA, nextword1(s, m.end()), ":Q", False, False) )
def c5421s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D.*:f:s", False, False)
def c5423s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:aller|partir) ", False)
def c5434s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":V0e.*:3p", False, False) or morph(dDA, nextword1(s, m.end()), ":Q", False, False)
def c5456s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:être|devenir|para[îi]tre|rendre|sembler) ", False)
def s5456s_1 (s, m):
    return m.group(2).replace("oc", "o")
def s5461s_1 (s, m):
    return m.group(1).replace("oc", "o")
def c5481s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">tenir ")
def c5498s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">mettre ", False)
def c5500s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c5541s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:être|aller) ", False)
def s5544s_1 (s, m):
    return m.group(1).replace("auspice", "hospice")
def s5547s_1 (s, m):
    return m.group(1).replace("auspice", "hospice").replace("Auspice", "Hospice")
def c5581s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, nextword1(s, m.end()), ":[AQ]")
def s5589s_1 (s, m):
    return m.group(0).replace("ite", "itte")
def c5596s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) != "bonne et due forme"
def s5611s_1 (s, m):
    return m.group(1).replace("cane", "canne")
def c5621s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:appuyer|battre|frapper|lever|marcher) ", False)
def s5621s_1 (s, m):
    return m.group(2).replace("cane", "canne")
def c5629s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("^C(?:annes|ANNES)", m.group(1))
def c5633s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("^C(?:annes|ANNES)", m.group(1))
def c5649s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c5666s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False)
def c5669s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, prevword1(s, m.start()), ":[VR]", False)
def c5678s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^à cor et à cri$", m.group(0))
def c5687s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">tordre ", False)
def c5690s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">rendre ", False)
def c5704s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">couper ")
def c5706s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:avoir|donner|laisser) ", False)
def c5724s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b(?:[lmtsc]es|des?|[nv]os|leurs|quels) +$")
def c5738s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, nextword1(s, m.end()), ":[GVX]", ":[NAQ]", True)
def c5742s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, nextword1(s, m.end()), ":[GV]", ":[NAQ]", False)
def c5746s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, nextword1(s, m.end()), ":[GV]", ":[NAQ]", True)
def c5750s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, nextword1(s, m.end()), ":G", ":[NAQ]")
def c5754s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def s5754s_1 (s, m):
    return m.group(2).replace("nd", "nt")
def c5770s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, prevword1(s, m.start()), ":V0e", False, False)
def c5777s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ">(?:abandonner|céder|résister) ", False) and not look(s[m.end():], "^ d(?:e |’)")
def s5791s_1 (s, m):
    return m.group(1).replace("nt", "mp")
def c5808s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False) and morph(dDA, (m.start(3), m.group(3)), ":(?:Y|Oo)", False)
def s5808s_1 (s, m):
    return m.group(2).replace("sens", "cens")
def s5818s_1 (s, m):
    return m.group(1).replace("c", "s").replace("C", "S")
def s5826s_1 (s, m):
    return m.group(1).replace("o", "ô")
def s5834s_1 (s, m):
    return m.group(1).replace("o", "ô").replace("tt", "t")
def s5840s_1 (s, m):
    return m.group(1).replace("ô", "o").replace("tt", "t")
def s5843s_1 (s, m):
    return m.group(1).replace("ô", "o").replace("t", "tt")
def c5846s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False)
def c5877s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:desceller|desseller) ", False)
def s5877s_1 (s, m):
    return m.group(2).replace("descell", "décel").replace("dessell", "décel")
def c5882s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:desceller|desseller) ", False)
def s5882s_1 (s, m):
    return m.group(1).replace("descell", "décel").replace("dessell", "décel")
def c5895s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D.*:[me]:[sp]", False)
def c5897s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0", False)
def s5897s_1 (s, m):
    return m.group(2).replace("î", "i")
def c5907s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b(?:[vn]ous|lui|leur|et toi) +$|[nm]’$")
def s5917s_1 (s, m):
    return m.group(1).replace("and", "ant")
def c5924s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not ( m.group(1) == "bonne" and look(s[:m.start()], r"(?i)\bune +$") and look(s[m.end():], "(?i)^ +pour toute") )
def c5928s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:faire|perdre|donner) ", False)
def c5959s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":D", False)
def s6055s_1 (s, m):
    return m.group(0)[:-1].replace(" ", "-")+"à"
def c6057s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":[NAQ]")
def c6059s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":[123][sp]")
def c6072s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":[GQ]")
def c6075s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":[GQ]")
def c6081s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":[GQ]")
def s6102s_1 (s, m):
    return m.group(0).replace("ée", "er")
def c6109s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">soulever ", False)
def s6109s_1 (s, m):
    return m.group(1)[3:]
def c6127s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:être|habiter|trouver|situer|rester|demeurer?) ", False)
def c6132s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">avoir ", False)
def c6150s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return look(s[:m.start()], r"(?i)(?:la|une|cette|quelle|cette|[mts]a) +$")
def c6157s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False)
def c6166s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False)
def c6189s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not (m.group(1) == "Notre" and look(s[m.end():], "Père"))
def s6189s_1 (s, m):
    return m.group(1).replace("otre", "ôtre")
def c6192s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b(les?|la|du|des|aux?) +") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ]", False)
def s6192s_1 (s, m):
    return m.group(1).replace("ôtre", "otre").rstrip("s")
def c6202s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def c6223s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not prevword1(s, m.start())
def c6226s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return ( re.search("^[nmts]e$", m.group(2)) or (not re.search("(?i)^(?:confiance|envie|peine|prise|crainte|affaire|hâte|force|recours|somme)$", m.group(2)) and morphex(dDA, (m.start(2), m.group(2)), ":[0123][sp]", ":[QG]")) ) and morph(dDA, prevword1(s, m.start()), ":Cs", False, True)
def c6232s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:[1-3][sp])", ":(?:G|1p)") and not ( m.group(0).find(" leur ") and morph(dDA, (m.start(2), m.group(2)), ":[NA].*:[si]", False) ) and not prevword1(s, m.start())
def c6241s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":[VR]", False, False) and not morph(dDA, nextword1(s, m.end()), ":(?:3s|Oo|X)", False)
def c6256s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":3[sp]", ":Y")
def c6260s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def s6272s_1 (s, m):
    return m.group(1).replace("pin", "pain")
def c6275s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:manger|dévorer|avaler|engloutir) ")
def s6275s_1 (s, m):
    return m.group(2).replace("pin", "pain")
def c6289s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">aller ", False)
def c6297s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def s6297s_1 (s, m):
    return m.group(2).replace("pal", "pâl")
def s6301s_1 (s, m):
    return m.group(1).replace("pal", "pâl")
def c6311s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">prendre ", False)
def c6313s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">tirer ", False)
def c6315s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c6319s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">prendre ", False)
def c6337s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ]")
def c6346s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:N|A|Q|G|MP)")
def c6373s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return ( m.group(0).endswith("s") and look(s[:m.start()], r"(?i)\b(?:[mtscd]es|[nv]os|leurs|quels) $") ) or ( m.group(0).endswith("e") and look(s[:m.start()], r"(?i)\b(?:mon|ce|quel|un|du) $") )
def s6373s_1 (s, m):
    return m.group(0).replace("que", "c")
def c6384s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False)
def c6391s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, nextword1(s, m.end()), ":(?:Os|C)", False, True)
def c6402s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, nextword1(s, m.end()), ":[AQ]", False)
def c6443s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not nextword1(s, m.end())
def c6450s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">résonner ", False)
def s6450s_1 (s, m):
    return m.group(1).replace("réso", "raiso")
def c6466s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":M1", False) and morph(dDA, prevword1(s, m.start()), ":(?:R|[123][sp])", False, True)
def s6486s_1 (s, m):
    return m.group(1).replace("sale", "salle")
def c6490s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def s6490s_1 (s, m):
    return m.group(2).replace("salle", "sale")
def s6509s_1 (s, m):
    return m.group(1).replace("scep","sep")
def c6512s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:être|demeurer) ", False)
def s6512s_1 (s, m):
    return m.group(2).replace("sep", "scep")
def c6522s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">suivre ", False)
def c6530s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^soi-disant$", m.group(0))
def c6538s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[m.end():], " soit ")
def c6540s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, nextword1(s, m.end()), ":[GY]", True, True) and not look(s[:m.start()], "(?i)quel(?:s|les?|) qu $|on $|il $") and not look(s[m.end():], " soit ")
def c6546s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, prevword1(s, m.start()), ":[YQ]|>(?:avec|contre|par|pour|sur) ", False, True)
def c6568s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return ( morphex(dDA, (m.start(2), m.group(2)), ":N.*:[me]:s", ":[GW]") or (re.search("(?i)^[aeéiîou]", m.group(2)) and morphex(dDA, (m.start(2), m.group(2)), ":N.*:f:s", ":G")) ) and ( look(s[:m.start()], r"(?i)^ *$|\b(?:à|avec|chez|dès|contre|devant|derrière|par|pour|sans|sur) +$|, +$| en +$|^en +$") or (morphex(dDA, prevword1(s, m.start()), ":V", ":(?:G|W|[NA].*:[pi])") and not look(s[:m.start()], r"(?i)\bce que?\b")) )
def s6594s_1 (s, m):
    return m.group(1).replace("sur", "sûr")
def s6598s_1 (s, m):
    return m.group(1).replace("sur", "sûr")
def c6606s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":Y", False)
def s6606s_1 (s, m):
    return m.group(1).replace("sur", "sûr")
def c6624s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":N", ":[GMY]|>(?:fonds?|grande (?:envergure|ampleur|importance)|envergure|ampleur|importance|départ|surveillance) ") and not look(s[:m.start()], "accompl|dél[éè]gu")
def s6624s_1 (s, m):
    return m.group(1).replace("â", "a")
def s6629s_1 (s, m):
    return m.group(1).replace("â", "a")
def c6644s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">aller ", False)
def c6647s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def s6650s_1 (s, m):
    return m.group(1).replace("au", "ô")
def c6662s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False) and morph(dDA, (m.start(3), m.group(3)), ":Y|>(?:ne|en|y) ", False)
def c6684s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">avoir ", False)
def s6695s_1 (s, m):
    return m.group(1).replace("énén", "enim")
def s6698s_1 (s, m):
    return m.group(1).replace("enim", "énén")
def s6710s_1 (s, m):
    return m.group(1).replace("re", "").replace("t", "")
def c6720s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[me]:s")
def c6759s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(1).isdigit() and not m.group(2).isdigit() and not morph(dDA, (m.start(0), m.group(0)), ":", False) and not morph(dDA, (m.start(2), m.group(2)), ":G", False) and _oDict.isValid(m.group(1)+m.group(2))
def c6759s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(2) != "là" and not re.search("(?i)^(?:ex|mi|quasi|semi|non|demi|pro|anti|multi|pseudo|proto|extra)$", m.group(1)) and not m.group(1).isdigit() and not m.group(2).isdigit() and not morph(dDA, (m.start(2), m.group(2)), ":G", False) and not morph(dDA, (m.start(0), m.group(0)), ":", False) and not _oDict.isValid(m.group(1)+m.group(2))
def c6774s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return look(s[:m.start()], r"[\w,] +$")
def s6774s_1 (s, m):
    return m.group(0).lower()
def c6783s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return look(s[:m.start()], r"[\w,] +$") and not( ( m.group(0)=="Juillet" and look(s[:m.start()], "(?i)monarchie +de +$") ) or ( m.group(0)=="Octobre" and look(s[:m.start()], "(?i)révolution +d’$") ) )
def s6783s_1 (s, m):
    return m.group(0).lower()
def c6809s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^fonctions? ", m.group(0)) or not look(s[:m.start()], r"(?i)\ben $")
def s6814s_1 (s, m):
    return m.group(1).replace("é", "É")
def c6826s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(2).istitle() and morphex(dDA, (m.start(1), m.group(1)), ":N", ":(?:A|V0e|D|R|B)") and not re.search("(?i)^[oO]céan Indien", m.group(0))
def s6826s_1 (s, m):
    return m.group(2).lower()
def c6826s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(2).islower() and not m.group(2).startswith("canadienne") and ( re.search("(?i)^(?:certaine?s?|cette|ce[ts]?|[dl]es|[nv]os|quelques|plusieurs|chaque|une|aux)$", m.group(1)) or ( re.search("(?i)^un$", m.group(1)) and not look(s[m.end():], "(?:approximatif|correct|courant|parfait|facile|aisé|impeccable|incompréhensible)") ) )
def s6826s_2 (s, m):
    return m.group(2).capitalize()
def s6845s_1 (s, m):
    return m.group(1).capitalize()
def c6853s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:parler|cours|leçon|apprendre|étudier|traduire|enseigner|professeur|enseignant|dictionnaire|méthode) ", False)
def s6853s_1 (s, m):
    return m.group(2).lower()
def s6858s_1 (s, m):
    return m.group(1).lower()
def c6886s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return look(s[:m.start()], r"\w")
def s6900s_1 (s, m):
    return m.group(1).capitalize()
def s6903s_1 (s, m):
    return m.group(1).capitalize()
def c6913s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return re.search("^(?:Mètre|Watt|Gramme|Seconde|Ampère|Kelvin|Mole|Cand[eé]la|Hertz|Henry|Newton|Pascal|Joule|Coulomb|Volt|Ohm|Farad|Tesla|W[eé]ber|Radian|Stéradian|Lumen|Lux|Becquerel|Gray|Sievert|Siemens|Katal)s?|(?:Exa|P[ée]ta|Téra|Giga|Méga|Kilo|Hecto|Déc[ai]|Centi|Mi(?:lli|cro)|Nano|Pico|Femto|Atto|Ze(?:pto|tta)|Yo(?:cto|etta))(?:mètre|watt|gramme|seconde|ampère|kelvin|mole|cand[eé]la|hertz|henry|newton|pascal|joule|coulomb|volt|ohm|farad|tesla|w[eé]ber|radian|stéradian|lumen|lux|becquerel|gray|sievert|siemens|katal)s?", m.group(2))
def s6913s_1 (s, m):
    return m.group(2).lower()
def c6929s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":Y")
def s6929s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c6936s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V1") and not m.group(1)[0:1].isupper() and (m.group(1).endswith("z") or not look(s[:m.start()], r"(?i)\b(?:quelqu(?:e chose|’une?)|(?:l(es?|a)|nous|vous|me|te|se)[ @]trait|personne|rien(?: +[a-zéèêâîûù]+|) +$)"))
def s6936s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c6946s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V1", ":M[12P]")
def s6946s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c6953s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V1", False)
def s6953s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c6960s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":[123][sp]")
def c6967s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V1", ":[NM]") and not morph(dDA, prevword1(s, m.start()), ">(?:tenir|passer) ", False)
def s6967s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c6975s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V1", False)
def s6975s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c6982s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V1", ":[NM]")
def s6982s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c6989s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":Q", False) and not morph(dDA, prevword1(s, m.start()), "V0.*[12]p", False)
def c6996s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:devoir|savoir|pouvoir) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":(?:Q|A|[123][sp])", ":[GYW]")
def s6996s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c7005s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:V1.*:Q|[13]s|2[sp])", ":[GYWM]") and not look(s[:m.start()], r"(?i)\bque? +$")
def s7005s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c7016s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:commencer|finir) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":V", ":[NGM]") and not m.group(2)[0:1].isupper()
def s7016s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c7027s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":A", False)
def s7027s_1 (s, m):
    return m.group(1)[:-1]
def c7047s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def c7051s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">sembler ", False)
def c7067s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and isEndOfNG(dDA, s[m.end():], m.end())
def c7072s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V[123]_i", False) and isNextNotCOD(dDA, s[m.end():], m.end())
def c7074s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":A", False) and morphex(dDA, (m.start(2), m.group(2)), ":A", ":[GM]")
def c7076s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":A", False)
def c7078s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[GV]") and isEndOfNG(dDA, s[m.end():], m.end())
def c7081s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":V0") and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ]", ":(?:G|[123][sp]|P)")
def c7092s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and isEndOfNG(dDA, s[m.end():], m.end())
def c7096s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], "[jn]’$")
def c7104s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":[GY]") and isEndOfNG(dDA, s[m.end():], m.end())
def c7107s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and isEndOfNG(dDA, s[m.end():], m.end())
def c7110s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and isEndOfNG(dDA, s[m.end():], m.end())
def c7114s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not prevword1(s, m.start())
def c7117s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":N", ":[GY]") and isEndOfNG(dDA, s[m.end():], m.end())
def c7119s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and isEndOfNG(dDA, s[m.end():], m.end())
def c7121s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":Y") and isEndOfNG(dDA, s[m.end():], m.end())
def c7173s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return re.search("(?i)^(?:fini|terminé)s?", m.group(2)) and morph(dDA, prevword1(s, m.start()), ":C", False, True)
def c7173s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return re.search("(?i)^(?:assez|trop)$", m.group(2)) and (look(s[m.end():], "^ +d(?:e |’)") or not nextword1(s, m.end()))
def c7173s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":A", ":[GVW]") and morph(dDA, prevword1(s, m.start()), ":C", False, True)
def c7193s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">aller", False) and not look(s[m.end():], " soit ")
def c7201s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":[AN].*:[me]:[pi]|>(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) .*:[123]p|>(?:affirmer|trouver|croire|désirer|estime|préférer|penser|imaginer|voir|vouloir|aimer|adorer|souhaiter) ") and not morph(dDA, nextword1(s, m.end()), ":A.*:[me]:[pi]", False)
def c7218s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def s7218s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c7225s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def s7225s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c7232s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def s7232s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c7240s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:faire|vouloir) ", False) and not look(s[:m.start()], r"(?i)\b(?:en|[mtsld]es?|[nv]ous|un) +$") and morphex(dDA, (m.start(2), m.group(2)), ":V", ":M") and not (re.search("(?i)^(?:fait|vouloir)$", m.group(1)) and m.group(2).endswith("é")) and not (re.search("(?i)^(?:fait|vouloir)s$", m.group(1)) and m.group(2).endswith("és"))
def s7240s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c7251s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False) and morphex(dDA, (m.start(2), m.group(2)), ":V", ":M")
def s7251s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c7259s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":M")
def s7259s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c7267s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">savoir :V", False) and morph(dDA, (m.start(2), m.group(2)), ":V", False) and not look(s[:m.start()], r"(?i)\b(?:[mts]e|[vn]ous|les?|la|un) +$")
def s7267s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c7275s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Q|2p)", False)
def s7275s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c7283s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:Q|2p)", ":N")
def s7283s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c7291s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":Q", False)
def s7291s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c7300s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">être ", False)
def c7300s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":Y", False)
def s7300s_2 (s, m):
    return suggVerbPpas(m.group(2))
def c7300s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return not bCondMemo and morph(dDA, (m.start(1), m.group(1)), ":[123]s", False) and morph(dDA, (m.start(2), m.group(2)), ":Q.*:p", False) and not look(s[:m.start()], r"(?i)\bque?[, ]")
def s7300s_3 (s, m):
    return suggSing(m.group(2))
def c7351s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (morph(dDA, (m.start(1), m.group(1)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(1).endswith(" été")) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWYsi]")
def s7351s_1 (s, m):
    return suggSing(m.group(2))
def c7372s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (morph(dDA, (m.start(1), m.group(1)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(1).endswith(" été")) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWYsi]")
def s7372s_1 (s, m):
    return suggSing(m.group(2))
def c7381s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]"))
def s7381s_1 (s, m):
    return suggMasSing(m.group(3))
def c7395s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not (morph(dDA, (m.start(1), m.group(1)), ">seule ", False) and look(s[m.end():], "^ +que? ")) and ( morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[GWYsi]") or ( morphex(dDA, (m.start(1), m.group(1)), ":[AQ].*:f", ":[GWYme]") and not morph(dDA, nextword1(s, m.end()), ":N.*:f", False, False) ) )
def s7395s_1 (s, m):
    return suggMasSing(m.group(1))
def c7406s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[GWYsi]") or ( morphex(dDA, (m.start(1), m.group(1)), ":[AQ].*:f", ":[GWYme]") and not morph(dDA, nextword1(s, m.end()), ":N.*:f", False, False) )
def s7406s_1 (s, m):
    return suggMasSing(m.group(1))
def c7414s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and ( morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or ( morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]") and not morph(dDA, nextword1(s, m.end()), ":N.*:f", False, False) ) ) and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s7414s_1 (s, m):
    return suggMasSing(m.group(3))
def c7426s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]")) and not morph(dDA, prevword1(s, m.start()), ":R|>de ", False, False)
def s7426s_1 (s, m):
    return suggFemSing(m.group(3))
def c7440s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]"))
def s7440s_1 (s, m):
    return suggFemSing(m.group(3))
def c7449s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^légion$", m.group(2)) and not look(s[:m.start()], r"(?i)\b(?:nous|ne) +$") and ((morph(dDA, (m.start(1), m.group(1)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) and morph(dDA, (m.start(1), m.group(1)), ":1p", False)) or m.group(1).endswith(" été")) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[GWYpi]")
def s7449s_1 (s, m):
    return suggPlur(m.group(2))
def c7460s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^légion$", m.group(3)) and (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWYpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]")) and not look(s[:m.start()], "(?i)ce que? +$") and (not re.search("^(?:ceux-(?:ci|là)|lesquels)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s7460s_1 (s, m):
    return suggMasPlur(m.group(3))
def c7479s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^légion$", m.group(3)) and (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWYpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]")) and (not re.search("(?i)^(?:elles|celles-(?:ci|là)|lesquelles)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s7479s_1 (s, m):
    return suggFemPlur(m.group(3))
def c7492s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">avoir ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[123]s", ":[GNAQWY]")
def s7492s_1 (s, m):
    return suggVerbPpas(m.group(2))
def c7504s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWYsi]")
def s7504s_1 (s, m):
    return suggSing(m.group(2))
def c7517s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWYsi]")
def s7517s_1 (s, m):
    return suggSing(m.group(2))
def c7527s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]"))
def s7527s_1 (s, m):
    return suggMasSing(m.group(3))
def c7540s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[MWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]")) and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s7540s_1 (s, m):
    return suggMasSing(m.group(3))
def c7550s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]")) and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s7550s_1 (s, m):
    return suggFemSing(m.group(3))
def c7560s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[MWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]"))
def s7560s_1 (s, m):
    return suggFemSing(m.group(3))
def c7569s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^légion$", m.group(2)) and morph(dDA, (m.start(1), m.group(1)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and morph(dDA, (m.start(1), m.group(1)), ":1p", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[GWYpi]")
def s7569s_1 (s, m):
    return suggPlur(m.group(2))
def c7579s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^légion$", m.group(3)) and morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWYpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]")) and (not re.search("^(?:ceux-(?:ci|là)|lesquels)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s7579s_1 (s, m):
    return suggMasPlur(m.group(3))
def c7589s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^légion$", m.group(3)) and morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWYpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]")) and (not re.search("^(?:elles|celles-(?:ci|là)|lesquelles)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s7589s_1 (s, m):
    return suggFemPlur(m.group(3))
def c7607s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GMWYsi]") and not morph(dDA, (m.start(1), m.group(1)), ":G", False)
def s7607s_1 (s, m):
    return suggSing(m.group(2))
def c7612s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^légion$", m.group(2)) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[GWYpi]") and not morph(dDA, (m.start(1), m.group(1)), ":G", False)
def s7612s_1 (s, m):
    return suggPlur(m.group(2))
def c7620s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^légion$", m.group(3)) and ((morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWme]") and morphex(dDA, (m.start(2), m.group(2)), ":m", ":[Gfe]")) or (morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWfe]") and morphex(dDA, (m.start(2), m.group(2)), ":f", ":[Gme]"))) and not ( morph(dDA, (m.start(3), m.group(3)), ":p", False) and morph(dDA, (m.start(2), m.group(2)), ":s", False) ) and not morph(dDA, prevword1(s, m.start()), ":(?:R|P|Q|Y|[123][sp])", False, False) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s7620s_1 (s, m):
    return switchGender(m.group(3))
def c7640s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^légion$", m.group(2)) and ((morphex(dDA, (m.start(1), m.group(1)), ":M[1P].*:f", ":[GWme]") and morphex(dDA, (m.start(2), m.group(2)), ":m", ":[GWfe]")) or (morphex(dDA, (m.start(1), m.group(1)), ":M[1P].*:m", ":[GWfe]") and morphex(dDA, (m.start(2), m.group(2)), ":f", ":[GWme]"))) and not morph(dDA, prevword1(s, m.start()), ":(?:R|P|Q|Y|[123][sp])", False, False) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s7640s_1 (s, m):
    return switchGender(m.group(2))
def c7659s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":A.*:p", ":(?:G|E|M1|W|s|i)")
def s7659s_1 (s, m):
    return suggSing(m.group(1))
def c7667s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":A.*:[fp]", ":(?:G|E|M1|W|m:[si])")
def s7667s_1 (s, m):
    return suggMasSing(m.group(1))
def c7675s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":A.*:[mp]", ":(?:G|E|M1|W|f:[si])|>(?:désoler|pire) ")
def s7675s_1 (s, m):
    return suggFemSing(m.group(1))
def c7683s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":A.*:[fs]", ":(?:G|E|M1|W|m:[pi])|>(?:désoler|pire) ")
def s7683s_1 (s, m):
    return suggMasPlur(m.group(1))
def c7695s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":A.*:[ms]", ":(?:G|E|M1|W|f:[pi])|>(?:désoler|pire) ")
def s7695s_1 (s, m):
    return suggFemPlur(m.group(1))
def c7705s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), "V0e", False) and m.group(3) != "rendu"
def c7715s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]")
def s7715s_1 (s, m):
    return suggSing(m.group(1))
def c7719s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]")
def s7719s_1 (s, m):
    return suggSing(m.group(1))
def c7723s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|[NAQ].*:[pf])", ":(?:G|W|[me]:[si])|question ") and not (m.group(1) == "ce" and morph(dDA, (m.start(2), m.group(2)), ":Y", False))
def s7723s_1 (s, m):
    return suggMasSing(m.group(2))
def c7727s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:[pm])", ":(?:G|W|[fe]:[si])")
def s7727s_1 (s, m):
    return suggFemSing(m.group(1))
def c7731s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]")
def s7731s_1 (s, m):
    return suggPlur(m.group(1))
def c7735s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^légion$", m.group(1)) and (morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]") or morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|[AQ].*:f)", ":[GWme]"))
def s7735s_1 (s, m):
    return suggMasPlur(m.group(1))
def c7739s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^légion$", m.group(1)) and (morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]") or morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|[AQ].*:m)", ":[GWfe]"))
def s7739s_1 (s, m):
    return suggFemPlur(m.group(1))
def c7770s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":[QWGBMpi]") and not re.search("(?i)^(?:légion|nombre|cause)$", m.group(1)) and not look(s[:m.start()], r"(?i)\bce que?\b")
def s7770s_1 (s, m):
    return suggPlur(m.group(1))
def c7770s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not bCondMemo and morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:N|A|Q|W|G|3p)") and not look(s[:m.start()], r"(?i)\bce que?\b")
def s7770s_2 (s, m):
    return suggVerbPpas(m.group(1), ":m:p")
def c7781s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWYsi]")
def s7781s_1 (s, m):
    return suggSing(m.group(2))
def c7789s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWYsi]")
def s7789s_1 (s, m):
    return suggSing(m.group(2))
def c7797s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":[GWYme]")) and (not re.search("^(?:celui-(?:ci|là)|lequel)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s7797s_1 (s, m):
    return suggMasSing(m.group(3))
def c7807s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[GWYfe]")) and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s7807s_1 (s, m):
    return suggFemSing(m.group(3))
def c7818s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[GWYfe]"))
def s7818s_1 (s, m):
    return suggFemSing(m.group(3))
def c7827s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[GWpi]")
def s7827s_1 (s, m):
    return suggPlur(m.group(2))
def c7835s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":[GWYme]")) and (not re.search("^(?:ceux-(?:ci|là)|lesquels)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s7835s_1 (s, m):
    return suggMasPlur(m.group(3))
def c7845s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[GWYfe]")) and (not re.search("^(?:elles|celles-(?:ci|là)|lesquelles)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s7845s_1 (s, m):
    return suggFemPlur(m.group(3))
def c7855s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:trouver|considérer|croire|rendre|voilà) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[AQ]:(?:[me]:p|f)", ":(?:G|Y|[AQ]:m:[is])")
def s7855s_1 (s, m):
    return suggMasSing(m.group(2))
def c7859s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:trouver|considérer|croire|rendre|voilà) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[AQ]:(?:[fe]:p|m)", ":(?:G|Y|[AQ]:f:[is])")
def s7859s_1 (s, m):
    return suggFemSing(m.group(2))
def c7863s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:trouver|considérer|croire|rendre|voilà) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[AQ].*:s", ":(?:G|Y|[AQ].*:[ip])")
def s7863s_1 (s, m):
    return suggPlur(m.group(2))
def c7867s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:trouver|considérer|croire|rendre|voilà) ", False) and morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:p", ":(?:G|Y|[AQ].*:[is])")
def s7867s_1 (s, m):
    return suggSing(m.group(3))
def c7871s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:trouver|considérer|croire|rendre) .*:3s", False) and morphex(dDA, (m.start(2), m.group(2)), ":[AQ].*:p", ":(?:G|Y|[AQ].*:[is])")
def s7871s_1 (s, m):
    return suggSing(m.group(2))
def c7871s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:trouver|considérer|croire|rendre) .*:3p", False) and morphex(dDA, (m.start(2), m.group(2)), ":[AQ].*:s", ":(?:G|Y|[AQ].*:[ip])")
def s7871s_2 (s, m):
    return suggSing(m.group(2))
def c7877s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return ( morphex(dDA, (m.start(1), m.group(1)), ">(?:trouver|considérer|croire|rendre|voilà) ", ":1p") or (morph(dDA, (m.start(1), m.group(1)), ">(?:trouver|considérer|croire) .*:1p", False) and look(s[:m.start()], r"\bn(?:ous|e) +$")) ) and morphex(dDA, (m.start(2), m.group(2)), ":[AQ].*:s", ":(?:G|Y|[AQ].*:[ip])")
def s7877s_1 (s, m):
    return suggPlur(m.group(2))
def c7907s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">avoir ", False) and morph(dDA, (m.start(3), m.group(3)), ":Y", False)
def c7909s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$", m.group(3)) and morph(dDA, prevword1(s, m.start()), ">puisque? ", False, True) and morph(dDA, (m.start(2), m.group(2)), ":V0a", False) and not m.group(3).isupper() and morphex(dDA, (m.start(3), m.group(3)), ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])")
def s7909s_1 (s, m):
    return suggMasSing(m.group(3))
def c7919s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$", m.group(4)) and morph(dDA, prevword1(s, m.start()), ">puisque? ", False, True) and morph(dDA, (m.start(3), m.group(3)), ":V0a", False) and not m.group(4).isupper() and morphex(dDA, (m.start(4), m.group(4)), ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])")
def s7919s_1 (s, m):
    return suggMasSing(m.group(4))
def c7930s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morphex(dDA, (m.start(2), m.group(2)), ":V[0-3]..t.*:Q.*:s", ":[GWpi]")
def s7930s_1 (s, m):
    return suggPlur(m.group(2))
def c7939s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return look(s[m.end():], "^ *$") and morph(dDA, (m.start(2), m.group(2)), ":V0a", False) and morphex(dDA, (m.start(1), m.group(1)), ":(?:M|Os|N)", ":R") and morphex(dDA, (m.start(3), m.group(3)), ":V[0-3]..t_.*:Q.*:s", ":[GWpi]") and not look(s[:m.start()], r"\bque +$")
def s7939s_1 (s, m):
    return suggPlur(m.group(3))
def c7949s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morphex(dDA, (m.start(2), m.group(2)), ":V[0-3]..t.*:Q.*:p", ":[GWsi]")
def s7949s_1 (s, m):
    return m.group(2)[:-1]
def c7958s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":V0a", False) and morphex(dDA, (m.start(3), m.group(3)), ":V[0-3]..t_.*:Q.*:p", ":[GWsi]") and not look(s[:m.start()], r"\bque? ")
def s7958s_1 (s, m):
    return m.group(3)[:-1]
def c7967s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">avoir ", False) and morphex(dDA, (m.start(2), m.group(2)), ":Q.*:(?:f|m:p)", ":m:[si]")
def s7967s_1 (s, m):
    return suggMasSing(m.group(2))
def c7976s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("(?i)^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$", m.group(1)) and morphex(dDA, (m.start(1), m.group(1)), ":Q.*:(?:f|m:p)", ":m:[si]") and look(s[:m.start()], "(?i)(?:après +$|sans +$|pour +$|que? +$|quand +$|, +$|^ *$)")
def s7976s_1 (s, m):
    return suggMasSing(m.group(1))
def c8017s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">avoir ", False) and morphex(dDA, (m.start(2), m.group(2)), ":(?:Y|[123][sp])", ":[QGWMX]")
def s8017s_1 (s, m):
    return suggVerbPpas(m.group(2), ":m:s")
def c8030s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(3), m.group(3)), ":V0a", False) and not ((re.search("^(?:décidé|essayé|tenté)$", m.group(4)) and look(s[m.end():], " +d(?:e |’)")) or (re.search("^réussi$", m.group(4)) and look(s[m.end():], " +à"))) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ]", False) and morphex(dDA, (m.start(4), m.group(4)), ":V[0-3]..t.*:Q.*:s", ":[GWpi]") and not morph(dDA, nextword1(s, m.end()), ":(?:Y|Oo|D)", False)
def s8030s_1 (s, m):
    return suggPlur(m.group(4), m.group(2))
def c8045s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(3), m.group(3)), ":V0a", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", False) and (morphex(dDA, (m.start(4), m.group(4)), ":V[0-3]..t.*:Q.*:f", ":[GWme]") or morphex(dDA, (m.start(4), m.group(4)), ":V[0-3]..t.*:Q.*:p", ":[GWsi]"))
def s8045s_1 (s, m):
    return suggMasSing(m.group(4))
def c8060s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(3), m.group(3)), ":V0a", False) and not ((re.search("^(?:décidé|essayé|tenté)$", m.group(4)) and look(s[m.end():], " +d(?:e |’)")) or (re.search("^réussi$", m.group(4)) and look(s[m.end():], " +à"))) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", False) and (morphex(dDA, (m.start(4), m.group(4)), ":V[0-3]..t.*:Q.*:m", ":[GWfe]") or morphex(dDA, (m.start(4), m.group(4)), ":V[0-3]..t.*:Q.*:p", ":[GWsi]")) and not morph(dDA, nextword1(s, m.end()), ":(?:Y|Oo)|>que?", False)
def s8060s_1 (s, m):
    return suggFemSing(m.group(4))
def c8077s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and (morphex(dDA, (m.start(2), m.group(2)), ":V[0-3]..t.*:Q.*:f", ":[GWme]") or morphex(dDA, (m.start(2), m.group(2)), ":V[0-3]..t.*:Q.*:p", ":[GWsi]"))
def s8077s_1 (s, m):
    return suggMasSing(m.group(2))
def c8087s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not re.search("^(?:A|avions)$", m.group(1)) and morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morph(dDA, (m.start(2), m.group(2)), ":V.+:(?:Y|2p)", False)
def s8087s_1 (s, m):
    return suggVerbPpas(m.group(2), ":m:s")
def c8096s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and (morph(dDA, (m.start(3), m.group(3)), ":Y") or re.search("^(?:[mtsn]e|[nv]ous|leur|lui)$", m.group(3)))
def c8101s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and (morph(dDA, (m.start(3), m.group(3)), ":Y") or re.search("^(?:[mtsn]e|[nv]ous|leur|lui)$", m.group(3)))
def c8110s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, nextword1(s, m.end()), ":[NAQ].*:[me]", False)
def c8113s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def c8137s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morphex(dDA, (m.start(2), m.group(2)), ":(?:Y|2p|Q.*:[fp])", ":m:[si]") and m.group(2) != "prise" and not morph(dDA, prevword1(s, m.start()), ">(?:les|[nv]ous|en)|:[NAQ].*:[fp]", False) and not look(s[:m.start()], r"(?i)\b(?:quel(?:le|)s?|combien) ")
def s8137s_1 (s, m):
    return suggMasSing(m.group(2))
def c8144s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morphex(dDA, (m.start(2), m.group(2)), ":(?:Y|2p|Q.*:[fp])", ":m:[si]") and m.group(2) != "prise" and not morph(dDA, prevword1(s, m.start()), ">(?:les|[nv]ous|en)|:[NAQ].*:[fp]", False) and not look(s[:m.start()], r"(?i)\b(?:quel(?:le|)s?|combien) ")
def s8144s_1 (s, m):
    return suggMasSing(m.group(2))
def c8151s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":V0a", False) and morphex(dDA, (m.start(3), m.group(3)), ":(?:Y|2p|Q.*:p)", ":[si]")
def s8151s_1 (s, m):
    return suggMasSing(m.group(3))
def c8157s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morphex(dDA, (m.start(2), m.group(2)), ":V[123]..t.*:Q.*:s", ":[GWpi]")
def s8157s_1 (s, m):
    return suggPlur(m.group(2))
def c8172s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:G|Y|P|1p|3[sp])") and not look(s[m.end():], "^ +(?:je|tu|ils?|elles?|on|[vn]ous) ")
def s8172s_1 (s, m):
    return suggVerb(m.group(1), ":1p")
def c8179s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:G|Y|P|2p|3[sp])") and not look(s[m.end():], "^ +(?:je|ils?|elles?|on|[vn]ous) ")
def s8179s_1 (s, m):
    return suggVerb(m.group(1), ":2p")
def c8192s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":2p", ":(?:3[sp]|P)")
def s8192s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c8196s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":1p", ":(?:3[sp]|P)")
def s8196s_1 (s, m):
    return suggVerb(m.group(1), ":3p")
def c8225s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":G")
def c8236s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V[13].*:Ip.*:2s", ":[GNAM]")
def s8236s_1 (s, m):
    return m.group(1)[:-1]
def c8240s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V[13].*:Ip.*:2s", ":G")
def s8240s_1 (s, m):
    return m.group(1)[:-1]
def c8253s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[MYOs]")
def c8261s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V[23].*:Ip.*:3s", ":[GNA]") and analyse(m.group(1)[:-1]+"s", ":E:2s", False) and not re.search("(?i)^(?:doit|suffit)$", m.group(1)) and not (re.search("(?i)^vient$", m.group(1)) and look(s[m.end():], " +l[ea]"))
def s8261s_1 (s, m):
    return m.group(1)[:-1]+"s"
def c8266s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V[23].*:Ip.*:3s", ":G") and analyse(m.group(1)[:-1]+"s", ":E:2s", False)
def s8266s_1 (s, m):
    return m.group(1)[:-1]+"s"
def c8277s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V3.*:Ip.*:3s", ":[GNA]")
def c8281s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V3.*:Ip.*:3s", ":G")
def c8299s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":A", ":G") and not look(s[m.end():], r"\bsoit\b")
def c8320s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(1), m.group(1)), ":E|>chez", False) and _oDict.isValid(m.group(1))
def s8320s_1 (s, m):
    return suggVerbImpe(m.group(1))
def c8326s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(1), m.group(1)), ":E|>chez", False) and _oDict.isValid(m.group(1))
def s8326s_1 (s, m):
    return suggVerbTense(m.group(1), ":E", ":2s")
def c8354s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":E", ":[GM]")
def c8363s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":E", ":[GM]") and morphex(dDA, nextword1(s, m.end()), ":", ":(?:Y|3[sp])", True) and morph(dDA, prevword1(s, m.start()), ":Cc", False, True) and not look(s[:m.start()], "~ +$")
def c8372s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":E", ":[GM]") and morphex(dDA, nextword1(s, m.end()), ":", ":(?:N|A|Q|Y|B|3[sp])", True) and morph(dDA, prevword1(s, m.start()), ":Cc", False, True) and not look(s[:m.start()], "~ +$")
def c8381s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":E", ":[GM]") and morphex(dDA, nextword1(s, m.end()), ":", ":(?:N|A|Q|Y|MP)", True) and morph(dDA, prevword1(s, m.start()), ":Cc", False, True) and not look(s[:m.start()], "~ +$")
def c8396s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not (m.group(0).endswith("t-en") and look(s[:m.start()], r"(?i)\bva$") and morph(dDA, nextword1(s, m.end()), ">guerre ", False, False))
def c8404s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":E", ":(?:G|M[12])") and morphex(dDA, nextword1(s, m.end()), ":", ":(?:Y|[123][sp])", True)
def s8404s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c8413s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":E", False)
def s8413s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c8422s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":E", False) and morphex(dDA, nextword1(s, m.end()), ":[RC]", ":[NAQ]", True)
def s8422s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c8431s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":E", False) and morphex(dDA, nextword1(s, m.end()), ":[RC]", ":Y", True)
def s8431s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c8440s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, nextword1(s, m.end()), ":Y", False, False)
def s8440s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c8443s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not prevword1(s, m.start()) and not morph(dDA, nextword1(s, m.end()), ":Y", False, False)
def s8446s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c8466s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":R", False, True)
def c8467s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def c8469s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) == "le" and not morph(dDA, (m.start(2), m.group(2)), ":N.*:[me]:[si]")
def c8469s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) == "la" and not morph(dDA, (m.start(2), m.group(2)), ":N.*:[fe]:[si]")
def c8469s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) == "les" and not morph(dDA, (m.start(2), m.group(2)), ":N.*:.:[pi]")
def c8473s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def c8475s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]")
def c8476s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":[123]s", False, False)
def c8477s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":(?:[123]s|R)", False, False)
def c8478s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":(?:[123]p|R)", False, False)
def c8479s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, prevword1(s, m.start()), ":3p", False, False)
def c8480s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]", False)
def c8481s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y)", ":(?:[NAQ].*:m:[si]|G|M)")
def c8482s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y)", ":(?:[NAQ].*:f:[si]|G|M)")
def c8483s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y)", ":(?:[NAQ].*:[si]|G|M)")
def c8484s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y)", ":(?:[NAQ].*:[si]|G|M)")
def c8486s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y)", ":(?:A|G|M|1p)")
def c8487s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y)", ":(?:A|G|M|2p)")
def c8489s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":V", False)
def c8490s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not prevword1(s, m.start())
def c8491s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":V", False)
def c8492s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":2s", False) or look(s[:m.start()], r"(?i)\b(?:je|tu|on|ils?|elles?|nous) +$")
def c8493s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":2s|>(ils?|elles?|on) ", False) or look(s[:m.start()], r"(?i)\b(?:je|tu|on|ils?|elles?|nous) +$")
def c8507s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False) and m.group(2) != "A"
def c8511s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False) and m.group(2) != "A"
def c8515s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":Y") and m.group(2) != "A"
def c8534s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b(?:ce que?|tout) ")
def c8548s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":M") and not (m.group(1).endswith("ez") and look(s[m.end():], " +vous"))
def s8548s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c8556s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:Q|2p)", ":M")
def s8556s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c8564s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:aimer|aller|désirer|devoir|espérer|pouvoir|préférer|souhaiter|venir) ", False) and not morph(dDA, (m.start(1), m.group(1)), ":[GN]", False) and morphex(dDA, (m.start(2), m.group(2)), ":V", ":M")
def s8564s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c8573s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">devoir ", False) and morphex(dDA, (m.start(2), m.group(2)), ":V", ":M") and not morph(dDA, prevword1(s, m.start()), ":D", False)
def s8573s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c8581s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:cesser|décider|défendre|suggérer|commander|essayer|tenter|choisir|permettre|interdire) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":(?:Q|2p)", ":M")
def s8581s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c8589s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:Q|2p)", ":M")
def s8589s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c8597s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">valoir ", False) and morphex(dDA, (m.start(2), m.group(2)), ":(?:Q|2p)", ":[GM]")
def s8597s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c8605s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V1", ":[NM]") and not m.group(1).istitle() and not look(s[:m.start()], "> +$")
def s8605s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c8614s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">avoir ", False) and morphex(dDA, (m.start(2), m.group(2)), ":V1", ":N")
def s8614s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c8622s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[Q123][sp]?", ":Y")
def s8622s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c8638s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False) and (morphex(dDA, (m.start(2), m.group(2)), ":Y", ":[NAQ]") or m.group(2) in aSHOULDBEVERB) and not re.search("(?i)^(?:soit|été)$", m.group(1)) and not morph(dDA, prevword1(s, m.start()), ":Y|>ce", False, False) and not look(s[:m.start()], "(?i)ce (?:>|qu|que >) $") and not look_chk1(dDA, s[:m.start()], 0, r"({w_2}) +> $", ":Y") and not look_chk1(dDA, s[:m.start()], 0, r"^ *>? *(\w[\w-]+)", ":Y")
def s8638s_1 (s, m):
    return suggVerbPpas(m.group(2))
def c8651s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(1), m.group(1)), ":1s|>(?:en|y)", False)
def s8651s_1 (s, m):
    return suggVerb(m.group(1), ":1s")
def c8655s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:1s|G)") and not (morph(dDA, (m.start(2), m.group(2)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:1s", False, False))
def s8655s_1 (s, m):
    return suggVerb(m.group(2), ":1s")
def c8659s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:1s|G|1p)")
def s8659s_1 (s, m):
    return suggVerb(m.group(2), ":1s")
def c8663s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:1s|G|1p)")
def s8663s_1 (s, m):
    return suggVerb(m.group(2), ":1s")
def c8667s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:1s|G|1p|3p!)")
def s8667s_1 (s, m):
    return suggVerb(m.group(2), ":1s")
def c8688s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:G|[ISK].*:2s)") and not (morph(dDA, (m.start(2), m.group(2)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:2s", False, False))
def s8688s_1 (s, m):
    return suggVerb(m.group(2), ":2s")
def c8692s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:G|[ISK].*:2s)")
def s8692s_1 (s, m):
    return suggVerb(m.group(2), ":2s")
def c8696s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:G|2p|3p!|[ISK].*:2s)")
def s8696s_1 (s, m):
    return suggVerb(m.group(2), ":2s")
def c8709s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G)") and not (morph(dDA, (m.start(2), m.group(2)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:3s", False, False))
def s8709s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c8709s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and morph(dDA, (m.start(2), m.group(2)), ":3p", False)
def c8714s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G)")
def s8714s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c8714s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and morph(dDA, (m.start(2), m.group(2)), ":3p", False)
def c8732s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G)") and not (morph(dDA, (m.start(2), m.group(2)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:3s", False, False))
def s8732s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c8736s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G)")
def s8736s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c8746s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:3s|P|G|Q.*:m:[si])")
def s8746s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c8750s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:3s|P|G)")
def s8750s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c8760s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:N|A|3s|P|Q|G|V0e.*:3p)")
def s8760s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c8765s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|Q|G)")
def s8765s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c8775s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|Q|G|3p!)") and not morph(dDA, prevword1(s, m.start()), ":[VR]|>de", False, False)
def s8775s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c8795s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:3s|P|Q|G|3p!)") and not morph(dDA, prevword1(s, m.start()), ":[VRD]|>de", False, False) and not( morph(dDA, (m.start(1), m.group(1)), ":(?:Y|N.*:m:[si])", False) and not re.search(" (?:qui|>) ", m.group(0)) )
def s8795s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c8806s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|Q|G|3p!)") and not morph(dDA, prevword1(s, m.start()), ":[VR]|>de", False, False) and not( morph(dDA, (m.start(2), m.group(2)), ":Y", False) and not re.search(" (?:qui|>) ", m.group(0)) )
def s8806s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c8817s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":3s", False)
def s8817s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c8817s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(2), m.group(2)), ":3s", False) or look(s[:m.start()], r"(?i)\b(?:ils?|on) +")
def c8830s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G)") and not morph(dDA, prevword1(s, m.start()), ":R|>(?:et|ou)", False, False) and not (morph(dDA, (m.start(2), m.group(2)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:3s", False, False))
def s8830s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c8830s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and morph(dDA, (m.start(2), m.group(2)), ":3p", False)
def c8836s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G)") and not morph(dDA, prevword1(s, m.start()), ":R|>(?:et|ou)", False, False)
def s8836s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c8836s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and morph(dDA, (m.start(2), m.group(2)), ":3p", False)
def s8855s_1 (s, m):
    return m.group(1)[:-1]+"t"
def c8863s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G)") and morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P|Q|[123][sp]|R)", True) and not( m.group(1).endswith("ien") and look(s[:m.start()], "> +$") and morph(dDA, (m.start(2), m.group(2)), ":Y", False) )
def s8863s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c8882s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G|Q)") and morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P|Q|[123][sp]|R)", True)
def s8882s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c8887s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G)") and morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P|Q|[123][sp]|R)", True)
def s8887s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c8897s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":Y", False) and morph(dDA, (m.start(2), m.group(2)), ":V.[a-z_!?]+(?!.*:(?:3s|P|Q|Y|3p!))")
def s8897s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c8906s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not (re.search("(?i)^une? +(?:dizaine|douzaine|quinzaine|vingtaine|trentaine|quarantaine|cinquantaine|soixantaine|centaine|majorité|minorité|millier|poignée) ", m.group(0)) and morph(dDA, (m.start(3), m.group(3)), ":3p", False)) and morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P)", True) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(3), m.group(3)), ":V", ":(?:3s|P|Q|Y|3p!|G)") and not (look(s[:m.start()], r"(?i)\b(?:et|ou) +$") and morph(dDA, (m.start(3), m.group(3)), ":[1-3]p", False)) and not look(s[:m.start()], r"(?i)\bni .* ni\b") and not checkAgreement(m.group(2), m.group(3))
def s8906s_1 (s, m):
    return suggVerb(m.group(3), ":3s")
def c8912s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not (re.search("(?i)^une? +(?:dizaine|douzaine|quinzaine|vingtaine|trentaine|quarantaine|cinquantaine|soixantaine|centaine|majorité|minorité|millier|poignée) ", m.group(0)) and morph(dDA, (m.start(3), m.group(3)), ":3p", False)) and morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P)", True) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(3), m.group(3)), ":V", ":(?:3s|1p|P|Q|Y|3p!|G)") and not (look(s[:m.start()], r"(?i)\b(?:et|ou) +$") and morph(dDA, (m.start(3), m.group(3)), ":[123]p", False)) and not look(s[:m.start()], r"(?i)\bni .* ni\b")
def s8912s_1 (s, m):
    return suggVerb(m.group(3), ":3s")
def c8939s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P)", True) and isAmbiguousAndWrong(m.group(2), m.group(3), ":s", ":3s") and not (look(s[:m.start()], r"(?i)\b(?:et|ou) +$") and morph(dDA, (m.start(3), m.group(3)), ":(?:[123]p|p)", False)) and not look(s[:m.start()], r"(?i)\bni .* ni\b")
def s8939s_1 (s, m):
    return suggVerb(m.group(3), ":3s", suggSing)
def c8945s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P)", True) and isVeryAmbiguousAndWrong(m.group(2), m.group(3), ":s", ":3s", not prevword1(s, m.start())) and not (look(s[:m.start()], r"(?i)\b(?:et|ou) +$") and morph(dDA, (m.start(3), m.group(3)), ":(?:[123]p|p)", False)) and not look(s[:m.start()], r"(?i)\bni .* ni\b")
def s8945s_1 (s, m):
    return suggVerb(m.group(3), ":3s", suggSing)
def c8962s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return ( morph(dDA, (m.start(0), m.group(0)), ":1s") or ( look(s[:m.start()], "> +$") and morph(dDA, (m.start(0), m.group(0)), ":1s", False) ) ) and not (m.group(0)[0:1].isupper() and look(sx[:m.start()], r"\w")) and not look(sx[:m.start()], r"(?i)\b(?:j(?:e |[’'])|moi(?:,? qui| seul) )")
def s8962s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c8967s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(0), m.group(0)), ":2s", ":(?:E|G|W|M|J|[13][sp]|2p)") and not m.group(0)[0:1].isupper() and not look(s[:m.start()], "^ *$") and ( not morph(dDA, (m.start(0), m.group(0)), ":[NAQ]", False) or look(s[:m.start()], "> +$") ) and not look(sx[:m.start()], r"(?i)\bt(?:u |[’']|oi,? qui |oi seul )")
def s8967s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c8973s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(0), m.group(0)), ":2s", ":(?:G|W|M|J|[13][sp]|2p)") and not (m.group(0)[0:1].isupper() and look(sx[:m.start()], r"\w")) and ( not morph(dDA, (m.start(0), m.group(0)), ":[NAQ]", False) or look(s[:m.start()], "> +$") ) and not look(sx[:m.start()], r"(?i)\bt(?:u |[’']|oi,? qui |oi seul )")
def s8973s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c8979s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(0), m.group(0)), ":[12]s", ":(?:E|G|W|M|J|3[sp]|2p|1p)") and not (m.group(0)[0:1].isupper() and look(sx[:m.start()], r"\w")) and ( not morph(dDA, (m.start(0), m.group(0)), ":[NAQ]", False) or look(s[:m.start()], "> +$") or ( re.search("(?i)^étais$", m.group(0)) and not morph(dDA, prevword1(s, m.start()), ":[DA].*:p", False, True) ) ) and not look(sx[:m.start()], r"(?i)\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))")
def s8979s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c8985s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not (m.group(0)[0:1].isupper() and look(sx[:m.start()], r"\w")) and not look(sx[:m.start()], r"(?i)\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))")
def s8985s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c8989s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not (m.group(0)[0:1].isupper() and look(sx[:m.start()], r"\w")) and not look(sx[:m.start()], r"(?i)\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))")
def s8989s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c9002s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:1p|3[sp])") and not look(s[m.end():], "^ +(?:je|tu|ils?|elles?|on|[vn]ous)")
def s9002s_1 (s, m):
    return suggVerb(m.group(1), ":1p")
def c9006s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":1p") and not look(s[m.end():], "^ +(?:je|tu|ils?|elles?|on|[vn]ous)")
def s9006s_1 (s, m):
    return suggVerb(m.group(1), ":1p")
def c9010s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":1p") and not look(s[m.end():], "^ +(?:ils|elles)")
def s9010s_1 (s, m):
    return suggVerb(m.group(1), ":1p")
def c9022s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:2p|3[sp])") and not look(s[m.end():], "^ +(?:je|ils?|elles?|on|[vn]ous)")
def s9022s_1 (s, m):
    return suggVerb(m.group(1), ":2p")
def c9026s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":2p") and not look(s[m.end():], "^ +(?:je|ils?|elles?|on|[vn]ous)")
def s9026s_1 (s, m):
    return suggVerb(m.group(1), ":2p")
def c9037s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(0), m.group(0)), ":V.*:1p", ":[EGMNAJ]") and not (m.group(0)[0:1].isupper() and look(s[:m.start()], r"\w")) and not look(sx[:m.start()], r"\b(?:[nN]ous(?:-mêmes?|)|[eE]t moi(?:-même|)|[nN]i (?:moi|nous)),? ")
def s9037s_1 (s, m):
    return suggVerb(m.group(0), ":3p")
def c9042s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(0), m.group(0)), ":V.*:2p", ":[EGMNAJ]") and not (m.group(0)[0:1].isupper() and look(s[:m.start()], r"\w")) and not look(sx[:m.start()], r"\b(?:[vV]ous(?:-mêmes?|)|[eE]t toi(?:-même|)|[tT]oi(?:-même|) et|[nN]i (?:vous|toi)),? ")
def c9059s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|G)") and not (morph(dDA, (m.start(2), m.group(2)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:3p", False, False))
def s9059s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c9059s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and morph(dDA, (m.start(2), m.group(2)), ":3s", False)
def c9064s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|G)")
def s9064s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c9064s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and morph(dDA, (m.start(2), m.group(2)), ":3s", False)
def c9074s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|G)")
def s9074s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c9083s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|G)") and not morph(dDA, prevword1(s, m.start()), ":[VR]", False, False) and not (morph(dDA, (m.start(2), m.group(2)), ":Y", False) and re.search(r"(?i)lesquel", m.group(1)) and not re.search(" qui |>", m.group(0)))
def s9083s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c9093s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|G)") and not morph(dDA, prevword1(s, m.start()), ":R", False, False) and not (morph(dDA, (m.start(2), m.group(2)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:3p", False, False))
def s9093s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c9093s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and morph(dDA, (m.start(2), m.group(2)), ":3s", False)
def c9098s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|G)") and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s9098s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c9098s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return bCondMemo and morph(dDA, (m.start(2), m.group(2)), ":3s", False)
def c9118s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"(?i)\b(?:à|avec|sur|chez|par|dans|parmi|contre|ni|de|pour|sous) +$")
def c9129s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|G)") and not morph(dDA, prevword1(s, m.start()), ":[VR]|>de ", False, False)
def s9129s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c9134s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|G)") and not morph(dDA, prevword1(s, m.start()), ":[VR]", False, False)
def s9134s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c9147s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:G|N|A|3p|P|Q)") and not morph(dDA, prevword1(s, m.start()), ":[VR]", False, False)
def s9147s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c9156s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", False) and morphex(dDA, (m.start(3), m.group(3)), ":V", ":(?:[13]p|P|Q|Y|G|A.*:e:[pi])") and morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True) and not checkAgreement(m.group(2), m.group(3)) and not( morph(dDA, (m.start(3), m.group(3)), ":3s", False) and look(s[:m.start()], r"(?i)\b(?:le|ce(?:tte|t|)|[mts](?:on|a)) .+ entre .+ et ") )
def s9156s_1 (s, m):
    return suggVerb(m.group(3), ":3p")
def c9161s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", False) and morphex(dDA, (m.start(3), m.group(3)), ":V", ":(?:[13]p|P|Y|G)") and morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True) and not( morph(dDA, (m.start(3), m.group(3)), ":3s", False) and look(s[:m.start()], r"(?i)\b(?:le|ce(?:tte|t|)|[mts](?:on|a)) .+ entre .+ et ") )
def s9161s_1 (s, m):
    return suggVerb(m.group(3), ":3p")
def c9185s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", False) and morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:[13]p|P|G|Q)") and morph(dDA, nextword1(s, m.end()), ":(?:R|D.*:p)|>au ", False, True)
def s9185s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c9189s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", False) and morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:[13]p|P|G)")
def s9189s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c9199s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True) and isAmbiguousAndWrong(m.group(2), m.group(3), ":p", ":3p")
def s9199s_1 (s, m):
    return suggVerb(m.group(3), ":3p", suggPlur)
def c9208s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True) and isVeryAmbiguousAndWrong(m.group(1), m.group(2), ":p", ":3p", not prevword1(s, m.start()))
def s9208s_1 (s, m):
    return suggVerb(m.group(2), ":3p", suggPlur)
def c9226s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True) and isVeryAmbiguousAndWrong(m.group(1), m.group(2), ":m:p", ":3p", not prevword1(s, m.start()))
def s9226s_1 (s, m):
    return suggVerb(m.group(2), ":3p", suggMasPlur)
def c9234s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True) and isVeryAmbiguousAndWrong(m.group(1), m.group(2), ":f:p", ":3p", not prevword1(s, m.start()))
def s9234s_1 (s, m):
    return suggVerb(m.group(2), ":3p", suggFemPlur)
def c9246s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V0e", ":3s")
def s9246s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c9255s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V0e.*:3s", ":3p")
def s9255s_1 (s, m):
    return m.group(1)[:-1]
def c9265s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V0e", ":3p")
def s9265s_1 (s, m):
    return suggVerb(m.group(1), ":3p")
def c9274s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":V0e.*:3p", ":3s")
def c9287s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[:m.start()], r"\b(?:et |ou |[dD][eu] |ni |[dD]e l’) *$") and morph(dDA, (m.start(1), m.group(1)), ":M", False) and morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":(?:G|3s|3p!|P|M|[AQ].*:[si])") and not morph(dDA, prevword1(s, m.start()), ":[VRD]", False, False) and not look(s[:m.start()], r"([A-ZÉÈ][\w-]+), +([A-ZÉÈ][\w-]+), +$") and not (morph(dDA, (m.start(2), m.group(2)), ":3p", False) and prevword1(s, m.start()))
def s9287s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c9305s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":M", False) and morph(dDA, (m.start(2), m.group(2)), ":M", False) and morphex(dDA, (m.start(3), m.group(3)), ":[123][sp]", ":(?:G|3p|P|Q.*:[pi])") and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s9305s_1 (s, m):
    return suggVerb(m.group(3), ":3p")
def c9319s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:[12]s|3p)", ":(?:3s|G|W|3p!)") and not look(s[m.end():], "^ +(?:et|ou) (?:l(?:es? |a |’|eurs? )|[mts](?:a|on|es) |ce(?:tte|ts|) |[nv]o(?:s|tre) |d(?:u|es) )")
def s9319s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c9335s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[123]s", ":(?:3p|G|W)")
def s9335s_1 (s, m):
    return suggVerb(m.group(1), ":3p")
def c9343s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[12][sp]", ":(?:G|W|3[sp]|Y|P|Q|N)")
def s9343s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c9351s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[12][sp]", ":(?:G|W|3[sp])")
def s9351s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c9361s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V.*:1[sŝś]", ":[GNW]") and not look(s[:m.start()], r"(?i)\bje +>? *$") and not morph(dDA, nextword1(s, m.end()), ":(?:Oo|X|1s)", False, False)
def s9361s_1 (s, m):
    return m.group(1)[:-1]+"é-je"
def c9365s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V.*:1s", ":[GNW]") and not look(s[:m.start()], r"(?i)\b(?:je|tu) +>? *$") and not morph(dDA, nextword1(s, m.end()), ":(?:Oo|X|1s)", False, False)
def c9369s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[m.end():], "^ +(?:en|y|ne|>)") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:2s", ":[GNW]") and not look(s[:m.start()], r"(?i)\b(?:je|tu) +>? *$")
def c9373s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[m.end():], "^ +(?:en|y|ne|>)") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:3s", ":[GNW]") and not look(s[:m.start()], r"(?i)\b(?:ce|il|elle|on) +>? *$")
def s9373s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c9377s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[m.end():], "^ +(?:en|y|ne|aussi|>)") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:3s", ":[GNW]") and not look(s[:m.start()], r"(?i)\b(?:ce|il|elle|on) +>? *$")
def c9381s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[m.end():], "^ +(?:en|y|ne|aussi|>)") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:1p", ":[GNW]") and not morph(dDA, prevword1(s, m.start()), ":Os", False, False) and not morph(dDA, nextword1(s, m.end()), ":Y", False, False)
def c9386s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[m.end():], "^ +(?:en|y|ne|aussi|>)") and not m.group(1).endswith("euillez") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:2p", ":[GNW]") and not morph(dDA, prevword1(s, m.start()), ":Os", False, False) and not morph(dDA, nextword1(s, m.end()), ":Y", False, False)
def c9391s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return not look(s[m.end():], "^ +(?:en|y|ne|aussi|>)") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:3p", ":[GNW]") and not look(s[:m.start()], r"(?i)\b(?:ce|ils|elles) +>? *$")
def s9391s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c9408s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":1[sśŝ]")
def s9408s_1 (s, m):
    return suggVerb(m.group(1), ":1ś")
def c9408s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(1), m.group(1)), ":V", False)
def s9408s_2 (s, m):
    return suggSimil(m.group(1), ":1[sśŝ]")
def c9418s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":[ISK].*:2s")
def s9418s_1 (s, m):
    return suggVerb(m.group(1), ":2s")
def c9418s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(1), m.group(1)), ":V", False)
def s9418s_2 (s, m):
    return suggSimil(m.group(1), ":2s")
def c9427s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":3s")
def s9427s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c9427s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) != "t" and (not m.group(1).endswith("oilà") or m.group(2) != "il") and morphex(dDA, (m.start(1), m.group(1)), ":", ":V")
def s9427s_2 (s, m):
    return suggSimil(m.group(1), ":3s")
def c9427s_3 (s, sx, m, dDA, sCountry, bCondMemo):
    return not m.group(2).endswith(("n", "N")) and morphex(dDA, (m.start(1), m.group(1)), ":3p", ":3s")
def c9442s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:1p|E:2[sp])")
def s9442s_1 (s, m):
    return suggVerb(m.group(1), ":1p")
def c9442s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":", ":V|>chez ")
def s9442s_2 (s, m):
    return suggSimil(m.group(1), ":1p")
def c9451s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":2p")
def s9451s_1 (s, m):
    return suggVerb(m.group(1), ":2p")
def c9451s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return not morph(dDA, (m.start(1), m.group(1)), ":V|>chez ", False)
def s9451s_2 (s, m):
    return suggSimil(m.group(1), ":2p")
def c9461s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":3p") and _oDict.isValid(m.group(1))
def s9461s_1 (s, m):
    return suggVerb(m.group(1), ":3p")
def c9461s_2 (s, sx, m, dDA, sCountry, bCondMemo):
    return m.group(1) != "t" and not morph(dDA, (m.start(1), m.group(1)), ":V", False) and _oDict.isValid(m.group(1))
def s9461s_2 (s, m):
    return suggSimil(m.group(1), ":3p")
def c9475s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">avoir ", False) and morph(dDA, (m.start(2), m.group(2)), ":V.......e_.*:Q", False)
def c9478s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">avoir ", False) and morph(dDA, (m.start(2), m.group(2)), ":V.......e_.*:Q", False)
def c9492s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":[YX]|>y ", "R")
def c9508s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(2), m.group(2)), ":[YX]", False)
def c9522s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Os|M)", False) and morphex(dDA, (m.start(2), m.group(2)), ":[SK]", ":(?:G|V0|I)") and not prevword1(s, m.start())
def c9526s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":[SK]", ":(?:G|V0|I)") and not prevword1(s, m.start())
def c9536s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Os|M)", False) and morphex(dDA, (m.start(2), m.group(2)), ":S", ":[IG]")
def s9536s_1 (s, m):
    return suggVerbMode(m.group(2), ":I", m.group(1))
def c9547s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:afin|pour|quoi|permettre|falloir|vouloir|ordonner|exiger|désirer|douter|préférer|suffire) ", False) and morph(dDA, (m.start(2), m.group(2)), ":(?:Os|M)", False) and not morph(dDA, (m.start(3), m.group(3)), ":[GYS]", False) and not (morph(dDA, (m.start(1), m.group(1)), ">douter ", False) and morph(dDA, (m.start(3), m.group(3)), ":(?:If|K)", False))
def s9547s_1 (s, m):
    return suggVerbMode(m.group(3), ":S", m.group(2))
def c9564s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Os|M)", False) and not morph(dDA, (m.start(2), m.group(2)), ":[GYS]", False)
def s9564s_1 (s, m):
    return suggVerbMode(m.group(2), ":S", m.group(1))
def c9572s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(2), m.group(2)), ":S", ":[GIK]") and not re.search("^e(?:usse|û[mt]es|ût)", m.group(2))
def s9572s_1 (s, m):
    return suggVerbMode(m.group(2), ":I", m.group(1))
def c9576s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morphex(dDA, (m.start(1), m.group(1)), ":S", ":[GIK]") and m.group(1) != "eusse"
def s9576s_1 (s, m):
    return suggVerbMode(m.group(1), ":I", "je")
def c9587s_1 (s, sx, m, dDA, sCountry, bCondMemo):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Os|M)", False) and (morph(dDA, (m.start(2), m.group(2)), ":V.*:S") or morph(dDA, (m.start(2), m.group(2)), ":V0e.*:S", False))
def s9587s_1 (s, m):
    return suggVerbMode(m.group(2), ":I", m.group(1))
