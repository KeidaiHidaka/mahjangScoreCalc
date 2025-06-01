// src/components/Result.jsx
import questions from '../questions';

function Result({ total, breakdown, history }) {
  return (
    <div>
      <h2>結果：{total}符</h2>

      {/* <h3>内訳：</h3>
      <ul>
        {breakdown.map((line, i) => <li key={i}>{line}</li>)}
      </ul>
      <p style={{ marginBottom: '20px' }}>※ 符は10の倍数に切り上げ（チートイツは例外）</p> */}

      <h3>📝 質問と回答：</h3>
      <ul>
        {history.map((h, i) => (
          <li key={i}>
            {questions[h.id]?.text} → <strong>{h.label}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Result;
