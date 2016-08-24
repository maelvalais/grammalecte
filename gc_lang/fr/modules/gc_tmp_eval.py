# generated code, do not edit
def p74p_1 (s, m):
    return m.group(1).replace(".", "")+"."
def c76p_1 (s, sx, m, dDA, sCountry):
    return m.group(0) != "i.e." and m.group(0) != "s.t.p."
def s76p_1 (s, m):
    return m.group(0).replace(".", "").upper()
def p76p_2 (s, m):
    return m.group(0).replace(".", "")
def c80p_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^etc", m.group(1))
def c86p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":M[12]", False) and (morph(dDA, (m.start(3), m.group(3)), ":(?:M[12]|V)", False) or not _oDict.isValid(m.group(3)))
def c87p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":M[12]", False) and look(s[m.end():], "^\W+[a-zéèêîïâ]")
def c139p_1 (s, sx, m, dDA, sCountry):
    return option("typo") and not m.group(0).endswith("·e·s")
def c139p_2 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False)
def d139p_2 (s, m, dDA):
    return define(dDA, m.start(0), [":N:A:Q:e:i"])
def c151p_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^(?:etc|[A-Z]|chap|cf|fig|hab|litt|circ|coll|r[eé]f|étym|suppl|bibl|bibliogr|cit|op|vol|déc|nov|oct|janv|juil|avr|sept)$", m.group(1)) and morph(dDA, (m.start(1), m.group(1)), ":", False) and morph(dDA, (m.start(2), m.group(2)), ":", False)
def s151p_1 (s, m):
    return m.group(2).capitalize()
def c162p_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":[DR]", False)
def c192p_1 (s, sx, m, dDA, sCountry):
    return not m.group(1).isdigit()
def c194p_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(1))
def s215p_1 (s, m):
    return m.group(1)[0:-1]
def s216p_1 (s, m):
    return "nᵒˢ"  if m.group(1)[1:3] == "os"  else "nᵒ"
def c224p_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], "(?i)etc$")
def s225p_1 (s, m):
    return m.group(0).replace("...", "…").rstrip(".")
def c241p_1 (s, sx, m, dDA, sCountry):
    return not re.search("^(?:etc|[A-Z]|fig|hab|litt|circ|coll|ref|étym|suppl|bibl|bibliogr|cit|vol|déc|nov|oct|janv|juil|avr|sept|pp?)$", m.group(1))
def s282p_1 (s, m):
    return m.group(0)[0] + "|" + m.group(0)[1]
def s283p_1 (s, m):
    return m.group(0)[0] + "|" + m.group(0)[1]
def s284p_1 (s, m):
    return m.group(0)[0] + "|" + m.group(0)[1]
def c293p_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(3), m.group(3)), ";S", ":[VCR]") or mbUnit(m.group(3)) or not _oDict.isValid(m.group(3))
def c297p_1 (s, sx, m, dDA, sCountry):
    return (not re.search("^[0-9][0-9]{1,3}$", m.group(2)) and not _oDict.isValid(m.group(3))) or morphex(dDA, (m.start(3), m.group(3)), ";S", ":[VCR]") or mbUnit(m.group(3))
def c319p_1 (s, sx, m, dDA, sCountry):
    return sCountry != "CA"
def s319p_1 (s, m):
    return " "+m.group(0)
def s365p_1 (s, m):
    return undoLigature(m.group(0))
def c411p_1 (s, sx, m, dDA, sCountry):
    return not option("mapos") and morph(dDA, (m.start(2), m.group(2)), ":V", False)
def s411p_1 (s, m):
    return m.group(1)[:-1]+u"’"
def c414p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V", False)
def s414p_1 (s, m):
    return m.group(1)[:-1]+u"’"
def c418p_1 (s, sx, m, dDA, sCountry):
    return option("mapos") and not look(s[:m.start()], "(?i)(?:lettre|caractère|glyphe|dimension|variable|fonction|point) *$")
def s418p_1 (s, m):
    return m.group(1)[:-1]+u"’"
def c432p_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^(?:onz[ei]|énième|iourte|ouistiti|ouate|one-?step|ouf|Ouagadougou|I(?:I|V|X|er|ᵉʳ|ʳᵉ|è?re))", m.group(2)) and not m.group(2).isupper() and not morph(dDA, (m.start(2), m.group(2)), ":G", False)
def s432p_1 (s, m):
    return m.group(1)[0]+u"’"
def c448p_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^(?:onz|énième|ouf|énième|ouistiti|one-?step|I(?:I|V|X|er|ᵉʳ))", m.group(2)) and morph(dDA, (m.start(2), m.group(2)), ":[me]")
def c456p_1 (s, sx, m, dDA, sCountry):
    return not re.search("^NF (?:C|E|P|Q|S|X|Z|EN(?: ISO|)) [0-9]+(?:‑[0-9]+|)", m.group(0))
def s456p_1 (s, m):
    return formatNF(m.group(0))
def s461p_1 (s, m):
    return m.group(0).replace("2", "₂").replace("3", "₃").replace("4", "₄")
def c469p_1 (s, sx, m, dDA, sCountry):
    return option("num")
def s469p_1 (s, m):
    return m.group(0).replace(".", u" ")
def p469p_2 (s, m):
    return m.group(0).replace(".", u" ")
def c473p_1 (s, sx, m, dDA, sCountry):
    return option("num")
def s473p_1 (s, m):
    return m.group(0).replace(" ", u" ")
def p473p_2 (s, m):
    return m.group(0).replace(" ", u" ")
def c478p_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], "NF[  -]?(C|E|P|Q|X|Z|EN(?:[  -]ISO|)) *")
def s478p_1 (s, m):
    return formatNumber(m.group(0))
def c493p_1 (s, sx, m, dDA, sCountry):
    return not option("ocr")
def s493p_1 (s, m):
    return m.group(0).replace("O", "0")
def c494p_1 (s, sx, m, dDA, sCountry):
    return not option("ocr")
def s494p_1 (s, m):
    return m.group(0).replace("O", "0")
def c513p_1 (s, sx, m, dDA, sCountry):
    return not checkDate(m.group(1), m.group(2), m.group(3)) and not look(s[:m.start()], r"(?i)\bversions? +$")
def c516p_1 (s, sx, m, dDA, sCountry):
    return not checkDateWithString(m.group(1), m.group(2), m.group(3))
def c519p_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], r"^ +av(?:ant|\.) J(?:\.-C\.|ésus-Christ)") and not checkDay(m.group(1), m.group(2), m.group(3), m.group(4))
def s519p_1 (s, m):
    return getDay(m.group(2), m.group(3), m.group(4))
def c524p_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], r"^ +av(?:ant|\.) J(?:\.-C\.|ésus-Christ)") and not checkDayWithString(m.group(1), m.group(2), m.group(3), m.group(4))
def s524p_1 (s, m):
    return getDayWithString(m.group(2), m.group(3), m.group(4))
def c563p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0", False) or m.group(1) == "en"
def c570p_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(1)+"-"+m.group(2)) and analyse(m.group(1)+"-"+m.group(2), ":", False)
def c574p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NB]", False)
def c575p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NB]", False) and not nextword1(s, m.end())
def c578p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":N") and not re.search("(?i)^(?:aequo|nihilo|cathedra|absurdo|abrupto)", m.group(1))
def c580p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False)
def c581p_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":N", ":[AGW]")
def c584p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False)
def c586p_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(1)+"-"+m.group(2)) and analyse(m.group(1)+"-"+m.group(2), ":", False)
def c590p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":N")
def c590p_2 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":N")
def p590p_2 (s, m):
    return m.group(1)
def p593p_1 (s, m):
    return m.group(1)
def c595p_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(1)+"-"+m.group(2)) and analyse(m.group(1)+"-"+m.group(2), ":", False) and morph(dDA, prevword1(s, m.start()), ":D", False, not bool(re.search("(?i)^s(?:ans|ous)$", m.group(1))))
def c599p_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(1)+"-"+m.group(2)) and analyse(m.group(1)+"-"+m.group(2), ":N", False) and morph(dDA, prevword1(s, m.start()), ":(?:D|V0e)", False, True) and not (morph(dDA, (m.start(1), m.group(1)), ":G", False) and morph(dDA, (m.start(2), m.group(2)), ":[GYB]", False))
def s606p_1 (s, m):
    return m.group(0).replace(" ", "-")
def s607p_1 (s, m):
    return m.group(0).replace(" ", "-")
def c618p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":Cs", False, True)
def s624p_1 (s, m):
    return m.group(0).replace(" ", "-")
def c630p_1 (s, sx, m, dDA, sCountry):
    return not nextword1(s, m.end())
def c632p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":G")
def c636p_1 (s, sx, m, dDA, sCountry):
    return look(s[:m.start()], r"(?i)\b(?:les?|du|des|un|ces?|[mts]on) +")
def c643p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":D", False)
def c645p_1 (s, sx, m, dDA, sCountry):
    return not ( morph(dDA, prevword1(s, m.start()), ":R", False) and look(s[m.end():], "^ +qu[e’]") )
def s693p_1 (s, m):
    return m.group(0).replace(" ", "-")
def c695p_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], "(?i)quatre $")
def s695p_1 (s, m):
    return m.group(0).replace(" ", "-").replace("vingts", "vingt")
def s697p_1 (s, m):
    return m.group(0).replace(" ", "-")
def s699p_1 (s, m):
    return m.group(0).replace(" ", "-").replace("vingts", "vingt")
def s723p_1 (s, m):
    return m.group(0).replace("-", " ")
def c725p_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def s726p_1 (s, m):
    return m.group(0).replace("-", " ")
def s728p_1 (s, m):
    return m.group(0).replace("-", " ")
def s729p_1 (s, m):
    return m.group(0).replace("-", " ")
def c777p_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":(?:G|V0)|>(?:t(?:antôt|emps|rès)|loin|souvent|parfois|quelquefois|côte|petit) ", False) and not m.group(1)[0].isupper()
def p793p_1 (s, m):
    return m.group(0).replace("‑", "")
def p794p_1 (s, m):
    return m.group(0).replace("‑", "")
def c840s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(0), m.group(0)), ":", False)
def c843s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D", False)
def c844s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":A", False) and not morph(dDA, prevword1(s, m.start()), ":D", False)
def c881s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":(?:O[sp]|X)", False)
def d881s_1 (s, m, dDA):
    return select(dDA, m.start(1), m.group(1), ":V")
def d883s_1 (s, m, dDA):
    return select(dDA, m.start(1), m.group(1), ":V")
def c885s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":[YD]", False)
def d885s_1 (s, m, dDA):
    return exclude(dDA, m.start(1), m.group(1), ":V")
def d887s_1 (s, m, dDA):
    return exclude(dDA, m.start(1), m.group(1), ":V")
def d889s_1 (s, m, dDA):
    return exclude(dDA, m.start(1), m.group(1), ":V")
def c891s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":Y", False)
def d891s_1 (s, m, dDA):
    return exclude(dDA, m.start(1), m.group(1), ":V")
def d893s_1 (s, m, dDA):
    return exclude(dDA, m.start(1), m.group(1), ":[123][sp]")
def c904s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":M", ":G") and not morph(dDA, (m.start(2), m.group(2)), ":N", False) and not prevword1(s, m.start())
def c914s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":E", False) and morph(dDA, (m.start(3), m.group(3)), ":M", False)
def c924s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":Y", False) and morph(dDA, (m.start(2), m.group(2)), ":M", False)
def c933s_1 (s, sx, m, dDA, sCountry):
    return option("mapos")
def s933s_1 (s, m):
    return m.group(1)[:-1]+"’"
def c940s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[GNAY]", ":(?:Q|3s)|>(?:priori|post[eé]riori|contrario|capella) ")
def c954s_1 (s, sx, m, dDA, sCountry):
    return not m.group(0).isdigit()
def s954s_1 (s, m):
    return m.group(0).replace("O", "0").replace("I", "1")
def s957s_1 (s, m):
    return m.group(0).replace("a", "â").replace("A", "Â")
def s960s_1 (s, m):
    return m.group(0).replace("n", "u")
def c972s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b([jn]’|il |on |elle )$")
def c975s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b[jn]e +$")
def c981s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":N.*:f:s", False)
def c984s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D.*:f:[si]")
def c987s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, nextword1(s, m.end()), ">(?:et|o[uù]) ")
def c996s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D.*:p", False, False)
def c997s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":[VNA]", False, True)
def c1001s_1 (s, sx, m, dDA, sCountry):
    return m.group(0).endswith("o")
def c1001s_2 (s, sx, m, dDA, sCountry):
    return m.group(0).endswith("s") and not morph(dDA, prevword1(s, m.start()), ":D.*:[me]", False, False)
def c1006s_1 (s, sx, m, dDA, sCountry):
    return m.group(0).endswith("é") and not morph(dDA, prevword1(s, m.start()), ":D.*:m:[si]", False, False)
def c1006s_2 (s, sx, m, dDA, sCountry):
    return m.group(0).endswith("s") and not morph(dDA, prevword1(s, m.start()), ":D.*:m:p", False, False)
def c1011s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\bau ")
def c1032s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start()) and morph(dDA, (m.start(2), m.group(2)), ":(?:O[on]|3s)", False)
def c1036s_1 (s, sx, m, dDA, sCountry):
    return m.group(0).endswith("U")
def c1036s_2 (s, sx, m, dDA, sCountry):
    return m.group(0).endswith("s")
def c1041s_1 (s, sx, m, dDA, sCountry):
    return not m.group(0).endswith("s")
def c1041s_2 (s, sx, m, dDA, sCountry):
    return m.group(0).endswith("s")
def s1046s_1 (s, m):
    return m.group(0).replace("o", "e")
def c1049s_1 (s, sx, m, dDA, sCountry):
    return look(s[:m.start()], r"\w") or not morph(dDA, (m.start(2), m.group(2)), ":Y", False)
def s1053s_1 (s, m):
    return m.group(0).replace("é", "e").replace("É", "E").replace("è", "e").replace("È", "E")
def c1060s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":(?:V0|N.*:m:[si])", False, False)
def c1069s_1 (s, sx, m, dDA, sCountry):
    return m.group(0).endswith("e") and not morph(dDA, prevword1(s, m.start()), ":D.*:[me]:[si]", False, False)
def c1069s_2 (s, sx, m, dDA, sCountry):
    return m.group(0).endswith("s") and not morph(dDA, prevword1(s, m.start()), ":D.*:[me]:[pi]", False, False)
def s1073s_1 (s, m):
    return m.group(0).replace("è", "ê").replace("È", "Ê")
def s1074s_1 (s, m):
    return m.group(0).replace("é", "ê").replace("É", "Ê")
def c1090s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:ne|il|on|elle|je) +$") and morph(dDA, (m.start(1), m.group(1)), ":[NA].*:[me]:[si]", False)
def c1092s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:ne|il|on|elle) +$") and morph(dDA, (m.start(1), m.group(1)), ":[NA].*:[fe]:[si]", False)
def c1094s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:ne|tu) +$") and morph(dDA, (m.start(1), m.group(1)), ":[NA].*:[pi]", False)
def c1101s_1 (s, sx, m, dDA, sCountry):
    return m.group(0).endswith("u") and not morph(dDA, prevword1(s, m.start()), ":D.*:m:s", False, False)
