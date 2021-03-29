Rails.application.routes.draw do
<<<<<<< HEAD
  # root 'project#index'
  get 'todos' => 'todo#index'
  post 'todo' => 'todo#create'


  get 'projects' => 'project#index'
  put 'projects/:id/todo/:id' => 'project#update'
=======
  get "/projects", to: "project#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
>>>>>>> 279db6265040d1a014fe13cc7182155fef431d88
end
