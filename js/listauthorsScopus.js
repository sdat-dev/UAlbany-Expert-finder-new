const fs = require('fs');
let xlsx = require('node-xlsx');
let file = xlsx.parse('../data/scopus_author_replaced.csv');
let web_scopus_data = require('../JSONs/scopus_wos_clean.json');
let JSONStream = require( "JSONStream" );
let datapart = (file[0].data);


function convertToJSON(array) {
  let first = array[0].join()
  let headers = first.split(',');

  let jsonData = [];
  for (let i = 1, length = array.length; i < length; i++) {

    let myRow = array[i].join();
    let row = myRow.split(',');

    let data = {};
    for (let x = 0; x < row.length; x++) {
      data[headers[x]] = row[x];
    }
    jsonData.push(data);

  }
  return jsonData;
};

let jsondata = convertToJSON(datapart);

let authIdName = {};
//obj['Author.Name']
for (let obj of jsondata) {

  authIdName[obj['Auth.ID']] = obj['Author.Name'];

}

const mapData = (obj, name, id,priority) => {
  let newObj = {
    // "year":null,
    // "DOI": null, 
    // "Authors": null,
    "UAuthors":null,
    // "Author Full Names_wos": null,
    // "Correspondence.Address":null,
    // "Addresses_wos":null,
    // "Authors.with.affiliations": null,
    // "Affiliations_wos": null,
    // "title":null,
    // "source.title":null,
    //  "Author.s..ID": null, "abstract": null,
    //  "subject.area":null,
    //  "author.keywords": null, 
    //  "document.type":null,
    //  "cited.by":null,
    //  "funding.details": null,
    //  "conference.name": null,
    //  "conference.date": null,
     abstract:null,
     priority:null
  }
// "Author.s..ID.1": null ,  "Addresses_wos": null,

  // newObj.DOI = obj['DOI'];
  // newObj.year = obj['year']
  // newObj.Authors = obj['Authors'];
  newObj.UAuthors=name;
  // newObj['Author Full Names_wos']=obj['Author Full Names_wos'];
  // newObj['Correspondence.Address']=obj['Correspondence.Address'];
  // newObj.Addresses_wos = obj['Addresses_wos'];
  // newObj['Authors.with.affiliations'] = obj['Authors.with.affiliations'];
  // newObj.Affiliations_wos = obj['Affiliations_wos'];
  // newObj.title = obj['title']
  // newObj['source.title']=obj['source.title'];
  // newObj['Author.s..ID'] = id;
  // newObj['subject.area']=obj['subject.area'];
 // newObj['author.keywords'] = obj['author.keywords'];
  // newObj['document.type']=obj['document.type'];
  // newObj['cited.by']=obj["cited.by"];
  // newObj["funding.details"]=obj["funding.details"];
  // newObj["conference.name"] = obj["conference.name"];
  // newObj['conference.date']=obj["conference.date"];
  newObj.abstract = obj['abstract'];
  newObj.priority=priority;
  return newObj;

}

let uAlbanyFacData = [];
for (let obj of web_scopus_data) {

  let authIds = obj['Author.s..ID'].split(";").map(e => e.trim()).filter(e => e != "")
  for (let id of authIds) {
    if (authIdName[id]) {
      let priority=1;
      if(authIds.indexOf(id)===0){
        priority=3;
      }
      else if(authIds.indexOf(id)===authIds.length-1){
        priority=2;
      }
      let ualbAuthor = mapData(obj, authIdName[id],id,priority);
      uAlbanyFacData.push(ualbAuthor);
    }
  }

}

console.log(uAlbanyFacData.length);

let transformStream = JSONStream.stringify();
let outputStream = fs.createWriteStream("../JSONs/scopusDataforExpertFinder.json");
transformStream.pipe( outputStream ); 
uAlbanyFacData.forEach(transformStream.write);
transformStream.end();
outputStream.on(
  "finish",
  function handleFinish() {
      console.log("Done");
  }
);

//fs.writeFileSync("../JSONs/UalbanyScopusFacData.json", JSON.stringify(uAlbanyFacData));