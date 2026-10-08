export const problems = [
  {
    id: 'sql-01',
    title: 'Users in gov',
    source: 'Custom practice based on SQL Part I',
    difficulty: 'Easy',
    prompt: "List the names of users who belong to the 'gov' group.",
    expectedColumns: ['name'],
    schema: ['User(uid, name, age, pop)', 'Member(uid, gid)'],
    starterCode: 'SELECT\nFROM\nWHERE',
    solution: `SELECT DISTINCT u.name
FROM User u, Member m
WHERE u.uid = m.uid
  AND m.gid = 'gov';`,
  },
  {
    id: 'sql-02',
    title: 'At least two groups',
    source: 'SQL Part II take-home exercise',
    difficulty: 'Medium',
    prompt: 'Using EXISTS, list the user IDs of users who belong to at least two different groups.',
    expectedColumns: ['uid'],
    schema: ['User(uid, name, age, pop)', 'Member(uid, gid)'],
    starterCode: 'SELECT\nFROM\nWHERE',
    solution: `SELECT DISTINCT m1.uid
FROM Member m1
WHERE EXISTS (
  SELECT *
  FROM Member m2
  WHERE m2.uid = m1.uid
    AND m2.gid != m1.gid
);`,
  },
  {
    id: 'sql-03',
    title: 'Same age as Bart',
    source: 'SQL Part II slide example',
    difficulty: 'Easy',
    prompt: "List all users who are the same age as Bart.",
    expectedColumns: ['uid', 'name', 'age', 'pop'],
    schema: ['User(uid, name, age, pop)'],
    starterCode: 'SELECT *\nFROM User\nWHERE',
    solution: `SELECT *
FROM User
WHERE age = (
  SELECT age
  FROM User
  WHERE name = 'Bart'
);`,
  },
  {
    id: 'sql-04',
    title: 'Most popular users',
    source: 'SQL Part II slide example',
    difficulty: 'Medium',
    prompt: 'List the most popular user or users.',
    expectedColumns: ['uid', 'name', 'age', 'pop'],
    schema: ['User(uid, name, age, pop)'],
    starterCode: 'SELECT *\nFROM User\nWHERE',
    solution: `SELECT *
FROM User
WHERE pop >= ALL (
  SELECT pop
  FROM User
);`,
  },
  {
    id: 'sql-05',
    title: 'abc but not gov',
    source: 'Custom practice based on SQL Part I',
    difficulty: 'Medium',
    prompt: "List the names of users who belong to 'abc' but not 'gov'.",
    expectedColumns: ['name'],
    schema: ['User(uid, name, age, pop)', 'Member(uid, gid)'],
    starterCode: 'SELECT\nFROM\nWHERE',
    solution: `SELECT DISTINCT u.name
FROM User u
WHERE EXISTS (
  SELECT *
  FROM Member m1
  WHERE m1.uid = u.uid
    AND m1.gid = 'abc'
)
AND NOT EXISTS (
  SELECT *
  FROM Member m2
  WHERE m2.uid = u.uid
    AND m2.gid = 'gov'
);`,
  },
  {
    id: 'sql-06',
    title: 'Lisa groups but not Ralph',
    source: 'SQL Part II take-home exercise',
    difficulty: 'Medium',
    prompt: "Using WITH-AS and (NOT) IN, list the group IDs that Lisa belongs to but Ralph does not.",
    expectedColumns: ['gid'],
    schema: ['User(uid, name, age, pop)', 'Member(uid, gid)'],
    starterCode: 'WITH\nSELECT',
    solution: `WITH RalphGroups AS (
  SELECT m.gid
  FROM User u, Member m
  WHERE u.uid = m.uid
    AND u.name = 'Ralph'
)
SELECT m.gid
FROM User u, Member m
WHERE u.uid = m.uid
  AND u.name = 'Lisa'
  AND m.gid NOT IN (SELECT gid FROM RalphGroups);`,
  },
  {
    id: 'sql-07',
    title: 'Lisa groups using EXCEPT',
    source: 'SQL Part II take-home exercise',
    difficulty: 'Medium',
    prompt: "List the group IDs that Lisa belongs to but Ralph does not. Use EXCEPT.",
    expectedColumns: ['gid'],
    schema: ['User(uid, name, age, pop)', 'Member(uid, gid)'],
    starterCode: 'SELECT\nEXCEPT\nSELECT',
    solution: `SELECT m.gid
FROM User u, Member m
WHERE u.uid = m.uid
  AND u.name = 'Lisa'
EXCEPT
SELECT m.gid
FROM User u, Member m
WHERE u.uid = m.uid
  AND u.name = 'Ralph';`,
  },
  {
    id: 'sql-08',
    title: 'Average popularity by age',
    source: 'SQL Part II grouping example',
    difficulty: 'Easy',
    prompt: 'Compute the average popularity for each age group.',
    expectedColumns: ['age', 'avg_pop'],
    schema: ['User(uid, name, age, pop)'],
    starterCode: 'SELECT\nFROM User\nGROUP BY',
    solution: `SELECT age, AVG(pop) AS avg_pop
FROM User
GROUP BY age;`,
  },
  {
    id: 'sql-09',
    title: 'Large age groups',
    source: 'SQL Part II HAVING example',
    difficulty: 'Medium',
    prompt: 'List the average popularity for each age group with more than 100 users.',
    expectedColumns: ['age', 'avg_pop'],
    schema: ['User(uid, name, age, pop)'],
    starterCode: 'SELECT\nFROM User\nGROUP BY\nHAVING',
    solution: `SELECT age, AVG(pop) AS avg_pop
FROM User
GROUP BY age
HAVING COUNT(*) > 100;`,
  },
  {
    id: 'sql-10',
    title: 'Top three popular users',
    source: 'SQL Part II ORDER BY / LIMIT example',
    difficulty: 'Easy',
    prompt: 'Return the top 3 users with the highest popularity.',
    expectedColumns: ['uid', 'name', 'age', 'pop'],
    schema: ['User(uid, name, age, pop)'],
    starterCode: 'SELECT\nFROM User\nORDER BY\nLIMIT',
    solution: `SELECT uid, name, age, pop
FROM User
ORDER BY pop DESC
LIMIT 3;`,
  },
  {
    id: 'sql-11',
    title: 'Global membership table',
    source: 'SQL Part III take-home exercise',
    difficulty: 'Hard',
    prompt: 'Create one global query result containing all groups, users, and membership details. Return gid, group name as gname, uid, and user name as uname. Include groups with no members and users who belong to no groups; missing details should be NULL.',
    expectedColumns: ['gid', 'gname', 'uid', 'uname'],
    schema: ['User(uid, name, age, pop)', 'Group(gid, name)', 'Member(uid, gid)'],
    starterCode: 'SELECT\nFROM',
    solution: `SELECT g.gid, g.name AS gname, u.uid, u.name AS uname
FROM Group g
FULL OUTER JOIN Member m ON g.gid = m.gid
FULL OUTER JOIN User u ON m.uid = u.uid;`,
  },
  {
    id: 'sql-12',
    title: 'Create a global membership view',
    source: 'SQL Part V take-home exercise',
    difficulty: 'Hard',
    prompt: 'Create a view that captures all users, groups, and membership information in one global table. Include users who do not belong to a group and groups that have no members. Missing attributes should be NULL.',
    expectedColumns: ['gid', 'gname', 'uid', 'uname'],
    schema: ['User(uid, name, age, pop)', 'Group(gid, name)', 'Member(uid, gid)'],
    starterCode: 'CREATE VIEW',
    solution: `CREATE VIEW GlobalMembership AS
SELECT g.gid, g.name AS gname, u.uid, u.name AS uname
FROM Group g
FULL OUTER JOIN Member m ON g.gid = m.gid
FULL OUTER JOIN User u ON m.uid = u.uid;`,
  },
  {
    id: 'sql-13',
    title: 'At least two groups from the view',
    source: 'SQL Part V take-home exercise',
    difficulty: 'Medium',
    prompt: 'Using the GlobalMembership view, find the uid and name of users who belong to at least two groups.',
    expectedColumns: ['uid', 'uname'],
    schema: ['GlobalMembership(gid, gname, uid, uname)'],
    starterCode: 'SELECT\nFROM GlobalMembership\nGROUP BY\nHAVING',
    solution: `SELECT uid, uname
FROM GlobalMembership
WHERE uid IS NOT NULL
GROUP BY uid, uname
HAVING COUNT(gid) >= 2;`,
  },
  {
    id: 'sql-14',
    title: "Bart's ancestors",
    source: 'SQL Part V recursive-query example',
    difficulty: 'Hard',
    prompt: "Using a recursive query, find all of Bart's ancestors from Parent(parent, child).",
    expectedColumns: ['anc'],
    schema: ['Parent(parent, child)'],
    starterCode: 'WITH RECURSIVE',
    solution: `WITH RECURSIVE
Ancestor(anc, desc) AS (
  SELECT parent, child
  FROM Parent
  UNION
  SELECT a.anc, p.child
  FROM Ancestor a, Parent p
  WHERE a.desc = p.parent
)
SELECT anc
FROM Ancestor
WHERE desc = 'Bart';`,
  },,
  {
    id: 'sql-15',
    title: 'Create the PC table',
    source: 'Midterm 1 practice question 2(i)',
    difficulty: 'Medium',
    prompt: 'Write a CREATE TABLE statement for PC(model, speed, ram, hd, price). model, ram, and price are INT; speed is FLOAT; only hd may be NULL. model is the primary key. price must be between 500 and 5000 inclusive.',
    expectedColumns: [],
    schema: ['PC(model, speed, ram, hd, price)'],
    starterCode: 'CREATE TABLE PC (',
    solution: `CREATE TABLE PC (
  model INT PRIMARY KEY,
  speed FLOAT NOT NULL,
  ram INT NOT NULL,
  hd INT,
  price INT NOT NULL CHECK(price >= 500 AND price <= 5000)
);`,
  },
  {
    id: 'sql-16',
    title: 'Add a RAM constraint',
    source: 'Midterm 1 practice question 2(i)',
    difficulty: 'Easy',
    prompt: 'After PC has been created, add a named constraint that only allows RAM values of at least 32.',
    expectedColumns: [],
    schema: ['PC(model, speed, ram, hd, price)'],
    starterCode: 'ALTER TABLE PC',
    solution: `ALTER TABLE PC
ADD CONSTRAINT ram_check CHECK(ram >= 32);`,
  },
  {
    id: 'sql-17',
    title: 'Manufacturers without laptops',
    source: 'Midterm 1 practice question 4(a)',
    difficulty: 'Medium',
    prompt: 'List distinct manufacturers that do not sell laptops. Do not use set operations such as EXCEPT.',
    expectedColumns: ['maker'],
    schema: ['Product(maker, model, type)'],
    starterCode: 'SELECT DISTINCT maker\nFROM Product\nWHERE',
    solution: `SELECT DISTINCT maker
FROM Product
WHERE maker NOT IN (
  SELECT maker
  FROM Product
  WHERE type = 'laptop'
);`,
  },
  {
    id: 'sql-18',
    title: 'PC models with more RAM',
    source: 'Midterm 1 practice question 4(b)',
    difficulty: 'Medium',
    prompt: 'List distinct PC model numbers whose RAM is greater than 1024. Do not use set operations or a subquery; write it as a simple SELECT-FROM-WHERE query.',
    expectedColumns: ['model'],
    schema: ['Product(maker, model, type)', 'PC(model, speed, ram, hd, price)'],
    starterCode: 'SELECT DISTINCT\nFROM Product p, PC pc\nWHERE',
    solution: `SELECT DISTINCT p.model
FROM Product p, PC pc
WHERE p.model = pc.model
  AND p.type = 'pc'
  AND pc.ram > 1024;`,
  },
  {
    id: 'sql-19',
    title: 'Makers with only color printers',
    source: 'Midterm 1 practice question 4(c)',
    difficulty: 'Hard',
    prompt: 'Find makers all of whose printers are color printers.',
    expectedColumns: ['maker'],
    schema: ['Product(maker, model, type)', 'Printer(model, color, type, price)'],
    starterCode: 'SELECT maker\nFROM Product\nWHERE type = \'printer\'',
    solution: `SELECT maker
FROM Product
WHERE type = 'printer'
EXCEPT
SELECT p.maker
FROM Product p, Printer r
WHERE p.type = 'printer'
  AND p.model = r.model
  AND r.color = FALSE;`,
  },
  {
    id: 'sql-20',
    title: 'Average salary of most-certified pilots',
    source: 'Midterm 1 practice question 5.2',
    difficulty: 'Hard',
    prompt: 'Find the average salary, as avgSal, of the pilots certified to fly the highest number of aircraft.',
    expectedColumns: ['avgSal'],
    schema: ['Employee(eID, ename, salary)', 'Certified(eID, aID, cyear)'],
    starterCode: 'WITH temp AS (\n  SELECT\n)\nSELECT',
    solution: `WITH temp AS (
  SELECT eid, COUNT(*) AS c_cnt
  FROM Certified
  GROUP BY eid
)
SELECT AVG(salary) AS avgSal
FROM temp t, Employee e
WHERE t.c_cnt = (SELECT MAX(c_cnt) FROM temp)
  AND t.eid = e.eid;`,
  },
  {
    id: 'sql-21',
    title: 'Long-range pilots without Boeing',
    source: 'Midterm 1 practice question 5.4',
    difficulty: 'Hard',
    prompt: 'Find the names of pilots who can operate aircraft with a cruising range greater than 3000 miles, but are not certified on any Boeing aircraft.',
    expectedColumns: ['ename'],
    schema: ['Aircraft(aID, producer, cruisingrange)', 'Employee(eID, ename, salary)', 'Certified(eID, aID, cyear)'],
    starterCode: 'SELECT\nFROM\nWHERE',
    solution: `SELECT e.ename
FROM Certified c, Employee e, Aircraft a
WHERE a.aID = c.aID
  AND e.eID = c.eID
  AND a.cruisingrange > 3000
  AND e.eID NOT IN (
    SELECT c2.eID
    FROM Certified c2, Aircraft a2
    WHERE c2.aID = a2.aID
      AND a2.producer = 'Boeing'
  )
GROUP BY e.eID, e.ename;`,
  },
  {
    id: 'sql-22',
    title: 'Aircraft certified by at most three pilots',
    source: 'Midterm 1 practice question 5.5',
    difficulty: 'Hard',
    prompt: 'Find aircraft IDs and producers that are certified by at most 3 pilots, including aircraft certified by 0 pilots. Also return the maximum salary as smax of pilots certified for each aircraft; use 0 instead of NULL when there are no certified pilots.',
    expectedColumns: ['aID', 'producer', 'smax'],
    schema: ['Aircraft(aID, producer, cruisingrange)', 'Employee(eID, ename, salary)', 'Pilot(eID, ranking)', 'Certified(eID, aID, cyear)'],
    starterCode: 'SELECT\nFROM\nWHERE\nGROUP BY\nHAVING',
    solution: `SELECT a.aID, a.producer, MAX(e.salary) AS smax
FROM Pilot p, Certified c, Aircraft a, Employee e
WHERE p.eID = c.eID
  AND c.aID = a.aID
  AND p.eID = e.eID
GROUP BY a.aID, a.producer
HAVING COUNT(*) <= 3
UNION
SELECT a.aID, a.producer, 0 AS smax
FROM Aircraft a
WHERE a.aID NOT IN (SELECT aID FROM Certified);`,
  }
]

