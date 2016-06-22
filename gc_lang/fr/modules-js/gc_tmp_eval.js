// generated code, do not edit
var oEvalFunc = {
    p73p_1: function (s, m) {
        return m[1].replace(/\./g, "")+".";
    },
    c75p_1: function (s, sx, m, dDA, sCountry) {
        return m[0] != "i.e." && m[0] != "s.t.p.";
    },
    s75p_1: function (s, m) {
        return m[0].replace(/\./g, "").toUpperCase();
    },
    p75p_2: function (s, m) {
        return m[0].replace(/\./g, "");
    },
    c79p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^etc/i) >= 0);
    },
    c84p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false) && look(s.slice(m.end[0]), /^\W+[a-zéèêîïâ]/);
    },
    c118p_1: function (s, sx, m, dDA, sCountry) {
        return option("typo") && ! m[0].endsWith("·e·s");
    },
    c118p_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    d118p_2: function (s, m, dDA) {
        return define(dDA, m.start[0], ":N:A:Q:e:i");
    },
    c130p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^(?:etc|[A-Z]|chap|cf|fig|hab|litt|circ|coll|r[eé]f|étym|suppl|bibl|bibliogr|cit|op|vol|déc|nov|oct|janv|juil|avr|sept)$/i) >= 0) && morph(dDA, [m.start[1], m[1]], ":", false) && morph(dDA, [m.start[2], m[2]], ":", false);
    },
    s130p_1: function (s, m) {
        return m[2]._toCapitalize();
    },
    c141p_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":[DR]", false);
    },
    c147p_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":M", ":G") && ! morph(dDA, [m.start[2], m[2]], ":N", false) && ! look(s.slice(0,m.index), /quel(?:le|)s? +/i);
    },
    c172p_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1]._isDigit();
    },
    c174p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]);
    },
    s195p_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    s196p_1: function (s, m) {
        return m[1].slice(1,3) == "os"  ? "nᵒˢ"  : "nᵒ";
    },
    c204p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /etc$/i);
    },
    s205p_1: function (s, m) {
        return m[0].replace(/\.\.\./g, "…")._trimRight(".");
    },
    c221p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^(?:etc|[A-Z]|fig|hab|litt|circ|coll|ref|étym|suppl|bibl|bibliogr|cit|vol|déc|nov|oct|janv|juil|avr|sept)$/) >= 0);
    },
    s254p_1: function (s, m) {
        return m[0][0] + "|" + m[0][1];
    },
    s255p_1: function (s, m) {
        return m[0][0] + "|" + m[0][1];
    },
    s256p_1: function (s, m) {
        return m[0][0] + "|" + m[0][1];
    },
    c262p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^milli(?:on|er|ard)s?$/) >= 0) && ! morph(dDA, [m.start[3], m[3]], ":[CR]", false);
    },
    c268p_1: function (s, sx, m, dDA, sCountry) {
        return (! (m[2].search(/^[0-9][0-9]{1,3}$/) >= 0) && ! _oDict.isValid(m[3])) || morphex(dDA, [m.start[3], m[3]], ";S", ":V") || mbUnit(m[3]);
    },
    c290p_1: function (s, sx, m, dDA, sCountry) {
        return sCountry != "CA";
    },
    s290p_1: function (s, m) {
        return " "+m[0];
    },
    s328p_1: function (s, m) {
        return undoLigature(m[0]);
    },
    c374p_1: function (s, sx, m, dDA, sCountry) {
        return ! option("mapos") && morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    s374p_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c377p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    s377p_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c381p_1: function (s, sx, m, dDA, sCountry) {
        return option("mapos") && ! look(s.slice(0,m.index), /(?:lettre|caractère|glyphe|dimension|variable|fonction|point) *$/i);
    },
    s381p_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c395p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:onz[ei]|énième|iourte|ouistiti|ouate|one-?step|Ouagadougou|I(?:I|V|X|er|ᵉʳ|ʳᵉ|è?re))/i) >= 0) && ! m[2]._isUpperCase() && ! morph(dDA, [m.start[2], m[2]], ":G", false);
    },
    s395p_1: function (s, m) {
        return m[1][0]+"’";
    },
    c411p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:onz|énième)/i) >= 0) && morph(dDA, [m.start[2], m[2]], ":[me]");
    },
    c419p_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].search(/^NF (?:C|E|P|Q|S|X|Z|EN(?: ISO|)) [0-9]+(?:‑[0-9]+|)/) >= 0);
    },
    s419p_1: function (s, m) {
        return formatNF(m[0]);
    },
    s424p_1: function (s, m) {
        return m[0].replace(/2/g, "₂").replace(/3/g, "₃").replace(/4/g, "₄");
    },
    c432p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /NF[  -]?(C|E|P|Q|X|Z|EN(?:[  -]ISO|)) */);
    },
    s432p_1: function (s, m) {
        return formatNumber(m[0]);
    },
    s446p_1: function (s, m) {
        return m[0].replace(/O/g, "0");
    },
    s447p_1: function (s, m) {
        return m[0].replace(/O/g, "0");
    },
    c465p_1: function (s, sx, m, dDA, sCountry) {
        return ! checkDate(m[1], m[2], m[3]) && ! look(s.slice(0,m.index), /\bversions? +$/i);
    },
    c468p_1: function (s, sx, m, dDA, sCountry) {
        return ! checkDateWithString(m[1], m[2], m[3]);
    },
    c471p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +av(?:ant|\.) J(?:\.-C\.|ésus-Christ)/) && ! checkDay(m[1], m[2], m[3], m[4]);
    },
    s471p_1: function (s, m) {
        return getDay(m[2], m[3], m[4]);
    },
    c476p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +av(?:ant|\.) J(?:\.-C\.|ésus-Christ)/) && ! checkDayWithString(m[1], m[2], m[3], m[4]);
    },
    s476p_1: function (s, m) {
        return getDayWithString(m[2], m[3], m[4]);
    },
    c513p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false) || m[1] == "en";
    },
    c516p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":", false);
    },
    c520p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NB]", false);
    },
    c521p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NB]", false) && ! nextword1(s, m.end[0]);
    },
    c524p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":N") && ! (m[1].search(/^(?:aequo|nihilo|cathedra|absurdo|abrupto)/i) >= 0);
    },
    c526p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c527p_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":N", ":[AGW]");
    },
    c530p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c532p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":", false);
    },
    c536p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":", false) && morph(dDA, prevword1(s, m.index), ":D", false, ! Boolean((m[1].search(/^s(?:ans|ous)$/i) >= 0)));
    },
    c540p_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":N", false) && morph(dDA, prevword1(s, m.index), ":(?:D|V0e)", false, true) && ! (morph(dDA, [m.start[1], m[1]], ":G", false) && morph(dDA, [m.start[2], m[2]], ":[GYB]", false));
    },
    s547p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    s548p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c559p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":Cs", false, true);
    },
    s565p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c571p_1: function (s, sx, m, dDA, sCountry) {
        return ! nextword1(s, m.end[0]);
    },
    c573p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":G");
    },
    c577p_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /\b(?:les?|du|des|un|ces?|[mts]on) +/i);
    },
    c584p_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":D", false);
    },
    c586p_1: function (s, sx, m, dDA, sCountry) {
        return ! ( morph(dDA, prevword1(s, m.index), ":R", false) && look(s.slice(m.end[0]), /^ +qu[e’]/) );
    },
    s634p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c636p_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /quatre $/i);
    },
    s636p_1: function (s, m) {
        return m[0].replace(/ /g, "-").replace(/vingts/g, "vingt");
    },
    s638p_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    s640p_1: function (s, m) {
        return m[0].replace(/ /g, "-").replace(/vingts/g, "vingt");
    },
    s664p_1: function (s, m) {
        return m[0].replace(/-/g, " ");
    },
    c666p_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    s669p_1: function (s, m) {
        return m[0].replace(/-/g, " ");
    },
    s670p_1: function (s, m) {
        return m[0].replace(/-/g, " ");
    },
    c718p_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:G|V0)|>(?:t(?:antôt|emps|rès)|loin|souvent|parfois|quelquefois|côte|petit) ", false) && ! m[1][0]._isUpperCase();
    },
    p728p_1: function (s, m) {
        return m[0].replace(/‑/g, "");
    },
    p729p_1: function (s, m) {
        return m[0].replace(/‑/g, "");
    },
    c763s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[0], m[0]], ":", false);
    },
    c766s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false);
    },
    c767s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":A", false) && ! morph(dDA, prevword1(s, m.index), ":D", false);
    },
    c804s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:O[sp]|X)", false);
    },
    d804s_1: function (s, m, dDA) {
        return select(dDA, m.start[1], m[1], ":V");
    },
    d806s_1: function (s, m, dDA) {
        return select(dDA, m.start[1], m[1], ":V");
    },
    c808s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":[YD]", false);
    },
    d808s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    d810s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    c812s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":Y", false);
    },
    d812s_1: function (s, m, dDA) {
        return exclude(dDA, m.start[1], m[1], ":V");
    },
    c823s_1: function (s, sx, m, dDA, sCountry) {
        return option("mapos");
    },
    s823s_1: function (s, m) {
        return m[1].slice(0,-1)+"’";
    },
    c830s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[GNAY]", ":Q|>(?:priori|post[eé]riori|contrario|capella) ");
    },
    c848s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ">(?:et|o[uù]) ");
    },
    c852s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":N.*:f:s", false);
    },
    c857s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":(O[on]|3s)", false);
    },
    c862s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":A.*:f", false) || morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    s862s_1: function (s, m) {
        return m[1].replace(/è/g, "ê").replace(/È/g, "Ê");
    },
    c868s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":V", false, true);
    },
    c873s_1: function (s, sx, m, dDA, sCountry) {
        return m[2].endsWith("e") && ( (m[1].search(/^(?:quand|comme|que)$/i) >= 0) || morphex(dDA, [m.start[1], m[1]], ":[NV]", ":[GA]") );
    },
    c873s_2: function (s, sx, m, dDA, sCountry) {
        return m[2].endsWith("s") && ! (m[1].search(/^(?:les|[mtscd]es|quels)$/i) >= 0);
    },
    c883s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^([nv]ous|faire|en|la|lui|donnant|œuvre|h[éo]|olé|joli|Bora|couvent|dément|sapiens|très|vroum|[0-9]+)$/i) >= 0) && ! ((m[1].search(/^(?:est|une?)$/) >= 0) && look(s.slice(0,m.index), /[’']$/)) && ! (m[1] == "mieux" && look(s.slice(0,m.index), /qui +$/i));
    },
    c917s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^avoir$/i) >= 0) && morph(dDA, [m.start[1], m[1]], ">avoir ", false);
    },
    c932s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|mettre) ", false);
    },
    c963s_1: function (s, sx, m, dDA, sCountry) {
        return ! look_chk1(dDA, s.slice(m.end[0]), m.end[0], / [a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+ en ([aeo][a-zû]*)/i, ":V0a");
    },
    c983s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">abolir ", false);
    },
    c985s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">achever ", false);
    },
    c986s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), / +de?\b/);
    },
    c995s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":A|>un", false);
    },
    c1001s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">comparer ");
    },
    c1002s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">contraindre ", false);
    },
    c1013s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">joindre ");
    },
    c1039s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">suffire ");
    },
    c1040s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">talonner ");
    },
    c1047s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:prévenir|prévoir|prédire|présager|préparer|pressentir|pronostiquer|avertir|devancer|réserver) ", false);
    },
    c1052s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:ajourner|différer|reporter) ", false);
    },
    c1119s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]") && m[2][0]._isLowerCase();
    },
    s1119s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[fe]:[si]");
    },
    c1123s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":N.*:[fe]|:[AW]") && m[2][0]._isLowerCase() || m[2] == "va";
    },
    c1123s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]") && m[2][0]._isLowerCase() && hasSimil(m[2]);
    },
    s1123s_2: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[fe]:[si]");
    },
    c1129s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]") && m[2][0]._isLowerCase();
    },
    s1129s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[me]:[si]");
    },
    c1133s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]|:V0e.*:3[sp]|>devoir") && m[2][0]._isLowerCase() && hasSimil(m[2]);
    },
    s1133s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[me]:[si]");
    },
    c1137s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[si]") && m[2][0]._isLowerCase();
    },
    s1137s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:.:[si]");
    },
    c1141s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V.*:(?:Y|[123][sp])") && m[1][0]._isLowerCase() && ! prevword1(s, m.index);
    },
    s1141s_1: function (s, m) {
        return suggSimil(m[1], ":[NAQ]:[me]:[si]");
    },
    c1145s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[pi]") && m[2][0]._isLowerCase() && ! (m[0].search(/^quelques? soi(?:ent|t|s)\b/i) >= 0);
    },
    s1145s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:.:[pi]");
    },
    c1149s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[pi]") && m[2][0]._isLowerCase();
    },
    s1149s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[me]:[pi]");
    },
    c1153s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:Y|[123][sp])", ":[NAQ]:.:[pi]") && m[2][0]._isLowerCase();
    },
    s1153s_1: function (s, m) {
        return suggSimil(m[2], ":[NAQ]:[fe]:[pi]");
    },
    c1157s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[NAQ]");
    },
    s1157s_1: function (s, m) {
        return suggSimil(m[1], ":(?:[NAQ]:[fe]:[si])");
    },
    c1161s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]", ":[YG]") && m[2][0]._isLowerCase();
    },
    c1161s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false);
    },
    s1161s_2: function (s, m) {
        return suggSimil(m[2], ":Y");
    },
    c1167s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Y|[123][sp])") && ! look(s.slice(0,m.index), /(?:dont|sauf|un à) +$/i);
    },
    s1167s_1: function (s, m) {
        return suggSimil(m[1], ":[NAQ]:[me]:[si]");
    },
    c1171s_1: function (s, sx, m, dDA, sCountry) {
        return m[1][0]._isLowerCase() && morph(dDA, [m.start[1], m[1]], ":V.*:[123][sp]");
    },
    s1171s_1: function (s, m) {
        return suggSimil(m[1], ":[NA]");
    },
    c1175s_1: function (s, sx, m, dDA, sCountry) {
        return m[1][0]._isLowerCase() && morphex(dDA, [m.start[1], m[1]], ":V.*:[123][sp]", ":[GNA]");
    },
    s1175s_1: function (s, m) {
        return suggSimil(m[1], ":[NAQ]");
    },
    c1184s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":P", false);
    },
    c1185s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]");
    },
    c1190s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|O[on]|X)|>(?:[lmts]|surtout|guère) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1190s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1193s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].search(/^se que?/i) >= 0) && _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|Oo)|>[lmts] ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1193s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1197s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|Oo)", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1197s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1200s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P|O[onw]|X)", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1200s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1203s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|O[onw])", false);
    },
    s1203s_1: function (s, m) {
        return suggSimil(m[2], ":[123][sp]");
    },
    c1206s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P)|>(?:en|y|ils?) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1206s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1209s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y|P)|>(?:en|y|ils?|elles?) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|ce)$/i) >= 0);
    },
    s1209s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1212s_1: function (s, sx, m, dDA, sCountry) {
        return _oDict.isValid(m[2]) && ! morph(dDA, [m.start[2], m[2]], ":[123][sp]|>(?:en|y) ", false) && ! (m[2].search(/-(?:ils?|elles?|[nv]ous|je|tu|on|dire)$/i) >= 0);
    },
    s1212s_1: function (s, m) {
        return suggSimil(m[2], ":V");
    },
    c1229s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Y|[123][sp])", ":[GAQW]");
    },
    c1233s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":(?:G|N|A|Q|W|M[12])");
    },
    c1237s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1][0]._isUpperCase() && morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[GNAQM]");
    },
    c1241s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1][0]._isUpperCase() && morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":[GNAQM]") && ! morph(dDA, prevword1(s, m.index), ":[NA]:[me]:si", false);
    },
    c1245s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123][sp]", ":(?:G|N|A|Q|W|M[12]|T)");
    },
    c1249s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y)", ":[GAQW]") && ! morph(dDA, prevword1(s, m.index), ":V[123].*:[123][sp]", false, false);
    },
    c1255s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":[VN]", false, true);
    },
    c1256s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1259s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:[lmts]a|leur|une|en) +$/i);
    },
    c1261s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">être ") && ! look(s.slice(0,m.index), /\bce que? /i);
    },
    c1280s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:côtés?|coups?|peu(?:-près|)|pics?|propos|valoir|plat-ventrismes?)/i) >= 0);
    },
    c1280s_2: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^(?:côtés?|coups?|peu(?:-pr(?:ès|êts?|és?)|)|pics?|propos|valoir|plat-ventrismes?)/i) >= 0);
    },
    c1285s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":3s", false, false);
    },
    c1288s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:3s|R)", false, false) && ! morph(dDA, nextword1(s, m.end[0]), ":Oo", false);
    },
    c1293s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":Q", ":M[12P]");
    },
    c1296s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:Y|Oo)");
    },
    c1300s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:Y|Oo)");
    },
    c1307s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\bce que?\b/i);
    },
    c1309s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":(?:M[12]|D|Oo)");
    },
    c1314s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]") && ! m[2].slice(0,1)._isUpperCase() && ! m[2].startsWith("tord");
    },
    c1317s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /[ln]’$|\b(?:il|elle|on|y|n’en) +$/i);
    },
    c1321s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /(\bque?\\b|[ln]’$|\b(?:il|elle|on|y|n’en) +$)/i);
    },
    c1324s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /(\bque?\b|[ln]’$|\b(?:il|elle|on|y|n’en) +$)/i);
    },
    c1328s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":Y", false) && ! look(s.slice(0,m.index), /\bque? |(?:il|elle|on|n’(?:en|y)) +$/i);
    },
    c1365s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1371s_1: function (s, sx, m, dDA, sCountry) {
        return ! nextword1(s, m.end[0]) || look(s.slice(m.end[0]), /^ +que? /i);
    },
    c1373s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":G", ">(?:tr(?:ès|op)|peu|bien|plus|moins) |:[NAQ].*:f");
    },
    c1377s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f") && ! (m[2].search(/^seule?s?/) >= 0);
    },
    c1380s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:[oO]h|[aA]h) +$/);
    },
    c1382s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R");
    },
    c1393s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":([123][sp]|Y|P|Q)|>l[ea]? ");
    },
    c1396s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":Y")  && m[1] != "CE";
    },
    c1398s_1: function (s, sx, m, dDA, sCountry) {
        return (m[0].indexOf(",") >= 0 || morphex(dDA, [m.start[2], m[2]], ":G", ":[AYD]"));
    },
    c1401s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V[123].*:(?:Y|[123][sp])") && ! morph(dDA, [m.start[2], m[2]], ">(?:devoir|pouvoir) ") && m[2][0]._isLowerCase() && m[1] != "CE";
    },
    c1408s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1410s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V", ":[NAQ].*:[me]") || look(s.slice(0,m.index), /\b[cs]e +/i);
    },
    c1413s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(m.end[0]), /^ +[ldmtsc]es /) || ( morph(dDA, prevword1(s, m.index), ":Cs", false, true) && ! look(s.slice(0,m.index), /, +$/) && ! look(s.slice(m.end[0]), /^ +(?:ils?|elles?)\b/) && ! morph(dDA, nextword1(s, m.end[0]), ":Q", false, false) );
    },
    c1419s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":N.*:s", ":(?:A.*:[pi]|P)");
    },
    c1441s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":N.*:p", ":(?:G|W|A.*:[si])");
    },
    c1450s_1: function (s, sx, m, dDA, sCountry) {
        return m[1].endsWith("en") || look(s.slice(0,m.index), /^ *$/);
    },
    c1456s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1459s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1].startsWith("B");
    },
    c1471s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":E|>le ", false, false);
    },
    c1481s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":(?:[123][sp]|Y)", ":(?:G|N|A|M[12P])") && ! look(s.slice(0,m.index), /\bles *$/i);
    },
    c1489s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":W", false) && ! morph(dDA, prevword1(s, m.index), ":V.*:3s", false, false);
    },
    s1501s_1: function (s, m) {
        return m[1].replace(/pal/g, "pâl");
    },
    s1504s_1: function (s, m) {
        return m[1].replace(/pal/g, "pâl");
    },
    c1512s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AQ]", false);
    },
    c1522s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ">(?:arriver|venir|à|revenir|partir|aller) ");
    },
    c1527s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":P", false);
    },
    c1538s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:G|[123][sp]|W)");
    },
    s1538s_1: function (s, m) {
        return m[1].replace(/ /g, "");
    },
    c1543s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c1551s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    c1554s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":V", false) && ! ( m[1] == "sans" && morph(dDA, [m.start[2], m[2]], ":[NY]", false) );
    },
    c1575s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AQ].*:[pi]", false);
    },
    c1578s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c1580s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:d[eu]|avant|après|sur|malgré) +$/i);
    },
    c1582s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:d[eu]|avant|après|sur|malgré) +$/i);
    },
    c1587s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":f") && ! look(s.slice(0,m.index), /(?:à|pas|de|[nv]ous|eux) +$/i);
    },
    c1590s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":m") && ! look(s.slice(0,m.index), /(?:à|pas|de|[nv]ous|eux) +$/i);
    },
    c1594s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":N.*:[fp]", ":(?:A|W|G|M[12P]|Y|[me]:i|3s)") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s1594s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c1598s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[mp]") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s1598s_1: function (s, m) {
        return suggFemSing(m[1]);
    },
    c1602s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[fs]") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s1602s_1: function (s, m) {
        return suggMasPlur(m[1]);
    },
    c1606s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[ms]") && morph(dDA, prevword1(s, m.index), ":R|>de ", false, true);
    },
    s1606s_1: function (s, m) {
        return suggFemPlur(m[1]);
    },
    c1616s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins)\b/));
    },
    c1620s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins)\b/));
    },
    c1624s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins)\b/));
    },
    c1628s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":[123][sp]", false) && ! ((m[3].search(/^(?:jamais|rien)$/i) >= 0) && look(s.slice(0,m.index), /\b(?:que?|plus|moins)\b/));
    },
    c1643s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:Y|W|Oo)", false) && _oDict.isValid(m[1]);
    },
    s1643s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c1666s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    c1900s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":G");
    },
    c1907s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    c1918s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)s?$/i) >= 0);
    },
    c1951s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c1952s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c1969s_1: function (s, sx, m, dDA, sCountry) {
        return m[2]._isDigit() || morph(dDA, [m.start[2], m[2]], ":B", false);
    },
    c1982s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">prendre ", false);
    },
    c1986s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">rester ", false);
    },
    c1991s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:sembler|para[îi]tre) ") && morphex(dDA, [m.start[3], m[3]], ":A", ":G");
    },
    c1992s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:une|la|cette|[mts]a|[nv]otre|de) +/);
    },
    c1995s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">tenir ", false);
    },
    c1997s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">trier ", false);
    },
    c1999s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">venir ", false);
    },
    c2013s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", ":(?:G|3p)");
    },
    c2018s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", ":(?:G|3p)");
    },
    c2025s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":B", false);
    },
    c2026s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":V0", false) || ! morph(dDA, nextword1(s, m.end[0]), ":A", false);
    },
    c2027s_1: function (s, sx, m, dDA, sCountry) {
        return isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c2028s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":W", false);
    },
    c2029s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":A .*:m:s", false);
    },
    c2031s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":(?:R|C[sc])", false, true);
    },
    c2032s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":B", false) || (m[1].search(/^(?:plusieurs|maintes)/i) >= 0);
    },
    c2033s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, nextword1(s, m.end[0]), ":[NAQ]", false, true);
    },
    c2034s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":V0");
    },
    c2036s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":D", false);
    },
    c2037s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":D.*:[me]:[si]", false);
    },
    c2038s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":A", false);
    },
    c2039s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:croire|devoir|estimer|imaginer|penser) ");
    },
    c2041s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:R|D|[123]s|X)", false);
    },
    c2042s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c2043s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\bt(?:u|oi qui)\b/i);
    },
    c2044s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c2045s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":A", false);
    },
    c2046s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c2047s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":W", false);
    },
    c2048s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[AW]", ":G");
    },
    c2049s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[AW]", false);
    },
    c2050s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":Y", false);
    },
    c2053s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NV]", ":D");
    },
    c2054s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":(?:3s|X)", false);
    },
    c2055s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[me]", false);
    },
    c2059s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false) && (morph(dDA, [m.start[2], m[2]], ":(?:M[12]|V)", false) || ! _oDict.isValid(m[2]));
    },
    c2060s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M", false) && morph(dDA, [m.start[2], m[2]], ":M", false);
    },
    c2061s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M", false);
    },
    c2062s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:M[12]|N)") && morph(dDA, [m.start[2], m[2]], ":(?:M[12]|N)");
    },
    c2063s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":MP");
    },
    c2064s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false);
    },
    c2065s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M[12]", false);
    },
    c2068s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[MT]", false) && morph(dDA, prevword1(s, m.index), ":Cs", false, true) && ! look(s.slice(0,m.index), /\b(?:plus|moins|aussi) .* que +$/);
    },
    p2068s_1: function (s, m) {
        return rewriteSubject(m[1],m[2]);
    },
    c2073s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c2075s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c2077s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:V0e|N)", false) && morph(dDA, [m.start[3], m[3]], ":[AQ]", false);
    },
    c2079s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false);
    },
    c2081s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false) && morph(dDA, [m.start[3], m[3]], ":[QY]", false);
    },
    c2083s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && ! (m[2] == "crainte" && look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/));
    },
    c2085s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morph(dDA, [m.start[3], m[3]], ":B", false) && morph(dDA, [m.start[4], m[4]], ":(?:Q|V1.*:Y)", false);
    },
    c2089s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c2090s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V[123]");
    },
    c2091s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V[123]", false);
    },
    c2092s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c2095s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":G");
    },
    c2098s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], "[NAQ].*:[me]:[si]", false);
    },
    c2100s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[me]", ":G") && morph(dDA, [m.start[3], m[3]], ":[AQ].*:[me]", false);
    },
    c2102s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[fe]", ":G") && morph(dDA, [m.start[3], m[3]], ":[AQ].*:[fe]", false);
    },
    c2104s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", ":[123][sp]") && morph(dDA, [m.start[3], m[3]], ":[AQ].*:[pi]", false);
    },
    c2107s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AW]");
    },
    c2109s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AW]", false);
    },
    c2111s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[AQ]", false);
    },
    c2113s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":W", ":3p");
    },
    c2115s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[AW]", ":[123][sp]");
    },
    c2119s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && morph(dDA, [m.start[3], m[3]], ":W", false) && morph(dDA, [m.start[4], m[4]], ":[AQ]", false);
    },
    c2121s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, true);
    },
    c2122s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":W\\b");
    },
    c2125s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c2129s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:N|A|Q|V0e)", false);
    },
    c2187s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":1s", false, false);
    },
    c2188s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":2s", false, false);
    },
    c2189s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":3s", false, false);
    },
    c2190s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":1p", false, false);
    },
    c2191s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":2p", false, false);
    },
    c2192s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":3p", false, false);
    },
    c2193s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]");
    },
    c2199s_1: function (s, sx, m, dDA, sCountry) {
        return isAmbiguousNAV(m[3]) && morph(dDA, [m.start[1], m[1]], ":[NAQ]", false);
    },
    c2202s_1: function (s, sx, m, dDA, sCountry) {
        return isAmbiguousNAV(m[3]) && morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && ! (m[0].search(/^[dD](?:’une?|e la) /) >= 0);
    },
    c2205s_1: function (s, sx, m, dDA, sCountry) {
        return isAmbiguousNAV(m[3]) && ( morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":3[sp]") && ! prevword1(s, m.index)) );
    },
    c2221s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:G|V0)", false);
    },
    c2231s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    c2234s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    c2237s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f", false);
    },
    c2252s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)");
    },
    c2255s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)") || ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[me]") && morphex(dDA, [m.start[1], m[1]], ":R", ">(?:e[tn]|ou) ") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[3], m[3]], ":Y", false)) );
    },
    c2259s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|P|G|W|Y)");
    },
    c2263s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    c2266s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|G|W|V0|3s)");
    },
    c2269s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:e|m|G|W|P)");
    },
    c2272s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    c2275s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    c2278s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:s", ":[GWme]");
    },
    c2282s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:e|f|P|G|W|[1-3][sp]|Y)");
    },
    c2285s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":(?:e|f|P|G|W|[1-3][sp]|Y)") || ( morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[fe]") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou) ") && ! (morph(dDA, [m.start[1], m[1]], ":(?:Rv|C)", false) && morph(dDA, [m.start[3], m[3]], ":Y", false)) );
    },
    c2289s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efPGWY]");
    },
    c2293s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    c2296s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:e|f|G|W|V0|3s|P)") && ! ( m[2] == "demi" && morph(dDA, nextword1(s, m.end[0]), ":N.*:f") );
    },
    c2299s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:e|f|G|W|V0|3s)");
    },
    c2302s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGWP]");
    },
    c2305s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    c2308s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    s2308s_1: function (s, m) {
        return suggCeOrCet(m[2]);
    },
    c2312s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[GWme]");
    },
    s2312s_1: function (s, m) {
        return m[1].replace(/on/g, "a");
    },
    c2315s_1: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^[aâeéèêiîoôuûyœæ]/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":[eGW]");
    },
    s2315s_1: function (s, m) {
        return m[1].replace(/a/g, "on");
    },
    c2315s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    s2315s_2: function (s, m) {
        return m[1].replace(/a/g, "on");
    },
    c2322s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":[efGW]");
    },
    c2328s_1: function (s, sx, m, dDA, sCountry) {
        return ( morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && ! (look(s.slice(m.end[0]), / +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false)) ) || m[1] in aREGULARPLURAL;
    },
    s2328s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2332s_1: function (s, sx, m, dDA, sCountry) {
        return ( morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") || (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[pi]|>avoir") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou) ") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[2], m[2]], ":Y", false))) ) && ! (look(s.slice(m.end[0]), / +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false));
    },
    s2332s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2337s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ipYPGW]") && ! (look(s.slice(m.end[0]), / +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[1] in aREGULARPLURAL;
    },
    s2337s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2342s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[ipGW]") && ! (look(s.slice(m.end[0]), / +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[2] in aREGULARPLURAL;
    },
    s2342s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2347s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ipPGW]") && ! (look(s.slice(m.end[0]), / +(?:et|ou) /) && morph(dDA, nextword(s, m.end[0], 2), ":[NAQ]", true, false))) || m[1] in aREGULARPLURAL;
    },
    s2347s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2353s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ip]|>o(?:nde|xydation|or)\\b") && morphex(dDA, prevword1(s, m.index), ":(?:G|[123][sp])", ":[AD]", true)) || m[1] in aREGULARPLURAL;
    },
    s2353s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2359s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ip]") || m[1] in aREGULARPLURAL;
    },
    s2359s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2363s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[ip]") || m[1] in aREGULARPLURAL;
    },
    s2363s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2367s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[123][sp]|:[si]");
    },
    s2367s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2371s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p");
    },
    s2371s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2374s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") || ( morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[si]") && morphex(dDA, [m.start[1], m[1]], ":[RC]", ">(?:e[tn]|ou)") && ! (morph(dDA, [m.start[1], m[1]], ":Rv", false) && morph(dDA, [m.start[2], m[2]], ":Y", false)) );
    },
    s2374s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2378s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[siGW]");
    },
    s2378s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2382s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[siGW]");
    },
    s2382s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2386s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siGW]");
    },
    c2390s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[siG]");
    },
    c2394s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[siGW]") && ! morph(dDA, prevword(s, m.index, 2), ":B", false);
    },
    s2394s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2436s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! (m[2].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$/i) >= 0)) || m[2] in aREGULARPLURAL;
    },
    s2436s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2442s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! morph(dDA, prevword1(s, m.index), ":N", false) && ! (m[2].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$/i) >= 0)) || m[2] in aREGULARPLURAL;
    },
    s2442s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2448s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") || m[1] in aREGULARPLURAL) && ! look(s.slice(0,m.index), /\b(?:le|un|ce|du) +$/i);
    },
    s2448s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c2452s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && ! (m[1].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor|Rois|Corinthiens|Thessaloniciens)$/i) >= 0);
    },
    s2452s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c2456s_1: function (s, sx, m, dDA, sCountry) {
        return (m[1] != "1" && m[1] != "0" && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! (m[2].search(/^(janvier|février|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor)$/i) >= 0)) || m[1] in aREGULARPLURAL;
    },
    s2456s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2464s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:p", ":(?:V0e|[NAQ].*:[me]:[si])");
    },
    c2464s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:p", ":(?:V0e|[NAQ].*:[me]:[si])");
    },
    c2464s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:[si]", ":(?:V0e|[NAQ].*:[me]:[si])");
    },
    c2468s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:s", ":(?:V0e|[NAQ].*:[me]:[pi])");
    },
    c2468s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:s", ":(?:V0e|[NAQ].*:[me]:[pi])");
    },
    c2468s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:[pi]", ":(?:V0e|[NAQ].*:[me]:[pi])");
    },
    c2472s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:p", ":(?:V0e|[NAQ].*:[fe]:[si])");
    },
    c2472s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:p", ":(?:V0e|[NAQ].*:[fe]:[si])");
    },
    c2472s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:[si]", ":(?:V0e|[NAQ].*:[fe]:[si])");
    },
    c2476s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:s", ":(?:V0e|[NAQ].*:[fe]:[pi])");
    },
    c2476s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f:s", ":(?:V0e|[NAQ].*:[fe]:[pi])");
    },
    c2476s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m:[pi]", ":(?:V0e|[NAQ].*:[fe]:[pi])");
    },
    c2488s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/);
    },
    c2491s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/);
    },
    s2491s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c2495s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[me]");
    },
    c2499s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[fe]");
    },
    c2503s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[me]");
    },
    c2507s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\btel(?:le|)s? +$/) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[fe]");
    },
    c2523s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false);
    },
    c2526s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false) && morphex(dDA, [m.start[4], m[4]], ":[NAQ].*:m", ":[fe]");
    },
    s2526s_1: function (s, m) {
        return m[1].replace(/lle/g, "l");
    },
    c2531s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false);
    },
    c2534s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0e", false) && morphex(dDA, [m.start[4], m[4]], ":[NAQ].*:f", ":[me]");
    },
    s2534s_1: function (s, m) {
        return m[1].replace(/l/g, "lle");
    },
    c2553s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">trouver ", false) && morphex(dDA, [m.start[3], m[3]], ":A.*:(?:f|m:p)", ":(?:G|3[sp]|M[12P])");
    },
    s2553s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c2564s_1: function (s, sx, m, dDA, sCountry) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]);
    },
    s2564s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c2564s_2: function (s, sx, m, dDA, sCountry) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s"))) && ! apposition(m[1], m[2]);
    },
    s2564s_2: function (s, m) {
        return switchPlural(m[2]);
    },
    c2572s_1: function (s, sx, m, dDA, sCountry) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2572s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c2572s_2: function (s, sx, m, dDA, sCountry) {
        return ((morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2572s_2: function (s, m) {
        return switchPlural(m[2]);
    },
    c2584s_1: function (s, sx, m, dDA, sCountry) {
        return ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":[GYfe]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":[GYme]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2584s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c2584s_2: function (s, sx, m, dDA, sCountry) {
        return ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[GYsi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":[GYpi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2584s_2: function (s, m) {
        return switchPlural(m[2]);
    },
    c2596s_1: function (s, sx, m, dDA, sCountry) {
        return ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":(?:[Gfe]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":(?:[Gme]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2596s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c2596s_2: function (s, sx, m, dDA, sCountry) {
        return ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":(?:[Gsi]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:s", ":(?:[Gpi]|V0e|Y)") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p"))) && ! apposition(m[1], m[2]) && morph(dDA, prevword1(s, m.index), ":[VRX]", true, true);
    },
    s2596s_2: function (s, m) {
        return switchPlural(m[2]);
    },
    c2614s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^air$/i) >= 0) && ! m[2].startsWith("seul") && ((morph(dDA, [m.start[1], m[1]], ":m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2614s_1: function (s, m) {
        return switchGender(m[2], false);
    },
    c2614s_2: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^air$/i) >= 0) && ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[si]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2614s_2: function (s, m) {
        return suggSing(m[2]);
    },
    c2623s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && ((morph(dDA, [m.start[1], m[1]], ":m") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morph(dDA, [m.start[1], m[1]], ":f") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]", false, false) && ! apposition(m[1], m[2]);
    },
    s2623s_1: function (s, m) {
        return switchGender(m[2], false);
    },
    c2623s_2: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^air$/i) >= 0) && ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[si]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! morph(dDA, prevword1(s, m.index), ":[NAQ]", false, false) && ! apposition(m[1], m[2]);
    },
    s2623s_2: function (s, m) {
        return suggSing(m[2]);
    },
    c2638s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "fois" && ! m[2].startsWith("seul") && ((morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":[fe]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:f", ":[me]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m"))) && morph(dDA, prevword1(s, m.index), ":[VRBX]", true, true) && ! apposition(m[1], m[2]);
    },
    s2638s_1: function (s, m) {
        return switchGender(m[2], true);
    },
    c2638s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && morph(dDA, prevword1(s, m.index), ":[VRBX]", true, true) && ! apposition(m[1], m[2]);
    },
    s2638s_2: function (s, m) {
        return suggPlur(m[2]);
    },
    c2659s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "fois" && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! m[2].startsWith("seul") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|d’) *$/);
    },
    s2659s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2663s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "fois" && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! m[2].startsWith("seul") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQB]", false, false);
    },
    s2663s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2673s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]", ":(?:B|G|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f") && ! apposition(m[2], m[3]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2673s_1: function (s, m) {
        return (m[1].search(/^(?:certains|quels)/i) >= 0) ? suggMasPlur(m[3])  : suggMasSing(m[3]);
    },
    c2679s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]", ":(?:B|G|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f") && ! apposition(m[2], m[3]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s2679s_1: function (s, m) {
        return (m[1].search(/^(?:certains|quels)/i) >= 0) ? suggMasPlur(m[3])  : suggMasSing(m[3]);
    },
    c2687s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:B|G|e|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f") && ! apposition(m[2], m[3]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2687s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c2692s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:B|G|e|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f") && ! apposition(m[2], m[3]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s2692s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c2699s_1: function (s, sx, m, dDA, sCountry) {
        return m[2] != "fois" && ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:m") && ! apposition(m[2], m[3]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2699s_1: function (s, m) {
        return (m[1].search(/^(?:certaines|quelles)/i) >= 0)  ? suggFemPlur(m[3])  : suggFemSing(m[3]);
    },
    c2705s_1: function (s, sx, m, dDA, sCountry) {
        return m[2] != "fois" && ! m[3].startsWith("seul") && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:m") && ! apposition(m[2], m[3]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s2705s_1: function (s, m) {
        return (m[1].search(/^(?:certaines|quelles)/i) >= 0)  ? suggFemPlur(m[3])  : suggFemSing(m[3]);
    },
    c2713s_1: function (s, sx, m, dDA, sCountry) {
        return m[2] != "fois" && ! m[3].startsWith("seul") && ! (m[0].search(/^quelque chose/i) >= 0) && ((morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:B|e|G|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:B|e|G|V0|m)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:m"))) && ! apposition(m[2], m[3]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2713s_1: function (s, m) {
        return switchGender(m[3], m[1].endsWith("s"));
    },
    c2718s_1: function (s, sx, m, dDA, sCountry) {
        return m[2] != "fois" && ! m[3].startsWith("seul") && ! (m[0].search(/^quelque chose/i) >= 0) && ((morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:m", ":(?:B|e|G|V0|f)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:f")) || (morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:f", ":(?:B|e|G|V0|m)") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:m"))) && ! apposition(m[2], m[3]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s2718s_1: function (s, m) {
        return switchGender(m[3], m[1].endsWith("s"));
    },
    c2727s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2727s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2732s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:p") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s2732s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2739s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWi]") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s2739s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2744s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWi]") && ! apposition(m[1], m[2]) && ! morph(dDA, prevword1(s, m.index), ":[NAQ]|>(?:et|ou) ", false, false);
    },
    s2744s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c2751s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! apposition(m[1], m[2]);
    },
    s2751s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2756s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! morph(dDA, [m.start[3], m[3]], ":A", false) && ! apposition(m[1], m[2]);
    },
    s2756s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2762s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[2].startsWith("seul") && morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:s") && ! apposition(m[1], m[2]) && ! look(s.slice(0,m.index), /\bune? de /i);
    },
    s2762s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2795s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:p") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:s")) || (morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:p"));
    },
    s2795s_1: function (s, m) {
        return switchPlural(m[3]);
    },
    c2800s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]") && morph(dDA, [m.start[3], m[3]], ":[NAQ].*:s");
    },
    s2800s_1: function (s, m) {
        return suggPlur(m[3]);
    },
    c2804s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:[pi]", ":G") && morph(dDA, [m.start[4], m[4]], ":[NAQ].*:s") && ! look(s.slice(0,m.index), /\bune? de /i);
    },
    s2804s_1: function (s, m) {
        return suggPlur(m[4]);
    },
    c2809s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:[si]", ":G") && morph(dDA, [m.start[4], m[4]], ":[NAQ].*:p");
    },
    s2809s_1: function (s, m) {
        return suggSing(m[4]);
    },
    c2816s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:(?:m|f:p)", ":(?:G|P|[fe]:[is]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s2816s_1: function (s, m) {
        return suggFemSing(m[2]);
    },
    c2820s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s2820s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c2824s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":[NAQ].*:f|>[aéeiou].*:e", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|m:[is]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s2824s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c2828s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":G|>[aéeiou].*:[ef]") && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") && ! apposition(m[2], m[3]);
    },
    s2828s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c2833s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:m", ":G|>[aéeiou].*:[ef]") && ! morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f|>[aéeiou].*:e", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:(?:f|m:p)", ":(?:G|P|[me]:[is]|V0|3[sp])") && ! apposition(m[2], m[3]);
    },
    s2833s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c2838s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":(?:G|P|[me]:[ip]|V0|3[sp])") && ! apposition(m[1], m[2]);
    },
    s2838s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c2856s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":B.*:p", false) && m[2] != "cents";
    },
    c2891s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c2892s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c2893s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c2899s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\bquatre $/i);
    },
    c2902s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":B", false) && ! look(s.slice(0,m.index), /\b(?:numéro|page|chapitre|référence|année|test|série)s? +$/i);
    },
    c2913s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":B|>une?", false, true) && ! look(s.slice(0,m.index), /\b(?:numéro|page|chapitre|référence|année|test|série)s? +$/i);
    },
    c2917s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, nextword1(s, m.end[0]), ":B|>une?", false, false);
    },
    c2920s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", ":G") && morphex(dDA, prevword1(s, m.index), ":[VR]", ":B", true);
    },
    c2925s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, nextword1(s, m.end[0]), ":B") || (morph(dDA, prevword1(s, m.index), ":B") && morph(dDA, nextword1(s, m.end[0]), ":[NAQ]", false));
    },
    c2936s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c2939s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false) && morph(dDA, [m.start[3], m[3]], ":(?:N|MP)");
    },
    s2969s_1: function (s, m) {
        return m[1]._trimRight("e");
    },
    c2974s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:V0e|W)|>très", false);
    },
    c2979s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:co[ûu]ter|payer) ", false);
    },
    c2993s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">donner ", false);
    },
    c3001s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:mettre|mise) ", false);
    },
    c3013s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:avoir|perdre) ", false);
    },
    c3016s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:lit|fauteuil|armoire|commode|guéridon|tabouret|chaise)s?\b/i);
    },
    c3022s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":(?:V|[NAQ].*:s)", ":(?:[NA]:.:[pi]|V0e.*:[123]p)", true);
    },
    c3056s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:aller|partir) ", false);
    },
    c3071s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^(?:[lmtsn]|soussignée?s?|seule?s?)$/i) >= 0) && morph(dDA, [m.start[2], m[2]], ":[NAQ]") && ! morph(dDA, prevword1(s, m.index), ":V0");
    },
    s3071s_1: function (s, m) {
        return suggSimil(m[2], ":[123][sp]");
    },
    c3077s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|devenir|para[îi]tre|rendre|sembler) ", false);
    },
    s3077s_1: function (s, m) {
        return m[2].replace(/oc/g, "o");
    },
    c3099s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">tenir ");
    },
    c3113s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">mettre ", false);
    },
    c3114s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c3134s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|aller) ", false);
    },
    s3136s_1: function (s, m) {
        return m[1].replace(/auspice/g, "hospice");
    },
    s3138s_1: function (s, m) {
        return m[1].replace(/auspice/g, "hospice");
    },
    c3159s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":[AQ]");
    },
    s3173s_1: function (s, m) {
        return m[1].replace(/cane/g, "canne");
    },
    c3180s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:appuyer|battre|frapper|lever|marcher) ", false);
    },
    s3180s_1: function (s, m) {
        return m[2].replace(/cane/g, "canne");
    },
    c3186s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^C(?:annes|ANNES)/) >= 0);
    },
    c3189s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^C(?:annes|ANNES)/) >= 0);
    },
    c3204s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c3211s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c3213s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":[VR]", false);
    },
    c3220s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">tordre ", false);
    },
    c3222s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">rendre ", false);
    },
    c3229s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">couper ");
    },
    c3230s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:avoir|donner) ", false);
    },
    c3242s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V.[^:]:(?!Q)");
    },
    c3248s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:[lmtsc]es|des?|[nv]os|leurs|quels) +$/i);
    },
    c3253s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, nextword1(s, m.end[0]), ":[GV]", ":[NAQ]", true);
    },
    c3256s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, nextword1(s, m.end[0]), ":[GV]", ":[NAQ]");
    },
    c3259s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, nextword1(s, m.end[0]), ":[GV]", ":[NAQ]", true);
    },
    c3262s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, nextword1(s, m.end[0]), ":G", ":[NAQ]");
    },
    c3265s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    s3265s_1: function (s, m) {
        return m[2].replace(/nd/g, "nt");
    },
    c3275s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, prevword1(s, m.index), ":V0e", false);
    },
    c3278s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ">(?:abandonner|céder|résister) ", false);
    },
    s3285s_1: function (s, m) {
        return m[1].replace(/nt/g, "mp");
    },
    c3293s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false) && morph(dDA, [m.start[3], m[3]], ":Y", false);
    },
    s3293s_1: function (s, m) {
        return m[2].replace(/sens/g, "cens");
    },
    s3298s_1: function (s, m) {
        return m[1].replace(/o/g, "ô");
    },
    c3313s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c3330s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:desceller|desseller) ", false);
    },
    s3330s_1: function (s, m) {
        return m[2].replace(/descell/g, "décel").replace(/dessell/g, "décel");
    },
    c3334s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:desceller|desseller) ", false);
    },
    s3334s_1: function (s, m) {
        return m[1].replace(/descell/g, "décel").replace(/dessell/g, "décel");
    },
    c3344s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0", false);
    },
    s3344s_1: function (s, m) {
        return m[2].replace(/î/g, "i");
    },
    c3347s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:[vn]ous|lui|leur|et toi) +$|[nm]’$/i);
    },
    s3355s_1: function (s, m) {
        return m[1].replace(/and/g, "ant");
    },
    c3358s_1: function (s, sx, m, dDA, sCountry) {
        return ! ( m[1] == "bonne" && look(s.slice(0,m.index), /\bune +$/i) && look(s.slice(m.end[0]), /^ +pour toute/i) );
    },
    c3361s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:faire|perdre) ");
    },
    c3376s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":D");
    },
    s3435s_1: function (s, m) {
        return m[0].slice(0,-1).replace(/ /g, "-")+"à";
    },
    c3436s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":[NAQ]");
    },
    c3437s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":[123][sp]");
    },
    c3441s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[GQ]");
    },
    c3443s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[GQ]");
    },
    c3447s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[GQ]");
    },
    c3455s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":Y", ":[NA].*:[pe]") && ! look(s.slice(0,m.index), /\b[ld]es +$/i);
    },
    c3463s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">soulever ", false);
    },
    s3463s_1: function (s, m) {
        return m[1].slice(3);
    },
    c3475s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:être|habiter|trouver|situer|rester|demeurer?) ", false);
    },
    c3486s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c3490s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c3504s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1] == "Notre" && look(s.slice(m.end[0]), /Père/));
    },
    s3504s_1: function (s, m) {
        return m[1].replace(/otre/g, "ôtre");
    },
    c3506s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(les?|la|du|des|aux?) +/i) && morph(dDA, [m.start[2], m[2]], ":[NAQ]", false);
    },
    s3506s_1: function (s, m) {
        return m[1].replace(/ôtre/g, "otre")._trimRight("s");
    },
    c3514s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    c3525s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c3528s_1: function (s, sx, m, dDA, sCountry) {
        return ( (m[2].search(/^[nmts]e$/) >= 0) || (! (m[2].search(/^(?:confiance|envie|peine|prise|crainte|affaire|hâte|force|recours|somme)$/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":[AG]")) ) && ! prevword1(s, m.index);
    },
    c3533s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V.*:(?:[1-3][sp])", ":(?:G|1p)") && ! ( m[0].indexOf(" leur ") && morph(dDA, [m.start[2], m[2]], ":[NA].*:[si]", false) ) && ! prevword1(s, m.index);
    },
    c3539s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false) && ! look(s.slice(m.end[0]), /^ +>/) && ! morph(dDA, nextword1(s, m.end[0]), ":3s", false);
    },
    c3547s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V.[a-z_!?]+:(?!Y)");
    },
    c3548s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V0e", ":Y");
    },
    c3550s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":D", false, false);
    },
    s3556s_1: function (s, m) {
        return m[1].replace(/pin/g, "pain");
    },
    c3558s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:manger|dévorer|avaler|engloutir) ");
    },
    s3558s_1: function (s, m) {
        return m[2].replace(/pin/g, "pain");
    },
    c3565s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">aller ", false);
    },
    c3572s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    s3572s_1: function (s, m) {
        return m[2].replace(/pal/g, "pâl");
    },
    s3575s_1: function (s, m) {
        return m[2].replace(/pal/g, "pâl");
    },
    c3581s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">prendre ", false);
    },
    c3582s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">tirer ", false);
    },
    c3583s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    c3585s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">prendre ", false);
    },
    c3593s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ]");
    },
    c3594s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c3600s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":A") && ! (m[2].search(/^seule?s?$/i) >= 0);
    },
    c3605s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:N|A|Q|G|MP)");
    },
    c3618s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":(?:Y|M[12P])");
    },
    c3621s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /(?:peu|de) $/i) && morph(dDA, [m.start[2], m[2]], ":Y|>(tout|les?|la) ");
    },
    c3633s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false);
    },
    c3639s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":Q");
    },
    c3647s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":[AQ]", false);
    },
    c3667s_1: function (s, sx, m, dDA, sCountry) {
        return ! nextword1(s, m.end[0]);
    },
    c3670s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">résonner ", false);
    },
    s3670s_1: function (s, m) {
        return m[1].replace(/réso/g, "raiso");
    },
    c3680s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M1", false);
    },
    s3693s_1: function (s, m) {
        return m[1].replace(/sale/g, "salle");
    },
    c3697s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    s3697s_1: function (s, m) {
        return m[2].replace(/salle/g, "sale");
    },
    s3711s_1: function (s, m) {
        return m[1].replace(/scep/g,"sep");
    },
    c3714s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">être ", false);
    },
    s3714s_1: function (s, m) {
        return m[2].replace(/sep/g, "scep");
    },
    c3722s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">suivre ", false);
    },
    c3730s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), / soit /);
    },
    c3731s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, nextword1(s, m.end[0]), ":[GY]", true, true) && ! look(s.slice(0,m.index), /quel(?:s|les?|) qu $|on $|il $/i) && ! look(s.slice(m.end[0]), / soit /);
    },
    c3748s_1: function (s, sx, m, dDA, sCountry) {
        return ( morphex(dDA, [m.start[2], m[2]], ":N.*:[me]:s", ":[GW]") || ((m[2].search(/^[aeéiîou]/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":N.*:f:s", ":G")) ) && ( look(s.slice(0,m.index), /^ *$|\b(?:à|avec|chez|dès|contre|devant|derrière|en|par|pour|sans|sur) +$|, +$/i) || (morphex(dDA, prevword1(s, m.index), ":V", ":(?:G|W|[NA].*:[pi])") && ! look(s.slice(0,m.index), /\bce que?\b/i)) );
    },
    s3768s_1: function (s, m) {
        return m[1].replace(/sur/g, "sûr");
    },
    s3771s_1: function (s, m) {
        return m[1].replace(/sur/g, "sûr");
    },
    c3777s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":M1", false);
    },
    c3780s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":Y", false);
    },
    s3780s_1: function (s, m) {
        return m[1].replace(/sur/g, "sûr");
    },
    c3789s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":N", ":[MY]|>fond ");
    },
    s3789s_1: function (s, m) {
        return m[1].replace(/â/g, "a");
    },
    s3793s_1: function (s, m) {
        return m[1].replace(/â/g, "a");
    },
    c3802s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ">aller ", false);
    },
    c3805s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ">faire ", false);
    },
    s3808s_1: function (s, m) {
        return m[1].replace(/taule/g, "tôle");
    },
    c3818s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false) && morph(dDA, [m.start[3], m[3]], ":Y", false);
    },
    c3826s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false);
    },
    c3851s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[me]:s");
    },
    c3870s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">ouvrir ", false);
    },
    c3879s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && morph(dDA, [m.start[2], m[2]], ":A") && ! morph(dDA, nextword1(s, m.end[0]), ":D", false, false);
    },
    c3908s_1: function (s, sx, m, dDA, sCountry) {
        return ! m[1]._isDigit() && ! m[2]._isDigit() && ! morph(dDA, [m.start[0], m[0]], ":", false) && ! morph(dDA, [m.start[2], m[2]], ":G", false) && _oDict.isValid(m[1]+m[2]);
    },
    c3908s_2: function (s, sx, m, dDA, sCountry) {
        return m[2] != "là" && ! (m[1].search(/^(?:ex|mi|quasi|semi|non|demi|pro|anti|multi|pseudo|proto|extra)$/i) >= 0) && ! m[1]._isDigit() && ! m[2]._isDigit() && ! morph(dDA, [m.start[2], m[2]], ":G", false) && ! morph(dDA, [m.start[0], m[0]], ":", false) && ! _oDict.isValid(m[1]+m[2]);
    },
    c3921s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ,] +$/);
    },
    s3921s_1: function (s, m) {
        return m[0].toLowerCase();
    },
    c3926s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ,] +$/) && !( ( m[0]=="Juillet" && look(s.slice(0,m.index), /monarchie +de +$/i) ) || ( m[0]=="Octobre" && look(s.slice(0,m.index), /révolution +d’$/i) ) );
    },
    s3926s_1: function (s, m) {
        return m[0].toLowerCase();
    },
    c3945s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].search(/^fonctions? /i) >= 0) || ! look(s.slice(0,m.index), /\ben $/i);
    },
    c3952s_1: function (s, sx, m, dDA, sCountry) {
        return m[2]._isTitle() && morphex(dDA, [m.start[1], m[1]], ":N", ":(?:A|V0e|D|R|B)");
    },
    s3952s_1: function (s, m) {
        return m[2].toLowerCase();
    },
    c3952s_2: function (s, sx, m, dDA, sCountry) {
        return m[2]._isLowerCase() && ! m[2].startsWith("canadienne") && ( (m[1].search(/^(?:certaine?s?|cette|ce[ts]?|[dl]es|[nv]os|quelques|plusieurs|chaque|une)$/i) >= 0) || ( (m[1].search(/^un$/i) >= 0) && ! look(s.slice(m.end[0]), /(?:approximatif|correct|courant|parfait|facile|aisé|impeccable|incompréhensible)/) ) );
    },
    s3952s_2: function (s, m) {
        return m[2]._toCapitalize();
    },
    s3964s_1: function (s, m) {
        return m[1]._toCapitalize();
    },
    c3968s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:parler|cours|leçon|apprendre|étudier|traduire|enseigner|professeur|enseignant|dictionnaire|méthode) ", false);
    },
    s3968s_1: function (s, m) {
        return m[2].toLowerCase();
    },
    s3973s_1: function (s, m) {
        return m[1].toLowerCase();
    },
    c3982s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c3994s_1: function (s, sx, m, dDA, sCountry) {
        return look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/);
    },
    s4004s_1: function (s, m) {
        return m[1]._toCapitalize();
    },
    s4006s_1: function (s, m) {
        return m[1]._toCapitalize();
    },
    c4011s_1: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^(?:Mètre|Watt|Gramme|Seconde|Ampère|Kelvin|Mole|Cand[eé]la|Hertz|Henry|Newton|Pascal|Joule|Coulomb|Volt|Ohm|Farad|Tesla|W[eé]ber|Radian|Stéradian|Lumen|Lux|Becquerel|Gray|Sievert|Siemens|Katal)s?|(?:Exa|P[ée]ta|Téra|Giga|Méga|Kilo|Hecto|Déc[ai]|Centi|Mi(?:lli|cro)|Nano|Pico|Femto|Atto|Ze(?:pto|tta)|Yo(?:cto|etta))(?:mètre|watt|gramme|seconde|ampère|kelvin|mole|cand[eé]la|hertz|henry|newton|pascal|joule|coulomb|volt|ohm|farad|tesla|w[eé]ber|radian|stéradian|lumen|lux|becquerel|gray|sievert|siemens|katal)s?/) >= 0);
    },
    s4011s_1: function (s, m) {
        return m[2].toLowerCase();
    },
    c4037s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":Y", false);
    },
    c4039s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V1") && ! look(s.slice(0,m.index), /\b(?:quelqu(?:e chose|’une?)|(?:l(es?|a)|nous|vous|me|te|se)[ @]trait|personne|rien(?: +[a-zéèêâîûù]+|) +$)/i);
    },
    s4039s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4042s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":M[12P]");
    },
    s4042s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4044s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V1", false);
    },
    s4044s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4046s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":[123][sp]");
    },
    c4048s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":[NM]") && ! morph(dDA, prevword1(s, m.index), ">(?:tenir|passer) ", false);
    },
    s4048s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4051s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V1", false);
    },
    s4051s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4053s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":[NM]");
    },
    s4053s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4055s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":Q", false);
    },
    c4057s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Q|2p)", false);
    },
    s4057s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4059s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":Q", false) && ! morph(dDA, prevword1(s, m.index), "V0.*[12]p", false);
    },
    c4061s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:devoir|savoir|pouvoir) ", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Q|A|[13]s|2[sp])", ":[GYW]");
    },
    s4061s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c4064s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|A|[13]s|2[sp])", ":[GYW]");
    },
    s4064s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    s4072s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c4098s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c4102s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">sembler ", false);
    },
    c4116s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4119s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V[123]_i_._") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4121s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":A", false) && morphex(dDA, [m.start[2], m[2]], ":A", ":[GM]");
    },
    c4123s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":A", false);
    },
    c4125s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:s", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GV]") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4127s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":N", ":[GY]") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4130s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":V0") && morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":(?:G|[123][sp]|P)");
    },
    c4141s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4145s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /[jn]’$/);
    },
    c4153s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":G") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4156s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4159s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4163s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index);
    },
    c4166s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":N", ":[GY]") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4168s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ]", false) && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4170s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":Y") && isEndOfNG(dDA, s.slice(m.end[0]), m.end[0]);
    },
    c4202s_1: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^(?:fini|terminé)s?/i) >= 0) && morph(dDA, prevword1(s, m.index), ":C", false, true);
    },
    c4202s_2: function (s, sx, m, dDA, sCountry) {
        return (m[2].search(/^(?:assez|trop)$/i) >= 0) && (look(s.slice(m.end[0]), /^ +d(?:e |’)/) || ! nextword1(s, m.end[0]));
    },
    c4202s_3: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":A", ":[GVW]") && morph(dDA, prevword1(s, m.index), ":C", false, true);
    },
    c4214s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">aller", false) && ! look(s.slice(m.end[0]), / soit /);
    },
    c4222s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    s4222s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4224s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    s4224s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4226s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    s4226s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4229s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:faire|vouloir) ", false) && ! look(s.slice(0,m.index), /\b(?:en|[mtsld]es?|[nv]ous|un) +$/i) && morphex(dDA, [m.start[2], m[2]], ":V", ":M");
    },
    s4229s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c4232s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">savoir :V", false) && morph(dDA, [m.start[2], m[2]], ":V", false) && ! look(s.slice(0,m.index), /\b(?:[mts]e|[vn]ous|les?|la|un) +$/i);
    },
    s4232s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c4235s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Q|2p)", false);
    },
    s4235s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4238s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|2p)", ":N");
    },
    s4238s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c4281s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s4281s_1: function (s, m) {
        return suggSing(m[3]);
    },
    c4285s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[1], m[1]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[1].endsWith(" été")) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s4285s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c4289s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]"));
    },
    s4289s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4294s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[GWYsi]") || ( morphex(dDA, [m.start[1], m[1]], ":[AQ].*:f", ":[GWYme]") && ! morph(dDA, nextword1(s, m.end[0]), ":N.*:f", false, false) );
    },
    s4294s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c4298s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ].*:p", ":[GWYsi]") || ( morphex(dDA, [m.start[1], m[1]], ":[AQ].*:f", ":[GWYme]") && ! morph(dDA, nextword1(s, m.end[0]), ":N.*:f", false, false) );
    },
    s4298s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c4302s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s4302s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4308s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && ! morph(dDA, prevword1(s, m.index), ":R|>de ", false, false);
    },
    s4308s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c4314s_1: function (s, sx, m, dDA, sCountry) {
        return (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]"));
    },
    s4314s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c4319s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^légion$/i) >= 0) && ! look(s.slice(0,m.index), /\b(?:nous|ne) +$/i) && ((morph(dDA, [m.start[1], m[1]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) && morph(dDA, [m.start[1], m[1]], ":1p", false)) || m[1].endsWith(" été")) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWYpi]");
    },
    s4319s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4325s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && ! look(s.slice(0,m.index), /ce que? +$/) && (! (m[1].search(/^(?:ceux-(?:ci|là)|lesquels)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4325s_1: function (s, m) {
        return suggMasPlur(m[3]);
    },
    c4331s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && (morph(dDA, [m.start[2], m[2]], ">(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre) ", false) || m[2].endsWith(" été")) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && (! (m[1].search(/^(?:elles|celles-(?:ci|là)|lesquelles)$/i) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4331s_1: function (s, m) {
        return suggFemPlur(m[3]);
    },
    c4337s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">avoir ", false) && morphex(dDA, [m.start[2], m[2]], ":[123]s", ":[GNAQWY]");
    },
    s4337s_1: function (s, m) {
        return suggVerbPpas(m[2]);
    },
    c4418s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s4418s_1: function (s, m) {
        return suggSing(m[3]);
    },
    c4422s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWYsi]");
    },
    s4422s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c4426s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]"));
    },
    s4426s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4431s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[MWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s4431s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4437s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s4437s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c4443s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[MWYsi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]"));
    },
    s4443s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c4448s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^légion$/i) >= 0) && morph(dDA, [m.start[1], m[1]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && morph(dDA, [m.start[1], m[1]], ":1p", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWYpi]");
    },
    s4448s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4453s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWYme]")) && (! (m[1].search(/^(?:ceux-(?:ci|là)|lesquels)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4453s_1: function (s, m) {
        return suggMasPlur(m[3]);
    },
    c4459s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && morph(dDA, [m.start[2], m[2]], ">(?:sembler|para[îi]tre|pouvoir|penser|préférer|croire|d(?:evoir|éclarer|ésirer|étester|ire)|vouloir|affirmer|aimer|adorer|souhaiter|estimer|imaginer) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWYpi]") || morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWYfe]")) && (! (m[1].search(/^(?:elles|celles-(?:ci|là)|lesquelles)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4459s_1: function (s, m) {
        return suggFemPlur(m[3]);
    },
    c4490s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GMWYsi]") && ! morph(dDA, [m.start[1], m[1]], ":G", false);
    },
    s4490s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c4494s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^légion$/i) >= 0) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWYpi]") && ! morph(dDA, [m.start[1], m[1]], ":G", false);
    },
    s4494s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4499s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^légion$/i) >= 0) && ((morphex(dDA, [m.start[3], m[3]], ":[AQ].*:f", ":[GWme]") && morphex(dDA, [m.start[2], m[2]], ":m", ":[Gfe]")) || (morphex(dDA, [m.start[3], m[3]], ":[AQ].*:m", ":[GWfe]") && morphex(dDA, [m.start[2], m[2]], ":f", ":[Gme]"))) && ! ( morph(dDA, [m.start[3], m[3]], ":p", false) && morph(dDA, [m.start[2], m[2]], ":s", false) ) && ! morph(dDA, prevword1(s, m.index), ":(?:R|P|Q|Y|[123][sp])", false, false) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4499s_1: function (s, m) {
        return switchGender(m[3]);
    },
    c4506s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[2].search(/^légion$/i) >= 0) && ((morphex(dDA, [m.start[1], m[1]], ":M[1P].*:f", ":[GWme]") && morphex(dDA, [m.start[2], m[2]], ":m", ":[GWfe]")) || (morphex(dDA, [m.start[1], m[1]], ":M[1P].*:m", ":[GWfe]") && morphex(dDA, [m.start[2], m[2]], ":f", ":[GWme]"))) && ! morph(dDA, prevword1(s, m.index), ":(?:R|P|Q|Y|[123][sp])", false, false) && ! look(s.slice(0,m.index), /\b(?:et|ou|de) +$/);
    },
    s4506s_1: function (s, m) {
        return switchGender(m[2]);
    },
    c4514s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:p", ":(?:G|E|M1|s|i)");
    },
    s4514s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c4518s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[fp]", ":(?:G|E|M1|m:[si])");
    },
    s4518s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c4522s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[mp]", ":(?:G|E|M1|f:[si])");
    },
    s4522s_1: function (s, m) {
        return suggFemSing(m[1]);
    },
    c4526s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[fs]", ":(?:G|E|M1|m:[pi])");
    },
    s4526s_1: function (s, m) {
        return suggMasPlur(m[1]);
    },
    c4530s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":A.*:[ms]", ":(?:G|E|M1|f:[pi])");
    },
    s4530s_1: function (s, m) {
        return suggFemPlur(m[1]);
    },
    c4536s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], "V0e", false);
    },
    c4543s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]");
    },
    s4543s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c4546s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]");
    },
    s4546s_1: function (s, m) {
        return suggSing(m[1]);
    },
    c4549s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]") || morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|[AQ].*:f)", ":[GWme]"));
    },
    s4549s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c4552s_1: function (s, sx, m, dDA, sCountry) {
        return (morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:p)", ":[GWsi]") || morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|[AQ].*:m)", ":[GWfe]"));
    },
    s4552s_1: function (s, m) {
        return suggFemSing(m[1]);
    },
    c4555s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]");
    },
    s4555s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c4558s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^légion$/i) >= 0) && (morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]") || morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|[AQ].*:f)", ":[GWme]"));
    },
    s4558s_1: function (s, m) {
        return suggMasPlur(m[1]);
    },
    c4561s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^légion$/i) >= 0) && (morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|Y|[NAQ].*:s)", ":[GWpi]") || morphex(dDA, [m.start[1], m[1]], ":(?:[123][sp]|[AQ].*:m)", ":[GWfe]"));
    },
    s4561s_1: function (s, m) {
        return suggFemPlur(m[1]);
    },
    c4589s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[NAQ]", ":[QWGBMpi]") && ! (m[1].search(/^(?:légion|nombre|cause)$/i) >= 0) && ! look(s.slice(0,m.index), /\bce que?\b/i);
    },
    s4589s_1: function (s, m) {
        return suggPlur(m[1]);
    },
    c4589s_2: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:N|A|Q|W|G|3p)") && ! look(s.slice(0,m.index), /\bce que?\b/i);
    },
    s4589s_2: function (s, m) {
        return suggVerbPpas(m[1], ":m:p");
    },
    c4600s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWsi]");
    },
    s4600s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c4604s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:p", ":[GWsi]");
    },
    s4604s_1: function (s, m) {
        return suggSing(m[2]);
    },
    c4608s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWsi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[GWme]")) && (! (m[1].search(/^(?:celui-(?:ci|là)|lequel)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4608s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4614s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWsi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[GWfe]")) && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s4614s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c4620s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:p", ":[GWsi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[GWfe]"));
    },
    s4620s_1: function (s, m) {
        return suggFemSing(m[3]);
    },
    c4625s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && morphex(dDA, [m.start[2], m[2]], ":[NAQ].*:s", ":[GWpi]");
    },
    s4625s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4629s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWpi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:f", ":[GWme]")) && (! (m[1].search(/^(?:ceux-(?:ci|là)|lesquels)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4629s_1: function (s, m) {
        return suggMasPlur(m[3]);
    },
    c4635s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:montrer|penser|révéler|savoir|sentir|voir|vouloir) ", false) && (morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:s", ":[GWpi]") || morphex(dDA, [m.start[3], m[3]], ":[NAQ].*:m", ":[GWfe]")) && (! (m[1].search(/^(?:elles|celles-(?:ci|là)|lesquelles)$/) >= 0) || ! morph(dDA, prevword1(s, m.index), ":R", false, false));
    },
    s4635s_1: function (s, m) {
        return suggFemPlur(m[3]);
    },
    c4643s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) ", false) && morphex(dDA, [m.start[2], m[2]], ":[AQ]:(?:m:p|f)", ":(?:G|[AQ]:m:[is])");
    },
    s4643s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4646s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) ", false) && morphex(dDA, [m.start[2], m[2]], ":[AQ]:(?:f:p|m)", ":(?:G|[AQ]:f:[is])");
    },
    s4646s_1: function (s, m) {
        return suggFemSing(m[2]);
    },
    c4649s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) ", false) && morphex(dDA, [m.start[2], m[2]], ":[AQ].*:s", ":(?:G|[AQ].*:[ip])");
    },
    s4649s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4652s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ">(?:trouver|considérer|croire) ", false) && morphex(dDA, [m.start[3], m[3]], ":[AQ].*:p", ":(?:G|[AQ].*:[is])");
    },
    s4652s_1: function (s, m) {
        return suggSing(m[3]);
    },
    c4655s_1: function (s, sx, m, dDA, sCountry) {
        return ( morphex(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) ", ":1p") || (morph(dDA, [m.start[1], m[1]], ">(?:trouver|considérer|croire) .*:1p", false) && look(s.slice(0,m.index), /\bn(?:ous|e) +$/)) ) && morphex(dDA, [m.start[2], m[2]], ":[AQ].*:s", ":(?:G|[AQ].*:[ip])");
    },
    s4655s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4677s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[3].search(/^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$/i) >= 0) && morph(dDA, [m.start[2], m[2]], ":V0a", false) && morphex(dDA, [m.start[3], m[3]], ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])");
    },
    s4677s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4683s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[4].search(/^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$/i) >= 0) && morph(dDA, [m.start[3], m[3]], ":V0a", false) && morphex(dDA, [m.start[4], m[4]], ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])");
    },
    s4683s_1: function (s, m) {
        return suggMasSing(m[4]);
    },
    c4689s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:s", ":[GWpi]") && ! morph(dDA, nextword1(s, m.end[0]), ":V", false);
    },
    s4689s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4694s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t_.*:Q.*:s", ":[GWpi]") && ! look(s.slice(0,m.index), /\bque?\b/);
    },
    s4694s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4699s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]") && ! morph(dDA, nextword1(s, m.end[0]), ":V", false);
    },
    s4699s_1: function (s, m) {
        return m[2].slice(0,-1);
    },
    c4704s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0a", false) && morphex(dDA, [m.start[3], m[3]], ":V[0-3]..t_.*:Q.*:p", ":[GWsi]") && ! look(s.slice(0,m.index), /\bque?\b/) && ! morph(dDA, nextword1(s, m.end[0]), ":V", false);
    },
    s4704s_1: function (s, m) {
        return m[3].slice(0,-1);
    },
    c4709s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":Q.*:(?:f|m:p)", ":m:[si]");
    },
    s4709s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c4715s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^(?:confiance|cours|envie|peine|prise|crainte|cure|affaire|hâte|force|recours)$/i) >= 0) && morphex(dDA, [m.start[1], m[1]], ":Q.*:(?:f|m:p)", ":m:[si]") && look(s.slice(0,m.index), /(?:après +$|sans +$|pour +$|que? +$|quand +$|, +$|^ *$)/i);
    },
    s4715s_1: function (s, m) {
        return suggMasSing(m[1]);
    },
    c4745s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":V0a", false) && ! ((m[4].search(/^(?:décidé|essayé|tenté)$/) >= 0) && look(s.slice(m.end[0]), / +d(?:e |’)/)) && morph(dDA, [m.start[2], m[2]], ":[NAQ]", false) && morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:s", ":[GWpi]") && ! morph(dDA, nextword1(s, m.end[0]), ":(?:Y|Oo)", false);
    },
    s4745s_1: function (s, m) {
        return suggPlur(m[4], m[2]);
    },
    c4753s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":V0a", false) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:m", false) && (morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:f", ":[GWme]") || morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]"));
    },
    s4753s_1: function (s, m) {
        return suggMasSing(m[4]);
    },
    c4760s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[3], m[3]], ":V0a", false) && ! ((m[4].search(/^(?:décidé|essayé|tenté)$/) >= 0) && look(s.slice(m.end[0]), / +d(?:e |’)/)) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:f", false) && (morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:m", ":[GWfe]") || morphex(dDA, [m.start[4], m[4]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]")) && ! morph(dDA, nextword1(s, m.end[0]), ":(?:Y|Oo)|>que?", false);
    },
    s4760s_1: function (s, m) {
        return suggFemSing(m[4]);
    },
    c4780s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && (morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:f", ":[GWme]") || morphex(dDA, [m.start[2], m[2]], ":V[0-3]..t.*:Q.*:p", ":[GWsi]"));
    },
    s4780s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4786s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[1].search(/^(?:A|avions)$/) >= 0) && morph(dDA, [m.start[1], m[1]], ":V0a", false) && morph(dDA, [m.start[2], m[2]], ":V.+:(?:Y|2p)", false);
    },
    s4786s_1: function (s, m) {
        return suggVerbPpas(m[2], ":m:s");
    },
    c4792s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && (morph(dDA, [m.start[3], m[3]], ":Y") || (m[3].search(/^(?:[mtsn]e|[nv]ous|leur|lui)$/) >= 0));
    },
    c4796s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && (morph(dDA, [m.start[3], m[3]], ":Y") || (m[3].search(/^(?:[mtsn]e|[nv]ous|leur|lui)$/) >= 0));
    },
    c4802s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":[NAQ].*:m", false);
    },
    c4804s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false);
    },
    c4821s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Y|2p|Q.*:[fp])", ":m:[si]") && m[2] != "prise" && ! morph(dDA, prevword1(s, m.index), ">(?:les|[nv]ous|en)|:[NAQ].*:[fp]", false) && ! look(s.slice(0,m.index), /\bquel(?:le|)s?\b/i);
    },
    s4821s_1: function (s, m) {
        return suggMasSing(m[2]);
    },
    c4827s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V0a", false) && morphex(dDA, [m.start[3], m[3]], ":(?:Y|2p|Q.*:p)", ":[si]");
    },
    s4827s_1: function (s, m) {
        return suggMasSing(m[3]);
    },
    c4832s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0a", false) && morphex(dDA, [m.start[2], m[2]], ":V[123]..t.* :Q.*:s", ":[GWpi]");
    },
    s4832s_1: function (s, m) {
        return suggPlur(m[2]);
    },
    c4838s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:G|Y|P|1p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|tu|ils?|elles?|on|[vn]ous) /);
    },
    s4838s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c4844s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:G|Y|P|2p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|ils?|elles?|on|[vn]ous) /);
    },
    s4844s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c4881s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[NAQ]", ":G");
    },
    c4889s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V[13].*:Ip.*:2s", ":[GNA]");
    },
    s4889s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c4892s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V[13].*:Ip.*:2s", ":G");
    },
    s4892s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c4897s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[MOs]");
    },
    c4900s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V[23].*:Ip.*:3s", ":[GNA]") && analyse(m[1].slice(0,-1)+"s", ":E:2s", false) && ! (m[1].search(/^doit$/i) >= 0) && ! ((m[1].search(/^vient$/i) >= 0) && look(s.slice(m.end[0]), / +l[ea]/));
    },
    s4900s_1: function (s, m) {
        return m[1].slice(0,-1)+"s";
    },
    c4904s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V[23].*:Ip.*:3s", ":G") && analyse(m[1].slice(0,-1)+"s", ":E:2s", false);
    },
    s4904s_1: function (s, m) {
        return m[1].slice(0,-1)+"s";
    },
    c4909s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V3.*:Ip.*:3s", ":[GNA]");
    },
    c4912s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V3.*:Ip.*:3s", ":G");
    },
    c4922s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":A", ":G") && ! look(s.slice(m.end[0]), /\bsoit\b/);
    },
    c4933s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":E|>chez", false) && _oDict.isValid(m[1]);
    },
    s4933s_1: function (s, m) {
        return suggVerbImpe(m[1]);
    },
    c4938s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":E|>chez", false) && _oDict.isValid(m[1]);
    },
    s4938s_1: function (s, m) {
        return suggVerbTense(m[1], ":E", ":2s");
    },
    c4963s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]");
    },
    c4968s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:Y|3[sp])", true) && morph(dDA, prevword1(s, m.index), ":Cc", false, true) && ! look(s.slice(0,m.index), /~ +$/);
    },
    c4973s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:N|A|Q|Y|B|3[sp])", true) && morph(dDA, prevword1(s, m.index), ":Cc", false, true) && ! look(s.slice(0,m.index), /~ +$/);
    },
    c4978s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":[GM]") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:N|A|Q|Y|MP)", true) && morph(dDA, prevword1(s, m.index), ":Cc", false, true) && ! look(s.slice(0,m.index), /~ +$/);
    },
    c4991s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":E", ":(?:G|M[12])") && morphex(dDA, nextword1(s, m.end[0]), ":", ":(?:Y|[123][sp])", true);
    },
    s4991s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c4996s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":E", false);
    },
    s4996s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5001s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":E", false) && morphex(dDA, nextword1(s, m.end[0]), ":[RC]", ":[NAQ]", true);
    },
    s5001s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5006s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":E", false) && morphex(dDA, nextword1(s, m.end[0]), ":[RC]", ":Y", true);
    },
    s5006s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5012s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    s5012s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5014s_1: function (s, sx, m, dDA, sCountry) {
        return ! prevword1(s, m.index) && ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    s5016s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5042s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, true);
    },
    c5043s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    c5045s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    c5047s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]");
    },
    c5048s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":[123]s", false, false);
    },
    c5049s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:[123]s|R)", false, false);
    },
    c5050s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":(?:[123]p|R)", false, false);
    },
    c5051s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, prevword1(s, m.index), ":3p", false, false);
    },
    c5052s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[123][sp]", false);
    },
    c5053s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:[NAQ].*:m:[si]|G|M)");
    },
    c5054s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:[NAQ].*:f:[si]|G|M)");
    },
    c5055s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:[NAQ].*:[si]|G|M)");
    },
    c5056s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:[NAQ].*:[si]|G|M)");
    },
    c5058s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:A|G|M|1p)");
    },
    c5059s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:A|G|M|2p)");
    },
    c5061s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    c5062s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":V", false);
    },
    c5063s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":2s", false) || look(s.slice(0,m.index), /\b(?:je|tu|on|ils?|elles?|nous) +$/i);
    },
    c5064s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[2], m[2]], ":2s|>(ils?|elles?|on) ", false) || look(s.slice(0,m.index), /\b(?:je|tu|on|ils?|elles?|nous) +$/i);
    },
    c5078s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V", false);
    },
    c5081s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":Y");
    },
    c5095s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:ce que?|tout) /i);
    },
    c5107s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":M") && ! (m[1].endsWith("ez") && look(s.slice(m.end[0]), / +vous/));
    },
    s5107s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c5110s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|2p)", ":M");
    },
    s5110s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c5113s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:aimer|aller|désirer|devoir|espérer|pouvoir|préférer|souhaiter|venir) ", false) && ! morph(dDA, [m.start[1], m[1]], ":[GN]", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":M");
    },
    s5113s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5117s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">devoir ", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":M") && ! morph(dDA, prevword1(s, m.index), ":D", false);
    },
    s5117s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5120s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:cesser|décider|défendre|suggérer|commander|essayer|tenter|choisir|permettre|interdire) ", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Q|2p)", ":M");
    },
    s5120s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5123s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:Q|2p)", ":M");
    },
    s5123s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c5126s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">valoir ", false) && morphex(dDA, [m.start[2], m[2]], ":(?:Q|2p)", ":[GM]");
    },
    s5126s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5129s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V1", ":[NM]") && ! look(s.slice(0,m.index), /> +$/);
    },
    s5129s_1: function (s, m) {
        return suggVerbInfi(m[1]);
    },
    c5132s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V1", ":N");
    },
    s5132s_1: function (s, m) {
        return suggVerbInfi(m[2]);
    },
    c5145s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":V0e", false) && (morphex(dDA, [m.start[2], m[2]], ":Y", ":[NAQ]") || m[2] in aSHOULDBEVERB) && ! (m[1].search(/^(?:soit|été)$/i) >= 0) && ! morph(dDA, prevword1(s, m.index), ":Y|>ce", false, false) && ! look(s.slice(0,m.index), /ce (?:>|qu|que >) $/i) && ! look_chk1(dDA, s.slice(0,m.index), 0, /([a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+) +> $/i, ":Y") && ! look_chk1(dDA, s.slice(0,m.index), 0, /^ *>? *([a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+)/i, ":Y");
    },
    s5145s_1: function (s, m) {
        return suggVerbPpas(m[2]);
    },
    c5156s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":1s|>(?:en|y)", false);
    },
    s5156s_1: function (s, m) {
        return suggVerb(m[1], ":1s");
    },
    c5159s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:1s", false, false));
    },
    s5159s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c5162s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G|1p)");
    },
    s5162s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c5165s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G|1p)");
    },
    s5165s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c5168s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:1s|G|1p|3p!)");
    },
    s5168s_1: function (s, m) {
        return suggVerb(m[2], ":1s");
    },
    c5188s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|[ISK].*:2s)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:2s", false, false));
    },
    s5188s_1: function (s, m) {
        return suggVerb(m[2], ":2s");
    },
    c5191s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|[ISK].*:2s)");
    },
    s5191s_1: function (s, m) {
        return suggVerb(m[2], ":2s");
    },
    c5194s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|2p|3p!|[ISK].*:2s)");
    },
    s5194s_1: function (s, m) {
        return suggVerb(m[2], ":2s");
    },
    c5205s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3s", false, false));
    },
    s5205s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5208s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)");
    },
    s5208s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5223s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:N|A|3s|P|Q|G|V0e.*:3p)");
    },
    s5223s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5227s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|Q|G)");
    },
    s5227s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5235s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|Q|G|3p!)") && ! morph(dDA, prevword1(s, m.index), ":[VR]|>de", false, false) && !(m[1].endsWith("out") && morph(dDA, [m.start[2], m[2]], ":Y", false));
    },
    s5235s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5252s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3s|P|G|3p!)") && ! morph(dDA, prevword1(s, m.index), ":R|>(?:et|ou)", false, false) && ! (morph(dDA, [m.start[1], m[1]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3s", false, false));
    },
    s5252s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c5256s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3s|P|G|3p!)") && ! morph(dDA, prevword1(s, m.index), ":R|>(?:et|ou)", false, false);
    },
    s5256s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c5273s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":3p", ":(?:G|3s)");
    },
    c5276s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":3s", ":(?:G|3p)");
    },
    c5279s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":3p", ":(?:G|3s)") && (! prevword1(s, m.index) || look(s.slice(0,m.index), /\b(?:parce que?|quoi ?que?|pour ?quoi|puisque?|quand|com(?:ment|bien)|car|tandis que?) +$/i));
    },
    c5283s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":3s", ":(?:G|3p)") && (! prevword1(s, m.index) || look(s.slice(0,m.index), /\b(?:parce que?|quoi ?que?|pour ?quoi|puisque?|quand|com(?:ment|bien)|car|tandis que?) +$/i));
    },
    s5291s_1: function (s, m) {
        return m[1].slice(0,-1)+"t";
    },
    c5294s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P|Q|[123][sp]|R)", true) && !( m[1].endsWith("ien") && look(s.slice(0,m.index), /> +$/) && morph(dDA, [m.start[2], m[2]], ":Y", false) );
    },
    s5294s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5312s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G|Q)") && morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P|Q|[123][sp]|R)", true);
    },
    s5312s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5316s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3s|P|G)") && morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P|Q|[123][sp]|R)", true);
    },
    s5316s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5324s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":Y", false) && morph(dDA, [m.start[2], m[2]], ":V.[a-z_!?]+(?!.*:(?:3s|P|Q|Y|3p!))");
    },
    s5324s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5332s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:3s|P|Q|Y|3p!|G)") && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":[1-3]p", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i);
    },
    s5332s_1: function (s, m) {
        return suggVerb(m[3], ":3s");
    },
    c5336s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[si]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:3s|1p|P|Q|Y|3p!|G)") && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":[123]p", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i);
    },
    s5336s_1: function (s, m) {
        return suggVerb(m[3], ":3s");
    },
    c5358s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && isAmbiguousAndWrong(m[2], m[3], ":s", ":3s") && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":(?:[123]p|p)", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i);
    },
    s5358s_1: function (s, m) {
        return suggVerb(m[3], ":3s", suggSing);
    },
    c5363s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":(?:Y|P)", true) && isVeryAmbiguousAndWrong(m[2], m[3], ":s", ":3s", ! prevword1(s, m.index)) && ! (look(s.slice(0,m.index), /\b(?:et|ou) +$/i) && morph(dDA, [m.start[3], m[3]], ":(?:[123]p|p)", false)) && ! look(s.slice(0,m.index), /\bni .* ni\b/i);
    },
    s5363s_1: function (s, m) {
        return suggVerb(m[3], ":3s", suggSing);
    },
    c5369s_1: function (s, sx, m, dDA, sCountry) {
        return ( morph(dDA, [m.start[0], m[0]], ":1s") || ( look(s.slice(0,m.index), /> +$/) && morph(dDA, [m.start[0], m[0]], ":1s", false) ) ) && ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) )/i);
    },
    s5369s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5373s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":2s", ":(?:E|G|W|M|J|[13][sp]|2p)") && ! m[0].slice(0,1)._isUpperCase() && ! look(s.slice(0,m.index), /^ *$/) && ( ! morph(dDA, [m.start[0], m[0]], ":[NAQ]", false) || look(s.slice(0,m.index), /> +$/) ) && ! look(sx.slice(0,m.index), /\bt(?:u |[’']|oi,? qui |oi seul )/i);
    },
    s5373s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5378s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":2s", ":(?:G|W|M|J|[13][sp]|2p)") && ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ( ! morph(dDA, [m.start[0], m[0]], ":[NAQ]", false) || look(s.slice(0,m.index), /> +$/) ) && ! look(sx.slice(0,m.index), /\bt(?:u |[’']|oi,? qui |oi seul )/i);
    },
    s5378s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5383s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":[12]s", ":(?:E|G|W|M|J|3[sp]|2p|1p)") && ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ( ! morph(dDA, [m.start[0], m[0]], ":[NAQ]", false) || look(s.slice(0,m.index), /> +$/) || ( (m[0].search(/^étais$/i) >= 0) && ! morph(dDA, prevword1(s, m.index), ":[DA].*:p", false, true) ) ) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))/i);
    },
    s5383s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5388s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))/i);
    },
    s5388s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5391s_1: function (s, sx, m, dDA, sCountry) {
        return ! (m[0].slice(0,1)._isUpperCase() && look(sx.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(sx.slice(0,m.index), /\b(?:j(?:e |[’'])|moi(?:,? qui| seul) |t(?:u |[’']|oi,? qui |oi seul ))/i);
    },
    s5391s_1: function (s, m) {
        return suggVerb(m[0], ":3s");
    },
    c5399s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:1p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|tu|ils?|elles?|on|[vn]ous)/);
    },
    s5399s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c5402s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":1p") && ! look(s.slice(m.end[0]), /^ +(?:je|tu|ils?|elles?|on|[vn]ous)/);
    },
    s5402s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c5405s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":1p") && ! look(s.slice(m.end[0]), /^ +(?:ils|elles)/);
    },
    s5405s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c5414s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:2p|3[sp])") && ! look(s.slice(m.end[0]), /^ +(?:je|ils?|elles?|on|[vn]ous)/);
    },
    s5414s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c5417s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":2p") && ! look(s.slice(m.end[0]), /^ +(?:je|ils?|elles?|on|[vn]ous)/);
    },
    s5417s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c5426s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":V.*:1p", ":[EGMNAJ]") && ! (m[0].slice(0,1)._isUpperCase() && look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(s.slice(0,m.index), /\b(?:[nN]ous(?:-mêmes?|)|[eE]t moi),? /);
    },
    s5426s_1: function (s, m) {
        return suggVerb(m[0], ":3p");
    },
    c5430s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[0], m[0]], ":V.*:2p", ":[EGMNAJ]") && ! (m[0].slice(0,1)._isUpperCase() && look(s.slice(0,m.index), /[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/)) && ! look(s.slice(0,m.index), /\b(?:[vV]ous(?:-mêmes?|)|[eE]t toi|[tT]oi et),? /);
    },
    c5439s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)") && ! (morph(dDA, [m.start[2], m[2]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3p", false, false));
    },
    s5439s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5442s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)");
    },
    s5442s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5446s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)");
    },
    s5446s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5450s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false);
    },
    s5450s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5454s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":R", false, false) && ! (morph(dDA, [m.start[1], m[1]], ":[PQ]", false) && morph(dDA, prevword1(s, m.index), ":V0.*:3p", false, false));
    },
    s5454s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c5457s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s5457s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c5472s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /\b(?:à|avec|sur|chez|par|dans|parmi|contre|ni|de|pour|sous) +$/i);
    },
    c5479s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|mg)") && ! morph(dDA, prevword1(s, m.index), ":[VR]|>de ", false, false);
    },
    s5479s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5483s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:3p|P|Q|G)") && ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false);
    },
    s5483s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5493s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V", ":(?:G|N|A|3p|P|Q)") && ! morph(dDA, prevword1(s, m.index), ":[VR]", false, false);
    },
    s5493s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5500s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:[13]p|P|Q|Y|G)") && morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true);
    },
    s5500s_1: function (s, m) {
        return suggVerb(m[3], ":3p");
    },
    c5503s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[2], m[2]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[3], m[3]], ":V", ":(?:[13]p|P|Y|G)") && morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true);
    },
    s5503s_1: function (s, m) {
        return suggVerb(m[3], ":3p");
    },
    c5520s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":(?:[13]p|P|G|Q.*:p)") && morph(dDA, nextword1(s, m.end[0]), ":(?:R|D.*:p)|>au ", false, true);
    },
    s5520s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5523s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":[NAQ].*:[pi]", false) && morphex(dDA, [m.start[2], m[2]], ":V", ":(?:[13]p|P|G)");
    },
    s5523s_1: function (s, m) {
        return suggVerb(m[2], ":3p");
    },
    c5529s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isAmbiguousAndWrong(m[2], m[3], ":p", ":3p");
    },
    s5529s_1: function (s, m) {
        return suggVerb(m[3], ":3p", suggPlur);
    },
    c5533s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isVeryAmbiguousAndWrong(m[1], m[2], ":p", ":3p", ! prevword1(s, m.index));
    },
    s5533s_1: function (s, m) {
        return suggVerb(m[2], ":3p", suggPlur);
    },
    c5537s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isVeryAmbiguousAndWrong(m[1], m[2], ":m:p", ":3p", ! prevword1(s, m.index));
    },
    s5537s_1: function (s, m) {
        return suggVerb(m[2], ":3p", suggMasPlur);
    },
    c5541s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, prevword1(s, m.index), ":C", ":[YP]", true) && isVeryAmbiguousAndWrong(m[1], m[2], ":f:p", ":3p", ! prevword1(s, m.index));
    },
    s5541s_1: function (s, m) {
        return suggVerb(m[2], ":3p", suggFemPlur);
    },
    c5574s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V0e", ":3s");
    },
    s5574s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c5578s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V0e.*:3s", ":3p");
    },
    s5578s_1: function (s, m) {
        return m[1].slice(0,-1);
    },
    c5584s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V0e", ":3p");
    },
    s5584s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c5588s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":V0e.*:3p", ":3s");
    },
    c5599s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(0,m.index), /(?:et|ou|[dD][eu]|ni) +$/) && morph(dDA, [m.start[1], m[1]], ":M", false) && morphex(dDA, [m.start[2], m[2]], ":[123][sp]", ":(?:G|3s|3p!|P|M|[AQ].*:[si])") && ! morph(dDA, prevword1(s, m.index), ":[VRD]", false, false) && ! look(s.slice(0,m.index), /([A-ZÉÈ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+), +([A-ZÉÈ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+), +$/);
    },
    s5599s_1: function (s, m) {
        return suggVerb(m[2], ":3s");
    },
    c5606s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":M", false) && morph(dDA, [m.start[2], m[2]], ":M", false) && morphex(dDA, [m.start[3], m[3]], ":[123][sp]", ":(?:G|3p|P|Q.*:[pi])") && ! morph(dDA, prevword1(s, m.index), ":R", false, false);
    },
    s5606s_1: function (s, m) {
        return suggVerb(m[3], ":3p");
    },
    c5623s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":(?:[12]s|3p)", ":(?:3s|G|W|3p!)") && ! look(s.slice(m.end[0]), /^ +et (?:l(?:es? |a |’|eurs? )|[mts](?:a|on|es) |ce(?:tte|ts|) |[nv]o(?:s|tre) |du )/);
    },
    s5623s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c5628s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[123]s", ":(?:3p|G|W)");
    },
    s5628s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c5633s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[12][sp]", ":(?:G|W|3[sp]|Y|P|Q)");
    },
    c5638s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[12][sp]", ":(?:G|W|3[sp])");
    },
    c5652s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V.*:1s", ":[GNW]") && ! look(s.slice(0,m.index), /\bje +>? *$/i);
    },
    s5652s_1: function (s, m) {
        return m[1].slice(0,-1)+"é-je";
    },
    c5655s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":V.*:1s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:je|tu) +>? *$/i);
    },
    c5658s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:2s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:je|tu) +>? *$/i);
    },
    c5661s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:3s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:ce|il|elle|on) +>? *$/i);
    },
    s5661s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5664s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:3s", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:ce|il|elle|on) +>? *$/i);
    },
    c5667s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:1p", ":[GNW]") && ! morph(dDA, prevword1(s, m.index), ":Os", false, false) && ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    c5671s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && ! m[1].endsWith("euillez") && morphex(dDA, [m.start[1], m[1]], ":V.*:2pl", ":[GNW]") && ! morph(dDA, prevword1(s, m.index), ":Os", false, false) && ! morph(dDA, nextword1(s, m.end[0]), ":Y", false, false);
    },
    c5675s_1: function (s, sx, m, dDA, sCountry) {
        return ! look(s.slice(m.end[0]), /^ +(?:en|y|ne|aussi|>)/) && morphex(dDA, [m.start[1], m[1]], ":V.*:3p", ":[GNW]") && ! look(s.slice(0,m.index), /\b(?:ce|ils|elles) +>? *$/i);
    },
    s5675s_1: function (s, m) {
        return m[0].replace(/ /g, "-");
    },
    c5680s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":1[sśŝ]", false) && _oDict.isValid(m[1]) && ! (m[1].search(/^vite$/i) >= 0);
    },
    s5680s_1: function (s, m) {
        return suggVerb(m[1], ":1ś");
    },
    c5683s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":[ISK].*:2s", false) && _oDict.isValid(m[1]) && ! (m[1].search(/^vite$/i) >= 0);
    },
    s5683s_1: function (s, m) {
        return suggVerb(m[1], ":2s");
    },
    c5686s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "t" && ! morph(dDA, [m.start[1], m[1]], ":3s", false) && (! m[1].endsWith("oilà") || m[2] != "il") && _oDict.isValid(m[1]) && ! (m[1].search(/^vite$/i) >= 0);
    },
    s5686s_1: function (s, m) {
        return suggVerb(m[1], ":3s");
    },
    c5689s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":3p", ":3s") && _oDict.isValid(m[1]);
    },
    c5692s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":(?:1p|E:2[sp])", false) && _oDict.isValid(m[1]) && ! (m[1].search(/^(?:vite|chez)$/i) >= 0);
    },
    s5692s_1: function (s, m) {
        return suggVerb(m[1], ":1p");
    },
    c5695s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":2p", false) && _oDict.isValid(m[1]) && ! (m[1].search(/^(?:tes|vite)$/i) >= 0) && ! _oDict.isValid(m[0]);
    },
    s5695s_1: function (s, m) {
        return suggVerb(m[1], ":2p");
    },
    c5698s_1: function (s, sx, m, dDA, sCountry) {
        return m[1] != "t" && ! morph(dDA, [m.start[1], m[1]], ":3p", false) && _oDict.isValid(m[1]);
    },
    s5698s_1: function (s, m) {
        return suggVerb(m[1], ":3p");
    },
    c5702s_1: function (s, sx, m, dDA, sCountry) {
        return ! morph(dDA, [m.start[1], m[1]], ":V", false) && ! (m[1].search(/^vite$/i) >= 0) && _oDict.isValid(m[1]) && ! ( m[0].endsWith("il") && m[1].endsWith("oilà") ) && ! ( m[1] == "t" && m[0].endsWith(("il", "elle", "on", "ils", "elles")) );
    },
    c5722s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && morphex(dDA, [m.start[2], m[2]], ":[SK]", ":(?:G|V0|I)") && ! prevword1(s, m.index);
    },
    c5725s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":[SK]", ":(?:G|V0|I)") && ! prevword1(s, m.index);
    },
    c5729s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && morphex(dDA, [m.start[2], m[2]], ":S", ":[IG]");
    },
    s5729s_1: function (s, m) {
        return suggVerbMode(m[2], ":I", m[1]);
    },
    c5729s_2: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && morph(dDA, [m.start[2], m[2]], ":K", false);
    },
    s5729s_2: function (s, m) {
        return suggVerbMode(m[2], ":If", m[1]);
    },
    c5736s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ">(?:afin|pour|quoi|permettre|falloir|vouloir|ordonner|exiger|désirer|douter|suffire) ", false) && morph(dDA, [m.start[2], m[2]], ":(?:Os|M)", false) && ! morph(dDA, [m.start[3], m[3]], ":[GYS]", false);
    },
    s5736s_1: function (s, m) {
        return suggVerbMode(m[3], ":S", m[2]);
    },
    c5744s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && ! morph(dDA, [m.start[2], m[2]], ":[GYS]", false);
    },
    s5744s_1: function (s, m) {
        return suggVerbMode(m[2], ":S", m[1]);
    },
    c5749s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[2], m[2]], ":S", ":[GIK]") && ! (m[2].search(/^e(?:usse|û[mt]es|ût)/) >= 0);
    },
    s5749s_1: function (s, m) {
        return suggVerbMode(m[2], ":I", m[1]);
    },
    c5752s_1: function (s, sx, m, dDA, sCountry) {
        return morphex(dDA, [m.start[1], m[1]], ":S", ":[GIK]") && m[1] != "eusse";
    },
    s5752s_1: function (s, m) {
        return suggVerbMode(m[1], ":I", "je");
    },
    c5757s_1: function (s, sx, m, dDA, sCountry) {
        return morph(dDA, [m.start[1], m[1]], ":(?:Os|M)", false) && morph(dDA, [m.start[2], m[2]], ":V.*:S");
    },
    s5757s_1: function (s, m) {
        return suggVerbMode(m[2], ":I", m[1]);
    },
}
