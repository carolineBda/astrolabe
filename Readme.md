Astrolabe [![Build Status](https://travis-ci.org/stuplum/astrolabe.png?branch=master)](https://travis-ci.org/stuplum/astrolabe)
=========

`Astrolabe` is an extension for [protractor](https://github.com/juliemr/protractor) that adds page objects to your functional/e2e tests.

Installation
------------

via [npm (node package manager)](http://github.com/isaacs/npm)

    $ npm install astrolabe


Usage
-----

Example signInPage.js

``` js
var Page = require('astrolabe').Page;

module.exports = Page.create({

    url: { value: 'http://mysite.com/signin' },

    username: { get: function() { return this.findElement(this.by.input('username')); } }, // finds an input element with the name 'username'
    submit:   { get: function() { return this.findElement(this.by.id('submit')); } }       // finds an element with the id 'submit'
});
```

can be used in your tests:

``` js
var signInPage = require('./path/to/signInPage');

...

signInPage.go(); // will send browser to 'http://mysite.com/signin'

signInPage.username.sendKeys('a username'); // will fill the username input with the text 'a username'

signInPage.submit.click(); // will click on the submit element

...
```

It is possible to create convienience methods to wrap up common logic.

Example signInPage.js

``` js
var Page = require('astrolabe').Page;

module.exports = Page.create({

    url: { value: 'http://mysite.com/signin' },

    username: { get: function() { return this.findElement(this.by.input('username')); } },
    password: { get: function() { return this.findElement(this.by.input('password')); } },
    submit:   { get: function() { return this.findElement(this.by.id('submit')); } },

    // Adds a signIn method to the page object.
    signIn:   { value: function(username, password) {

        this.go();

        this.username.sendKeys(username);
        this.password.sendKeys(password);

        this.submit.click();
    } }
});
```

can be used in your tests:

``` js
var signInPage = require('./path/to/signInPage');

...

signInPage.signIn('test user', 'testpassword'); // will navigate to sign in page, enter username and password then click submit.

...
```

Cloning and running Astrolabe's tests
-------------------------------------
Clone the github repository.

    git clone https://github.com/stuplum/astrolabe.git
    cd astrolabe
    npm install

    npm test


Running Astrolabe's example protractor test
-------------------------------------------

Install protractor with.

    npm install protractor

Start up a selenium server (See the appendix below for help with this). By default, the tests expect the selenium server to be running at `http://localhost:4444/wd/hub`.

The example folder contains a simple test suite which runs against angularjs.org. It is a port of the simple test suite included with protractor.

Currently only the protractor runner is supported. The runner accepts a configuration file, which runs the tests at `example/onProtractorRunner.js`.

    node_modules/.bin/protractor examples/protractor.conf.js


Setting up a standalone selenium server
---------------------------------------

See Appendix A of [protractor's](https://github.com/juliemr/protractor) installation instructions