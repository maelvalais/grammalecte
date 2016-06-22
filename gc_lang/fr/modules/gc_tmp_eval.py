# generated code, do not edit
def p73p_1 (s, m):
    return m.group(1).replace(".", "")+"."
def c75p_1 (s, sx, m, dDA, sCountry):
    return m.group(0) != "i.e." and m.group(0) != "s.t.p."
def s75p_1 (s, m):
    return m.group(0).replace(".", "").upper()
def p75p_2 (s, m):
    return m.group(0).replace(".", "")
def c79p_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^etc", m.group(1))
def c84p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":M[12]", False) and look(s[m.end():], "^\W+[a-zéèêîïâ]")
def c118p_1 (s, sx, m, dDA, sCountry):
    return option("typo") and not m.group(0).endswith("·e·s")
def c118p_2 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False)
def d118p_2 (s, m, dDA):
    return define(dDA, m.start(0), ":N:A:Q:e:i")
def c130p_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^(?:etc|[A-Z]|chap|cf|fig|hab|litt|circ|coll|r[eé]f|étym|suppl|bibl|bibliogr|cit|op|vol|déc|nov|oct|janv|juil|avr|sept)$", m.group(1)) and morph(dDA, (m.start(1), m.group(1)), ":", False) and morph(dDA, (m.start(2), m.group(2)), ":", False)
def s130p_1 (s, m):
    return m.group(2).capitalize()
def c141p_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":[DR]", False)
def c147p_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":M", ":G") and not morph(dDA, (m.start(2), m.group(2)), ":N", False) and not look(s[:m.start()], "(?i)quel(?:le|)s? +")
def c172p_1 (s, sx, m, dDA, sCountry):
    return not m.group(1).isdigit()
def c174p_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(1))
def s195p_1 (s, m):
    return m.group(1)[0:-1]
def s196p_1 (s, m):
    return "nᵒˢ"  if m.group(1)[1:3] == "os"  else "nᵒ"
def c204p_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], "(?i)etc$")
def s205p_1 (s, m):
    return m.group(0).replace("...", "…").rstrip(".")
def c221p_1 (s, sx, m, dDA, sCountry):
    return not re.search("^(?:etc|[A-Z]|fig|hab|litt|circ|coll|ref|étym|suppl|bibl|bibliogr|cit|vol|déc|nov|oct|janv|juil|avr|sept)$", m.group(1))
def s254p_1 (s, m):
    return m.group(0)[0] + "|" + m.group(0)[1]
def s255p_1 (s, m):
    return m.group(0)[0] + "|" + m.group(0)[1]
def s256p_1 (s, m):
    return m.group(0)[0] + "|" + m.group(0)[1]
def c262p_1 (s, sx, m, dDA, sCountry):
    return not re.search("^milli(?:on|er|ard)s?$", m.group(3)) and not morph(dDA, (m.start(3), m.group(3)), ":[CR]", False)
def c268p_1 (s, sx, m, dDA, sCountry):
    return (not re.search("^[0-9][0-9]{1,3}$", m.group(2)) and not _oDict.isValid(m.group(3))) or morphex(dDA, (m.start(3), m.group(3)), ";S", ":V") or mbUnit(m.group(3))
def c290p_1 (s, sx, m, dDA, sCountry):
    return sCountry != "CA"
def s290p_1 (s, m):
    return " "+m.group(0)
def s328p_1 (s, m):
    return undoLigature(m.group(0))
def c374p_1 (s, sx, m, dDA, sCountry):
    return not option("mapos") and morph(dDA, (m.start(2), m.group(2)), ":V", False)
def s374p_1 (s, m):
    return m.group(1)[:-1]+u"’"
def c377p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V", False)
def s377p_1 (s, m):
    return m.group(1)[:-1]+u"’"
def c381p_1 (s, sx, m, dDA, sCountry):
    return option("mapos") and not look(s[:m.start()], "(?i)(?:lettre|caractère|glyphe|dimension|variable|fonction|point) *$")
def s381p_1 (s, m):
    return m.group(1)[:-1]+u"’"
def c395p_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^(?:onz[ei]|énième|iourte|ouistiti|ouate|one-?step|Ouagadougou|I(?:I|V|X|er|ᵉʳ|ʳᵉ|è?re))", m.group(2)) and not m.group(2).isupper() and not morph(dDA, (m.start(2), m.group(2)), ":G", False)
def s395p_1 (s, m):
    return m.group(1)[0]+u"’"
def c411p_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^(?:onz|énième)", m.group(2)) and morph(dDA, (m.start(2), m.group(2)), ":[me]")
def c419p_1 (s, sx, m, dDA, sCountry):
    return not re.search("^NF (?:C|E|P|Q|S|X|Z|EN(?: ISO|)) [0-9]+(?:‑[0-9]+|)", m.group(0))
def s419p_1 (s, m):
    return formatNF(m.group(0))
def s424p_1 (s, m):
    return m.group(0).replace("2", "₂").replace("3", "₃").replace("4", "₄")
def c432p_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], "NF[  -]?(C|E|P|Q|X|Z|EN(?:[  -]ISO|)) *")
def s432p_1 (s, m):
    return formatNumber(m.group(0))
def s446p_1 (s, m):
    return m.group(0).replace("O", "0")
def s447p_1 (s, m):
    return m.group(0).replace("O", "0")
def c465p_1 (s, sx, m, dDA, sCountry):
    return not checkDate(m.group(1), m.group(2), m.group(3)) and not look(s[:m.start()], r"(?i)\bversions? +$")
def c468p_1 (s, sx, m, dDA, sCountry):
    return not checkDateWithString(m.group(1), m.group(2), m.group(3))
def c471p_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], r"^ +av(?:ant|\.) J(?:\.-C\.|ésus-Christ)") and not checkDay(m.group(1), m.group(2), m.group(3), m.group(4))
def s471p_1 (s, m):
    return getDay(m.group(2), m.group(3), m.group(4))
def c476p_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], r"^ +av(?:ant|\.) J(?:\.-C\.|ésus-Christ)") and not checkDayWithString(m.group(1), m.group(2), m.group(3), m.group(4))
def s476p_1 (s, m):
    return getDayWithString(m.group(2), m.group(3), m.group(4))
def c513p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0", False) or m.group(1) == "en"
def c516p_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(1)+"-"+m.group(2)) and analyse(m.group(1)+"-"+m.group(2), ":", False)
def c520p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NB]", False)
def c521p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NB]", False) and not nextword1(s, m.end())
def c524p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":N") and not re.search("(?i)^(?:aequo|nihilo|cathedra|absurdo|abrupto)", m.group(1))
def c526p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False)
def c527p_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":N", ":[AGW]")
def c530p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False)
def c532p_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(1)+"-"+m.group(2)) and analyse(m.group(1)+"-"+m.group(2), ":", False)
def c536p_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(1)+"-"+m.group(2)) and analyse(m.group(1)+"-"+m.group(2), ":", False) and morph(dDA, prevword1(s, m.start()), ":D", False, not bool(re.search("(?i)^s(?:ans|ous)$", m.group(1))))
def c540p_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(1)+"-"+m.group(2)) and analyse(m.group(1)+"-"+m.group(2), ":N", False) and morph(dDA, prevword1(s, m.start()), ":(?:D|V0e)", False, True) and not (morph(dDA, (m.start(1), m.group(1)), ":G", False) and morph(dDA, (m.start(2), m.group(2)), ":[GYB]", False))
def s547p_1 (s, m):
    return m.group(0).replace(" ", "-")
def s548p_1 (s, m):
    return m.group(0).replace(" ", "-")
def c559p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":Cs", False, True)
def s565p_1 (s, m):
    return m.group(0).replace(" ", "-")
def c571p_1 (s, sx, m, dDA, sCountry):
    return not nextword1(s, m.end())
def c573p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":G")
def c577p_1 (s, sx, m, dDA, sCountry):
    return look(s[:m.start()], r"(?i)\b(?:les?|du|des|un|ces?|[mts]on) +")
def c584p_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":D", False)
def c586p_1 (s, sx, m, dDA, sCountry):
    return not ( morph(dDA, prevword1(s, m.start()), ":R", False) and look(s[m.end():], "^ +qu[e’]") )
def s634p_1 (s, m):
    return m.group(0).replace(" ", "-")
def c636p_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], "(?i)quatre $")
def s636p_1 (s, m):
    return m.group(0).replace(" ", "-").replace("vingts", "vingt")
def s638p_1 (s, m):
    return m.group(0).replace(" ", "-")
def s640p_1 (s, m):
    return m.group(0).replace(" ", "-").replace("vingts", "vingt")
def s664p_1 (s, m):
    return m.group(0).replace("-", " ")
def c666p_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def s669p_1 (s, m):
    return m.group(0).replace("-", " ")
def s670p_1 (s, m):
    return m.group(0).replace("-", " ")
def c718p_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":(?:G|V0)|>(?:t(?:antôt|emps|rès)|loin|souvent|parfois|quelquefois|côte|petit) ", False) and not m.group(1)[0].isupper()
def p728p_1 (s, m):
    return m.group(0).replace("‑", "")
def p729p_1 (s, m):
    return m.group(0).replace("‑", "")
def c763s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(0), m.group(0)), ":", False)
def c766s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D", False)
def c767s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":A", False) and not morph(dDA, prevword1(s, m.start()), ":D", False)
def c804s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":(?:O[sp]|X)", False)
def d804s_1 (s, m, dDA):
    return select(dDA, m.start(1), m.group(1), ":V")
def d806s_1 (s, m, dDA):
    return select(dDA, m.start(1), m.group(1), ":V")
def c808s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":[YD]", False)
def d808s_1 (s, m, dDA):
    return exclude(dDA, m.start(1), m.group(1), ":V")
def d810s_1 (s, m, dDA):
    return exclude(dDA, m.start(1), m.group(1), ":V")
def c812s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":Y", False)
def d812s_1 (s, m, dDA):
    return exclude(dDA, m.start(1), m.group(1), ":V")
def c823s_1 (s, sx, m, dDA, sCountry):
    return option("mapos")
def s823s_1 (s, m):
    return m.group(1)[:-1]+"’"
def c830s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[GNAY]", ":Q|>(?:priori|post[eé]riori|contrario|capella) ")
def c848s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, nextword1(s, m.end()), ">(?:et|o[uù]) ")
def c852s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":N.*:f:s", False)
def c857s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start()) and morph(dDA, (m.start(2), m.group(2)), ":(O[on]|3s)", False)
def c862s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":A.*:f", False) or morph(dDA, prevword1(s, m.start()), ":D", False, False)
def s862s_1 (s, m):
    return m.group(1).replace("è", "ê").replace("È", "Ê")
def c868s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":V", False, True)
def c873s_1 (s, sx, m, dDA, sCountry):
    return m.group(2).endswith("e") and ( re.search("(?i)^(?:quand|comme|que)$", m.group(1)) or morphex(dDA, (m.start(1), m.group(1)), ":[NV]", ":[GA]") )
def c873s_2 (s, sx, m, dDA, sCountry):
    return m.group(2).endswith("s") and not re.search("(?i)^(?:les|[mtscd]es|quels)$", m.group(1))
def c883s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^([nv]ous|faire|en|la|lui|donnant|œuvre|h[éo]|olé|joli|Bora|couvent|dément|sapiens|très|vroum|[0-9]+)$", m.group(1)) and not (re.search("^(?:est|une?)$", m.group(1)) and look(s[:m.start()], "[’']$")) and not (m.group(1) == "mieux" and look(s[:m.start()], "(?i)qui +$"))
def c917s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^avoir$", m.group(1)) and morph(dDA, (m.start(1), m.group(1)), ">avoir ", False)
def c932s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:être|mettre) ", False)
def c963s_1 (s, sx, m, dDA, sCountry):
    return not look_chk1(dDA, s[m.end():], m.end(), r" \w[\w-]+ en ([aeo][a-zû]*)", ":V0a")
def c983s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">abolir ", False)
def c985s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">achever ", False)
def c986s_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], r" +de?\b")
def c995s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":A|>un", False)
def c1001s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">comparer ")
def c1002s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">contraindre ", False)
def c1013s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">joindre ")
def c1039s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">suffire ")
def c1040s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">talonner ")
def c1047s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:prévenir|prévoir|prédire|présager|préparer|pressentir|pronostiquer|avertir|devancer|réserver) ", False)
def c1052s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:ajourner|différer|reporter) ", False)
def c1119s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]") and m.group(2)[0].islower()
def s1119s_1 (s, m):
    return suggSimil(m.group(2), ":[NAQ]:[fe]:[si]")
def c1123s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":N.*:[fe]|:[AW]") and m.group(2)[0].islower() or m.group(2) == "va"
def c1123s_2 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]") and m.group(2)[0].islower() and hasSimil(m.group(2))
def s1123s_2 (s, m):
    return suggSimil(m.group(2), ":[NAQ]:[fe]:[si]")
def c1129s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]") and m.group(2)[0].islower()
def s1129s_1 (s, m):
    return suggSimil(m.group(2), ":[NAQ]:[me]:[si]")
def c1133s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]|:V0e.*:3[sp]|>devoir") and m.group(2)[0].islower() and hasSimil(m.group(2))
def s1133s_1 (s, m):
    return suggSimil(m.group(2), ":[NAQ]:[me]:[si]")
def c1137s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]") and m.group(2)[0].islower()
def s1137s_1 (s, m):
    return suggSimil(m.group(2), ":[NAQ]:.:[si]")
def c1141s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V.*:(?:Y|[123][sp])") and m.group(1)[0].islower() and not prevword1(s, m.start())
def s1141s_1 (s, m):
    return suggSimil(m.group(1), ":[NAQ]:[me]:[si]")
def c1145s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[pi]") and m.group(2)[0].islower() and not re.search(r"(?i)^quelques? soi(?:ent|t|s)\b", m.group(0))
def s1145s_1 (s, m):
    return suggSimil(m.group(2), ":[NAQ]:.:[pi]")
def c1149s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[pi]") and m.group(2)[0].islower()
def s1149s_1 (s, m):
    return suggSimil(m.group(2), ":[NAQ]:[me]:[pi]")
