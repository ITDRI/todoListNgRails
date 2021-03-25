class ProjectController < ApplicationController
  def index
    json = JSON.generate(message: 'ok')
    send_data json, type: :json, disposition: 'inline'
  end
end
