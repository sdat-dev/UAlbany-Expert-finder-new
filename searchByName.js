
import tree3 from './JSONs/tree3.json' assert {type: 'json'};;
import facultyAbstracts from './JSONs/PI_Abstract.json' assert {type: 'json'};

const matchFacultyToDepartments = (firstName, lastName) => {
    const facultyName = `${firstName} ${lastName}`.toLowerCase()
    const keyWords = [...new Set([...Object.keys(tree3)])]

    let abstract = facultyAbstracts[facultyName]

    if (!abstract) {
        // console.log('Faculty name is incorrect')
        return []
    }

    abstract = abstract.toLowerCase()
    return keyWords.filter((keyWord) => {
        keyWord = keyWord.replace('(', '');
        keyWord = keyWord.replace(')', '');
        return new RegExp(`\\b${keyWord}\\b`, 'gmi').test(abstract);
    }
    )
    //return includeWords(keyWords,abstract)
}


document.getElementById('get-keys-btn').addEventListener('click', () => {
    let firstname = document.getElementById('floatingFirstName').value;
    let lastname = document.getElementById('flaotingLastName').value;

    console.log(firstname, lastname);
    console.log(matchFacultyToDepartments(firstname, lastname));

    let keysData = matchFacultyToDepartments(firstname, lastname);
    if (keysData.length > 0) {
        document.getElementById("accordian-content").innerText="";
        let keyscontentData = keysData.map((keywrd, i) => `<tr><th scope="row">${i}</th><td>${keywrd}</td></tr>`);

        document.getElementById("accordian-content").innerHTML = `<table class="table table-hover">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Keywords</th>
    </tr>
  </thead>
  <tbody>`+ keyscontentData.join("") + `</tbody></table>`
    }
    else {
        document.getElementById("accordian-content").innerHTML = `<p>There are no matches for the given input</p>`;
    }
})


