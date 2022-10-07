import tree3 from '../JSONs/tree3.json' assert {type: 'json'};;
import facultyAbstracts from '../JSONs/PI_Abstract.json' assert {type: 'json'};

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


const sortByScore=(keywords)=>{
let facObj={};
    for(let keyword of keywords){
        let faNames=checkFacultiesBasedOnKeywords(keyword);
        for(let i of faNames){
            // console.log(i);
            let name=i.firstName+" "+i.lastName;
            if(facObj[name]){
                facObj[name]+=1;
            }
            else{
            facObj[name]=1;
            }
        }
    }
    console.log(facObj);
}

document.getElementById('get-results').addEventListener('click', () => {
    const keyWord = document.getElementById('input-keyword').value;

    if (keyWord) {
        let matchedWords = getKeyWordsFromText(keyWord);
        console.log(matchedWords);

        let facultyNames = checkFacultiesBasedOnKeywords(keyWord);
        let sortedFaculty=sortByScore(matchedWords);

        if (facultyNames.length > 0) {
            // document.getElementById("collapseOne").c=true;
            document.getElementsByClassName("accordion-body")[0].innerHTML = ``;
            let facultyHtmlContent = facultyNames.map((faculty, i) => `<tr>
         <th scope="row">${i}</th>
         <td>${capitalize(faculty.firstName)}</td>
         <td>${capitalize(faculty.lastName)}</td>
         </tr>`);

            document.getElementById("results-accordian").innerHTML = `<table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First name</th>
          <th scope="col">Last name</th>
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
