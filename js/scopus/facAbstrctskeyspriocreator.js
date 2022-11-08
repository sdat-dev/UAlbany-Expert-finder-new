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
        let matchIndex=abstract.toLowerCase().indexOf(k.toLowerCase());
        if(matchIndex!=-1 && (abstract.charAt(matchIndex-1) ===' ' && abstract.charAt(matchIndex+(k.length)) ===' ') ){
            //console.log(abstract.toLowerCase().indexOf(k.toLowerCase()), 'INDEX');
          //  console.log(abstract);
         //   let ind= parseInt( abstract.toLowerCase().indexOf(k.toLowerCase()));
          // console.log(abstract.charAt(ind-2),abstract.charAt(ind-1), "--",abstract.charAt(ind+(k.length)+1),abstract.charAt(ind+(k.length)+2));
                keywithscore[k]=formulaKeyscore(abstract.toLowerCase(),k.toLowerCase(),priority);
        }
    }
    return keywithscore;
}

let facNameAbs={}
let c=0;
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
    // c+=1;
    // if(c==200){
    //     break;
    // }
}

//console.log( JSON.stringify( facNameAbs));
fs.writeFileSync(dataFile,JSON.stringify(facNameAbs));