def c1153s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[pi]") and m.group(2)[0].islower()
def s1153s_1 (s, m):
    return suggSimil(m.group(2), ":[NAQ]:[fe]:[pi]")
def c1157s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[123][sp]", ":[NAQ]")
def s1157s_1 (s, m):
    return suggSimil(m.group(1), ":(?:[NAQ]:[fe]:[si])")
def c1161s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[me]", ":[YG]") and m.group(2)[0].islower()
def c1161s_2 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]", False)
def s1161s_2 (s, m):
    return suggSimil(m.group(2), ":Y")
def c1167s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Y|[123][sp])") and not look(s[:m.start()], "(?i)(?:dont|sauf|un à) +$")
def s1167s_1 (s, m):
    return suggSimil(m.group(1), ":[NAQ]:[me]:[si]")
def c1171s_1 (s, sx, m, dDA, sCountry):
    return m.group(1)[0].islower() and morph(dDA, (m.start(1), m.group(1)), ":V.*:[123][sp]")
def s1171s_1 (s, m):
    return suggSimil(m.group(1), ":[NA]")
def c1175s_1 (s, sx, m, dDA, sCountry):
    return m.group(1)[0].islower() and morphex(dDA, (m.start(1), m.group(1)), ":V.*:[123][sp]", ":[GNA]")
def s1175s_1 (s, m):
    return suggSimil(m.group(1), ":[NAQ]")
def c1184s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":P", False)
def c1185s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]")
def c1190s_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P|O[on]|X)|>(?:[lmts]|surtout|guère) ", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s1190s_1 (s, m):
    return suggSimil(m.group(2), ":V")
def c1193s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^se que?", m.group(0)) and _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P|Oo)|>[lmts] ", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s1193s_1 (s, m):
    return suggSimil(m.group(2), ":V")
def c1197s_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P|Oo)", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s1197s_1 (s, m):
    return suggSimil(m.group(2), ":V")
def c1200s_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P|O[onw]|X)", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s1200s_1 (s, m):
    return suggSimil(m.group(2), ":V")
def c1203s_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|O[onw])", False)
def s1203s_1 (s, m):
    return suggSimil(m.group(2), ":[123][sp]")
def c1206s_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P)|>(?:en|y|ils?) ", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s1206s_1 (s, m):
    return suggSimil(m.group(2), ":V")
def c1209s_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y|P)|>(?:en|y|ils?|elles?) ", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$", m.group(2))
def s1209s_1 (s, m):
    return suggSimil(m.group(2), ":V")
def c1212s_1 (s, sx, m, dDA, sCountry):
    return _oDict.isValid(m.group(2)) and not morph(dDA, (m.start(2), m.group(2)), ":[123][sp]|>(?:en|y) ", False) and not re.search("(?i)-(?:ils?|elles?|[nv]ous|je|tu|on|dire)$", m.group(2))
def s1212s_1 (s, m):
    return suggSimil(m.group(2), ":V")
def c1229s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:Y|[123][sp])", ":[GAQW]")
def c1233s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[123][sp]", ":(?:G|N|A|Q|W|M[12])")
def c1237s_1 (s, sx, m, dDA, sCountry):
    return not m.group(1)[0].isupper() and morphex(dDA, (m.start(1), m.group(1)), ":[123][sp]", ":[GNAQM]")
def c1241s_1 (s, sx, m, dDA, sCountry):
    return not m.group(1)[0].isupper() and morphex(dDA, (m.start(1), m.group(1)), ":[123][sp]", ":[GNAQM]") and not morph(dDA, prevword1(s, m.start()), ":[NA]:[me]:si", False)
def c1245s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[123][sp]", ":(?:G|N|A|Q|W|M[12]|T)")
def c1249s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y)", ":[GAQW]") and not morph(dDA, prevword1(s, m.start()), ":V[123].*:[123][sp]", False, False)
def c1255s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":[VN]", False, True)
def c1256s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c1259s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:[lmts]a|leur|une|en) +$")
def c1261s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">être ") and not look(s[:m.start()], r"(?i)\bce que? ")
def c1280s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^(?:côtés?|coups?|peu(?:-près|)|pics?|propos|valoir|plat-ventrismes?)", m.group(2))
def c1280s_2 (s, sx, m, dDA, sCountry):
    return re.search("(?i)^(?:côtés?|coups?|peu(?:-pr(?:ès|êts?|és?)|)|pics?|propos|valoir|plat-ventrismes?)", m.group(2))
def c1285s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":3s", False, False)
def c1288s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":(?:3s|R)", False, False) and not morph(dDA, nextword1(s, m.end()), ":Oo", False)
def c1293s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":Q", ":M[12P]")
def c1296s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ]", ":(?:Y|Oo)")
def c1300s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ]", ":(?:Y|Oo)")
def c1307s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\bce que?\b")
def c1309s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":(?:M[12]|D|Oo)")
def c1314s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]") and not m.group(2)[0:1].isupper() and not m.group(2).startswith("tord")
def c1317s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)[ln]’$|(?<!-)\b(?:il|elle|on|y|n’en) +$")
def c1321s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)(\bque?\\b|[ln]’$|(?<!-)\b(?:il|elle|on|y|n’en) +$)")
def c1324s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)(\bque?\b|[ln]’$|(?<!-)\b(?:il|elle|on|y|n’en) +$)")
def c1328s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":Y", False) and not look(s[:m.start()], r"(?i)\bque? |(?:il|elle|on|n’(?:en|y)) +$")
def c1365s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c1371s_1 (s, sx, m, dDA, sCountry):
    return not nextword1(s, m.end()) or look(s[m.end():], "(?i)^ +que? ")
def c1373s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":G", ">(?:tr(?:ès|op)|peu|bien|plus|moins) |:[NAQ].*:f")
def c1377s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f") and not re.search("^seule?s?", m.group(2))
def c1380s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"\b(?:[oO]h|[aA]h) +$")
def c1382s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":R")
def c1393s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ]", ":([123][sp]|Y|P|Q)|>l[ea]? ")
def c1396s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":Y")  and m.group(1) != "CE"
def c1398s_1 (s, sx, m, dDA, sCountry):
    return (m.group(0).find(",") >= 0 or morphex(dDA, (m.start(2), m.group(2)), ":G", ":[AYD]"))
def c1401s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V[123].*:(?:Y|[123][sp])") and not morph(dDA, (m.start(2), m.group(2)), ">(?:devoir|pouvoir) ") and m.group(2)[0].islower() and m.group(1) != "CE"
def c1408s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c1410s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V", ":[NAQ].*:[me]") or look(s[:m.start()], r"(?i)\b[cs]e +")
def c1413s_1 (s, sx, m, dDA, sCountry):
    return look(s[m.end():], "^ +[ldmtsc]es ") or ( morph(dDA, prevword1(s, m.start()), ":Cs", False, True) and not look(s[:m.start()], ", +$") and not look(s[m.end():], r"^ +(?:ils?|elles?)\b") and not morph(dDA, nextword1(s, m.end()), ":Q", False, False) )
def c1419s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":N.*:s", ":(?:A.*:[pi]|P)")
def c1441s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":N.*:p", ":(?:G|W|A.*:[si])")
def c1450s_1 (s, sx, m, dDA, sCountry):
    return m.group(1).endswith("en") or look(s[:m.start()], "^ *$")
def c1456s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c1459s_1 (s, sx, m, dDA, sCountry):
    return not m.group(1).startswith("B")
def c1471s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":E|>le ", False, False)
def c1481s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":(?:[123][sp]|Y)", ":(?:G|N|A|M[12P])") and not look(s[:m.start()], r"(?i)\bles *$")
def c1489s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":W", False) and not morph(dDA, prevword1(s, m.start()), ":V.*:3s", False, False)
def s1501s_1 (s, m):
    return m.group(1).replace("pal", "pâl")
def s1504s_1 (s, m):
    return m.group(1).replace("pal", "pâl")
def c1512s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[AQ]", False)
def c1522s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ">(?:arriver|venir|à|revenir|partir|aller) ")
def c1527s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":P", False)
def c1538s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ]", ":(?:G|[123][sp]|W)")
def s1538s_1 (s, m):
    return m.group(1).replace(" ", "")
def c1543s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def c1551s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start()) and morph(dDA, (m.start(2), m.group(2)), ":V", False)
def c1554s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start()) and morph(dDA, (m.start(2), m.group(2)), ":V", False) and not ( m.group(1) == "sans" and morph(dDA, (m.start(2), m.group(2)), ":[NY]", False) )
def c1575s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[AQ].*:[pi]", False)
def c1578s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c1580s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:d[eu]|avant|après|sur|malgré) +$")
def c1582s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:d[eu]|avant|après|sur|malgré) +$")
def c1587s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":f") and not look(s[:m.start()], "(?i)(?:à|pas|de|[nv]ous|eux) +$")
def c1590s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":m") and not look(s[:m.start()], "(?i)(?:à|pas|de|[nv]ous|eux) +$")
def c1594s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":N.*:[fp]", ":(?:A|W|G|M[12P]|Y|[me]:i|3s)") and morph(dDA, prevword1(s, m.start()), ":R|>de ", False, True)
def s1594s_1 (s, m):
    return suggMasSing(m.group(1))
def c1598s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[mp]") and morph(dDA, prevword1(s, m.start()), ":R|>de ", False, True)
def s1598s_1 (s, m):
    return suggFemSing(m.group(1))
def c1602s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[fs]") and morph(dDA, prevword1(s, m.start()), ":R|>de ", False, True)
def s1602s_1 (s, m):
    return suggMasPlur(m.group(1))
def c1606s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[ms]") and morph(dDA, prevword1(s, m.start()), ":R|>de ", False, True)
def s1606s_1 (s, m):
    return suggFemPlur(m.group(1))
def c1616s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]", False) and not (re.search("(?i)^(?:jamais|rien)$", m.group(3)) and look(s[:m.start()], r"\b(?:que?|plus|moins)\b"))
def c1620s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]", False) and not (re.search("(?i)^(?:jamais|rien)$", m.group(3)) and look(s[:m.start()], r"\b(?:que?|plus|moins)\b"))
def c1624s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(3), m.group(3)), ":[123][sp]", False) and not (re.search("(?i)^(?:jamais|rien)$", m.group(3)) and look(s[:m.start()], r"\b(?:que?|plus|moins)\b"))
def c1628s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(3), m.group(3)), ":[123][sp]", False) and not (re.search("(?i)^(?:jamais|rien)$", m.group(3)) and look(s[:m.start()], r"\b(?:que?|plus|moins)\b"))
def c1643s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":(?:Y|W|Oo)", False) and _oDict.isValid(m.group(1))
def s1643s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c1666s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(2), m.group(2)), ":[NAQ]", False)
def c1900s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":G")
def c1907s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def c1918s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^(?:janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)s?$", m.group(2))
def c1951s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c1952s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c1969s_1 (s, sx, m, dDA, sCountry):
    return m.group(2).isdigit() or morph(dDA, (m.start(2), m.group(2)), ":B", False)
def c1982s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">prendre ", False)
def c1986s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">rester ", False)
def c1991s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:sembler|para[îi]tre) ") and morphex(dDA, (m.start(3), m.group(3)), ":A", ":G")
def c1992s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"\b(?:une|la|cette|[mts]a|[nv]otre|de) +")
def c1995s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">tenir ", False)
def c1997s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">trier ", False)
def c1999s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">venir ", False)
def c2013s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", ":(?:G|3p)")
def c2018s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", ":(?:G|3p)")
def c2025s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":B", False)
def c2026s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":V0", False) or not morph(dDA, nextword1(s, m.end()), ":A", False)
def c2027s_1 (s, sx, m, dDA, sCountry):
    return isEndOfNG(dDA, s[m.end():], m.end())
def c2028s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":W", False)
def c2029s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":A .*:m:s", False)
def c2031s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":(?:R|C[sc])", False, True)
def c2032s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":B", False) or re.search("(?i)^(?:plusieurs|maintes)", m.group(1))
def c2033s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, nextword1(s, m.end()), ":[NAQ]", False, True)
def c2034s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":V0")
def c2036s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":D", False)
def c2037s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":D.*:[me]:[si]", False)
def c2038s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(2), m.group(2)), ":A", False)
def c2039s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:croire|devoir|estimer|imaginer|penser) ")
def c2041s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:R|D|[123]s|X)", False)
def c2042s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def c2043s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\bt(?:u|oi qui)\b")
def c2044s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def c2045s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":A", False)
def c2046s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def c2047s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":W", False)
def c2048s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[AW]", ":G")
def c2049s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[AW]", False)
def c2050s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(2), m.group(2)), ":Y", False)
def c2053s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NV]", ":D")
def c2054s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(2), m.group(2)), ":(?:3s|X)", False)
def c2055s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[me]", False)
def c2059s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":M[12]", False) and (morph(dDA, (m.start(2), m.group(2)), ":(?:M[12]|V)", False) or not _oDict.isValid(m.group(2)))
def c2060s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":M", False) and morph(dDA, (m.start(2), m.group(2)), ":M", False)
def c2061s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":M", False)
def c2062s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:M[12]|N)") and morph(dDA, (m.start(2), m.group(2)), ":(?:M[12]|N)")
def c2063s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":MP")
def c2064s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":M[12]", False)
def c2065s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":M[12]", False)
def c2068s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[MT]", False) and morph(dDA, prevword1(s, m.start()), ":Cs", False, True) and not look(s[:m.start()], r"\b(?:plus|moins|aussi) .* que +$")
def p2068s_1 (s, m):
    return rewriteSubject(m.group(1),m.group(2))
