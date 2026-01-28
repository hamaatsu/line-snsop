document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("sendToLineButton");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    // 1. 各項目の値を取得
    const company = document.getElementById("companyName").value;
    const user = document.getElementById("userName").value;
    const sns = document.getElementById("snsType").value;
    const url = document.getElementById("currentUrl").value;
    const goal = document.getElementById("snsGoal").value;
    const budget = document.getElementById("snsBudget").value;
    const note = document.getElementById("userNote").value;

    // 2. チェックボックス（お悩み）の取得
    const allQuestions = document.querySelectorAll('.question-item input[type="checkbox"]');
    let issues = [];
    allQuestions.forEach(input => {
      if(input.checked) {
        let text = input.parentElement.innerText || input.parentElement.textContent;
        issues.push(`・${text.trim()}`);
      }
    });

    // 3. メッセージ作成
    const messageText = `【SNS運用代行 相談】
■基本情報
会社名：${company || "未入力"}
担当者：${user || "未入力"}
SNS種別：${sns || "未選択"}
URL：${url || "なし"}

■現在のお悩み
${issues.length > 0 ? issues.join('\n') : "特になし"}

■希望条件
目的：${goal || "未選択"}
予算：${budget || "未選択"}

■その他
${note || "なし"}

この内容でSNS運用の相談・見積もりをお願いします。`;

    // 4. LINE起動 (IDは適宜修正してください)
    const yourLineId = "@281clqmv"; // 必要に応じて変更してください
    const encodedMsg = encodeURIComponent(messageText);
    window.location.href = `https://line.me/R/oaMessage/${yourLineId}/?${encodedMsg}`;
  });
});
