let outputFilePath = '../JSONs/keyFacScoreMapper.json';
const fs = require('fs')
const keyFacData = require('../JSONs/webScienceFacScore.json');

//this file will assign faculty to the keyword
//as keyword as key and val will be faculties with scores for that keyword

// {"keyword":"Visualization","score":200,"facName":"Martin, Erika G."}

const checkIfFacAlredyinThatKeyword = (temp,obj)=>{
let flag=0;
    let newVal = temp.map(facObj=>{
        if(facObj['faculty']===obj['facName']){
            facObj['score']+=obj['score'];
            flag=1;
            return facObj;
        }
        else{
            return facObj;
        }
    })
  return {newVal,flag:flag};
}

const ArrangeKeyswithFacandScoreAsvalue = (keyFacData) => {
    let keyWordFacScoreVal = {};
   
    for (let obj of keyFacData.scores) {
       
        if (keyWordFacScoreVal[obj.keyword]) {
            
            let temp= keyWordFacScoreVal[obj.keyword];
            
           let addedFacVal= checkIfFacAlredyinThatKeyword(temp,obj);
            temp=addedFacVal.newVal;
           if(addedFacVal.flag!=1){
           
            let newObj = { faculty: null, score: null };
            newObj.faculty=obj['facName'];
            newObj.score=obj['score'];
            temp.push(newObj);
           }
           keyWordFacScoreVal[obj.keyword]=temp;

        }
        else {
            let newObj = { faculty: null, score: null };
            newObj.faculty = obj.facName;
            newObj.score = obj.score;
            keyWordFacScoreVal[obj.keyword] = [newObj];
        }
    }

    return keyWordFacScoreVal;
}


let keyWordFacScoreVal= ArrangeKeyswithFacandScoreAsvalue(keyFacData);
fs.writeFileSync(outputFilePath,JSON.stringify(keyWordFacScoreVal));

