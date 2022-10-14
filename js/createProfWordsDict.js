const fs= require('fs');
const profScoredataPath= '../JSONs/ProfnameTFIDFscore.json';
const profData = '../JSONs/PI_Abstract.json';
const natural = require('natural')
const TfIdf = natural.TfIdf;

let scoreDict=new Object();
let mySet = new Set();
let noOfKeywords = 50;
let file = fs.readFileSync(profData);
let data= JSON.parse(file);
// console.log(data);
function populateSet() {
    mySet.add("research");
    mySet.add("grants");
    mySet.add("synopsis");
    mySet.add("purpose");
    mySet.add("funding");
    mySet.add("opportunity");
    mySet.add("announcement");
    mySet.add("foa");
    mySet.add("https");
    mySet.add("available");
    mySet.add("funds");
    mySet.add("related");
    mySet.add("specific");
    mySet.add("among");
    mySet.add("data");
    mySet.add("new");
    mySet.add("award");
    mySet.add("grant");
    mySet.add("small");
    mySet.add("basic");
    mySet.add("may");
    mySet.add("include");
    mySet.add("better");
    mySet.add("not");
    mySet.add("studies");
    mySet.add("goal");
    mySet.add("within");
    mySet.add("id");
    mySet.add("programurl");
    mySet.add("prog_title");
    mySet.add("will");
    mySet.add("centers");
    mySet.add("including");
    mySet.add("allowed");
    mySet.add("www");
    mySet.add("understanding");
    mySet.add("use");
    mySet.add("institute");
    mySet.add("institutes");
    mySet.add("html");
    mySet.add("directly");
    mySet.add("awards");
    mySet.add("program");
    mySet.add("programs");
    mySet.add("agency");
    mySet.add("co");
    mySet.add("study");
    mySet.add("notice");
    mySet.add("proposals");
    mySet.add("dm");
    mySet.add("programs");
    mySet.add("cf");
    mySet.add("org");
    mySet.add("cftr");
}

async function main(){
    populateSet();
    
    for(let [key,val] of Object.entries( data)){
        console.log(key);
        var dictVal = getScoreFromJson(JSON.stringify(val),noOfKeywords);
        scoreDict[key] = dictVal;
    }
    
    fs.writeFileSync(profScoredataPath,JSON.stringify(scoreDict));    
}

function getScoreFromJson(file,noOfKeywords){
    let dict = new Object();
    const tfidf = new TfIdf();
    tfidf.addDocument(file);
    tfidf.listTerms(0 /*document index*/).every(function(item) {
        if(noOfKeywords<=0){
            return false;
        }
        let isnum = /^\d+$/.test(item.term);
        if(!isnum && !mySet.has(item.term)){
            dict[item.term] = item.tfidf.toFixed(3);
            noOfKeywords--;
            // console.log(item.term + ': ' + item.tfidf);
        }
        return true;
    });
    // console.log(dict);
    return dict;
}



main()