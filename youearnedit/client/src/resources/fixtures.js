class Category {
  name = '';
  code = '';
  issues = [];

  constructor(data) {
    Object.assign(this, data);
  }
}

export default class Fixtures {
  static categories = [
    new Category({name: 'ActionCable', code: 'actioncable'}),
    new Category({name: 'ActionMailer', code: 'actionmailer'}),
    new Category({name: 'ActionPack', code: 'actionpack'}),
    new Category({name: 'ActionView', code: 'actionview'}),
    new Category({name: 'ActiveJob', code: 'activejob'}),
    new Category({name: 'ActiveModel', code: 'activemodel'}),
    new Category({name: 'ActiveRecord', code: 'activerecord'}),
    new Category({name: 'ActiveStorage', code: 'activestorage'}),
    new Category({name: 'ActiveSupport', code: 'activesupport'}),
    new Category({name: 'Asset Pipeline', code: 'assetpipeline'}),
    new Category({name: 'Uncategorized', code: ''})
  ]
}
