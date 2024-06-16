Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3000' # ローカルホストのみからのリクエストを許可する場合
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options] # 許可するHTTPメソッドを指定
  end
end