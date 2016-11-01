var assert = require('chai').assert;
var expect = require('chai').expect;

accessControlPage = require("../pageobjects/access-control-page.js");

describe('Access Control Page - Verify that', function() {
   
    beforeEach(function () {
	browser.deleteCookie();
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
	loginpage = browser.element('h2=Installed snaps');
	loginpage.waitForVisible();
	expect(loginpage.getText(), "Login Failed with valid token").to.contain('Installed snaps');
    });

   it('until not authenticated, store link will return to access-control page', function() {
	
	accessControlPage.store.click();
	accessControlPage.token.waitForVisible();
	assert.isNotNull(accessControlPage.token.value);

    });

   it('calling generate-token command should invalidate the previous auth cookie', function() {
	console.log("ToDo - Regenerat the token and validate that previous auth cookie becomes invalid");
    });

});
