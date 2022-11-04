const webScopusData = require('../JSONs/wos_scopus_data.json')
const fs = require('fs');
const nameMapperPath = '../JSONs/namesMapper.json'

const removeDuplicates = (arr) => {
    let uniq = arr.reduce(function (a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
    }, []);

    return uniq;
}


let c = 0;
let newData = [];
let errcnt=0;
let Authnames = {};
for (let obj of webScopusData) {

    obj['Authors'] = obj['Authors'].split(',').map(e => e.trim());
    obj['Author Full Names_wos'] = obj['Author Full Names_wos'].split(';').map(e => e.trim());

    // console.log(obj);

    if (obj['Authors'].length === obj['Author Full Names_wos'].length)  //if length is same
    {

        for (let i in obj['Authors']) {

            if (Authnames[obj['Authors'][i]]) { //if scopus auth record already exists
                let temp = Authnames[obj['Authors'][i]];
                //here "null" is used to fill empty data fields from Li
                if (obj['Author Full Names_wos'][i] && obj['Author Full Names_wos'][i] != 'null') {  //if wos auth exists push to array
                    temp.push(obj['Author Full Names_wos'][i])
                }
                Authnames[obj['Authors'][i]] = temp;
            }
            else {  //initial case
                if (obj['Authors'][i] != 'null') {  //initially when data is not empty or null

                    if (obj['Author Full Names_wos'][i] && obj['Author Full Names_wos'][i] != 'null') { //if wos author exists add wos auth and scopus auth
                        Authnames[obj['Authors'][i]] = [obj['Author Full Names_wos'][i], obj['Authors'][i]];
                    }
                    else {
                        Authnames[obj['Authors'][i]] = [obj['Authors'][i]];  //when no wos auth just add scopus author
                    }
                }
            }
        }
    }
    else{
        errcnt+=1;
        if(obj['Authors'].length <10 && obj['Author Full Names_wos']!='null'){
        console.log(obj['DOI']);
        console.log(obj['Authors']);
      console.log(obj['Author Full Names_wos']);
        }
    }
    // c+=1;
    // if(c==2000){
    //     break;
    // }
}

for (let [key, val] of Object.entries(Authnames)) {
    Authnames[key] = removeDuplicates(val);
}

//console.log(Authnames);

fs.writeFileSync(nameMapperPath, JSON.stringify(Authnames));

console.log(errcnt);

