const HomePage = require('../pageobjects/homepage');
const dslcal = require('../pageobjects/dslcal');
describe('DSL Calculator verification', () => {
    it('Using the calculator I should see available tariffs for my selection', () => {        
        HomePage.open();
        browser.maximizeWindow();
        HomePage.AcceptCookiesIfExist();

        //Navigate to dsl calculator
        dslcal.NavigateToDSlCalCulator();
        dslcal.Loadresults("030","100");
        
        //Ensure Verivox recommendation at least shows 1 item
        expect(dslcal.recommendeditems.length).toBeGreaterThan(1);
        //Ensure Ermittelte Tarife at least shows 5 tariffs after calculator search
        expect(dslcal.ermittelte.length).toBeGreaterThan(5);
        //Ensure load More 20 items button is present.        
        expect(dslcal.loadmore.isDisplayed()).toBe(true);
        //Ensure All traiffs in ermittlte have download speed greater or equal than 100.    
        expect(dslcal.EnsureDataSpeedIsGreaterThanGiven(100)).toBe(true);        
    })
})