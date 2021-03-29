<<<<<<< HEAD
yml = File.join(Rails.root, 'db', 'seeds.yml')
data = HashWithIndifferentAccess.new(YAML::load_file(yml))
data[:projects].each do |project|
  created_project = Project.create!(title: project[:title])
  created_project.todos.create!(project[:todos])
end
=======
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
>>>>>>> 279db6265040d1a014fe13cc7182155fef431d88
