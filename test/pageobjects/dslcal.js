const Base = require('./base');
const bandwitdhMap = {
    '16':  0,
    '50':  1,
    '100': 2,
    '250': 3
  }
/**
 * sub page containing specific selectors and methods for a specific page
 */
class DslCal extends Base {
    /**
     * define selectors using getter methods
     */
    get calForm () {return $('div[class="hero-content"] .calculator-form')}
    get areacode() {return $('div[class="hero-content"] input[name="phonePrefix"]')}
    get bandwitdh() {return $$('//div[@class="hero-content"]//div[contains(@class,"calc-toggles")]//label')}
    get submitbutton() {return $('div[class="hero-content"] button[type="submit"]')}
    get recommended (){return $('//*[contains(text(),"Verivox-Tarifempfehlung")]')}
    get recommendeditems () {return $$('//*[contains(text(),"Verivox-Tarifempfehlung")]//..//div[@class="owl-item active"]')}
    get ermittelte () {return $$('//*[contains(text(),"Ermittelte Tarife")]/following-sibling::div[contains(@class,"row")]')}
    get loadmore () {return $('//button[@class="btn btn-primary text-uppercase"]')}
    //This locator can also be used to get number of displayed tariffs on the page
    get ermitteltedataspeed (){return $$('//*[contains(text(),"Ermittelte Tarife")]//..//..//div[@class="row my-4"]//app-tariff-speed//div[contains(@class,"speed-download")]//b')}
    get weiterbutton (){return $('button[type="button"][class*=btn-primary]')}
    get DSLMenu (){return $('//input[@id="page-navigation-control3"]//..')}
    get DSLvergleich (){return $('.page-navigation-col a[href="/dsl-vergleich/"]')}
    //get ermitteltedataspeed (){return $('//*[contains(text(),"Ermittelte Tarife")]/following-sibling::div[contains(@class,"row")]//img[@class="download-icon"]/following-sibling::b')}
    

    /**
     * a method to navigate to dsl calculator
     */
    NavigateToDSlCalCulator(){
        this.DSLMenu.waitForExist({ timeout:3000, interval:100 });
        this.DSLMenu.moveTo();
        this.DSLvergleich.click();
        this.calForm.waitForExist({ timeout:3000, interval:100 });
    } 
    /**
    * a method to load results using dsl calculator
    * @param areacode - areacode e.g 030
    * @param bandwidth - Select bandwitdh to search results for e.g "16"|"50"|"100"|"250"
    */
    Loadresults(areacode,bandwidth){
        this.areacode.setValue(areacode);
        //Select the given bandwidth by reading values from bandwitdh map
        this.bandwitdh[bandwitdhMap[bandwidth]].click();
        this.submitbutton.click();
        this.recommended.waitForExist({ timeout:8000, interval:100 });

        //Ensure at least single item is loaded in verivox recommendation before continuing. Interval every 100 ms.
        browser.waitUntil(
            ()=>this.recommendeditems.length>=1,{timeout:8000, timeoutMsg: 'Not enough items were loaded',interval:100}
        );

        //Ensure at least 10 items are loaded
        browser.waitUntil(
            ()=>this.ermittelte.length>=10,{timeout:8000, timeoutMsg: 'Not enough items were loaded in Ermittelte Tarif',interval:100}
        );
    }
    /**
    * a method to ensure all ermittelte traiffs have download speed more than given speedtocheck
    * @param speedCheck - speedCheck e.g 100
    */
    EnsureDataSpeedIsGreaterThanGiven(speedCheck){
        var tarifNumber=1;
        var isAllSpeedGreaterThanGiven=false;
        for(tarifNumber;tarifNumber<this.ermitteltedataspeed.length;tarifNumber++){
            var str=this.ermitteltedataspeed[tarifNumber].getText()
            var speed=parseInt(str.replace(".",""));
            if(!speed>=speedCheck)
            {
                return false;
            }
            isAllSpeedGreaterThanGiven=true;
            //expect(speed).toBeGreaterThan(99);
        }
        return isAllSpeedGreaterThanGiven;
    }
    GetNumberOFTariffs(){
        var tariffs=parseInt($('//h2[@class="summary-tariff"]').getText().match(/\d+/g).join(''));
        return tariffs;
    }
    GetNextPageTariffsFromWeiterButton(){
        var tariffs=parseInt(this.weiterbutton.getText().match(/\d+/g).join(''));
        return tariffs;

    }
    LoadNextTariffs(nextPageTariffs){
        if(this.weiterbutton.isDisplayed()){
            this.weiterbutton.scrollIntoView();
            this.weiterbutton.click();
            this.WaitUntilNextPageElementsAreLoaded(nextPageTariffs);
            return this.ermitteltedataspeed.length;
        }
    }
    WaitUntilNextPageElementsAreLoaded(nextPageTariffs){
        //Ensure items are loaded. Condition is evaluated every 100 ms
        browser.waitUntil(
            ()=>this.ermitteltedataspeed.length==nextPageTariffs,{timeout:25000, timeoutMsg: 'Not enough items were loaded in Ermittelte Tarif',interval:100}
        );
    }
}

module.exports = new DslCal();
