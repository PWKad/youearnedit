require 'rails_helper'

describe 'IssuesService' do
  describe 'filter_issues' do
    it 'filters out issues that are pull requests' do
      IssueOrPRStruct = Struct.new('IssueOrPRStruct', :pull_request)

      issue = IssueOrPRStruct.new(1)
      pull_request = IssueOrPRStruct.new(nil)

      issues = [issue, pull_request]

      result = IssuesService.filter_issues(issues)
      expect(result.count).to be(1)
    end
  end

  describe 'clean_issues' do
    IssueStruct = Struct.new('IssueStruct', :id, :github_id)

    before(:all) do
      @issue_id = 123
      issue = IssueStruct.new(@issue_id)
      issues = [issue]
      @result = IssuesService.clean_issues(issues)
    end

    it 'renames the id to github_id before creating to avoid id conflicts' do
      expect(@result.first[:github_id]).to be(@issue_id)
    end

    it 'converts the Sawyer::Response to a hash to save' do
      expect(@result.first.class == Hash).to be(true)
    end
  end

  describe 'fetch_all' do
    it 'gets all of the open github issues from the rails/rails org' do
      result = IssuesService.fetch_all
      expect(result.count > 1).to be(true)
    end
  end

  after(:all) do
    Issue.destroy_all
  end
end
