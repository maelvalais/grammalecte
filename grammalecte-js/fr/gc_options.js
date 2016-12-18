// Options for Grammalecte


// Map

Map.prototype._shallowCopy = function () {
    let oNewMap = new Map();
    for (let [key, val] of this.entries()) {
        oNewMap.set(key, val);
    }
    return oNewMap;
}

Map.prototype._get = function (key, defaultValue) {
    let res = this.get(key);
    if (res !== undefined) {
        return res;
    }
    return defaultValue;
}

Map.prototype._toString = function () {
    // Default .toString() gives nothing useful
    let sRes = "{ ";
    for (let [k, v] of this.entries()) {
        sRes += (typeof k === "string") ? '"' + k + '": ' : k.toString() + ": ";
        sRes += (typeof v === "string") ? '"' + v + '", ' : v.toString() + ", ";
    }
    sRes = sRes.slice(0, -2) + " }"
    return sRes;
}

Map.prototype._update = function (dDict) {
    for (let [k, v] of dDict.entries()) {
        this.set(k, v);
    }
}

Map.prototype._updateOnlyExistingKeys = function (dDict) {
    for (let [k, v] of dDict.entries()) {
        if (this.has(k)){
            this.set(k, v);
        }
    }
}


const lStructOpt = [('basic', [['typo', 'apos'], ['esp', 'nbsp'], ['tu', 'maj'], ['num', 'virg'], ['unit', 'nf'], ['liga', 'mapos'], ['chim', 'ocr']]), ('gramm', [['conf', 'sgpl'], ['gn']]), ('verbs', [['infi', 'conj', 'ppas'], ['imp', 'inte', 'vmode']]), ('style', [['bs', 'pleo'], ['redon1', 'redon2'], ['neg']]), ('misc', [['date', 'mc']]), ('debug', [['idrule']])];

const dOpt = new Map ([["date", true], ["tu", true], ["chim", false], ["mc", false], ["vmode", true], ["html", true], ["ppas", true], ["liga", false], ["ocr", false], ["conj", true], ["maj", true], ["num", true], ["redon1", false], ["bs", true], ["pleo", true], ["typo", true], ["redon2", false], ["unit", true], ["nf", true], ["idrule", false], ["virg", true], ["conf", true], ["inte", true], ["nbsp", false], ["latex", false], ["apos", true], ["neg", false], ["mapos", false], ["imp", true], ["esp", false], ["infi", true], ["sgpl", true], ["gn", true]]);

