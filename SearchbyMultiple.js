
import tree3 from './JSONs/tree3.json' assert {type: 'json'};;
import facultyAbstracts from './JSONs/PI_Abstract.json' assert {type: 'json'};


export const loadOptions=()=>{
    let options = [];
    for(let [key] of Object.entries(tree3)){
        options.push(key);
    }
    let optionsContent=  options.map(opt=>`<option value=${opt}>${opt}</option>`)
    document.getElementById("multi_dropdown").innerHTML=optionsContent.join("");
}

export const main=(ele, event)=>{
    let val = $(ele).selectpicker('val');
    // let val = document.getElementById("multi_dropdown").selectpicker('val')
   
}

export const resetDropDown=()=>{
    $('.multiple-picker-ex').selectpicker('deselectAll');
    $('.multiple-picker-ex').selectpicker('refresh');
}

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

const removeUniqs=(arr)=>{
    let hmap={};
    let unqarr=[];
    for(let name of arr){
        let fname=name.firstName+","+name.lastName;
        if(hmap[fname]==1){
                //do nothing
        }
        else{
            hmap[fname]=1;
            unqarr.push(name);
        }
    }
    return unqarr;
}

export const getVals=()=>{
    console.log("triggered");
    let val = $('.multiple-picker-ex').selectpicker('val');
    // console.log(tree3);
    let totalFaculty=[];
   for(let i of val){
       let matchFacData=checkFacultiesBasedOnKeywords(i);
       console.log(matchFacData,"match data");
       totalFaculty= totalFaculty.concat(matchFacData)
   }
   console.log(totalFaculty,"Total");
   
   //remove duplicats
   let uniq = removeUniqs(totalFaculty);

   console.log(uniq);

   if(uniq.length>0){
    // document.getElementById("collapseOne").c=true;
    
    let facultyHtmlContent=uniq.map((faculty,i)=>`<tr>
     <th scope="row">${i}</th>
     <td>${capitalize(faculty.firstName)}</td>
     <td>${capitalize(faculty.lastName)}</td>
     </tr>`);
    
    document.getElementById("multi-accordian-content").innerHTML=`<table class="table table-hover">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First name</th>
      <th scope="col">Last name</th>
    </tr>
  </thead>
  <tbody>`+ facultyHtmlContent.join("") +`</tbody></table>`;
}
else{
    //no faculty found
    document.getElementById("multi-accordian-content").innerHTML=`<p>There are no matches for the given input</p>`;
}

   
}