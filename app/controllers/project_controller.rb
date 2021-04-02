class ProjectController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def get
    @projects= Project.all
    @data = @projects.to_json(include: :todos)
    render json: @data
  end

  def patch
    @todo = Todo.find(params[:todo_id])
    @todo.update!(todo_patch_params)
  end
  
  private def todo_patch_params
    params.permit(:isCompleted)
  end
end
