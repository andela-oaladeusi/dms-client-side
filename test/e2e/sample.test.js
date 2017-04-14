var config = require('../../nightwatch.conf');

module.exports = {
  'DMS Assert Title': function(browser) {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('body')
      .assert.title('dms')
      .assert.containsText('.navbar-brand', 'DMS')
      .assert.visible('input[placeholder=Search]')
      .saveScreenshot('dms-test.png')
      .end();
  },
  'SIGN IN': function(browser) {
    browser
      .url('http://localhost:3000/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=password]')
      .assert.visible('input[name=email]')
      .setValue('input[name=email]', 'olawalequest@gmail.com')
      .setValue('input[name=password]', 'password')
      .waitForElementVisible('body')
      .submitForm('.form-group .btn')
      .pause(5000)
      .assert.visible('.alert .alert-success')
      .pause(500)
      .click('.close')
      .assert.hidden('.alert .alert-success')
      .assert.urlContains('localhost:3000')
      .end();
  }
};