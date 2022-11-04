const fs = require('fs');
const claveriteJsonFilepath = '../../../Git/University at Albany - SUNY/Script Repository - Documents/clarivate-full.json'
let webhubPath= '../JSONs/claveriteFormated.json';

let clavData = JSON.parse(fs.readFileSync(claveriteJsonFilepath));


// console.log(clavData);

const getPriority = (name, nameArr) => {

    let l = nameArr.length;
    let nameInd = nameArr.indexOf(name);
    if (nameInd == 0) {
        return 3;
    }
    else if (nameInd == l - 1) {
        return 2;
    }
    else {
        return 1;
    }
}

const getKeyWords = (authKeys, keysPlus) => {
    let temp = [];

    if (authKeys != "") {

        temp = temp.concat(authKeys.split(";").map(e => e.trim()));
    }
    if (keysPlus != "") {
        temp = temp.concat(keysPlus.split(";").map(e => e.trim()));
    }
    // console.log(temp);
    if (temp.length > 0) {
        return temp;
    }
    else {
        return [];
    }
}



let formattedClavJson = {};

let c=0;
for (let record of clavData.savedrecs) {

    // c+=1;
    let authors = record["Author Full Names"].split(";").map(e => e.trim());

    for (let author of authors) {
        if (formattedClavJson[author]) {

            let temp = formattedClavJson[author];
            let profObj = {
                abstract: null,
                keywords: null,
                priority: null
            }
            //do priority based on position in name arr
            profObj.priority = getPriority(author, authors);
            //get Abstract
            profObj.abstract = record['Abstract'];
            //get keywords from Author Keywords, Keywords Plus
            profObj.keywords = getKeyWords(record["Author Keywords"], record["Keywords Plus"]);

            temp.push(profObj);
            formattedClavJson[author]=temp;

        }
        else {
            let profObj = {
                abstract: null,
                keywords: null,
                priority: null
            }

            //do priority based on position in name arr
            profObj.priority = getPriority(author, authors);

            //get Abstract
            profObj.abstract = record['Abstract'];


            //get keywords from Author Keywords, Keywords Plus
            profObj.keywords = getKeyWords(record["Author Keywords"], record["Keywords Plus"]);


            formattedClavJson[author] = [profObj];
        }
    }
    // if(c==2000){
    //     break;
    // }
}

// console.log(JSON.stringify(formattedClavJson));


fs.writeFileSync(webhubPath,JSON.stringify(formattedClavJson))