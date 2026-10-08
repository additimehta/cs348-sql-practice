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
  },
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
  },
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