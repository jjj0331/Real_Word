class Api::ArticlesController < ApplicationController
  before_action :current_user, only: [:create, :update, :delete]
#=【記事を作成:C】================================================
  def create
    @article = Article.new(article_params)
    #ログインしているのか確認
    if current_user
      #ログインしている場合：保存内容にユーザーidを付与
      @article.user_id = current_user.id
      #保存が成功するのか確認
      if @article.save
        render json: @article, status: :created
      else
      #保存が失敗した場合  
        render json: @article.errors, status: :unprocessable_entity
      end
    else
    #ログインしていない場合  
      render json: { message: "ログインしていません" }
    end  
  end

#=【記事取得(ALL):R】=============================================
  def all
    articles = Article.includes(:user).all
    render json: articles.as_json(include: { user: { only: [:id, :username, :email] } })
  end

#=【記事取得(id):R】=============================================
def show
  @article = Article.includes(:user).find_by(id: params[:id])
  if @article
    render json: @article.as_json(include: { user: { only: [:id, :username, :email] } })
  else
    render json: { message: "記事が見つかりません" }, status: :not_found
  end
end

#=【記事取得(id):R】=============================================
def usersarticles
  @article = Article.includes(:user).where(user_id: params[:id])
  if @article
    render json: @article.as_json(include: { user: { only: [:id, :username, :email] } })
  else
    render json: { message: "記事が見つかりません" }, status: :not_found
  end
end

#=【記事の更新:U】================================================
def update
  #パラメータ:idを取得
  id = params[:id]
  #更新対象の記事を取得
  @article=Article.find_by(id:id)
  #current_userメソッドを実行
  current_user
  
  #更新対象の記事があって、ログイン中のユーザと、
  #更新対象の記事の作成ユーザが正しいのか確認
  if @article && @article.user_id == @current_user.id
    if @article.update(article_params)
      render json: { message: "更新できました" }
    else
      render json: { message: "更新に失敗しました", errors: @article.errors }, status: :unprocessable_entity
    end
  else
    render json: { message: "ユーザがいないか、ログインユーザと記事の作成者が違います" }, status: :forbidden
  end
end

#=【記事の削除:D】================================================
def delete
  #パラメータ:idを取得
  id = params[:id]
  #更新対象の記事を取得
  @article=Article.find_by(id:id)
  #current_userメソッドを実行
  current_user
  
  #更新対象の記事があって、ログイン中のユーザと、
  #更新対象の記事の作成ユーザが正しいのか確認
  if @article&&@article.user_id==@current_user.id
    @article.destroy
    render json:{message:"削除しました"}
  else
    render json:{message:"ユーザがいないか、ログインユーザと記事の作成者が違います"}
  end
end  

#=【プライベートメソッド】========================================
  private 
  #=【リクエストパラメータの制御】================================
  def article_params
    params.require(:article).permit(:title, :description, :body)
  end

  #=【ログインユーザの確認】=====================================
  def current_user
    # Authorizationヘッダーからトークンを取得
    token = request.headers["Authorization"]&.split(" ")&.last
    if token
      # トークンをデコードしてユーザーIDを取得
      decoded_token = JWT.decode(token, Rails.application.credentials.secret_key_base, true, algorithm: 'HS256')
      user_id = decoded_token.first["user_id"]
      # データベースからユーザーを取得
      @current_user ||= User.find_by(id: user_id)
    end
  end
end