class User < ApplicationRecord
  has_many :articles, dependent: :destroy
  
#ハッシュ化したパスワードを保存するため  
  has_secure_password
#saveメソッドの実行前に：emailを小文字に！！！
  before_save { email.downcase! }

#パスワードにバリデーション
  validates :email,   presence: true, uniqueness: true
#ユーザー名にバリデーション
  validates :username,presence: true
#パスワードにバリデーション
  validates :password, length: { minimum: 6 } , allow_nil: true
end
