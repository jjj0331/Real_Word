Rails.application.routes.draw do
  namespace :api do
    #【ユーザを作成:C】
    post '/users',       to: 'users#create'
    #【ログイン】
    post '/users/login', to: 'users#login'
    #【ユーザ表示:G】
    get  '/users/login', to: 'users#show'
    #【ユーザ表示:U】
    post  '/user/update',to: 'users#update'

    #【記事を作成:C】
    post '/articles',    to: 'articles#create'
    #【記事取得(ALL):R】
    get  '/articles',    to: 'articles#all'
    #【記事取得(特定):R】
    get  '/articles/:id',to: 'articles#show'
    #【記事取得(特定のユーザの全記事):R】
    get  '/user/:id',    to: 'articles#usersarticles'
    #【記事更新(特定):U】
    post  '/articles/:id',to: 'articles#update'
    #【記事の削除:D】
    delete'/articles/:id',to:'articles#delete'
  end
end