def c2073s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def c2075s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def c2077s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:V0e|N)", False) and morph(dDA, (m.start(3), m.group(3)), ":[AQ]", False)
def c2079s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0", False)
def c2081s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0", False) and morph(dDA, (m.start(3), m.group(3)), ":[QY]", False)
def c2083s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and not (m.group(2) == "crainte" and look(s[:m.start()], r"\w"))
def c2085s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morph(dDA, (m.start(3), m.group(3)), ":B", False) and morph(dDA, (m.start(4), m.group(4)), ":(?:Q|V1.*:Y)", False)
def c2089s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def c2090s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V[123]")
def c2091s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V[123]", False)
def c2092s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def c2095s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":G")
def c2098s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(2), m.group(2)), "[NAQ].*:[me]:[si]", False)
def c2100s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[me]", ":G") and morph(dDA, (m.start(3), m.group(3)), ":[AQ].*:[me]", False)
def c2102s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[fe]", ":G") and morph(dDA, (m.start(3), m.group(3)), ":[AQ].*:[fe]", False)
def c2104s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", ":[123][sp]") and morph(dDA, (m.start(3), m.group(3)), ":[AQ].*:[pi]", False)
def c2107s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[AW]")
def c2109s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[AW]", False)
def c2111s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[AQ]", False)
def c2113s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":W", ":3p")
def c2115s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[AW]", ":[123][sp]")
def c2119s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and morph(dDA, (m.start(3), m.group(3)), ":W", False) and morph(dDA, (m.start(4), m.group(4)), ":[AQ]", False)
def c2121s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, True)
def c2122s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":W\\b")
def c2125s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False)
def c2129s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:N|A|Q|V0e)", False)
def c2187s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":1s", False, False)
def c2188s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":2s", False, False)
def c2189s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":3s", False, False)
def c2190s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":1p", False, False)
def c2191s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":2p", False, False)
def c2192s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":3p", False, False)
def c2193s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]")
def c2199s_1 (s, sx, m, dDA, sCountry):
    return isAmbiguousNAV(m.group(3)) and morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False)
def c2202s_1 (s, sx, m, dDA, sCountry):
    return isAmbiguousNAV(m.group(3)) and morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and not re.search("^[dD](?:’une?|e la) ", m.group(0))
def c2205s_1 (s, sx, m, dDA, sCountry):
    return isAmbiguousNAV(m.group(3)) and ( morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":3[sp]") and not prevword1(s, m.start())) )
def c2221s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":(?:G|V0)", False)
def c2231s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ]", False)
def c2234s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ]", False)
def c2237s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", False)
def c2252s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)")
def c2255s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)") or ( morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":[me]") and morphex(dDA, (m.start(1), m.group(1)), ":R", ">(?:e[tn]|ou) ") and not (morph(dDA, (m.start(1), m.group(1)), ":Rv", False) and morph(dDA, (m.start(3), m.group(3)), ":Y", False)) )
def c2259s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":(?:e|m|P|G|W|Y)")
def c2263s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":[GWme]")
def c2266s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":(?:e|m|G|W|V0|3s)")
def c2269s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":(?:e|m|G|W|P)")
def c2272s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":[GWme]")
def c2275s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":[GWme]")
def c2278s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:s", ":[GWme]")
def c2282s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":(?:e|f|P|G|W|[1-3][sp]|Y)")
def c2285s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":(?:e|f|P|G|W|[1-3][sp]|Y)") or ( morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[fe]") and morphex(dDA, (m.start(1), m.group(1)), ":[RC]", ">(?:e[tn]|ou) ") and not (morph(dDA, (m.start(1), m.group(1)), ":(?:Rv|C)", False) and morph(dDA, (m.start(3), m.group(3)), ":Y", False)) )
def c2289s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efPGWY]")
def c2293s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efGW]")
def c2296s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":(?:e|f|G|W|V0|3s|P)") and not ( m.group(2) == "demi" and morph(dDA, nextword1(s, m.end()), ":N.*:f") )
def c2299s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":(?:e|f|G|W|V0|3s)")
def c2302s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efGWP]")
def c2305s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efGW]")
def c2308s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efGW]")
def s2308s_1 (s, m):
    return suggCeOrCet(m.group(2))
def c2312s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":[GWme]")
def s2312s_1 (s, m):
    return m.group(1).replace("on", "a")
def c2315s_1 (s, sx, m, dDA, sCountry):
    return re.search("(?i)^[aâeéèêiîoôuûyœæ]", m.group(2)) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":[eGW]")
def s2315s_1 (s, m):
    return m.group(1).replace("a", "on")
def c2315s_2 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efGW]")
def s2315s_2 (s, m):
    return m.group(1).replace("a", "on")
def c2322s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":[efGW]")
def c2328s_1 (s, sx, m, dDA, sCountry):
    return ( morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s") and not (look(s[m.end():], " +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False)) ) or m.group(1) in aREGULARPLURAL
def s2328s_1 (s, m):
    return suggPlur(m.group(1))
def c2332s_1 (s, sx, m, dDA, sCountry):
    return ( morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") or (morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[pi]|>avoir") and morphex(dDA, (m.start(1), m.group(1)), ":[RC]", ">(?:e[tn]|ou) ") and not (morph(dDA, (m.start(1), m.group(1)), ":Rv", False) and morph(dDA, (m.start(2), m.group(2)), ":Y", False))) ) and not (look(s[m.end():], " +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False))
def s2332s_1 (s, m):
    return suggPlur(m.group(2))
def c2337s_1 (s, sx, m, dDA, sCountry):
    return (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[ipYPGW]") and not (look(s[m.end():], " +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False))) or m.group(1) in aREGULARPLURAL
def s2337s_1 (s, m):
    return suggPlur(m.group(1))
def c2342s_1 (s, sx, m, dDA, sCountry):
    return (morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[ipGW]") and not (look(s[m.end():], " +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False))) or m.group(2) in aREGULARPLURAL
def s2342s_1 (s, m):
    return suggPlur(m.group(2))
def c2347s_1 (s, sx, m, dDA, sCountry):
    return (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[ipPGW]") and not (look(s[m.end():], " +(?:et|ou) ") and morph(dDA, nextword(s, m.end(), 2), ":[NAQ]", True, False))) or m.group(1) in aREGULARPLURAL
def s2347s_1 (s, m):
    return suggPlur(m.group(1))
def c2353s_1 (s, sx, m, dDA, sCountry):
    return (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[ip]|>o(?:nde|xydation|or)\\b") and morphex(dDA, prevword1(s, m.start()), ":(?:G|[123][sp])", ":[AD]", True)) or m.group(1) in aREGULARPLURAL
def s2353s_1 (s, m):
    return suggPlur(m.group(1))
def c2359s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[ip]") or m.group(1) in aREGULARPLURAL
def s2359s_1 (s, m):
    return suggPlur(m.group(1))
def c2363s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[ip]") or m.group(1) in aREGULARPLURAL
def s2363s_1 (s, m):
    return suggPlur(m.group(1))
def c2367s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[123][sp]|:[si]")
def s2367s_1 (s, m):
    return suggSing(m.group(1))
def c2371s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p")
def s2371s_1 (s, m):
    return suggSing(m.group(1))
def c2374s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") or ( morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[si]") and morphex(dDA, (m.start(1), m.group(1)), ":[RC]", ">(?:e[tn]|ou)") and not (morph(dDA, (m.start(1), m.group(1)), ":Rv", False) and morph(dDA, (m.start(2), m.group(2)), ":Y", False)) )
def s2374s_1 (s, m):
    return suggSing(m.group(2))
def c2378s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[siGW]")
def s2378s_1 (s, m):
    return suggSing(m.group(1))
def c2382s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[siGW]")
def s2382s_1 (s, m):
    return suggSing(m.group(1))
def c2386s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siGW]")
def c2390s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[siG]")
def c2394s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[siGW]") and not morph(dDA, prevword(s, m.start(), 2), ":B", False)
def s2394s_1 (s, m):
    return suggSing(m.group(1))
def c2436s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not re.search("(?i)^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$", m.group(2))) or m.group(2) in aREGULARPLURAL
def s2436s_1 (s, m):
    return suggPlur(m.group(2))
def c2442s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not morph(dDA, prevword1(s, m.start()), ":N", False) and not re.search("(?i)^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$", m.group(2))) or m.group(2) in aREGULARPLURAL
def s2442s_1 (s, m):
    return suggPlur(m.group(2))
def c2448s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s") or m.group(1) in aREGULARPLURAL) and not look(s[:m.start()], r"(?i)\b(?:le|un|ce|du) +$")
def s2448s_1 (s, m):
    return suggPlur(m.group(1))
def c2452s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p") and not re.search("(?i)^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor|Rois|Corinthiens|Thessaloniciens)$", m.group(1))
def s2452s_1 (s, m):
    return suggSing(m.group(1))
def c2456s_1 (s, sx, m, dDA, sCountry):
    return (m.group(1) != "1" and m.group(1) != "0" and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not re.search("(?i)^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$", m.group(2))) or m.group(1) in aREGULARPLURAL
def s2456s_1 (s, m):
    return suggPlur(m.group(2))
def c2464s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:p", ":(?:V0e|[NAQ].*:[me]:[si])")
def c2464s_2 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:p", ":(?:V0e|[NAQ].*:[me]:[si])")
def c2464s_3 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:[si]", ":(?:V0e|[NAQ].*:[me]:[si])")
def c2468s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:s", ":(?:V0e|[NAQ].*:[me]:[pi])")
def c2468s_2 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:s", ":(?:V0e|[NAQ].*:[me]:[pi])")
def c2468s_3 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:[pi]", ":(?:V0e|[NAQ].*:[me]:[pi])")
def c2472s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:p", ":(?:V0e|[NAQ].*:[fe]:[si])")
def c2472s_2 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:p", ":(?:V0e|[NAQ].*:[fe]:[si])")
def c2472s_3 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:[si]", ":(?:V0e|[NAQ].*:[fe]:[si])")
def c2476s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:s", ":(?:V0e|[NAQ].*:[fe]:[pi])")
def c2476s_2 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f:s", ":(?:V0e|[NAQ].*:[fe]:[pi])")
def c2476s_3 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m:[pi]", ":(?:V0e|[NAQ].*:[fe]:[pi])")
def c2488s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$")
def c2491s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$")
def s2491s_1 (s, m):
    return m.group(1)[:-1]
def c2495s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$") and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":[me]")
def c2499s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$") and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[fe]")
def c2503s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$") and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":[me]")
def c2507s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"\btel(?:le|)s? +$") and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[fe]")
def c2523s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V0e", False)
def c2526s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V0e", False) and morphex(dDA, (m.start(4), m.group(4)), ":[NAQ].*:m", ":[fe]")
def s2526s_1 (s, m):
    return m.group(1).replace("lle", "l")
def c2531s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V0e", False)
def c2534s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V0e", False) and morphex(dDA, (m.start(4), m.group(4)), ":[NAQ].*:f", ":[me]")
def s2534s_1 (s, m):
    return m.group(1).replace("l", "lle")
def c2553s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">trouver ", False) and morphex(dDA, (m.start(3), m.group(3)), ":A.*:(?:f|m:p)", ":(?:G|3[sp]|M[12P])")
def s2553s_1 (s, m):
    return suggMasSing(m.group(3))
