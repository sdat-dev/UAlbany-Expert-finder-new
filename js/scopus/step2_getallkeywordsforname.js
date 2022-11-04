const fs = require('fs')
const scopustep1data = require('../../JSONs/scopusExpertfinderstep1.json');
let dataPath = '../../JSONs/scopusExpertfinderPIKeys.json'
let facKeywords={}
for(let [k,v] of Object.entries(scopustep1data)){

    let temp=[];
    for(let obj of v){
        for(let [key,val] of Object.entries( obj['keywordsWithScore'] )){
            let newObj = {};
            newObj[key]=val;
            temp.push(newObj);
        }
    }
    facKeywords[k]=temp;

}


//console.log(JSON.stringify(facKeywords));

let keystemp={};
for(let [k,v] of Object.entries(facKeywords)){

    
    let unqKeys={};
    for(let keyword of v){
        let skey=Object.keys(keyword)[0];
        let skeyVal = Object.values(keyword)[0]
        if(unqKeys[skey]){
            let sum=unqKeys[skey];
            sum+=skeyVal;
            unqKeys[skey]=sum;
        }
        else{
            unqKeys[skey]=skeyVal;
        }
    }
  
    keystemp[k]=unqKeys


}

// console.log( JSON.stringify(keystemp));


//sort based on score
let sortedScores={}
for( let [name,obj] of Object.entries(keystemp)){
    
    const sorted = Object.entries(obj).sort(([,a],[,b])=>b-a)
                                        .reduce((r,[k,v])=>({...r,[k]:v}),{})
    sortedScores[name] = sorted;
}

// console.log(JSON.stringify(sortedScores));

fs.writeFileSync(dataPath,JSON.stringify(sortedScores))