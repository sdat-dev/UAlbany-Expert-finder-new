
import tree3 from './JSONs/tree3.json' assert {type: 'json'};;
import facultyAbstracts from './JSONs/PI_Abstract.json' assert {type: 'json'};


export const loadOptions=()=>{
    let options = [];
    for(let [key] of Object.entries(tree3)){
        options.push(key);
        if(key=='Artificial Intelligence'){
        console.log(key);
        }
    }
    // console.log(options);
    let optionsContent=  options.map(opt=>`<option value="${opt}">${opt}</option>`)
    // console.log(optionsContent);
    document.getElementById("multi_dropdown").innerHTML=optionsContent.join("");
}

export const main=(ele, event)=>{
    let val = $(ele).selectpicker('val');
    // let val = document.getElementById("multi_dropdown").selectpicker('val')
   
}

export const resetDropDown=()=>{
    $('.multiple-picker-ex').selectpicker('deselectAll');
    $('.multiple-picker-ex').selectpicker('refresh');
    document.getElementById("multi-accordian-content").innerHTML=`<p>There are no matches for the given input</p>`;
}

function checkFacultiesBasedOnKeywords(keyWord) {
    const matchedFaculties = [];
    console.log(keyWord);

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

const changeToFirstLAstName=(nameScoreArray)=>{
let fisrtLastNameArr=[]
    for(let i of nameScoreArray){
    let name=Object.keys(i)[0].split(" ");
    let obj={
        firstName:"",
        lastName:""
    }
    obj.firstName=name[0];
    obj.lastName=name[1]
    fisrtLastNameArr.push(obj);
}
return fisrtLastNameArr;
}

export const getVals=()=>{
    console.log("triggered");
    let val = $('.multiple-picker-ex').selectpicker('val');
    // console.log(tree3);
    let totalFaculty=[];
    let facultyScore={}
   for(let i of val){
       let matchFacData=checkFacultiesBasedOnKeywords(i);
  
       totalFaculty= totalFaculty.concat(matchFacData)
   }


   for(let fac of totalFaculty){
       if(facultyScore[fac.firstName+" "+fac.lastName]){
        facultyScore[fac.firstName+" "+fac.lastName]+=1;
       }
       else{
        facultyScore[fac.firstName+" "+fac.lastName]=1
       }
   }



   let keysSorted = Object.keys(facultyScore)
                                        .sort(function(a,b){return facultyScore[b]-facultyScore[a]})
                                        .map(key =>( {[key]:facultyScore[key]}));
   console.log(keysSorted); 



   let uniq=changeToFirstLAstName(keysSorted);


   if(uniq.length>0){
   
    
    let facultyHtmlContent=uniq.map((faculty,i)=>`<tr>
     <th scope="row">${i+1}</th>
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