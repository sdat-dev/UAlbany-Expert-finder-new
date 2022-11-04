let scopus = require('../../JSONs/scopusDataforExpertFinder.json');
const tree3= require('../../JSONs/tree3.json');
const fs = require('fs');
const dataFile='../../JSONs/scopusExpertfinderstep1.json'

let finalData=[]

const formulaKeyscore=(abstract,keyword,priority)=>{
    let regexp = new RegExp(`${keyword}`, 'gi');
    let count = (abstract.match(regexp) || []).length;
    let score = (100 * (1 - (0.5) ** count)) / 0.5;
    if(priority!=null){
        return score*priority;
    }
    else{
        return score;
    }

}


const mapKeywordswithScore =(abstract,priority)=>{

    let keywithscore={};
    for(let [k,v] of Object.entries(tree3)){
        if(abstract.toLowerCase().includes(k.toLowerCase())){
                keywithscore[k]=formulaKeyscore(abstract.toLowerCase(),k.toLowerCase(),priority);
        }
    }
    return keywithscore;
}

let facNameAbs={}
for(let obj of scopus){
    if(facNameAbs[obj['UAuthors']]){
        let temp = facNameAbs[obj['UAuthors']];
        let newObj= { abstract:null, priority:null,keywordsWithScore:null }
        newObj.abstract=obj['abstract'];
        newObj.priority=obj['priority']?obj['priority']:1;
        newObj.keywordsWithScore=mapKeywordswithScore(obj['abstract'],obj['priority'])
        temp.push(newObj);
        facNameAbs[obj['UAuthors']]=temp;

    }else{
        let newObj= { abstract:null, priority:null,keywordsWithScore:null }
        newObj.abstract=obj['abstract'];
        newObj.priority=obj['priority']?obj['priority']:1;
        newObj.keywordsWithScore=mapKeywordswithScore(obj['abstract'])
        facNameAbs[obj['UAuthors']] = [newObj];
    }
}

//console.log( JSON.stringify( facNameAbs));
fs.writeFileSync(dataFile,JSON.stringify(facNameAbs));