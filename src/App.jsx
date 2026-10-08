import { useEffect, useState } from 'react'
import SqlEditor from './components/SqlEditor'
import ProblemPanel from './components/ProblemPanel'
import { problems, sampleTables } from './data/problems'

export default function App() {
  const [index, setIndex] = useState(0)
  const [sql, setSql] = useState(problems[0].starterCode)
  const [showSolution, setShowSolution] = useState(false)

  const problem = problems[index]

  useEffect(() => {
    setSql(problem.starterCode)
    setShowSolution(false)
  }, [problem])

  function goToProblem(nextIndex) {
    const wrappedIndex = (nextIndex + problems.length) % problems.length
    setIndex(wrappedIndex)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <strong>CS348</strong>
          <span> SQL Practice</span>
        </div>
        <div className="nav-controls">
          <span>{index + 1} / {problems.length}</span>
          <button onClick={() => goToProblem(index - 1)}>Previous</button>
          <button className="primary-button" onClick={() => goToProblem(index + 1)}>Next</button>
        </div>
      </header>

      <div className="workspace">
        <SqlEditor
          value={sql}
          onChange={setSql}
          onReset={() => setSql(problem.starterCode)}
        />
        <ProblemPanel
          problem={problem}
          sampleTables={sampleTables}
          showSolution={showSolution}
          onToggleSolution={() => setShowSolution((current) => !current)}
        />
      </div>
    </main>
  )
}
