Rails.application.routes.draw do
  root 'project#static'
  get 'todos' => 'todo#index'
  post 'todo' => 'todo#create'
  get 'projects' => 'project#get'
  put 'projects/:id/todo/:id' => 'project#update'


  get '*other', to: 'project#static'
end
