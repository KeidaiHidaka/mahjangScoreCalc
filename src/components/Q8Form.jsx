import { useState } from 'react';

function Q8Form({ onConfirm }) {
  const [koutsu, setKoutsu] = useState(0);
  const [kan, setKan] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const total = koutsu + kan;
    if (total > 4) {
      setError("コーツとカンツの合計は4以下にしてください。");
      return;
    }
    setError("");
    onConfirm(koutsu, kan);
  };

  return (
    <div className="q8-form">
      <h2>Q8. 刻子（コーツ）・槓子（カンツ）の数を選んでください</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>刻子（コーツ）: </label>
        <select value={koutsu} onChange={e => setKoutsu(Number(e.target.value))}>
          {[0, 1, 2, 3, 4].map(n => (
            <option key={n} value={n}>{n}組</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>槓子（カンツ）: </label>
        <select value={kan} onChange={e => setKan(Number(e.target.value))}>
          {[0, 1, 2, 3, 4].map(n => (
            <option key={n} value={n}>{n}組</option>
          ))}
        </select>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleSubmit}>確定</button>
    </div>
  );
}

export default Q8Form;
