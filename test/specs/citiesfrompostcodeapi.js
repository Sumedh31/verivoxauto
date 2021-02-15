const api = require("../httputil/commonmethods");
const expect = require("chai").expect;
const chance = require("chance");
const addContext = require('mochawesome/addContext');

const baseUrl = "https://service.verivox.de/geo/latestv2/cities/";
const cities = {
    'https://service.verivox.de/geo/latestv2/cities/10409': ["Berlin"],
    'https://service.verivox.de/geo/latestv2/cities/77716': ["Fischerbach","Haslach","Hofstetten"]
  }

  const _headers = {
    "Content-Type": "application/json"
}

describe('Ensure 10409 and 77716 post codes returns respective cities', function () {
        
    it('Ensure that each city returned for given post code is in string form. Ensure each post code returns correct cities', async function () {        
        
        Object.keys(cities).forEach(async k => {
            console.log(k);
            var res = await api.GET(k, _headers);
            //console.log(res);
            addContext(this, 'Response: ' + JSON.stringify(res.body));
            var entries=res.body.Cities.length;            
            expect(res.statusCode, 'status not OK').to.equal(200);
            expect(JSON.stringify(res.body), "ERROR is detected in response").not.contains("error");
            //Ensure Cities contain arrays with Strings and has expected cities
            var i=0;
            for(i=0;i<entries;i++){
                expect(typeof res.body.Cities[i]).to.equal("string");
                expect(res.body.Cities[i].toString()).to.equal(cities[k][i]); 
            }            
          }); 
    });
});