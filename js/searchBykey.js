import tree3 from '../JSONs/tree3.json' assert {type: 'json'};;
import facultyAbstracts from '../JSONs/PI_Abstract.json' assert {type: 'json'};
import keyFacMapper from '../JSONs/keyFacMapper.json' assert {type: 'json'};

function checkFacultiesBasedOnKeywords(keyWord) {
    const matchedFaculties = [];

    Object.entries(facultyAbstracts).reduce((matchedFaculties, [key, abstract]) => {
        if (abstract.toLowerCase().includes(keyWord.toLowerCase())) {
            const facultyName = key.split(' ');
            matchedFaculties.push({ firstName: facultyName[0] || "", lastName: facultyName[1] || "" });
        }
        return matchedFaculties;
    }, matchedFaculties);
    return matchedFaculties;
}



const capitalize = (word) => {
    if (word != "") {
        let [first, ...rest] = word;
        return first.toUpperCase() + rest.join('').toLowerCase();
    }
    else {
        return "";
    }
}

const getKeyWordsFromText = (text) => {

    let list_of_keywords = [];
    for (let [k, v] of Object.entries(tree3)) {
        if (text.toLowerCase().includes(k.toLowerCase())) {
            // console.log(k);
            list_of_keywords.push(k);
        }
    }



    return list_of_keywords;
}


const sortByScore = (facWithScoreObj) => {
    let sortedfacObj = {};
    let facNamesArr=[];
    const sorted = Object.keys(facWithScoreObj)
        .sort((key1, key2) => facWithScoreObj[key2] - facWithScoreObj[key1])
        .reduce(
            (obj, key) => ({
                ...obj,
                [key]: facWithScoreObj[key]
            }),
            {}
        )

    for (let i in sorted) {
        let name = i.split(' ');
        let capName = [];
        for (let nam of name) {
            capName.push(capitalize(nam))
        }   
        console.log(capName.join(' '),"--",sorted[i]);

        sortedfacObj[capName.join(' ')] = sorted[i];
        facNamesArr.push(capName.join(' '));

    }
    return facNamesArr;
}

const getKeyOccurances = (keywords, content) => {
    let keyOccCount = {};
    for (let key of keywords) {
        let regexp = new RegExp(`${key.toLowerCase()}`, 'gi');
        let count = (content.toLowerCase().match(regexp) || []).length;
        keyOccCount[key] = count;
    }
    return keyOccCount;
}

const scoreTheFaculty = (keyCountObj) => {
    let facWithscore = {};
    for (let [k, cnt] of Object.entries(keyCountObj)) {
        if (keyFacMapper[k]) {
            // console.log(keyFacMapper[k]);
            for (let fac of keyFacMapper[k]) {
                if (facWithscore[fac]) {
                    facWithscore[fac] += (100 * (1 - (0.5) ** cnt)) / 0.5;
                }
                else {
                    facWithscore[fac] = (100 * (1 - (0.5) ** cnt)) / 0.5;
                }
            }
        }
    }
    return facWithscore;
}

document.getElementById('get-results').addEventListener('click', () => {
    const keyWord = document.getElementById('input-keyword').value;

    if (keyWord) {
        let matchedWords = getKeyWordsFromText(keyWord); //get keywords
       
        let keycountOccurances = getKeyOccurances(matchedWords, keyWord); // count no of times keywords repeated in input text
       
        let scoredFaculty = scoreTheFaculty(keycountOccurances); //apply formula for score here ( for faculty with keywords)

        let sortedFaculty = sortByScore(scoredFaculty);  //sort the formulated scores in desc ordr
        console.log(sortedFaculty);
        


        if (sortedFaculty.length > 0) {
            document.getElementsByClassName("accordion-body")[0].innerHTML = ``;
            let facultyHtmlContent = sortedFaculty.map((faculty, i) => `<tr>
         <th scope="row">${i+1}</th>
         <td>${faculty}</td> 
         </tr>`);

            document.getElementById("results-accordian").innerHTML = `<table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>`+ facultyHtmlContent.join("") + `</tbody></table>`;
        }
    }
    else {
        //no faculty found
        document.getElementById("results-accordian").innerHTML = `<p>There are no matches for the given input</p>`;
    }
})
