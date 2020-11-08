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

end
