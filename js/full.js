let wofs_scopus = require('./log')
console.log(wofs_scopus);
//import wofs_scopus from '../JSONs/wofs_scopus.json' assert {type: 'json'};

let count=0;
for(let obj of wofs_scopus){
    console.log(obj);
    count+=1
    if(count == 10){
    break;}
}