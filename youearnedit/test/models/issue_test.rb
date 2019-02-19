require 'test_helper'

class IssueTest < ActiveSupport::TestCase
  test 'issue creates embedded documents properly' do

    assert issue.user != nil
    assert issue.assignee != nil
    assert issue.assignees != nil
    assert issue.labels != nil
  end
end
