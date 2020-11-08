function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {  
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {
    const postId = post.getAttribute("data-id");

    //Ajaxを可能にするためのオブジェクトXHR
    const XHR = new XMLHttpRequest();

    //XHR.open("HTTPメソッド",`パスの指定`,非同期通信のON/OFF)どんなリクエストか
    XHR.open("GET", `/posts/${postId}`, true);
    //レスポンスで欲しい情報の形式
    XHR.responseType = "json";
    //checked.jsにリクエストを送信
    XHR.send();
    //onloadはXHRHttpRequestで定義されて、レスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;          
      }
      const item = XHR.response.post;
      if (item.checked === true) { 
        post.setAttribute("data-check", "true");
      } else if (item.checked === false) {
        post.removeAttribute("data-check");
      }      
    }
  });
});
}
//一定の時間でメモ投稿一覧を全て取得する
setInterval(check, 1000);