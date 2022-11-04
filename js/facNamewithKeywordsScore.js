
//this file generates facnmae as key and keywords for that faculty as values with score
//below is the input format from keyFacData
// {"keyword":"Visualization","score":200,"facName":"Martin, Erika G."}
let outputFilePath = '../JSONs/FacultyKeyWordsScore.json';
const fs = require('fs')
const keyFacData = require('../JSONs/webScienceFacScore.json');



const checkIfFacAlredyinThatKeyword = (temp,obj)=>{
let flag=0;
    let newVal = temp.map(facObj=>{
        if(facObj['keyword']===obj['keyword']){
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
       
        if (keyWordFacScoreVal[obj.facName]) {
            
            let temp= keyWordFacScoreVal[obj.facName];
            
           let addedFacVal= checkIfFacAlredyinThatKeyword(temp,obj);
            temp=addedFacVal.newVal;
           if(addedFacVal.flag!=1){
           
            let newObj = { keyword: null, score: null };
            newObj.keyword=obj['keyword'];
            newObj.score=obj['score'];
            temp.push(newObj);
           }
           keyWordFacScoreVal[obj.facName]=temp;

        }
        else {
            let newObj = { keyword: null, score: null };
            newObj.keyword = obj.keyword;
            newObj.score = obj.score;
            keyWordFacScoreVal[obj.facName] = [newObj];
        }
    }

    return keyWordFacScoreVal;
}


let facWithKeywOrdscore= ArrangeKeyswithFacandScoreAsvalue(keyFacData);
fs.writeFileSync(outputFilePath,JSON.stringify(facWithKeywOrdscore));

