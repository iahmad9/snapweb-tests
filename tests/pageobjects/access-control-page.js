var page = require('./page')

var accessControlPage = Object.create(page, {
    /**
     * define elements
     */
    token: { get: function () { return browser.element('#token'); } },
    submit_btn: { get: function () { return browser.element('#submit'); } },
    homepage: { get: function () { return browser.element("//header//div[contains(@class, 'logo')]/a[contains(@href, '/')]"); } },
    store:     { get: function () { return browser.element("a[href*='store']"); } },
    login_failed: { get: function () { return browser.element("//*[contains(text(), 'Invalid')]"); } },
    token_cmd: { get: function () { return browser.element("//*[contains(text(),'sudo snapweb.generate-token')]"); } },
    bugreport:    { get: function () { return browser.element("//footer//a[contains(@href, 'snappy/+filebug')]"); } },

    /**
     * define or overwrite page methods
     */
    open: { value: function() {
        page.open.call(this, 'access-control');
    } },

    submit: { value: function() {
        this.submit_btn.click();
    } }
});

module.exports = accessControlPage
