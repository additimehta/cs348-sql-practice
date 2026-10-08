export default function SqlEditor({ value, onChange, onReset }) {
  return (
    <section className="editor-panel">
      <div className="panel-header">
        <span>SQL Editor</span>
        <button className="ghost-button" onClick={onReset}>Reset</button>
      </div>
      <textarea
        className="sql-editor"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        spellCheck="false"
        aria-label="SQL editor"
      />
      <div className="editor-footer">
        <span>Run support is the next feature to build.</span>
      </div>
    </section>
  )
}
