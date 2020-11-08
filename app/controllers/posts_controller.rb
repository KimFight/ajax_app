class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
    #レコードを降順で並び替えて取得。 .order(id:"DESC")
    #昇順は ASC
  end

  def create
    Post.create(content: params[:content])
    redairect_to action: :index
  end

  def checkd
    post = post.find(params[:id])
    if post.checkd
      #updateはActiveRecordのメソッド
      post.update(checkd: false)
      #もし既読であれば未読にする
    else
      post.update(checked: true)
      #未読であれば既読にする
    end

    item = Post.find(params[:id])
    # 更新し直したコードを取得
    render json: { post: item }
    # json形式のデータとしてcheckd.jsに返している
  end

end
