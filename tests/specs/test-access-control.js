var assert = require('chai').assert;
var expect = require('chai').expect;

accessControlPage = require("../pageobjects/access-control-page.js");

describe('Verify Access Control page', function() {
   
    beforeEach(function () {
	accessControlPage.open();
	}); 

    afterEach(function () {
	});

    function verify_invalid_token(token_value)  {
 
        accessControlPage.token.setValue(token_value);
        accessControlPage.submit();
        expect(accessControlPage.login_failed.getText()).to.contain('Invalid');
	
	};
 
    it('loads correctly', function () {

	title = browser.getTitle();
        assert.equal(title, 'Snapweb');

	assert.isNotNull(accessControlPage.homepage.value);
	assert.isNotNull(accessControlPage.store.value);
        assert.isNotNull(accessControlPage.token.value);
	assert.isNotNull(accessControlPage.submit_btn.value)
	assert.isNotNull(accessControlPage.token_cmd.value);
	assert.isNotNull(accessControlPage.bugreport.value);
	
    });

    it('rejects invalid tokens', function () {

	var tokens = ['','a',"'", '#', Array(1024).join('x')];

	tokens.forEach(function(token){
		verify_invalid_token(token);
	});
	
    });


    it('accepts valid token', function () {

       	accessControlPage.token.setValue(process.env.TOKEN.trim());
        accessControlPage.submit();
	//expect(accessControlPage.login_failed.getText(), "Login Failed with valid token").to.not.contain('Invalid');
	loginpage = browser.element('h2=Installed snaps');
	loginpage.waitForExist(3000);
	expect(loginpage.getText(), "Login Failed with valid token").to.contain('Installed snaps');
    });
});
