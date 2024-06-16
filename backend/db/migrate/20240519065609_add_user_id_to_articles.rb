class AddUserIdToArticles < ActiveRecord::Migration[7.1]
  def change
    add_column :articles, :user_id, :integer
    add_foreign_key :articles, :users
  end
end