def c1101s_2 (s, sx, m, dDA, sCountry):
    return m.group(0).endswith("x") and not morph(dDA, prevword1(s, m.start()), ":D.*:m:p", False, False)
def c1109s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D.*:m:p", False, False)
def c1112s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D.*:f:s", False, False)
def c1115s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D.*:[me]:p", False, False)
def c1121s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D.*:m:s", False, False)
def c1130s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":A.*:f", False) or morph(dDA, prevword1(s, m.start()), ":D:*:f", False, False)
def s1130s_1 (s, m):
    return m.group(1).replace("è", "ê").replace("È", "Ê")
def s1138s_1 (s, m):
    return m.group(0).replace("a", "o").replace("A", "O")
def c1144s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:ce|d[eu]|un|quel|leur) +")
def c1158s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^([nv]ous|faire|en|la|lui|donnant|œuvre|h[éo]|olé|joli|Bora|couvent|dément|sapiens|très|vroum|[0-9]+)$", m.group(1)) and not (re.search("^(?:est|une?)$", m.group(1)) and look(s[:m.start()], "[’']$")) and not (m.group(1) == "mieux" and look(s[:m.start()], "(?i)qui +$"))
def s1172s_1 (s, m):
    return suggSimil(m.group(2), ":[NA].*:[pi]")
def s1174s_1 (s, m):
    return suggSimil(m.group(2), ":[NA].*:[si]")
def c1197s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^avoir$", m.group(1)) and morph(dDA, (m.start(1), m.group(1)), ">avoir ", False)
def c1212s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:être|mettre) ", False)
def c1243s_1 (s, sx, m, dDA, sCountry):
    return not look_chk1(dDA, s[m.end():], m.end(), r" \w[\w-]+ en ([aeo][a-zû]*)", ":V0a")
def c1263s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">abolir ", False)
def c1265s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">achever ", False)
def c1266s_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], r" +de?\b")
def c1275s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":A|>un", False)
def c1281s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">comparer ")
def c1282s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">contraindre ", False)
def c1293s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">joindre ")
def c1319s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">suffire ")
def c1320s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">talonner ")
def c1327s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:prévenir|prévoir|prédire|présager|préparer|pressentir|pronostiquer|avertir|devancer|réserver) ", False)
def c1332s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:ajourner|différer|reporter) ", False)
def c1399s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]") and m.group(2)[0].islower()
def s1399s_1 (s, m):
    return suggSimil(m.group(2), ":[NAQ]:[fe]:[si]")
def c1403s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":N.*:[fe]|:[AW]") and m.group(2)[0].islower() or m.group(2) == "va"
def c1403s_2 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]") and m.group(2)[0].islower() and hasSimil(m.group(2))
def s1403s_2 (s, m):
    return suggSimil(m.group(2), ":[NAQ]:[fe]:[si]")
def c1409s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]") and m.group(2)[0].islower() and not (m.group(2) == "sortir" and re.search(r"(?i)au", m.group(1)))
def s1409s_1 (s, m):
    return suggSimil(m.group(2), ":[NAQ]:[me]:[si]")
def c1414s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]|:V0e.*:3[sp]|>devoir") and m.group(2)[0].islower() and hasSimil(m.group(2))
def s1414s_1 (s, m):
    return suggSimil(m.group(2), ":[NAQ]:[me]:[si]")
def c1418s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]") and m.group(2)[0].islower()
def s1418s_1 (s, m):
    return suggSimil(m.group(2), ":[NAQ]:.:[si]")
def c1422s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V.*:(?:Y|[123][sp])") and m.group(1)[0].islower() and not prevword1(s, m.start())
def s1422s_1 (s, m):
    return suggSimil(m.group(1), ":[NAQ]:[me]:[si]")
def c1426s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]") and m.group(2)[0].islower() and not re.search(r"(?i)^quelques? soi(?:ent|t|s)\b", m.group(0))
def s1426s_1 (s, m):
    return suggSimil(m.group(2), ":[NAQ]:.:[pi]")
def c1430s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]") and m.group(2)[0].islower()
def s1430s_1 (s, m):
    return suggSimil(m.group(2), ":[NAQ]:[me]:[pi]")
def c1434s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]") and m.group(2)[0].islower()
def s1434s_1 (s, m):
    return suggSimil(m.group(2), ":[NAQ]:[fe]:[pi]")
def c1438s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[123][sp]", ":[NAQ]")
def s1438s_1 (s, m):
    return suggSimil(m.group(1), ":(?:[NAQ]:[fe]:[si])")
def c1446s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[me]", ":[YG]") and m.group(2)[0].islower()
def c1446s_2 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]", False)
def s1446s_2 (s, m):
    return suggSimil(m.group(2), ":Y")
def c1455s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[123][sp]", ":[NAQ]")
def s1455s_1 (s, m):
    return suggSimil(m.group(1), ":(?:[NAQ]:.:[si])")
def c1462s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Y|[123][sp])") and not look(s[:m.start()], "(?i)(?:dont|sauf|un à) +$")
def s1462s_1 (s, m):
    return suggSimil(m.group(1), ":[NAQ]:[me]:[si]")
def c1466s_1 (s, sx, m, dDA, sCountry):
    return m.group(1)[0].islower() and morph(dDA, (m.start(1), m.group(1)), ":V.*:[123][sp]")
def s1466s_1 (s, m):
    return suggSimil(m.group(1), ":[NA]")
def c1470s_1 (s, sx, m, dDA, sCountry):
    return m.group(1)[0].islower() and morphex(dDA, (m.start(1), m.group(1)), ":V.*:[123][sp]", ":[GNA]")
def s1470s_1 (s, m):
    return suggSimil(m.group(1), ":[NAQ]")
def c1474s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":", ":(?:[123][sp]|O[onw]|X)|ou ") and morphex(dDA, prevword1(s, m.start()), ":", ":3s", True)
def s1474s_1 (s, m):
    return suggSimil(m.group(1), ":(?:3s|Oo)")
def c1478s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":", ":(?:[123][sp]|O[onw]|X)|ou ") and morphex(dDA, prevword1(s, m.start()), ":", ":3p", True)
def s1478s_1 (s, m):
    return suggSimil(m.group(1), ":(?:3p|Oo)")
def c1482s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":", ":(?:[123][sp]|O[onw]|X)") and morphex(dDA, prevword1(s, m.start()), ":", ":1s", True)
def s1482s_1 (s, m):
    return suggSimil(m.group(1), ":(?:1s|Oo)")
def c1486s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":", ":(?:[123][sp]|O[onw]|X)") and morphex(dDA, prevword1(s, m.start()), ":", ":(?:2s|V0e)", True)
def s1486s_1 (s, m):
    return suggSimil(m.group(1), ":(?:2s|Oo)")
def c1499s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":P", False)
def c1500s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]")
def c1506s_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P|O[on]|X)|>(?:[lmtsn]|surtout|guère|presque) ", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s1506s_1 (s, m):
    return suggSimil(m.group(2), ":(?:V|Oo)")
def c1509s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^se que?", m.group(0)) and _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P|Oo)|>[lmts] ", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s1509s_1 (s, m):
    return suggSimil(m.group(2), ":(?:V|Oo)")
def c1513s_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P|Oo)", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s1513s_1 (s, m):
    return suggSimil(m.group(2), ":V")
def c1516s_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P|O[onw]|X)", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s1516s_1 (s, m):
    return suggSimil(m.group(2), ":V")
def c1519s_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|O[onw])", False)
def s1519s_1 (s, m):
    return suggSimil(m.group(2), ":[123][sp]")
def c1522s_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P)|>(?:en|y|ils?) ", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s1522s_1 (s, m):
    return suggSimil(m.group(2), ":V")
def c1525s_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P)|>(?:en|y|ils?|elles?) ", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s1525s_1 (s, m):
    return suggSimil(m.group(2), ":V")
def c1528s_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":[123][sp]|>(?:en|y) ", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|dire)$", m.group(2))
def s1528s_1 (s, m):
    return suggSimil(m.group(2), ":V")
def c1547s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:Y|[123][sp])", ":[GAQW]")
def c1551s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[123][sp]", ":(?:G|N|A|Q|W|M[12])")
def c1558s_1 (s, sx, m, dDA, sCountry):
    return not m.group(1)[0].isupper() and morphex(dDA, (m.start(1), m.group(1)), ":[123][sp]", ":[GNAQM]")
def c1562s_1 (s, sx, m, dDA, sCountry):
    return not m.group(1)[0].isupper() and morphex(dDA, (m.start(1), m.group(1)), ":[123][sp]", ":[GNAQM]") and not morph(dDA, prevword1(s, m.start()), ":[NA]:[me]:si", False)
def c1566s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[123][sp]", ":(?:G|N|A|Q|W|M[12]|T)")
def c1570s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y)", ":[GAQW]") and not morph(dDA, prevword1(s, m.start()), ":V[123].*:[123][sp]", False, False)
def c1578s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":[VN]", False, True)
def c1579s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c1582s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:[lmts]a|leur|une|en) +$")
def c1584s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":(?:D|Oo|M)", False)
def c1585s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">être ") and not look(s[:m.start()], r"(?i)\bce que? ")
def c1604s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^(?:côtés?|coups?|peu(?:-près|)|pics?|propos|valoir|plat-ventrismes?)", m.group(2))
def c1604s_2 (s, sx, m, dDA, sCountry):
    return re.search("(?i)^(?:côtés?|coups?|peu(?:-pr(?:ès|êts?|és?)|)|pics?|propos|valoir|plat-ventrismes?)", m.group(2))
def c1609s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":3s", False, False)
def c1612s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":(?:3s|R)", False, False) and not morph(dDA, nextword1(s, m.end()), ":Oo", False)
def c1617s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":Q", ":M[12P]")
def c1620s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ]", ":(?:Y|Oo)")
def c1624s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ]", ":(?:Y|Oo)")
def c1631s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\bce que?\b")
def c1633s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":(?:M[12]|D|Oo)")
def c1638s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]") and not m.group(2)[0:1].isupper() and not m.group(2).startswith("tord")
def c1641s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)[ln]’$|(?<!-)\b(?:il|elle|on|y|n’en) +$")
def c1645s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)(\bque?\\b|[ln]’$|(?<!-)\b(?:il|elle|on|y|n’en) +$)")
def c1648s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)(\bque?\b|[ln]’$|(?<!-)\b(?:il|elle|on|y|n’en) +$)")
def c1652s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":Y", False) and not look(s[:m.start()], r"(?i)\bque? |(?:il|elle|on|n’(?:en|y)) +$")
def c1693s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c1700s_1 (s, sx, m, dDA, sCountry):
    return not nextword1(s, m.end()) or look(s[m.end():], "(?i)^ +que? ")
def c1702s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":G", ">(?:tr(?:ès|op)|peu|bien|plus|moins|toute) |:[NAQ].*:f")
def c1706s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f") and not re.search("^seule?s?", m.group(2))
def c1709s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"\b(?:[oO]h|[aA]h) +$")
def c1711s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":R")
def c1724s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ]", ":([123][sp]|Y|P|Q)|>l[ea]? ")
def c1727s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":Y")  and m.group(1) != "CE"
def c1729s_1 (s, sx, m, dDA, sCountry):
    return (m.group(0).find(",") >= 0 or morphex(dDA, (m.start(2), m.group(2)), ":G", ":[AYD]"))
def c1732s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V[123].*:(?:Y|[123][sp])") and not morph(dDA, (m.start(2), m.group(2)), ">(?:devoir|pouvoir) ") and m.group(2)[0].islower() and m.group(1) != "CE"
def c1739s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c1741s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V", ":[NAQ].*:[me]") or look(s[:m.start()], r"(?i)\b[cs]e +")
def c1746s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":N.*:s", ":(?:A.*:[pi]|P)")
def c1768s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":N.*:p", ":(?:G|W|M|A.*:[si])")
def c1778s_1 (s, sx, m, dDA, sCountry):
    return m.group(1).endswith("en") or look(s[:m.start()], "^ *$")
def c1784s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start()) and not morph(dDA, nextword1(s, m.end()), ":W", False, False)
def c1787s_1 (s, sx, m, dDA, sCountry):
    return not m.group(1).startswith("B")
def c1803s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":E|>le ", False, False)
def c1813s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y)", ":(?:G|N|A|M[12P])") and not look(s[:m.start()], r"(?i)\bles *$")
def c1828s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":W", False) and not morph(dDA, prevword1(s, m.start()), ":V.*:3s", False, False)
def s1840s_1 (s, m):
    return m.group(1).replace("pal", "pâl")
def s1843s_1 (s, m):
    return m.group(1).replace("pal", "pâl")
def c1852s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], "très +$")
def c1855s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[AQ]", False)
def c1878s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ">(?:arriver|venir|à|revenir|partir|aller) ")
def c1883s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":P", False)
def c1894s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ]", ":(?:G|[123][sp]|W)")
def s1894s_1 (s, m):
    return m.group(1).replace(" ", "")
def c1899s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def c1907s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start()) and morph(dDA, (m.start(2), m.group(2)), ":V", False)
def c1910s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start()) and morph(dDA, (m.start(2), m.group(2)), ":V", False) and not ( m.group(1) == "sans" and morph(dDA, (m.start(2), m.group(2)), ":[NY]", False) )
def c1919s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":A")
def c1941s_1 (s, sx, m, dDA, sCountry):
    return look(s[:m.start()], r"\b(aux|[ldmts]es|[nv]os) +$")
def c1942s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[AQ].*:[pi]", False)
def c1946s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c1948s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:d[eu]|avant|après|sur|malgré) +$")
def c1950s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:d[eu]|avant|après|sur|malgré) +$") and not morph(dDA, (m.start(2), m.group(2)), ":(?:3s|Oo)", False)
def c1953s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:d[eu]|avant|après|sur|malgré) +$")
def c1959s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":f") and not look(s[:m.start()], "(?i)(?:à|pas|de|[nv]ous|eux) +$")
def c1962s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":m") and not look(s[:m.start()], "(?i)(?:à|pas|de|[nv]ous|eux) +$")
def c1966s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":N.*:[fp]", ":(?:A|W|G|M[12P]|Y|[me]:i|3s)") and morph(dDA, prevword1(s, m.start()), ":R|>de ", False, True)
def s1966s_1 (s, m):
    return suggMasSing(m.group(1))
def c1970s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[mp]") and morph(dDA, prevword1(s, m.start()), ":R|>de ", False, True)
def s1970s_1 (s, m):
    return suggFemSing(m.group(1))
def c1974s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[fs]") and morph(dDA, prevword1(s, m.start()), ":R|>de ", False, True)
def s1974s_1 (s, m):
    return suggMasPlur(m.group(1))
def c1978s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[ms]") and morph(dDA, prevword1(s, m.start()), ":R|>de ", False, True)
def s1978s_1 (s, m):
    return suggFemPlur(m.group(1))
