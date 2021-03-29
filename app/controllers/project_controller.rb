class ProjectController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    @projects= Project.all
    @data = @projects.to_json(include: :todos)
    render json: @data
  end

  def update
    @todo = Todo.find(params[:id])
    @todo.update!(todo_params)
  end

  private def todo_params
    params.permit(:isCompleted)
  end
end
