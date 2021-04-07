class Todo < ApplicationRecord
  belongs_to :project
  validates :text, presence: true
  validates :isCompleted, inclusion: [true, false]
  validates :project_id, presence: true
end