def c1992s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]", False) and not (re.search("(?i)^(?:jamais|rien)$", m.group(3)) and look(s[:m.start()], r"\b(?:que?|plus|moins)\b"))
def c1996s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]", False) and not (re.search("(?i)^(?:jamais|rien)$", m.group(3)) and look(s[:m.start()], r"\b(?:que?|plus|moins)\b"))
def c2000s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(3), m.group(3)), ":[123][sp]", False) and not (re.search("(?i)^(?:jamais|rien)$", m.group(3)) and look(s[:m.start()], r"\b(?:que?|plus|moins)\b"))
def c2004s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(3), m.group(3)), ":[123][sp]", False) and not (re.search("(?i)^(?:jamais|rien)$", m.group(3)) and look(s[:m.start()], r"\b(?:que?|plus|moins)\b"))
def c2019s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":(?:Y|W|O[ow])", False) and _oDict.isValid(m.group(1))
def s2019s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c2049s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":A.*:s", False)
def c2291s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":G")
def c2298s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def c2310s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^(?:janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)s?$", m.group(2))
def c2317s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"\b(?:une|la|cette|[mts]a|[nv]otre|de) +")
def c2347s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c2347s_2 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c2366s_1 (s, sx, m, dDA, sCountry):
    return m.group(2).isdigit() or morph(dDA, (m.start(2), m.group(2)), ":B", False)
def c2371s_1 (s, sx, m, dDA, sCountry):
    return look(s[:m.start()], r"\b[lL]a +$")
def d2371s_1 (s, m, dDA):
    return define(dDA, m.start(0), [">numéro :N:f:s"])
def c2381s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">prendre ", False)
def c2385s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">rester ", False)
def c2390s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:sembler|para[îi]tre) ") and morphex(dDA, (m.start(3), m.group(3)), ":A", ":G")
def c2393s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">tenir ", False)
def c2395s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">trier ", False)
def c2397s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">venir ", False)
def c2411s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", ":(?:G|3p)")
def c2416s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", ":(?:G|3p)")
def c2423s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":B", False)
def c2424s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":V0", False) or not morph(dDA, nextword1(s, m.end()), ":A", False)
def c2425s_1 (s, sx, m, dDA, sCountry):
    return isEndOfNG(dDA, s[m.end():], m.end())
def c2426s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":W", False)
def c2427s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":A .*:m:s", False)
def c2429s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":(?:R|C[sc])", False, True)
def c2430s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":B", False) or re.search("(?i)^(?:plusieurs|maintes)", m.group(1))
def c2431s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, nextword1(s, m.end()), ":[NAQR]", False, True)
def c2432s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":V0")
def c2434s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":D", False)
def c2435s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":D.*:[me]:[si]", False)
def c2436s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, nextword1(s, m.end()), ":([AQ].*:[me]:[pi])", False, False)
def c2437s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(2), m.group(2)), ":A", False)
def c2438s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:croire|devoir|estimer|imaginer|penser) ")
def c2440s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:R|D|[123]s|X)", False)
def c2441s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(2), m.group(2)), ":[AQ]:[ef]:[si]", False)
def c2442s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(2), m.group(2)), ":[AQ]:[em]:[si]", False)
def c2443s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def c2444s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\bt(?:u|oi qui)\b")
def c2445s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def c2446s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":A", False)
def c2447s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def c2448s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":W", False)
def c2449s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[AW]", ":G")
def c2450s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[AW]", False)
def c2451s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(2), m.group(2)), ":Y", False)
def c2454s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NV]", ":D")
def c2455s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(2), m.group(2)), ":(?:3s|X)", False)
def c2456s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[me]", False)
def c2463s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":M[12]", False) and (morph(dDA, (m.start(2), m.group(2)), ":(?:M[12]|V)", False) or not _oDict.isValid(m.group(2)))
def c2464s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":M", False) and morph(dDA, (m.start(2), m.group(2)), ":M", False)
def c2465s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":M", False)
def c2466s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:M[12]|N)") and morph(dDA, (m.start(2), m.group(2)), ":(?:M[12]|N)")
def c2467s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":MP")
def c2468s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":M[12]", False)
def c2469s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":M[12]", False)
def c2472s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[MT]", False) and morph(dDA, prevword1(s, m.start()), ":Cs", False, True) and not look(s[:m.start()], r"\b(?:plus|moins|aussi) .* que +$")
def p2472s_1 (s, m):
    return rewriteSubject(m.group(1),m.group(2))
def c2477s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def c2479s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def c2481s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:V0e|N)", False) and morph(dDA, (m.start(3), m.group(3)), ":[AQ]", False)
def c2483s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0", False)
def c2485s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0", False) and morph(dDA, (m.start(3), m.group(3)), ":[QY]", False)
def c2487s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and not (m.group(2) == "crainte" and look(s[:m.start()], r"\w"))
def c2489s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False)
def c2491s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morph(dDA, (m.start(3), m.group(3)), ":B", False) and morph(dDA, (m.start(4), m.group(4)), ":(?:Q|V1.*:Y)", False)
def c2495s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def c2496s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V[123]")
def c2497s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V[123]", False)
def c2498s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def c2501s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":G")
def c2504s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(2), m.group(2)), "[NAQ].*:[me]:[si]", False)
def c2506s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[me]", ":G") and morph(dDA, (m.start(3), m.group(3)), ":[AQ].*:[me]", False)
def c2508s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[fe]", ":G") and morph(dDA, (m.start(3), m.group(3)), ":[AQ].*:[fe]", False)
def c2510s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", ":[123][sp]") and morph(dDA, (m.start(3), m.group(3)), ":[AQ].*:[pi]", False)
def c2513s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[AW]")
def c2515s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[AW]", False)
def c2517s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[AQ]", False)
def c2519s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":W", ":3p")
def c2521s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[AW]", ":[123][sp]")
def c2525s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and morph(dDA, (m.start(3), m.group(3)), ":W", False) and morph(dDA, (m.start(4), m.group(4)), ":[AQ]", False)
def c2527s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, True)
def c2528s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":W\\b")
def c2531s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False)
def c2535s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:N|A|Q|V0e)", False)
def c2608s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":1s", False, False)
def c2609s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":2s", False, False)
def c2610s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":3s", False, False)
def c2611s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":1p", False, False)
def c2612s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":2p", False, False)
def c2613s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":3p", False, False)
def c2614s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]")
def c2620s_1 (s, sx, m, dDA, sCountry):
    return isAmbiguousNAV(m.group(3)) and morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False)
def c2623s_1 (s, sx, m, dDA, sCountry):
    return isAmbiguousNAV(m.group(3)) and morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and not re.search("^[dD](?:’une?|e la) ", m.group(0))
def c2626s_1 (s, sx, m, dDA, sCountry):
    return isAmbiguousNAV(m.group(3)) and ( morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":3[sp]") and not prevword1(s, m.start())) )
def c2642s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":(?:G|V0)", False)
def c2652s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ]", False)
def c2655s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ]", False)
def c2658s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", False)
def c2673s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)")
def c2676s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)") or ( morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":[me]") and morphex(dDA, (m.start(1), m.group(1)), ":R", ">(?:e[tn]|ou) ") and not (morph(dDA, (m.start(1), m.group(1)), ":Rv", False) and morph(dDA, (m.start(3), m.group(3)), ":Y", False)) )
def c2680s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":(?:e|m|P|G|W|Y)")
def c2684s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":[GWme]")
def c2687s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":(?:e|m|G|W|V0|3s)")
def c2690s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":(?:e|m|G|W|P)")
def c2693s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":[GWme]")
def c2696s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":[GWme]")
def c2699s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:s", ":[GWme]")
def c2703s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":(?:e|f|P|G|W|[1-3][sp]|Y)")
def c2706s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":(?:e|f|P|G|W|[1-3][sp]|Y)") or ( morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[fe]") and morphex(dDA, (m.start(1), m.group(1)), ":[RC]", ">(?:e[tn]|ou) ") and not (morph(dDA, (m.start(1), m.group(1)), ":(?:Rv|C)", False) and morph(dDA, (m.start(3), m.group(3)), ":Y", False)) )
def c2710s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efPGWY]")
def c2714s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efGW]")
def c2717s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":(?:e|f|G|W|V0|3s|P)") and not ( m.group(2) == "demi" and morph(dDA, nextword1(s, m.end()), ":N.*:f") )
def c2720s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":(?:e|f|G|W|V0|3s)")
def c2723s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efGWP]")
def c2726s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efGW]")
def c2729s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efGW]")
def s2729s_1 (s, m):
    return suggCeOrCet(m.group(2))
def c2733s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":[GWme]")
def s2733s_1 (s, m):
    return m.group(1).replace("on", "a")
def c2736s_1 (s, sx, m, dDA, sCountry):
    return re.search("(?i)^[aâeéèêiîoôuûyœæ]", m.group(2)) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":[eGW]")
def s2736s_1 (s, m):
    return m.group(1).replace("a", "on")
def c2736s_2 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efGW]")
def s2736s_2 (s, m):
    return m.group(1).replace("a", "on")
def c2743s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efGW]")
def c2749s_1 (s, sx, m, dDA, sCountry):
    return ( morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s") and not (look(s[m.end():], "^ +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False)) ) or m.group(1) in aREGULARPLURAL
def s2749s_1 (s, m):
    return suggPlur(m.group(1))
def c2753s_1 (s, sx, m, dDA, sCountry):
    return ( morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") or (morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[pi]|>avoir") and morphex(dDA, (m.start(1), m.group(1)), ":[RC]", ">(?:e[tn]|ou) ") and not (morph(dDA, (m.start(1), m.group(1)), ":Rv", False) and morph(dDA, (m.start(2), m.group(2)), ":Y", False))) ) and not (look(s[m.end():], "^ +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False))
def s2753s_1 (s, m):
    return suggPlur(m.group(2))
def c2758s_1 (s, sx, m, dDA, sCountry):
    return (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[ipYPGW]") and not (look(s[m.end():], "^ +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False))) or m.group(1) in aREGULARPLURAL
def s2758s_1 (s, m):
    return suggPlur(m.group(1))
def c2763s_1 (s, sx, m, dDA, sCountry):
    return (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[ipGW]") and not (look(s[m.end():], "^ +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False))) or m.group(1) in aREGULARPLURAL
def s2763s_1 (s, m):
    return suggPlur(m.group(1))
def c2768s_1 (s, sx, m, dDA, sCountry):
    return (morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":(?:[ipGW]|[123][sp])") and not (look(s[m.end():], "^ +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False))) or m.group(2) in aREGULARPLURAL
def s2768s_1 (s, m):
    return suggPlur(m.group(2))
def c2768s_2 (s, sx, m, dDA, sCountry):
    return (morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":(?:[ipGW]|[123][sp])") and not (look(s[m.end():], "^ +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False))) or m.group(2) in aREGULARPLURAL
def c2777s_1 (s, sx, m, dDA, sCountry):
    return (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[ipPGW]") and not (look(s[m.end():], "^ +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False))) or m.group(1) in aREGULARPLURAL
def s2777s_1 (s, m):
    return suggPlur(m.group(1))
def c2787s_1 (s, sx, m, dDA, sCountry):
    return (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[ip]|>o(?:nde|xydation|or)\\b") and morphex(dDA, prevword1(s, m.start()), ":(?:G|[123][sp])", ":[AD]", True)) or m.group(1) in aREGULARPLURAL
def s2787s_1 (s, m):
    return suggPlur(m.group(1))
def c2793s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[ip]") or m.group(1) in aREGULARPLURAL
def s2793s_1 (s, m):
    return suggPlur(m.group(1))
def c2797s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[ip]") or m.group(1) in aREGULARPLURAL
def s2797s_1 (s, m):
    return suggPlur(m.group(1))
def c2801s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[123][sp]|:[si]")
def s2801s_1 (s, m):
    return suggSing(m.group(1))
def c2805s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p")
def s2805s_1 (s, m):
    return suggSing(m.group(1))
def c2808s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") or ( morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[si]") and morphex(dDA, (m.start(1), m.group(1)), ":[RC]", ">(?:e[tn]|ou)") and not (morph(dDA, (m.start(1), m.group(1)), ":Rv", False) and morph(dDA, (m.start(2), m.group(2)), ":Y", False)) )
def s2808s_1 (s, m):
    return suggSing(m.group(2))
def c2812s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[siGW]")
def s2812s_1 (s, m):
    return suggSing(m.group(1))
def c2816s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p")
def c2816s_2 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p")
def s2816s_2 (s, m):
    return suggSing(m.group(2))
def c2819s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p") or ( morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[si]") and morphex(dDA, (m.start(1), m.group(1)), ":[RC]", ">(?:e[tn]|ou)") and not (morph(dDA, (m.start(1), m.group(1)), ":Rv", False) and morph(dDA, (m.start(3), m.group(3)), ":Y", False)) )
def c2819s_2 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p") or ( morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[si]") and morphex(dDA, (m.start(1), m.group(1)), ":[RC]", ">(?:e[tn]|ou)") and not (morph(dDA, (m.start(1), m.group(1)), ":Rv", False) and morph(dDA, (m.start(3), m.group(3)), ":Y", False)) )
def s2819s_2 (s, m):
    return suggSing(m.group(3))
def c2824s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]")
def c2824s_2 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]")
def s2824s_2 (s, m):
    return suggSing(m.group(2))
def c2828s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[siGW]")
def s2828s_1 (s, m):
    return suggSing(m.group(1))
def c2832s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]")
def c2836s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siG]")
def c2840s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[siGW]") and not morph(dDA, prevword(s, m.start(), 2), ":B", False)
def s2840s_1 (s, m):
    return suggSing(m.group(1))
def c2883s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not re.search("(?i)^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$", m.group(2))) or m.group(2) in aREGULARPLURAL
def s2883s_1 (s, m):
    return suggPlur(m.group(2))
def c2889s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not morph(dDA, prevword1(s, m.start()), ":N", False) and not re.search("(?i)^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$", m.group(2))) or m.group(2) in aREGULARPLURAL
def s2889s_1 (s, m):
    return suggPlur(m.group(2))
def c2895s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s") or m.group(1) in aREGULARPLURAL) and not look(s[:m.start()], r"(?i)\b(?:le|un|ce|du) +$")
def s2895s_1 (s, m):
    return suggPlur(m.group(1))
def c2899s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p") and not re.search("(?i)^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor|Rois|Corinthiens|Thessaloniciens)$", m.group(1))
def s2899s_1 (s, m):
    return suggSing(m.group(1))
def c2903s_1 (s, sx, m, dDA, sCountry):
    return not re.search("^0*[01]$", m.group(1)) and ((morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not re.search("(?i)^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$", m.group(2))) or m.group(1) in aREGULARPLURAL)
def s2903s_1 (s, m):
    return suggPlur(m.group(2))