def c2564s_1 (s, sx, m, dDA, sCountry):
    return ((morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and not apposition(m.group(1), m.group(2))
def s2564s_1 (s, m):
    return switchGender(m.group(2))
def c2564s_2 (s, sx, m, dDA, sCountry):
    return ((morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p")) or (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s"))) and not apposition(m.group(1), m.group(2))
def s2564s_2 (s, m):
    return switchPlural(m.group(2))
def c2572s_1 (s, sx, m, dDA, sCountry):
    return ((morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s2572s_1 (s, m):
    return switchGender(m.group(2))
def c2572s_2 (s, sx, m, dDA, sCountry):
    return ((morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s")) or (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p"))) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s2572s_2 (s, m):
    return switchPlural(m.group(2))
def c2584s_1 (s, sx, m, dDA, sCountry):
    return ((morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":[GYfe]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f", ":[GYme]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s2584s_1 (s, m):
    return switchGender(m.group(2))
def c2584s_2 (s, sx, m, dDA, sCountry):
    return ((morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[GYsi]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":[GYpi]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p"))) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s2584s_2 (s, m):
    return switchPlural(m.group(2))
def c2596s_1 (s, sx, m, dDA, sCountry):
    return ((morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":(?:[Gfe]|V0e|Y)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f", ":(?:[Gme]|V0e|Y)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s2596s_1 (s, m):
    return switchGender(m.group(2))
def c2596s_2 (s, sx, m, dDA, sCountry):
    return ((morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":(?:[Gsi]|V0e|Y)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", ":(?:[Gpi]|V0e|Y)") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p"))) and not apposition(m.group(1), m.group(2)) and morph(dDA, prevword1(s, m.start()), ":[VRX]", True, True)
def s2596s_2 (s, m):
    return switchPlural(m.group(2))
def c2614s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^air$", m.group(1)) and not m.group(2).startswith("seul") and ((morph(dDA, (m.start(1), m.group(1)), ":m") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morph(dDA, (m.start(1), m.group(1)), ":f") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s2614s_1 (s, m):
    return switchGender(m.group(2), False)
def c2614s_2 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^air$", m.group(1)) and not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[si]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s2614s_2 (s, m):
    return suggSing(m.group(2))
def c2623s_1 (s, sx, m, dDA, sCountry):
    return not m.group(2).startswith("seul") and ((morph(dDA, (m.start(1), m.group(1)), ":m") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morph(dDA, (m.start(1), m.group(1)), ":f") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]", False, False) and not apposition(m.group(1), m.group(2))
def s2623s_1 (s, m):
    return switchGender(m.group(2), False)
def c2623s_2 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^air$", m.group(1)) and not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[si]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not morph(dDA, prevword1(s, m.start()), ":[NAQ]", False, False) and not apposition(m.group(1), m.group(2))
def s2623s_2 (s, m):
    return suggSing(m.group(2))
def c2638s_1 (s, sx, m, dDA, sCountry):
    return m.group(1) != "fois" and not m.group(2).startswith("seul") and ((morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":[fe]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f")) or (morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f", ":[me]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m"))) and morph(dDA, prevword1(s, m.start()), ":[VRBX]", True, True) and not apposition(m.group(1), m.group(2))
def s2638s_1 (s, m):
    return switchGender(m.group(2), True)
def c2638s_2 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and morph(dDA, prevword1(s, m.start()), ":[VRBX]", True, True) and not apposition(m.group(1), m.group(2))
def s2638s_2 (s, m):
    return suggPlur(m.group(2))
def c2659s_1 (s, sx, m, dDA, sCountry):
    return m.group(1) != "fois" and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not m.group(2).startswith("seul") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|d’) *$")
def s2659s_1 (s, m):
    return suggSing(m.group(2))
def c2663s_1 (s, sx, m, dDA, sCountry):
    return m.group(1) != "fois" and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not m.group(2).startswith("seul") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQB]", False, False)
def s2663s_1 (s, m):
    return suggSing(m.group(2))
def c2673s_1 (s, sx, m, dDA, sCountry):
    return not m.group(3).startswith("seul") and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[me]", ":(?:B|G|V0|f)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f") and not apposition(m.group(2), m.group(3)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s2673s_1 (s, m):
    return suggMasPlur(m.group(3))  if re.search("(?i)^(?:certains|quels)", m.group(1)) else suggMasSing(m.group(3))
def c2679s_1 (s, sx, m, dDA, sCountry):
    return not m.group(3).startswith("seul") and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[me]", ":(?:B|G|V0|f)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f") and not apposition(m.group(2), m.group(3)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s2679s_1 (s, m):
    return suggMasPlur(m.group(3))  if re.search("(?i)^(?:certains|quels)", m.group(1)) else suggMasSing(m.group(3))
def c2687s_1 (s, sx, m, dDA, sCountry):
    return not m.group(3).startswith("seul") and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":(?:B|G|e|V0|f)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f") and not apposition(m.group(2), m.group(3)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s2687s_1 (s, m):
    return suggMasSing(m.group(3))
def c2692s_1 (s, sx, m, dDA, sCountry):
    return not m.group(3).startswith("seul") and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":(?:B|G|e|V0|f)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f") and not apposition(m.group(2), m.group(3)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s2692s_1 (s, m):
    return suggMasSing(m.group(3))
def c2699s_1 (s, sx, m, dDA, sCountry):
    return m.group(2) != "fois" and not m.group(3).startswith("seul") and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m") and not apposition(m.group(2), m.group(3)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s2699s_1 (s, m):
    return suggFemPlur(m.group(3))  if re.search("(?i)^(?:certaines|quelles)", m.group(1))  else suggFemSing(m.group(3))
def c2705s_1 (s, sx, m, dDA, sCountry):
    return m.group(2) != "fois" and not m.group(3).startswith("seul") and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m") and not apposition(m.group(2), m.group(3)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s2705s_1 (s, m):
    return suggFemPlur(m.group(3))  if re.search("(?i)^(?:certaines|quelles)", m.group(1))  else suggFemSing(m.group(3))
def c2713s_1 (s, sx, m, dDA, sCountry):
    return m.group(2) != "fois" and not m.group(3).startswith("seul") and not re.search("(?i)^quelque chose", m.group(0)) and ((morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":(?:B|e|G|V0|f)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f")) or (morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":(?:B|e|G|V0|m)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m"))) and not apposition(m.group(2), m.group(3)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s2713s_1 (s, m):
    return switchGender(m.group(3), m.group(1).endswith("s"))
def c2718s_1 (s, sx, m, dDA, sCountry):
    return m.group(2) != "fois" and not m.group(3).startswith("seul") and not re.search("(?i)^quelque chose", m.group(0)) and ((morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", ":(?:B|e|G|V0|f)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f")) or (morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", ":(?:B|e|G|V0|m)") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m"))) and not apposition(m.group(2), m.group(3)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s2718s_1 (s, m):
    return switchGender(m.group(3), m.group(1).endswith("s"))
def c2727s_1 (s, sx, m, dDA, sCountry):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s2727s_1 (s, m):
    return suggSing(m.group(2))
def c2732s_1 (s, sx, m, dDA, sCountry):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s2732s_1 (s, m):
    return suggSing(m.group(2))
def c2739s_1 (s, sx, m, dDA, sCountry):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWi]") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s2739s_1 (s, m):
    return suggSing(m.group(2))
def c2744s_1 (s, sx, m, dDA, sCountry):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWi]") and not apposition(m.group(1), m.group(2)) and not morph(dDA, prevword1(s, m.start()), ":[NAQ]|>(?:et|ou) ", False, False)
def s2744s_1 (s, m):
    return suggSing(m.group(2))
def c2751s_1 (s, sx, m, dDA, sCountry):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not apposition(m.group(1), m.group(2))
def s2751s_1 (s, m):
    return suggPlur(m.group(2))
def c2756s_1 (s, sx, m, dDA, sCountry):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not morph(dDA, (m.start(3), m.group(3)), ":A", False) and not apposition(m.group(1), m.group(2))
def s2756s_1 (s, m):
    return suggPlur(m.group(2))
def c2762s_1 (s, sx, m, dDA, sCountry):
    return not m.group(2).startswith("seul") and morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s") and not apposition(m.group(1), m.group(2)) and not look(s[:m.start()], r"(?i)\bune? de ")
def s2762s_1 (s, m):
    return suggPlur(m.group(2))
def c2795s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s")) or (morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[si]") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p"))
def s2795s_1 (s, m):
    return switchPlural(m.group(3))
def c2800s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]") and morph(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s")
def s2800s_1 (s, m):
    return suggPlur(m.group(3))
def c2804s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", False) and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:[pi]", ":G") and morph(dDA, (m.start(4), m.group(4)), ":[NAQ].*:s") and not look(s[:m.start()], r"(?i)\bune? de ")
def s2804s_1 (s, m):
    return suggPlur(m.group(4))
def c2809s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:[si]", ":G") and morph(dDA, (m.start(4), m.group(4)), ":[NAQ].*:p")
def s2809s_1 (s, m):
    return suggSing(m.group(4))
def c2816s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:(?:m|f:p)", ":(?:G|P|[fe]:[is]|V0|3[sp])") and not apposition(m.group(1), m.group(2))
def s2816s_1 (s, m):
    return suggFemSing(m.group(2))
def c2820s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") and not apposition(m.group(1), m.group(2))
def s2820s_1 (s, m):
    return suggMasSing(m.group(2))
def c2824s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:f|>[aéeiou].*:e", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:(?:f|m:p)", ":(?:G|P|m:[is]|V0|3[sp])") and not apposition(m.group(1), m.group(2))
def s2824s_1 (s, m):
    return suggMasSing(m.group(2))
def c2828s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":G|>[aéeiou].*:[ef]") and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") and not apposition(m.group(2), m.group(3))
def s2828s_1 (s, m):
    return suggMasSing(m.group(3))
def c2833s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:m", ":G|>[aéeiou].*:[ef]") and not morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f|>[aéeiou].*:e", False) and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") and not apposition(m.group(2), m.group(3))
def s2833s_1 (s, m):
    return suggMasSing(m.group(3))
def c2838s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":(?:G|P|[me]:[ip]|V0|3[sp])") and not apposition(m.group(1), m.group(2))
def s2838s_1 (s, m):
    return suggPlur(m.group(2))
def c2856s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":B.*:p", False) and m.group(2) != "cents"
def c2891s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c2892s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c2893s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c2899s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\bquatre $")
def c2902s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, nextword1(s, m.end()), ":B", False) and not look(s[:m.start()], r"(?i)\b(?:numéro|page|chapitre|référence|année|test|série)s? +$")
def c2913s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, nextword1(s, m.end()), ":B|>une?", False, True) and not look(s[:m.start()], r"(?i)\b(?:numéro|page|chapitre|référence|année|test|série)s? +$")
def c2917s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, nextword1(s, m.end()), ":B|>une?", False, False)
def c2920s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", ":G") and morphex(dDA, prevword1(s, m.start()), ":[VR]", ":B", True)
def c2925s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, nextword1(s, m.end()), ":B") or (morph(dDA, prevword1(s, m.start()), ":B") and morph(dDA, nextword1(s, m.end()), ":[NAQ]", False))
def c2936s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c2939s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False) and morph(dDA, (m.start(3), m.group(3)), ":(?:N|MP)")
def s2969s_1 (s, m):
    return m.group(1).rstrip("e")
def c2974s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:V0e|W)|>très", False)
def c2979s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:co[ûu]ter|payer) ", False)
def c2993s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">donner ", False)
def c3001s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:mettre|mise) ", False)
def c3013s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:avoir|perdre) ", False)
def c3016s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:lit|fauteuil|armoire|commode|guéridon|tabouret|chaise)s?\b")
def c3022s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":(?:V|[NAQ].*:s)", r":(?:[NA]:.:[pi]|V0e.*:[123]p)", True)
def c3056s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:aller|partir) ", False)
def c3071s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^(?:[lmtsn]|soussignée?s?|seule?s?)$", m.group(2)) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ]") and not morph(dDA, prevword1(s, m.start()), ":V0")
def s3071s_1 (s, m):
    return suggSimil(m.group(2), ":[123][sp]")
def c3077s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:être|devenir|para[îi]tre|rendre|sembler) ", False)
def s3077s_1 (s, m):
    return m.group(2).replace("oc", "o")
def c3099s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">tenir ")
def c3113s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">mettre ", False)
def c3114s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c3134s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:être|aller) ", False)
def s3136s_1 (s, m):
    return m.group(1).replace("auspice", "hospice")
def s3138s_1 (s, m):
    return m.group(1).replace("auspice", "hospice")
def c3159s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, nextword1(s, m.end()), ":[AQ]")
def s3173s_1 (s, m):
    return m.group(1).replace("cane", "canne")
def c3180s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:appuyer|battre|frapper|lever|marcher) ", False)
def s3180s_1 (s, m):
    return m.group(2).replace("cane", "canne")
def c3186s_1 (s, sx, m, dDA, sCountry):
    return not re.search("^C(?:annes|ANNES)", m.group(1))
def c3189s_1 (s, sx, m, dDA, sCountry):
    return not re.search("^C(?:annes|ANNES)", m.group(1))
def c3204s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c3211s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False)
def c3213s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":[VR]", False)
def c3220s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">tordre ", False)
def c3222s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">rendre ", False)
def c3229s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">couper ")
def c3230s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:avoir|donner) ", False)
def c3242s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V.[^:]:(?!Q)")
def c3248s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:[lmtsc]es|des?|[nv]os|leurs|quels) +$")
def c3253s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, nextword1(s, m.end()), ":[GV]", ":[NAQ]", True)
def c3256s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, nextword1(s, m.end()), ":[GV]", ":[NAQ]")
def c3259s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, nextword1(s, m.end()), ":[GV]", ":[NAQ]", True)
def c3262s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, nextword1(s, m.end()), ":G", ":[NAQ]")
def c3265s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def s3265s_1 (s, m):
    return m.group(2).replace("nd", "nt")
def c3275s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, prevword1(s, m.start()), ":V0e", False)
def c3278s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ">(?:abandonner|céder|résister) ", False)
def s3285s_1 (s, m):
    return m.group(1).replace("nt", "mp")
def c3293s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False) and morph(dDA, (m.start(3), m.group(3)), ":Y", False)
def s3293s_1 (s, m):
    return m.group(2).replace("sens", "cens")
def s3298s_1 (s, m):
    return m.group(1).replace("o", "ô")
def c3313s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False)
def c3330s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:desceller|desseller) ", False)
def s3330s_1 (s, m):
    return m.group(2).replace("descell", "décel").replace("dessell", "décel")
def c3334s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:desceller|desseller) ", False)
def s3334s_1 (s, m):
    return m.group(1).replace("descell", "décel").replace("dessell", "décel")
def c3344s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0", False)
def s3344s_1 (s, m):
    return m.group(2).replace("î", "i")
def c3347s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:[vn]ous|lui|leur|et toi) +$|[nm]’$")
def s3355s_1 (s, m):
    return m.group(1).replace("and", "ant")
def c3358s_1 (s, sx, m, dDA, sCountry):
    return not ( m.group(1) == "bonne" and look(s[:m.start()], r"(?i)\bune +$") and look(s[m.end():], "(?i)^ +pour toute") )
def c3361s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:faire|perdre) ")
def c3376s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":D")
def s3435s_1 (s, m):
    return m.group(0)[:-1].replace(" ", "-")+u"à"
def c3436s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":[NAQ]")
def c3437s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":[123][sp]")
def c3441s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":[GQ]")
def c3443s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":[GQ]")
def c3447s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":[GQ]")
def c3455s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":Y", ":[NA].*:[pe]") and not look(s[:m.start()], r"(?i)\b[ld]es +$")
def c3463s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">soulever ", False)
def s3463s_1 (s, m):
    return m.group(1)[3:]
def c3475s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:être|habiter|trouver|situer|rester|demeurer?) ", False)
def c3486s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False)
def c3490s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False)
def c3504s_1 (s, sx, m, dDA, sCountry):
    return not (m.group(1) == "Notre" and look(s[m.end():], "Père"))
def s3504s_1 (s, m):
    return m.group(1).replace("otre", "ôtre")
def c3506s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(les?|la|du|des|aux?) +") and morph(dDA, (m.start(2), m.group(2)), ":[NAQ]", False)
def s3506s_1 (s, m):
    return m.group(1).replace("ôtre", "otre").rstrip("s")
def c3514s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def c3525s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c3528s_1 (s, sx, m, dDA, sCountry):
    return ( re.search("^[nmts]e$", m.group(2)) or (not re.search("(?i)^(?:confiance|envie|peine|prise|crainte|affaire|hâte|force|recours|somme)$", m.group(2)) and morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":[AG]")) ) and not prevword1(s, m.start())
def c3533s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V.*:(?:[1-3][sp])", ":(?:G|1p)") and not ( m.group(0).find(" leur ") and morph(dDA, (m.start(2), m.group(2)), ":[NA].*:[si]", False) ) and not prevword1(s, m.start())
def c3539s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":[VR]", False, False) and not look(s[m.end():], "^ +>") and not morph(dDA, nextword1(s, m.end()), ":3s", False)
def c3547s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V.[a-z_!?]+:(?!Y)")
def c3548s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V0e", ":Y")
def c3550s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":D", False, False)
def s3556s_1 (s, m):
    return m.group(1).replace("pin", "pain")
