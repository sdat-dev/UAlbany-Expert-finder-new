
const fs = require('fs');
let xlsx = require('node-xlsx');
let file = xlsx.parse('../../data/UAlbany Faculty List (HERD).csv');
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

  console.log(JSON.stringify(jsondata));