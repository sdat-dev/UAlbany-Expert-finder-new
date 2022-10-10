// import tree3 from '../JSONs/tree3.json' 
// import facultyAbstracts from '../JSONs/PI_Abstract.json'

const tree3 = require('../JSONs/tree3.json');
const facultyAbstracts = require('../JSONs/PI_Abstract.json')
const fs= require('fs');
let keyFacPath='../JSONs/keyFacMapper.json';

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

module.exports=keyFacMapper;