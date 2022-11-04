import abs from './JSONs/sample.json' assert {type: 'json'};

export const loadOptions=()=>{
    // let options = [];
    // for(let [key] of Object.entries(tree3)){
    //     options.push(key);
    //     if(key=='Artificial Intelligence'){
    //     console.log(key);
    //     }
    // }
    let options = getLastNameOptions()
    let options1 = getFirstNameOptions()
    // console.log(options);'
    let defOption=`<option value="s">Choose LastName</option>`
    let optionsContent=  options.map(opt=>`<option value="${opt}">${opt}</option>`)
    // console.log(optionsContent);
    let newOptions= [defOption];
    newOptions=newOptions.concat(optionsContent);
    document.getElementById("multi_dropdown").innerHTML=newOptions.join("");

    let defOption1=`<option value="s">Choose FirstName</option>`
    let optionsContent1=  options1.map(opt1=>`<option value="${opt1}">${opt1}</option>`)
    // console.log(optionsContent);
    let newOptions1= [defOption1];
    newOptions1=newOptions1.concat(optionsContent1);
    document.getElementById("multi_dropdown1").innerHTML=newOptions1.join("");
}

const splitNames = () => {
  const authorNames = new Map()

  const addToMap = (key, getValue) => {
    if(!authorNames.has(key)) {
      authorNames.set(key, getValue(key))
    }
  }

  const names = new Set()
  const names_wos = new Set()
  abs.forEach((author) => {
    author['Authors']?.split(',').forEach(name => {
      const temp = name.replaceAll('.', '').trim() 
      temp != 'null' && names.add(temp)
    })
    author['Authors_wos']?.split(';').forEach(name => {
      const temp = name.replaceAll('.', '').trim()
      temp != 'null' && names_wos.add(temp)
    })
  })

  const nonWOS = (name) => {
    const temp = name.split(' ')
    return { lastName: temp[0], firstName: temp[1] }
  }

  const WOS = (name) => {
    const temp = name.split(',')
    return { lastName: temp[0]?.trim(), firstName: temp[1]?.trim() }
  }

  for(let name of names.values()) {
    addToMap(name, nonWOS)
  }

  for(let name of names_wos.values()) {
    addToMap(name, WOS)
  }

  return [...authorNames.values()]
}

const names = splitNames()

export const getFirstNameOptions = (lastNameFilter = '') => {
    console.log('Starting2')
  let filteredNames = names
  if(lastNameFilter) {
    filteredNames = names.filter(name => name.lastName === lastNameFilter)
  }

  const temp = new Set(filteredNames.map(name => name.firstName))
  filteredNames = [...temp]
  return filteredNames
}

export const getLastNameOptions = (firstNameFilter = '') => {
console.log('Starting')
  let filteredNames = names
  if(firstNameFilter) {
    filteredNames = names.filter(name => name.firstName === firstNameFilter)
  }

  const temp = new Set(filteredNames.map(name => name.lastName))
  filteredNames = [...temp]
  return filteredNames
}

export function getLastNameOptionsWrapper() {
    const lastName = document.getElementById("multi_dropdown")?.value ?? ""
    const options = getFirstNameOptions(lastName)
    console.log(options);
    const optionsContent=  options.map(opt=>`<option value="${opt}">${opt}</option>`)
    // console.log(optionsContent);
    document.getElementById("multi_dropdown1").innerHTML=optionsContent.join("");
    $('#multi_dropdown1').selectpicker('refresh')
}

export function getFirstNameOptionsWrapper() {
    const firstName = document.getElementById("multi_dropdown1")?.value ?? ""
    const options = getlastNameOptions(firstName)
    console.log(options);
    const optionsContent=  options.map(opt=>`<option value="${opt}">${opt}</option>`)
    // console.log(optionsContent);
    document.getElementById("multi_dropdown").innerHTML=optionsContent.join("");
    $('#multi_dropdown').selectpicker('refresh')
}

export const resetDropDown=()=>{
    //console.log("hdsbdhs")
    $('#multi_dropdown').val('deselectAll');
    console.log("dsdsd")
    $('#multi_dropdown').selectpicker('refresh');
    $('#multi_dropdown1').val('deselectAll');
    $('#multi_dropdown1').selectpicker('refresh');
}

export const getVals=()=>{
    console.log("triggered");
    let val = $('.multiple-picker-ex').selectpicker('val');
    // console.log(tree3);
    let totalFaculty=[];
    let facultyScore={}
   for(let i of val){
       let matchFacData=checkFacultiesBasedOnKeywords(i);
       console.log('edinf')
  
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

console.log(getLastNameOptions('V'))
console.log(getFirstNameOptions('Luth'))
console.log(getFirstNameOptions('Liu'))