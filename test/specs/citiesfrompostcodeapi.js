const api = require("../httputil/commonmethods");
const expect = require("chai").expect;
const chance = require("chance");
const addContext = require('mochawesome/addContext');

const baseUrl = "https://service.verivox.de/geo/latestv2/cities/";
const citycode10409 =baseUrl+"10409";
const citycode77716 =baseUrl+"77716";
const citiesin10409 =["Berlin"];
const citiesin77716 =["Fischerbach","Haslach","Hofstetten"];


var _id, _res;

const _headers = {
    "Content-Type": "application/json"
}
var _body = {
    
};

describe('Ensure 10409 post code returns single city', function () {
    var res;
    var entries;
    
    it('verify OK status', async function () {
        
        res = await api.GET(citycode10409, _headers);
        addContext(this, 'Response: ' + JSON.stringify(res.body));
        entries=res.body.Cities.length
        expect(res.statusCode, 'status not OK').to.equal(200);
        expect(JSON.stringify(res.body), "ERROR is detected in response").not.contains("error");
    });

    it('verify city is returned', function () {
        //expect(res.body.Cities[0]);
        //expect(res.body.Cities[0].toString()).to.equal("Berlin"); 
        for(i=0;i<entries;i++){
            expect(typeof res.body.Cities[i]).to.equal("string");
            expect(res.body.Cities[i].toString()).to.equal(citiesin10409[i]); 
        }
            
        
    });
});
describe('Ensure 77716 post code returns multiple cities', function () {
    var res;
    var entries;
    
    it('verify OK status', async function () {
        
        res = await api.GET(citycode77716, _headers);
        addContext(this, 'Response: ' + JSON.stringify(res.body));
        entries=res.body.Cities.length
        expect(res.statusCode, 'status not OK').to.equal(200);
        expect(JSON.stringify(res.body), "ERROR is detected in response").not.contains("error");
    });

    it('verify city is returned', function () {
        //Ensure response matches the expected cities 
        for(i=0;i<entries;i++){
            expect(typeof res.body.Cities[i]).to.equal("string");
            expect(res.body.Cities[i].toString()).to.equal(citiesin77716[i]); 
        }           
        
    });
});