
import re
import sys
import traceback
import copy
import json
from distutils import file_util

from grammalecte.echo import echo


DEF = {}
FUNCTIONS = []

JSREGEXES = {}

WORDLIMITLEFT  = r"(?<![\w.,–-])"   # r"(?<![-.,—])\b"  seems slower
WORDLIMITRIGHT = r"(?![\w–-])"      # r"\b(?!-—)"       seems slower


def prepare_for_eval (s):
    s = re.sub(r"(select|exclude)[(][\\](\d+)", '\\1(dDA, m.start(\\2), m.group(\\2)', s)
    s = re.sub(r"define[(][\\](\d+)", 'define(dDA, m.start(\\1)', s)
    s = re.sub(r"(morph|morphex|displayInfo)[(][\\](\d+)", '\\1((m.start(\\2), m.group(\\2))', s)
    s = re.sub(r"(morph|morphex|displayInfo)[(]", '\\1(dDA, ', s)
    s = re.sub(r"(sugg\w+|switch\w+)\(@", '\\1(m.group(i[4])', s)
    s = re.sub(r"word\(\s*1\b", 'nextword1(s, m.end()', s)                          # word(1)
    s = re.sub(r"word\(\s*-1\b", 'prevword1(s, m.start()', s)                       # word(-1)
    s = re.sub(r"word\(\s*(\d)", 'nextword(s, m.end(), \\1', s)                     # word(n)
    s = re.sub(r"word\(\s*-(\d)", 'prevword(s, m.start(), \\1', s)                  # word(-n)
    s = re.sub(r"before\(\s*", 'look(s[:m.start()], ', s)                           # before(s)
    s = re.sub(r"after\(\s*", 'look(s[m.end():], ', s)                              # after(s)
    s = re.sub(r"textarea\(\s*", 'look(s, ', s)                                     # textarea(s)
    s = re.sub(r"before_chk1\(\s*", 'look_chk1(dDA, s[:m.start()], 0, ', s)         # before_chk1(s)
    s = re.sub(r"after_chk1\(\s*", 'look_chk1(dDA, s[m.end():], m.end(), ', s)      # after_chk1(s)
    s = re.sub(r"textarea_chk1\(\s*", 'look_chk1(dDA, s, 0, ', s)                   # textarea_chk1(s)
    s = re.sub(r"before0\(\s*", 'look(sx[:m.start()], ', s)                         # before0(s)
    s = re.sub(r"after0\(\s*", 'look(sx[m.end():], ', s)                            # after0(s)
    s = re.sub(r"textarea0\(\s*", 'look(sx, ', s)                                   # textarea0(s)
    s = re.sub(r"before0_chk1\(\s*", 'look_chk1(dDA, sx[:m.start()], 0, ', s)       # before0_chk1(s)
    s = re.sub(r"after0_chk1\(\s*", 'look_chk1(dDA, sx[m.end():], m.end(), ', s)    # after0_chk1(s)
    s = re.sub(r"textarea0_chk1\(\s*", 'look_chk1(dDA, sx, 0, ', s)                 # textarea0_chk1(s)
    s = re.sub(r"isEndOfNG\(\s*\)", 'isEndOfNG(dDA, s[m.end():], m.end())', s)      # isEndOfNG(s)
    s = re.sub(r"\bspell *[(]", '_oDict.isValid(', s)
    s = re.sub(r"[\\](\d+)", 'm.group(\\1)', s)
    return s


