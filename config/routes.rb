Rails.application.routes.draw do
  get 'todos' => 'todo#index'
  post 'todo' => 'todo#create'
  get 'projects' => 'project#get'
  put 'projects/:id/todo/:id' => 'project#update'


  # root 'project#static'
  # get '*other', to: 'project#static'
end
