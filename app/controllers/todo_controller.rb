class TodoController < ApplicationController
  skip_before_action :verify_authenticity_token # Todo auth token?
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

  def patch
    @todo = Todo.find(params[:todo_id])
    @todo.update!(todo_patch_params)
  end
  
  private def todo_patch_params
    params.permit(:isCompleted)
  end

  private def todo_params
    params.require(:todo).permit(:text, :isCompleted, :project_id)
  end

end
