const api = require("../httputil/commonmethods");
const expect = require("chai").expect;
const parser = require("../utils/parser");
const chance = require("chance");
const config = require("../httputil/config");
const addContext = require('mochawesome/addContext');


const baseUrl = "https://service.verivox.de/geo/latestv2/cities/";
const postcodes=["10409","77716"]

const _headers = {
    "Content-Type": "application/json"
}

describe('Ensure 10409 and 77716 postcode returns respective cities and streets from those cities are correct', function () {
    it('Get Cities and iterate those cities. For each of the city get Streets and ensure street name is string and it retains umlaut character ', async function () {
        var citiesreturned;
        var streets;
        //Get Cities returned for each code from postcode array ["10409","77716"]
        postcodes.forEach(async code=>{
            citiesreturned=parser.GetCities(code);
            var i=0;
            //Iterate over each cities returned for the given post code
            for(i;i<citiesreturned.length;i++){
                var currentcity=citiesreturned[i]
                var streetcityurl=baseUrl+code+"/"+currentcity+"/streets";
                res = await api.GET(streetcityurl, _headers);
                addContext(this, 'Response: ' + JSON.stringify(res.body));
                console.log("Verify status code");
                expect(res.statusCode, 'status not OK').to.equal(200);
                expect(JSON.stringify(res.body), "ERROR is detected in response").contains("Streets");
                expect(JSON.stringify(res.body), "ERROR is detected in response").not.contains("error");    
                streets=res.body.Streets;
                //Iterate over each street returned
                streets.forEach(street=>{
                        expect(typeof street).to.equal("string");
                        expect(config.currentcity.includes(street)).to.be.true;
                        expect(parser.EnsureExistanceOFGermanCharacter(street,config.currentcity,parser.ConvertToNonWestern(currentcity))).to.be.true;
                    }                   
        
                );
            }    
        });
    });       

});