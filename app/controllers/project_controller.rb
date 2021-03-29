class ProjectController < ApplicationController
<<<<<<< HEAD
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
=======
  def index
    json = JSON.generate(message: 'ok')
    send_data json, type: :json, disposition: 'inline'
>>>>>>> 279db6265040d1a014fe13cc7182155fef431d88
  end
end
