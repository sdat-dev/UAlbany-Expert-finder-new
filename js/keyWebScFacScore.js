const fs = require('fs');

const facKeyMapData = require('../JSONs/webFacMapper.json');
const facWithScoreWebofSciencePath = '../JSONs/webScienceFacScore.json';

//this file will convert webscience data to facname score and spinkeyword. includes priority score as well


const getKeyOccurances = (keyword, abstract, priority) => {

    let regexp = new RegExp(`${keyword.toLowerCase()}`, 'gi');
    let count = (abstract.toLowerCase().match(regexp) || []).length;
    let score = (100 * (1 - (0.5) ** count)) / 0.5;
    score = score * priority;

    return score;
}

let temp = [];
let c = 0;


for (let [k, v] of Object.entries(facKeyMapData)) {
    console.log(k, "-", v);
    for (let obj of v) {
        if (obj['abstract'] != '') {
           
            for (let keywrd of obj['skeywords']) {
                let newObj = { keyword: null, score: null, facName: null };
                console.log(keywrd, "----------KEYWRD");
                let score = getKeyOccurances(keywrd, obj['abstract'], obj['priority']);
                newObj.keyword = keywrd;
                newObj.score = score;
                newObj.facName = k;
                temp.push(newObj);
                console.log(temp);
            }
        }
       
    }



    // c += 1;
    // if (c == 1) {
    //     break;
    // }
}

let facwithKeysScore = {scores:temp };

fs.writeFileSync(facWithScoreWebofSciencePath, JSON.stringify(facwithKeysScore));