def c2915s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:p", ":(?:V0e|[NAQ].*:[me]:[si])")
def c2915s_2 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:p", ":(?:V0e|[NAQ].*:[me]:[si])")
def c2915s_3 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:[si]", ":(?:V0e|[NAQ].*:[me]:[si])")
def c2919s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:s", ":(?:V0e|[NAQ].*:[me]:[pi])")
def c2919s_2 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:s", ":(?:V0e|[NAQ].*:[me]:[pi])")
def c2919s_3 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:[pi]", ":(?:V0e|[NAQ].*:[me]:[pi])")
def c2923s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:p", ":(?:V0e|[NAQ].*:[fe]:[si])")
def c2923s_2 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:p", ":(?:V0e|[NAQ].*:[fe]:[si])")
def c2923s_3 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:[si]", ":(?:V0e|[NAQ].*:[fe]:[si])")
def c2927s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:s", ":(?:V0e|[NAQ].*:[fe]:[pi])")
def c2927s_2 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:s", ":(?:V0e|[NAQ].*:[fe]:[pi])")
def c2927s_3 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:[pi]", ":(?:V0e|[NAQ].*:[fe]:[pi])")
def c2939s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$")
def c2942s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$")
def s2942s_1 (s, m):
    return m.group(1)[:-1]
def c2946s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$") and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":[me]")
def c2950s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$") and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[fe]")
def c2954s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$") and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":[me]")
def c2958s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$") and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[fe]")
def c2974s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V0e", False)
def c2977s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V0e", False) and morphex(dDA, (m.start(4), m.group(4)), ":[NAQ].*:m", ":[fe]")
def s2977s_1 (s, m):
    return m.group(1).replace("lle", "l")
def c2982s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V0e", False)
def c2985s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V0e", False) and morphex(dDA, (m.start(4), m.group(4)), ":[NAQ].*:f", ":[me]")
def s2985s_1 (s, m):
    return m.group(1).replace("l", "lle")
def c3004s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">trouver ", False) and morphex(dDA, (m.start(3), m.group(3)), ":A.*:(?:f|m:p)", ":(?:G|3[sp]|M[12P])")
def s3004s_1 (s, m):
    return suggMasSing(m.group(3))
def c3015s_1 (s, sx, m, dDA, sCountry):
    return ((morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and not apposition(m.group(1), m.group(2))
def s3015s_1 (s, m):
    return switchGender(m.group(2))
def c3015s_2 (s, sx, m, dDA, sCountry):
    return ((morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p")) or (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s"))) and not apposition(m.group(1), m.group(2))
def s3015s_2 (s, m):
    return switchPlural(m.group(2))
def c3023s_1 (s, sx, m, dDA, sCountry):
    return ((morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s3023s_1 (s, m):
    return switchGender(m.group(2))
def c3023s_2 (s, sx, m, dDA, sCountry):
    return ((morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s")) or (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p"))) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s3023s_2 (s, m):
    return switchPlural(m.group(2))
def c3035s_1 (s, sx, m, dDA, sCountry):
    return ((morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":[GYfe]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f", ":[GYme]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s3035s_1 (s, m):
    return switchGender(m.group(2))
def c3035s_2 (s, sx, m, dDA, sCountry):
    return ((morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[GYsi]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[GYpi]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p"))) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s3035s_2 (s, m):
    return switchPlural(m.group(2))
def c3047s_1 (s, sx, m, dDA, sCountry):
    return ((morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":(?:[Gfe]|V0e|Y)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f", ":(?:[Gme]|V0e|Y)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s3047s_1 (s, m):
    return switchGender(m.group(2))
def c3047s_2 (s, sx, m, dDA, sCountry):
    return ((morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":(?:[Gsi]|V0e|Y)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":(?:[Gpi]|V0e|Y)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p"))) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s3047s_2 (s, m):
    return switchPlural(m.group(2))
def c3065s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^air$", m.group(1)) and not m.group(2).startswith("seul") and ((morph(dDA, (m.start(1), m.group(1)), ":m") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morph(dDA, (m.start(1), m.group(1)), ":f") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s3065s_1 (s, m):
    return switchGender(m.group(2), False)
def c3065s_2 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^air$", m.group(1)) and not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[si]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s3065s_2 (s, m):
    return suggSing(m.group(2))
def c3074s_1 (s, sx, m, dDA, sCountry):
    return not m.group(2).startswith("seul") and ((morph(dDA, (m.start(1), m.group(1)), ":m") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morph(dDA, (m.start(1), m.group(1)), ":f") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]", False, False) and not apposition(m.group(1), m.group(2))
def s3074s_1 (s, m):
    return switchGender(m.group(2), False)
def c3074s_2 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^air$", m.group(1)) and not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[si]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not morph(dDA, prevword1(s, m.start()), ":[NAQ]", False, False) and not apposition(m.group(1), m.group(2))
def s3074s_2 (s, m):
    return suggSing(m.group(2))
def c3089s_1 (s, sx, m, dDA, sCountry):
    return m.group(1) != "fois" and not m.group(2).startswith("seul") and ((morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":[fe]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f", ":[me]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and morph(dDA, prevword1(s, m.start()), ":[VRBX]|>comme ", True, True) and not apposition(m.group(1), m.group(2))
def s3089s_1 (s, m):
    return switchGender(m.group(2), True)
def c3089s_2 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and morph(dDA, prevword1(s, m.start()), ":[VRBX]|>comme ", True, True) and not apposition(m.group(1), m.group(2))
def s3089s_2 (s, m):
    return suggPlur(m.group(2))
def c3110s_1 (s, sx, m, dDA, sCountry):
    return m.group(1) != "fois" and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not m.group(2).startswith("seul") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|d’) *$")
def s3110s_1 (s, m):
    return suggSing(m.group(2))
def c3114s_1 (s, sx, m, dDA, sCountry):
    return m.group(1) != "fois" and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not m.group(2).startswith("seul") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQB]", False, False)
def s3114s_1 (s, m):
    return suggSing(m.group(2))
def c3124s_1 (s, sx, m, dDA, sCountry):
    return not m.group(3).startswith("seul") and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[me]", ":(?:B|G|V0|f)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f") and not apposition(m.group(2), m.group(3)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s3124s_1 (s, m):
    return suggMasPlur(m.group(3))  if re.search("(?i)^(?:certains|quels)", m.group(1)) else suggMasSing(m.group(3))
def c3130s_1 (s, sx, m, dDA, sCountry):
    return not m.group(3).startswith("seul") and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[me]", ":(?:B|G|V0|f)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f") and not apposition(m.group(2), m.group(3)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s3130s_1 (s, m):
    return suggMasPlur(m.group(3))  if re.search("(?i)^(?:certains|quels)", m.group(1)) else suggMasSing(m.group(3))
def c3138s_1 (s, sx, m, dDA, sCountry):
    return not m.group(3).startswith("seul") and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":(?:B|G|e|V0|f)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f") and not apposition(m.group(2), m.group(3)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s3138s_1 (s, m):
    return suggMasSing(m.group(3))
def c3143s_1 (s, sx, m, dDA, sCountry):
    return not m.group(3).startswith("seul") and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":(?:B|G|e|V0|f)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f") and not apposition(m.group(2), m.group(3)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s3143s_1 (s, m):
    return suggMasSing(m.group(3))
def c3150s_1 (s, sx, m, dDA, sCountry):
    return m.group(2) != "fois" and not m.group(3).startswith("seul") and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m") and not apposition(m.group(2), m.group(3)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s3150s_1 (s, m):
    return suggFemPlur(m.group(3))  if re.search("(?i)^(?:certaines|quelles)", m.group(1))  else suggFemSing(m.group(3))
def c3156s_1 (s, sx, m, dDA, sCountry):
    return m.group(2) != "fois" and not m.group(3).startswith("seul") and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m") and not apposition(m.group(2), m.group(3)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s3156s_1 (s, m):
    return suggFemPlur(m.group(3))  if re.search("(?i)^(?:certaines|quelles)", m.group(1))  else suggFemSing(m.group(3))
def c3164s_1 (s, sx, m, dDA, sCountry):
    return m.group(2) != "fois" and not m.group(3).startswith("seul") and not re.search("(?i)^quelque chose", m.group(0)) and ((morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":(?:B|e|G|V0|f)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f")) or (morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":(?:B|e|G|V0|m)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m"))) and not apposition(m.group(2), m.group(3)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s3164s_1 (s, m):
    return switchGender(m.group(3), m.group(1).endswith("s"))
def c3169s_1 (s, sx, m, dDA, sCountry):
    return m.group(2) != "fois" and not m.group(3).startswith("seul") and not re.search("(?i)^quelque chose", m.group(0)) and ((morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":(?:B|e|G|V0|f)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f")) or (morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":(?:B|e|G|V0|m)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m"))) and not apposition(m.group(2), m.group(3)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s3169s_1 (s, m):
    return switchGender(m.group(3), m.group(1).endswith("s"))
def c3178s_1 (s, sx, m, dDA, sCountry):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s3178s_1 (s, m):
    return suggSing(m.group(2))
def c3183s_1 (s, sx, m, dDA, sCountry):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s3183s_1 (s, m):
    return suggSing(m.group(2))
def c3190s_1 (s, sx, m, dDA, sCountry):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWi]") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s3190s_1 (s, m):
    return suggSing(m.group(2))
def c3195s_1 (s, sx, m, dDA, sCountry):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWi]") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s3195s_1 (s, m):
    return suggSing(m.group(2))
def c3202s_1 (s, sx, m, dDA, sCountry):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not apposition(m.group(1), m.group(2)) and not look_chk1(dDA, s[m.end():], m.end(), r"^ +et +(\w[\w-]+)", ":A")
def s3202s_1 (s, m):
    return suggPlur(m.group(2))
def c3208s_1 (s, sx, m, dDA, sCountry):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not apposition(m.group(1), m.group(2)) and not look_chk1(dDA, s[m.end():], m.end(), r"^ +et +(\w[\w-]+)", ":A") and not look(s[:m.start()], r"(?i)\bune? de ")
def s3208s_1 (s, m):
    return suggPlur(m.group(2))
def c3243s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s")) or (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[si]") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p"))
def s3243s_1 (s, m):
    return switchPlural(m.group(3))
def c3248s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s")
def s3248s_1 (s, m):
    return suggPlur(m.group(3))
def c3252s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", False) and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:[pi]", ":G") and morph(dDA, (m.start(4), m.group(4)), ":[NAQ].*:s") and not look(s[:m.start()], r"(?i)\bune? de ")
def s3252s_1 (s, m):
    return suggPlur(m.group(4))
def c3257s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:[si]", ":G") and morph(dDA, (m.start(4), m.group(4)), ":[NAQ].*:p")
def s3257s_1 (s, m):
    return suggSing(m.group(4))
def c3267s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:(?:m|f:p)", ":(?:G|P|[fe]:[is]|V0|3[sp])") and not apposition(m.group(1), m.group(2))
def s3267s_1 (s, m):
    return suggFemSing(m.group(2))
def c3271s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") and not apposition(m.group(1), m.group(2))
def s3271s_1 (s, m):
    return suggMasSing(m.group(2))
def c3275s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f|>[aéeiou].*:e", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:(?:f|m:p)", ":(?:G|P|m:[is]|V0|3[sp])") and not apposition(m.group(1), m.group(2))
def s3275s_1 (s, m):
    return suggMasSing(m.group(2))
def c3279s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":G|>[aéeiou].*:[ef]") and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") and not apposition(m.group(2), m.group(3))
def s3279s_1 (s, m):
    return suggMasSing(m.group(3))
def c3284s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":G|>[aéeiou].*:[ef]") and not morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f|>[aéeiou].*:e", False) and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") and not apposition(m.group(2), m.group(3))
def s3284s_1 (s, m):
    return suggMasSing(m.group(3))
def c3289s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":(?:G|P|[me]:[ip]|V0|3[sp])") and not apposition(m.group(1), m.group(2))
def s3289s_1 (s, m):
    return suggPlur(m.group(2))
def c3311s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":B.*:p", False) and m.group(2) != "cents"
def c3346s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c3347s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c3348s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c3354s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\bquatre $")
def c3357s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, nextword1(s, m.end()), ":B", False) and not look(s[:m.start()], r"(?i)\b(?:numéro|page|chapitre|référence|année|test|série)s? +$")
def c3368s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, nextword1(s, m.end()), ":B|>une?", False, True) and not look(s[:m.start()], r"(?i)\b(?:numéro|page|chapitre|référence|année|test|série)s? +$")
def c3372s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, nextword1(s, m.end()), ":B|>une?", False, False)
def c3375s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", ":G") and morphex(dDA, prevword1(s, m.start()), ":[VR]", ":B", True)
def c3380s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, nextword1(s, m.end()), ":B") or (morph(dDA, prevword1(s, m.start()), ":B") and morph(dDA, nextword1(s, m.end()), ":[NAQ]", False))
def c3390s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":D.*:[si]", False, True)
def s3395s_1 (s, m):
    return suggPlur(m.group(1))
def s3398s_1 (s, m):
    return suggPlur(m.group(1))
def c3413s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c3416s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False) and morph(dDA, (m.start(3), m.group(3)), ":(?:N|MP)")
def s3457s_1 (s, m):
    return m.group(1).rstrip("e")
def c3462s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:V0e|W)|>très", False)
def c3470s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:co[ûu]ter|payer) ", False)
def c3487s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">donner ", False)
def c3502s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:mettre|mise) ", False)
def c3514s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:avoir|perdre) ", False)
def c3517s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:lit|fauteuil|armoire|commode|guéridon|tabouret|chaise)s?\b")
def c3524s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":(?:V|[NAQ].*:s)", ":(?:[NA]:.:[pi]|V0e.*:[123]p)", True)
def c3582s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:aller|partir) ", False)
def c3591s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":V0e.*:3p", False, False) or morph(dDA, nextword1(s, m.end()), ":Q", False, False)
def c3611s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:être|devenir|para[îi]tre|rendre|sembler) ", False)
def s3611s_1 (s, m):
    return m.group(2).replace("oc", "o")
def s3615s_1 (s, m):
    return m.group(1).replace("oc", "o")
def c3633s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">tenir ")
def c3650s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">mettre ", False)
def c3651s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c3672s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:être|aller) ", False)
def s3674s_1 (s, m):
    return m.group(1).replace("auspice", "hospice")
def s3676s_1 (s, m):
    return m.group(1).replace("auspice", "hospice")
def c3697s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, nextword1(s, m.end()), ":[AQ]")
def s3711s_1 (s, m):
    return m.group(1).replace("cane", "canne")
def c3718s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:appuyer|battre|frapper|lever|marcher) ", False)
def s3718s_1 (s, m):
    return m.group(2).replace("cane", "canne")
def c3724s_1 (s, sx, m, dDA, sCountry):
    return not re.search("^C(?:annes|ANNES)", m.group(1))
def c3727s_1 (s, sx, m, dDA, sCountry):
    return not re.search("^C(?:annes|ANNES)", m.group(1))
