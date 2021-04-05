class TodoController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    render json: Todo.all
  end
  
  def create
    if params[:title]
      @project = Project.new(title: params[:title])
      if @project.save
        @todo = Todo.create(text: params[:text], isCompleted:params[:isCompleted], project_id: @project.id)
        @todo.save
      end
    else
      @todo = Todo.new(todo_params)
      if @todo.save
        render json: {status: "ok"}
      end
    end
  end

  private def todo_params
    params.require(:todo).permit(:text, :isCompleted, :project_id)
  end
end
