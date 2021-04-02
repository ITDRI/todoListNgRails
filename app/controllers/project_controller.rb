class ProjectController < ApplicationController
  skip_before_action :verify_authenticity_token  # Todo auth token?
  
  def get
    @projects= Project.all
    @data = @projects.to_json(include: :todos)
    render json: @data
  end


end
