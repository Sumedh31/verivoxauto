const api = require("../httputil/commonmethods");
const parser = require("../utils/parser");
const config = require("../httputil/config");
const citiesMap = {};
const citycodes=["10409","77716"];
const cities=[];
const _headers = {
  "Content-Type": "application/json"
}
const umlautMap = {
    '\u00dc': 'UE',
    '\u00c4': 'AE',
    '\u00d6': 'OE',
    '\u00fc': 'ue',
    '\u00e4': 'ae',
    '\u00f6': 'oe',
    '\u00df': 'ss',
  }
class Parser{
    async GetCities(citycode){
      var i=0;
      for(i;i<citycodes,length;i++){
        var url="https://service.verivox.de/geo/latestv2/cities/"+citycode;
        var res=await api.GET(url, _headers);
        return res.body.Cities;
      }

    }

    replaceUmlaute(str) {
        return str
          .replace(/[\u00dc|\u00c4|\u00d6][a-z]/g, (a) => {
            const big = umlautMap[a.slice(0, 1)];
            return big.charAt(0) + big.charAt(1).toLowerCase() + a.slice(1);
          })
          .replace(new RegExp('['+Object.keys(umlautMap).join('|')+']',"g"),
            (a) => umlautMap[a]
          );
      }
    RemoveUmlautAndSpecials(Streets){
        var ConvertedStreets=[];
        Streets.forEach((str) =>  {
          str=str.replace(/[.-]/g, '');
          ConvertedStreets.push(this.replaceUmlaute(str))});
        return ConvertedStreets;
    }
    EnsureExistanceOFUmlautAndSpecials(str,StreetNameInGermanicLetter,StreetNameConverted){
        if(StreetNameConverted.includes(str) && !StreetNameInGermanicLetter.includes(str))
        {
            return false;
        }
        else{
            return true;
        }

    }
    
}
module.exports=new Parser();