class ProjectController < ApplicationController
  skip_before_action :verify_authenticity_token
  def get
    @projects= Project.all
    @data = @projects.to_json(include: :todos)
    render json: @data
  end

  def update
    @todo = Todo.find(params[:id])
    @todo.update!(todo_params)
  end
  
  def static
    send_file Rails.root.join('ng-app/dist/ng-app/', request.original_fullpath)
  end

  private def todo_params
    params.permit(:isCompleted)
  end
end
