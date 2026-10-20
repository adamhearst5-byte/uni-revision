/* COM106 Introduction to Databases. Notation: «inline code», ~~~ fenced code blocks, {{answer|alt}} blanks. */
window.COURSE = window.COURSE || { modules: [] };
window.COURSE.modules.push({
  id: 'db',
  code: 'COM106',
  name: 'Introduction to Databases',
  short: 'Databases',
  topics: [

/* ------------------------------------------------------------------ */
{
  id: 'db1', week: 1, title: 'Database basics',
  summary: 'Data vs information, why the file-based approach fails, what a DBMS gives you, and the three-level ANSI-SPARC architecture.',
  notes: `
## Data, information, knowledge, wisdom
- **Data** is a disorganised collection of facts, numbers, images, audio clips and so on.
- **Information** is related, organised data.
- **Knowledge** is extracted from related data.
- **Wisdom** is making decisions about future actions, based on knowledge, which is based on data.

## What is a database?
A **database** is a *shared collection of logically related data*, stored in an organised structure, which lets you interact with the data and extract useful information and knowledge.

"Logically related" means the data makes sense together because it describes one coherent system, entity or activity.

## How we got here
- **Manual filing systems**: documents in locked cabinets, perhaps across sites. Fine for small volumes or pure store-and-retrieve, but data is decentralised, duplicated and hard to summarise (e.g. the total salary bill across all departments).
- **File-based approach**: the first computerisation. Each application (e.g. payroll) worked on its own data files. Later, files were shared to reduce duplication.

## Problems with the file-based approach
- No data centralisation, so data is isolated and separated.
- Poor file design leads to **data duplication (redundancy)**.
- Updating many copies is inefficient and risks losing **data integrity**.
- **Data dependence**: dependent data should be updated together.
- Programs need to know the file storage structures (queries are not independent of the files).
- Incompatible file formats.
- Security only at file level, not data-item level.
- Limited structure, so only limited queries are possible.

## Key terms
- **Data integrity** = **consistency** (is duplicate data identical?) + **correctness** (is stored data accurate?). Maintained by a correct data model, validation on entry, protection from corruption or unauthorised access, and backup / recovery / transaction integrity.
- **Data dependency**: knowing the value of one piece of data is enough to tell you the value of another in the same table. Example: «Dept#» gives «DName» gives «Manager». The reverse is not necessarily true.

## The database approach and the DBMS
A database is **data-centred**, designed for the needs of the whole organisation, and shared among applications.

A **DBMS** (database management system) is software that manages a database: it allows **creation, manipulation (queries) and maintenance** of data and provides **controlled access** (security, integrity, recovery).

| DBMS | Notes |
|---|---|
| Microsoft Access | Single user, limited database size |
| Microsoft SQL Server | Multi-user, larger databases (used in the labs) |
| MySQL | Free, common as the database server for web apps |
| Oracle | Large-scale, multi-user, expensive, many facilities |

## Four main advantages of a database
1. **Data independence**: application programs are insulated from the data.
2. **Centralised data**: security and integrity can be maintained.
3. **Access flexibility**: a query language plus storage mechanisms.
4. **Data model**: reflects the real world (hierarchical, network, relational, object-oriented).

Other advantages: enforcement of standards, data sharing, economy of scale, increased productivity.

Disadvantages: **complexity**, **cost** (DBMS, conversion, maintenance), **higher impact of failure** (the downside of centralisation).

## DBMS facilities and functions
- Facilities: application programming language, report generator, **data dictionary** (stores data definitions), query language (SQL), screen/form editor.
- Functions: storage, retrieval and update; system catalogue; **transaction support** (concurrency control and recovery); user authorisation; network access; integrity; utilities (indexing, monitoring, import/export).

## ANSI-SPARC three-level architecture
| Level | Also called | What it holds |
|---|---|---|
| External | Views | What users and programs see: queries, reports |
| Conceptual | Database schema | One logical representation of all the data, e.g. linked tables |
| Internal | Physical | How data is stored and the access paths to it |

Each level is defined by a **schema**. The database schema is the blueprint of how the database is built.
- **Logical independence**: changes at one level (e.g. to applications or the logical design) do not necessarily force changes to the stored tables, and vice versa.
- **Physical independence**: changes to record storage do not necessarily require changes to the applications.

## Transactions
A **transaction** is one or more atomic, sequential operations that make up a single task. Operations fall into **CRUD**: Create, Read, Update, Delete.

ATM withdrawal: **Read** the balance, **Update** it (balance minus £20), **Create** a log record.

## Data models and NoSQL
Data models: hierarchical, network, **relational** (this module), object-oriented.

**NoSQL** ("Not only SQL"): document stores, key-value stores, graph databases (MongoDB, CouchDB, Neo4j). Useful when you need a flexible schema, huge volumes of unstructured data (big data), or when scaling matters more than consistency.

## Module facts worth knowing
- Assessment is **100% coursework**: Set Exercise **40%** (90 minutes, in your week 8 lab, w/c 9 November 2026) and Assignment **60%** (design document of 3 pages plus a 10 minute screencast, due **Friday 11 December 2026, 12 noon**).
- You pass with **40% aggregated** across both pieces. No written exam.
- Expect 200 hours of effort, of which about 140 to 152 are independent study (10 to 12 hours a week).
`,
  cards: [
    ['What is a database?', 'A shared collection of logically related data, stored in an organised structure, that lets you interact with the data and extract information and knowledge.'],
    ['Data → Information → Knowledge → Wisdom', 'Data: disorganised facts. Information: related data. Knowledge: extracted from related data. Wisdom: decisions based on knowledge.'],
    ['What is a DBMS?', 'Software that manages a database: creation, manipulation (queries) and maintenance of data, with controlled access (security, integrity, recovery).'],
    ['Two parts of data integrity', 'Consistency (duplicate data is identical) and correctness (stored data is accurate).'],
    ['Data dependency', 'Knowing the value of one piece of data uniquely tells you the value of another in the same table, e.g. Dept# → DName.'],
    ['Name four problems with the file-based approach', 'Any four of: no centralisation, duplication/redundancy, loss of integrity on update, data dependence, programs tied to file structures, incompatible formats, file-level security only, limited queries.'],
    ['Four main advantages of a database', 'Data independence, centralised data, access flexibility, a data model that reflects the real world.'],
    ['Three disadvantages of a DBMS', 'Complexity, cost, and higher impact of failure.'],
    ['ANSI-SPARC three levels', 'External (views), Conceptual (database schema), Internal (physical storage).'],
    ['Physical data independence', 'Changes to how records are stored do not necessarily require changes to the applications.'],
    ['What is a transaction?', 'One or more atomic, sequential operations that make up a single task.'],
    ['CRUD', 'Create, Read, Update, Delete: the four kinds of operation in a transaction.'],
    ['What is the data dictionary?', 'Part of the DBMS (system catalogue) that stores the definitions of all data objects, independently of the stored data.'],
    ['What does NoSQL stand for, and give 3 kinds', '"Not only SQL". Document stores, key-value stores, graph databases.'],
    ['COM106 assessment split', 'Set Exercise 40% (week 8 lab, 90 mins) + Assignment 60% (due Fri 11 Dec 2026, noon). Pass = 40% overall.'],
  ],
  mcq: [
    ['Which best defines a database?', ['Any file stored on a computer', 'A shared collection of logically related data in an organised structure', 'A spreadsheet with more than one sheet', 'A program that writes SQL'], 1, 'The lecture definition: a shared collection of logically related data, stored in an organised structure.'],
    ['Which of these is NOT a problem of the file-based approach?', ['Data duplication', 'Incompatible file formats', 'Data independence', 'Security only at file level'], 2, 'Data independence is an advantage of the database approach. File-based systems suffer from data dependence.'],
    ['Data integrity is concerned with…', ['Speed and size', 'Consistency and correctness', 'Cost and complexity', 'Tables and views'], 1, 'Consistency (are duplicates identical?) and correctness (is the data accurate?).'],
    ['In ANSI-SPARC, which level describes how data is physically stored?', ['External', 'Conceptual', 'Internal', 'Logical'], 2, 'The internal (physical) level defines storage and access paths.'],
    ['In ANSI-SPARC, which level holds user views, queries and reports?', ['External', 'Conceptual', 'Internal', 'Network'], 0, 'The external level is made of views.'],
    ['An ATM withdrawal reads the balance, updates it and logs the transaction. Which CRUD operation is the log?', ['Create', 'Read', 'Update', 'Delete'], 0, 'Writing a new log record is a Create.'],
    ['Which is a disadvantage of a DBMS?', ['Data sharing', 'Higher impact of failure', 'Enforcement of standards', 'Increased productivity'], 1, 'Centralisation means a failure affects everything.'],
    ['Which DBMS is used in the COM106 labs?', ['MySQL', 'Oracle', 'Microsoft SQL Server / Azure SQL', 'MongoDB'], 2, 'The labs use Microsoft SQL Server (or Azure SQL Database).'],
    ['A table has Dept#, DName and Manager. Knowing Dept# tells you DName, which tells you Manager. This is an example of…', ['A transaction', 'Data dependency', 'A view', 'Normal form'], 1, 'Knowing one value uniquely identifies another: a dependency.'],
    ['NoSQL databases are best suited to…', ['Small, fixed, highly consistent data', 'Flexible schemas and huge volumes of unstructured data', 'Only financial records', 'Replacing all relational databases'], 1, 'NoSQL suits flexible schemas, big data, and scale over consistency.'],
    ['To pass COM106 you need…', ['40% in each component', '40% aggregated over both components', '50% overall', 'To pass the exam'], 1, 'It is not necessary to pass each component separately; there is no exam.'],
  ],
  blanks: [
    'A database is a {{shared}} collection of logically related data.',
    'A DBMS provides {{controlled access}} to data: security, integrity and recovery.',
    'Data integrity covers {{consistency}} and {{correctness}}.',
    'The three ANSI-SPARC levels are external, {{conceptual}} and {{internal}}.',
    'The four transaction operations are known by the acronym {{CRUD}}.',
    'NoSQL stands for "{{Not only SQL}}".',
    'The part of the DBMS that stores definitions of all data objects is the {{data dictionary|system catalog|system catalogue}}.',
    'The COM106 assignment is worth {{60}}% and the set exercise is worth {{40}}%.',
  ],
  exercises: [
    {
      title: 'Spot the file-based problems',
      task: `A university keeps separate files: Student Accommodation, Student Registration, Payroll and Accommodation Staff. Joe Blogs is in Room D1 in one file, and Mary Smith is in flat 10 in one file but Room A1 in another. Pat is an "Inspector" in Payroll but a "Cleaner" in Accommodation Staff.

List the problems of the file-based approach this shows, and say how a database would fix each one.`,
      solution: `- **No data centralisation**: each department keeps its own files. A database stores the data once, centrally, and shares it.
- **Duplication / redundancy**: names and addresses appear in several files. A database stores each fact once.
- **Loss of integrity (inconsistency)**: Mary has two addresses and Pat has two positions. With one central copy there is nothing to disagree with.
- **Possible incompatible file formats** between departments. A DBMS gives one format and one query language.
- **Limited queries**: e.g. listing all staff and students in one building is hard across files. SQL can join tables.`
    },
    {
      title: 'Pass or fail?',
      task: `Work out the module mark (Set Exercise 40%, Assignment 60%) and say pass or fail:
1. Set Exercise 60%, Assignment 50%
2. Set Exercise 80%, Assignment 10%
3. Set Exercise 75%, Assignment 25%`,
      solution: `Module mark = 0.4 × SE + 0.6 × A.
1. 0.4×60 + 0.6×50 = 24 + 30 = **54%, pass**
2. 0.4×80 + 0.6×10 = 32 + 6 = **38%, fail**
3. 0.4×75 + 0.6×25 = 30 + 15 = **45%, pass**

Heads up: two rows of the table on the lecture slide (10% / 55% and 39% / 40%) don't match this 40/60 formula, so check those with the module team if it matters to you.`
    },
  ]
},

/* ------------------------------------------------------------------ */
{
  id: 'db2', week: 2, title: 'Relational model and keys',
  summary: 'Relations, attributes, tuples and domains. Super, candidate, primary, alternate, composite and foreign keys. Entity and referential integrity.',
  notes: `
## The relational model
Proposed by **E. F. Codd (1970)** and based on mathematical **set theory**. It shows data as two-dimensional tables (relations) and defines relational algebra operations on them. SQL (standardised by ANSI in 1986) is how we manipulate relational data.

## Terminology
| Relational | Common | File-based |
|---|---|---|
| Relation | Table | File |
| Attribute | Column | Field |
| Tuple | Row | Record |
| Domain | (data type) | Data type |

- **Relation**: a named table with attributes (columns) and tuples (rows).
- **Attribute**: a named column, defined on a domain.
- **Tuple**: a row; one value per attribute.
- **Domain**: the set of all allowable values for an attribute (not just those present now). In practice we use **data types** plus **integrity constraints** (e.g. age is «tinyint» and must be 0 to 99). To join two tables, the linking attributes must share a domain / data type.

## Properties of a relation
- Each relation has a distinct name; each attribute has a distinct name.
- Each cell holds a **single (atomic) value**.
- All values of an attribute come from the same domain.
- **No duplicate tuples**.
- The order of attributes and of tuples has **no significance**.

## Relation schema
The relation name followed by its attributes in brackets, e.g. «PATIENT (patient_no, pat_name, condition, doctor)». Primary keys are underlined; in this module foreign keys are marked with an asterisk, e.g. «EMP (emp_no, ename, dept_no*)».

## Keys
- **Super key**: any combination of attributes that uniquely identifies each row.
- **Candidate key (CK)**: a super key that is **minimal**: (1) unique identification and (2) no attribute can be removed without losing uniqueness.
- **Primary key (PK)**: the candidate key chosen as the table's identifier.
- **Alternate key**: any candidate key not chosen as the PK (e.g. «nat_ins_no» when «emp_no» is the PK).
- **Composite key**: a key made of two or more attributes.
- **Foreign key (FK)**: an attribute in one table that matches the PK of another table; it expresses a relationship.

Because no two tuples are identical, a key always exists (even if it has to be all the attributes together).

## Choosing a primary key
Ask which attribute has unique values, and if none does, which combination does. This needs real-world knowledge of the domains.
- «EMPLOYEE (emp_no, ename, salary)»: names and salaries can repeat, so the PK is «emp_no».
- «TAKES (student_no, module_code, exam_result)»: a student takes many modules and a module has many students, so the PK is the composite «(student_no, module_code)».
- Sometimes an artificial key (like a student B-code) replaces a long composite key.

## Integrity rules
1. **Entity integrity**: no attribute of a primary key may be **NULL**.
2. **Referential integrity**: every FK value must either **match a PK value** in the referenced table or be **wholly NULL**.

**NULL** means unknown or not applicable. It is not zero and not spaces; it is the absence of a value.

Example: in «EMP (emp_no, ename, dept_no*)» and «DEPT (dept_no, dname)» you cannot give an employee department C unless C exists in DEPT. A NULL dept_no means "not yet assigned".

## What happens on delete?
If you delete a DEPT row that EMP rows still reference, SQL Server by default raises an error. The FK constraint can specify:
| Option | Effect |
|---|---|
| NO ACTION | Default. Error raised, nothing deleted |
| CASCADE | Matching rows in the referencing table are deleted too |
| SET NULL | The FK values are set to NULL |
| SET DEFAULT | The FK values are set to their default |
`,
  cards: [
    ['Who proposed the relational model, and when?', 'E. F. Codd, 1970. It is based on mathematical set theory.'],
    ['Relation / attribute / tuple in everyday words', 'Table / column / row (file / field / record in file-based terms).'],
    ['What is a domain?', 'The set of all allowable values for an attribute. In practice: a data type plus integrity constraints.'],
    ['Super key', 'Any combination of attributes that uniquely identifies every row.'],
    ['Candidate key', 'A minimal super key: unique, and no attribute can be removed without losing uniqueness.'],
    ['Primary key', 'The candidate key chosen as the unique identifier of the table.'],
    ['Alternate key', 'A candidate key that was not chosen as the primary key.'],
    ['Composite key', 'A key made of two or more attributes.'],
    ['Foreign key', 'An attribute in one table that matches the primary key of another table, used to express a relationship.'],
    ['Entity integrity rule', 'No attribute that is part of a primary key can be NULL.'],
    ['Referential integrity rule', 'Every foreign key value must match an existing primary key value, or be wholly NULL.'],
    ['What is NULL?', 'The absence of a value: unknown or not applicable. Not zero, not spaces.'],
    ['Default ON DELETE behaviour in SQL Server', 'NO ACTION: an error is raised and nothing is deleted.'],
    ['ON DELETE CASCADE', 'Deleting a parent row also deletes the rows that reference it.'],
    ['Six properties of a relation', 'Distinct relation name; distinct attribute names; atomic cell values; values from one domain per attribute; no duplicate tuples; order of attributes and tuples is insignificant.'],
  ],
  mcq: [
    ['In relational terms, a row is called a…', ['Domain', 'Tuple', 'Attribute', 'Relation'], 1, 'Row = tuple = record.'],
    ['Which is NOT a property of a relation?', ['Each cell holds one atomic value', 'Tuples must be stored in key order', 'No duplicate tuples', 'Each attribute has a distinct name'], 1, 'Tuple order has no significance.'],
    ['TAKES (student_no, module_code, exam_result). What is the primary key?', ['student_no', 'module_code', 'student_no + module_code', 'exam_result'], 2, 'A student takes many modules and a module has many students, so only the combination is unique.'],
    ['EMP (emp_no, nat_ins_no, ename). emp_no is the PK. nat_ins_no is…', ['A foreign key', 'An alternate key', 'A composite key', 'A super key only'], 1, 'It is a candidate key that was not chosen: an alternate key.'],
    ['Which rule says a primary key cannot be NULL?', ['Referential integrity', 'Entity integrity', 'Domain integrity', 'First normal form'], 1, 'Entity integrity.'],
    ['A foreign key value may be…', ['Any value at all', 'Only a value that exists as a PK in the referenced table, or NULL', 'Never NULL', 'Only a number'], 1, 'That is the referential integrity rule.'],
    ['You delete DEPT row B, but EMP rows have dept_no B. With the SQL Server default, what happens?', ['The EMP rows are deleted', 'The EMP dept_no values become NULL', 'An error is raised and nothing is deleted', 'Department B is renamed'], 2, 'NO ACTION is the default.'],
    ['Which ON DELETE option removes the referencing rows automatically?', ['NO ACTION', 'SET NULL', 'CASCADE', 'SET DEFAULT'], 2, 'CASCADE deletes the child rows.'],
    ['A candidate key must be unique and…', ['Numeric', 'Minimal', 'Composite', 'A foreign key'], 1, 'Minimality: no attribute can be dropped without losing uniqueness.'],
    ['In this module, how are foreign keys marked in a schema?', ['Underlined', 'In bold', 'With an asterisk *', 'In capitals'], 2, 'PKs are underlined; FKs get an asterisk.'],
    ['NULL is the same as…', ['Zero', 'An empty string', 'Nothing: it is the absence of a value', 'A space'], 2, 'NULL means unknown or not applicable.'],
  ],
  blanks: [
    'In relational terms a table is a {{relation}}, a column is an {{attribute}} and a row is a {{tuple}}.',
    'The set of allowable values for an attribute is its {{domain}}.',
    'A {{candidate}} key is a minimal super key.',
    'A key made of two or more attributes is a {{composite}} key.',
    'The {{entity}} integrity rule says no part of a primary key may be NULL.',
    'A foreign key must match an existing primary key value or be wholly {{NULL}}.',
    'In SQL Server the default ON DELETE action is {{NO ACTION}}.',
    'The relational model was proposed by {{Codd}} in {{1970}}.',
  ],
  exercises: [
    {
      title: 'Find the keys',
      task: `For each relation, list the candidate keys, choose a primary key and name any alternate keys. State your assumptions.
1. «STUDENT (student_no, email, name, dob)»
2. «ENROLMENT (student_no, module_code, year, grade)»
3. «CAR (reg_no, vin, make, model, colour)»`,
      solution: `1. CKs: «student_no», «email» (assuming every student has a unique email). PK «student_no»; alternate key «email».
2. A student may retake a module in another year, so the CK is «(student_no, module_code, year)». PK is that composite. No alternate key.
3. CKs: «reg_no», «vin» (both unique to a vehicle). PK «reg_no» (familiar, short); alternate key «vin».`
    },
    {
      title: 'Referential integrity in practice',
      task: `«EMP (emp_no, ename, dept_no*)» holds (1, Smith, A), (2, Jones, A), (3, White, B), (4, Brown, B). «DEPT (dept_no, dname)» holds (A, Sales), (B, Admin).

Which of these are allowed with the default constraint?
1. Insert employee (5, Green, C)
2. Insert employee (6, Black, NULL)
3. Delete department A
4. Insert department (C, Finance), then insert (5, Green, C)`,
      solution: `1. **Rejected**: department C does not exist.
2. **Allowed**: a NULL FK means "not yet assigned".
3. **Rejected**: Smith and Jones reference A (NO ACTION).
4. **Allowed**: once C exists in DEPT, Green can reference it.`
    },
  ]
},

/* ------------------------------------------------------------------ */
{
  id: 'db3', week: 2, title: 'Entity-relationship modelling',
  summary: 'Entities, attributes and relationships. Cardinality, participation and multiplicity. Weak entities, fan traps and chasm traps.',
  notes: `
## Where ER modelling fits
| Stage | Task | Result |
|---|---|---|
| Data investigation | Find out the nature and use of the data | Outline data dictionary |
| Data modelling | Shape real-world facts into concepts | Conceptual model (ER diagram) |
| Conceptual design | Map to a specific data model | Relational schema |
| Implementation | Build the physical database | Internal schema and database |
| Security, monitoring, tuning | Secure, monitor and reorganise | Optimised, secure database |

The design process: **(1)** draw an ER diagram, **(2)** map it to a relational schema, **(3)** check each table is in **3NF** (normalisation). ER modelling is **top-down**; normalisation is **bottom-up**.

Keep the model relevant and limited to the application: a hospital billing database does not need allergies.

## Entities
An **entity type** is a group of objects with the same properties that the enterprise sees as important, uniquely identifiable, and described by more than one attribute. An **entity occurrence** is one instance.

Entities are usually **nouns**: people (staff, patients), objects (vehicles), organisations (suppliers), classes of thing (films, species) and events (exams, sales). Not every noun is an entity: skip it if there is only one instance, a fixed set (days of the week), or nobody cares about the instances.

By convention entity names are **singular** and in capitals: «MODULE», not «MODULES».

## Attributes
- **Simple**: one component (name, cost).
- **Composite**: several components (date = day/month/year).
- **Multi-valued**: several values (phone numbers).
- **Derived**: calculable from others (total cost = quantity × unit cost).
- The **identifier** (one attribute or a combination) becomes the primary key.
- Relationships can have attributes too, e.g. the «result» of a competitor in an event.

Do not put two or more attributes describing *another* entity in a table (team manager's name is fine in COUNTRY; adding the manager's mobile too suggests a TEAM_MANAGER entity).

## Relationships
A **relationship** is a meaningful association between entities, usually a **verb** ("DEPARTMENT Employs EMPLOYEE"). In Chen notation entities are **rectangles** and relationships are **diamonds**.

- **Degree**: number of entity types taking part (unary/recursive, binary, ternary).
- **Cardinality ratio**: 1:1, 1:N, N:1 or M:N. Always check **both directions**.
- **Participation**: **full** (mandatory, every instance takes part, shown by a **double line**) or **partial** (optional, **single line**). Assume full unless the scenario says otherwise.

### Reading cardinality
- 1:1: every lecturer teaches at most one module AND every module is taught by at most one lecturer.
- 1:N: a lecturer may teach many modules, but each module has one lecturer.
- M:N: lecturers teach many modules AND modules have many lecturers.

### Time changes cardinality
If DEPARTMENT Employs EMPLOYEE records only the **current** situation it is 1:N. If it records **history** (all past departments), it becomes M:N.

## Multiplicity (min, max)
Cardinality and participation together are called **multiplicity**:
| Notation | Meaning |
|---|---|
| (0,1) | zero or one |
| (1,1) | exactly one |
| (0,*) | zero or many |
| (1,*) | one or many |
| (3,8) | at least 3, at most 8 |

A minimum of 0 means partial participation; a minimum of 1 means full.

## Strong and weak entities
A **weak entity** is existence-dependent on another entity (NEXT_OF_KIN only exists if the PATIENT does). A **strong entity** is not. Most entities are strong.

## Connection traps
- **Fan trap**: two 1:N relationships fan out from a central entity, so the path between two related entities is ambiguous. DIVISION has DEPARTMENTs and DIVISION has EMPLOYEEs: which department is employee B in? Fix it by restructuring so the direct link exists (DIVISION has DEPARTMENT, DEPARTMENT employs EMPLOYEE).
- **Chasm trap**: the indirect path includes **partial participation**, so some related occurrences have no connection at all. BRANCH has STAFF who oversee ACCOUNTs, but an account with no staff member cannot be traced to a branch. Fix it by adding the missing direct relationship (BRANCH Holds ACCOUNT).

## Notation
COM106 uses **Chen** notation. Connolly and Begg use **UML**, and you will also see **Crow's foot**.

## Steps to draw an ER diagram
1. Identify entity types (nouns), their attributes and identifiers.
2. Identify relationships (verbs) and any relationship attributes.
3. Decide the cardinality ratio of each relationship.
4. Decide the participation of each entity in each relationship.
5. Combine everything into the diagram.

## Special cases from the labs
- **Two relationships between the same entities** (FLIGHT Departs_from AIRPORT and Arrives_at AIRPORT) each need their own named diamond.
- **Recursive (unary)** relationship: EMPLOYEE Supervises EMPLOYEE. Label both ends with roles (supervisor, supervisee). It maps to an FK in EMPLOYEE that refers to EMPLOYEE's own PK.
- An attribute that depends on two entities at once (quantity of a product on an order) belongs to the **relationship**, and becomes a column in the link table.
- An **associative entity** such as RENTAL records the details of an event that belong to no single other entity.
`,
  cards: [
    ['Entity type', 'A group of objects with the same properties that the enterprise sees as important, uniquely identifiable, and described by more than one attribute.'],
    ['Entity vs entity occurrence', 'The entity type is the category (STUDENT); an occurrence is one instance (Joe Blogs).'],
    ['Chen notation shapes', 'Entity = rectangle; relationship = diamond; full participation = double line; partial = single line.'],
    ['Composite attribute', 'An attribute made of several components, e.g. date = day/month/year.'],
    ['Derived attribute', 'A value that can be calculated from other attributes, e.g. total cost = quantity × unit cost.'],
    ['Multi-valued attribute', 'An attribute that can hold several values, e.g. phone numbers.'],
    ['Degree of a relationship', 'The number of entity types taking part: unary, binary, ternary…'],
    ['Cardinality ratio', 'The type of relationship between entities: 1:1, 1:N, N:1 or M:N. Check it in both directions.'],
    ['Full vs partial participation', 'Full: every instance must take part (double line). Partial: some instances may not (single line).'],
    ['What does (0,*) mean?', 'Zero or many: partial participation, many maximum.'],
    ['Weak entity', 'An entity that is existence-dependent on another entity, e.g. NEXT_OF_KIN depends on PATIENT.'],
    ['Fan trap', 'Two 1:N relationships fan out from a central entity, making the path between two related entities ambiguous. Fix by restructuring.'],
    ['Chasm trap', 'The indirect path between related entities includes partial participation, so some occurrences cannot be connected. Fix by adding the direct relationship.'],
    ['How can time change cardinality?', 'Current situation only → 1:N (employee in one department). Historic → M:N (all departments ever).'],
    ['Recursive relationship', 'An entity related to itself (EMPLOYEE Supervises EMPLOYEE). Label each end with a role.'],
    ['Top-down vs bottom-up design', 'ER modelling is top-down (generalisation of entities and relationships). Normalisation is bottom-up.'],
  ],
  mcq: [
    ['In Chen notation a relationship is drawn as a…', ['Rectangle', 'Oval', 'Diamond', 'Double rectangle'], 2, 'Entities are rectangles; relationships are diamonds.'],
    ['Each competitor is sent by one country; a country sends many competitors. COUNTRY Sends COMPETITOR is…', ['1:1', '1:N', 'M:N', 'N:1 from COUNTRY to COMPETITOR'], 1, 'One country, many competitors.'],
    ['Competitors compete in many events and events have many competitors. This is…', ['1:1', '1:N', 'M:N', 'Unary'], 2, 'Many in both directions.'],
    ['Full participation on an ER diagram is shown with…', ['A dashed line', 'A double line', 'An arrow', 'A circle'], 1, 'Double line = full; single line = partial.'],
    ['If no evidence is given, the default participation to assume is…', ['Partial', 'Full', 'None', 'Recursive'], 1, 'The lecture says assume FULL unless told otherwise.'],
    ['A project uses at least one part, possibly many. The multiplicity of PROJECT in Used_in is…', ['(0,1)', '(1,1)', '(0,*)', '(1,*)'], 3, 'Minimum 1, maximum many.'],
    ['NEXT_OF_KIN is only recorded if a PATIENT is recorded. NEXT_OF_KIN is a…', ['Strong entity', 'Weak entity', 'Derived attribute', 'Link table'], 1, 'It is existence-dependent on PATIENT.'],
    ['A path between two entities passes through partial participation, so some links are lost. This is a…', ['Fan trap', 'Chasm trap', 'Transitive dependency', 'Deletion anomaly'], 1, 'Chasm trap: there is a gap in the path.'],
    ['Two 1:N relationships fan out from DIVISION to DEPARTMENT and EMPLOYEE, so you cannot tell which department an employee is in. This is a…', ['Fan trap', 'Chasm trap', 'Weak entity', 'Composite key'], 0, 'Fan trap: an ambiguous path.'],
    ['DEPARTMENT Employs EMPLOYEE must record every department an employee has ever worked in. The cardinality is…', ['1:1', '1:N', 'M:N', 'Unary'], 2, 'Historic data turns 1:N into M:N.'],
    ['Which is the best name for an entity type?', ['STUDENTS', 'Student_records', 'STUDENT', 'enrols'], 2, 'Singular nouns in capitals; verbs name relationships.'],
    ['Quantity of each product on an order depends on both ORDER and PRODUCT. Where does it belong?', ['In ORDER', 'In PRODUCT', 'On the Contains relationship (link table)', 'Nowhere, it is derived'], 2, 'An attribute of the M:N relationship, which becomes a link-table column.'],
  ],
  blanks: [
    'Entities are usually {{nouns}} and relationships are usually {{verbs}} in the scenario description.',
    'The number of entity types in a relationship is its {{degree}}.',
    'Cardinality ratio and participation together are called {{multiplicity}}.',
    'A {{weak}} entity is existence-dependent on another entity.',
    'A {{chasm}} trap happens when the connecting path includes partial participation.',
    'A {{fan}} trap happens when two 1:N relationships fan out from a central entity.',
    'COM106 uses {{Chen}} notation for ER diagrams.',
    'ER modelling is a {{top-down}} approach, and normalisation is {{bottom-up}}.',
  ],
  exercises: [
    {
      title: 'Hospital ER model (Lab 4, scenario 3)',
      task: `A hospital has wards, each with patients. A consultant is in charge of only one ward and a ward has only one consultant (observation wards have none). Patients can undergo several operations; some consultants perform operations, and each operation is performed by one consultant. Nurses are allocated to just one ward (unless on a training course).

Identify the entities, relationships, cardinalities and participation constraints.`,
      solution: `**Entities**: WARD, PATIENT, CONSULTANT, NURSE, OPERATION.

**Relationships**
- WARD Contains PATIENT **1:N**. PATIENT full, WARD full (assume every ward has patients).
- CONSULTANT In_charge_of WARD **1:1**. CONSULTANT full, WARD **partial** (observation wards have none).
- PATIENT Undergoes OPERATION **1:N**. OPERATION full, PATIENT partial (not every patient has surgery).
- CONSULTANT Performs OPERATION **1:N**. OPERATION full, CONSULTANT **partial** ("some consultants perform operations").
- WARD Staffed_by NURSE **1:N**. NURSE **partial** (nurses on training courses have no ward), WARD full.

**Mapped schema** (from the lab solution): «WARD (ward_number, ward_name, number_of_beds)», «PATIENT (patient_number, p_name, p_address, ward_number*)», «CONSULTANT (consultant_code, c_name, c_phone_number, ward_number*)», «NURSE (staff_number, s_name, s_grade, ward_number*)», «OPERATION (operation_number, op_type, op_date, patient_number*, consultant_code*)».`
    },
    {
      title: 'Online retail (Lab 3, scenario 6)',
      task: `A customer can place many orders; each order is placed by one customer. An order contains many products and a product appears on many orders, with a quantity for each. Each order is settled by exactly one payment. Each product has one supplier; a supplier supplies many products.

Give the relationships with cardinality and participation.`,
      solution: `- CUSTOMER Places ORDER **1:N**. ORDER full; CUSTOMER partial (may not have ordered yet).
- ORDER Contains PRODUCT **M:N**, with **quantity** as a relationship attribute. ORDER full; PRODUCT partial.
- ORDER Paid_by PAYMENT **1:1**, both full.
- SUPPLIER Supplies PRODUCT **1:N**. PRODUCT full; SUPPLIER partial.`
    },
    {
      title: 'Fix the trap',
      task: `BRANCH Has STAFF (1:N) and STAFF Oversees ACCOUNT (1:N). Not every account is overseen by a member of staff. Which trap is this, why is it a problem, and how do you fix it?`,
      solution: `It is a **chasm trap**. ACCOUNT participates **partially** in Oversees, so an account with no staff member has no path to a branch, and you cannot answer "which branch holds account A4?". Fix it by adding the direct relationship **BRANCH Holds ACCOUNT (1:N)**.`
    },
  ]
},

/* ------------------------------------------------------------------ */
{
  id: 'db4', week: 3, title: 'Mapping to the relational model',
  summary: 'Turning an ER diagram into linked tables: key copying, link tables, and the 1:1, 1:N and M:N mapping rules.',
  notes: `
## Three steps
1. **Create a relation for each entity type.** The entity identifier becomes the primary key.
2. **Link the tables using the mapping rules**: either copy primary keys into other tables as foreign keys, or create link tables (relationship relations).
3. **Complete the relations**: remove derived attributes, add "active attributes" to link tables, remove unnecessary tables.

## Two ways to link tables
| | Key copying | Link table |
|---|---|---|
| How | Copy (post) a PK into another table as an FK | New table whose PK combines both PKs |
| Extra tables | None, so no extra join overhead | One more table and join |
| M:N? | Not possible | Required |
| NULLs | May create NULL FKs when participation is partial | Reduces NULLs |

Where possible, reduce NULLs by design.

## The mapping rules
- **1:1**: copy the PK of **either** table into the other as an FK, **but not both**. The FK must hold **unique** values.
- **1:N**: copy the PK of the **"1" side** into the **"N" side** as an FK. The FK will (and should) contain duplicates.
- **M:N**: create a **link table** named after the relationship, whose PK is the **composite** of both PKs. Add any active attributes. (An artificial «id» PK is an alternative.)

### Examples
~~~
DEPARTMENT Employs EMPLOYEE (1:N)
  DEPARTMENT (dno, dname)
  EMPLOYEE   (eno, ename, salary, dno*)

WARD Contains PATIENT (1:N)
  WARD    (wardnum, wname)
  PATIENT (patnum, pname, wardnum*)

EMPLOYEE Assigned CAR (1:1)
  EMPLOYEE (enum, ename)
  CAR      (regnum, make, model, enum*)   -- enum must be unique

SUPPLIER Ships PART (M:N)
  SUPPLIER (sno, supp_name)
  PART     (pno, part_name)
  SHIPS    (sno*, pno*, quantity)         -- PK is (sno, pno)
~~~

In SHIPS, «sno» and «pno» both repeat. Effectively SUPPLIER to SHIPS is 1:N and PART to SHIPS is 1:N.

If CAR only ever held «regnum», you could drop the CAR entity and keep «regnum» as an attribute of EMPLOYEE.

## Completing the relations
- **Remove derived attributes**: total cost, pension contribution and so on are calculated in queries and reports.
- **Add active attributes** to link tables: usually amounts or dates, e.g. «mark» in «SITS (student_num*, exam_code*, mark)», or «role» and «duration» in «WORKS (eno*, pno*, role, duration)».
- **Remove unnecessary tables**: in «EMPLOYEE (eno, ename)», «AWARDED (eno*, qual*)», «QUALIFICATION (qual)», QUALIFICATION adds nothing because «qual» is already in AWARDED, so drop it.

## The projemp schema used in the labs
~~~
DEPT  (dno, dname, location)
EMP   (eno, ename, salary, age, supno, dno*)
WORKS (eno*, pno*, role, duration)
PROJ  (pno, pname, ptype, budget)
~~~
`,
  cards: [
    ['Three steps of mapping to the relational model', '1. A table per entity (identifier → PK). 2. Link tables with the mapping rules. 3. Complete the relations.'],
    ['1:1 mapping rule', 'Copy the PK of either table into the other as an FK (not both). The FK must be unique.'],
    ['1:N mapping rule', 'Copy the PK from the "1" table into the "N" table as an FK.'],
    ['M:N mapping rule', 'Create a link table whose PK is the composite of both PKs, plus any active attributes.'],
    ['Key copying vs link table: which is needed for M:N?', 'A link table. Key copying cannot express M:N.'],
    ['Advantage of key copying', 'No extra tables, so no extra join overhead.'],
    ['Advantage of a link table for some 1:1 / 1:N relationships', 'Fewer NULL foreign keys when participation is partial.'],
    ['What is an active attribute?', 'An attribute of a relationship, usually an amount or date (mark, quantity, role), stored in the link table.'],
    ['Why remove derived attributes?', 'They can be calculated in queries and reports, so storing them wastes space and risks inconsistency.'],
    ['When is a table unnecessary?', 'When all its attributes appear in another table and it links to nothing else, e.g. QUALIFICATION (qual) alongside AWARDED (eno*, qual*).'],
    ['In a 1:N mapping, should the FK hold duplicates?', 'Yes: many rows on the N side share the same FK value. In a 1:1 mapping the FK must be unique.'],
    ['projemp schema', 'DEPT (dno, dname, location); EMP (eno, ename, salary, age, supno, dno*); WORKS (eno*, pno*, role, duration); PROJ (pno, pname, ptype, budget).'],
  ],
  mcq: [
    ['WARD Contains PATIENT is 1:N. Where does the foreign key go?', ['wardnum in PATIENT', 'patnum in WARD', 'Both', 'A new link table'], 0, 'Copy the PK of the "1" side into the "N" side.'],
    ['STUDENT Sits EXAM is M:N. The correct mapping is…', ['Put exam_code in STUDENT', 'Put student_num in EXAM', 'Create SITS (student_num*, exam_code*, mark)', 'Merge STUDENT and EXAM'], 2, 'M:N always needs a link table with a composite PK.'],
    ['For a 1:1 relationship, the copied foreign key must…', ['Allow duplicates', 'Be unique', 'Be part of a composite key', 'Be copied in both directions'], 1, 'A 1:1 is a special 1:N where the FK holds unique values.'],
    ['Which is a disadvantage of using a link table?', ['It cannot hold M:N', 'It adds an extra join', 'It creates more NULLs', 'It breaks referential integrity'], 1, 'An extra table means extra join overhead.'],
    ['"mark" in SITS (student_num*, exam_code*, mark) is called…', ['A derived attribute', 'An active attribute', 'A super key', 'A weak entity'], 1, 'Active attributes are usually amounts or dates on a relationship.'],
    ['Total_cost = unit_cost × quantity should be…', ['Stored in every table', 'Removed as a derived attribute', 'Made the primary key', 'Put in a link table'], 1, 'Derived attributes are calculated, not stored.'],
    ['In SHIPS (sno*, pno*, quantity), what is the primary key?', ['sno', 'pno', '(sno, pno)', 'quantity'], 2, 'The composite of both copied PKs.'],
    ['EMPLOYEE (eno, ename), AWARDED (eno*, qual*), QUALIFICATION (qual). Which table can be removed?', ['EMPLOYEE', 'AWARDED', 'QUALIFICATION', 'None'], 2, 'QUALIFICATION only holds qual, which AWARDED already has.'],
    ['In the 1:1 mapping, if the FK is copied in both directions…', ['That is the correct rule', 'It is wrong: copy in one direction only', 'It becomes M:N', 'It is required for full participation'], 1, 'Either direction, but not both.'],
  ],
  blanks: [
    'In a 1:N relationship, copy the primary key from the {{1|one}} side to the {{N|many}} side as a foreign key.',
    'An M:N relationship is mapped by creating a {{link}} table.',
    'The primary key of a link table is usually a {{composite}} of the two copied keys.',
    'Key copying adds no extra tables, so there is no extra {{join}} overhead.',
    'When completing relations you remove {{derived}} attributes and add {{active}} attributes.',
    'For a 1:1 relationship the foreign key must hold {{unique}} values.',
  ],
  exercises: [
    {
      title: 'Map the Olympic Games model',
      task: `Entities: COUNTRY (country_code, country_name, continent, number_of_competitors, team_manager), COMPETITOR (competitor_code, competitor_name, gender, age, c_sport), EVENT (event_code, event_name, event_type, start_date, end_date, olympic_record), VENUE (venue_code, venue_name, venue_type, seating_capacity, location).

Relationships: COUNTRY Sends COMPETITOR (1:N), COMPETITOR Competes EVENT (M:N, with result, performance, medal_won), VENUE Holds EVENT (1:N).

Write the final linked relational schema.`,
      solution: `~~~
COUNTRY    (country_code, country_name, continent, number_of_competitors, team_manager)
COMPETITOR (competitor_code, competitor_name, gender, age, c_sport, country_code*)
COMPETES   (competitor_code*, event_code*, result, performance, medal_won)
EVENT      (event_code, event_name, event_type, start_date, end_date, olympic_record, venue_code*)
VENUE      (venue_code, venue_name, venue_type, seating_capacity, location)
~~~
- Sends 1:N: «country_code» copied into COMPETITOR.
- Competes M:N: link table COMPETES with composite PK and the active attributes.
- Holds 1:N: «venue_code» copied into EVENT.

Note: «number_of_competitors» could be derived by counting competitors, so you could argue to remove it.`
    },
    {
      title: 'Map the travel company',
      task: `STAFF Services CUSTOMER (M:N, with enquiry type and enquiry date). STAFF Creates BOOKING (1:N). CUSTOMER Makes BOOKING (1:N). BOOKING Is_for HOL_TYPE (N:1). HOL_TYPE Goes_to DESTINATION (1:1, some destinations have no holiday type).

Write the schema. Attributes: STAFF (staff_number, staff_name, grade, salary), CUSTOMER (cust_number, cust_name, cust_address, cust_phone_number), BOOKING (booking_number, booking_date), HOL_TYPE (holiday_code, description, hotel_name, duration), DESTINATION (destination_name, country, inoc_code).`,
      solution: `~~~
CUSTOMER    (cust_number, cust_name, cust_address, cust_phone_number)
SERVICES    (cust_number*, staff_number*, enquiry_type, enquiry_date)
STAFF       (staff_number, staff_name, grade, salary)
BOOKING     (booking_number, booking_date, cust_number*, staff_number*, holiday_code*)
HOL_TYPE    (holiday_code, description, hotel_name, duration, destination_name*)
DESTINATION (destination_name, country, inoc_code)
~~~
For the 1:1, the FK goes in HOL_TYPE because every holiday type has a destination but some destinations have no holiday type, so putting it in DESTINATION would create NULLs.`
    },
  ]
},

/* ------------------------------------------------------------------ */
{
  id: 'db5', week: 4, title: 'Normalisation',
  summary: 'UNF to 1NF, 2NF and 3NF. Update anomalies, functional, partial and transitive dependencies, and non-loss decomposition.',
  notes: `
## What and why
**Normalisation** organises data in a relational database to **reduce redundancy and improve integrity**, by decomposing large tables into smaller, well-structured ones linked by keys.

Desirable properties: the minimal number of attributes; closely related attributes (functional dependencies) in the same table; minimal redundancy, so each attribute appears once except foreign keys.

It can be a bottom-up design technique on its own, but in big systems it is used to **validate** the schema produced by ER modelling and mapping. For implementation a database should be at least in **3NF**.

## UNF and 1NF
- A **repeating group** is a column (or set of columns) that stores several values for one entity, e.g. «paper_list = Times, Telegraph».
- A table with repeating groups is in **Unnormalised Form (UNF)**. Schemas show repeating groups in braces: «PET (pet_id, pet_name, …, {visitdate, procedure_no, procedure_name})».
- **1NF**: a flat table where each cell holds exactly one value, each column has a unique name, each row is unique (usually via a PK) and there are **no repeating groups**.

## Update anomalies (why 1NF is not enough)
«STAFFBORROWER (sno, name, dept, grade, salary, bno, date_out)»
- **Modification anomaly**: Smith changes grade, so every row for Smith must change, and one might be missed.
- **Insertion anomaly**: a new grade 2.8 earning £27,491 cannot be recorded until someone is on it, because the PK would be NULL (breaking entity integrity).
- **Deletion anomaly**: when Smith returns all her books, deleting her loan rows deletes all trace of Smith.

The fix is a **non-loss decomposition (NLD)**: split the table into projections that can be joined back to give exactly the original, no more and no less.

## Functional dependency
Y is **functionally dependent** on X (written **X → Y**, "X determines Y") if each X value is associated with exactly one Y value. X is the **determinant**, a potential PK of its own table. FDs come from the meaning of the data, not from one sample. The reverse does not follow: X → Y does not mean Y → X.

## 2NF: remove partial dependencies
A **partial dependency** is a non-key attribute that depends on only **part** of a composite PK.

«TAKES (Studentnum, StudentName, ModuleCode, ModuleName, ExamResult)», PK (Studentnum, ModuleCode):
~~~
Studentnum, ModuleCode -> ExamResult     (full)
Studentnum             -> StudentName    (partial)
ModuleCode             -> ModuleName     (partial)
~~~
Decompose so every determinant becomes a PK in its own table:
~~~
STUDENT (Studentnum, StudentName)
MODULE  (ModuleCode, ModuleName)
RESULT  (Studentnum*, ModuleCode*, ExamResult)
~~~
**2NF**: in 1NF and every non-key attribute is **fully** dependent on the whole PK. If the PK is a single attribute, a 1NF table is automatically in 2NF (move straight to checking 3NF).

## 3NF: remove transitive dependencies
If X → Y and Y → Z (and Y does not determine X), then X → Z is a **transitive dependency**. It shows up as a dependency **between non-key attributes**.

«EMP (empno, ename, salary, deptnum, dname)»: «deptnum → dname», so «empno → dname» is transitive. Split into «EMP (empno, ename, salary, deptnum*)» and «DEPT (deptnum, dname)».

**3NF**: in 2NF and every non-key attribute is non-transitively, fully dependent on the PK. A 2NF table with zero or one non-key attribute is already in 3NF.

A memory aid: every non-key attribute depends on **the key, the whole key, and nothing but the key**.

## Dependency diagrams
Draw the PK on the left in a box, arrows to the attributes it determines. Partial dependencies come from one part of a composite key; transitive ones are shown with a **dashed** arrow. Only draw them for a table that breaks a normal form, and the decomposition must match the arrows.

## Worked example: order form
~~~
UNF  ORDERFORM (orderno, orderdate, deldate, custno, custname, custphone,
                {partno, pname, unitcost, quantity})
1NF  ORDER       (orderno, orderdate, deldate, custno, custname, custphone)
     ORDEREDPART (orderno*, partno, pname, unitcost, quantity)
2NF  partno -> pname, unitcost is partial, so:
     PART          (partno, pname, unitcost)
     ORDEREDPART_1 (orderno*, partno*, quantity)
3NF  custno -> custname, custphone is transitive in ORDER, so:
     ORDER    (orderno, orderdate, deldate, custno*)
     CUSTOMER (custno, custname, custphone)
~~~
Final 3NF schema: ORDER, CUSTOMER, PART, ORDEREDPART_1.

## Denormalisation
Normalisation ignores efficiency. If a table is rarely updated but often read, you might leave it in 2NF to avoid join overhead (e.g. «EMPLOYEE (empno, address, postcode)»). Beyond 3NF there are BCNF, 4NF, 5NF and 6NF, which are outside this module.

## The usual design process
1. Draw the ER diagram.
2. Map it to a linked relational schema.
3. Check each table is in 3NF; decompose if not, or justify leaving it in 2NF for performance.
`,
  cards: [
    ['What is normalisation?', 'A process of organising data in a relational database to reduce redundancy and improve data integrity, by decomposing tables.'],
    ['Repeating group', 'A column or set of columns storing several values for one entity, e.g. a comma-separated list of papers.'],
    ['UNF', 'Unnormalised form: the table contains one or more repeating groups.'],
    ['1NF', 'No repeating groups: each cell holds exactly one value and each row is unique.'],
    ['2NF', 'In 1NF and no partial dependencies: every non-key attribute depends on the whole primary key.'],
    ['3NF', 'In 2NF and no transitive dependencies: no non-key attribute depends on another non-key attribute.'],
    ['Three update anomalies', 'Insertion, deletion and modification anomalies.'],
    ['Non-loss decomposition', 'Splitting a table into projections that can be joined back to give exactly the original table, no more and no less.'],
    ['Functional dependency X → Y', 'Each value of X is associated with exactly one value of Y. X is the determinant.'],
    ['Partial dependency', 'A non-key attribute that depends on only part of a composite primary key.'],
    ['Transitive dependency', 'X → Y and Y → Z, so X → Z indirectly, where Y is a non-key attribute.'],
    ['When can you skip the 2NF check?', 'When the primary key is a single attribute: there can be no partial dependency.'],
    ['A 2NF table with one non-key attribute is in…', '3NF, because a transitive dependency needs at least two non-key attributes.'],
    ['Denormalisation', 'Deliberately leaving a table in a lower normal form (e.g. 2NF) for performance, when it is rarely updated but often read.'],
    ['"The key, the whole key and nothing but the key"', 'Memory aid: 1NF has a key; 2NF depends on the whole key; 3NF depends on nothing but the key.'],
  ],
  mcq: [
    ['A table where one cell holds "Times, Telegraph" is in…', ['UNF', '1NF', '2NF', '3NF'], 0, 'A list in a cell is a repeating group: unnormalised form.'],
    ['Smith changes grade and three of her four rows are updated. This is a…', ['Insertion anomaly', 'Deletion anomaly', 'Modification anomaly', 'Chasm trap'], 2, 'Changing duplicated data in some places but not others.'],
    ['A new grade cannot be recorded until someone is on it. This is a…', ['Insertion anomaly', 'Deletion anomaly', 'Modification anomaly', 'Fan trap'], 0, 'You cannot insert a fact without unrelated data.'],
    ['RESULT has PK (Studentnum, ModuleCode). ModuleCode → ModuleName is a…', ['Full dependency', 'Partial dependency', 'Transitive dependency', 'Multi-valued dependency'], 1, 'ModuleName depends on only part of the composite key.'],
    ['EMP (empno, ename, deptnum, dname). deptnum → dname makes empno → dname…', ['Partial', 'Transitive', 'Full and correct', 'Composite'], 1, 'A dependency between two non-key attributes creates a transitive dependency.'],
    ['A 1NF table with a single-attribute primary key is automatically in…', ['UNF', '2NF', '3NF', 'BCNF'], 1, 'No composite key means no partial dependencies.'],
    ['Removing partial dependencies takes a table to…', ['1NF', '2NF', '3NF', 'UNF'], 1, '2NF removes partial dependencies; 3NF removes transitive ones.'],
    ['Which is the 3NF decomposition of ORDER (orderno, orderdate, custno, custname, custphone)?', ['ORDER (orderno, orderdate) and CUSTOMER (custno, custname, custphone)', 'ORDER (orderno, orderdate, custno*) and CUSTOMER (custno, custname, custphone)', 'ORDER (orderno, custname) and CUSTOMER (custno, custphone)', 'It is already in 3NF'], 1, 'custno stays in ORDER as an FK so the tables can be joined back.'],
    ['Non-loss decomposition means…', ['Never deleting rows', 'Splitting so a join gives back exactly the original table', 'Copying tables as backups', 'Removing NULLs'], 1, 'No less and no more than the original.'],
    ['Why might you denormalise?', ['To fix anomalies', 'To avoid join overhead on rarely updated, often read data', 'To reach BCNF', 'Because SQL requires it'], 1, 'Performance can justify staying in 2NF.'],
    ['What is the minimum normal form usually required for implementation in this module?', ['1NF', '2NF', '3NF', '5NF'], 2, 'Implement at least in 3NF.'],
    ['X → Y. Which is true?', ['Y → X must also hold', 'Each X value has exactly one Y value', 'X and Y are both keys', 'Y is a primary key'], 1, 'That is the definition; the reverse does not follow.'],
  ],
  blanks: [
    'A table containing repeating groups is in {{UNF|unnormalised form|unnormalized form}}.',
    'Removing repeating groups puts a table into {{1NF|first normal form}}.',
    'A {{partial}} dependency is when a non-key attribute depends on only part of a composite key.',
    'A {{transitive}} dependency is a dependency between non-key attributes.',
    'In X → Y, X is called the {{determinant}}.',
    'The three update anomalies are insertion, deletion and {{modification|update}}.',
    'Splitting a table so it can be joined back exactly is a {{non-loss}} decomposition.',
    'A 2NF table with only one non-key attribute is already in {{3NF|third normal form}}.',
  ],
  exercises: [
    {
      title: 'Pet health record',
      task: `A vet stores index cards with pet id, name, type, age and owner name, and for each visit the date, procedure number and procedure name.

Normalise to 3NF, showing UNF, 1NF, 2NF and 3NF.`,
      solution: `~~~
UNF  PET (pet_id, pet_name, pet_type, pet_age, owner,
          {visitdate, procedure_no, procedure_name})
1NF  PET_DETAILS   (pet_id, pet_name, pet_type, pet_age, owner)
     VISIT_DETAILS (pet_id*, visitdate, procedure_no, procedure_name)
     PK of VISIT_DETAILS: (pet_id, visitdate, procedure_no)
2NF  procedure_no -> procedure_name is partial, so:
     VISIT_DETAILS_1 (pet_id*, visitdate, procedure_no*)
     PROCEDURE       (procedure_no, procedure_name)
3NF  No transitive dependencies remain:
     PET_DETAILS, VISIT_DETAILS_1, PROCEDURE
~~~
PET_DETAILS has a single-attribute key, so it is 2NF at once, and has no non-key to non-key dependencies (assuming owner is just a name), so it is 3NF.`
    },
    {
      title: 'Library staff borrowers',
      task: `«STAFFBORROWER (sno, name, dept, grade, salary, bno, date_out)», PK (sno, bno). Everyone on the same grade earns the same salary.

List the functional dependencies and normalise to 3NF.`,
      solution: `FDs:
~~~
sno, bno -> date_out
sno      -> name, dept, grade, salary   (partial)
grade    -> salary                      (non-key to non-key)
~~~
2NF: «LOAN (sno*, bno, date_out)», «STAFF (sno, name, dept, grade, salary)».

3NF: «grade → salary» is transitive in STAFF, so «STAFF_1 (sno, name, dept, grade*)» and «GRADE (grade, salary)».

Final: LOAN, STAFF_1, GRADE.`
    },
    {
      title: 'Normalise a module results sheet',
      task: `A course office keeps one table:
«RESULTS (student_no, student_name, course_code, course_name, module_code, module_title, lecturer_id, lecturer_name, mark)»
Each student is on one course. Each module has one lecturer. PK is (student_no, module_code).

Find the dependencies and normalise to 3NF.`,
      solution: `FDs:
~~~
student_no, module_code -> mark
student_no  -> student_name, course_code, course_name   (partial)
module_code -> module_title, lecturer_id, lecturer_name (partial)
course_code -> course_name      (transitive within STUDENT)
lecturer_id -> lecturer_name    (transitive within MODULE)
~~~
2NF: «STUDENT (student_no, student_name, course_code, course_name)», «MODULE (module_code, module_title, lecturer_id, lecturer_name)», «RESULT (student_no*, module_code*, mark)».

3NF:
~~~
STUDENT  (student_no, student_name, course_code*)
COURSE   (course_code, course_name)
MODULE   (module_code, module_title, lecturer_id*)
LECTURER (lecturer_id, lecturer_name)
RESULT   (student_no*, module_code*, mark)
~~~`
    },
  ]
},

/* ------------------------------------------------------------------ */
{
  id: 'db6', week: 5, title: 'Introduction to SQL',
  summary: 'DDL, DML and DCL. CREATE TABLE with constraints, ALTER TABLE for foreign keys, INSERT, UPDATE, DELETE and basic SELECT queries.',
  notes: `
## What SQL is
SQL is a declarative language for managing data in a relational database. It is an ANSI standard with many dialects; SQL Server uses **Transact-SQL (T-SQL)**.

| Part | Purpose | Examples |
|---|---|---|
| **DDL** Data Definition Language | Create and destroy structures | «CREATE TABLE», «ALTER TABLE», «DROP» |
| **DML** Data Manipulation Language | Retrieve and change data | «SELECT», «INSERT», «UPDATE», «DELETE» |
| **DCL** Data Control Language | Permissions and users | «GRANT ALL ON EMP TO John WITH GRANT OPTION» |

Comparison operators: «=», «<>» (not equal), «>», «<», «>=», «<=».

## Common data types
| Type | Use |
|---|---|
| «char(n)» | Fixed-length text, entries of consistent size (slightly more efficient) |
| «varchar(n)» | Variable-length text, entries that vary a lot in size |
| «tinyint» | 0 to 255 |
| «smallint» | −32,768 to 32,767 |
| «int», «bigint» | Larger whole numbers |
| «decimal(p,s)» | Precision and scale, e.g. «decimal(7,2)» holds up to 99999.99 |
| «date» | e.g. «'1912-10-25'» |

A phone number or room code like «16C26» is text, not a number.

## Style guide
Table names and reserved words in CAPITALS; attribute names lowercase with underscores; one clause per line.

## Creating tables
~~~
CREATE TABLE EMPLOYEE (
  enum   int not null,
  ename  char(15),
  salary decimal(7,2),
  floor  tinyint,
  CONSTRAINT pk_emp PRIMARY KEY (enum)
);

CREATE TABLE WORKS_ON (
  enum int not null,
  pnum smallint not null,
  role char(15),
  CONSTRAINT pk_wo PRIMARY KEY (enum, pnum)
);
~~~

## Constraints
- «NOT NULL» and «PRIMARY KEY» (as above).
- «DEFAULT»: «role char(15) DEFAULT 'To be set'»
- «UNIQUE»: «leader char(15) UNIQUE»
- «CHECK»: «floor tinyint CHECK (floor <= 7)»
- «FOREIGN KEY», usually added with ALTER TABLE.

## Foreign keys and other ALTER TABLE commands
~~~
ALTER TABLE WORKS_ON
ADD CONSTRAINT fk_wo1 FOREIGN KEY (enum) REFERENCES EMPLOYEE (enum);

ALTER TABLE EMPLOYEE ALTER COLUMN salary int;     -- change a type
ALTER TABLE PROJECT  ADD budget decimal(9,2);     -- add a column
ALTER TABLE PROJECT  DROP COLUMN budget;          -- remove a column
ALTER TABLE WORKS_ON DROP CONSTRAINT fk_wo2;      -- drop the FK first…
ALTER TABLE PROJECT  DROP CONSTRAINT pk_proj;     -- …then the PK it references
~~~
Naming constraints lets you drop them later by name.

## Adding, deleting and changing rows
~~~
INSERT INTO EMPLOYEE (enum, ename, salary, floor)
VALUES (852559, 'Brown', 18000, 4);
-- attribute list optional when supplying a whole record

DELETE FROM EMPLOYEE
WHERE salary > 18000
AND floor = 2;

UPDATE PROJECT
SET leader = 'Branagh'
WHERE pname = 'Theatre';
~~~
- Text values need single quotes; numbers do not.
- A DELETE or UPDATE with no WHERE affects **every row**.
- **Referential integrity applies**: you cannot add an employee to a department that does not exist yet, and you cannot delete a row other rows still reference.

## Retrieving data (projemp)
~~~
SELECT * FROM EMP;                                  -- every column, every row
SELECT ename, age FROM EMP WHERE dno = 'd1';
SELECT eno, ename FROM EMP WHERE age > 30 AND dno = 'd2';
SELECT ename FROM EMP WHERE salary < 20000 OR salary > 30000;
SELECT COUNT(*) AS num_employees FROM EMP WHERE dno = 'd3';
SELECT SUM(salary) FROM EMP WHERE dno = 'd1';
SELECT ename, salary FROM EMP ORDER BY salary ASC;
SELECT ename FROM EMP WHERE salary IN (18000, 20000);
~~~
- «*» means all attributes; inside a function it only works as «COUNT(*)».
- «AS» names a result column (no spaces in the name).
- «ORDER BY … ASC» or «DESC».
- «IN (…)» is shorthand for several «OR =» tests.
- Put «USE projemp;» first so the query runs against the right database.

## Joining tables (seen in normalisation)
~~~
SELECT *
FROM STUDENT, RESULT, MODULE
WHERE STUDENT.Studentnum = RESULT.Studentnum
AND RESULT.ModuleCode = MODULE.ModuleCode;
~~~
`,
  cards: [
    ['DDL, DML, DCL', 'Data Definition Language (CREATE, ALTER, DROP); Data Manipulation Language (SELECT, INSERT, UPDATE, DELETE); Data Control Language (GRANT).'],
    ['What dialect of SQL does SQL Server use?', 'Transact-SQL (T-SQL).'],
    ['char vs varchar', 'char(n) is fixed length, for entries of consistent size. varchar(n) is variable length, for entries that vary a lot.'],
    ['Range of tinyint', '0 to 255.'],
    ['What does decimal(7,2) hold?', '7 digits in total, 2 after the decimal point: up to 99999.99.'],
    ['SQL for "not equal"', '<>'],
    ['Add a foreign key to WORKS_ON.enum referencing EMPLOYEE', 'ALTER TABLE WORKS_ON ADD CONSTRAINT fk_wo1 FOREIGN KEY (enum) REFERENCES EMPLOYEE (enum);'],
    ['Constraint to give a column a value when none is supplied', 'DEFAULT, e.g. role char(15) DEFAULT \'To be set\''],
    ['Constraint that limits values to a condition', 'CHECK, e.g. floor tinyint CHECK (floor <= 7)'],
    ['General INSERT syntax', 'INSERT INTO table (columns) VALUES (values); the column list is optional for a whole record.'],
    ['General UPDATE syntax', 'UPDATE table SET column = value WHERE condition;'],
    ['General DELETE syntax', 'DELETE FROM table WHERE condition;'],
    ['What happens if you leave WHERE off a DELETE?', 'Every row in the table is deleted.'],
    ['Count employees in department d3', 'SELECT COUNT(*) FROM EMP WHERE dno = \'d3\';'],
    ['Sort results by salary, lowest first', 'ORDER BY salary ASC'],
    ['What does IN (18000, 20000) mean?', 'The value equals 18000 OR 20000.'],
    ['Why must you drop an FK before dropping the PK it references?', 'Referential integrity: the PK cannot be removed while a foreign key still depends on it.'],
  ],
  mcq: [
    ['CREATE TABLE belongs to which part of SQL?', ['DML', 'DDL', 'DCL', 'T-SQL only'], 1, 'Data Definition Language creates structures.'],
    ['GRANT belongs to…', ['DDL', 'DML', 'DCL', 'None'], 2, 'Data Control Language handles permissions.'],
    ['Which data type is best for a UK phone number like 02812345678?', ['int', 'tinyint', 'char(11)', 'decimal(11,0)'], 2, 'It is an identifier with a leading zero, not a quantity, so store it as text.'],
    ['Which query lists the names of employees in department d1?', ['SELECT ename FROM EMP WHERE dno = d1;', 'SELECT ename FROM EMP WHERE dno = \'d1\';', 'SELECT * WHERE dno = \'d1\';', 'GET ename FROM EMP IF dno = \'d1\';'], 1, 'Text values need single quotes, and SELECT needs FROM.'],
    ['Which operator means "not equal" in SQL?', ['!=', '<>', '=!', 'NOT='], 1, '<> is the standard SQL operator (SQL Server also accepts !=, but the lecture uses <>).'],
    ['UPDATE EMP SET salary = 23000; (no WHERE) will…', ['Fail', 'Update one row', 'Update every row', 'Insert a row'], 2, 'Without WHERE, every row is affected.'],
    ['EMPLOYEE White (floor 2, salary 25100) appears in WORKS_ON, with an FK constraint. DELETE FROM EMPLOYEE WHERE salary > 18000 AND floor = 2; will…', ['Delete White', 'Delete White and her WORKS_ON rows', 'Fail with a referential integrity error', 'Delete nothing because nobody matches'], 2, 'White matches, but WORKS_ON references her, so the default NO ACTION raises an error.'],
    ['Which counts the rows in EMP?', ['SELECT SUM(*) FROM EMP;', 'SELECT COUNT(*) FROM EMP;', 'SELECT TOTAL FROM EMP;', 'COUNT EMP;'], 1, '* can be used in COUNT() only.'],
    ['Which clause sorts results from highest to lowest salary?', ['SORT BY salary DOWN', 'ORDER BY salary DESC', 'GROUP BY salary', 'ORDER salary HIGH'], 1, 'ORDER BY … DESC.'],
    ['Which constraint stops two projects having the same leader?', ['CHECK', 'DEFAULT', 'UNIQUE', 'NOT NULL'], 2, 'UNIQUE ensures every value in a column is different.'],
    ['You try to insert an employee with dnum 12 before department 12 exists (FK in place). What happens?', ['It works', 'An error: the FK value has no matching PK', 'Department 12 is created automatically', 'dnum is set to NULL'], 1, 'Referential integrity: add the department first.'],
    ['To give the COUNT result the column name Num_Employees, use…', ['RENAME', 'AS Num_Employees', 'NAME = Num_Employees', 'TITLE Num_Employees'], 1, 'SELECT COUNT(eno) AS Num_Employees …'],
  ],
  blanks: [
    'SQL Server uses a dialect of SQL called {{T-SQL|Transact-SQL|TSQL}}.',
    'INSERT, UPDATE, DELETE and SELECT are part of the {{DML|data manipulation language}}.',
    'To add a foreign key to an existing table, use {{ALTER TABLE}}.',
    'The constraint «CHECK (floor <= 7)» is a {{CHECK}} constraint.',
    'Character values in SQL must be enclosed in single {{quotes|quote marks|inverted commas}}.',
    '«SELECT ename FROM EMP WHERE salary {{IN}} (18000, 20000);» finds salaries of 18000 or 20000.',
    'To sort smallest first, end the query with «ORDER BY salary {{ASC}}».',
    'The asterisk can be used inside an aggregate function only as {{COUNT(*)|COUNT}}.',
  ],
  exercises: [
    {
      title: 'Build businessdb (Lab 5)',
      task: `Write the SQL to create:
- «dept (dnum, dname, city, budget, mnum)»: dnum 10 to 99, dname up to 12 letters, city up to 15 letters, budget up to 999999.99, mnum 1 to 99.
- «manager (mnum, mname, office, phonenumber)»: office like 16C26, phonenumber 11 characters.
Then add the foreign keys «emp.dnum → dept.dnum» and «dept.mnum → manager.mnum», and insert manager 1, vincent, 10G15, 02812345678.`,
      solution: `~~~
CREATE TABLE dept (
  dnum   tinyint not null,
  dname  char(12),
  city   char(15),
  budget decimal(8,2),
  mnum   tinyint,
  CONSTRAINT pk_dept PRIMARY KEY (dnum)
);

CREATE TABLE manager (
  mnum        tinyint not null,
  mname       char(20),
  office      char(5),
  phonenumber char(11),
  CONSTRAINT pk_manager PRIMARY KEY (mnum)
);

ALTER TABLE emp
ADD CONSTRAINT fk_emp FOREIGN KEY (dnum) REFERENCES dept (dnum);

ALTER TABLE dept
ADD CONSTRAINT fk_dept FOREIGN KEY (mnum) REFERENCES manager (mnum);

INSERT INTO manager VALUES (1, 'vincent', '10G15', '02812345678');
~~~
«decimal(8,2)» holds up to 999999.99. Add a «CHECK (dnum BETWEEN 10 AND 99)» if you want to enforce the range.`
    },
    {
      title: 'Query projemp',
      task: `Using «EMP (eno, ename, salary, age, supno, dno*)» and «PROJ (pno, pname, ptype, budget)», write queries to:
1. List names and salaries of employees older than 40, highest salary first.
2. Count employees in department d2.
3. Find the average salary in department d1.
4. Change the budget of project p13 to 650000.
5. Delete employee e51.`,
      solution: `~~~
SELECT ename, salary FROM EMP
WHERE age > 40
ORDER BY salary DESC;

SELECT COUNT(*) AS num_employees FROM EMP
WHERE dno = 'd2';

SELECT AVG(salary) AS avg_salary FROM EMP
WHERE dno = 'd1';

UPDATE PROJ
SET budget = 650000
WHERE pno = 'p13';

DELETE FROM EMP
WHERE eno = 'e51';
~~~
Remember eno, dno and pno are text, so they need quotes. Deleting an employee still referenced in WORKS (like e19 in the lab) will fail.`
    },
    {
      title: 'Will these statements run?',
      task: `EMPLOYEE (enum, ename, salary, floor), PROJECT (pnum, pname, leader), WORKS_ON (enum*, pnum*, role), with FKs in place. White (852455) earns 25100 on floor 2 and works on projects 121 and 227.
1. «INSERT INTO EMPLOYEE VALUES (852559, 'Brown', 18000, 4);»
2. «DELETE FROM EMPLOYEE WHERE salary > 18000 AND floor = 2;»
3. «UPDATE PROJECT SET leader = 'Branagh' WHERE pname = 'Theatre';»`,
      solution: `1. **Runs**: 852559 is a new, unique PK.
2. **Fails**: White matches, but WORKS_ON rows reference 852455, so referential integrity (NO ACTION) blocks the delete.
3. **Runs**: leader is not a key, so changing it breaks nothing.`
    },
  ]
},

  ]
});
