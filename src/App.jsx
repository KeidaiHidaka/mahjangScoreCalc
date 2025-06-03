import { useState } from 'react';
import questions from './questions';
import Question from './components/Question';
import Result from './components/Result';

function App() {
  const [currentId, setCurrentId] = useState("Q1");
  const [totalPoints, setTotalPoints] = useState(0);
  const [isChiitoitsu, setIsChiitoitsu] = useState(false);
  const [isOverrideMode, setIsOverrideMode] = useState(false);
  const [tempState, setTempState] = useState({});


  // 🔁 履歴を保存（選択肢や前の質問）
  const [history, setHistory] = useState([]);

  const handleAnswer = ({ next, label, points = 0, override = false, pointsByPon, isPon, pointsByAnkan, isAnkan }) => {
    // ポン・カンの状態を保持
    if (isPon !== undefined) {
      setTempState(prev => ({ ...prev, isPon }));
    }
    if (isAnkan !== undefined) {
      setTempState(prev => ({ ...prev, isAnkan }));
    }

    if (label.includes("チートイツ") || points === 25) {
      setIsChiitoitsu(true);
    }

    let addedPoints = points;
    let detail = "";

    // 刻子処理
    if (pointsByPon && tempState.isPon !== undefined) {
      addedPoints = pointsByPon[tempState.isPon];
      detail = `${label}: +${addedPoints}符`;
    }

    if (pointsByAnkan && tempState.isAnkan !== undefined) {
      addedPoints = pointsByAnkan[tempState.isAnkan];
      detail = `${label}: +${addedPoints}符`;
    }


    if (override) {
      setIsOverrideMode(true);
      // totalPoints を加算しない（内部的に実際の加算はナシ）
      setHistory(prev => [...prev, { id: currentId, label, points, override }]);
      setCurrentId(next);

      return;
    }
    // overrideモード解除
    setIsOverrideMode(false);

    if (addedPoints > 0) {
      setTotalPoints(prev => prev + addedPoints);
    } 

    setHistory(prev => [...prev, { id: currentId, label, points: addedPoints, override }]);
    setCurrentId(next);



    console.log("🧾 history:", history);
    console.log("🔢 totalPoints:", totalPoints);
    console.log("🛠 handleAnswer debug:", {
      label,
      points,
      pointsByPon,
      isPon,
      pointsByAnkan,
      isAnkan,
      addedPoints,
    });
  };



  const handleBack = () => {
    console.log("戻るボタンが押下されました");
    if (history.length === 0) return;

    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setCurrentId(prev.id);

    if (prev.points === 25) setIsChiitoitsu(false);

    // override でなければ点数を巻き戻す
    if (!prev.override && prev.points > 0) {
      setTotalPoints(prevTotal => prevTotal - prev.points);
    }

    setIsOverrideMode(false); // 一律で解除（←ここでprev.override見てもいいが一律でも可）
  };



  
  if (currentId === "RESULT") {
    const roundUpPoints = isOverrideMode
      ? totalPoints
      : isChiitoitsu
        ? totalPoints
        : Math.ceil(totalPoints / 10) * 10;
    return (
      <div className="container">
        <Result
          roundUpPoints={roundUpPoints}
          history={history}
          totalPoints={totalPoints} 
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
