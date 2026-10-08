# CS348 SQL Practice

A small LeetCode-style SQL practice app for CS348.

## Why React?

The UI is simple, but the question bank will grow. React keeps the editor, problem panel, navigation, and future result runner separated into small components without needing a large framework.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints in the terminal.

## Current structure

```text
src/
  components/
    ProblemPanel.jsx
    SqlEditor.jsx
  data/
    problems.js
  App.jsx
  main.jsx
  styles.css
```

## Question-bank plan

Use three kinds of questions:

1. `slide` — examples/exercises copied or closely adapted from the course slides.
2. `practice-set` — questions from the provided midterm practice set.
3. `custom` — new questions that test the same course concepts without copying an existing question.

Each question should record its source in the `source` field so it is obvious which type it is.

## Good next features to build together

- Add a real **Run** button using an in-browser SQLite engine such as `sql.js`.
- Show actual query output and compare it with the expected result.
- Add topic filters like `SFW`, `joins`, `set operations`, `subqueries`, `GROUP BY`.
- Add a progress state: unsolved, attempted, solved.
- Move the question bank from `problems.js` to JSON once it gets large.
- Add a question import format so new slide/practice questions are easy to enter.

## Suggested first coding task

Build the **topic filter** in the top bar. It is small enough to learn the codebase without touching the SQL runner yet.
# cs348-sql-practice
