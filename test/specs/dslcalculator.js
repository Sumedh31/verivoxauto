const HomePage = require('../pageobjects/homepage');
const dslcal = require('../pageobjects/dslcal');
describe('DSL Calculator verification', () => {
    it('open www.verivox.de ', () => {        
        HomePage.open();
        browser.maximizeWindow();
        HomePage.AcceptCookiesIfExist();              
    });
    it('Navigate to the DSL calculator page using Menu navigation DSL --> Dsl-vergleich', () => {        
        //Navigate to dsl calculator
        dslcal.NavigateToDSlCalCulator();       
    });
    it('Enter 030 for my area code # Ihre Vorwahl = your area code AND select the 100 Mbit/s option as bandwidth.', () => {       
       
        dslcal.Loadresults("030","100");        
    });
    it('Ensure at least 1 Verivox recommended tariffs are loaded and at least 5 tariffs in Ermittelte for given bandwidth are loaded', () => {       
       
        //Ensure Verivox recommendation at least shows 1 item
        expect(dslcal.recommendeditems.length).toBeGreaterThan(1);
        //Ensure Ermittelte Tarife at least shows 5 tariffs after calculator search
        expect(dslcal.ermittelte.length).toBeGreaterThan(5);   
    });
    it('Ensure that all the tariffs loaded have bandwidth greater or equal than 100', () => { 
        //Ensure load More 20 items button is present.        
        expect(dslcal.loadmore.isDisplayed()).toBe(true);
        //Ensure All traiffs in ermittlte have download speed greater or equal than 100.    
        expect(dslcal.EnsureDataSpeedIsGreaterThanGiven(100)).toBe(true);        
    });
});