export const sampleTables = {
  User: {
    columns: ['uid', 'name', 'age', 'pop'],
    rows: [
      [142, 'Bart', 10, 0.9],
      [123, 'Milhouse', 10, 0.2],
      [857, 'Lisa', 8, 0.7],
      [456, 'Ralph', 8, 0.3],
    ],
  },
  Member: {
    columns: ['uid', 'gid'],
    rows: [
      [857, 'dps'],
      [123, 'gov'],
      [857, 'abc'],
      [857, 'gov'],
      [456, 'abc'],
      [456, 'gov'],
    ],
  },
  Group: {
    columns: ['gid', 'name'],
    rows: [
      ['abc', 'Book Club'],
      ['gov', 'Student Government'],
      ['dps', 'Dead Putting Society'],
      ['spr', 'Sports Club'],
    ],
  },,
  Product: {
    columns: ['maker', 'model', 'type'],
    rows: [
      ['A', 101, 'pc'],
      ['B', 303, 'printer'],
      ['D', 201, 'laptop'],
      ['D', 301, 'printer'],
    ],
  },
  PC: {
    columns: ['model', 'speed', 'ram', 'hd', 'price'],
    rows: [
      [101, 2.66, 1024, 250, 2114],
      [102, 2.10, 512, 250, 995],
      [103, 1.40, 512, 80, 478],
      [104, 2.80, 1024, 250, 649],
    ],
  },
  Laptop: {
    columns: ['model', 'speed', 'ram', 'hd', 'screen', 'price'],
    rows: [
      [201, 2.00, 2048, 240, 20.1, 3673],
      [207, 1.73, 1024, 80, 17.0, 949],
      [203, 1.80, 512, 60, 15.4, 549],
      [206, 2.00, 512, 60, 13.3, 1150],
    ],
  },
  Printer: {
    columns: ['model', 'color', 'type', 'price'],
    rows: [
      [301, true, 'inkjet', 99],
      [303, false, 'laser', 209],
      [304, true, 'laser', 391],
      [306, true, 'dry', 129],
    ],
  },
  Aircraft: {
    columns: ['aID', 'producer', 'cruisingrange'],
    rows: [
      [11, 'Boeing', 2500.0],
      [12, 'Airbus', 3100.0],
      [13, 'Embraer', 3300.0],
      [14, 'Beechcraft', 2000.0],
      [15, 'Boeing', 4000.0],
    ],
  },
  Employee: {
    columns: ['eID', 'ename', 'salary'],
    rows: [
      [101, 'Alice', 5000.0],
      [104, 'Bob', 4000.0],
      [105, 'Carmen', 6000.0],
    ],
  },
  Pilot: {
    columns: ['eID', 'ranking'],
    rows: [
      [104, 3],
      [105, 2],
    ],
  },
  Certified: {
    columns: ['eID', 'aID', 'cyear'],
    rows: [
      [104, 11, 2002],
      [105, 13, 2010],
    ],
  }
  Parent: {
    columns: ['parent', 'child'],
    rows: [
      ['Homer', 'Bart'],
      ['Homer', 'Lisa'],
      ['Marge', 'Bart'],
      ['Marge', 'Lisa'],
      ['Abe', 'Homer'],
      ['Orville', 'Abe'],
    ],
  },
}