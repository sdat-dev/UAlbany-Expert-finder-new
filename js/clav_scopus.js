const XLSX = require("xlsx");

const getDOIsFromXlsxFile = () => {
  const completeDOIS = new Set()
  const workbook = XLSX.readFile(`${__dirname}/scopus.xlsx`)
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  
  const rows = XLSX.utils.sheet_to_json(worksheet);
  
  rows.forEach(row => {
    const DOI = row['DOI']
    if(DOI) {
      completeDOIS.add(DOI)
    }
  })
  return [...completeDOIS]
}




const formContent = row => {
  let content = []
  const excluded_keys = ['Authors', 'Book Authors', 'Author Full Names']
  const included_keys = Object.keys(row).filter(key => !(key in excluded_keys))
  included_keys.forEach(key => {
    row[key] && content.push(row[key])
  })
  return content.join(' ')
}

const getAuthorDetails = () => {
  const workbook = XLSX.readFile(`${__dirname}/Book1.xlsx`)
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  
  const rows = XLSX.utils.sheet_to_json(worksheet);
  const authorDetails = {}

  rows.forEach(row => {
    const authorNames = row['Author Full Names'].split(';').map(name => name.trim())
    const content = formContent(row)
    authorNames.forEach(name => {
      if(authorDetails[name]) {
        authorDetails[name] = `${authorDetails[name]} ${content}`
      } else {
        authorDetails[name] = content
      }
    })
  })
  return authorDetails
}


;(async () => {
  console.log(getDOIsFromXlsxFile())
  // console.log(getAuthorDetails())
})();