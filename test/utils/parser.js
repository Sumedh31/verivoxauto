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
    ConvertToNonWestern(Streets){
        var ConvertedStreets=[];
        Streets.forEach((str) =>  ConvertedStreets.push(this.replaceUmlaute(str)));
        return ConvertedStreets;
    }
    EnsureExistanceOFGermanCharacter(str,StreetNameInGermanicLetter,StreetNameConverted){
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