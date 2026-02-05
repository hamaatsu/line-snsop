document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("sendToLineButton");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    // 1. 各項目の値を取得
    const name = document.getElementById("userName").value;
    const age = document.getElementById("userAge").value;
    const tiktok = document.getElementById("tiktokId").value;
    const followers = document.getElementById("followerCount").value;
    const weekly = document.getElementById("weeklyStreams").value;
    const duration = document.getElementById("streamDuration").value;
    const experience = document.getElementById("userExperience").value;
    const status = document.getElementById("userStatus").value;
    const note = document.getElementById("userNote").value;

    // 2. チェックボックス（ジャンル）の取得
    const allQuestions = document.querySelectorAll('.question-item input[type="checkbox"]');
    let genres = [];
    allQuestions.forEach(input => {
      if(input.checked) {
        let text = input.parentElement.innerText || input.parentElement.textContent;
        genres.push(`・${text.trim()}`);
      }
    });

    // 3. メッセージ作成
    const messageText = `【TikTokライバー応募】
■基本情報
名前：${name || "未入力"}
年齢：${age || "未入力"}
ID/URL：${tiktok || "未入力"}
フォロワー数：${followers || "0"}人

■配信予定
週の配信数：${weekly || "0"}回
1回の時間：${duration || "0"}分

■配信内容
${genres.length > 0 ? genres.join('\n') : "未選択"}

■経験・状況
経験：${experience || "未選択"}
所属：${status || "未選択"}

■その他
${note || "なし"}

この内容でライバー応募をお願いします。`;

    // 4. LINE起動 (@011rlbwn)
    const yourLineId = "@011rlbwn"; 
    const encodedMsg = encodeURIComponent(messageText);
    window.location.href = `https://line.me/R/oaMessage/${yourLineId}/?${encodedMsg}`;
  });
});