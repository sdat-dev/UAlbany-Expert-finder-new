import abs from './JSONs/scopusExpertfinderPIKeys.json' assert {type: 'json'};
import cuurentFaculty600 from './JSONs/current600+faculty.json' assert {type:'json'}


const getFullNamesOptions = () => {
    const options = Object.keys(abs)  //this is combined data names

    let CurrentFacoptions=[];
    for(let obj of cuurentFaculty600){
        CurrentFacoptions.push(Object.keys(obj)[0]);  //this is faculty data of current 600+
    }


    const defOption = `<option value="s">Choose a Name</option>`
    const optionsContent = CurrentFacoptions.map(opt => `<option value="${opt}">${opt}</option>`)
    const newOptions = [defOption, ...optionsContent]
    return newOptions
}

export const loadOptions = () => {
    document.getElementById("fullname_dropdown").innerHTML = getFullNamesOptions().join("");
}

const names1 = () => {
    const names = []
    for (let [k, v] of Object.entries(abs)) {
        names.push(k)
    }
    return names
}

const nameSplitter = (name) => {
    const temp = name.split(' ')
    let l = temp.length
    return { lastName: temp[0], firstName: temp.slice(1, l).join(" ") }
}

export const getFirstNameOptions = (lastNameFilter = '') => {
    let filteredNames = names1()
    if (lastNameFilter) {
        filteredNames = filteredNames.filter(name => nameSplitter(name).lastName === lastNameFilter)
    }

    const temp = new Set(filteredNames.map(name => nameSplitter(name).firstName))
    filteredNames = [...temp]
    return filteredNames
}

export const getLastNameOptions = () => {
    let filteredNames = names1()
    const temp = new Set(filteredNames.map(name => nameSplitter(name).lastName))
    filteredNames = [...temp]
    return filteredNames
}

export function getLastNameOptionsWrapper() {
    const lastName = document.getElementById("multi_dropdown")?.value ?? ""
    const options = getFirstNameOptions(lastName)
    let defOption1 = `<option value="s">Choose first name</option>`
    let newOptions1 = [defOption1];
    const optionsContent1 = options.map(opt => `<option value="${opt}">${opt}</option>`)
    newOptions1 = newOptions1.concat(optionsContent1);
    document.getElementById("multi_dropdown1").innerHTML = newOptions1.join("");
    $('#multi_dropdown1').selectpicker('refresh')
}

export function getFirstNameOptionsWrapper() {
    const firstName = document.getElementById("multi_dropdown1")?.value ?? ""
    const options = getlastNameOptions(firstName)
    const optionsContent = options.map(opt => `<option value="${opt}">${opt}</option>`)
    document.getElementById("multi_dropdown").innerHTML = optionsContent.join("");
    $('#multi_dropdown').selectpicker('refresh')
}

export const resetDropDown = () => {
    $('#fullname_dropdown').val('deselectAll');
    $('#fullname_dropdown').selectpicker('refresh');
    document.getElementById("accordian-content").innerHTML = `<p>There are no matches for the given input</p>`;
}

export const getOptions = (firstName, lastName) => {
    const options = new Map()
    const generateKeyRegex = new RegExp(`${lastName} ${firstName.charAt(0)}`, 'gi')
    Object.keys(abs)
      .filter(key => key.match(generateKeyRegex))
      .forEach(expert => {
        Object.entries(abs[expert]).forEach(([key, value]) => {
          const hasKey = options.has(key)
          options.set(key, (hasKey ? options.get(key) : 0) + value)
      })
    })
  
    return [...options.entries()].sort((a, b) => b[1] - a[1]).map(a => a[0])
  }

// console.log(getOptions('David F.','Andersen'))

export const getVals = () => {
    const fullName = document.getElementById('fullname_dropdown').value
    const [lastName, firstName] = fullName.split(' ')
    // const lastName = document.getElementById('lastName').value
    //let [lastName1,firstName1] = 
    const options = getOptions(firstName,lastName)
    // let val = $('.multiple-picker-ex').selectpicker('val');
    // let val1 = $('.multiple-picker-ex1').selectpicker('val1');
    // let fullName = val + ' ' + val1
    // let keyWords = abs[fullName]
    // let keysData = []
    // for (let [k, v] of Object.entries(keyWords)) {
    //     keysData.push(k)
    // }
    if (options.length > 0) {
        document.getElementById("accordian-content").innerText = "";
        let keyscontentData = options.map((keywrd, i) => `<tr><th scope="row">${i + 1}</th><td>${keywrd}</td></tr>`);

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
}