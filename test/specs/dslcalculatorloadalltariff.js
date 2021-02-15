const HomePage = require('../pageobjects/homepage');
const dslcal = require('../pageobjects/dslcal');
describe('DSL Calculator Load All Tariff verification', () => {
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
    it('Ensure all the displayed tariffs have bandwidth greater than 100', () => {        
        
        //Ensure load More 20 items button is present.        
        expect(dslcal.loadmore.isDisplayed()).toBe(true);
        //Ensure All traiffs in ermittlte have download speed greater or equal than 100.    
        expect(dslcal.EnsureDataSpeedIsGreaterThanGiven(100)).toBe(true);
    });
    it('Keep loading more items until all items are loaded.And ensure all tariffs have bandwith greater or equal to 100. Check Weiter button loads correct number of tariffs', () => {        
        
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
            console.log("Ensure Weiter button have loaded correct number of tariffs")
            expect(nextPageActualTariffsLoaded).toEqual(nextPageExpectedTariffs);
        }
        it('Ensure correct tariffs have been loaded', () => {
            var actualtariffs=dslcal.ermitteltedataspeed.length;
            expect(expectedtariffs).toEqual(actualtariffs);
            //Ensure weiter button is no longer displayed
            expect(dslcal.weiterbutton.isDisplayed()).toBe(false);
        });
        it('Ensure Load More items button is not diaplyed anymore', () => {            
            //Ensure weiter button is no longer displayed
            expect(dslcal.weiterbutton.isDisplayed()).toBe(false);
        });
    });
});