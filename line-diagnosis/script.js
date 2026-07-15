document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("sendToLineButton");
  if (!btn) return;

  const val = (id) => document.getElementById(id).value.trim();

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const targetSns = val("targetSns");
    const accountUrl = val("accountUrl");
    const userName = val("userName");
    const userType = val("userType");
    const userGenre = val("userGenre");
    const userGoal = val("userGoal");
    const note = val("userNote");

    // 最低限これだけは無いと診断できないので、送る前に止める
    const missing = [];
    if (!targetSns) missing.push("診断したいSNS");
    if (!accountUrl) missing.push("アカウントURL");
    if (!userType) missing.push("お立場");
    if (missing.length) {
      alert("次の項目が未入力です。\n\n・" + missing.join("\n・"));
      return;
    }

    // チェックボックス項目の取得
    const concerns = [];
    document.querySelectorAll('.question-item input[type="checkbox"]').forEach((input) => {
      if (input.checked) {
        const text = input.parentElement.innerText || input.parentElement.textContent;
        concerns.push(`・${text.trim()}`);
      }
    });

    // LINEメッセージの組み立て
    // 先頭の【…】は台帳化のGASが種別を判定する見出し。変更するとGAS側の対応が要る。
    const messageText = `【SNSアカウント無料診断】
■診断するアカウント
対象SNS：${targetSns}
URL：${accountUrl}

■あなたについて
お名前・屋号：${userName || "未入力"}
お立場：${userType}
業種・ジャンル：${userGenre || "未入力"}

■診断で知りたいこと
目的：${userGoal || "未選択"}
気になっていること：
${concerns.length > 0 ? concerns.join("\n") : "・未選択"}

■その他
${note || "なし"}

無料診断をお願いします。`;

    // LINE起動 (@011rlbwn)
    const yourLineId = "@011rlbwn";
    const encodedMsg = encodeURIComponent(messageText);
    window.location.href = `https://line.me/R/oaMessage/${yourLineId}/?${encodedMsg}`;
  });
});