def c3741s_1 (s, sx, m, dDA, sCountry):
    return look(s[m.end():], "^ +[ldmtsc]es ") or ( morph(dDA, prevword1(s, m.start()), ":Cs", False, True) and not look(s[:m.start()], ", +$") and not look(s[m.end():], r"^ +(?:ils?|elles?)\b") and not morph(dDA, nextword1(s, m.end()), ":Q", False, False) )
def c3750s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c3758s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False)
def c3760s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":[VR]", False)
def c3764s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^à cor et à cri$", m.group(0))
def c3771s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">tordre ", False)
def c3773s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">rendre ", False)
def c3784s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">couper ")
def c3785s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:avoir|donner) ", False)
def c3797s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V.[^:]:(?!Q)")
def c3803s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:[lmtsc]es|des?|[nv]os|leurs|quels) +$")
def c3814s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, nextword1(s, m.end()), ":[GV]", ":[NAQ]", True)
def c3817s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, nextword1(s, m.end()), ":[GV]", ":[NAQ]")
def c3820s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, nextword1(s, m.end()), ":[GV]", ":[NAQ]", True)
def c3823s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, nextword1(s, m.end()), ":G", ":[NAQ]")
def c3826s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def s3826s_1 (s, m):
    return m.group(2).replace("nd", "nt")
def c3837s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":V0e", False, False)
def c3843s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ">(?:abandonner|céder|résister) ", False) and not look(s[m.end():], "^ d(?:e |’)")
def s3856s_1 (s, m):
    return m.group(1).replace("nt", "mp")
def c3871s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False) and morph(dDA, (m.start(3), m.group(3)), ":(?:Y|Oo)", False)
def s3871s_1 (s, m):
    return m.group(2).replace("sens", "cens")
def s3878s_1 (s, m):
    return m.group(1).replace("c", "s").replace("C", "S")
def s3885s_1 (s, m):
    return m.group(1).replace("o", "ô")
def c3900s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False)
def c3917s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:desceller|desseller) ", False)
def s3917s_1 (s, m):
    return m.group(2).replace("descell", "décel").replace("dessell", "décel")
def c3921s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:desceller|desseller) ", False)
def s3921s_1 (s, m):
    return m.group(1).replace("descell", "décel").replace("dessell", "décel")
def c3935s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0", False)
def s3935s_1 (s, m):
    return m.group(2).replace("î", "i")
def c3938s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:[vn]ous|lui|leur|et toi) +$|[nm]’$")
def s3946s_1 (s, m):
    return m.group(1).replace("and", "ant")
def c3952s_1 (s, sx, m, dDA, sCountry):
    return not ( m.group(1) == "bonne" and look(s[:m.start()], r"(?i)\bune +$") and look(s[m.end():], "(?i)^ +pour toute") )
def c3955s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:faire|perdre|donner) ", False)
def c3980s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":D")
def s4057s_1 (s, m):
    return m.group(0)[:-1].replace(" ", "-")+u"à"
def c4058s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":[NAQ]")
def c4059s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":[123][sp]")
def c4068s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":[GQ]")
def c4070s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":[GQ]")
def c4074s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":[GQ]")
def c4085s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":Y", ":[NA].*:[pe]") and not look(s[:m.start()], r"(?i)\b[ld]es +$")
def c4095s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">soulever ", False)
def s4095s_1 (s, m):
    return m.group(1)[3:]
def c4110s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:être|habiter|trouver|situer|rester|demeurer?) ", False)
def c4121s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False)
def c4125s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False)
def c4139s_1 (s, sx, m, dDA, sCountry):
    return not (m.group(1) == "Notre" and look(s[m.end():], "Père"))
def s4139s_1 (s, m):
    return m.group(1).replace("otre", "ôtre")
def c4141s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(les?|la|du|des|aux?) +") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ]", False)
def s4141s_1 (s, m):
    return m.group(1).replace("ôtre", "otre").rstrip("s")
def c4149s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def c4160s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c4163s_1 (s, sx, m, dDA, sCountry):
    return ( re.search("^[nmts]e$", m.group(2)) or (not re.search("(?i)^(?:confiance|envie|peine|prise|crainte|affaire|hâte|force|recours|somme)$", m.group(2)) and morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":[AG]")) ) and not prevword1(s, m.start())
def c4168s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:[1-3][sp])", ":(?:G|1p)") and not ( m.group(0).find(" leur ") and morph(dDA, (m.start(2), m.group(2)), ":[NA].*:[si]", False) ) and not prevword1(s, m.start())
def c4174s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":[VR]", False, False) and not look(s[m.end():], "^ +>") and not morph(dDA, nextword1(s, m.end()), ":3s", False)
def c4182s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V.[a-z_!?]+:(?!Y)")
def c4183s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V0e", ":Y")
def c4185s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def s4192s_1 (s, m):
    return m.group(1).replace("pin", "pain")
def c4194s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:manger|dévorer|avaler|engloutir) ")
def s4194s_1 (s, m):
    return m.group(2).replace("pin", "pain")
def c4201s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">aller ", False)
def c4208s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def s4208s_1 (s, m):
    return m.group(2).replace("pal", "pâl")
def s4211s_1 (s, m):
    return m.group(2).replace("pal", "pâl")
def c4217s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">prendre ", False)
def c4218s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">tirer ", False)
def c4219s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c4221s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">prendre ", False)
def c4229s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ]")
def c4230s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c4236s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":A") and not re.search("(?i)^seule?s?$", m.group(2))
def c4240s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:N|A|Q|G|MP)")
def c4254s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":(?:Y|M[12P])")
def c4257s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], "(?i)(?:peu|de) $") and morph(dDA, (m.start(2), m.group(2)), ":Y|>(tout|les?|la) ")
def c4269s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False)
def c4275s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":Q")
def c4283s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, nextword1(s, m.end()), ":[AQ]", False)
def c4303s_1 (s, sx, m, dDA, sCountry):
    return not nextword1(s, m.end())
def c4306s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">résonner ", False)
def s4306s_1 (s, m):
    return m.group(1).replace("réso", "raiso")
def c4316s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":M1", False)
def s4329s_1 (s, m):
    return m.group(1).replace("sale", "salle")
def c4333s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def s4333s_1 (s, m):
    return m.group(2).replace("salle", "sale")
def s4347s_1 (s, m):
    return m.group(1).replace("scep","sep")
def c4350s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">être ", False)
def s4350s_1 (s, m):
    return m.group(2).replace("sep", "scep")
def c4358s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">suivre ", False)
def c4366s_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], " soit ")
def c4367s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, nextword1(s, m.end()), ":[GY]", True, True) and not look(s[:m.start()], "(?i)quel(?:s|les?|) qu $|on $|il $") and not look(s[m.end():], " soit ")
def c4371s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":[YQ]|>(?:avec|contre|par|pour|sur) ", False, True)
def c4385s_1 (s, sx, m, dDA, sCountry):
    return ( morphex(dDA, (m.start(2), m.group(2)), ":N.*:[me]:s", ":[GW]") or (re.search("(?i)^[aeéiîou]", m.group(2)) and morphex(dDA, (m.start(2), m.group(2)), ":N.*:f:s", ":G")) ) and ( look(s[:m.start()], r"(?i)^ *$|\b(?:à|avec|chez|dès|contre|devant|derrière|en|par|pour|sans|sur) +$|, +$") or (morphex(dDA, prevword1(s, m.start()), ":V", ":(?:G|W|[NA].*:[pi])") and not look(s[:m.start()], r"(?i)\bce que?\b")) )
def s4405s_1 (s, m):
    return m.group(1).replace("sur", "sûr")
def s4408s_1 (s, m):
    return m.group(1).replace("sur", "sûr")
def c4414s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":M1", False)
def c4417s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":Y", False)
def s4417s_1 (s, m):
    return m.group(1).replace("sur", "sûr")
def c4426s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":N", ":[GMY]|>(?:fond|envergure|ampleur|importance|départ) ") and not look(s[:m.start()], "accompl|dél[éè]gu")
def s4426s_1 (s, m):
    return m.group(1).replace("â", "a")
def s4430s_1 (s, m):
    return m.group(1).replace("â", "a")
def c4442s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ">aller ", False)
def c4445s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ">faire ", False)
def s4448s_1 (s, m):
    return m.group(1).replace("taule", "tôle")
def c4458s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False) and morph(dDA, (m.start(3), m.group(3)), ":Y", False)
def c4466s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">avoir ", False)
def s4476s_1 (s, m):
    return m.group(1).replace("vénén", "venim")
def s4478s_1 (s, m):
    return m.group(1).replace("venim", "vénén")
def c4493s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[me]:s")
def c4512s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">ouvrir ", False)
def c4521s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start()) and morph(dDA, (m.start(2), m.group(2)), ":A") and not morph(dDA, nextword1(s, m.end()), ":D", False, False)
def c4550s_1 (s, sx, m, dDA, sCountry):
    return not m.group(1).isdigit() and not m.group(2).isdigit() and not morph(dDA, (m.start(0), m.group(0)), ":", False) and not morph(dDA, (m.start(2), m.group(2)), ":G", False) and _oDict.isValid(m.group(1)+m.group(2))
def c4550s_2 (s, sx, m, dDA, sCountry):
    return m.group(2) != u"là" and not re.search("(?i)^(?:ex|mi|quasi|semi|non|demi|pro|anti|multi|pseudo|proto|extra)$", m.group(1)) and not m.group(1).isdigit() and not m.group(2).isdigit() and not morph(dDA, (m.start(2), m.group(2)), ":G", False) and not morph(dDA, (m.start(0), m.group(0)), ":", False) and not _oDict.isValid(m.group(1)+m.group(2))
def c4563s_1 (s, sx, m, dDA, sCountry):
    return look(s[:m.start()], r"[\w,] +$")
def s4563s_1 (s, m):
    return m.group(0).lower()
def c4568s_1 (s, sx, m, dDA, sCountry):
    return look(s[:m.start()], r"[\w,] +$") and not( ( m.group(0)=="Juillet" and look(s[:m.start()], "(?i)monarchie +de +$") ) or ( m.group(0)=="Octobre" and look(s[:m.start()], "(?i)révolution +d’$") ) )
def s4568s_1 (s, m):
    return m.group(0).lower()
def c4587s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^fonctions? ", m.group(0)) or not look(s[:m.start()], r"(?i)\ben $")
def c4594s_1 (s, sx, m, dDA, sCountry):
    return m.group(2).istitle() and morphex(dDA, (m.start(1), m.group(1)), ":N", ":(?:A|V0e|D|R|B)") and not re.search("(?i)^[oO]céan Indien", m.group(0))
def s4594s_1 (s, m):
    return m.group(2).lower()
def c4594s_2 (s, sx, m, dDA, sCountry):
    return m.group(2).islower() and not m.group(2).startswith("canadienne") and ( re.search("(?i)^(?:certaine?s?|cette|ce[ts]?|[dl]es|[nv]os|quelques|plusieurs|chaque|une|aux)$", m.group(1)) or ( re.search("(?i)^un$", m.group(1)) and not look(s[m.end():], "(?:approximatif|correct|courant|parfait|facile|aisé|impeccable|incompréhensible)") ) )
def s4594s_2 (s, m):
    return m.group(2).capitalize()
def s4611s_1 (s, m):
    return m.group(1).capitalize()
def c4615s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:parler|cours|leçon|apprendre|étudier|traduire|enseigner|professeur|enseignant|dictionnaire|méthode) ", False)
def s4615s_1 (s, m):
    return m.group(2).lower()
def s4620s_1 (s, m):
    return m.group(1).lower()
def c4632s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c4644s_1 (s, sx, m, dDA, sCountry):
    return look(s[:m.start()], r"\w")
def s4655s_1 (s, m):
    return m.group(1).capitalize()
def s4657s_1 (s, m):
    return m.group(1).capitalize()
def c4665s_1 (s, sx, m, dDA, sCountry):
    return re.search("^(?:Mètre|Watt|Gramme|Seconde|Ampère|Kelvin|Mole|Cand[eé]la|Hertz|Henry|Newton|Pascal|Joule|Coulomb|Volt|Ohm|Farad|Tesla|W[eé]ber|Radian|Stéradian|Lumen|Lux|Becquerel|Gray|Sievert|Siemens|Katal)s?|(?:Exa|P[ée]ta|Téra|Giga|Méga|Kilo|Hecto|Déc[ai]|Centi|Mi(?:lli|cro)|Nano|Pico|Femto|Atto|Ze(?:pto|tta)|Yo(?:cto|etta))(?:mètre|watt|gramme|seconde|ampère|kelvin|mole|cand[eé]la|hertz|henry|newton|pascal|joule|coulomb|volt|ohm|farad|tesla|w[eé]ber|radian|stéradian|lumen|lux|becquerel|gray|sievert|siemens|katal)s?", m.group(2))
def s4665s_1 (s, m):
    return m.group(2).lower()
def c4692s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":Y", False)
def c4694s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V1") and not look(s[:m.start()], r"(?i)\b(?:quelqu(?:e chose|’une?)|(?:l(es?|a)|nous|vous|me|te|se)[ @]trait|personne|rien(?: +[a-zéèêâîûù]+|) +$)")
def s4694s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4697s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V1", ":M[12P]")
def s4697s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4699s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V1", False)
def s4699s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4701s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":[123][sp]")
def c4703s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V1", ":[NM]") and not morph(dDA, prevword1(s, m.start()), ">(?:tenir|passer) ", False)
def s4703s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4706s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V1", False)
def s4706s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4708s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V1", ":[NM]")
def s4708s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4710s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":Q", False)
def c4712s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Q|2p)", False)
def s4712s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4714s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":Q", False) and not morph(dDA, prevword1(s, m.start()), "V0.*[12]p", False)
def c4716s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:devoir|savoir|pouvoir) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":(?:Q|A|[13]s|2[sp])", ":[GYW]")
def s4716s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c4719s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:Q|A|[13]s|2[sp])", ":[GYWM]")
def s4719s_1 (s, m):
    return suggVerbInfi(m.group(1))
def s4728s_1 (s, m):
    return m.group(1)[:-1]
def c4753s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def c4757s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">sembler ", False)
def c4771s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and isEndOfNG(dDA, s[m.end():], m.end())
def c4776s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V[123]_i_._") and isEndOfNG(dDA, s[m.end():], m.end())
def c4778s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":A", False) and morphex(dDA, (m.start(2), m.group(2)), ":A", ":[GM]")
def c4780s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":A", False)
def c4782s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[GV]") and isEndOfNG(dDA, s[m.end():], m.end())
def c4785s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":V0") and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ]", ":(?:G|[123][sp]|P)")
def c4796s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and isEndOfNG(dDA, s[m.end():], m.end())
def c4800s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], "[jn]’$")
def c4808s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":G") and isEndOfNG(dDA, s[m.end():], m.end())
def c4811s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and isEndOfNG(dDA, s[m.end():], m.end())
def c4814s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and isEndOfNG(dDA, s[m.end():], m.end())
def c4818s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c4821s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":N", ":[GY]") and isEndOfNG(dDA, s[m.end():], m.end())
def c4823s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and isEndOfNG(dDA, s[m.end():], m.end())
def c4825s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":Y") and isEndOfNG(dDA, s[m.end():], m.end())
def c4859s_1 (s, sx, m, dDA, sCountry):
    return re.search("(?i)^(?:fini|terminé)s?", m.group(2)) and morph(dDA, prevword1(s, m.start()), ":C", False, True)