def c3558s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:manger|dévorer|avaler|engloutir) ")
def s3558s_1 (s, m):
    return m.group(2).replace("pin", "pain")
def c3565s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">aller ", False)
def c3572s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def s3572s_1 (s, m):
    return m.group(2).replace("pal", "pâl")
def s3575s_1 (s, m):
    return m.group(2).replace("pal", "pâl")
def c3581s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">prendre ", False)
def c3582s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">tirer ", False)
def c3583s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">faire ", False)
def c3585s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">prendre ", False)
def c3593s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ]")
def c3594s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c3600s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":A") and not re.search("(?i)^seule?s?$", m.group(2))
def c3605s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:N|A|Q|G|MP)")
def c3618s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":(?:Y|M[12P])")
def c3621s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], "(?i)(?:peu|de) $") and morph(dDA, (m.start(2), m.group(2)), ":Y|>(tout|les?|la) ")
def c3633s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False)
def c3639s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":Q")
def c3647s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, nextword1(s, m.end()), ":[AQ]", False)
def c3667s_1 (s, sx, m, dDA, sCountry):
    return not nextword1(s, m.end())
def c3670s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">résonner ", False)
def s3670s_1 (s, m):
    return m.group(1).replace("réso", "raiso")
def c3680s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":M1", False)
def s3693s_1 (s, m):
    return m.group(1).replace("sale", "salle")
def c3697s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def s3697s_1 (s, m):
    return m.group(2).replace("salle", "sale")
def s3711s_1 (s, m):
    return m.group(1).replace("scep","sep")
def c3714s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">être ", False)
def s3714s_1 (s, m):
    return m.group(2).replace("sep", "scep")
def c3722s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">suivre ", False)
def c3730s_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], " soit ")
def c3731s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, nextword1(s, m.end()), ":[GY]", True, True) and not look(s[:m.start()], "(?i)quel(?:s|les?|) qu $|on $|il $") and not look(s[m.end():], " soit ")
def c3748s_1 (s, sx, m, dDA, sCountry):
    return ( morphex(dDA, (m.start(2), m.group(2)), ":N.*:[me]:s", ":[GW]") or (re.search("(?i)^[aeéiîou]", m.group(2)) and morphex(dDA, (m.start(2), m.group(2)), ":N.*:f:s", ":G")) ) and ( look(s[:m.start()], r"(?i)^ *$|\b(?:à|avec|chez|dès|contre|devant|derrière|en|par|pour|sans|sur) +$|, +$") or (morphex(dDA, prevword1(s, m.start()), ":V", ":(?:G|W|[NA].*:[pi])") and not look(s[:m.start()], r"(?i)\bce que?\b")) )
def s3768s_1 (s, m):
    return m.group(1).replace("sur", "sûr")
def s3771s_1 (s, m):
    return m.group(1).replace("sur", "sûr")
def c3777s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":M1", False)
def c3780s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":Y", False)
def s3780s_1 (s, m):
    return m.group(1).replace("sur", "sûr")
def c3789s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":N", ":[MY]|>fond ")
def s3789s_1 (s, m):
    return m.group(1).replace("â", "a")
def s3793s_1 (s, m):
    return m.group(1).replace("â", "a")
def c3802s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ">aller ", False)
def c3805s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ">faire ", False)
def s3808s_1 (s, m):
    return m.group(1).replace("taule", "tôle")
def c3818s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False) and morph(dDA, (m.start(3), m.group(3)), ":Y", False)
def c3826s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">avoir ", False)
def c3851s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[me]:s")
def c3870s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">ouvrir ", False)
def c3879s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start()) and morph(dDA, (m.start(2), m.group(2)), ":A") and not morph(dDA, nextword1(s, m.end()), ":D", False, False)
def c3908s_1 (s, sx, m, dDA, sCountry):
    return not m.group(1).isdigit() and not m.group(2).isdigit() and not morph(dDA, (m.start(0), m.group(0)), ":", False) and not morph(dDA, (m.start(2), m.group(2)), ":G", False) and _oDict.isValid(m.group(1)+m.group(2))
def c3908s_2 (s, sx, m, dDA, sCountry):
    return m.group(2) != u"là" and not re.search("(?i)^(?:ex|mi|quasi|semi|non|demi|pro|anti|multi|pseudo|proto|extra)$", m.group(1)) and not m.group(1).isdigit() and not m.group(2).isdigit() and not morph(dDA, (m.start(2), m.group(2)), ":G", False) and not morph(dDA, (m.start(0), m.group(0)), ":", False) and not _oDict.isValid(m.group(1)+m.group(2))
def c3921s_1 (s, sx, m, dDA, sCountry):
    return look(s[:m.start()], r"[\w,] +$")
def s3921s_1 (s, m):
    return m.group(0).lower()
def c3926s_1 (s, sx, m, dDA, sCountry):
    return look(s[:m.start()], r"[\w,] +$") and not( ( m.group(0)=="Juillet" and look(s[:m.start()], "(?i)monarchie +de +$") ) or ( m.group(0)=="Octobre" and look(s[:m.start()], "(?i)révolution +d’$") ) )
def s3926s_1 (s, m):
    return m.group(0).lower()
def c3945s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^fonctions? ", m.group(0)) or not look(s[:m.start()], r"(?i)\ben $")
def c3952s_1 (s, sx, m, dDA, sCountry):
    return m.group(2).istitle() and morphex(dDA, (m.start(1), m.group(1)), ":N", ":(?:A|V0e|D|R|B)")
def s3952s_1 (s, m):
    return m.group(2).lower()
def c3952s_2 (s, sx, m, dDA, sCountry):
    return m.group(2).islower() and not m.group(2).startswith("canadienne") and ( re.search("(?i)^(?:certaine?s?|cette|ce[ts]?|[dl]es|[nv]os|quelques|plusieurs|chaque|une)$", m.group(1)) or ( re.search("(?i)^un$", m.group(1)) and not look(s[m.end():], "(?:approximatif|correct|courant|parfait|facile|aisé|impeccable|incompréhensible)") ) )
def s3952s_2 (s, m):
    return m.group(2).capitalize()
def s3964s_1 (s, m):
    return m.group(1).capitalize()
def c3968s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:parler|cours|leçon|apprendre|étudier|traduire|enseigner|professeur|enseignant|dictionnaire|méthode) ", False)
def s3968s_1 (s, m):
    return m.group(2).lower()
def s3973s_1 (s, m):
    return m.group(1).lower()
def c3982s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c3994s_1 (s, sx, m, dDA, sCountry):
    return look(s[:m.start()], r"\w")
def s4004s_1 (s, m):
    return m.group(1).capitalize()
def s4006s_1 (s, m):
    return m.group(1).capitalize()
def c4011s_1 (s, sx, m, dDA, sCountry):
    return re.search("^(?:Mètre|Watt|Gramme|Seconde|Ampère|Kelvin|Mole|Cand[eé]la|Hertz|Henry|Newton|Pascal|Joule|Coulomb|Volt|Ohm|Farad|Tesla|W[eé]ber|Radian|Stéradian|Lumen|Lux|Becquerel|Gray|Sievert|Siemens|Katal)s?|(?:Exa|P[ée]ta|Téra|Giga|Méga|Kilo|Hecto|Déc[ai]|Centi|Mi(?:lli|cro)|Nano|Pico|Femto|Atto|Ze(?:pto|tta)|Yo(?:cto|etta))(?:mètre|watt|gramme|seconde|ampère|kelvin|mole|cand[eé]la|hertz|henry|newton|pascal|joule|coulomb|volt|ohm|farad|tesla|w[eé]ber|radian|stéradian|lumen|lux|becquerel|gray|sievert|siemens|katal)s?", m.group(2))
def s4011s_1 (s, m):
    return m.group(2).lower()
def c4037s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":Y", False)
def c4039s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V1") and not look(s[:m.start()], r"(?i)\b(?:quelqu(?:e chose|’une?)|(?:l(es?|a)|nous|vous|me|te|se)[ @]trait|personne|rien(?: +[a-zéèêâîûù]+|) +$)")
def s4039s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4042s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V1", ":M[12P]")
def s4042s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4044s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V1", False)
def s4044s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4046s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":[123][sp]")
def c4048s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V1", ":[NM]") and not morph(dDA, prevword1(s, m.start()), ">(?:tenir|passer) ", False)
def s4048s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4051s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V1", False)
def s4051s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4053s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V1", ":[NM]")
def s4053s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4055s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":Q", False)
def c4057s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Q|2p)", False)
def s4057s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4059s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":Q", False) and not morph(dDA, prevword1(s, m.start()), "V0.*[12]p", False)
def c4061s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:devoir|savoir|pouvoir) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":(?:Q|A|[13]s|2[sp])", ":[GYW]")
def s4061s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c4064s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:Q|A|[13]s|2[sp])", ":[GYW]")
def s4064s_1 (s, m):
    return suggVerbInfi(m.group(1))
def s4072s_1 (s, m):
    return m.group(1)[:-1]
def c4098s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def c4102s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">sembler ", False)
def c4116s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and isEndOfNG(dDA, s[m.end():], m.end())
def c4119s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V[123]_i_._") and isEndOfNG(dDA, s[m.end():], m.end())
def c4121s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":A", False) and morphex(dDA, (m.start(2), m.group(2)), ":A", ":[GM]")
def c4123s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":A", False)
def c4125s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:s", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[GV]") and isEndOfNG(dDA, s[m.end():], m.end())
def c4127s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":N", ":[GY]") and isEndOfNG(dDA, s[m.end():], m.end())
def c4130s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":V0") and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ]", ":(?:G|[123][sp]|P)")
def c4141s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and isEndOfNG(dDA, s[m.end():], m.end())
def c4145s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], "[jn]’$")
def c4153s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":G") and isEndOfNG(dDA, s[m.end():], m.end())
def c4156s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and isEndOfNG(dDA, s[m.end():], m.end())
def c4159s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and isEndOfNG(dDA, s[m.end():], m.end())
def c4163s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start())
def c4166s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":N", ":[GY]") and isEndOfNG(dDA, s[m.end():], m.end())
def c4168s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ]", False) and isEndOfNG(dDA, s[m.end():], m.end())
def c4170s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":Y") and isEndOfNG(dDA, s[m.end():], m.end())
def c4202s_1 (s, sx, m, dDA, sCountry):
    return re.search("(?i)^(?:fini|terminé)s?", m.group(2)) and morph(dDA, prevword1(s, m.start()), ":C", False, True)
def c4202s_2 (s, sx, m, dDA, sCountry):
    return re.search("(?i)^(?:assez|trop)$", m.group(2)) and (look(s[m.end():], "^ +d(?:e |’)") or not nextword1(s, m.end()))
def c4202s_3 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":A", ":[GVW]") and morph(dDA, prevword1(s, m.start()), ":C", False, True)
def c4214s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">aller", False) and not look(s[m.end():], " soit ")
def c4222s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def s4222s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4224s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def s4224s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4226s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def s4226s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4229s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:faire|vouloir) ", False) and not look(s[:m.start()], r"(?i)\b(?:en|[mtsld]es?|[nv]ous|un) +$") and morphex(dDA, (m.start(2), m.group(2)), ":V", ":M")
def s4229s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c4232s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">savoir :V", False) and morph(dDA, (m.start(2), m.group(2)), ":V", False) and not look(s[:m.start()], r"(?i)\b(?:[mts]e|[vn]ous|les?|la|un) +$")
def s4232s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c4235s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Q|2p)", False)
def s4235s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4238s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:Q|2p)", ":N")
def s4238s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c4281s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]")
def s4281s_1 (s, m):
    return suggSing(m.group(3))
def c4285s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(1), m.group(1)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(1).endswith(" été")) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWYsi]")
def s4285s_1 (s, m):
    return suggSing(m.group(2))
def c4289s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]"))
def s4289s_1 (s, m):
    return suggMasSing(m.group(3))
def c4294s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[GWYsi]") or ( morphex(dDA, (m.start(1), m.group(1)), ":[AQ].*:f", ":[GWYme]") and not morph(dDA, nextword1(s, m.end()), ":N.*:f", False, False) )
def s4294s_1 (s, m):
    return suggMasSing(m.group(1))
def c4298s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ].*:p", ":[GWYsi]") or ( morphex(dDA, (m.start(1), m.group(1)), ":[AQ].*:f", ":[GWYme]") and not morph(dDA, nextword1(s, m.end()), ":N.*:f", False, False) )
def s4298s_1 (s, m):
    return suggMasSing(m.group(1))
def c4302s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]")) and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s4302s_1 (s, m):
    return suggMasSing(m.group(3))
def c4308s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]")) and not morph(dDA, prevword1(s, m.start()), ":R|>de ", False, False)
def s4308s_1 (s, m):
    return suggFemSing(m.group(3))
def c4314s_1 (s, sx, m, dDA, sCountry):
    return (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]"))
def s4314s_1 (s, m):
    return suggFemSing(m.group(3))
def c4319s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(2)) and not look(s[:m.start()], r"(?i)\b(?:nous|ne) +$") and ((morph(dDA, (m.start(1), m.group(1)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) and morph(dDA, (m.start(1), m.group(1)), ":1p", False)) or m.group(1).endswith(" été")) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[GWYpi]")
def s4319s_1 (s, m):
    return suggPlur(m.group(2))
def c4325s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(3)) and (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWYpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]")) and not look(s[:m.start()], "ce que? +$") and (not re.search("^(?:ceux-(?:ci|là)|lesquels)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s4325s_1 (s, m):
    return suggMasPlur(m.group(3))
def c4331s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(3)) and (morph(dDA, (m.start(2), m.group(2)), ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", False) or m.group(2).endswith(" été")) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWYpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]")) and (not re.search("(?i)^(?:elles|celles-(?:ci|là)|lesquelles)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s4331s_1 (s, m):
    return suggFemPlur(m.group(3))
def c4337s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">avoir ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[123]s", ":[GNAQWY]")
def s4337s_1 (s, m):
    return suggVerbPpas(m.group(2))
def c4418s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]")
def s4418s_1 (s, m):
    return suggSing(m.group(3))
