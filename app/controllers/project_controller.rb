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

  private def todo_params
    params.permit(:isCompleted)
  end
  def angular
    # send_file "#{RAILS_ROOT}/ng-app/dist/ng-app/index.html", type: 'text/html; charset=utf-8'
    # @file ="#{Rails.root}/ng-app/dist/ng-app/index.html"
    # send_file @file, type: 'text/html; charset=utf-8', :disposition => 'inline'
  end
end
