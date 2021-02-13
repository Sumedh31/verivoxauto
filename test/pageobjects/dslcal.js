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
    

    /**
     * a method to navigate to dsl calculator
     */
    NavigateToDSlCalCulator(){
        browser.url('https://www.verivox.de/dsl-vergleich/');
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
        this.recommended.waitForExist({ timeout:5000, interval:100 });

        //Ensure at least single item is loaded in verivox recommendation before continuing
        browser.waitUntil(
            ()=>this.recommendeditems.length>=1,{timeout:5000, timeoutMsg: 'Not enough items were loaded'}
        );

        //Ensure at least 10 items are loaded
        browser.waitUntil(
            ()=>this.ermittelte.length>=10,{timeout:5000, timeoutMsg: 'Not enough items were loaded in Ermittelte Tarif'}
        );
        

    }
}

module.exports = new DslCal();
