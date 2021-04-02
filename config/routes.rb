Rails.application.routes.draw do
  
  get 'projects' => 'project#get'
  patch 'projects/:project_id/todo/:todo_id' => 'todo#patch'
  post 'todo' => 'todo#create'

end



