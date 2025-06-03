// src/components/Result.jsx
import questions from '../questions';



function Result({ total, breakdown, history }) {
    const last = history[history.length - 1];

    const isOverride = last?.override;
    const displayPoints = isOverride ? last.points : total;
    return (
    <div>
        <h2>結果：{displayPoints}符</h2>
        {isOverride && <p style={{ color: "red" }}>※例外処理で上書き</p>}

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
                {h.points > 0 && (
                    <span className="point-highlight">+{h.points}符</span>
                )}
                
            </li>
            ))}
        </ul>
    </div>
    );
}

export default Result;