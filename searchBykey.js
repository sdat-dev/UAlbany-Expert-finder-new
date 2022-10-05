import tree3 from './JSONs/tree3.json' assert {type: 'json'};;
import facultyAbstracts from './JSONs/PI_Abstract.json' assert {type: 'json'};

function checkFacultiesBasedOnKeywords(keyWord) {
    const matchedFaculties = [];

    Object.entries(facultyAbstracts).reduce((matchedFaculties, [key, abstract]) => {
        if (abstract.toLowerCase().includes(keyWord.toLowerCase())) {
            const facultyName = key.split(' ');
            matchedFaculties.push({ firstName: facultyName[0]||"", lastName: facultyName[1]||"" });
        }
        return matchedFaculties;
    }, matchedFaculties);
    return matchedFaculties;
}

const capitalize = (word) =>{ 
    if(word!=""){
        let [first,...rest]=word;
    return first.toUpperCase() + rest.join('').toLowerCase()
    }
    else{
        return "";
    }
}

document.getElementById('get-results').addEventListener('click',()=>{
    const keyWord=document.getElementById('input-keyword').value;
    console.log(keyWord);
    console.log(checkFacultiesBasedOnKeywords(keyWord));
    if(keyWord){
    let facultyNames=checkFacultiesBasedOnKeywords(keyWord);
    if(facultyNames.length>0){
        // document.getElementById("collapseOne").c=true;
        document.getElementsByClassName("accordion-body")[0].innerHTML=``;
        let facultyHtmlContent=facultyNames.map((faculty,i)=>`<tr>
         <th scope="row">${i}</th>
         <td>${capitalize(faculty.firstName)}</td>
         <td>${capitalize(faculty.lastName)}</td>
         </tr>`);
        
        document.getElementById("results-accordian").innerHTML=`<table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First name</th>
          <th scope="col">Last name</th>
        </tr>
      </thead>
      <tbody>`+ facultyHtmlContent.join("") +`</tbody></table>`;
    }
}
    else{
        //no faculty found
        document.getElementById("results-accordian").innerHTML=`<p>There are no matches for the given input</p>`;
    }
})
