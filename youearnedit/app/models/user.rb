class User
  include Mongoid::Document
  field :github_id, type: Integer
  field :login, type: String
  field :node_id, type: String
  field :avatar_url, type: String
  field :url, type: String
  field :type, type: String
end
