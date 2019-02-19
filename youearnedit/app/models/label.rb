class Label
  include Mongoid::Document
  field :github_id, type: Integer
  field :node_id, type: String
  field :url, type: String
  field :name, type: String
  field :description, type: String
  field :color, type: String
  field :default, type: Mongoid::Boolean

  embedded_in :issue
end