def py2js (sCode):
    "convert Python code to JavaScript code"
    # Python 2.x unicode strings
    sCode = re.sub('\\b[ur]"', '"', sCode)
    sCode = re.sub("\\b[ur]'", "'", sCode)
    # operators
    sCode = sCode.replace(" and ", " && ")
    sCode = sCode.replace(" or ", " || ")
    sCode = re.sub("\\bnot\\b", "!", sCode)
    sCode = re.sub("(.+) if (.+) else (.+)", "\\2 ? \\1 : \\3", sCode)
    # boolean
    sCode = sCode.replace("False", "false")
    sCode = sCode.replace("True", "true")
    sCode = sCode.replace("bool", "Boolean")
    # methods
    sCode = sCode.replace(".endswith", ".endsWith")
    sCode = sCode.replace(".find", ".indexOf")
    sCode = sCode.replace(".startswith", ".startsWith")
    sCode = sCode.replace(".lower", ".toLowerCase")
    sCode = sCode.replace(".upper", ".toUpperCase")
    sCode = sCode.replace(".isdigit", "._isDigit")
    sCode = sCode.replace(".isupper", "._isUpperCase")
    sCode = sCode.replace(".islower", "._isLowerCase")
    sCode = sCode.replace(".istitle", "._isTitle")
    sCode = sCode.replace(".capitalize", "._toCapitalize")
    sCode = sCode.replace(".strip", "._trim")
    sCode = sCode.replace(".lstrip", "._trimLeft")
    sCode = sCode.replace(".rstrip", "._trimRight")
    sCode = sCode.replace('.replace("."', ".replace(/\./g")
    sCode = sCode.replace('.replace("..."', ".replace(/\.\.\./g")
    sCode = re.sub('.replace\("([^"]+)" ?,', ".replace(/\\1/g,", sCode)
    # regex
    sCode = re.sub('re.search\("([^"]+)", *(m.group\(\\d\))\)', "(\\2.search(/\\1/) >= 0)", sCode)
    sCode = re.sub(".search\\(/\\(\\?i\\)([^/]+)/\\) >= 0\\)", ".search(/\\1/i) >= 0)", sCode)
    sCode = re.sub('(look\\(sx?[][.a-z:()]*), "\\(\\?i\\)([^"]+)"', "\\1, /\\2/i", sCode)
    sCode = re.sub('(look\\(sx?[][.a-z:()]*), "([^"]+)"', "\\1, /\\2/", sCode)
    sCode = re.sub('(look_chk1\\(dDA, sx?[][.a-z:()]*, [0-9a-z.()]+), "\\(\\?i\\)([^"]+)"', "\\1, /\\2/i", sCode)
    sCode = re.sub('(look_chk1\\(dDA, sx?[][.a-z:()]*, [0-9a-z.()]+), "([^"]+)"', "\\1, /\\2/i", sCode)
    sCode = sCode.replace("(?<!-)", "")  # todo
    # slices
    sCode = sCode.replace("[:m.start()]", ".slice(0,m.index)")
    sCode = sCode.replace("[m.end():]", ".slice(m.end[0])")
    sCode = re.sub("\\[(-?\\d+):(-?\\d+)\\]", ".slice(\\1,\\2)", sCode)
    sCode = re.sub("\\[(-?\\d+):\\]", ".slice(\\1)", sCode)
    sCode = re.sub("\\[:(-?\\d+)\\]", ".slice(0,\\1)", sCode)
    # regex matches
    sCode = sCode.replace(".end()", ".end[0]")
    sCode = sCode.replace(".start()", ".index")
    sCode = sCode.replace("m.group()", "m[0]")
    sCode = re.sub("\\.start\\((\\d+)\\)", ".start[\\1]", sCode)
    sCode = re.sub("m\\.group\\((\\d+)\\)", "m[\\1]", sCode)
    # tuples -> lists
    sCode = re.sub("\((m\.start\[\\d+\], m\[\\d+\])\)", "[\\1]", sCode)
    # regex
    sCode = sCode.replace("\w[\w-]+", "[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]+")
    sCode = sCode.replace(r"/\w/", "/[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]/")
    sCode = sCode.replace(r"[\w-]", "[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ-]")
    sCode = sCode.replace(r"[\w,]", "[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ,]")
    return sCode