def c4859s_2 (s, sx, m, dDA, sCountry):
    return re.search("(?i)^(?:assez|trop)$", m.group(2)) and (look(s[m.end():], "^ +d(?:e |’)") or not nextword1(s, m.end()))
def c4859s_3 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":A", ":[GVW]") and morph(dDA, prevword1(s, m.start()), ":C", False, True)
def c4871s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">aller", False) and not look(s[m.end():], " soit ")
def c4879s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def s4879s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4881s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def s4881s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4883s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def s4883s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4886s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:faire|vouloir) ", False) and not look(s[:m.start()], r"(?i)\b(?:en|[mtsld]es?|[nv]ous|un) +$") and morphex(dDA, (m.start(2), m.group(2)), ":V", ":M")
def s4886s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c4889s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False) and morphex(dDA, (m.start(2), m.group(2)), ":V", ":M")
def s4889s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c4892s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":M")
def s4892s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4895s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">savoir :V", False) and morph(dDA, (m.start(2), m.group(2)), ":V", False) and not look(s[:m.start()], r"(?i)\b(?:[mts]e|[vn]ous|les?|la|un) +$")
def s4895s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c4898s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Q|2p)", False)
def s4898s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4901s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:Q|2p)", ":N")
def s4901s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4945s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]")
def s4945s_1 (s, m):
    return suggSing(m.group(3))
def c4965s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(1), m.group(1)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(1).endswith(" été")) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWYsi]")
def s4965s_1 (s, m):
    return suggSing(m.group(2))
def c4973s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]"))
def s4973s_1 (s, m):
    return suggMasSing(m.group(3))
def c4986s_1 (s, sx, m, dDA, sCountry):
    return not (morph(dDA, (m.start(1), m.group(1)), ">seule ", False) and look(s[m.end():], "^ +que? ")) and ( morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[GWYsi]") or ( morphex(dDA, (m.start(1), m.group(1)), ":[AQ].*:f", ":[GWYme]") and not morph(dDA, nextword1(s, m.end()), ":N.*:f", False, False) ) )
def s4986s_1 (s, m):
    return suggMasSing(m.group(1))
def c4996s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[GWYsi]") or ( morphex(dDA, (m.start(1), m.group(1)), ":[AQ].*:f", ":[GWYme]") and not morph(dDA, nextword1(s, m.end()), ":N.*:f", False, False) )
def s4996s_1 (s, m):
    return suggMasSing(m.group(1))
def c5003s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]")) and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s5003s_1 (s, m):
    return suggMasSing(m.group(3))
def c5013s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]")) and not morph(dDA, prevword1(s, m.start()), ":R|>de ", False, False)
def s5013s_1 (s, m):
    return suggFemSing(m.group(3))
def c5026s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]"))
def s5026s_1 (s, m):
    return suggFemSing(m.group(3))
def c5031s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(2)) and not look(s[:m.start()], r"(?i)\b(?:nous|ne) +$") and ((morph(dDA, (m.start(1), m.group(1)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) and morph(dDA, (m.start(1), m.group(1)), ":1p", False)) or m.group(1).endswith(" été")) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[GWYpi]")
def s5031s_1 (s, m):
    return suggPlur(m.group(2))
def c5041s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(3)) and (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWYpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]")) and not look(s[:m.start()], "(?i)ce que? +$") and (not re.search("^(?:ceux-(?:ci|là)|lesquels)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s5041s_1 (s, m):
    return suggMasPlur(m.group(3))
def c5058s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(3)) and (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWYpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]")) and (not re.search("(?i)^(?:elles|celles-(?:ci|là)|lesquelles)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s5058s_1 (s, m):
    return suggFemPlur(m.group(3))
def c5070s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">avoir ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[123]s", ":[GNAQWY]")
def s5070s_1 (s, m):
    return suggVerbPpas(m.group(2))
def c5107s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]")
def s5107s_1 (s, m):
    return suggSing(m.group(3))
def c5111s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWYsi]")
def s5111s_1 (s, m):
    return suggSing(m.group(2))
def c5115s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]"))
def s5115s_1 (s, m):
    return suggMasSing(m.group(3))
def c5120s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[MWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]")) and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s5120s_1 (s, m):
    return suggMasSing(m.group(3))
def c5126s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]")) and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s5126s_1 (s, m):
    return suggFemSing(m.group(3))
def c5132s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[MWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]"))
def s5132s_1 (s, m):
    return suggFemSing(m.group(3))
def c5137s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(2)) and morph(dDA, (m.start(1), m.group(1)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and morph(dDA, (m.start(1), m.group(1)), ":1p", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[GWYpi]")
def s5137s_1 (s, m):
    return suggPlur(m.group(2))
def c5142s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(3)) and morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWYpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]")) and (not re.search("^(?:ceux-(?:ci|là)|lesquels)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s5142s_1 (s, m):
    return suggMasPlur(m.group(3))
def c5148s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(3)) and morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWYpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]")) and (not re.search("^(?:elles|celles-(?:ci|là)|lesquelles)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s5148s_1 (s, m):
    return suggFemPlur(m.group(3))
def c5179s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GMWYsi]") and not morph(dDA, (m.start(1), m.group(1)), ":G", False)
def s5179s_1 (s, m):
    return suggSing(m.group(2))
def c5183s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(2)) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[GWYpi]") and not morph(dDA, (m.start(1), m.group(1)), ":G", False)
def s5183s_1 (s, m):
    return suggPlur(m.group(2))
def c5188s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(3)) and ((morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWme]") and morphex(dDA, (m.start(2), m.group(2)), ":m", ":[Gfe]")) or (morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWfe]") and morphex(dDA, (m.start(2), m.group(2)), ":f", ":[Gme]"))) and not ( morph(dDA, (m.start(3), m.group(3)), ":p", False) and morph(dDA, (m.start(2), m.group(2)), ":s", False) ) and not morph(dDA, prevword1(s, m.start()), ":(?:R|P|Q|Y|[123][sp])", False, False) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s5188s_1 (s, m):
    return switchGender(m.group(3))
def c5195s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(2)) and ((morphex(dDA, (m.start(1), m.group(1)), ":M[1P].*:f", ":[GWme]") and morphex(dDA, (m.start(2), m.group(2)), ":m", ":[GWfe]")) or (morphex(dDA, (m.start(1), m.group(1)), ":M[1P].*:m", ":[GWfe]") and morphex(dDA, (m.start(2), m.group(2)), ":f", ":[GWme]"))) and not morph(dDA, prevword1(s, m.start()), ":(?:R|P|Q|Y|[123][sp])", False, False) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s5195s_1 (s, m):
    return switchGender(m.group(2))
def c5204s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":A.*:p", ":(?:G|E|M1|W|s|i)")
def s5204s_1 (s, m):
    return suggSing(m.group(1))
def c5208s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":A.*:[fp]", ":(?:G|E|M1|W|m:[si])")
def s5208s_1 (s, m):
    return suggMasSing(m.group(1))
def c5212s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":A.*:[mp]", ":(?:G|E|M1|W|f:[si])|>(?:désoler|pire) ")
def s5212s_1 (s, m):
    return suggFemSing(m.group(1))
def c5216s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":A.*:[fs]", ":(?:G|E|M1|W|m:[pi])|>(?:désoler|pire) ")
def s5216s_1 (s, m):
    return suggMasPlur(m.group(1))
def c5220s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":A.*:[ms]", ":(?:G|E|M1|W|f:[pi])|>(?:désoler|pire) ")
def s5220s_1 (s, m):
    return suggFemPlur(m.group(1))
def c5237s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), "V0e", False)
def c5244s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]")
def s5244s_1 (s, m):
    return suggSing(m.group(1))
def c5247s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]")
def s5247s_1 (s, m):
    return suggSing(m.group(1))
def c5250s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|[NAQ].*:[pf])", ":(?:G|W|[me]:[si])|question ") and not (m.group(1) == "ce" and morph(dDA, (m.start(2), m.group(2)), ":Y", False))
def s5250s_1 (s, m):
    return suggMasSing(m.group(2))
def c5253s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:[pm])", ":(?:G|W|[fe]:[si])")
def s5253s_1 (s, m):
    return suggFemSing(m.group(1))
def c5256s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]")
def s5256s_1 (s, m):
    return suggPlur(m.group(1))
def c5259s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(1)) and (morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]") or morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|[AQ].*:f)", ":[GWme]"))
def s5259s_1 (s, m):
    return suggMasPlur(m.group(1))
def c5262s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(1)) and (morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]") or morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|[AQ].*:m)", ":[GWfe]"))
def s5262s_1 (s, m):
    return suggFemPlur(m.group(1))
def c5292s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":[QWGBMpi]") and not re.search("(?i)^(?:légion|nombre|cause)$", m.group(1)) and not look(s[:m.start()], r"(?i)\bce que?\b")
def s5292s_1 (s, m):
    return suggPlur(m.group(1))
def c5292s_2 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:N|A|Q|W|G|3p)") and not look(s[:m.start()], r"(?i)\bce que?\b")
def s5292s_2 (s, m):
    return suggVerbPpas(m.group(1), ":m:p")
def c5303s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWYsi]")
def s5303s_1 (s, m):
    return suggSing(m.group(2))
def c5307s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWYsi]")
def s5307s_1 (s, m):
    return suggSing(m.group(2))
def c5311s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":[GWYme]")) and (not re.search("^(?:celui-(?:ci|là)|lequel)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s5311s_1 (s, m):
    return suggMasSing(m.group(3))
def c5317s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[GWYfe]")) and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s5317s_1 (s, m):
    return suggFemSing(m.group(3))
def c5323s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[GWYfe]"))
def s5323s_1 (s, m):
    return suggFemSing(m.group(3))
def c5328s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[GWpi]")
def s5328s_1 (s, m):
    return suggPlur(m.group(2))
def c5332s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":[GWYme]")) and (not re.search("^(?:ceux-(?:ci|là)|lesquels)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s5332s_1 (s, m):
    return suggMasPlur(m.group(3))
def c5338s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[GWYfe]")) and (not re.search("^(?:elles|celles-(?:ci|là)|lesquelles)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s5338s_1 (s, m):
    return suggFemPlur(m.group(3))
def c5346s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:trouver|considérer|croire) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[AQ]:(?:m:p|f)", ":(?:G|Y|[AQ]:m:[is])")
def s5346s_1 (s, m):
    return suggMasSing(m.group(2))
def c5349s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:trouver|considérer|croire) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[AQ]:(?:f:p|m)", ":(?:G|Y|[AQ]:f:[is])")
def s5349s_1 (s, m):
    return suggFemSing(m.group(2))
def c5352s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:trouver|considérer|croire) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[AQ].*:s", ":(?:G|Y|[AQ].*:[ip])")
def s5352s_1 (s, m):
    return suggPlur(m.group(2))
def c5355s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:trouver|considérer|croire) ", False) and morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:p", ":(?:G|Y|[AQ].*:[is])")
def s5355s_1 (s, m):
    return suggSing(m.group(3))
def c5358s_1 (s, sx, m, dDA, sCountry):
    return ( morphex(dDA, (m.start(1), m.group(1)), ">(?:trouver|considérer|croire) ", ":1p") or (morph(dDA, (m.start(1), m.group(1)), ">(?:trouver|considérer|croire) .*:1p", False) and look(s[:m.start()], r"\bn(?:ous|e) +$")) ) and morphex(dDA, (m.start(2), m.group(2)), ":[AQ].*:s", ":(?:G|Y|[AQ].*:[ip])")
def s5358s_1 (s, m):
    return suggPlur(m.group(2))
def c5381s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">avoir ", False) and morph(dDA, (m.start(3), m.group(3)), ":Y", False)
def c5383s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$", m.group(3)) and morph(dDA, prevword1(s, m.start()), ">puisque? ", False, True) and morph(dDA, (m.start(2), m.group(2)), ":V0a", False) and not m.group(3).isupper() and morphex(dDA, (m.start(3), m.group(3)), ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])")
def s5383s_1 (s, m):
    return suggMasSing(m.group(3))
def c5389s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$", m.group(4)) and morph(dDA, prevword1(s, m.start()), ">puisque? ", False, True) and morph(dDA, (m.start(3), m.group(3)), ":V0a", False) and not m.group(4).isupper() and morphex(dDA, (m.start(4), m.group(4)), ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])")
def s5389s_1 (s, m):
    return suggMasSing(m.group(4))
def c5395s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morphex(dDA, (m.start(2), m.group(2)), ":V[0-3]..t.*:Q.*:s", ":[GWpi]")
def s5395s_1 (s, m):
    return suggPlur(m.group(2))
def c5400s_1 (s, sx, m, dDA, sCountry):
    return look(s[m.end():], "^ *$") and morph(dDA, (m.start(2), m.group(2)), ":V0a", False) and morph(dDA, (m.start(1), m.group(1)), ":(?:M|Os)", False) and morphex(dDA, (m.start(3), m.group(3)), ":V[0-3]..t_.*:Q.*:s", ":[GWpi]") and not look(s[:m.start()], r"\bque +$")
def s5400s_1 (s, m):
    return suggPlur(m.group(3))
def c5405s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morphex(dDA, (m.start(2), m.group(2)), ":V[0-3]..t.*:Q.*:p", ":[GWsi]")
def s5405s_1 (s, m):
    return m.group(2)[:-1]
def c5410s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V0a", False) and morphex(dDA, (m.start(3), m.group(3)), ":V[0-3]..t_.*:Q.*:p", ":[GWsi]") and not look(s[:m.start()], r"\bque?\b")
def s5410s_1 (s, m):
    return m.group(3)[:-1]
def c5415s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":Q.*:(?:f|m:p)", ":m:[si]")
def s5415s_1 (s, m):
    return suggMasSing(m.group(1))
def c5421s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$", m.group(1)) and morphex(dDA, (m.start(1), m.group(1)), ":Q.*:(?:f|m:p)", ":m:[si]") and look(s[:m.start()], "(?i)(?:après +$|sans +$|pour +$|que? +$|quand +$|, +$|^ *$)")
def s5421s_1 (s, m):
    return suggMasSing(m.group(1))
def c5460s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(3), m.group(3)), ":V0a", False) and not ((re.search("^(?:décidé|essayé|tenté)$", m.group(4)) and look(s[m.end():], " +d(?:e |’)")) or (re.search("^réussi$", m.group(4)) and look(s[m.end():], " +à"))) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ]", False) and morphex(dDA, (m.start(4), m.group(4)), ":V[0-3]..t.*:Q.*:s", ":[GWpi]") and not morph(dDA, nextword1(s, m.end()), ":(?:Y|Oo|D)", False)
def s5460s_1 (s, m):
    return suggPlur(m.group(4), m.group(2))
