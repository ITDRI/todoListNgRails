class TodoController < ApplicationController
  skip_before_action :verify_authenticity_token # Todo auth token?
  def create
    if params[:project_title]
      @project = Project.new(title: params[:project_title])
      if (@project.save)
        @todo = Todo.create(text: params[:text], isCompleted:params[:isCompleted], project_id: @project.id)
        @todo.save
        @data = @project.to_json(include: :todos)
        render json: @data
      else
        render json: @project.errors, :status => 422
      end
    else
      @todo = Todo.new(todo_params)
      if (@todo.save)
        render json: @todo
      else 
        render json: @todo.errors, :status => 422
      end
    end
  end

  def patch
    @todo = Todo.find(params[:todo_id])
    if(@todo.update!(todo_patch_params))
      render json: @todo
    else
      render json: @todo.errors, :status => 422
    end
  end
  
  private def todo_patch_params
    params.permit(:isCompleted)
  end

  private def todo_params
    params.require(:todo).permit(:text, :isCompleted, :project_id)
  end

end