def uppercase (s, sLang):
    "convert regex to uppercase regex: 'foo' becomes '[Ff][Oo][Oo]', but 'Bar' becomes 'B[Aa][Rr]'."
    sUp = ""
    state = 0
    for i in range(0, len(s)):
        c = s[i]
        if c == "[":
            state = 1
        if state == 1 and c == "]":
            state = 0
        if c == "<" and i > 3 and s[i-3:i] == "(?P":
            state = 2
        if state == 2 and c == ">":
            state = 0
        if c == "?" and i > 0 and s[i-1:i] == "(" and s[i+1:i+2] != ":":
            state = 5
        if state == 5 and c == ")":
            state = 0
        if c.isalpha() and c.islower() and state == 0:
            if c == "i" and (sLang == "tr" or sLang == "az"):
                sUp += "[İ" + c + "]"
            else:
                sUp += "[" + c.upper() + c + "]"
        elif c.isalpha() and c.islower() and state == 1 and s[i+1:i+2] != "-":
            if s[i-1:i] == "-" and s[i-2:i-1].islower():  # [a-z] -> [a-zA-Z]
                sUp += c + s[i-2:i-1].upper() + "-" + c.upper()
            elif c == "i" and (sLang == "tr" or sLang == "az"):
                sUp += "İ" + c
            else:
                sUp += c.upper() + c
        else:
            sUp += c
        if c == "\\":
            state = 4
        elif state == 4:
            state = 0
    return sUp


def countGroupInRegex (sRegex):
    try:
        return re.compile(sRegex).groups
    except:
        traceback.print_exc()
        echo(sRegex)
    return 0


def createRule (s, nIdLine, sLang, bParagraph):
    "returns rule as list [option name, regex, bCaseInsensitive, identifier, list of actions]"
    global JSREGEXES

    #### OPTIONS
    sRuleId = str(nIdLine) + ("p" if bParagraph else "s")
    sOption = False         # False or [a-z0-9]+ name
    tGroups = None          # code for groups positioning (only useful for JavaScript)
    cCaseMode = 'i'         # i: case insensitive,  s: case sensitive,  u: uppercasing allowed
    cWordLimitLeft = '['    # [: word limit, <: no specific limit
    cWordLimitRight = ']'   # ]: word limit, >: no specific limit
    m = re.match("^__([[<]\\w[]>])(/[a-zA-Z0-9]+|)__ *", s)
    if m:
        if m.group(1):
            cWordLimitLeft = m.group(1)[0]
            cCaseMode = m.group(1)[1]
            cWordLimitRight = m.group(1)[2]
        sOption = m.group(2)[1:]  if m.group(2)  else False
        s = s[m.end(0):]

    #### REGEX TRIGGER
    i = s.find(" <<-")
    if i == -1:
        print("# Error: no condition at line " + sRuleId)
        return None
    sRegex = s[:i].strip()
    s = s[i+4:]
    
    # JS groups positioning codes
    m = re.search("@@\\S+", sRegex)
    if m:
        tGroups = groupsPositioningCodeToList(sRegex[m.start()+2:])
        sRegex = sRegex[:m.start()].strip()
    # JS regex
    m = re.search("<js>.+</js>i?", sRegex)
    if m:
        JSREGEXES[sRuleId] = m.group(0)
        sRegex = sRegex[:m.start()].strip()
    if "<js>" in sRegex or "</js>" in sRegex:
        print("# Error: JavaScript regex not delimited at line " + sRuleId)
        return None

    # quotes ?
    if sRegex.startswith('"') and sRegex.endswith('"'):
        sRegex = sRegex[1:-1]

    ## definitions
    for sDef, sRepl in DEF.items():
        sRegex = sRegex.replace(sDef, sRepl)

    ## count number of groups (must be done before modifying the regex)
    nGroup = countGroupInRegex(sRegex)
    if nGroup > 0:
        if not tGroups:
            print("# warning: groups positioning code for JavaScript should be defined at line " + sRuleId)
        else:
            if nGroup != len(tGroups):
                print("# error: groups positioning code irrelevant at line " + sRuleId)

    ## word limit
    if cWordLimitLeft == '[' and not sRegex.startswith(("^", '’', "'", ",")):
        sRegex = WORDLIMITLEFT + sRegex
    if cWordLimitRight == ']' and not sRegex.endswith(("$", '’', "'", ",")):
        sRegex = sRegex + WORDLIMITRIGHT

    ## casing mode
    if cCaseMode == "i":
        bCaseInsensitive = True
        if not sRegex.startswith("(?i)"):
            sRegex = "(?i)" + sRegex
    elif cCaseMode == "s":
        bCaseInsensitive = False
        sRegex = sRegex.replace("(?i)", "")
    elif cCaseMode == "u":
        bCaseInsensitive = False
        sRegex = sRegex.replace("(?i)", "")
        sRegex = uppercase(sRegex, sLang)
    else:
        print("# Unknown case mode [" + cCaseMode + "] at line " + sRuleId)

    ## check regex
    try:
        z = re.compile(sRegex)
    except:
        print("# Regex error at line ", nIdLine)
        echo(sRegex)
        traceback.print_exc()
        return None
    ## groups in non grouping parenthesis
    for x in re.finditer("\(\?:[^)]*\([[\w -]", sRegex):
        print("# Warning: groups inside non grouping parenthesis in regex at line " + sRuleId)

    #### PARSE ACTIONS
    lActions = []
    nAction = 1
    for sAction in s.split(" <<- "):
        t = createAction(sRuleId + "_" + str(nAction), sAction, nGroup)
        nAction += 1
        if t:
            lActions.append(t)
    if not lActions:
        return None

    return [sOption, sRegex, bCaseInsensitive, sRuleId, lActions, tGroups]