def c4422s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWYsi]")
def s4422s_1 (s, m):
    return suggSing(m.group(2))
def c4426s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]"))
def s4426s_1 (s, m):
    return suggMasSing(m.group(3))
def c4431s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[MWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]")) and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s4431s_1 (s, m):
    return suggMasSing(m.group(3))
def c4437s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]")) and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s4437s_1 (s, m):
    return suggFemSing(m.group(3))
def c4443s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[MWYsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]"))
def s4443s_1 (s, m):
    return suggFemSing(m.group(3))
def c4448s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(2)) and morph(dDA, (m.start(1), m.group(1)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and morph(dDA, (m.start(1), m.group(1)), ":1p", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[GWYpi]")
def s4448s_1 (s, m):
    return suggPlur(m.group(2))
def c4453s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(3)) and morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWYpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWYme]")) and (not re.search("^(?:ceux-(?:ci|là)|lesquels)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s4453s_1 (s, m):
    return suggMasPlur(m.group(3))
def c4459s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(3)) and morph(dDA, (m.start(2), m.group(2)), ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWYpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWYfe]")) and (not re.search("^(?:elles|celles-(?:ci|là)|lesquelles)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s4459s_1 (s, m):
    return suggFemPlur(m.group(3))
def c4490s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GMWYsi]") and not morph(dDA, (m.start(1), m.group(1)), ":G", False)
def s4490s_1 (s, m):
    return suggSing(m.group(2))
def c4494s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(2)) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[GWYpi]") and not morph(dDA, (m.start(1), m.group(1)), ":G", False)
def s4494s_1 (s, m):
    return suggPlur(m.group(2))
def c4499s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(3)) and ((morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:f", ":[GWme]") and morphex(dDA, (m.start(2), m.group(2)), ":m", ":[Gfe]")) or (morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:m", ":[GWfe]") and morphex(dDA, (m.start(2), m.group(2)), ":f", ":[Gme]"))) and not ( morph(dDA, (m.start(3), m.group(3)), ":p", False) and morph(dDA, (m.start(2), m.group(2)), ":s", False) ) and not morph(dDA, prevword1(s, m.start()), ":(?:R|P|Q|Y|[123][sp])", False, False) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s4499s_1 (s, m):
    return switchGender(m.group(3))
def c4506s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(2)) and ((morphex(dDA, (m.start(1), m.group(1)), ":M[1P].*:f", ":[GWme]") and morphex(dDA, (m.start(2), m.group(2)), ":m", ":[GWfe]")) or (morphex(dDA, (m.start(1), m.group(1)), ":M[1P].*:m", ":[GWfe]") and morphex(dDA, (m.start(2), m.group(2)), ":f", ":[GWme]"))) and not morph(dDA, prevword1(s, m.start()), ":(?:R|P|Q|Y|[123][sp])", False, False) and not look(s[:m.start()], r"\b(?:et|ou|de) +$")
def s4506s_1 (s, m):
    return switchGender(m.group(2))
def c4514s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":A.*:p", ":(?:G|E|M1|s|i)")
def s4514s_1 (s, m):
    return suggSing(m.group(1))
def c4518s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":A.*:[fp]", ":(?:G|E|M1|m:[si])")
def s4518s_1 (s, m):
    return suggMasSing(m.group(1))
def c4522s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":A.*:[mp]", ":(?:G|E|M1|f:[si])")
def s4522s_1 (s, m):
    return suggFemSing(m.group(1))
def c4526s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":A.*:[fs]", ":(?:G|E|M1|m:[pi])")
def s4526s_1 (s, m):
    return suggMasPlur(m.group(1))
def c4530s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":A.*:[ms]", ":(?:G|E|M1|f:[pi])")
def s4530s_1 (s, m):
    return suggFemPlur(m.group(1))
def c4536s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), "V0e", False)
def c4543s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]")
def s4543s_1 (s, m):
    return suggSing(m.group(1))
def c4546s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]")
def s4546s_1 (s, m):
    return suggSing(m.group(1))
def c4549s_1 (s, sx, m, dDA, sCountry):
    return (morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]") or morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|[AQ].*:f)", ":[GWme]"))
def s4549s_1 (s, m):
    return suggMasSing(m.group(1))
def c4552s_1 (s, sx, m, dDA, sCountry):
    return (morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]") or morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|[AQ].*:m)", ":[GWfe]"))
def s4552s_1 (s, m):
    return suggFemSing(m.group(1))
def c4555s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]")
def s4555s_1 (s, m):
    return suggPlur(m.group(1))
def c4558s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(1)) and (morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]") or morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|[AQ].*:f)", ":[GWme]"))
def s4558s_1 (s, m):
    return suggMasPlur(m.group(1))
def c4561s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^légion$", m.group(1)) and (morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]") or morphex(dDA, (m.start(1), m.group(1)), ":(?:[123][sp]|[AQ].*:m)", ":[GWfe]"))
def s4561s_1 (s, m):
    return suggFemPlur(m.group(1))
def c4589s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[NAQ]", ":[QWGBMpi]") and not re.search("(?i)^(?:légion|nombre|cause)$", m.group(1)) and not look(s[:m.start()], r"(?i)\bce que?\b")
def s4589s_1 (s, m):
    return suggPlur(m.group(1))
def c4589s_2 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:N|A|Q|W|G|3p)") and not look(s[:m.start()], r"(?i)\bce que?\b")
def s4589s_2 (s, m):
    return suggVerbPpas(m.group(1), ":m:p")
def c4600s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWsi]")
def s4600s_1 (s, m):
    return suggSing(m.group(2))
def c4604s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:p", ":[GWsi]")
def s4604s_1 (s, m):
    return suggSing(m.group(2))
def c4608s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":[GWme]")) and (not re.search("^(?:celui-(?:ci|là)|lequel)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s4608s_1 (s, m):
    return suggMasSing(m.group(3))
def c4614s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[GWfe]")) and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s4614s_1 (s, m):
    return suggFemSing(m.group(3))
def c4620s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:p", ":[GWsi]") or morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[GWfe]"))
def s4620s_1 (s, m):
    return suggFemSing(m.group(3))
def c4625s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[NAQ].*:s", ":[GWpi]")
def s4625s_1 (s, m):
    return suggPlur(m.group(2))
def c4629s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:f", ":[GWme]")) and (not re.search("^(?:ceux-(?:ci|là)|lesquels)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s4629s_1 (s, m):
    return suggMasPlur(m.group(3))
def c4635s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", False) and (morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:s", ":[GWpi]") or morphex(dDA, (m.start(3), m.group(3)), ":[NAQ].*:m", ":[GWfe]")) and (not re.search("^(?:elles|celles-(?:ci|là)|lesquelles)$", m.group(1)) or not morph(dDA, prevword1(s, m.start()), ":R", False, False))
def s4635s_1 (s, m):
    return suggFemPlur(m.group(3))
def c4643s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:trouver|considérer|croire) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[AQ]:(?:m:p|f)", ":(?:G|[AQ]:m:[is])")
def s4643s_1 (s, m):
    return suggMasSing(m.group(2))
def c4646s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:trouver|considérer|croire) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[AQ]:(?:f:p|m)", ":(?:G|[AQ]:f:[is])")
def s4646s_1 (s, m):
    return suggFemSing(m.group(2))
def c4649s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:trouver|considérer|croire) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":[AQ].*:s", ":(?:G|[AQ].*:[ip])")
def s4649s_1 (s, m):
    return suggPlur(m.group(2))
def c4652s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ">(?:trouver|considérer|croire) ", False) and morphex(dDA, (m.start(3), m.group(3)), ":[AQ].*:p", ":(?:G|[AQ].*:[is])")
def s4652s_1 (s, m):
    return suggSing(m.group(3))
def c4655s_1 (s, sx, m, dDA, sCountry):
    return ( morphex(dDA, (m.start(1), m.group(1)), ">(?:trouver|considérer|croire) ", ":1p") or (morph(dDA, (m.start(1), m.group(1)), ">(?:trouver|considérer|croire) .*:1p", False) and look(s[:m.start()], r"\bn(?:ous|e) +$")) ) and morphex(dDA, (m.start(2), m.group(2)), ":[AQ].*:s", ":(?:G|[AQ].*:[ip])")
def s4655s_1 (s, m):
    return suggPlur(m.group(2))
def c4677s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$", m.group(3)) and morph(dDA, (m.start(2), m.group(2)), ":V0a", False) and morphex(dDA, (m.start(3), m.group(3)), ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])")
def s4677s_1 (s, m):
    return suggMasSing(m.group(3))
def c4683s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$", m.group(4)) and morph(dDA, (m.start(3), m.group(3)), ":V0a", False) and morphex(dDA, (m.start(4), m.group(4)), ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])")
def s4683s_1 (s, m):
    return suggMasSing(m.group(4))
def c4689s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morphex(dDA, (m.start(2), m.group(2)), ":V[0-3]..t.*:Q.*:s", ":[GWpi]") and not morph(dDA, nextword1(s, m.end()), ":V", False)
def s4689s_1 (s, m):
    return suggPlur(m.group(2))
def c4694s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morphex(dDA, (m.start(2), m.group(2)), ":V[0-3]..t_.*:Q.*:s", ":[GWpi]") and not look(s[:m.start()], r"\bque?\b")
def s4694s_1 (s, m):
    return suggPlur(m.group(2))
def c4699s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morphex(dDA, (m.start(2), m.group(2)), ":V[0-3]..t.*:Q.*:p", ":[GWsi]") and not morph(dDA, nextword1(s, m.end()), ":V", False)
def s4699s_1 (s, m):
    return m.group(2)[:-1]
def c4704s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V0a", False) and morphex(dDA, (m.start(3), m.group(3)), ":V[0-3]..t_.*:Q.*:p", ":[GWsi]") and not look(s[:m.start()], r"\bque?\b") and not morph(dDA, nextword1(s, m.end()), ":V", False)
def s4704s_1 (s, m):
    return m.group(3)[:-1]
def c4709s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":Q.*:(?:f|m:p)", ":m:[si]")
def s4709s_1 (s, m):
    return suggMasSing(m.group(1))
def c4715s_1 (s, sx, m, dDA, sCountry):
    return not re.search("(?i)^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$", m.group(1)) and morphex(dDA, (m.start(1), m.group(1)), ":Q.*:(?:f|m:p)", ":m:[si]") and look(s[:m.start()], "(?i)(?:après +$|sans +$|pour +$|que? +$|quand +$|, +$|^ *$)")
def s4715s_1 (s, m):
    return suggMasSing(m.group(1))
def c4745s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(3), m.group(3)), ":V0a", False) and not (re.search("^(?:décidé|essayé|tenté)$", m.group(4)) and look(s[m.end():], " +d(?:e |’)")) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ]", False) and morphex(dDA, (m.start(4), m.group(4)), ":V[0-3]..t.*:Q.*:s", ":[GWpi]") and not morph(dDA, nextword1(s, m.end()), ":(?:Y|Oo)", False)
def s4745s_1 (s, m):
    return suggPlur(m.group(4), m.group(2))
def c4753s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(3), m.group(3)), ":V0a", False) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:m", False) and (morphex(dDA, (m.start(4), m.group(4)), ":V[0-3]..t.*:Q.*:f", ":[GWme]") or morphex(dDA, (m.start(4), m.group(4)), ":V[0-3]..t.*:Q.*:p", ":[GWsi]"))
def s4753s_1 (s, m):
    return suggMasSing(m.group(4))
def c4760s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(3), m.group(3)), ":V0a", False) and not (re.search("^(?:décidé|essayé|tenté)$", m.group(4)) and look(s[m.end():], " +d(?:e |’)")) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:f", False) and (morphex(dDA, (m.start(4), m.group(4)), ":V[0-3]..t.*:Q.*:m", ":[GWfe]") or morphex(dDA, (m.start(4), m.group(4)), ":V[0-3]..t.*:Q.*:p", ":[GWsi]")) and not morph(dDA, nextword1(s, m.end()), ":(?:Y|Oo)|>que?", False)
def s4760s_1 (s, m):
    return suggFemSing(m.group(4))
def c4780s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and (morphex(dDA, (m.start(2), m.group(2)), ":V[0-3]..t.*:Q.*:f", ":[GWme]") or morphex(dDA, (m.start(2), m.group(2)), ":V[0-3]..t.*:Q.*:p", ":[GWsi]"))
def s4780s_1 (s, m):
    return suggMasSing(m.group(2))
def c4786s_1 (s, sx, m, dDA, sCountry):
    return not re.search("^(?:A|avions)$", m.group(1)) and morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morph(dDA, (m.start(2), m.group(2)), ":V.+:(?:Y|2p)", False)
def s4786s_1 (s, m):
    return suggVerbPpas(m.group(2), ":m:s")
def c4792s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and (morph(dDA, (m.start(3), m.group(3)), ":Y") or re.search("^(?:[mtsn]e|[nv]ous|leur|lui)$", m.group(3)))
def c4796s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and (morph(dDA, (m.start(3), m.group(3)), ":Y") or re.search("^(?:[mtsn]e|[nv]ous|leur|lui)$", m.group(3)))
def c4802s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, nextword1(s, m.end()), ":[NAQ].*:m", False)
def c4804s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False)
def c4821s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morphex(dDA, (m.start(2), m.group(2)), ":(?:Y|2p|Q.*:[fp])", ":m:[si]") and m.group(2) != "prise" and not morph(dDA, prevword1(s, m.start()), ">(?:les|[nv]ous|en)|:[NAQ].*:[fp]", False) and not look(s[:m.start()], r"(?i)\bquel(?:le|)s?\b")
def s4821s_1 (s, m):
    return suggMasSing(m.group(2))
def c4827s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V0a", False) and morphex(dDA, (m.start(3), m.group(3)), ":(?:Y|2p|Q.*:p)", ":[si]")
def s4827s_1 (s, m):
    return suggMasSing(m.group(3))
def c4832s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0a", False) and morphex(dDA, (m.start(2), m.group(2)), ":V[123]..t.* :Q.*:s", ":[GWpi]")
def s4832s_1 (s, m):
    return suggPlur(m.group(2))
