# README

## Overview

This project is built from the [YEI GitHub repository](https://github.com/youearnedit/yei_challenge_ruby).  The version of ruby and rails are inherited from that project and locked at -

```
$ ruby -v # 2.3.5
$ rails -v # ~5.1.4
```

To start the application simply bring up the API with `rails s` and `npm start` from the root dir.

## Dependencies

- node.js
- npm
- ruby
- rails
- redis
- mongodb

## Installation

After cloning the repository locally -

```
$ cd youearnedit
$ bundle install
$ cd client
$ npm install
```

The React app is running a proxy to allow connecting to the API without additional network config.  When deploying the app this would not be needed because nginx or something would be used as a reverse proxy.

## Environment Variables

You need to set two environment variables for GitHub to authenticate your requests.  GitHub will rate limit users who are not authenticated.

```
GITHUB_USERNAME=
GITHUB_PASSWORD=
```

The environment variables are loaded in to the proper Octokit environment variables as well when the tests run.

## Database

MongoDb will automatically create the databsae and tables for you, only requirement is to have a local running mongodb instance.

## Tests

To run the rails API tests -

```
$ rspec
```

To run the Jest client-side tests -

```
$ npm test
```

## Services

The main service on the API is a simple issues service.  The service has a `fetch_all` method that makes a call out to the GitHub API and requests all open issues.

Since GitHub returns `pull_request`s as well there is a method for filtering them out and another method for cleaning the data before inserting it in to the database.

Since the issues have a state that can change and we already have to fetch all records every request to look for state changes it was more performant to replace all issues rather than apply updates.

On the client-side there is a corresponding issues service.  This service calls out to the rails API to get the issues and buckets them.

The reason I chose to bucket them is to visually make it easier to understand the data.  Right now when you first load the page you are presented with a card representing each category.

You can see how many issues each category has to decide which to review, or you can switch to a list view at any time to see all open issues.

While viewing the list you can click on the header for the comments column to toggle sorting asc or desc.
