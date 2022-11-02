const abs = require('./JSONs/new.json')

const splitNames = () => {
  const authorNames = new Map()

  const addToMap = (key, getValue) => {
    if(!authorNames.has(key)) {
      authorNames.set(key, getValue(key))
    }
  }

  const names = new Set()
  const names_wos = new Set()
  // if()
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

const getFirstNameOptions = (lastNameFilter = '') => {
  let filteredNames = names
  if(lastNameFilter) {
    filteredNames = names.filter(name => name.lastName === lastNameFilter)
  }

  const temp = new Set(filteredNames.map(name => name.firstName))
  filteredNames = [...temp]
  return filteredNames
}

const getLastNameOptions = (firstNameFilter = '') => {
  let filteredNames = names
  if(firstNameFilter) {
    filteredNames = names.filter(name => name.firstName === firstNameFilter)
  }

  const temp = new Set(filteredNames.map(name => name.lastName))
  filteredNames = [...temp]
  return filteredNames
}

console.log(getLastNameOptions('V'))
console.log(getFirstNameOptions('Luth'))
console.log(getFirstNameOptions('Liu'))
