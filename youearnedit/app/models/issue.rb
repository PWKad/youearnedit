class Issue
  include Mongoid::Document
  include Mongoid::Timestamps

  field :github_id, type: Integer
  field :node_id, type: String
  field :url, type: String
  field :repository_url, type: String
  field :comments_url, type: String
  field :number, type: Integer
  field :state, type: String
  field :title, type: String
  field :body, type: String
  field :locked, type: Mongoid::Boolean
  field :active_lock_reason, type: String
  field :comments, type: Integer
  field :closed_at, type: DateTime

  embeds_one :user

  embeds_many :labels
end
