const HomePage = require('../pageobjects/homepage');
const dslcal = require('../pageobjects/dslcal');
describe('DSL Calculator Load All Tariff verification', () => {
    it('DSL calculator page should load all tariff using Weiter Button', () => {        
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

        var expectedtariffs=dslcal.GetNumberOFTariffs();
        var actualtariffs=0;
        while(dslcal.weiterbutton.isDisplayed()){
            var previoustariffs=dslcal.ermitteltedataspeed.length;
            var nextPageExpectedTariffs=dslcal.GetNextPageTariffsFromWeiterButton();

            //Ensure that weiter button will show remaining items to load if it is less than 20 or show 20 if its greater than 20. 
            //This will ensure final weiter button displays only remaining number of items.
            var remainingitemstoload=(expectedtariffs-previoustariffs)<20 ? expectedtariffs-previoustariffs : 20;
            expect(nextPageExpectedTariffs).toEqual(remainingitemstoload);

            dslcal.LoadNextTariffs(previoustariffs+nextPageExpectedTariffs);
            //if previously loaded tariffs are 20, next expected tariffs are 20, then after clicking on next button we have 40 tariffs. 
            //Hence next button have loaded items = total items displayed (40)-previoustariffs loaded(20) :20 
            var nextPageActualTariffsLoaded=dslcal.ermitteltedataspeed.length-previoustariffs;
            //expect(nextPageTariffs).toEqual(dslcal.ermitteltedataspeed.length);
            //Ensure correct number of traiffs have been loaded
            expect(nextPageActualTariffsLoaded).toEqual(nextPageExpectedTariffs);            
        }
        var actualtariffs=dslcal.ermitteltedataspeed.length;
        expect(expectedtariffs).toEqual(actualtariffs);
        //Ensure weiter button is no longer displayed
        expect(dslcal.weiterbutton.isDisplayed()).toBe(false);
        
    })
})