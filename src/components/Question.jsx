function Question({ question, onAnswer, progressLabel }) {
  return (
    <div>
      <h2>{question.text}</h2>

      {/* 👇 進捗ラベルがあれば表示 */}
      {progressLabel && (
        <div style={{ marginBottom: "10px", color: "#666", fontSize: "14px" }}>
          {progressLabel}
        </div>
      )}

      {question.choices.map((choice, i) => (
        <button
          key={i}
          onClick={() => onAnswer(choice)}
          style={{ margin: "5px" }}
        >
          {choice.label}
        </button>
      ))}
    </div>
  );
}

export default Question;