def c4838s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:G|Y|P|1p|3[sp])") and not look(s[m.end():], "^ +(?:je|tu|ils?|elles?|on|[vn]ous) ")
def s4838s_1 (s, m):
    return suggVerb(m.group(1), ":1p")
def c4844s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:G|Y|P|2p|3[sp])") and not look(s[m.end():], "^ +(?:je|ils?|elles?|on|[vn]ous) ")
def s4844s_1 (s, m):
    return suggVerb(m.group(1), ":2p")
def c4881s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[NAQ]", ":G")
def c4889s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V[13].*:Ip.*:2s", ":[GNA]")
def s4889s_1 (s, m):
    return m.group(1)[:-1]
def c4892s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V[13].*:Ip.*:2s", ":G")
def s4892s_1 (s, m):
    return m.group(1)[:-1]
def c4897s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[MOs]")
def c4900s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V[23].*:Ip.*:3s", ":[GNA]") and analyse(m.group(1)[:-1]+"s", ":E:2s", False) and not re.search("(?i)^doit$", m.group(1)) and not (re.search("(?i)^vient$", m.group(1)) and look(s[m.end():], " +l[ea]"))
def s4900s_1 (s, m):
    return m.group(1)[:-1]+"s"
def c4904s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V[23].*:Ip.*:3s", ":G") and analyse(m.group(1)[:-1]+"s", ":E:2s", False)
def s4904s_1 (s, m):
    return m.group(1)[:-1]+"s"
def c4909s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V3.*:Ip.*:3s", ":[GNA]")
def c4912s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V3.*:Ip.*:3s", ":G")
def c4922s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":A", ":G") and not look(s[m.end():], r"\bsoit\b")
def c4933s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":E|>chez", False) and _oDict.isValid(m.group(1))
def s4933s_1 (s, m):
    return suggVerbImpe(m.group(1))
def c4938s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":E|>chez", False) and _oDict.isValid(m.group(1))
def s4938s_1 (s, m):
    return suggVerbTense(m.group(1), ":E", ":2s")
def c4963s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":E", ":[GM]")
def c4968s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":E", ":[GM]") and morphex(dDA, nextword1(s, m.end()), ":", ":(?:Y|3[sp])", True) and morph(dDA, prevword1(s, m.start()), ":Cc", False, True) and not look(s[:m.start()], "~ +$")
def c4973s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":E", ":[GM]") and morphex(dDA, nextword1(s, m.end()), ":", ":(?:N|A|Q|Y|B|3[sp])", True) and morph(dDA, prevword1(s, m.start()), ":Cc", False, True) and not look(s[:m.start()], "~ +$")
def c4978s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":E", ":[GM]") and morphex(dDA, nextword1(s, m.end()), ":", ":(?:N|A|Q|Y|MP)", True) and morph(dDA, prevword1(s, m.start()), ":Cc", False, True) and not look(s[:m.start()], "~ +$")
def c4991s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":E", ":(?:G|M[12])") and morphex(dDA, nextword1(s, m.end()), ":", ":(?:Y|[123][sp])", True)
def s4991s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c4996s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":E", False)
def s4996s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c5001s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":E", False) and morphex(dDA, nextword1(s, m.end()), ":[RC]", ":[NAQ]", True)
def s5001s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c5006s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":E", False) and morphex(dDA, nextword1(s, m.end()), ":[RC]", ":Y", True)
def s5006s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c5012s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, nextword1(s, m.end()), ":Y", False, False)
def s5012s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c5014s_1 (s, sx, m, dDA, sCountry):
    return not prevword1(s, m.start()) and not morph(dDA, nextword1(s, m.end()), ":Y", False, False)
def s5016s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c5042s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":R", False, True)
def c5043s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def c5045s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def c5047s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]")
def c5048s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":[123]s", False, False)
def c5049s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":(?:[123]s|R)", False, False)
def c5050s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":(?:[123]p|R)", False, False)
def c5051s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, prevword1(s, m.start()), ":3p", False, False)
def c5052s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[123][sp]", False)
def c5053s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":(?:[NAQ].*:m:[si]|G|M)")
def c5054s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":(?:[NAQ].*:f:[si]|G|M)")
def c5055s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":(?:[NAQ].*:[si]|G|M)")
def c5056s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":(?:[NAQ].*:[si]|G|M)")
def c5058s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":(?:A|G|M|1p)")
def c5059s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":(?:A|G|M|2p)")
def c5061s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V", False)
def c5062s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":V", False)
def c5063s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(2), m.group(2)), ":2s", False) or look(s[:m.start()], r"(?i)\b(?:je|tu|on|ils?|elles?|nous) +$")
def c5064s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(2), m.group(2)), ":2s|>(ils?|elles?|on) ", False) or look(s[:m.start()], r"(?i)\b(?:je|tu|on|ils?|elles?|nous) +$")
def c5078s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V", False)
def c5081s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":Y")
def c5095s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:ce que?|tout) ")
def c5107s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":M") and not (m.group(1).endswith("ez") and look(s[m.end():], " +vous"))
def s5107s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c5110s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:Q|2p)", ":M")
def s5110s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c5113s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:aimer|aller|désirer|devoir|espérer|pouvoir|préférer|souhaiter|venir) ", False) and not morph(dDA, (m.start(1), m.group(1)), ":[GN]", False) and morphex(dDA, (m.start(2), m.group(2)), ":V", ":M")
def s5113s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c5117s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">devoir ", False) and morphex(dDA, (m.start(2), m.group(2)), ":V", ":M") and not morph(dDA, prevword1(s, m.start()), ":D", False)
def s5117s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c5120s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:cesser|décider|défendre|suggérer|commander|essayer|tenter|choisir|permettre|interdire) ", False) and morphex(dDA, (m.start(2), m.group(2)), ":(?:Q|2p)", ":M")
def s5120s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c5123s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:Q|2p)", ":M")
def s5123s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c5126s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">valoir ", False) and morphex(dDA, (m.start(2), m.group(2)), ":(?:Q|2p)", ":[GM]")
def s5126s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c5129s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V1", ":[NM]") and not look(s[:m.start()], "> +$")
def s5129s_1 (s, m):
    return suggVerbInfi(m.group(1))
def c5132s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V1", ":N")
def s5132s_1 (s, m):
    return suggVerbInfi(m.group(2))
def c5145s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":V0e", False) and (morphex(dDA, (m.start(2), m.group(2)), ":Y", ":[NAQ]") or m.group(2) in aSHOULDBEVERB) and not re.search("(?i)^(?:soit|été)$", m.group(1)) and not morph(dDA, prevword1(s, m.start()), ":Y|>ce", False, False) and not look(s[:m.start()], "(?i)ce (?:>|qu|que >) $") and not look_chk1(dDA, s[:m.start()], 0, r"(\w[\w-]+) +> $", ":Y") and not look_chk1(dDA, s[:m.start()], 0, r"^ *>? *(\w[\w-]+)", ":Y")
def s5145s_1 (s, m):
    return suggVerbPpas(m.group(2))
def c5156s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":1s|>(?:en|y)", False)
def s5156s_1 (s, m):
    return suggVerb(m.group(1), ":1s")
def c5159s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:1s|G)") and not (morph(dDA, (m.start(2), m.group(2)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:1s", False, False))
def s5159s_1 (s, m):
    return suggVerb(m.group(2), ":1s")
def c5162s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:1s|G|1p)")
def s5162s_1 (s, m):
    return suggVerb(m.group(2), ":1s")
def c5165s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:1s|G|1p)")
def s5165s_1 (s, m):
    return suggVerb(m.group(2), ":1s")
def c5168s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:1s|G|1p|3p!)")
def s5168s_1 (s, m):
    return suggVerb(m.group(2), ":1s")
def c5188s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:G|[ISK].*:2s)") and not (morph(dDA, (m.start(2), m.group(2)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:2s", False, False))
def s5188s_1 (s, m):
    return suggVerb(m.group(2), ":2s")
def c5191s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:G|[ISK].*:2s)")
def s5191s_1 (s, m):
    return suggVerb(m.group(2), ":2s")
def c5194s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:G|2p|3p!|[ISK].*:2s)")
def s5194s_1 (s, m):
    return suggVerb(m.group(2), ":2s")
def c5205s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G)") and not (morph(dDA, (m.start(2), m.group(2)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:3s", False, False))
def s5205s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c5208s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G)")
def s5208s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c5223s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:N|A|3s|P|Q|G|V0e.*:3p)")
def s5223s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c5227s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|Q|G)")
def s5227s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c5235s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|Q|G|3p!)") and not morph(dDA, prevword1(s, m.start()), ":[VR]|>de", False, False) and not(m.group(1).endswith("out") and morph(dDA, (m.start(2), m.group(2)), ":Y", False))
def s5235s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c5252s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:3s|P|G|3p!)") and not morph(dDA, prevword1(s, m.start()), ":R|>(?:et|ou)", False, False) and not (morph(dDA, (m.start(1), m.group(1)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:3s", False, False))
def s5252s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c5256s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:3s|P|G|3p!)") and not morph(dDA, prevword1(s, m.start()), ":R|>(?:et|ou)", False, False)
def s5256s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c5273s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":3p", ":(?:G|3s)")
def c5276s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":3s", ":(?:G|3p)")
def c5279s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":3p", ":(?:G|3s)") and (not prevword1(s, m.start()) or look(s[:m.start()], r"(?i)\b(?:parce que?|quoi ?que?|pour ?quoi|puisque?|quand|com(?:ment|bien)|car|tandis que?) +$"))
def c5283s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":3s", ":(?:G|3p)") and (not prevword1(s, m.start()) or look(s[:m.start()], r"(?i)\b(?:parce que?|quoi ?que?|pour ?quoi|puisque?|quand|com(?:ment|bien)|car|tandis que?) +$"))
def s5291s_1 (s, m):
    return m.group(1)[:-1]+"t"
def c5294s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G)") and morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P|Q|[123][sp]|R)", True) and not( m.group(1).endswith("ien") and look(s[:m.start()], "> +$") and morph(dDA, (m.start(2), m.group(2)), ":Y", False) )
def s5294s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c5312s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G|Q)") and morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P|Q|[123][sp]|R)", True)
def s5312s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c5316s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3s|P|G)") and morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P|Q|[123][sp]|R)", True)
def s5316s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c5324s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":Y", False) and morph(dDA, (m.start(2), m.group(2)), ":V.[a-z_!?]+(?!.*:(?:3s|P|Q|Y|3p!))")
def s5324s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c5332s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P)", True) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(3), m.group(3)), ":V", ":(?:3s|P|Q|Y|3p!|G)") and not (look(s[:m.start()], r"(?i)\b(?:et|ou) +$") and morph(dDA, (m.start(3), m.group(3)), ":[1-3]p", False)) and not look(s[:m.start()], r"(?i)\bni .* ni\b")
def s5332s_1 (s, m):
    return suggVerb(m.group(3), ":3s")
def c5336s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P)", True) and morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[si]", False) and morphex(dDA, (m.start(3), m.group(3)), ":V", ":(?:3s|1p|P|Q|Y|3p!|G)") and not (look(s[:m.start()], r"(?i)\b(?:et|ou) +$") and morph(dDA, (m.start(3), m.group(3)), ":[123]p", False)) and not look(s[:m.start()], r"(?i)\bni .* ni\b")
def s5336s_1 (s, m):
    return suggVerb(m.group(3), ":3s")
def c5358s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P)", True) and isAmbiguousAndWrong(m.group(2), m.group(3), ":s", ":3s") and not (look(s[:m.start()], r"(?i)\b(?:et|ou) +$") and morph(dDA, (m.start(3), m.group(3)), ":(?:[123]p|p)", False)) and not look(s[:m.start()], r"(?i)\bni .* ni\b")
def s5358s_1 (s, m):
    return suggVerb(m.group(3), ":3s", suggSing)
def c5363s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":(?:Y|P)", True) and isVeryAmbiguousAndWrong(m.group(2), m.group(3), ":s", ":3s", not prevword1(s, m.start())) and not (look(s[:m.start()], r"(?i)\b(?:et|ou) +$") and morph(dDA, (m.start(3), m.group(3)), ":(?:[123]p|p)", False)) and not look(s[:m.start()], r"(?i)\bni .* ni\b")
def s5363s_1 (s, m):
    return suggVerb(m.group(3), ":3s", suggSing)
def c5369s_1 (s, sx, m, dDA, sCountry):
    return ( morph(dDA, (m.start(0), m.group(0)), ":1s") or ( look(s[:m.start()], "> +$") and morph(dDA, (m.start(0), m.group(0)), ":1s", False) ) ) and not (m.group(0)[0:1].isupper() and look(sx[:m.start()], r"\w")) and not look(sx[:m.start()], r"(?i)\b(?:j(?:e |[’'])|moi(?:,? qui| seul) )")
def s5369s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c5373s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(0), m.group(0)), ":2s", ":(?:E|G|W|M|J|[13][sp]|2p)") and not m.group(0)[0:1].isupper() and not look(s[:m.start()], "^ *$") and ( not morph(dDA, (m.start(0), m.group(0)), ":[NAQ]", False) or look(s[:m.start()], "> +$") ) and not look(sx[:m.start()], r"(?i)\bt(?:u |[’']|oi,? qui |oi seul )")
def s5373s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c5378s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(0), m.group(0)), ":2s", ":(?:G|W|M|J|[13][sp]|2p)") and not (m.group(0)[0:1].isupper() and look(sx[:m.start()], r"\w")) and ( not morph(dDA, (m.start(0), m.group(0)), ":[NAQ]", False) or look(s[:m.start()], "> +$") ) and not look(sx[:m.start()], r"(?i)\bt(?:u |[’']|oi,? qui |oi seul )")
def s5378s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c5383s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(0), m.group(0)), ":[12]s", ":(?:E|G|W|M|J|3[sp]|2p|1p)") and not (m.group(0)[0:1].isupper() and look(sx[:m.start()], r"\w")) and ( not morph(dDA, (m.start(0), m.group(0)), ":[NAQ]", False) or look(s[:m.start()], "> +$") or ( re.search("(?i)^étais$", m.group(0)) and not morph(dDA, prevword1(s, m.start()), ":[DA].*:p", False, True) ) ) and not look(sx[:m.start()], r"(?i)\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))")
def s5383s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c5388s_1 (s, sx, m, dDA, sCountry):
    return not (m.group(0)[0:1].isupper() and look(sx[:m.start()], r"\w")) and not look(sx[:m.start()], r"(?i)\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))")
