const api = require("../httputil/commonmethods");
const expect = require("chai").expect;
const parser = require("../utils/parser");
const chance = require("chance");
const config = require("../httputil/config");
const addContext = require('mochawesome/addContext');


const baseUrl = "https://service.verivox.de/geo/latestv2/cities/";
const berlin =baseUrl+"10409/Berlin/streets";
const berlinstreets=config.BerlinStreets;
const berlinstreetsWithoutUmlauts=parser.ConvertToNonWestern(berlinstreets);

const _headers = {
    "Content-Type": "application/json"
}
var _body = {
    
};

describe('Ensure 10409 post code returns single city', function () {
    var res;
    var entries;
    
    it('verify OK status', async function () {
        
        res = await api.GET(berlin, _headers);
        addContext(this, 'Response: ' + JSON.stringify(res.body));
        entries=res.body.Streets.length
        expect(res.statusCode, 'status not OK').to.equal(200);
        expect(JSON.stringify(res.body), "ERROR is detected in response").contains("Streets");
        expect(JSON.stringify(res.body), "ERROR is detected in response").not.contains("error");
    });

    it('verify city is returned', function () {
        for(i=0;i<entries;i++){
            expect(typeof res.body.Streets[i]).to.equal("string");
            expect(berlinstreets.includes(res.body.Streets[i])).to.be.true; 
        }
    });
    it('Verify cities maintain Germanic character', function () {
        for(i=0;i<entries;i++){
            expect(typeof res.body.Streets[i]).to.equal("string");
            expect(parser.EnsureExistanceOFGermanCharacter(res.body.Streets[i],berlinstreets,berlinstreetsWithoutUmlauts)).to.be.true;
            //expect(berlinstreets.includes(res.body.Streets[i])).to.be.true; 
        }
    });
});