class Api::UsersController < ApplicationController
  
#=【ユーザを作成:C】================================================
  def create
    #POSTからのメッセージを受け取る
    @user = User.new(user_params)
    #保存できるかのチェック
    if @user.save
      #保存が成功した場合→ユーザーidに基づいてtokenを作成
      token = create_token(@user.id)
      #保存が成功した場合のレスポンス
      render json:{message:"ユーザーの作成に成功しました",token:token}
    else
      render json:{message:@user.errors.full_messages}
    end   
  end
#=【ログイン】================================================
  def login
    #POSTからのemial情報からユーザーを探す
    user=User.find_by(email: params[:user][:email].downcase)
    #ユーザーがいるのか、パスワードがあっているのかチェック
    if user && user.authenticate(params[:user][:password])
      token = create_token(user.id)
      render json:{login:{token:token,message:"ログインに成功しました"}}
    else
      Rails.logger.debug("Login failed for user: #{params[:user][:email].downcase}")
      render json:{message:"ログインに失敗しました"}
    end  
  end
#=【ユーザ表示:G】================================================
  def show
    if current_user
      render json: current_user
    else
      render json: { message: "ログインしていません" }, status: :unauthorized
    end
  end

#=【ユーザ情報を更新:U】================================================
def update
  # パラメータをデバッグ出力
  Rails.logger.debug("Received parameters: #{params.inspect}")

  @user=User.find_by(id: params[:user][:id])
  #current_userメソッドを実行
  current_user

  if @user && @user.id == @current_user.id
    update_params = user_params
    
    if @user.update(update_params)
      render json: { message: "ユーザ情報を更新しました" }
    else
      Rails.logger.debug("Update failed: #{@user.errors.full_messages}")
      render json: { message: "更新に失敗しました", errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  else
    render json: { message: "ユーザがいないか、ログインユーザと記事の作成者が違います" }, status: :unauthorized
  end

end

#=【プライベートメソッド】========================================
  private 
  #=【リクエストパラメータの制御】================================
  def user_params
    params.require(:user).permit(:username,:email,:password,:bio,:image,:id)
  end

 #=【tokenの作成】=====================================
  def create_token(user_id)
    payload = { user_id: user_id }
    secret_key = Rails.application.credentials.secret_key_base
    token = JWT.encode(payload, secret_key)
    return token
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
