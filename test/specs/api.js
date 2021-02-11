const api = require("../httputil/commonmethods");
const expect = require("chai").expect;
const chance = require("chance");
const addContext = require('mochawesome/addContext');

const baseUrl = "https://service.verivox.de/geo/latestv2/cities/";
const citycode1=baseUrl+"10409"
const citycode2="/77716"


var _id, _res;

const _headers = {
    "Content-Type": "application/json"
}
var _body = {
    
};

describe('Ensure valid post code returns at least single city', function () {
    var res;
    var entries
    console.log(citycode1)
    it('verify OK status', async function () {
        
        res = await api.GET(citycode1, _headers);
        addContext(this, 'Response: ' + JSON.stringify(res.body));
        entries=res.body.Cities.length
        expect(res.statusCode, 'status not OK').to.equal(200);
        expect(JSON.stringify(res.body), "ERROR is detected in response").not.contains("error");
    });

    it('verify the content', function () {
        //expect(res.body.Cities[0]);
        expect(typeof res.body.Cities[0]).to.equal("string");
        expect(res.body.Cities[0].toString()).to.equal("Berlin");      
        
    });
});