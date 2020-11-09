function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    //new FormData(フォームの要素);フォームに入力された値を取得できるオブジェクト
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    //フォームに入力された値を送信
    XHR.send(formData);

    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;          
      }
      //レスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      //描画する親要素のlistの要素を取得
      const list = document.getElementById("list");
      //メモの入力フォームをリセットするため
      const formText = document.getElementById("content");
      
      //insertAdjacentHTMLで、第二引数に使いたいHTMLを定義
      const HTML = `
        <div class="post" data-id=${item.id}>
        <div class="post-date">
         投稿日時：%{item.created_at}
        </div>
        <div class="post-content">
        ${item.content}
        </div>
        </div>`;
      //insertAdjacentHTML 指定したHTMLなどを、特定の要素に描画
      //第一引数で、表示場所の指定。afterend要素の直後に挿入
      list.insertAdjacentHTML("afterend", HTML);
      //メモの入力フォームの文字リセット
      formText.value = "";
    };
    //「submitボタンでclickする」というイベントを阻止
    e.preventDefault();
  });
}
window.addEventListener("load", memo);
