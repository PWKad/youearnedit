class IssuesController < ApplicationController
  # GET /issues
  # GET /issues.json
  def index
    @issues = IssuesService.fetch_all
  end
end