def createAction (sIdAction, sAction, nGroup):
    "returns an action to perform as a tuple (condition, action type, action[, iGroup [, message, URL ]])"
    global FUNCTIONS

    m = re.search(r"([-~=])(\d*|)>> ", sAction)
    if not m:
        echo("# No action at line " + sIdAction)
        return None

    #### CONDITION
    sCondition = sAction[:m.start()].strip()
    if sCondition:
        sCondition = prepare_for_eval(sCondition)
        FUNCTIONS.append(("c"+sIdAction, sCondition))
        for x in re.finditer("[.](?:group|start|end)[(](\d+)[)]", sCondition):
            if int(x.group(1)) > nGroup:
                print("# Error in groups in condition at line " + sIdAction + " ("+str(nGroup)+" groups only)")
        if ".match" in sCondition:
            echo("# Error. JS compatibility. Don't use .match() in condition, use .search()")
        sCondition = "c"+sIdAction
    else:
        sCondition = None

    #### iGroup / positioning
    iGroup = int(m.group(2)) if m.group(2) else 0
    if iGroup > nGroup:
        echo("# Selected group > group number in regex at line " + sIdAction)
    
    #### ACTION
    sAction = sAction[m.end():].strip()
    cAction = m.group(1)
    if cAction == "-":
        ## error
        iMsg = sAction.find(" # ")
        sMsg = sAction[iMsg+3:].strip()
        sAction = sAction[:iMsg].strip()
        sURL = ""
        mURL = re.search("[|] *(https?://.*)", sMsg)
        if mURL:
            sURL = mURL.group(1).strip()
            sMsg = sMsg[:mURL.start(0)].strip()
        if sMsg[0:1] == "=":
            sMsg = prepare_for_eval(sMsg[1:])
            FUNCTIONS.append(("m"+sIdAction, sMsg))
            for x in re.finditer("group[(](\d+)[)]", sMsg):
                if int(x.group(1)) > nGroup:
                    print("# error in groups in message at line " + sIdAction + " ("+str(nGroup)+" groups only)")
            sMsg = "=m"+sIdAction
        else:
            for x in re.finditer(r"\\(\d+)", sMsg):
                if int(x.group(1)) > nGroup:
                    print("# error in groups in message at line " + sIdAction + " ("+str(nGroup)+" groups only)")
            if re.search("[.]\\w+[(]", sMsg):
                print("# error in message at line " + sIdAction + ":  This message looks like code. Line should begin with =")
            
    if sAction[0:1] == "=" or cAction == "=":
        if "define" in sAction and not re.search(r"define\(\\\d+ *, *\[.*\] *\)", sAction):
            print("# error in action at line " + sIdAction + ": second argument for define must be a list of strings")
        sAction = prepare_for_eval(sAction)
        sAction = sAction.replace("m.group(i[4])", "m.group("+str(iGroup)+")")
        for x in re.finditer("group[(](\d+)[)]", sAction):
            if int(x.group(1)) > nGroup:
                print("# error in groups in replacement at line " + sIdAction + " ("+str(nGroup)+" groups only)")
    else:
        for x in re.finditer(r"\\(\d+)", sAction):
            if int(x.group(1)) > nGroup:
                print("# error in groups in replacement at line " + sIdAction + " ("+str(nGroup)+" groups only)")
        if re.search("[.]\\w+[(]", sAction):
            print("# error in action at line " + sIdAction + ":  This action looks like code. Line should begin with =")

    if cAction == "-":
        ## error detected
        if sAction[0:1] == "=":
            FUNCTIONS.append(("s"+sIdAction, sAction[1:]))
            sAction = "=s"+sIdAction
        elif sAction.startswith('"') and sAction.endswith('"'):
            sAction = sAction[1:-1]
        return [sCondition, cAction, sAction, iGroup, sMsg, sURL]
    elif cAction == "~":
        ## text preprocessor
        if sAction[0:1] == "=":
            if sAction[1:2] == "@":
                FUNCTIONS.append(("p"+sIdAction, sAction[2:]))
                sAction = "=@p"+sIdAction
            else:
                FUNCTIONS.append(("p"+sIdAction, sAction[1:]))
                sAction = "=p"+sIdAction
        return [sCondition, cAction, sAction, iGroup]
    elif cAction == "=":
        ## disambiguator
        if sAction[0:1] == "=":
            sAction = sAction[1:]
        FUNCTIONS.append(("d"+sIdAction, sAction))
        sAction = "d"+sIdAction
        return [sCondition, cAction, sAction]
    else:
        echo("# Unknown action at line " + sIdAction)
        return None


