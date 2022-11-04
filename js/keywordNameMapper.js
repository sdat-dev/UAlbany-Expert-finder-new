// import tree3 from '../JSONs/tree3.json' 
// import facultyAbstracts from '../JSONs/PI_Abstract.json'

const tree3 = require('../JSONs/tree3.json');
const facultyAbstracts = require('../JSONs/PI_Abstract.json')
const fs= require('fs');
let keyFacPath='../JSONs/keyFacMapper.json';
let webFacKeyMApperPath= '../JSONs/webFacMapper.json';
const webScienceData = require('../JSONs/claveriteFormated.json');

let keyFacMapper={};
for(let [k,v] of Object.entries(tree3)){

    for(let [fk,fv] of Object.entries(facultyAbstracts)){
        if(fv.toLowerCase().includes(k.toLowerCase())){
            if(keyFacMapper[k]){
                let t=[];
                t=keyFacMapper[k];
                t.push(fk);
                keyFacMapper[k]=t;
            }
            else{
            keyFacMapper[k]=[fk];
        }}
    }
    
}

// console.log(keyFacMapper);
fs.writeFileSync(keyFacPath,JSON.stringify(keyFacMapper));

let webFacMapper = {}
for(let [k,v] of Object.entries( webScienceData)){
    let temp=[];
    for(let obj of v){// for each
        let newObj= {skeywords:[],priority:null ,abstract:null,keywords:[]}; 
        for(let [spkey,sval] of Object.entries(tree3)){
            if(obj['abstract'].toLowerCase().includes(spkey.toLowerCase())){
                newObj.skeywords.push(spkey);
            }
        }
        newObj.priority = obj['priority'];
        newObj.abstract = obj['abstract'];
        newObj.keywords = obj['keywords'];
        temp.push(newObj);
    }
    webFacMapper[k]=temp;
}


// console.log( JSON.stringify( webFacMapper));
fs.writeFileSync(webFacKeyMApperPath,JSON.stringify(webFacMapper))

module.exports=keyFacMapper;