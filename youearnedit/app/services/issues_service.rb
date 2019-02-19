class IssuesService
  @client = Octokit::Client.new(:login => ENV['GITHUB_USERNAME'], :password => ENV['GITHUB_PASSWORD'], per_page: 100)

  def self.filter_issues(issues)
    issues.select { |issue| issue.pull_request == nil }
  end

  def self.clean_issues(issues)
    issues.map do |issue|
      issue.github_id = issue.id
      issue.id = nil
      issue.to_h
    end
  end

  def self.fetch_all
    Rails.cache.fetch(:issues, expires_in: 1.day) do
      Issue.destroy_all

      issues = @client.list_issues('rails/rails', query: { state: 'open' })

      issues = filter_issues(issues)

      issues = clean_issues(issues)

      Issue.collection.insert_many(issues)

      Issue.all.to_a
    end
  end
end