def regex2js (sRegex):
    "converts Python regex to JS regex and returns JS regex and list of negative lookbefore assertions"
    #   Latin letters: http://unicode-table.com/fr/
    #   0-9
    #   A-Z
    #   a-z
    #   À-Ö     00C0-00D6   (upper case)
    #   Ø-ß     00D8-00DF   (upper case)
    #   à-ö     00E0-00F6   (lower case)
    #   ø-ÿ     00F8-00FF   (lower case)
    #   Ā-ʯ     0100-02AF   (mixed)
    #   -> a-zA-Zà-ö0-9À-Öø-ÿØ-ßĀ-ʯ
    bCaseInsensitive = False
    if "(?i)" in sRegex:
        sRegex = sRegex.replace("(?i)", "")
        bCaseInsensitive = True
    lNegLookBeforeRegex = []
    if WORDLIMITLEFT in sRegex:
        sRegex = sRegex.replace(WORDLIMITLEFT, "")
        lNegLookBeforeRegex = ["[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ.,–-]$"]
    sRegex = sRegex.replace("[\\w", "[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ")
    sRegex = sRegex.replace("\\w", "[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯ]")
    sRegex = sRegex.replace("[.]", r"\.")
    if not sRegex.startswith("<js>"):
        sRegex = sRegex.replace("/", r"\/")
    m = re.search(r"\(\?<!([^()]+)\)", sRegex)  # Negative lookbefore assertion should always be at the beginning of regex
    if m:
        lNegLookBeforeRegex.append(m.group(1)+"$")
        sRegex = sRegex.replace(m.group(0), "")
    if "(?<" in sRegex:
        echo("# Warning. Lookbefore assertion not changed in:\n  ")
        echo(sRegex)
    if sRegex.startswith("<js>"):
        sRegex = sRegex.replace('<js>', '/').replace('</js>i', '/ig').replace('</js>', '/g')
    else:
        sRegex = "/" + sRegex + "/g"
    if bCaseInsensitive and not sRegex.endswith("/ig"):
        sRegex = sRegex + "i"
    if not lNegLookBeforeRegex:
        lNegLookBeforeRegex = None
    return (sRegex, lNegLookBeforeRegex)


