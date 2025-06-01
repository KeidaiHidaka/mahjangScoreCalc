import { useState } from 'react';
import questions from './questions';
import Question from './components/Question';
import Result from './components/Result';
import Q8Form from './components/Q8Form';

function App() {
  const [currentId, setCurrentId] = useState("Q1");
  const [totalPoints, setTotalPoints] = useState(0);
  const [breakdown, setBreakdown] = useState([]);
  const [isChiitoitsu, setIsChiitoitsu] = useState(false);
  const [isOverrideMode, setIsOverrideMode] = useState(false);

  const [koutsuCount, setKoutsuCount] = useState(0);
  const [kanCount, setKanCount] = useState(0);
  const [repeatState, setRepeatState] = useState({
    q9Count: 0,
    q10Count: 0,
    currentQ9: 0,
    currentQ10: 0,
  });


  // 🔁 履歴を保存（選択肢や前の質問）
  const [history, setHistory] = useState([]);

  const handleAnswer = ({ next, label, points = 0,override = false }) => {
    if (label.includes("チートイツ") || points === 25) {
      setIsChiitoitsu(true);
    }

    if (override) {
      setIsOverrideMode(true); // override モードにする
      setTotalPoints(points);
      setBreakdown([`${label}: 例外処理で${points}符`]);
      setHistory(prev => [...prev, { id: currentId, label, points, override }]);
      setCurrentId(next);
      return;
    }

    if (points > 0) {
      setTotalPoints(prev => prev + points);
      setBreakdown(prev => [...prev, `${label}: +${points}符`]);
    } else {
      setBreakdown(prev => [...prev, `${label}`]);
    }

    setHistory(prev => [...prev, { id: currentId, label, points }]);
    setCurrentId(next);
  };

  const handleBack = () => {
    console.log("🧾 history:", history);
    console.log("🔢 totalPoints:", totalPoints);
    if (history.length === 0) return;

    // 履歴1件削除
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1)); // 履歴を1つ戻す
    setCurrentId(prev.id);

    // overrideモード解除
  // overrideモード解除
    if (prev.override) {
      setIsOverrideMode(false);
    }

    // チートイツ解除（戻った時）
    if (prev.points === 25) setIsChiitoitsu(false);
    if (isOverrideMode) setIsOverrideMode(false);

    // 点数と内訳を戻す
    if (prev.points > 0) {
      setTotalPoints(prevTotal => prevTotal - prev.points);
    }
    setBreakdown(prevBreakdown => prevBreakdown.slice(0, -1));
  };

  if (currentId === "Q8") {
    return (
      <div className="container">
        <Q8Form onConfirm={(kou, kan) => {
          if (kou + kan > 4) {
            alert("コーツとカンツの合計は4以下にしてください。");
            return;
          }
          setKoutsuCount(kou);
          setKanCount(kan);
          setRepeatState({
            q9Count: kou,
            q10Count: kan,
            currentQ9: 0,
            currentQ10: 0,
          });
          setCurrentId(kou > 0 ? "Q9" : kan > 0 ? "Q10" : "RESULT");
        }} />
      </div>
    );
  }

  if (currentId === "RESULT") {
    const finalPoints = isOverrideMode
      ? totalPoints
      : isChiitoitsu
        ? totalPoints
        : Math.ceil(totalPoints / 10) * 10;
    return (
      <div className="container">
        <Result
          total={finalPoints}
          breakdown={breakdown}
          history={history}
        />
        <button onClick={handleBack} className="back-button">← 戻る</button>
      </div>
    );
  }

  return (
    <div className="container">
      <Question
        question={questions[currentId]}
        onAnswer={handleAnswer}
      />
      <button onClick={handleBack} className="back-button">← 戻る</button>

      {history.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>📝 選択履歴：</h3>
            <ul>
              {history.map((h, i) => (
                <li key={i}>
                  {questions[h.id].text} → <strong>{h.label}</strong>
                  {h.points > 0 && (
                    <span className="point-highlight">+{h.points}符</span>
                  )}
                </li>
              ))}
            </ul>
        </div>
      )}
    </div>
  );
}

export default App;
