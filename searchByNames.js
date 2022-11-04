import abs from './JSONs/scopusExpertfinderPIKeys.json' assert {type: 'json'};

export const loadOptions = () => {
    let options = getLastNameOptions()
    let defOption = `<option value="s">Choose LastName</option>`
    let optionsContent = options.map(opt => `<option value="${opt}">${opt}</option>`)
    let newOptions = [defOption];
    newOptions = newOptions.concat(optionsContent);
    document.getElementById("multi_dropdown").innerHTML = newOptions.join("");
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
    let defOption1 = `<option value="s">Choose FirstName</option>`
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
    $('#multi_dropdown').val('deselectAll');
    $('#multi_dropdown').selectpicker('refresh');
    $('#multi_dropdown1').val('deselectAll');
    $('#multi_dropdown1').selectpicker('refresh');
}

export const getVals = () => {
    let val = $('.multiple-picker-ex').selectpicker('val');
    let val1 = $('.multiple-picker-ex1').selectpicker('val');
    let fullName = val + ' ' + val1
    let keyWords = abs[fullName]
    let keysData = []
    for (let [k, v] of Object.entries(keyWords)) {
        keysData.push(k)
    }
    if (keysData.length > 0) {
        document.getElementById("accordian-content").innerText = "";
        let keyscontentData = keysData.map((keywrd, i) => `<tr><th scope="row">${i + 1}</th><td>${keywrd}</td></tr>`);

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