def pyRuleToJS (lRule):
    lRuleJS = copy.deepcopy(lRule)
    del lRule[-1] # tGroups positioning codes are useless for Python
    # error messages
    for aAction in lRuleJS[4]:
        if aAction[1] == "-":
            aAction[4] = aAction[4].replace("« ", "«&nbsp;").replace(" »", "&nbsp;»")
    # js regexes
    lRuleJS[1], lNegLookBehindRegex = regex2js( JSREGEXES.get(lRuleJS[3], lRuleJS[1]) )
    lRuleJS.append(lNegLookBehindRegex)
    return lRuleJS


def writeRulesToJSArray_old (lRules):
    s = "[\n"
    for lRule in lRules:
        # [sOption, sRegex, bCaseInsensitive, sRuleId, lActions, aGroups, aNegLookBehindRegex]
        s += '  ["' + lRule[0] + '", '  if lRule[0]  else  "  [false, "
        s += lRule[1] + ", "
        s += "true, " if lRule[2]  else "false, "
        s += '"' + lRule[3] + '", '
        s += json.dumps(lRule[4], ensure_ascii=False) + ", "
        s += json.dumps(lRule[5], ensure_ascii=False) + ", "
        s += json.dumps(lRule[6], ensure_ascii=False) + "],\n"
    s += "]"
    return s


def writeRulesToJSArray (lRules):
    s = "[\n"
    for sOption, aRuleGroup in lRules:
        s += '  ["' + sOption + '", [\n'  if sOption  else  "  [false, [\n"
        for lRule in aRuleGroup:
            # [sRegex, bCaseInsensitive, sRuleId, lActions, aGroups, aNegLookBehindRegex]
            s += '    [' + lRule[0] + ", "
            s += "true, " if lRule[1]  else "false, "
            s += '"' + lRule[2] + '", '
            s += json.dumps(lRule[3], ensure_ascii=False) + ", "
            s += json.dumps(lRule[4], ensure_ascii=False) + ", "
            s += json.dumps(lRule[5], ensure_ascii=False) + "],\n"
        s += "  ]],\n"
    s += "]"
    return s


def groupsPositioningCodeToList (sGroupsPositioningCode):
    if not sGroupsPositioningCode:
        return None
    return [ int(sCode)  if sCode.isdigit() or (sCode[0:1] == "-" and sCode[1:].isdigit())  else sCode \
             for sCode in sGroupsPositioningCode.split(",") ]


def displayStats (lRules):
    print("{:>2} {:>18} {:>18} {:>18} {:>18}".format("#", "DISAMBIGUATOR", "TEXT PROCESSOR", "GRAMMAR CHECKING", "RULES"))
    for i in range(len(lRules)):
        d = {'=':0, '~': 0, '-': 0}
        for aRule in lRules[i]:
            for aAction in aRule[4]:
                d[aAction[1]] = d[aAction[1]] + 1
        print("{:>2} {:>18} {:>18} {:>18} {:>18}".format(i, d['='], d['~'], d['-'], len(lRules[i])))


def mergeRulesByOption (lRules):
    "returns a list of tuples [option, list of rules] keeping the rules order"
    lFinal = []
    lTemp = []
    sOption = None
    for aRule in lRules:
        if aRule[0] != sOption:
            if sOption != None:
                lFinal.append([sOption, lTemp])
            # new tuple
            sOption = aRule[0]
            lTemp = []
        lTemp.append(aRule[1:])
    lFinal.append([sOption, lTemp])
    return lFinal


