const Base = require('./base');
/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Base {
    /**
     * define selectors using getter methods
     */
    get cookies (){return $('//div[contains(@class,"cmp-container")]//*[contains(text(),"Cookie-Einstellungen")]')}   
    get cookiesAccept () {return $('#uc-btn-accept-banner')} 
    
    

    /**
     * a method to encapsule automation code to interact with the page     
     */
    AcceptCookiesIfExist(){
        this.cookies.waitForExist({ timeout:5000, timeoutMsg:'Cookies popup not present', interval:100 });
        this.cookiesAccept.click();
    }   

    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open();
    }
}

module.exports = new HomePage();
