const questions = {
  Q1: {
    text: "Q1. 七対子（チートイツ）ですか？",
    choices: [
      { label: "はい", next: "RESULT", points: 25 },
      { label: "いいえ", next: "Q2" }
    ]
  },
  Q2: {
    text: "Q2. 平和（ピンフ）ですか？",
    choices: [
      { label: "はい", next: "Q2_1" },
      { label: "いいえ", next: "Q3", points:20 }
    ]
  },
  Q2_1: {
    text: "Q2-1. アガリ方はなんですか？",
    choices: [
      { label: "ツモ", next: "RESULT", points: 20 },
      { label: "ロン", next: "RESULT", points: 30 }
    ]
  },
  Q3: {
    text: "Q3. 雀頭が役牌ですか？",
    choices: [
      { label: "はい", next: "Q4", points: 2 },
      { label: "いいえ", next: "Q4" }
    ]
  },
  Q4: {
    text: "Q4. 待ちの形がカンチャン・ペンチャン・単騎・ノベタンですか？（両面・シャンポンはいいえ）",
    choices: [
      { label: "はい", next: "Q5", points: 2 },
      { label: "いいえ", next: "Q5"},
    ]
  },
  Q5: {
    text: "Q5. アガリ方はなんですか？",
    choices: [
      { label: "ツモ", next: "Q6", points: 2 },
      { label: "ロン", next: "Q5_1" }
    ]
  },
  Q5_1: {
    text: "Q5-1. 門前（メンゼン）ですか？（鳴いたらいいえ・暗槓はOK）",
    choices: [
      { label: "はい（門前）", next: "Q6", points: 10 },
      { label: "いいえ", next: "Q6" }
    ]
  },
    Q6: {
    text: "Q6. 面子は順子（シュンツ）のみですか？（3,4,5のような階段）",
    choices: [
        { label: "はい", next: "Q7" },
        { label: "いいえ", next: "Q8" } // Q8は今後追加予定
    ]
    },
    Q7: {
    text: "Q7. チーしましたか？",
    choices: [
        { label: "はい", next: "RESULT", points: 30, override: true }, // 例外的な処理フラグ
        { label: "いいえ", next: "Q8" }
    ]
    },
    Q8: {
    text: "Q8. 刻子（コーツ）・槓子（カンツ）の数を選んでください",
    type: "form"  // 特別画面
    },
    Q9: {
    text: "Q9. この刻子はどんな種類？",
    choices: [
        { label: "中張牌・明刻", next: "" , points: 2 },
        { label: "中張牌・暗刻", next: "", points: 4 },
        { label: "么九牌・明刻", next: "", points: 4 },
        { label: "么九牌・暗刻", next: "", points: 8 },
    ]
    },
    Q10: {
    text: "Q10. この槓子はどんな種類？",
    choices: [
        { label: "中張牌・明槓", next: "", points: 8 },
        { label: "中張牌・暗槓", next: "", points: 16 },
        { label: "么九牌・明槓", next: "", points: 16 },
        { label: "么九牌・暗槓", next: "", points: 32 },
    ]
    }

};

export default questions;