def make (lRules, sLang, bJavaScript):
    "compile rules"

    # removing comments, zeroing empty lines, creating definitions
    global DEF
    lLine = []
    lTest = []
    for i, sLine in enumerate(lRules):
        if sLine.startswith('#END'):
            break
        elif sLine.startswith("#"):
            lLine.append("")
        elif sLine.startswith("DEF:"):
            m = re.match("DEF: +([a-zA-Z_][a-zA-Z_0-9]*) +(.+)$", sLine.strip())
            if m:
                DEF["{"+m.group(1)+"}"] = m.group(2)
            else:
                print("Error in definition: ", end="")
                echo(sLine.strip())
            lLine.append("")
        elif sLine.startswith("TEST:"):
            lTest.append("{:<8}".format(i+1) + "  " + sLine[5:].lstrip())
            lLine.append("")
        elif sLine.startswith("TODO:"):
            lLine.append("")
        elif re.match("[  \t]+$", sLine):
            lLine.append("")
        else:
            lLine.append(sLine)

    # generating test files
    with open("tests/"+sLang+"/gc_test.txt", "w", encoding="utf-8") as hDstPy, \
         open("gc_lang/"+sLang+"/modules-js/tests_data.js", "w", encoding="utf-8") as hDstJS:
        hDstPy.write("# TESTS FOR LANG ["+sLang+"]\n\n")
        hDstJS.write("// JavaScript\n//Tests (generated code, do not edit)\n\nconst aData = [\n")
        for sLine in lTest:
            hDstPy.write(sLine)
            hDstJS.write('    ' + json.dumps(sLine.strip(), ensure_ascii=False) +',\n')
        hDstJS.write("];\nexports.aData = aData;\n")

    # concatenate multiline commands
    dLineIndex = {}
    sStack = ""
    for i in range(len(lLine)-1, -1, -1):
        if lLine[i].startswith(("    ", "\t")):
            sStack = lLine[i].strip() + " " + sStack
            del lLine[i]
        elif lLine[i] == "":
            del lLine[i]
        else:
            lLine[i] = lLine[i].strip() + " " + sStack
            lLine[i] = lLine[i].strip()
            dLineIndex[lLine[i]] = i + 1  # +1 because in text editor, line number begins by 1.
            sStack = ""

    # processing
    bParagraph = True
    lParagraphRules = []
    lSentenceRules = []
    lParagraphRulesJS = []
    lSentenceRulesJS = []

    for sLine in lLine:
        if sLine:
            if sLine == "[++]":
                bParagraph = False
            else:
                lRule = createRule(sLine, dLineIndex[sLine], sLang, bParagraph)
                if lRule:
                    if bParagraph:
                        lParagraphRules.append(lRule)
                        lParagraphRulesJS.append(pyRuleToJS(lRule))
                    else:
                        lSentenceRules.append(lRule)
                        lSentenceRulesJS.append(pyRuleToJS(lRule))

    # creating file with all functions callable by rules
    with open("gc_lang/"+sLang+"/modules/gc_tmp_eval.py", "w", encoding="utf-8") as hDstPy, \
         open("gc_lang/"+sLang+"/modules-js/gc_tmp_eval.js", "w", encoding="utf-8") as hDstJS:
        hDstPy.write("# generated code, do not edit\n")
        hDstJS.write("// generated code, do not edit\nvar oEvalFunc = {\n")
        for sFuncName, sReturn in FUNCTIONS:
            cType = sFuncName[0:1]
            if cType == "c": # condition
                sParams = "s, sx, m, dDA, sCountry"
            elif cType == "m": # message
                sParams = "s, m"
            elif cType == "s": # suggestion
                sParams = "s, m"
            elif cType == "p": # preprocessor
                sParams = "s, m"
            elif cType == "d": # disambiguator
                sParams = "s, m, dDA"
            else:
                print("# Unknown function type in [" + sFuncName + "]")
                continue
            hDstPy.write("def {} ({}):\n".format(sFuncName, sParams))
            hDstPy.write("    return " + sReturn + "\n")
            hDstJS.write("    {}: function ({})".format(sFuncName, sParams) + " {\n")
            hDstJS.write("        return " + py2js(sReturn) + ";\n")
            hDstJS.write("    },\n")
        hDstJS.write("}\n")

    displayStats([lParagraphRules, lSentenceRules])

    return { "paragraph_rules": mergeRulesByOption(lParagraphRules),
             "sentence_rules": mergeRulesByOption(lSentenceRules),
             "paragraph_rules_JS": writeRulesToJSArray(mergeRulesByOption(lParagraphRulesJS)),
             "sentence_rules_JS": writeRulesToJSArray(mergeRulesByOption(lSentenceRulesJS))  }