def s5388s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c5391s_1 (s, sx, m, dDA, sCountry):
    return not (m.group(0)[0:1].isupper() and look(sx[:m.start()], r"\w")) and not look(sx[:m.start()], r"(?i)\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))")
def s5391s_1 (s, m):
    return suggVerb(m.group(0), ":3s")
def c5399s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:1p|3[sp])") and not look(s[m.end():], "^ +(?:je|tu|ils?|elles?|on|[vn]ous)")
def s5399s_1 (s, m):
    return suggVerb(m.group(1), ":1p")
def c5402s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":1p") and not look(s[m.end():], "^ +(?:je|tu|ils?|elles?|on|[vn]ous)")
def s5402s_1 (s, m):
    return suggVerb(m.group(1), ":1p")
def c5405s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":1p") and not look(s[m.end():], "^ +(?:ils|elles)")
def s5405s_1 (s, m):
    return suggVerb(m.group(1), ":1p")
def c5414s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:2p|3[sp])") and not look(s[m.end():], "^ +(?:je|ils?|elles?|on|[vn]ous)")
def s5414s_1 (s, m):
    return suggVerb(m.group(1), ":2p")
def c5417s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":2p") and not look(s[m.end():], "^ +(?:je|ils?|elles?|on|[vn]ous)")
def s5417s_1 (s, m):
    return suggVerb(m.group(1), ":2p")
def c5426s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(0), m.group(0)), ":V.*:1p", ":[EGMNAJ]") and not (m.group(0)[0:1].isupper() and look(s[:m.start()], r"\w")) and not look(s[:m.start()], r"\b(?:[nN]ous(?:-mêmes?|)|[eE]t moi),? ")
def s5426s_1 (s, m):
    return suggVerb(m.group(0), ":3p")
def c5430s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(0), m.group(0)), ":V.*:2p", ":[EGMNAJ]") and not (m.group(0)[0:1].isupper() and look(s[:m.start()], r"\w")) and not look(s[:m.start()], r"\b(?:[vV]ous(?:-mêmes?|)|[eE]t toi|[tT]oi et),? ")
def c5439s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|G)") and not (morph(dDA, (m.start(2), m.group(2)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:3p", False, False))
def s5439s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c5442s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|G)")
def s5442s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c5446s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|G)")
def s5446s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c5450s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|G)") and not morph(dDA, prevword1(s, m.start()), ":[VR]", False, False)
def s5450s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c5454s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:3p|P|Q|G)") and not morph(dDA, prevword1(s, m.start()), ":R", False, False) and not (morph(dDA, (m.start(1), m.group(1)), ":[PQ]", False) and morph(dDA, prevword1(s, m.start()), ":V0.*:3p", False, False))
def s5454s_1 (s, m):
    return suggVerb(m.group(1), ":3p")
def c5457s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V", ":(?:3p|P|Q|G)") and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s5457s_1 (s, m):
    return suggVerb(m.group(1), ":3p")
def c5472s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], r"(?i)\b(?:à|avec|sur|chez|par|dans|parmi|contre|ni|de|pour|sous) +$")
def c5479s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|mg)") and not morph(dDA, prevword1(s, m.start()), ":[VR]|>de ", False, False)
def s5479s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c5483s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:3p|P|Q|G)") and not morph(dDA, prevword1(s, m.start()), ":[VR]", False, False)
def s5483s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c5493s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:G|N|A|3p|P|Q)") and not morph(dDA, prevword1(s, m.start()), ":[VR]", False, False)
def s5493s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c5500s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", False) and morphex(dDA, (m.start(3), m.group(3)), ":V", ":(?:[13]p|P|Q|Y|G)") and morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True)
def s5500s_1 (s, m):
    return suggVerb(m.group(3), ":3p")
def c5503s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(2), m.group(2)), ":[NAQ].*:[pi]", False) and morphex(dDA, (m.start(3), m.group(3)), ":V", ":(?:[13]p|P|Y|G)") and morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True)
def s5503s_1 (s, m):
    return suggVerb(m.group(3), ":3p")
def c5520s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", False) and morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:[13]p|P|G|Q.*:p)") and morph(dDA, nextword1(s, m.end()), ":(?:R|D.*:p)|>au ", False, True)
def s5520s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c5523s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":[NAQ].*:[pi]", False) and morphex(dDA, (m.start(2), m.group(2)), ":V", ":(?:[13]p|P|G)")
def s5523s_1 (s, m):
    return suggVerb(m.group(2), ":3p")
def c5529s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True) and isAmbiguousAndWrong(m.group(2), m.group(3), ":p", ":3p")
def s5529s_1 (s, m):
    return suggVerb(m.group(3), ":3p", suggPlur)
def c5533s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True) and isVeryAmbiguousAndWrong(m.group(1), m.group(2), ":p", ":3p", not prevword1(s, m.start()))
def s5533s_1 (s, m):
    return suggVerb(m.group(2), ":3p", suggPlur)
def c5537s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True) and isVeryAmbiguousAndWrong(m.group(1), m.group(2), ":m:p", ":3p", not prevword1(s, m.start()))
def s5537s_1 (s, m):
    return suggVerb(m.group(2), ":3p", suggMasPlur)
def c5541s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, prevword1(s, m.start()), ":C", ":[YP]", True) and isVeryAmbiguousAndWrong(m.group(1), m.group(2), ":f:p", ":3p", not prevword1(s, m.start()))
def s5541s_1 (s, m):
    return suggVerb(m.group(2), ":3p", suggFemPlur)
def c5574s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V0e", ":3s")
def s5574s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c5578s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V0e.*:3s", ":3p")
def s5578s_1 (s, m):
    return m.group(1)[:-1]
def c5584s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V0e", ":3p")
def s5584s_1 (s, m):
    return suggVerb(m.group(1), ":3p")
def c5588s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":V0e.*:3p", ":3s")
def c5599s_1 (s, sx, m, dDA, sCountry):
    return not look(s[:m.start()], "(?:et|ou|[dD][eu]|ni) +$") and morph(dDA, (m.start(1), m.group(1)), ":M", False) and morphex(dDA, (m.start(2), m.group(2)), ":[123][sp]", ":(?:G|3s|3p!|P|M|[AQ].*:[si])") and not morph(dDA, prevword1(s, m.start()), ":[VRD]", False, False) and not look(s[:m.start()], r"([A-ZÉÈ][\w-]+), +([A-ZÉÈ][\w-]+), +$")
def s5599s_1 (s, m):
    return suggVerb(m.group(2), ":3s")
def c5606s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":M", False) and morph(dDA, (m.start(2), m.group(2)), ":M", False) and morphex(dDA, (m.start(3), m.group(3)), ":[123][sp]", ":(?:G|3p|P|Q.*:[pi])") and not morph(dDA, prevword1(s, m.start()), ":R", False, False)
def s5606s_1 (s, m):
    return suggVerb(m.group(3), ":3p")
def c5623s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":(?:[12]s|3p)", ":(?:3s|G|W|3p!)") and not look(s[m.end():], "^ +et (?:l(?:es? |a |’|eurs? )|[mts](?:a|on|es) |ce(?:tte|ts|) |[nv]o(?:s|tre) |du )")
def s5623s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c5628s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[123]s", ":(?:3p|G|W)")
def s5628s_1 (s, m):
    return suggVerb(m.group(1), ":3p")
def c5633s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[12][sp]", ":(?:G|W|3[sp]|Y|P|Q)")
def c5638s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[12][sp]", ":(?:G|W|3[sp])")
def c5652s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V.*:1s", ":[GNW]") and not look(s[:m.start()], r"(?i)\bje +>? *$")
def s5652s_1 (s, m):
    return m.group(1)[:-1]+"é-je"
def c5655s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":V.*:1s", ":[GNW]") and not look(s[:m.start()], r"(?i)\b(?:je|tu) +>? *$")
def c5658s_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], "^ +(?:en|y|ne|>)") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:2s", ":[GNW]") and not look(s[:m.start()], r"(?i)\b(?:je|tu) +>? *$")
def c5661s_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], "^ +(?:en|y|ne|>)") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:3s", ":[GNW]") and not look(s[:m.start()], r"(?i)\b(?:ce|il|elle|on) +>? *$")
def s5661s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c5664s_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], "^ +(?:en|y|ne|aussi|>)") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:3s", ":[GNW]") and not look(s[:m.start()], r"(?i)\b(?:ce|il|elle|on) +>? *$")
def c5667s_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], "^ +(?:en|y|ne|aussi|>)") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:1p", ":[GNW]") and not morph(dDA, prevword1(s, m.start()), ":Os", False, False) and not morph(dDA, nextword1(s, m.end()), ":Y", False, False)
def c5671s_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], "^ +(?:en|y|ne|aussi|>)") and not m.group(1).endswith("euillez") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:2pl", ":[GNW]") and not morph(dDA, prevword1(s, m.start()), ":Os", False, False) and not morph(dDA, nextword1(s, m.end()), ":Y", False, False)
def c5675s_1 (s, sx, m, dDA, sCountry):
    return not look(s[m.end():], "^ +(?:en|y|ne|aussi|>)") and morphex(dDA, (m.start(1), m.group(1)), ":V.*:3p", ":[GNW]") and not look(s[:m.start()], r"(?i)\b(?:ce|ils|elles) +>? *$")
def s5675s_1 (s, m):
    return m.group(0).replace(" ", "-")
def c5680s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":1[sśŝ]", False) and _oDict.isValid(m.group(1)) and not re.search("(?i)^vite$", m.group(1))
def s5680s_1 (s, m):
    return suggVerb(m.group(1), ":1ś")
def c5683s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":[ISK].*:2s", False) and _oDict.isValid(m.group(1)) and not re.search("(?i)^vite$", m.group(1))
def s5683s_1 (s, m):
    return suggVerb(m.group(1), ":2s")
def c5686s_1 (s, sx, m, dDA, sCountry):
    return m.group(1) != "t" and not morph(dDA, (m.start(1), m.group(1)), ":3s", False) and (not m.group(1).endswith("oilà") or m.group(2) != "il") and _oDict.isValid(m.group(1)) and not re.search("(?i)^vite$", m.group(1))
def s5686s_1 (s, m):
    return suggVerb(m.group(1), ":3s")
def c5689s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":3p", ":3s") and _oDict.isValid(m.group(1))
def c5692s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":(?:1p|E:2[sp])", False) and _oDict.isValid(m.group(1)) and not re.search("(?i)^(?:vite|chez)$", m.group(1))
def s5692s_1 (s, m):
    return suggVerb(m.group(1), ":1p")
def c5695s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":2p", False) and _oDict.isValid(m.group(1)) and not re.search("(?i)^(?:tes|vite)$", m.group(1)) and not _oDict.isValid(m.group(0))
def s5695s_1 (s, m):
    return suggVerb(m.group(1), ":2p")
def c5698s_1 (s, sx, m, dDA, sCountry):
    return m.group(1) != "t" and not morph(dDA, (m.start(1), m.group(1)), ":3p", False) and _oDict.isValid(m.group(1))
def s5698s_1 (s, m):
    return suggVerb(m.group(1), ":3p")
def c5702s_1 (s, sx, m, dDA, sCountry):
    return not morph(dDA, (m.start(1), m.group(1)), ":V", False) and not re.search("(?i)^vite$", m.group(1)) and _oDict.isValid(m.group(1)) and not ( m.group(0).endswith("il") and m.group(1).endswith("oilà") ) and not ( m.group(1) == "t" and m.group(0).endswith(("il", "elle", "on", "ils", "elles")) )
def c5722s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Os|M)", False) and morphex(dDA, (m.start(2), m.group(2)), ":[SK]", ":(?:G|V0|I)") and not prevword1(s, m.start())
def c5725s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":[SK]", ":(?:G|V0|I)") and not prevword1(s, m.start())
def c5729s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Os|M)", False) and morphex(dDA, (m.start(2), m.group(2)), ":S", ":[IG]")
def s5729s_1 (s, m):
    return suggVerbMode(m.group(2), ":I", m.group(1))
def c5729s_2 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Os|M)", False) and morph(dDA, (m.start(2), m.group(2)), ":K", False)
def s5729s_2 (s, m):
    return suggVerbMode(m.group(2), ":If", m.group(1))
def c5736s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ">(?:afin|pour|quoi|permettre|falloir|vouloir|ordonner|exiger|désirer|douter|suffire) ", False) and morph(dDA, (m.start(2), m.group(2)), ":(?:Os|M)", False) and not morph(dDA, (m.start(3), m.group(3)), ":[GYS]", False)
def s5736s_1 (s, m):
    return suggVerbMode(m.group(3), ":S", m.group(2))
def c5744s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Os|M)", False) and not morph(dDA, (m.start(2), m.group(2)), ":[GYS]", False)
def s5744s_1 (s, m):
    return suggVerbMode(m.group(2), ":S", m.group(1))
def c5749s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(2), m.group(2)), ":S", ":[GIK]") and not re.search("^e(?:usse|û[mt]es|ût)", m.group(2))
def s5749s_1 (s, m):
    return suggVerbMode(m.group(2), ":I", m.group(1))
def c5752s_1 (s, sx, m, dDA, sCountry):
    return morphex(dDA, (m.start(1), m.group(1)), ":S", ":[GIK]") and m.group(1) != "eusse"
def s5752s_1 (s, m):
    return suggVerbMode(m.group(1), ":I", "je")
def c5757s_1 (s, sx, m, dDA, sCountry):
    return morph(dDA, (m.start(1), m.group(1)), ":(?:Os|M)", False) and morph(dDA, (m.start(2), m.group(2)), ":V.*:S")
def s5757s_1 (s, m):
    return suggVerbMode(m.group(2), ":I", m.group(1))
