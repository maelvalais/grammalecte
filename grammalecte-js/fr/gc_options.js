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


const lStructOpt = [['basic', [['typo', 'apos'], ['esp', 'nbsp'], ['tu', 'maj'], ['num', 'virg'], ['unit', 'nf'], ['liga', 'mapos'], ['chim', 'ocr']]], ['gramm', [['conf', 'sgpl'], ['gn']]], ['verbs', [['infi', 'gv'], ['imp', 'inte']]], ['style', [['bs', 'pleo'], ['redon1', 'redon2'], ['neg']]], ['misc', [['date', 'mc']]], ['debug', [['idrule']]]];

const dOpt = new Map ([['redon2', false], ['conf', true], ['apos', true], ['infi', true], ['gn', true], ['redon1', false], ['virg', true], ['inte', true], ['nbsp', false], ['date', true], ['liga', false], ['maj', true], ['unit', true], ['html', true], ['mapos', false], ['tu', true], ['pleo', true], ['num', true], ['imp', true], ['gv', true], ['neg', false], ['ocr', false], ['esp', false], ['sgpl', true], ['chim', false], ['nf', true], ['typo', true], ['idrule', false], ['mc', false], ['bs', true]]);

const dOptLabel = {'fr': {'redon2': ('Répétitions dans la phrase [!]', 'Sont exclus les mots grammaticaux, ainsi que “être” et “avoir”.'), 'conf': ('Confusions, homonymes et faux-amis', 'Cherche des erreurs souvent dues à l’homonymie (par exemple, les confusions entre « faîte » et « faite »).'), 'apos': ('Apostrophe typographique', 'Correction des apostrophes droites. Automatisme possible dans le menu Outils > Options d’autocorrection > Options linguistiques > Guillemets simples > Remplacer (à cocher)'), 'infi': ('Infinitif', 'Confusion entre l’infinitif et d’autres formes.'), 'gn': ('Accords de genre et de nombre', 'Accords des noms et des adjectifs.'), 'basic': ('Typographie', ''), 'virg': ('Virgules', 'Virgules manquantes avant “mais”, “car” et “etc.”.'), 'inte': ('Interrogatif', 'Vérifie les formes interrogatives et suggère de lier les pronoms personnels avec les verbes.'), 'nbsp': ('Espaces insécables', 'Vérifie les espaces insécables avec les ponctuations « ! ? : ; » (à désactiver si vous utilisez une police Graphite)'), 'date': ('Validité des dates', ''), 'misc': ('Divers', ''), 'liga': ('Signaler ligatures typographiques', 'Ligatures de fi, fl, ff, ffi, ffl, ft, st.'), 'verbs': ('Verbes', ''), 'gramm': ('Accords, pluriels et confusions', ''), 'unit': ('Espaces insécables avant unités de mesure', ''), 'eif': ('Espaces insécables fines [!]', 'Pour placer des espaces insécables fines avant les ponctuations « ? ! ; »'), 'mapos': ('Apostrophes manquantes après lettres isolées [!]', 'Apostrophes manquantes après les lettres l d s n c j m t ç. Cette option sert surtout à repérer les défauts de numérisation des textes et est déconseillée pour les textes scientifiques.'), 'tu': ('Traits d’union', 'Cherche les traits d’union manquants ou inutiles.'), 'pleo': ('Pléonasmes', 'Repère des redondances sémantiques, comme « au jour d’aujourd’hui », « monter en haut », etc.'), 'num': ('Nombres', 'Espaces insécables sur les grands nombres (> 10 000). Vérifie la présence de « O » au lieu de « 0 ».'), 'imp': ('Impératif', 'Vérifie notamment la deuxième personne du singulier (par exemple, les erreurs : « vas … », « prend … », « manges … »).'), 'idrule': ('Identifiant des règles de contrôle [!]', 'Affiche l’identifiant de la règle de contrôle dans les messages d’erreur.'), 'gv': ('Conjugaisons', 'Accord des verbes avec leur sujet.'), 'neg': ('Adverbe de négation [!]', 'Ne … pas, ne … jamais, etc.'), 'ocr': ('Erreurs de numérisation (OCR) [!]', 'Erreurs de reconnaissance optique des caractères. Beaucoup de faux positifs.'), 'esp': ('Espaces surnuméraires', 'Signale les espaces inutiles en début et en fin de ligne.'), 'redon1': ('Répétitions dans le paragraphe [!]', 'Sont exclus les mots grammaticaux, ceux commençant par une majuscule, ainsi que “être” et “avoir”.'), 'sgpl': ('Pluriels (locutions)', 'Vérifie l’usage du pluriel ou du singulier dans certaines locutions.'), 'chim': ('Chimie [!]', 'Typographie des composés chimiques (H₂O, CO₂, etc.).'), 'nf': ('Normes françaises', ''), 'typo': ('Signes typographiques', ''), 'maj': ('Majuscules', 'Vérifie l’utilisation des majuscules et des minuscules (par exemple, « la raison d’État », « les Européens »).'), 'debug': ('Débogage', ''), 'mc': ('Mots composés [!]', 'Vérifie si les mots composés à trait d’union existent dans le dictionnaire (hormis ceux commençant par ex-, mi-, quasi-, semi-, non-, demi- et d’autres préfixes communs).'), 'bs': ('Populaire', 'Souligne un langage courant considéré comme erroné, comme « malgré que ».'), 'style': ('Style', '')}, 'en': {'redon2': ('Duplicates in sentence [!]', 'Are excluded grammatical words, and also “être” and “avoir”.'), 'conf': ('Confusions, homonyms and false friends', 'Seeks errors often due to homonymy (i.e. confusions between « faîte » et « faite »).'), 'apos': ('Typographical apostrophe', 'Detects typewriter apostrophes. You may get automatically typographical apostrophes in Tools > Autocorrect options > Localized options > Single quote > Replace (checkbox).'), 'infi': ('Infinitive', 'Checks confusions between infinitive forms and other forms.'), 'gn': ('Agreement (gender and number)', 'Agreement between nouns and adjectives.'), 'basic': ('Typography', ''), 'virg': ('Commas', 'Missing commas before “mais”, “car” and “etc.”.'), 'inte': ('Interrogative mood', 'Checks interrogative forms and suggests linking the personal pronouns with verbs.'), 'nbsp': ('Non-breakable spaces', 'Checks the use of non-breakable spaces with the following punctuation marks: « ! ? : ; » (deactivate it if you use a Graphite font)'), 'date': ('Date validity', ''), 'misc': ('Miscellaneous', ''), 'liga': ('Report typographical ligatures', 'Ligatures of fi, fl, ff, ffi, ffl, ft, st.'), 'verbs': ('Verbs', ''), 'gramm': ('Agreement, plurals, confusions', ''), 'unit': ('Non-breaking spaces before units of measurement', ''), 'eif': ('Narrow non breaking spaces [!]', 'To set narrow non breaking spaces before the characters “? ! ;”'), 'mapos': ('Missing apostrophes after single letters [!]', 'Missing apostrophes after l d s n c j m t ç. This option is mostly useful to detect defects of digitized texts and is not recommended for scientific texts.'), 'tu': ('Hyphens', 'Checks missing or useless hyphens.'), 'pleo': ('Pleonasms', 'Semantic replications, like « au jour d’aujourd’hui », « monter en haut », etc.'), 'num': ('Numbers', 'Large numbers and « O » instead of « 0 ».'), 'imp': ('Imperative mood', 'Checks particularly verbs at second person singular (i.e. errors such as: « vas … », « prend … », « manges … »).'), 'idrule': ('Display control rule identifier [!]', 'Display control rule identifier in the context menu message'), 'gv': ('Conjugation', 'Agreement between verbs and their subject.'), 'neg': ('Negation adverb [!]', 'Ne … pas, ne … jamais, etc.'), 'ocr': ('OCR errors [!]', 'Warning: many false positives.'), 'esp': ('Unuseful spaces', 'Checks spaces at the beginning and the end of lines.'), 'redon1': ('Duplicates in paragraph [!]', 'Are excluded grammatical words, words beginning by a capital letter, and also “être” and “avoir”.'), 'sgpl': ('Plural (locutions)', 'Checks the use of plural and singular in locutions.'), 'chim': ('Chemistry [!]', 'Typography for molecules (H₂O, CO₂, etc.)'), 'nf': ('French standards', ''), 'typo': ('Typographical glyphs', ''), 'maj': ('Capitals', 'Checks the use of uppercase and lowercase letters (i.e. « la raison d’État », « les Européens »).'), 'debug': ('Debug', ''), 'mc': ('Compound words [!]', 'Check if words with hyphen exist in the dictionary (except those beginning by ex-, mi-, quasi-, semi-, non-, demi- and other common prefixes)'), 'bs': ('Popular style', 'Underlines misuse of language though informal and commonly used.'), 'style': ('Style', '')}};

exports.lStructOpt = lStructOpt;
exports.dOpt = dOpt;
exports.dOptLabel = dOptLabel;
