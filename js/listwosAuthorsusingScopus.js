// {"year":"1997","DOI":"10.1002/(sici)1099-1727(199722)13:2<107::aid-sdr120>3.0.co;2-7",
// "Authors":"Andersen D.F., Richardson G.P.",
// "UAuthors":"Andersen David F.",
// "Author Full Names_wos":"null",
// "Correspondence.Address":"Andersen, D.F.; Nelson A. Rockefeller Coll. Pub. A., , Albany, NY 12222, United States",
// "Addresses_wos":"null",
// "Authors.with.affiliations":"Andersen, D.F., Nelson A. Rockefeller Coll. Pub. A., University at Albany, State University of New York, Albany, NY 12222, United States, Dept. Pub. Admin., Pub. Plcy., I., University at Albany, State University of New York, United States, Dartmouth College, United States, Massachusetts Institute, Technology's Sloan School, United States; Richardson, G.P., Nelson A. Rockefeller Coll. Pub. A., University at Albany, State University of New York, Albany, NY 12222, United States, Rockefeller Coll. Pub. Aff. Plcy., State University of New York, Albany, NY, United States",
// "Affiliations_wos":"null",
// "title":"Scripts for group model building",
// "source.title":"System Dynamics Review",
// "Author.s..ID":"57210522273",
// "abstract":"Building models directly with client groups has become increasingly common in the field of system dynamics. For the past nine years, the modeling group at the University at Albany has been experimenting with techniques handling the complex modeling and facilitation processes involved in group work. This article extends the previously reported work by discussing specific scripted techniques used to implement the group modeling building approach. The authors' purpose is to initiate a larger discussion of shared scripts and techniques for group model building. The discussion is divided into planning for a group model building conference, scheduling the day, particular scripts and techniques for various group model building tasks, and closing a group modeling conference. © 1997 by John Wiley & Sons, Ltd.","subject.area":"Social Sciences","author.keywords":"null","document.type":"Article","cited.by":"302","funding.details":"null","conference.name":"null","conference.date":"null"}

const StreamArray = require('stream-json/streamers/StreamArray');
const { Writable } = require('stream');
const fs = require('fs');
const stringSimilarity = require("string-similarity");
let JSONStream = require("JSONStream");

//const scopusAuthorsData = require('../JSONs/UalbanyScopusFacData.json');




const fileStream = fs.createReadStream('../JSONs/UalbanyScopusFacData.json');
const jsonStream = StreamArray.withParser();


let newWosName = [];

const readData = async () => {

    const processingStream = new Writable({
        write({ key, value }, encoding, callback) {

            //some async operations

            //console.log(value);
            let newVal = { ...value, UwosAuthor: null };
            if (value['Author Full Names_wos'] != 'null') {
                let wosAuthors = value['Author Full Names_wos'].split(";").map(e => e.trim())
                let tempwosAuth = wosAuthors.map(e => e.toLowerCase());
                //   console.log(value['UAuthors'], "scopus name");
                //  console.log(wosAuthors);
                let bestMatch = stringSimilarity.findBestMatch(value['UAuthors'].toLowerCase(), tempwosAuth);
                //  console.log(bestMatch.bestMatch.target);
                // console.log( wosAuthors[bestMatch.bestMatchIndex]);
                newVal.UwosAuthor = wosAuthors[bestMatch.bestMatchIndex];

            }

            // console.log(newVal);
            newWosName.push(newVal);

            // console.log("-----------------------");


            // if (key === 40) {
            //     return;
            // }
            //Runs one at a time, need to use a callback for that part to work
            callback();

        },
        //Don't skip this, as we need to operate with objects, not buffers
        objectMode: true
    });


    fileStream.pipe(jsonStream.input);
    jsonStream.pipe(processingStream);
    processingStream.on('finish', () => {

        // fs.writeFileSync('../JSONs/wosNameinCombined.json',JSON.stringify(newScopusName))
        let transformStream = JSONStream.stringify();
        let outputStream = fs.createWriteStream("../JSONs/wosNameinCombined.json");
        transformStream.pipe(outputStream);
        newWosName.forEach(transformStream.write);
        transformStream.end();
        outputStream.on(
            "finish",
            function handleFinish() {
                console.log("Done");
            }
        );

        console.log('All done')



    });
}



const processFlow = async () => {
    await readData();
  

}

processFlow();

