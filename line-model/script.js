document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("sendToLineButton");
  if (!btn) return;

  const val = (id) => document.getElementById(id).value.trim();

  // 指定したグリッド内でチェックされた項目を「・◯◯」の配列で返す
  const checked = (gridId) => {
    const out = [];
    document.querySelectorAll(`#${gridId} input[type="checkbox"]`).forEach((input) => {
      if (input.checked) {
        const text = input.parentElement.innerText || input.parentElement.textContent;
        out.push(`・${text.trim()}`);
      }
    });
    return out;
  };

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = val("userName");
    const gender = val("userGender");
    const age = val("userAge");
    const area = val("userArea");
    const faceOk = val("faceOk");
    const experience = val("userExperience");
    const refUrl = val("refUrl");
    const note = val("userNote");

    const types = checked("shootTypes");
    const places = checked("shootPlaces");

    // キャスティングに最低限必要な項目が無いと台帳に載せられないので、送る前に止める
    const missing = [];
    if (!name) missing.push("活動名・お名前");
    if (!gender) missing.push("性別");
    if (!age) missing.push("年齢");
    if (!area) missing.push("居住地・撮影に行けるエリア");
    if (!faceOk) missing.push("顔出し");
    if (!types.length) missing.push("対応できる撮影（1つ以上）");
    if (missing.length) {
      alert("次の項目が未入力です。\n\n・" + missing.join("\n・"));
      return;
    }

    // LINEメッセージの組み立て
    // 先頭の【…】は台帳化のGASが種別を判定する見出し。変更するとGAS側の対応が要る。
    const messageText = `【広告モデル登録】
■基本情報
活動名：${name}
性別：${gender}
年齢：${age}歳
エリア：${area}

■出演できる条件
顔出し：${faceOk}
対応できる撮影：
${types.join("\n")}
撮影できる場所：
${places.length > 0 ? places.join("\n") : "・未選択"}

■経験
出演経験：${experience || "未選択"}
参考URL：${refUrl || "なし"}

■自己PR/備考
${note || "なし"}

広告モデルの登録をお願いします。`;

    // LINE起動 (@011rlbwn)
    const yourLineId = "@011rlbwn";
    const encodedMsg = encodeURIComponent(messageText);
    window.location.href = `https://line.me/R/oaMessage/${yourLineId}/?${encodedMsg}`;
  });
});
