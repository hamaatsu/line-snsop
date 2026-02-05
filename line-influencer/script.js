document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("sendToLineButton");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("userName").value;
    const gender = document.getElementById("userGender").value;
    const area = document.getElementById("userArea").value;
    const sns = document.getElementById("mainSns").value;
    const url = document.getElementById("snsUrl").value;
    const followers = document.getElementById("followerCount").value;
    const experience = document.getElementById("userExperience").value;
    const note = document.getElementById("userNote").value;

    const allQuestions = document.querySelectorAll('.question-item input[type="checkbox"]');
    let genres = [];
    allQuestions.forEach(input => {
      if(input.checked) {
        let text = input.parentElement.innerText || input.parentElement.textContent;
        genres.push(`・${text.trim()}`);
      }
    });

    const messageText = `【インフルエンサー 登録】
■基本情報
活動名：${name || "未入力"}
性別：${gender || "未回答"}
拠点：${area || "未入力"}

■実績・SNS
SNS：${sns || "未入力"}
URL：${url || "なし"}
総フォロワー：${followers || "0"}人

■得意ジャンル
${genres.length > 0 ? genres.join('\n') : "未選択"}

■PR経験
${experience || "未選択"}

■自己PR/属性
${note || "なし"}

キャスティング案件の登録をお願いします。`;

    const yourLineId = "@011rlbwn"; 
    const encodedMsg = encodeURIComponent(messageText);
    window.location.href = `https://line.me/R/oaMessage/${yourLineId}/?${encodedMsg}`;
  });
});