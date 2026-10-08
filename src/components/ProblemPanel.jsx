function DataTable({ name, table }) {
  return (
    <div className="table-card">
      <div className="table-name">{name}</div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>{table.columns.map((column) => <th key={column}>{column}</th>)}</tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((value, cellIndex) => <td key={cellIndex}>{value}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function ProblemPanel({ problem, sampleTables, showSolution, onToggleSolution }) {
  const visibleTables = Object.entries(sampleTables).filter(([name]) =>
    problem.schema.some((line) => line.startsWith(`${name}(`)),
  )

  return (
    <aside className="problem-panel">
      <div className="problem-meta">
        <span className="pill">{problem.difficulty}</span>
        <span>{problem.source}</span>
      </div>

      <h1>{problem.title}</h1>
      <p className="prompt">{problem.prompt}</p>

      <h2>Schema</h2>
      <div className="code-card">
        {problem.schema.map((line) => <code key={line}>{line}</code>)}
      </div>

      <h2>Sample data</h2>
      <div className="tables-stack">
        {visibleTables.map(([name, table]) => (
          <DataTable key={name} name={name} table={table} />
        ))}
      </div>

      <h2>Expected columns</h2>
      <div className="code-card single-line">
        <code>{problem.expectedColumns.join(', ')}</code>
      </div>

      <button className="solution-button" onClick={onToggleSolution}>
        {showSolution ? 'Hide solution' : 'Reveal solution'}
      </button>

      {showSolution && (
        <pre className="solution-card"><code>{problem.solution}</code></pre>
      )}
    </aside>
  )
}
