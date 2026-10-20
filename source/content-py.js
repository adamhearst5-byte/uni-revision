/* COM161 Problem Solving for Computing. Notation: «inline code», ~~~ fenced code blocks, {{answer|alt}} blanks. */
window.COURSE = window.COURSE || { modules: [] };
window.COURSE.modules.push({
  id: 'py',
  code: 'COM161',
  name: 'Problem Solving for Computing',
  short: 'Problem Solving',
  topics: [

/* ------------------------------------------------------------------ */
{
  id: 'py1', week: 1, title: 'How programs work',
  summary: 'Hardware and software, the CPU and fetch-decode-execute, machine code, compilers vs interpreters, and how Python runs your code.',
  notes: `
## Software
A **program** is a set of instructions the computer (hardware) executes to perform a task. A **programmer** designs, creates and tests programs.
- **Application software**: everyday tasks (word processing, email, games, browsers).
- **System software**: controls and manages the computer. Includes the **operating system**, **utility programs** and **software development tools**.

## The CPU
The **Central Processing Unit** is the most important hardware component. It performs simple operations on data (read, write, add, subtract, multiply, divide) and only understands **machine language** for its own instruction set.

Programs are copied from secondary storage into **RAM** to run, and the CPU repeats the **fetch → decode → execute** cycle.

## Machine language and beyond
- Machine code is binary: «1001 1110 0000 1010» is 9, 14, 0, 10, or «9E0A» in hexadecimal (each group of four bits is one hex digit).
- **Assembly language** is low-level and close to machine code.
- **High-level languages** (like Python) are closer to English. Their parts: **key words** (reserved words), **operators**, **syntax** (the rules), and **statements** (individual instructions).

## Compilers and interpreters
Every high-level program must be translated into machine language.
| | Compiler | Interpreter |
|---|---|---|
| How | Translates the whole program into a separate machine-language program | Translates and executes one instruction at a time, each time it runs |
| Output | An executable you can run any time | No separate machine-language program |

Python is usually called **interpreted**, but more precisely it compiles source code to **bytecode**, which the **Python Virtual Machine** then interprets. You never run the compiler yourself.

**Source code** is what the programmer writes. A **syntax error** stops code being translated.

## The big four of programming
**Input** (keyboard), **processing** (calculations), **output** (screen), plus **variables** to store data.

## Running Python
- **Interactive mode**: type statements at the «>>>» prompt. Good for trying things; nothing is saved.
- **Script mode**: save statements in a file ending **.py** and run «python filename.py».
- **IDEs** (IDLE, PyCharm, VS Code, Replit) add formatting, colour coding, code completion and debugging. COM161 moves from IDLE to **PyCharm** in week 5.

## Python facts
Created by **Guido van Rossum** (started 1989, named after Monty Python). Python 3 arrived in 2008. Used by Google, NASA, YouTube, Dropbox, Instagram, Spotify, Netflix and in data science.

## Asking GOOD questions
- **G**ive context on what you are trying to do.
- **O**utline what you have already tried.
- **O**ffer your best guess at the problem.
- **D**emo it: the code, the traceback and the steps that caused it.

## COM161 assessment
- Formative progress tests in the **week 3 and week 5** labs (mandatory).
- **Class Test 1 (40%)** in week 7: about 35 multiple-choice questions, about 90 minutes, closed book but study notes allowed.
- **Class Test 2 (60%)** in week 13: practical coding under exam conditions, about 12 to 15 questions, 90 minutes. Practice tasks are released in week 8.
`,
  cards: [
    ['What is a program?', 'A set of instructions that the computer hardware executes to perform a task.'],
    ['Application vs system software', 'Application: everyday tasks (email, games). System: controls the computer (OS, utilities, development tools).'],
    ['The CPU cycle', 'Fetch → decode → execute.'],
    ['What language does a CPU understand?', 'Machine language (binary) for its own instruction set.'],
    ['Binary 1001 1110 0000 1010 in hex', '9E0A (each group of four bits is one hex digit: 9, E=14, 0, A=10).'],
    ['Compiler', 'Translates a whole high-level program into a separate machine-language program that can be run any time.'],
    ['Interpreter', 'Translates and executes high-level instructions one at a time, each time the program runs.'],
    ['How does Python really run code?', 'It compiles source to bytecode, which the Python Virtual Machine interprets.'],
    ['Interactive vs script mode', 'Interactive: type at >>>, nothing saved. Script: save in a .py file and run it.'],
    ['What is an IDE?', 'Integrated Development Environment: an editor with formatting, colour coding, code completion and debugging (e.g. PyCharm, IDLE, VS Code).'],
    ['Who created Python?', 'Guido van Rossum, starting in 1989.'],
    ['GOOD questions', 'Give context, Outline what you tried, Offer your best guess, Demo the problem (code + traceback).'],
    ['Syntax', 'The set of rules you must follow when writing a program.'],
    ['COM161 Class Test 1', 'Week 7, 40%, about 35 multiple-choice questions, about 90 minutes.'],
  ],
  mcq: [
    ['Which is system software?', ['A web browser', 'An operating system', 'A game', 'A word processor'], 1, 'The OS controls the hardware; the others are application software.'],
    ['The CPU repeats which cycle?', ['Input-process-output', 'Fetch-decode-execute', 'Compile-link-run', 'Read-write-delete'], 1, 'Fetch-decode-execute.'],
    ['What does an interpreter do?', ['Produces a separate executable file', 'Translates and runs one instruction at a time', 'Only checks spelling', 'Converts Python to Java'], 1, 'No separate machine-language program is produced.'],
    ['Python source code is first compiled into…', ['Machine code', 'Assembly', 'Bytecode', 'HTML'], 2, 'The Python Virtual Machine then interprets the bytecode.'],
    ['What file extension must a Python script have?', ['.python', '.pt', '.py', '.exe'], 2, '.py'],
    ['Which mode does NOT save your code?', ['Script mode', 'Interactive mode', 'PyCharm projects', 'IDLE editor window'], 1, 'Statements typed at >>> are not saved as a program.'],
    ['Binary 1010 is which hex digit?', ['8', '9', 'A', 'F'], 2, '1010 is 10, which is A in hexadecimal.'],
    ['Which is NOT one of the "big four" concepts?', ['Input', 'Processing', 'Output', 'Compiling'], 3, 'Input, processing, output, plus variables.'],
    ['An error that stops code being translated is a…', ['Logic error', 'Syntax error', 'Runtime exception', 'Hardware fault'], 1, 'Syntax errors break the language rules.'],
    ['Class Test 1 for COM161 takes place in…', ['Week 3', 'Week 5', 'Week 7', 'Week 13'], 2, 'Weeks 3 and 5 are formative progress tests; Class Test 1 is week 7.'],
  ],
  blanks: [
    'The CPU executes programs using the {{fetch}}-{{decode}}-execute cycle.',
    'A {{compiler}} translates a whole program into a separate machine-language program.',
    'Python compiles source code into {{bytecode}}, run by a virtual machine.',
    'At the «>>>» prompt Python is in {{interactive}} mode.',
    'Python scripts must be saved with the extension {{.py|py}}.',
    'Python was created by Guido van {{Rossum}}.',
    'An {{IDE}} provides colour coding, code completion and debugging.',
  ],
  exercises: [
    {
      title: 'Explain it in your own words',
      task: `Without looking at the notes, write two or three sentences for each:
1. The difference between a compiler and an interpreter.
2. Why Python is "partly compiled".
3. When you would use interactive mode and when you would use script mode.`,
      solution: `1. A compiler translates the whole program once into a machine-language file that can be run later. An interpreter translates and runs one instruction at a time every time the program runs, with no separate machine-code file.
2. Python compiles your .py file into bytecode automatically, then the Python Virtual Machine interprets the bytecode. So there is a compile step, but you never see it.
3. Interactive mode is for quick experiments and checking how something works. Script mode is for any real program you want to save, rerun and hand in.`
    },
    {
      title: 'Binary to hex',
      task: 'Convert 0011 1111 1000 0001 to hexadecimal and to four decimal values, one per group of four bits.',
      solution: '0011 = 3, 1111 = 15 (F), 1000 = 8, 0001 = 1, so the hex is **3F81**.'
    },
  ]
},

/* ------------------------------------------------------------------ */
{
  id: 'py2', week: 2, title: 'Input, processing and output',
  summary: 'Designing with pseudocode and flowcharts, print, variables, data types, input and type conversion, operators, formatting output and named constants.',
  notes: `
## Designing a program
Program development cycle: requirements gathering → analysis and specification → **design** → implementation (coding) → testing and integration → deployment and maintenance.

An **algorithm** is a set of well-defined logical steps to perform a task. Two design tools:
- **Pseudocode**: informal "fake code" with no strict syntax, focused on the logic. It is not executed.
- **Flowcharts**: diagrams with standard symbols.

| Symbol | Shape | Use |
|---|---|---|
| Terminal | Oval / rounded box | Start and end |
| Input/Output | Parallelogram | Reading input, displaying output |
| Process | Rectangle | Calculations, data changes |
| Decision | Diamond (rhombus) | A yes/no choice |
| Flow line | Arrow | Order of steps |

~~~
BEGIN
  pay_rate = 7.88
  INPUT hours_worked
  gross_pay = hours_worked * pay_rate
  DISPLAY gross_pay
END
~~~
**GIGO**: Garbage In, Garbage Out. Output is only as good as the input.

## Output with print
A **function** is prewritten code that performs an operation. You **call** it and pass **arguments**.
~~~
print('Hello')                    # Hello
print('Room', room_num)           # items separated by a space
print('One', 'Two', sep='*')      # One*Two
print('One', end='')              # no newline at the end
print('Thur\\tFri\\tSat')         # \\t tab, \\n newline, \\' quote, \\\\ backslash
~~~

## Strings and comments
- A **string** is a sequence of characters. A **string literal** appears in code inside single, double or triple quotes. Triple quotes can hold both kinds of quote and span lines.
- **Comments** start with «#» and are ignored by Python. Use them.

## Variables
A **variable** is a name that references a value in memory. Create one with an **assignment statement**: «age = 29». The variable goes on the **left**.
- You must assign a value before you use a variable, otherwise «NameError».
- «37 = age» is a «SyntaxError» (you cannot assign to a literal).
- Variables can be reassigned, even to a different type. Values no longer referenced are removed by **garbage collection**.

### Naming rules
- Not a keyword; no spaces; first character a letter or underscore; then letters, digits or underscores; **case sensitive**.
- Choose descriptive names. Python style is **snake_case** («gross_pay»), not camelCase.

## Data types
| Type | Example | Notes |
|---|---|---|
| «int» | «7» | No decimal point |
| «float» | «7.0» | Has a decimal point |
| «str» | «'7'» | Text |
| «bool» | «True» | True or False |
«type(1.0)» returns «<class 'float'>». Numeric literals cannot contain £, spaces or commas.

## Reading input
«input(prompt)» **always returns a string**. Convert it:
~~~
hours = int(input('How many hours did you work? '))
income = float(input('What is your income? '))
~~~
If the text cannot be converted (e.g. «int('abc')»), Python raises an **exception** (ValueError) and the program stops.

A classic logic error: «x + y» on two input strings **joins** them ("3" + "4" = "34") instead of adding.

## Operators and precedence
| Operator | Meaning | Example | Result |
|---|---|---|---|
| «+ - *» | add, subtract, multiply | «3 * 4» | 12 |
| «/» | division (always float) | «7 / 2» | 3.5 |
| «//» | integer (floor) division | «7 // 2» | 3 |
| «%» | remainder (modulus) | «7 % 2» | 1 |
| «**» | exponent | «2 ** 3» | 8 |

Precedence: brackets → «**» → «* / // %» → «+ -». Equal precedence goes left to right.
- int with int gives int (except «/»); float with float gives float; mixing gives float.
- «int(2.9)» gives 2: converting float to int **truncates**.
- Break long lines with «\\» or inside brackets.

## Formatting numbers
~~~
format(416.6666, '.2f')       # '416.67'
format(4166.66, ',.2f')       # '4,166.66'
format(127.899, '7.2f')       # ' 127.90' (width 7)
format(123456, ',d')          # '123,456'  (d for integers)
format(0.5, '%')              # '50.000000%'
pi = 3.14159
print(f'Pi is about {pi:.2f}')   # f-string, Python 3.6+
~~~

## Magic numbers and named constants
A **magic number** is an unexplained value in code («balance * 0.069»). Replace it with a **named constant** in capitals: «INTEREST_RATE = 0.069». Constants are self-documenting, easier to change in one place, and avoid typos.

## PEP 8 style
Python's style guide. Indentation marks blocks (use spaces, never mix tabs and spaces), lines up to **79 characters**, avoid unnecessary whitespace, block comments start with «# ». "Code is more often read than written."
`,
  cards: [
    ['Algorithm', 'A set of well-defined logical steps that must be taken to perform a task.'],
    ['Pseudocode', 'Informal "fake code" with no strict syntax, used to design a program\'s logic. Not executed.'],
    ['Flowchart: parallelogram', 'Input or output.'],
    ['Flowchart: diamond', 'A decision (true/false).'],
    ['Flowchart: rectangle', 'A process, e.g. a calculation.'],
    ['GIGO', 'Garbage In, Garbage Out: bad input gives bad output.'],
    ['What type does input() return?', 'Always a string (str). Convert it with int() or float().'],
    ['7 / 2, 7 // 2, 7 % 2', '3.5, 3, 1'],
    ['2 ** 3', '8 (exponent)'],
    ['int(2.9)', '2: converting a float to int truncates the fractional part.'],
    ['Operator precedence (highest first)', 'Brackets, **, then * / // %, then + -. Same level: left to right.'],
    ['print(\'A\', \'B\', sep=\'-\')', 'A-B'],
    ['What does end=\'\' do in print?', 'Stops print adding a newline at the end of the output.'],
    ['format(1234.5, \',.2f\')', '\'1,234.50\''],
    ['Magic number', 'An unexplained numeric value in code. Replace it with a named constant like INTEREST_RATE = 0.069.'],
    ['Variable naming rules', 'No keywords, no spaces, start with a letter or underscore, then letters/digits/underscores, case sensitive.'],
    ['PEP 8', 'Python\'s style guide: e.g. 79-character lines, consistent indentation with spaces, snake_case names.'],
    ['f-string', 'A string prefixed with f that embeds expressions in braces, e.g. f"Total: {total:.2f}".'],
  ],
  mcq: [
    ['What does «print(type(1.0))» display?', ["<class 'int'>", "<class 'float'>", "<class 'str'>", '1.0'], 1, '1.0 has a decimal point, so it is a float.'],
    ['x = input("Number: ") and the user types 5. What is type(x)?', ['int', 'float', 'str', 'bool'], 2, 'input() always returns a string.'],
    ['What is 17 % 5?', ['3', '2', '3.4', '12'], 1, '17 = 3 × 5 + 2, so the remainder is 2.'],
    ['What is 17 // 5?', ['3', '3.4', '2', '4'], 0, 'Floor division drops the fraction.'],
    ['What is 2 + 3 * 4 ** 2?', ['50', '400', '98', '20'], 0, '4 ** 2 = 16, 3 * 16 = 48, 2 + 48 = 50.'],
    ['What is (10 - 2) * 3?', ['4', '24', '28', '16'], 1, 'Brackets first: 8 × 3 = 24.'],
    ['Which is a valid variable name?', ['2nd_score', 'gross pay', '_total', 'class'], 2, 'Must not start with a digit, contain spaces, or be a keyword.'],
    ["print('One', 'Two', 'Three', sep='*') outputs…", ['One Two Three', 'One*Two*Three', '*One*Two*Three*', 'OneTwoThree'], 1, 'sep replaces the default space between items.'],
    ["x = '3' and y = '4'. What does print(x + y) show?", ['7', '34', 'Error', '3 4'], 1, '+ on two strings concatenates them.'],
    ['What does format(127.899, ".2f") return?', ["'127.89'", "'127.90'", "'127.9'", "'128'"], 1, 'Rounded to two decimal places.'],
    ['Which shape is used for a decision in a flowchart?', ['Oval', 'Parallelogram', 'Rectangle', 'Diamond'], 3, 'Diamond = decision.'],
    ['Why use INTEREST_RATE = 0.069 instead of 0.069 in the code?', ['It runs faster', 'It makes code self-documenting and easy to change in one place', 'Python requires it', 'It stops the value being a float'], 1, 'Named constants replace magic numbers.'],
    ['What is the result type of 3 + 2.0?', ['int', 'float', 'str', 'Error'], 1, 'Mixing int and float gives a float.'],
    ["What happens with int('abc')?", ['Returns 0', 'Returns None', 'Raises a ValueError exception', "Returns 'abc'"], 2, 'The text cannot be converted, so an exception halts the program.'],
  ],
  blanks: [
    'The {{input}} function always returns a string.',
    'To turn the string "42" into a whole number use {{int}}().',
    'The {{%|modulus|remainder}} operator returns the remainder of a division.',
    'The {{**}} operator raises a number to a power.',
    'An unexplained value in code is called a {{magic}} number.',
    'Python style prefers {{snake}}_case variable names like «gross_pay».',
    'The print argument {{sep}} changes the separator between items.',
    'An f-string such as «f"{pi:.2f}"» rounds pi to {{2|two}} decimal places.',
    'PEP 8 recommends a maximum line length of {{79}} characters.',
    'GIGO stands for Garbage In, {{Garbage Out}}.',
  ],
  exercises: [
    {
      title: 'Cookie ingredient adjuster',
      task: 'A recipe for 48 cookies needs 1.5 cups of sugar, 1 cup of butter and 2.75 cups of flour. Ask how many cookies the user wants and print the cups of each ingredient to 2 decimal places. Use named constants.',
      solution: `~~~
COOKIES_RECIPE = 48.0
SUGAR_RECIPE = 1.5
BUTTER_RECIPE = 1.0
FLOUR_RECIPE = 2.75

cookies = float(input('Enter the number of cookies: '))

sugar = cookies * SUGAR_RECIPE / COOKIES_RECIPE
butter = cookies * BUTTER_RECIPE / COOKIES_RECIPE
flour = cookies * FLOUR_RECIPE / COOKIES_RECIPE

print(f'To make {cookies:.0f} cookies you need:')
print(f'{sugar:.2f} cups of sugar')
print(f'{butter:.2f} cups of butter')
print(f'{flour:.2f} cups of flour')
~~~`
    },
    {
      title: 'Age next year',
      task: 'Ask for the user\'s name and age, then print "Hello Adam! Next year you will be 20." using their values.',
      solution: `~~~
name = input('Enter your name: ')
age = int(input('Enter your age: '))
next_year = age + 1
print(f'Hello {name}! Next year you will be {next_year}.')
~~~`
    },
    {
      title: 'Pay calculator from pseudocode',
      task: `Turn this pseudocode into Python, showing the gross pay as currency with a comma separator:
~~~
BEGIN
  pay_rate = 7.88
  INPUT hours_worked
  gross_pay = hours_worked * pay_rate
  DISPLAY gross_pay
END
~~~`,
      solution: `~~~
PAY_RATE = 7.88

hours_worked = float(input('Enter hours worked: '))
gross_pay = hours_worked * PAY_RATE
print(f'Gross pay: £{gross_pay:,.2f}')
~~~`
    },
    {
      title: 'Predict the output',
      task: `Write down what each line prints before running it:
~~~
print(10 / 4)
print(10 // 4)
print(10 % 4)
print(2 ** 4)
print(int(7.99))
print('5' + '5')
print(5 + 5)
print('Hi', 'there', sep='')
~~~`,
      solution: `~~~
2.5
2
2
16
7
55
10
Hithere
~~~`
    },
  ]
},

/* ------------------------------------------------------------------ */
{
  id: 'py3', week: 3, title: 'Decisions and Boolean logic',
  summary: 'if, if-else and if-elif-else, nested decisions, relational and logical operators, truth tables, comparing strings, flags, the ternary and walrus operators.',
  notes: `
## Control structures
Until now programs were **sequence structures**: statements run in order. A **decision structure** (selection) runs some statements only when a condition is true.

## if
~~~
if condition:
    statement      # indented block runs only when the condition is True
    statement
~~~
The condition is a **Boolean expression**: it evaluates to «True» or «False». Indentation marks the block.

## Relational operators
| Operator | Meaning |
|---|---|
| «>» «<» | greater / less than |
| «>=» «<=» | greater / less than or equal |
| «==» | equal to (two equals signs!) |
| «!=» | not equal to |

## if-else (dual alternative)
~~~
mark = int(input('Enter mark: '))
if mark >= 40:
    print('Pass')
else:
    print('Fail')
~~~
«if» and «else» must line up.

## Nested decisions and if-elif-else
~~~
if salary >= 30000:
    if years_on_job >= 2:
        print('You qualify for the loan.')
    else:
        print('You must have been employed for at least 2 years.')
else:
    print('You must earn at least £30,000 per year.')

if score >= 90:
    print('A')
elif score >= 80:
    print('B')
elif score >= 70:
    print('C')
elif score >= 60:
    print('D')
else:
    print('F')
~~~
**Order matters** in an elif chain: Python takes the first true branch and skips the rest.

## Logical operators
| Expression | True when |
|---|---|
| «a and b» | both are true |
| «a or b» | at least one is true |
| «not a» | a is false |

Truth tables:
| P | Q | P and Q | P or Q |
|---|---|---|---|
| F | F | F | F |
| F | T | F | T |
| T | F | F | T |
| T | T | T | T |

**Short-circuit evaluation**: with «or», if the left side is True the right side is not checked; with «and», if the left side is False the right side is not checked.

**Ranges**: inside a range «x >= 10 and x <= 20»; outside a range «x < 10 or x > 20».

De Morgan: «not (P or Q)» equals «(not P) and (not Q)», and «not (P and Q)» equals «(not P) or (not Q)».

## Comparing strings
- «==» and «!=» work on strings and are **case sensitive** ('Mary' != 'mary').
- «< > <= >=» compare **character by character using ASCII codes**: 'A' is 65, 'a' is 97, space is 32. So 'Z' < 'a', and 'Mary' > 'Mark' because 'y' (121) > 'k' (107).
- If one string is the start of the other, the longer one is greater: 'High' < 'Hello'? No: 'i' > 'e', so 'High' > 'Hello'. But 'Hell' < 'Hello'.

## Boolean variables (flags)
A «bool» variable holds «True» or «False». It is often used as a **flag** that signals a condition: «sales_quota_met = sales >= 50000».

## Ternary operator (conditional expression)
~~~
status = 'Adult' if age >= 18 else 'Minor'
~~~

## Walrus operator «:=»
Assigns a value **and** returns it, so you can assign inside a condition. It has the **lowest precedence**, so wrap it in brackets.
~~~
if (area := width * height) > 100:
    print(f'The area equals {area}, which is too large')
~~~

## Formatting numbers with f-strings
| Spec | Example | Result |
|---|---|---|
| «,d» | «f"{12345678:,d}"» | 12,345,678 |
| «10d» | width 10 | '  12345678' |
| «.4f» | «f"{math.pi:.4f}"» | 3.1416 |
| «08.4f» | zero padded, width 8 | 003.1416 |

## Turtle: checking state
«turtle.xcor()», «turtle.ycor()», «turtle.heading()», «turtle.isdown()», «turtle.isvisible()», and «turtle.pencolor()», «turtle.fillcolor()», «turtle.bgcolor()», «turtle.pensize()», «turtle.speed()» called with no argument return the current value, so you can test them in an «if».

## AI in focus (week 3)
AI output is a **proposal, not an authority**. Vague prompts make the AI fill in missing requirements with assumptions. Working code is not necessarily correct code (the AI might write «mark > 40» when the rule is "40 or above"). **Never submit code you cannot explain.**
`,
  cards: [
    ['Sequence vs decision structure', 'Sequence: statements run in order. Decision: some statements run only if a condition is true.'],
    ['Boolean expression', 'An expression that evaluates to True or False, e.g. a > b.'],
    ['== vs =', '== compares two values; = assigns a value to a variable.'],
    ['Not-equal operator in Python', '!='],
    ['When does "a and b" evaluate to True?', 'Only when both a and b are True.'],
    ['When does "a or b" evaluate to True?', 'When at least one of a or b is True.'],
    ['Short-circuit evaluation', 'or: if the left is True, skip the right. and: if the left is False, skip the right.'],
    ['Check x is between 10 and 20 inclusive', 'x >= 10 and x <= 20'],
    ['Check x is outside 10 to 20', 'x < 10 or x > 20'],
    ['How are strings compared with < and >?', 'Character by character using ASCII codes. Case sensitive: \'A\' = 65, \'a\' = 97.'],
    ['Is \'Mary\' > \'Mark\'?', 'True: the first difference is \'y\' (121) vs \'k\' (107).'],
    ['Flag', 'A Boolean variable that signals whether a condition exists.'],
    ['Ternary operator syntax', 'value_if_true if condition else value_if_false'],
    ['Walrus operator', ':= assigns a value and returns it. Lowest precedence, so use brackets: if (n := len(x)) > 10:'],
    ['De Morgan: not (P or Q)', '(not P) and (not Q)'],
    ['Why does elif order matter?', 'Python runs the first branch whose condition is true and skips the rest.'],
    ['"AI output is a…"', 'Proposal, not an authority. Never submit code you cannot explain.'],
  ],
  mcq: [
    ['a = 2, b = 4, c = 6. Which is False?', ['a == 4 or b > 2', '6 <= c and a > 3', '1 != b and c != 3', 'not (a > b)'], 1, '6 <= 6 is True but 2 > 3 is False, so the and is False.'],
    ['What does this print?\n~~~\nx = 15\nif x > 10:\n    print("A")\nelif x > 5:\n    print("B")\nelse:\n    print("C")\n~~~', ['A', 'B', 'A and B', 'C'], 0, 'The first true branch runs; the elif is skipped.'],
    ['Which tests that age is NOT between 18 and 65 inclusive?', ['age < 18 and age > 65', 'age < 18 or age > 65', 'age >= 18 or age <= 65', 'not age'], 1, 'Outside a range uses or.'],
    ["'apple' == 'Apple' evaluates to…", ['True', 'False', 'Error', 'None'], 1, 'String comparison is case sensitive.'],
    ["Which is True?", ["'Z' > 'a'", "'a' > 'Z'", "'A' == 'a'", "'cat' > 'dog'"], 1, "'a' is 97 and 'Z' is 90."],
    ['In «x > 5 or y / 0 > 1» with x = 10, what happens?', ['ZeroDivisionError', 'True, without evaluating y / 0', 'False', 'SyntaxError'], 1, 'Short-circuit: the left side is True, so the right is never evaluated.'],
    ['What is not (True and False)?', ['True', 'False', 'None', 'Error'], 0, 'True and False is False; not False is True.'],
    ['Rule: "Pass if the mark is 40 or above." An AI writes «if mark > 40:». What is wrong?', ['Nothing', 'A mark of exactly 40 would fail', 'It should use =', 'Marks must be strings'], 1, 'The boundary needs >=. Working code is not necessarily correct code.'],
    ["status = 'Adult' if age >= 18 else 'Minor'. With age = 18, status is…", ["'Adult'", "'Minor'", 'True', 'Error'], 0, '18 >= 18 is True.'],
    ['Why put brackets around (score := int(input())) > 90?', ['Style only', 'The walrus has the lowest precedence, so without them score would get True/False', 'input needs brackets', 'It makes score a float'], 1, 'Without brackets the comparison happens first.'],
    ['Which operator is unary?', ['and', 'or', 'not', '=='], 2, 'not takes one operand; and/or take two.'],
    ['Which is the correct dual-alternative syntax?', ['if x > 1 then: … else: …', 'if x > 1: … else: …', 'if (x > 1) { … } else { … }', 'if x > 1: … otherwise: …'], 1, 'Python uses a colon and indentation, with else: lined up with if.'],
  ],
  blanks: [
    'The operator {{==}} tests whether two values are equal.',
    'A decision structure with two possible paths is called a {{dual}} alternative structure.',
    '«a and b» is True only when {{both}} a and b are True.',
    'Deciding a compound result after checking only one side is called {{short-circuit}} evaluation.',
    'String comparisons use each character\'s {{ASCII|Unicode}} code.',
    'A Boolean variable used to signal a condition is called a {{flag}}.',
    'The walrus operator is written {{:=}}.',
    '«not (P or Q)» is equivalent to «(not P) {{and}} (not Q)».',
    'In an if-elif-else chain, the final catch-all branch is the {{else}} clause.',
  ],
  exercises: [
    {
      title: 'Store discount',
      task: 'Sarah gives a 10% discount to customers who spend more than £100. Ask for the amount spent and print the final price to 2 decimal places.',
      solution: `~~~
DISCOUNT_THRESHOLD = 100
DISCOUNT_RATE = 0.10

spent = float(input('Enter the amount spent: £'))

if spent > DISCOUNT_THRESHOLD:
    final_price = spent - spent * DISCOUNT_RATE
else:
    final_price = spent

print(f'Final price: £{final_price:.2f}')
~~~
Test the boundary: £100 should get no discount; £100.01 should.`
    },
    {
      title: 'Leap year',
      task: 'Ask for a year and say whether it is a leap year. A year divisible by 100 is a leap year only if it is also divisible by 400. Otherwise it is a leap year if divisible by 4.',
      solution: `~~~
year = int(input('Enter a year: '))

if year % 100 == 0:
    is_leap = year % 400 == 0
else:
    is_leap = year % 4 == 0

if is_leap:
    print(f'{year} is a leap year.')
else:
    print(f'{year} is not a leap year.')
~~~
Check: 2000 leap, 1900 not, 2024 leap, 2026 not.`
    },
    {
      title: 'Nails order (Lab 3)',
      task: `Nails cost 10p each, plus £2 postage. Discounts: 1–50 nails 0%, 51–100 10%, 101–200 20%, 201+ 25%. Ask how many nails, then show the discount %, the cost before postage, and the total bill.`,
      solution: `~~~
PRICE_PER_NAIL = 0.10
POSTAGE = 2.00

nails = int(input('How many nails? '))

if nails <= 50:
    discount = 0
elif nails <= 100:
    discount = 10
elif nails <= 200:
    discount = 20
else:
    discount = 25

cost = nails * PRICE_PER_NAIL * (100 - discount) / 100
total = cost + POSTAGE

print(f'Discount: {discount}%')
print(f'Cost before P&P: £{cost:.2f}')
print(f'Total bill: £{total:.2f}')
~~~
The lab table says "100-200" for 20%, which overlaps with 51–100; treating it as 101–200 is the sensible reading.`
    },
    {
      title: 'Fix the bank loan program (Lab 3, task 6)',
      task: `Find and fix the errors:
~~~
min_salary = 3000.0
min_years = 2
salary = float(input('Enter your annual salary: '))
years_on_job = input('Enter the number of ' +
                         'months employed: ')
if salary >= min_salary and years_on_job >= min_year
print('You qualify for the loan.')
else
print('You do not qualify for this loan.')
~~~
The rule: you qualify if you earn at least £30,000 **or** have at least 2 years' full-time employment.`,
      solution: `Errors: salary threshold should be 30000.0; years input is never converted to a number; the prompt asks for months but the rule uses years; «min_year» is misspelt; the rule says "at least one", so «or» not «and»; missing colon after the if; missing colon after else; both print statements need indenting.
~~~
MIN_SALARY = 30000.0
MIN_YEARS = 2

salary = float(input('Enter your annual salary: '))
years_on_job = float(input('Enter the number of years employed: '))

if salary >= MIN_SALARY or years_on_job >= MIN_YEARS:
    print('You qualify for the loan.')
else:
    print('You do not qualify for this loan.')
~~~`
    },
    {
      title: 'Truth table check',
      task: 'Show with a truth table that «not (P or Q)» is the same as «(not P) and (not Q)». Then check it in Python for all four combinations.',
      solution: `| P | Q | P or Q | not (P or Q) | not P | not Q | (not P) and (not Q) |
|---|---|---|---|---|---|---|
| F | F | F | T | T | T | T |
| F | T | T | F | T | F | F |
| T | F | T | F | F | T | F |
| T | T | T | F | F | F | F |
~~~
for p in (False, True):
    for q in (False, True):
        print(p, q, not (p or q), (not p) and (not q))
~~~
The last two columns always match.`
    },
  ]
},

/* ------------------------------------------------------------------ */
{
  id: 'py4', week: 4, title: 'Loops',
  summary: 'while and for loops, range, counters and accumulators, sentinels, input validation, nested loops, break, continue and the loop else clause.',
  notes: `
## Why loops?
Writing the same code again and again makes programs long, slow to write and hard to change. A **repetition structure** repeats code as needed.
- **Condition-controlled** loops repeat while a condition is true: «while».
- **Count-controlled** loops repeat a set number of times: «for».

## The while loop
~~~
while condition:
    statements
~~~
- A **pretest** loop: the condition is checked **before** each iteration, so the body may run zero times.
- Something in the body must eventually make the condition False, or you get an **infinite loop**.
- An **iteration** is one execution of the body.

~~~
keep_going = 'y'
while keep_going == 'y':
    sales = float(input('Sales: '))
    print(f'Commission: £{sales * 0.10:.2f}')
    keep_going = input('Another? (y): ')
~~~

### while as a counter loop: initialise, compare, update
~~~
n = 0              # initialisation
while n < 5:       # comparison
    print(n)
    n += 1         # update
~~~

## The for loop
~~~
for variable in [1, 2, 3]:
    statements
~~~
The **target variable** takes each value in the sequence in turn.

### range
| Call | Values |
|---|---|
| «range(5)» | 0, 1, 2, 3, 4 |
| «range(3, 8)» | 3, 4, 5, 6, 7 |
| «range(2, 11, 2)» | 2, 4, 6, 8, 10 |
| «range(10, 0, -1)» | 10, 9, … 1 |
The stop value is **never included**. A negative step counts down (start must be larger than stop).

## for or while?
- **for**: the number of iterations is known or the data is a sequence (a range, list or string). It stops by itself.
- **while**: you do not know how many times (waiting for valid input, a game until correct). Risk of infinite loops.

## Running totals
Use an **accumulator** initialised to 0 before the loop:
~~~
total = 0
for counter in range(5):
    number = int(input('Enter a number: '))
    total += number
print('The total is', total)
~~~

## Augmented assignment
| Operator | Same as |
|---|---|
| «x += 2» | «x = x + 2» |
| «x -= 2» | «x = x - 2» |
| «x *= 2» | «x = x * 2» |
| «x /= 2» | «x = x / 2» |
| «x //= 2», «x %= 2», «x **= 2» | likewise |

## Sentinels
A **sentinel** is a special value that marks the end of a sequence (e.g. 0 or an empty line). It must be distinctive enough not to be mistaken for real data.

## Input validation loops
**Input validation** checks input before it is used. A validation loop (error trap) repeats while the input is bad:
~~~
score = int(input('Enter a score: '))      # priming read
while score < 0 or score > 100:
    print('Score must be 0 to 100.')
    score = int(input('Enter a score: '))
~~~
With the walrus operator:
~~~
while (score := int(input('Enter your score: '))) < 0:
    print('The score cannot be negative.')
~~~

## Nested loops
The inner loop completes **all** its iterations for **each** iteration of the outer loop. Total iterations = outer × inner.
~~~
rows = int(input('Rows: '))
cols = int(input('Columns: '))
for r in range(rows):
    for c in range(cols):
        print('*', end='')
    print()
~~~

## break, continue and else
- «break» ends the loop immediately.
- «continue» skips the rest of this iteration and moves to the next.
- A loop's «else» block runs only if the loop finished **without** hitting «break».

~~~
n = 0
while n < 10:
    n += 1
    if n % 3 == 0:
        continue
    print(n)          # prints 1 2 4 5 7 8 10
~~~

## match-case (Python 3.10+)
An alternative to long if-elif chains:
~~~
match choice:
    case '1':
        print('You selected option 1.')
    case '5':
        print('Exiting.')
    case other:
        print('Invalid selection.')
~~~

## Turtle with loops
~~~
for x in range(4):        # square
    turtle.forward(100)
    turtle.right(90)
~~~
A regular polygon of n sides turns «360 / n» degrees each time. Drawing a shape repeatedly while turning a small angle makes rosette designs.

## AI in focus (week 4)
- The **4 pillars of a code prompt**: **Context**, **Task**, **Constraints**, **Format**.
- **Zero-shot** (just tell), **one-shot** (one example), **few-shot** (several examples).
- **Chain of Thought**: ask the model to reason step by step before writing code.
- **Prompt chaining**: break a big job into a sequence of prompts (pseudocode → code → tests → refine).
- **Socratic prompting**: ask the AI to question you instead of giving the answer.
- **Verify**: inspect code, trace boundary values, ask for edge-case tests.
`,
  cards: [
    ['Condition-controlled vs count-controlled', 'Condition-controlled (while) repeats while a condition is true. Count-controlled (for) repeats a set number of times.'],
    ['Why is while a "pretest" loop?', 'It checks the condition before each iteration, so the body may never run.'],
    ['Infinite loop', 'A loop with no way to stop because nothing makes its condition False.'],
    ['Three parts of a count-controlled while loop', 'Initialise the counter, compare it to the end value, update it each iteration.'],
    ['range(5)', '0, 1, 2, 3, 4'],
    ['range(2, 11, 2)', '2, 4, 6, 8, 10'],
    ['range(10, 0, -1)', '10 down to 1'],
    ['Accumulator', 'A variable that keeps a running total, initialised (usually to 0) before the loop.'],
    ['x += 5', 'x = x + 5'],
    ['Sentinel', 'A special value that marks the end of a sequence of input and stops the loop.'],
    ['Input validation loop', 'A loop that keeps asking for input while it is invalid (an error trap).'],
    ['Priming read', 'The first input read before a validation loop starts.'],
    ['Nested loop iterations', 'The inner loop runs all its iterations for each outer iteration: total = outer × inner.'],
    ['break', 'Ends the loop immediately.'],
    ['continue', 'Skips the rest of the current iteration and moves on to the next.'],
    ['When does a loop\'s else clause run?', 'Only if the loop ends normally, without a break.'],
    ['When choose for over while?', 'When the number of iterations is known or you are looping over a sequence.'],
    ['4 pillars of a code prompt', 'Context, Task, Constraints, Format.'],
    ['Chain of Thought vs prompt chaining', 'CoT: one prompt asking for step-by-step reasoning. Chaining: several prompts in sequence, each building on the last.'],
  ],
  mcq: [
    ['What does «for i in range(3, 8): print(i)» print?', ['3 to 8', '3 to 7', '4 to 8', '0 to 7'], 1, 'The stop value is excluded.'],
    ['How many times does «for i in range(0, 10, 3)» loop?', ['3', '4', '10', '9'], 1, 'Values 0, 3, 6, 9: four iterations.'],
    ['What is printed?\n~~~\nn = 0\nwhile n < 100:\n    if n == 5:\n        break\n    n += 1\nprint(n)\n~~~', ['5', '6', '100', '99'], 0, 'break exits when n is 5.'],
    ['What is printed?\n~~~\nfor n in range(1, 7):\n    if n % 2 == 0:\n        continue\n    print(n, end=" ")\n~~~', ['2 4 6', '1 3 5', '1 2 3 4 5 6', '1 3 5 7'], 1, 'continue skips even numbers.'],
    ['Which loop may run zero times?', ['A while loop whose condition starts False', 'Every for loop', 'Only nested loops', 'None'], 0, 'while is a pretest loop.'],
    ['What is wrong?\n~~~\ncount = 1\nwhile count <= 10:\n    print(count)\n~~~', ['Syntax error', 'Infinite loop: count is never updated', 'It prints 1 to 10', 'It prints nothing'], 1, 'Add count += 1 inside the loop.'],
    ['A nested loop has an outer loop of 4 and inner loop of 6. Total inner iterations?', ['10', '24', '6', '4'], 1, '4 × 6.'],
    ['When does the loop else block run?', ['Always', 'Never', 'Only if the loop did not hit break', 'Only if the loop hit break'], 2, 'else runs on normal termination.'],
    ['After «x = 6; x *= 5; x -= 4», x is…', ['26', '10', '30', '2'], 0, '6 × 5 = 30, minus 4 = 26.'],
    ['Which is best for "keep asking until the user types a valid password"?', ['for loop with range(3)', 'while loop', 'if statement', 'match-case alone'], 1, 'You do not know how many attempts it will take.'],
    ['Goal: print 1 to 5. Which is the bug in «for i in range(1, 5): print(i)»?', ['range should be range(0, 5)', 'range should be range(1, 6)', 'print needs end=""', 'There is no bug'], 1, 'range excludes the stop value, so it prints 1 to 4.'],
    ['Which turn angle draws a regular hexagon with turtle?', ['45', '60', '90', '120'], 1, '360 / 6 = 60.'],
    ['Which is a sentinel?', ['A loop counter', 'A special value like 0 that marks the end of input', 'A break statement', 'An infinite loop'], 1, 'It signals the end of the data.'],
    ['A prompt that gives the AI several worked examples is…', ['Zero-shot', 'One-shot', 'Few-shot', 'Chain of Thought'], 2, 'Few-shot means multiple examples.'],
  ],
  blanks: [
    'A {{while}} loop is condition-controlled and a {{for}} loop is count-controlled.',
    'The while loop is a {{pretest}} loop.',
    '«range(10)» produces the values 0 to {{9}}.',
    'A loop that never stops is an {{infinite}} loop.',
    'A variable that keeps a running total is an {{accumulator}}.',
    'A special value that marks the end of a sequence is a {{sentinel}}.',
    'The {{break}} statement ends a loop immediately.',
    'The {{continue}} statement skips to the next iteration.',
    '«total {{+=}} number» is shorthand for «total = total + number».',
    'To count down from 10 to 1 use «range(10, 0, {{-1}})».',
  ],
  exercises: [
    {
      title: 'Password retry loop',
      task: 'Keep asking for a password until the user enters "ThisI$MyPassw0rd", then print "Password accepted."',
      solution: `~~~
PASSWORD = 'ThisI$MyPassw0rd'

attempt = input('Enter the password: ')
while attempt != PASSWORD:
    print('Sorry, that is the wrong password.')
    attempt = input('Enter the password: ')
print('Password accepted.')
~~~`
    },
    {
      title: 'Higher or lower (Lab 4, task 9)',
      task: 'The program picks a random number from 1 to 20. Keep asking for guesses, printing "Higher!" or "Lower!", and when correct print "You guessed it in N tries!".',
      solution: `~~~
from random import randint

secret = randint(1, 20)
tries = 0
guess = 0

while guess != secret:
    guess = int(input('Guess the number (1-20): '))
    tries += 1
    if guess < secret:
        print('Higher!')
    elif guess > secret:
        print('Lower!')

print(f'You guessed it in {tries} tries!')
~~~`
    },
    {
      title: 'Investment growth (Lab 4, task 8)',
      task: 'Interest rates over four years are 5%, 7%, 10% and 30%. Ask for an initial investment, print the balance at the end of each year, then the total and the profit. £1000 should end at £1606.60.',
      solution: `~~~
RATES = [0.05, 0.07, 0.10, 0.30]

initial = float(input('Enter your initial investment amount: £'))
balance = initial

for year, rate in enumerate(RATES, start=1):
    balance = balance + balance * rate
    print(f'Year {year}: Balance = £{balance:.2f}')

print(f'Total value after 4 years: £{balance:.2f}')
print(f'You made a profit of £{balance - initial:.2f}')
~~~
Without «enumerate», keep your own counter: «year = 0» before the loop and «year += 1» inside.`
    },
    {
      title: 'Is it prime? (Lab 4, task 7)',
      task: 'Ask for an integer and say whether it is prime, checking divisors from 2 up to the square root. Use the loop else clause.',
      solution: `~~~
n = int(input('Enter an integer: '))

if n < 2:
    print(f'{n} is not prime.')
else:
    d = 2
    while d * d <= n:
        if n % d == 0:
            print(f'{n} is not prime ({d} divides it).')
            break
        d += 1
    else:
        print(f'{n} is prime.')
~~~
Try 77777677777 (it takes a few seconds). The else only runs if no divisor caused a break.`
    },
    {
      title: 'Asterisk rectangle',
      task: 'Ask for rows and columns and print a rectangle of asterisks of that size using nested loops.',
      solution: `~~~
rows = int(input('How many rows? '))
cols = int(input('How many columns? '))

for r in range(rows):
    for c in range(cols):
        print('*', end='')
    print()      # move to the next line after each row
~~~`
    },
    {
      title: 'Validated average',
      task: 'Ask how many numbers the user will enter (must be at least 1, use a validation loop), read them, then print the total and the average to 1 decimal place.',
      solution: `~~~
count = int(input('How many numbers? '))
while count < 1:
    print('Please enter at least 1.')
    count = int(input('How many numbers? '))

total = 0
for i in range(count):
    total += float(input(f'Number {i + 1}: '))

print(f'Total: {total}')
print(f'Average: {total / count:.1f}')
~~~`
    },
  ]
},

/* ------------------------------------------------------------------ */
{
  id: 'py5', week: 5, title: 'Functions',
  summary: 'Defining and calling functions, main(), void and value-returning functions, parameters and arguments, keyword arguments, local and global scope.',
  notes: `
## What a function is
A **function** is a block of code the program calls when needed. Data can be passed in and a value can be returned. Giving each task its own function is **modularisation**.

### Why
**DRY: Don't Repeat Yourself.** Repeated code makes programs longer, harder to read and debug, harder to update (you must change every copy) and more prone to typos.

## Defining and calling
~~~
def print_hello():          # def = define; brackets are required
    print('Hello')
    print('World')

print('Start')
print_hello()               # call: the function only runs when called
print('End')
~~~
Python reads and remembers the definition, then runs the unindented code. A call jumps into the function and comes back to the next line afterwards.

Naming rules are the same as variables (no keywords, no spaces, start with a letter or underscore, case sensitive). Use meaningful names such as «calculate_pay».

## The main function
Good practice: put the program's main logic in «main()», and have just **one line** at the bottom that calls it. Functions can call other functions (and themselves: **recursion**).
~~~
def main():
    show_menu()
    process_choice()

def show_menu():
    ...

main()
~~~

## Designing with functions
- **Top-down design**: break the task into subtasks, break those down further until nothing sensible is left, then write the code.
- **Hierarchy (structure) chart**: shows which functions call which.
- In a **flowchart**, a function call is a rectangle with vertical bars at each side, and each function gets its own flowchart.

## Void vs value-returning functions
- A **void function** runs its statements and stops. It returns nothing useful.
- A **value-returning function** sends a value back with «return». «input()» is one; «print()» is void.
~~~
def square(number):
    return number * number

result = square(4)          # 16
~~~

## Parameters and arguments
- A **parameter** is the variable in the brackets of the **definition**.
- An **argument** is the value passed in the **call**.
~~~
def print_details(name, age):       # parameters
    print(name, 'is', age)

print_details('Adam', 19)           # arguments, matched by position
print_details(age=19, name='Adam')  # keyword arguments, any order
~~~
Arguments are matched by position unless you use **keyword arguments**. The number of arguments must match the number of parameters.

## Scope
- **Local variables** are created inside a function and only exist there. Two functions can each have a variable called «total» without clashing.
- **Global variables** are created outside all functions and visible everywhere. Avoid them: they make programs hard to follow. Pass values in as arguments instead.
- The exception is **global constants**, e.g. «VAT_RATE = 0.2» at the top of the file.

## Modules and dot notation
Library functions live in **modules**, which you import first: «import random», «import turtle», «import math». Call them with **dot notation**: «random.randint(1, 20)», «turtle.pencolor('blue')», «math.sqrt(16)».

## Boolean functions
A function can return «True» or «False», which reads nicely in an «if»:
~~~
def is_even(number):
    return number % 2 == 0

if is_even(n):
    print('even')
~~~
`,
  cards: [
    ['What is a function?', 'A named block of code that runs when called. It can take data in and return a value.'],
    ['Modularisation', 'Giving each task in a program its own function.'],
    ['DRY', 'Don\'t Repeat Yourself: avoid duplicate code, e.g. by using functions.'],
    ['Keyword used to define a function', 'def'],
    ['Does a function run when it is defined?', 'No. It only runs when it is called.'],
    ['Void function', 'A function that runs its statements and returns no value, e.g. print().'],
    ['Value-returning function', 'A function that sends a value back to the caller with return, e.g. input().'],
    ['Parameter vs argument', 'Parameter: the variable in the function definition. Argument: the value passed in the call.'],
    ['Keyword argument', 'An argument passed by naming the parameter, e.g. f(age=19, name=\'Adam\'). Order no longer matters.'],
    ['Local variable', 'A variable created inside a function; only that function can see it.'],
    ['Global variable', 'A variable created outside all functions, visible everywhere. Avoid, except for constants.'],
    ['Why use a main() function?', 'It holds the main logic, keeps the program organised, and leaves one line at the bottom to start it.'],
    ['Top-down design', 'Break the overall task into subtasks, and those into smaller subtasks, until each can be a function.'],
    ['Hierarchy chart', 'A diagram showing which functions call which (also called a structure chart).'],
    ['Dot notation', 'module_name.function_name(), e.g. random.randint(1, 20).'],
    ['Recursion', 'A function that calls itself.'],
  ],
  mcq: [
    ['What does this print?\n~~~\ndef greet():\n    print("Hi")\n\nprint("Start")\n~~~', ['Hi', 'Start', 'Start then Hi', 'Hi then Start'], 1, 'greet is defined but never called.'],
    ['In «def area(radius):», radius is a…', ['Argument', 'Parameter', 'Global variable', 'Return value'], 1, 'Variables in the definition are parameters.'],
    ['In «area(5)», 5 is a…', ['Parameter', 'Argument', 'Constant', 'Keyword'], 1, 'Values in the call are arguments.'],
    ['What is printed?\n~~~\ndef double(x):\n    return x * 2\n\nprint(double(double(3)))\n~~~', ['6', '12', '9', '3'], 1, 'double(3) = 6, double(6) = 12.'],
    ['What is printed?\n~~~\ndef add(a, b):\n    print(a + b)\n\nresult = add(2, 3)\nprint(result)\n~~~', ['5 then 5', '5 then None', 'None', 'Error'], 1, 'add prints 5 but returns nothing, so result is None.'],
    ['Which is a value-returning built-in function?', ['print()', 'input()', 'Both', 'Neither'], 1, 'input() returns the string typed; print() returns nothing.'],
    ['A variable created inside a function is…', ['Global', 'Local', 'Constant', 'A parameter'], 1, 'It only exists inside that function.'],
    ['Which is the recommended use of a global?', ['Counters shared between functions', 'Named constants like VAT_RATE', 'User input', 'Everything'], 1, 'Avoid global variables; constants are the exception.'],
    ['describe(name, age) is called as describe(age=20, name="Ann"). This uses…', ['Positional arguments', 'Keyword arguments', 'Default parameters', 'Recursion'], 1, 'Naming the parameters is keyword arguments.'],
    ['How do you call randint from the random module after «import random»?', ['randint(1, 6)', 'random.randint(1, 6)', 'random(randint, 1, 6)', 'import.randint(1, 6)'], 1, 'Dot notation: module.function().'],
    ['A diagram that shows which functions call which is a…', ['Flowchart', 'Truth table', 'Hierarchy chart', 'ER diagram'], 2, 'Also called a structure chart.'],
    ['What does the DRY principle stand for?', ['Do Repeat Yourself', "Don't Repeat Yourself", 'Define, Return, Yield', 'Debug, Run, Yield'], 1, 'Avoid duplicated code.'],
  ],
  blanks: [
    'Functions are defined with the keyword {{def}}.',
    'A function that sends a value back uses the {{return}} statement.',
    'A function that returns no value is a {{void}} function.',
    'The variable in a function definition is a {{parameter}}; the value passed in the call is an {{argument}}.',
    'Variables created inside a function are {{local}} variables.',
    'Breaking a task into smaller subtasks is called {{top-down}} design.',
    'A function that calls itself uses {{recursion}}.',
    'Library functions are called with {{dot}} notation, e.g. «math.sqrt(16)».',
  ],
  exercises: [
    {
      title: 'Temperature converter (Lab 5, task 3)',
      task: 'Write «fahrenheit(temp)» (C to F: × 9/5 + 32) and «centigrade(temp)» (F to C: − 32, then × 5/9). In «main()», ask which conversion the user wants, read a temperature and call the right function.',
      solution: `~~~
def fahrenheit(temp):
    return temp * 9 / 5 + 32

def centigrade(temp):
    return (temp - 32) * 5 / 9

def main():
    choice = input('Convert (1) C to F or (2) F to C? ')
    temp = float(input('Enter the temperature: '))
    if choice == '1':
        print(f'{temp} C is {fahrenheit(temp):.1f} F')
    else:
        print(f'{temp} F is {centigrade(temp):.1f} C')

main()
~~~
Check: 100 C → 212 F; 32 F → 0 C.`
    },
    {
      title: 'Boolean helper functions (Lab 5, task 4)',
      task: 'Write «is_negative(number)» (True if below zero) and «is_too_big(number)» (True if above 100). In «main()», read a number and print which, if either, applies.',
      solution: `~~~
def is_negative(number):
    return number < 0

def is_too_big(number):
    return number > 100

def main():
    n = float(input('Enter a number: '))
    if is_negative(n):
        print('That number is negative.')
    elif is_too_big(n):
        print('That number is too big.')
    else:
        print('That number is fine.')

main()
~~~`
    },
    {
      title: 'Circle menu (Lab 5, task 5)',
      task: 'Write «area(radius)» and «circumference(radius)». In «main()», show a menu: (a) area, (b) circumference, (c) end. For a or b, ask for a radius and print the result, then show the menu again until the user picks c.',
      solution: `~~~
import math

def area(radius):
    return math.pi * radius ** 2

def circumference(radius):
    return 2 * math.pi * radius

def main():
    choice = ''
    while choice != 'c':
        print('a) Area  b) Circumference  c) End')
        choice = input('Choose: ').lower()
        if choice in ('a', 'b'):
            r = float(input('Radius: '))
            if choice == 'a':
                print(f'Area: {area(r):.2f}')
            else:
                print(f'Circumference: {circumference(r):.2f}')
        elif choice != 'c':
            print('Please choose a, b or c.')
    print('Goodbye.')

main()
~~~
The lab suggests calling «main()» again (recursion) instead of a loop. Both work; the loop avoids deep recursion.`
    },
    {
      title: 'Count the Bs (Lab 5, task 6)',
      task: 'Write «count_letter(text, letter)» that returns how many times an uppercase letter appears in a string. Use it to count "B" in "Big Bad Bob", then let the user enter a sentence and a letter.',
      solution: `~~~
def count_letter(text, letter):
    count = 0
    for ch in text:
        if ch == letter:
            count += 1
    return count

def main():
    print(count_letter('Big Bad Bob', 'B'))      # 3
    sentence = input('Enter a sentence: ')
    letter = input('Letter to count: ').upper()
    print(f'{letter} appears {count_letter(sentence, letter)} times.')

main()
~~~`
    },
    {
      title: 'Refactor into functions',
      task: 'Rewrite the "average of three test scores, congratulate if over 95" program using «get_score()», «calculate_average(a, b, c)» and «main()».',
      solution: `~~~
HIGH_SCORE = 95

def get_score(n):
    return float(input(f'Enter the score for test {n}: '))

def calculate_average(a, b, c):
    return (a + b + c) / 3

def main():
    s1 = get_score(1)
    s2 = get_score(2)
    s3 = get_score(3)
    average = calculate_average(s1, s2, s3)
    print(f'The average score is {average:.1f}')
    if average > HIGH_SCORE:
        print('Congratulations! That is a great average!')

main()
~~~`
    },
  ]
},

/* ------------------------------------------------------------------ */
{
  id: 'py6', week: 4, title: 'Working with AI',
  summary: 'LLMs, prompts and prompt engineering as taught in COM161: the 4 pillars, zero/one/few-shot, Chain of Thought, prompt chaining, Socratic prompting and verification.',
  notes: `
## LLMs in one paragraph
A **Large Language Model** (ChatGPT, Claude, Gemini) is trained on huge amounts of text and generates text by predicting what comes next. It does not think like a human, it can produce confident but wrong answers (**hallucinations**), and the quality of its answer depends heavily on your prompt.

## Prompt vs prompt engineering
- A **prompt** is the instruction or question you give the AI.
- **Prompt engineering** is designing and refining prompts (and the whole interaction) to get better, more reliable results: break tasks down, give examples, specify format and constraints, iterate and test.
- "Prompting is asking the question; prompt engineering is designing the interaction."

Template from the tutorial: **"Act as a [role]. Do [task]. Here is the [context]. Follow these [constraints]. Present the answer as [output]."**

## The 4 pillars of a code prompt
| Pillar | Question |
|---|---|
| **Context** | Who are you and what are you building? |
| **Task** | What exact action must the AI take? |
| **Constraints** | Rules, required Python features, things to avoid |
| **Format** | Pure code, inline comments, docstrings, example output |
Clearer instructions reduce assumptions, but they do not guarantee correctness.

## Shots
- **Zero-shot**: just tell it what to do.
- **One-shot**: tell it and give one example.
- **Few-shot**: give several examples covering different cases.

## Four "flavours"
1. **Chain of Thought (CoT)**: ask the model to reason step by step ("explain the algorithm in bullet points, do not write code until the logic is complete"). Logic first, code second. One prompt; makes the logic visible.
2. **Prompt chaining**: a human-guided sequence of prompts where each output feeds the next: pseudocode → Python → test cases → refine with error handling. Reduces cognitive load and truncated or buggy output.
3. **Socratic role prompting**: "Act as a strict Python lab assistant… do NOT give me the corrected code; ask me two guiding questions." The AI tutors instead of answering.
4. **Dynamic prompting**: build prompts as f-strings inside your program.

## Verify everything
AI output is a **proposal, not an authority**. Ask yourself: did I specify the requirements clearly? Does the output meet them? Does it work? How can I test it? Can I explain it?
- Inspect the code, trace boundary values, and prompt the AI for edge-case tests (e.g. "generate 5 test cases including boundary values, zero and negative inputs").
- Ask it to explain a traceback in plain English before changing your code.
- **Never submit code you cannot explain.**

## Why the module covers AI
Industry wants developers who can review code and know the requirements, not people who paste in output. In previous years students used AI badly (printouts of chats, unable to change generated code). You may also work on projects where AI is not allowed.
`,
  cards: [
    ['LLM', 'Large Language Model: AI trained on huge amounts of text that generates text by predicting what comes next.'],
    ['Hallucination', 'When an AI produces confident but incorrect information.'],
    ['Prompt vs prompt engineering', 'A prompt is the instruction. Prompt engineering is designing and refining the whole interaction for better results.'],
    ['4 pillars of a code prompt', 'Context, Task, Constraints, Format.'],
    ['Zero / one / few-shot', 'No examples / one example / several examples in the prompt.'],
    ['Chain of Thought', 'Asking the model to reason step by step before giving code, in a single prompt.'],
    ['Prompt chaining', 'A sequence of prompts where each output feeds the next (pseudocode → code → tests → refine).'],
    ['Socratic prompting', 'Asking the AI to guide you with questions instead of giving the answer.'],
    ['Golden rule for AI code', 'Never submit code you cannot explain. AI output is a proposal, not an authority.'],
    ['Role prompt template', 'Act as a [role]. Do [task]. Here is the [context]. Follow these [constraints]. Present the answer as [output].'],
  ],
  mcq: [
    ['Which is NOT one of the 4 pillars of a code prompt?', ['Context', 'Constraints', 'Compilation', 'Format'], 2, 'Context, Task, Constraints, Format.'],
    ['"Explain the algorithm step by step and do not write code until the logic is complete." This is…', ['Few-shot prompting', 'Chain of Thought', 'Dynamic prompting', 'A hallucination'], 1, 'CoT makes the reasoning visible before code.'],
    ['Pseudocode prompt, then convert to Python, then ask for tests, then refine. This is…', ['Prompt chaining', 'Zero-shot', 'Socratic prompting', 'Recursion'], 0, 'A human-guided pipeline of prompts.'],
    ['An AI confidently gives a wrong fact. This is called…', ['A syntax error', 'A hallucination', 'An exception', 'Short-circuiting'], 1, 'Confident but incorrect output.'],
    ['"Do NOT give me the corrected code; ask me two guiding questions." This is…', ['Socratic role prompting', 'Few-shot', 'Chain of Thought', 'Prompt chaining'], 0, 'The AI acts as a mentor.'],
    ['A vague prompt "Calculate student test average" is likely to…', ['Produce exactly what Kathryn needs', 'Make the AI guess missing requirements', 'Refuse to answer', 'Always fail to run'], 1, 'AI fills in missing details with assumptions.'],
    ['Giving the AI three examples of the output you want is…', ['Zero-shot', 'One-shot', 'Few-shot', 'CoT'], 2, 'Several examples = few-shot.'],
  ],
  blanks: [
    'LLM stands for Large {{Language}} Model.',
    'The four pillars are Context, Task, {{Constraints}} and Format.',
    'Asking the model to think step by step is called Chain of {{Thought}}.',
    'AI output is a {{proposal}}, not an authority.',
    'Never submit code you cannot {{explain}}.',
  ],
  exercises: [
    {
      title: 'Write a 4-pillar prompt',
      task: 'Write a prompt for a program that asks for a student\'s three coursework marks, prints the average to 1 decimal place and a letter grade (A 70+, B 60+, C 50+, D 40+, otherwise F). Label each pillar.',
      solution: `**Context**: I am a first-year computing student learning Python decisions and functions.
**Task**: Write a program that reads three coursework marks (0 to 100), works out the average and prints a letter grade.
**Constraints**: Use a «main()» function and a separate «grade(average)» function with if-elif-else. Grades: A 70+, B 60+, C 50+, D 40+, otherwise F. Use only standard Python. Validate that each mark is between 0 and 100.
**Format**: Pure Python with inline comments, followed by three example runs including the boundary marks 40 and 70.

Then: trace the code yourself, check 39.9 / 40 / 70 boundaries, and make sure you can explain every line.`
    },
  ]
},

  ]
});