def c5473s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(3), m.group(3)), ":V0a", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", False) and (morphex(dDA, (m.start(4), m.group(4)), ":V[0-3]..t.*:Q.*:f", ":[GWme]") or morphex(dDA, (m.start(4), m.group(4)), ":V[0-3]..t.*:Q.*:p", ":[GWsi]"))
def s5473s_1 (s, m):
    return suggMasSing(m.group(4))
def c5487s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(3), m.group(3)), ":V0a", False) and not ((re.search("^(?:décidé|essayé|tenté)$", m.group(4)) and look(s[m.end():], " +d(?:e |’)")) or (re.search("^réussi$", m.group(4)) and look(s[m.end():], " +à"))) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", False) and (morphex(dDA, (m.start(4), m.group(4)), ":V[0-3]..t.*:Q.*:m", ":[GWfe]") or morphex(dDA, (m.start(4), m.group(4)), ":V[0-3]..t.*:Q.*:p", ":[GWsi]")) and not morph(dDA, nextword1(s, m.end()), ":(?:Y|Oo)|>que?", False)
def s5487s_1 (s, m):
    return suggFemSing(m.group(4))
def c5503s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and (morphex(dDA, (m.start(2), m.group(2)), ":V[0-3]..t.*:Q.*:f", ":[GWme]") or morphex(dDA, (m.start(2), m.group(2)), ":V[0-3]..t.*:Q.*:p", ":[GWsi]"))
def s5503s_1 (s, m):
    return suggMasSing(m.group(2))
def c5509s_1 (s, sx, m, dDA, sCountry):
    return not re.search("^(?:A|avions)$", m.group(1)) and morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morph(dDA, (m.start(2), m.group(2)), ":V.+:(?:Y|2p)", False)
def s5509s_1 (s, m):
    return suggVerbPpas(m.group(2), ":m:s")
def c5515s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and (morph(dDA, (m.start(3), m.group(3)), ":Y") or re.search("^(?:[mtsn]e|[nv]ous|leur|lui)$", m.group(3)))
def c5519s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and (morph(dDA, (m.start(3), m.group(3)), ":Y") or re.search("^(?:[mtsn]e|[nv]ous|leur|lui)$", m.group(3)))
def c5525s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, nextword1(s, m.end()), ":[NAQ].*:[me]", False)
def c5527s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def c5544s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morphex(dDA, (m.start(2), m.group(2)), ":(?:Y|2p|Q.*:[fp])", ":m:[si]") and m.group(2) != "prise" and not morph(dDA, prevword1(s, m.start()), ">(?:les|[nv]ous|en)|:[NAQ].*:[fp]", False) and not look(s[:m.start()], r"(?i)\bquel(?:le|)s?\b")
def s5544s_1 (s, m):
    return suggMasSing(m.group(2))
def c5550s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V0a", False) and morphex(dDA, (m.start(3), m.group(3)), ":(?:Y|2p|Q.*:p)", ":[si]")
def s5550s_1 (s, m):
    return suggMasSing(m.group(3))
def c5555s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morphex(dDA, (m.start(2), m.group(2)), ":V[123]..t.*:Q.*:s", ":[GWpi]")
def s5555s_1 (s, m):
    return suggPlur(m.group(2))
def c5561s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:G|Y|P|1p|3[sp])") and not look(s[m.end():], "^ +(?:je|tu|ils?|elles?|on|[vn]ous) ")
def s5561s_1 (s, m):
    return suggVerb(m.group(1), ":1p")
def c5567s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:G|Y|P|2p|3[sp])") and not look(s[m.end():], "^ +(?:je|ils?|elles?|on|[vn]ous) ")
def s5567s_1 (s, m):
    return suggVerb(m.group(1), ":2p")
def c5607s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ]", ":G")
def c5615s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V[13].*:Ip.*:2s", ":[GNAM]")
def s5615s_1 (s, m):
    return m.group(1)[:-1]
def c5618s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V[13].*:Ip.*:2s", ":G")
def s5618s_1 (s, m):
    return m.group(1)[:-1]
def c5623s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[MOs]")
def c5630s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V[23].*:Ip.*:3s", ":[GNA]") and analyse(m.group(1)[:-1]+"s", ":E:2s", False) and not re.search("(?i)^doit$", m.group(1)) and not (re.search("(?i)^vient$", m.group(1)) and look(s[m.end():], " +l[ea]"))
def s5630s_1 (s, m):
    return m.group(1)[:-1]+"s"
def c5634s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V[23].*:Ip.*:3s", ":G") and analyse(m.group(1)[:-1]+"s", ":E:2s", False)
def s5634s_1 (s, m):
    return m.group(1)[:-1]+"s"
def c5639s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V3.*:Ip.*:3s", ":[GNA]")
def c5642s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V3.*:Ip.*:3s", ":G")
def c5652s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":A", ":G") and not look(s[m.end():], r"\bsoit\b")
def c5663s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":E|>chez", False) and _oDict.isValid(m.group(1))
def s5663s_1 (s, m):
    return suggVerbImpe(m.group(1))
def c5668s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":E|>chez", False) and _oDict.isValid(m.group(1))
def s5668s_1 (s, m):
    return suggVerbTense(m.group(1), ":E", ":2s")
def c5693s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":E", ":[GM]")
def c5698s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":E", ":[GM]") and morphex(dDA, nextword1(s, m.end()), ":", ":(?:Y|3[sp])", True) and morph(dDA, prevword1(s, m.start()), ":Cc", False, True) and not look(s[:m.start()], "~ +$")
def c5703s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":E", ":[GM]") and morphex(dDA, nextword1(s, m.end()), ":", ":(?:N|A|Q|Y|B|3[sp])", True) and morph(dDA, prevword1(s, m.start()), ":Cc", False, True) and not look(s[:m.start()], "~ +$")
def c5708s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":E", ":[GM]") and morphex(dDA, nextword1(s, m.end()), ":", ":(?:N|A|Q|Y|MP)", True) and morph(dDA, prevword1(s, m.start()), ":Cc", False, True) and not look(s[:m.start()], "~ +$")
def c5727s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":E", ":(?:G|M[12])") and morphex(dDA, nextword1(s, m.end()), ":", ":(?:Y|[123][sp])", True)
def s5727s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c5732s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":E", False)
def s5732s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c5737s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":E", False) and morphex(dDA, nextword1(s, m.end()), ":[RC]", ":[NAQ]", True)
def s5737s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c5742s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":E", False) and morphex(dDA, nextword1(s, m.end()), ":[RC]", ":Y", True)
def s5742s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c5748s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, nextword1(s, m.end()), ":Y", False, False)
def s5748s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c5750s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start()) and not morph(dDA, nextword1(s, m.end()), ":Y", False, False)
def s5752s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c5778s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":R", False, True)
def c5779s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def c5781s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def c5783s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]")
def c5784s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":[123]s", False, False)
def c5785s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":(?:[123]s|R)", False, False)
def c5786s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":(?:[123]p|R)", False, False)
def c5787s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":3p", False, False)
def c5788s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]", False)
def c5789s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":(?:[NAQ].*:m:[si]|G|M)")
def c5790s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":(?:[NAQ].*:f:[si]|G|M)")
def c5791s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":(?:[NAQ].*:[si]|G|M)")
def c5792s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":(?:[NAQ].*:[si]|G|M)")
def c5794s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":(?:A|G|M|1p)")
def c5795s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":(?:A|G|M|2p)")
def c5797s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V", False)
def c5798s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c5799s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V", False)
def c5800s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(2), m.group(2)), ":2s", False) or look(s[:m.start()], r"(?i)\b(?:je|tu|on|ils?|elles?|nous) +$")
def c5801s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(2), m.group(2)), ":2s|>(ils?|elles?|on) ", False) or look(s[:m.start()], r"(?i)\b(?:je|tu|on|ils?|elles?|nous) +$")
def c5815s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def c5818s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":Y")
def c5832s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:ce que?|tout) ")
def c5845s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":M") and not (m.group(1).endswith("ez") and look(s[m.end():], " +vous"))
def s5845s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c5848s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:Q|2p)", ":M")
def s5848s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c5851s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:aimer|aller|désirer|devoir|espérer|pouvoir|préférer|souhaiter|venir) ", False) and not morph(dDA, (m.start(1), m.group(1)), ":[GN]", False) and morphex(dDA, (m.start(2), m.group(2)), ":V", ":M")
def s5851s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c5855s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">devoir ", False) and morphex(dDA, (m.start(2), m.group(2)), ":V", ":M") and not morph(dDA, prevword1(s, m.start()), ":D", False)
def s5855s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c5858s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:cesser|décider|défendre|suggérer|commander|essayer|tenter|choisir|permettre|interdire) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":(?:Q|2p)", ":M")
def s5858s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c5861s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:Q|2p)", ":M")
def s5861s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c5864s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">valoir ", False) and morphex(dDA, (m.start(2), m.group(2)), ":(?:Q|2p)", ":[GM]")
def s5864s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c5867s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V1", ":[NM]") and not m.group(1).istitle() and not look(s[:m.start()], "> +$")
def s5867s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c5870s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V1", ":N")
def s5870s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c5883s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False) and (morphex(dDA, (m.start(2), m.group(2)), ":Y", ":[NAQ]") or m.group(2) in aSHOULDBEVERB) and not re.search("(?i)^(?:soit|été)$", m.group(1)) and not morph(dDA, prevword1(s, m.start()), ":Y|>ce", False, False) and not look(s[:m.start()], "(?i)ce (?:>|qu|que >) $") and not look_chk1(dDA, s[:m.start()], 0, r"(\w[\w-]+) +> $", ":Y") and not look_chk1(dDA, s[:m.start()], 0, r"^ *>? *(\w[\w-]+)", ":Y")
def s5883s_1 (s, m):
    return suggVerbPpas(m.group(2))
def c5894s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":1s|>(?:en|y)", False)
def s5894s_1 (s, m):
    return suggVerb(m.group(1), ":1s")
def c5897s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:1s|G)") and not (morph(dDA, (m.start(2), m.group(2)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:1s", False, False))
def s5897s_1 (s, m):
    return suggVerb(m.group(2), ":1s")
def c5900s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:1s|G|1p)")
def s5900s_1 (s, m):
    return suggVerb(m.group(2), ":1s")
def c5903s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:1s|G|1p)")
def s5903s_1 (s, m):
    return suggVerb(m.group(2), ":1s")
def c5906s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:1s|G|1p|3p!)")
def s5906s_1 (s, m):
    return suggVerb(m.group(2), ":1s")
def c5926s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:G|[ISK].*:2s)") and not (morph(dDA, (m.start(2), m.group(2)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:2s", False, False))
def s5926s_1 (s, m):
    return suggVerb(m.group(2), ":2s")
def c5929s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:G|[ISK].*:2s)")
def s5929s_1 (s, m):
    return suggVerb(m.group(2), ":2s")
def c5932s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:G|2p|3p!|[ISK].*:2s)")
def s5932s_1 (s, m):
    return suggVerb(m.group(2), ":2s")
def c5943s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G)") and not (morph(dDA, (m.start(2), m.group(2)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:3s", False, False))
def s5943s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c5946s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G)")
def s5946s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c5961s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:N|A|3s|P|Q|G|V0e.*:3p)")
def s5961s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c5965s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|Q|G)")
def s5965s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c5973s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|Q|G|3p!)") and not morph(dDA, prevword1(s, m.start()), ":[VR]|>de", False, False) and not(m.group(1).endswith("out") and (morph(dDA, (m.start(2), m.group(2)), ":(?:Y|N.*:m:[si])", False) or morph(dDA, prevword1(s, m.start()), ":D", False, False)))
def s5973s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c5993s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:3s|P|G|3p!)") and not morph(dDA, prevword1(s, m.start()), ":R|>(?:et|ou)", False, False) and not (morph(dDA, (m.start(1), m.group(1)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:3s", False, False))
def s5993s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c5997s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:3s|P|G|3p!)") and not morph(dDA, prevword1(s, m.start()), ":R|>(?:et|ou)", False, False)
def s5997s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c6014s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":3p", ":(?:G|3s)")
def c6017s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":3s", ":(?:G|3p)")
def c6020s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":3p", ":(?:G|3s)") and (not prevword1(s, m.start()) or look(s[:m.start()], r"(?i)\b(?:parce que?|quoi ?que?|pour ?quoi|puisque?|quand|com(?:ment|bien)|car|tandis que?) +$"))
def c6024s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":3s", ":(?:G|3p)") and (not prevword1(s, m.start()) or look(s[:m.start()], r"(?i)\b(?:parce que?|quoi ?que?|pour ?quoi|puisque?|quand|com(?:ment|bien)|car|tandis que?) +$"))
def s6032s_1 (s, m):
    return m.group(1)[:-1]+"t"
def c6035s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G)") and morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P|Q|[123][sp]|R)", True) and not( m.group(1).endswith("ien") and look(s[:m.start()], "> +$") and morph(dDA, (m.start(2), m.group(2)), ":Y", False) )
def s6035s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c6053s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G|Q)") and morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P|Q|[123][sp]|R)", True)
def s6053s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c6057s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G)") and morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P|Q|[123][sp]|R)", True)
def s6057s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c6065s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":Y", False) and morph(dDA, (m.start(2), m.group(2)), ":V.[a-z_!?]+(?!.*:(?:3s|P|Q|Y|3p!))")
def s6065s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c6073s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P)", True) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(3), m.group(3)), ":V", ":(?:3s|P|Q|Y|3p!|G)") and not (look(s[:m.start()], r"(?i)\b(?:et|ou) +$") and morph(dDA, (m.start(3), m.group(3)), ":[1-3]p", False)) and not look(s[:m.start()], r"(?i)\bni .* ni\b") and not checkAgreement(m.group(2), m.group(3))
def s6073s_1 (s, m):
    return suggVerb(m.group(3), ":3s")
def c6077s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P)", True) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(3), m.group(3)), ":V", ":(?:3s|1p|P|Q|Y|3p!|G)") and not (look(s[:m.start()], r"(?i)\b(?:et|ou) +$") and morph(dDA, (m.start(3), m.group(3)), ":[123]p", False)) and not look(s[:m.start()], r"(?i)\bni .* ni\b")
def s6077s_1 (s, m):
    return suggVerb(m.group(3), ":3s")
def c6100s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P)", True) and isAmbiguousAndWrong(m.group(2), m.group(3), ":s", ":3s") and not (look(s[:m.start()], r"(?i)\b(?:et|ou) +$") and morph(dDA, (m.start(3), m.group(3)), ":(?:[123]p|p)", False)) and not look(s[:m.start()], r"(?i)\bni .* ni\b")
def s6100s_1 (s, m):
    return suggVerb(m.group(3), ":3s", suggSing)
def c6105s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P)", True) and isVeryAmbiguousAndWrong(m.group(2), m.group(3), ":s", ":3s", not prevword1(s, m.start())) and not (look(s[:m.start()], r"(?i)\b(?:et|ou) +$") and morph(dDA, (m.start(3), m.group(3)), ":(?:[123]p|p)", False)) and not look(s[:m.start()], r"(?i)\bni .* ni\b")
def s6105s_1 (s, m):
    return suggVerb(m.group(3), ":3s", suggSing)
