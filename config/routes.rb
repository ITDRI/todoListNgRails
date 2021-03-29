Rails.application.routes.draw do
  # root 'project#index'
  get 'todos' => 'todo#index'
  post 'todo' => 'todo#create'
  get 'projects' => 'project#index'
  put 'projects/:id/todo/:id' => 'project#update'
end
