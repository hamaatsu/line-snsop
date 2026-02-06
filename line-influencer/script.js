document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("sendToLineButton");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    // 入力値の取得
    const name = document.getElementById("userName").value;
    const gender = document.getElementById("userGender").value;
    const area = document.getElementById("userArea").value;
    const sns = document.getElementById("mainSns").value;
    const url = document.getElementById("snsUrl").value;
    const followers = document.getElementById("followerCount").value;

    // フォロワー属性の取得
    const folGender = document.getElementById("followerGender").value;
    const ages = [
      `18-24:${document.getElementById("age18").value}%`,
      `25-34:${document.getElementById("age34").value}%`,
      `35-44:${document.getElementById("age44").value}%`,
      `45-54:${document.getElementById("age54").value}%`,
      `55+:${document.getElementById("age55").value}%`
    ].join(' / ');
    
    const nations = [
      document.getElementById("nation1").value,
      document.getElementById("nation2").value,
      document.getElementById("nation3").value
    ].filter(v => v).join('\n');

    const experience = document.getElementById("userExperience").value;
    const note = document.getElementById("userNote").value;

    // チェックボックス項目の取得
    const allQuestions = document.querySelectorAll('.question-item input[type="checkbox"]');
    let genres = [];
    allQuestions.forEach(input => {
      if(input.checked) {
        let text = input.parentElement.innerText || input.parentElement.textContent;
        genres.push(`・${text.trim()}`);
      }
    });

    // LINEメッセージの組み立て
    const messageText = `【インフルエンサー 登録】
■基本情報
活動名：${name || "未入力"}
性別：${gender || "未回答"}
拠点：${area || "未入力"}

■実績・SNS
SNS：${sns || "未入力"}
URL：${url || "なし"}
総フォロワー：${followers || "0"}人

■フォロワー属性
男女比：${folGender || "未入力"}
年齢分布：${ages}
国籍上位：
${nations || "未入力"}

■得意ジャンル
${genres.length > 0 ? genres.join('\n') : "未選択"}

■PR経験/備考
経験：${experience || "未選択"}
備考：${note || "なし"}

キャスティング案件の登録をお願いします。`;

    // LINE起動 (@011rlbwn)
    const yourLineId = "@011rlbwn"; 
    const encodedMsg = encodeURIComponent(messageText);
    window.location.href = `https://line.me/R/oaMessage/${yourLineId}/?${encodedMsg}`;
  });
});