def c6111s_1 (s, sx, m, dDA, sCountry):
    return ( morph(dDA, (m.start(0), m.group(0)), ":1s") or ( look(s[:m.start()], "> +$") and morph(dDA, (m.start(0), m.group(0)), ":1s", False) ) ) and not (m.group(0)[0:1].isupper() and look(sx[:m.start()], r"\w")) and not look(sx[:m.start()], r"(?i)\b(?:j(?:e |[’'])|moi(?:,? qui| seul) )")
def s6111s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c6115s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(0), m.group(0)), ":2s", ":(?:E|G|W|M|J|[13][sp]|2p)") and not m.group(0)[0:1].isupper() and not look(s[:m.start()], "^ *$") and ( not morph(dDA, (m.start(0), m.group(0)), ":[NAQ]", False) or look(s[:m.start()], "> +$") ) and not look(sx[:m.start()], r"(?i)\bt(?:u |[’']|oi,? qui |oi seul )")
def s6115s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c6120s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(0), m.group(0)), ":2s", ":(?:G|W|M|J|[13][sp]|2p)") and not (m.group(0)[0:1].isupper() and look(sx[:m.start()], r"\w")) and ( not morph(dDA, (m.start(0), m.group(0)), ":[NAQ]", False) or look(s[:m.start()], "> +$") ) and not look(sx[:m.start()], r"(?i)\bt(?:u |[’']|oi,? qui |oi seul )")
def s6120s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c6125s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(0), m.group(0)), ":[12]s", ":(?:E|G|W|M|J|3[sp]|2p|1p)") and not (m.group(0)[0:1].isupper() and look(sx[:m.start()], r"\w")) and ( not morph(dDA, (m.start(0), m.group(0)), ":[NAQ]", False) or look(s[:m.start()], "> +$") or ( re.search("(?i)^étais$", m.group(0)) and not morph(dDA, prevword1(s, m.start()), ":[DA].*:p", False, True) ) ) and not look(sx[:m.start()], r"(?i)\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))")
def s6125s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c6130s_1 (s, sx, m, dDA, sCountry):
    return not (m.group(0)[0:1].isupper() and look(sx[:m.start()], r"\w")) and not look(sx[:m.start()], r"(?i)\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))")
def s6130s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c6133s_1 (s, sx, m, dDA, sCountry):
    return not (m.group(0)[0:1].isupper() and look(sx[:m.start()], r"\w")) and not look(sx[:m.start()], r"(?i)\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))")
def s6133s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c6141s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:1p|3[sp])") and not look(s[m.end():], "^ +(?:je|tu|ils?|elles?|on|[vn]ous)")
def s6141s_1 (s, m):
    return suggVerb(m.group(1), ":1p")
def c6144s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":1p") and not look(s[m.end():], "^ +(?:je|tu|ils?|elles?|on|[vn]ous)")
def s6144s_1 (s, m):
    return suggVerb(m.group(1), ":1p")
def c6147s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":1p") and not look(s[m.end():], "^ +(?:ils|elles)")
def s6147s_1 (s, m):
    return suggVerb(m.group(1), ":1p")
def c6156s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:2p|3[sp])") and not look(s[m.end():], "^ +(?:je|ils?|elles?|on|[vn]ous)")
def s6156s_1 (s, m):
    return suggVerb(m.group(1), ":2p")
def c6159s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":2p") and not look(s[m.end():], "^ +(?:je|ils?|elles?|on|[vn]ous)")
def s6159s_1 (s, m):
    return suggVerb(m.group(1), ":2p")
def c6168s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(0), m.group(0)), ":V.*:1p", ":[EGMNAJ]") and not (m.group(0)[0:1].isupper() and look(s[:m.start()], r"\w")) and not look(sx[:m.start()], r"\b(?:[nN]ous(?:-mêmes?|)|[eE]t moi),? ")
def s6168s_1 (s, m):
    return suggVerb(m.group(0), ":3p")
def c6172s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(0), m.group(0)), ":V.*:2p", ":[EGMNAJ]") and not (m.group(0)[0:1].isupper() and look(s[:m.start()], r"\w")) and not look(sx[:m.start()], r"\b(?:[vV]ous(?:-mêmes?|)|[eE]t toi|[tT]oi et),? ")
def c6182s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|G)") and not (morph(dDA, (m.start(2), m.group(2)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:3p", False, False))
def s6182s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c6185s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|G)")
def s6185s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c6189s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|G)")
def s6189s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c6193s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|G)") and not morph(dDA, prevword1(s, m.start()), ":[VR]", False, False)
def s6193s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c6197s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:3p|P|Q|G)") and not morph(dDA, prevword1(s, m.start()), ":R", False, False) and not (morph(dDA, (m.start(1), m.group(1)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:3p", False, False))
def s6197s_1 (s, m):
    return suggVerb(m.group(1), ":3p")
def c6200s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:3p|P|Q|G)") and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s6200s_1 (s, m):
    return suggVerb(m.group(1), ":3p")
def c6215s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:à|avec|sur|chez|par|dans|parmi|contre|ni|de|pour|sous) +$")
def c6222s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|mg)") and not morph(dDA, prevword1(s, m.start()), ":[VR]|>de ", False, False)
def s6222s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c6226s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|G)") and not morph(dDA, prevword1(s, m.start()), ":[VR]", False, False)
def s6226s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c6236s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:G|N|A|3p|P|Q)") and not morph(dDA, prevword1(s, m.start()), ":[VR]", False, False)
def s6236s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c6243s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", False) and morphex(dDA, (m.start(3), m.group(3)), ":V", ":(?:[13]p|P|Q|Y|G|A.*:e:[pi])") and morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True) and not checkAgreement(m.group(2), m.group(3))
def s6243s_1 (s, m):
    return suggVerb(m.group(3), ":3p")
def c6246s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", False) and morphex(dDA, (m.start(3), m.group(3)), ":V", ":(?:[13]p|P|Y|G)") and morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True)
def s6246s_1 (s, m):
    return suggVerb(m.group(3), ":3p")
def c6267s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", False) and morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:[13]p|P|G|Q.*:p)") and morph(dDA, nextword1(s, m.end()), ":(?:R|D.*:p)|>au ", False, True)
def s6267s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c6270s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", False) and morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:[13]p|P|G)")
def s6270s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c6276s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True) and isAmbiguousAndWrong(m.group(2), m.group(3), ":p", ":3p")
def s6276s_1 (s, m):
    return suggVerb(m.group(3), ":3p", suggPlur)
def c6280s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True) and isVeryAmbiguousAndWrong(m.group(1), m.group(2), ":p", ":3p", not prevword1(s, m.start()))
def s6280s_1 (s, m):
    return suggVerb(m.group(2), ":3p", suggPlur)
def c6284s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True) and isVeryAmbiguousAndWrong(m.group(1), m.group(2), ":m:p", ":3p", not prevword1(s, m.start()))
def s6284s_1 (s, m):
    return suggVerb(m.group(2), ":3p", suggMasPlur)
def c6288s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True) and isVeryAmbiguousAndWrong(m.group(1), m.group(2), ":f:p", ":3p", not prevword1(s, m.start()))
def s6288s_1 (s, m):
    return suggVerb(m.group(2), ":3p", suggFemPlur)
def c6321s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V0e", ":3s")
def s6321s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c6325s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V0e.*:3s", ":3p")
def s6325s_1 (s, m):
    return m.group(1)[:-1]
def c6331s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V0e", ":3p")
def s6331s_1 (s, m):
    return suggVerb(m.group(1), ":3p")
def c6335s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V0e.*:3p", ":3s")
def c6346s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"\b(?:et |ou |[dD][eu] |ni |[dD]e l’) *$") and morph(dDA, (m.start(1), m.group(1)), ":M", False) and morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":(?:G|3s|3p!|P|M|[AQ].*:[si])") and not morph(dDA, prevword1(s, m.start()), ":[VRD]", False, False) and not look(s[:m.start()], r"([A-ZÉÈ][\w-]+), +([A-ZÉÈ][\w-]+), +$")
def s6346s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c6353s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":M", False) and morph(dDA, (m.start(2), m.group(2)), ":M", False) and morphex(dDA, (m.start(3), m.group(3)), ":[123][sp]", ":(?:G|3p|P|Q.*:[pi])") and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s6353s_1 (s, m):
    return suggVerb(m.group(3), ":3p")
def c6371s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:[12]s|3p)", ":(?:3s|G|W|3p!)") and not look(s[m.end():], "^ +et (?:l(?:es? |a |’|eurs? )|[mts](?:a|on|es) |ce(?:tte|ts|) |[nv]o(?:s|tre) |du )")
def s6371s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c6376s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[123]s", ":(?:3p|G|W)")
def s6376s_1 (s, m):
    return suggVerb(m.group(1), ":3p")
def c6381s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[12][sp]", ":(?:G|W|3[sp]|Y|P|Q)")
def c6386s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[12][sp]", ":(?:G|W|3[sp])")
def c6400s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V.*:1s", ":[GNW]") and not look(s[:m.start()], r"(?i)\bje +>? *$")
def s6400s_1 (s, m):
    return m.group(1)[:-1]+"é-je"
def c6403s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V.*:1s", ":[GNW]") and not look(s[:m.start()], r"(?i)\b(?:je|tu) +>? *$")
def c6406s_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], "^ +(?:en|y|ne|>)") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:2s", ":[GNW]") and not look(s[:m.start()], r"(?i)\b(?:je|tu) +>? *$")
def c6409s_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], "^ +(?:en|y|ne|>)") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:3s", ":[GNW]") and not look(s[:m.start()], r"(?i)\b(?:ce|il|elle|on) +>? *$")
def s6409s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c6412s_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], "^ +(?:en|y|ne|aussi|>)") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:3s", ":[GNW]") and not look(s[:m.start()], r"(?i)\b(?:ce|il|elle|on) +>? *$")
def c6415s_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], "^ +(?:en|y|ne|aussi|>)") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:1p", ":[GNW]") and not morph(dDA, prevword1(s, m.start()), ":Os", False, False) and not morph(dDA, nextword1(s, m.end()), ":Y", False, False)
def c6419s_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], "^ +(?:en|y|ne|aussi|>)") and not m.group(1).endswith("euillez") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:2pl", ":[GNW]") and not morph(dDA, prevword1(s, m.start()), ":Os", False, False) and not morph(dDA, nextword1(s, m.end()), ":Y", False, False)
def c6423s_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], "^ +(?:en|y|ne|aussi|>)") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:3p", ":[GNW]") and not look(s[:m.start()], r"(?i)\b(?:ce|ils|elles) +>? *$")
def s6423s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c6428s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":1[sśŝ]", False) and _oDict.isValid(m.group(1)) and not re.search("(?i)^vite$", m.group(1))
def s6428s_1 (s, m):
    return suggVerb(m.group(1), ":1ś")
def c6431s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":[ISK].*:2s", False) and _oDict.isValid(m.group(1)) and not re.search("(?i)^vite$", m.group(1))
def s6431s_1 (s, m):
    return suggVerb(m.group(1), ":2s")
def c6434s_1 (s, sx, m, dDA, sCountry):
    return m.group(1) != "t" and not morph(dDA, (m.start(1), m.group(1)), ":3s", False) and (not m.group(1).endswith("oilà") or m.group(2) != "il") and _oDict.isValid(m.group(1)) and not re.search("(?i)^vite$", m.group(1))
def s6434s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c6437s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":3p", ":3s") and _oDict.isValid(m.group(1))
def c6440s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":(?:1p|E:2[sp])", False) and _oDict.isValid(m.group(1)) and not re.search("(?i)^(?:vite|chez)$", m.group(1))
def s6440s_1 (s, m):
    return suggVerb(m.group(1), ":1p")
def c6443s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":2p", False) and _oDict.isValid(m.group(1)) and not re.search("(?i)^(?:tes|vite)$", m.group(1)) and not _oDict.isValid(m.group(0))
def s6443s_1 (s, m):
    return suggVerb(m.group(1), ":2p")
def c6446s_1 (s, sx, m, dDA, sCountry):
    return m.group(1) != "t" and not morph(dDA, (m.start(1), m.group(1)), ":3p", False) and _oDict.isValid(m.group(1))
def s6446s_1 (s, m):
    return suggVerb(m.group(1), ":3p")
def c6450s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":V", False) and not re.search("(?i)^vite$", m.group(1)) and _oDict.isValid(m.group(1)) and not ( m.group(0).endswith("il") and m.group(1).endswith("oilà") ) and not ( m.group(1) == "t" and re.search("(?:ils?|elles?|on)$", m.group(0)) )
def c6469s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">avoir ", False) and morph(dDA, (m.start(2), m.group(2)), ":V.......e_.*:Q", False)
def c6471s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">avoir ", False) and morph(dDA, (m.start(2), m.group(2)), ":V.......e_.*:Q", False)
def c6483s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Os|M)", False) and morphex(dDA, (m.start(2), m.group(2)), ":[SK]", ":(?:G|V0|I)") and not prevword1(s, m.start())
def c6486s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[SK]", ":(?:G|V0|I)") and not prevword1(s, m.start())
def c6492s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Os|M)", False) and morphex(dDA, (m.start(2), m.group(2)), ":S", ":[IG]")
def s6492s_1 (s, m):
    return suggVerbMode(m.group(2), ":I", m.group(1))
def c6492s_2 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Os|M)", False) and morph(dDA, (m.start(2), m.group(2)), ":K", False)
def s6492s_2 (s, m):
    return suggVerbMode(m.group(2), ":If", m.group(1))
def c6503s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:afin|pour|quoi|permettre|falloir|vouloir|ordonner|exiger|désirer|douter|préférer|suffire) ", False) and morph(dDA, (m.start(2), m.group(2)), ":(?:Os|M)", False) and not morph(dDA, (m.start(3), m.group(3)), ":[GYS]", False) and not (morph(dDA, (m.start(1), m.group(1)), ">douter ", False) and morph(dDA, (m.start(3), m.group(3)), ":(?:If|K)", False))
def s6503s_1 (s, m):
    return suggVerbMode(m.group(3), ":S", m.group(2))
def c6518s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Os|M)", False) and not morph(dDA, (m.start(2), m.group(2)), ":[GYS]", False)
def s6518s_1 (s, m):
    return suggVerbMode(m.group(2), ":S", m.group(1))
def c6526s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":S", ":[GIK]") and not re.search("^e(?:usse|û[mt]es|ût)", m.group(2))
def s6526s_1 (s, m):
    return suggVerbMode(m.group(2), ":I", m.group(1))
def c6529s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":S", ":[GIK]") and m.group(1) != "eusse"
def s6529s_1 (s, m):
    return suggVerbMode(m.group(1), ":I", "je")
def c6539s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Os|M)", False) and (morph(dDA, (m.start(2), m.group(2)), ":V.*:S") or morph(dDA, (m.start(2), m.group(2)), ":V0e.*:S", False))
def s6539s_1 (s, m):
    return suggVerbMode(m.group(2), ":I", m.group(1))
