const facNkeyData = require('../../JSONs/scopusExpertfinderPIKeys.json');
const fs = require('fs');

const  convertToKeysNFaculty=()=>{

 
    let keyNFac={};
 
    for(let [k,v] of Object.entries( facNkeyData)){

        for(let [keyword,score] of Object.entries(v)){
            if(keyNFac[keyword]){  //if key already exist

                let exstData = keyNFac[keyword];

                if(exstData[k]){  //if fac in obj, add their score
                    let cscore=exstData[k]
                    cscore += score;
                    exstData[k] = cscore; 
                }
                else{
                    exstData[k]=score;  //if facno in obj add them
                }

            }
            else{  //if keyword not exist
                let newobj = {};
                newobj[k]=score;
                keyNFac[keyword] = newobj;
            }
        }

      
    }



    // console.log(keyNFac);
    let sortedScores={};
for( let [name,obj] of Object.entries(keyNFac)){
    
    const sorted = Object.entries(obj).sort(([,a],[,b])=>b-a)
                                        .reduce((r,[k,v])=>({...r,[k]:v}),{})
    sortedScores[name] = sorted;
}

// console.log(sortedScores);
    fs.writeFileSync('../../JSONs/expertfinderSearchKey.json',JSON.stringify(sortedScores))

}

convertToKeysNFaculty()