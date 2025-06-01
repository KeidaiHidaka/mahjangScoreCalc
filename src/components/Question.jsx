function Question({ question, onAnswer }) {
  return (
    <div>
      <h2>{question.text}</h2>
      {question.choices.map((choice, i) => (
        <button key={i} onClick={() => onAnswer(choice)} style={{ margin: "5px" }}>
          {choice.label}
        </button>
      ))}
    </div>
  );
}

export default Question;