const dOptLabel = {'en': {'date': ['Date validity.', ''], 'tu': ['Hyphens', 'Checks missing or useless hyphens.'], 'chim': ['Chemistry [!]', 'Typography for molecules (H₂O, CO₂, etc.)'], 'mc': ['Compound words [!]', 'Check if words with hyphen exist in the dictionary (except those beginning by ex-, mi-, quasi-, semi-, non-, demi- and other common prefixes).'], 'vmode': ['Verbal modes', ''], 'ppas': ['Past participles, adjectives', 'Checks subject agreement with past participles and adjectives.'], 'imp': ['Imperative mood', 'Checks particularly verbs at second person singular (i.e. errors such as: « vas … », « prend … », « manges … »).'], 'liga': ['Report typographical ligatures', 'Ligatures of fi, fl, ff, ffi, ffl, ft, st.'], 'ocr': ['OCR errors [!]', 'Warning: many false positives.'], 'style': ['Style', ''], 'sgpl': ['Plural (locutions)', 'Checks the use of plural and singular in locutions.'], 'maj': ['Capitals', 'Checks the use of uppercase and lowercase letters (i.e. « la raison d’État », « les Européens »).'], 'basic': ['Typography', ''], 'num': ['Numbers', 'Large numbers and « O » instead of « 0 ».'], 'redon1': ['Duplicates in paragraph [!]', 'Are excluded grammatical words, words beginning by a capital letter, and also “être” and “avoir”.'], 'misc': ['Miscellaneous', ''], 'bs': ['Popular style', 'Underlines misuse of language though informal and commonly used.'], 'pleo': ['Pleonasms', 'Semantic replications, like « au jour d’aujourd’hui », « monter en haut », etc.'], '__optiontitle__': 'Grammar checking (French)', 'typo': ['Typographical glyphs', ''], 'redon2': ['Duplicates in sentence [!]', 'Are excluded grammatical words, and also “être” and “avoir”.'], 'unit': ['Non-breaking spaces before units of measurement', ''], 'infi': ['Infinitive', 'Checks confusions between infinitive forms and other forms.'], 'verbs': ['Verbs', ''], 'idrule': ['Display control rule identifier [!]', 'Display control rule identifier in the context menu message.'], 'debug': ['Debug', ''], 'virg': ['Commas', 'Missing commas before “mais”, “car” and “etc.”.'], 'conf': ['Confusions, homonyms and false friends', 'Seeks errors often due to homonymy (i.e. confusions between « faîte » et « faite »).'], 'inte': ['Interrogative mood', 'Checks interrogative forms and suggests linking the personal pronouns with verbs.'], 'nbsp': ['Non-breakable spaces', 'Checks the use of non-breakable spaces with the following punctuation marks: « ! ? : ; » (deactivate it if you use a Graphite font).'], 'gramm': ['Agreement, plurals, confusions', ''], 'apos': ['Typographical apostrophe', 'Detects typewriter apostrophes. You may get automatically typographical apostrophes in Tools > Autocorrect options > Localized options > Single quote > Replace (checkbox).'], 'neg': ['Negation adverb [!]', 'Ne … pas, ne … jamais, etc.'], 'mapos': ['Missing apostrophes after single letters [!]', 'Missing apostrophes after l d s n c j m t ç. This option is mostly useful to detect defects of digitized texts and is not recommended for scientific texts.'], 'nf': ['French standards', ''], 'esp': ['Unuseful spaces', 'Checks spaces at the beginning and the end of lines.'], 'conj': ['Conjugation', 'Agreement between verbs and their subject.'], 'gn': ['Agreement (gender and number)', 'Agreement between nouns and adjectives.']}, 'fr': {'date': ['Validité des dates', ''], 'tu': ['Traits d’union', 'Cherche les traits d’union manquants ou inutiles.'], 'chim': ['Chimie [!]', 'Typographie des composés chimiques (H₂O, CO₂, etc.).'], 'mc': ['Mots composés [!]', 'Vérifie si les mots composés à trait d’union existent dans le dictionnaire (hormis ceux commençant par ex-, mi-, quasi-, semi-, non-, demi- et d’autres préfixes communs).'], 'vmode': ['Modes verbaux', ''], 'ppas': ['Participes passés, adjectifs', ''], 'imp': ['Impératif', 'Vérifie notamment la deuxième personne du singulier (par exemple, les erreurs : « vas … », « prend … », « manges … »).'], 'liga': ['Signaler ligatures typographiques', 'Ligatures de fi, fl, ff, ffi, ffl, ft, st.'], 'ocr': ['Erreurs de numérisation (OCR) [!]', 'Erreurs de reconnaissance optique des caractères. Beaucoup de faux positifs.'], 'style': ['Style', ''], 'sgpl': ['Pluriels (locutions)', 'Vérifie l’usage du pluriel ou du singulier dans certaines locutions.'], 'maj': ['Majuscules', 'Vérifie l’utilisation des majuscules et des minuscules (par exemple, « la raison d’État », « les Européens »).'], 'basic': ['Typographie', ''], 'num': ['Nombres', 'Espaces insécables sur les grands nombres (> 10 000). Vérifie la présence de « O » au lieu de « 0 ».'], 'redon1': ['Répétitions dans le paragraphe [!]', 'Sont exclus les mots grammaticaux, ceux commençant par une majuscule, ainsi que “être” et “avoir”.'], 'misc': ['Divers', ''], 'bs': ['Populaire', 'Souligne un langage courant considéré comme erroné, comme « malgré que ».'], 'pleo': ['Pléonasmes', 'Repère des redondances sémantiques, comme « au jour d’aujourd’hui », « monter en haut », etc.'], '__optiontitle__': 'Grammalecte (Français)', 'typo': ['Signes typographiques', ''], 'redon2': ['Répétitions dans la phrase [!]', 'Sont exclus les mots grammaticaux, ainsi que “être” et “avoir”.'], 'unit': ['Espaces insécables avant unités de mesure', ''], 'infi': ['Infinitif', 'Confusion entre l’infinitif et d’autres formes.'], 'verbs': ['Verbes', ''], 'idrule': ['Identifiant des règles de contrôle [!]', 'Affiche l’identifiant de la règle de contrôle dans les messages d’erreur.'], 'debug': ['Débogage', ''], 'virg': ['Virgules', 'Virgules manquantes avant “mais”, “car” et “etc.”.'], 'conf': ['Confusions, homonymes et faux-amis', 'Cherche des erreurs souvent dues à l’homonymie (par exemple, les confusions entre « faîte » et « faite »).'], 'inte': ['Interrogatif', 'Vérifie les formes interrogatives et suggère de lier les pronoms personnels avec les verbes.'], 'nbsp': ['Espaces insécables', 'Vérifie les espaces insécables avec les ponctuations « ! ? : ; » (à désactiver si vous utilisez une police Graphite)'], 'gramm': ['Accords, pluriels et confusions', ''], 'apos': ['Apostrophe typographique', 'Correction des apostrophes droites. Automatisme possible dans le menu Outils > Options d’autocorrection > Options linguistiques > Guillemets simples > Remplacer (à cocher)'], 'neg': ['Adverbe de négation [!]', 'Ne … pas, ne … jamais, etc.'], 'mapos': ['Apostrophes manquantes après lettres isolées [!]', 'Apostrophes manquantes après les lettres l d s n c j m t ç. Cette option sert surtout à repérer les défauts de numérisation des textes et est déconseillée pour les textes scientifiques.'], 'nf': ['Normes françaises', ''], 'esp': ['Espaces surnuméraires', 'Signale les espaces inutiles en début et en fin de ligne.'], 'conj': ['Conjugaisons', 'Accord des verbes avec leur sujet.'], 'gn': ['Accords de genre et de nombre', 'Accords des noms et des adjectifs.']}};

exports.lStructOpt = lStructOpt;
exports.dOpt = dOpt;
exports.dOptLabel = dOptLabel;
