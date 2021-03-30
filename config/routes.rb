Rails.application.routes.draw do
  # root 'project#angular'
  get 'todos' => 'todo#index'
  post 'todo' => 'todo#create'
  get 'projects' => 'project#get'
  put 'projects/:id/todo/:id' => 'project#update'
end
