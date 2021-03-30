yml = File.join(Rails.root, 'db', 'seeds.yml')
data = HashWithIndifferentAccess.new(YAML::load_file(yml))
data[:projects].each do |project|
  created_project = Project.create!(title: project[:title])
  created_project.todos.create!(project[:todos])
end
