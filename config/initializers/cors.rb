Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:4200', 'infinite-bayou-50863.herokuapp.com'
    resource '*',
      headers: :any,
      methods: [:get, :post, :delete, :put, :patch, :options, :head]
  end
end
 