class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
    #レコードを降順で並び替えて取得。 .order(id:"DESC")
    #昇順は ASC
  end

  def create
    post = Post.create(content: params[:content], checked: false)
    render json: { post: post}
  end

  def checked  
    post = Post.find(params[:id])
    if post.checked
      #updateはActiveRecordのメソッド
      post.update(checked: false)
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
