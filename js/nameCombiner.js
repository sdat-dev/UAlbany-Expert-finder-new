let wos_scopus_data = require('../JSONs/wos_scopus_ids.json')
const fs = require('fs');
const nameMapperPath = '../JSONs/scopusNames.json'

const removeDuplicates = (arr) => {
    let uniq = arr.reduce(function (a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
    }, []);

    return uniq;
}

let c=0;
let idnameMapper={};
let sd=[];
for(let obj of wos_scopus_data){
    // console.log(obj);
    sd.push(obj);
  //  console.log(obj['Authors'].trim());
 //   console.log(obj['Author.s..ID'].trim());
    let scopusAuthors = obj['Authors'].split(',').map(e=>e.trim());
   let scopusAuthorIds = obj['Author.s..ID'].split(';').map(e=>e.trim()).filter(e=>e!="")
  // console.log(obj['Authors'],scopusAuthors, scopusAuthors.length);
   //console.log(obj['Author.s..ID'],scopusAuthorIds, scopusAuthorIds.length)

   for(let id in scopusAuthorIds){
        if(idnameMapper[scopusAuthorIds[id]]){
            let temp=idnameMapper[scopusAuthorIds[id]];
            temp.push(scopusAuthors[id])
            idnameMapper[scopusAuthorIds[id]]=temp;
        }
            else{
                idnameMapper[scopusAuthorIds[id]]=[scopusAuthors[id]];
            }
       
   }
c+=1;
if(c==10){
    break;
}
}



for (let [key, val] of Object.entries(idnameMapper)) {
    idnameMapper[key] = removeDuplicates(val);
}

// console.log(JSON.stringify(sd));

fs.writeFileSync(nameMapperPath, JSON.stringify(idnameMapper));

//console.log(idnameMapper);


