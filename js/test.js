
let obj1={
"savedrecs":[
    {
        "Authors":"Zhang wil; Liang yu",
        "Author Full Names":"Zhang wil; Liang yu",
        "Author Keywords":"abc; dce; zzz",
        "Keywords Plus":"ggg; aaaa; ffff",
        "Abstract":"Thi is abstract",
        "Research Areas":"Engineering"
    }
]
}



const func = (savedRecs) => {
    let obj = {}
  
  
  
   savedRecs.forEach(rec => {
      const names = rec['Author Full Names'].split(';')
      names.forEach(name => {
        obj = {
          ...obj,
          [name]: {
            'Author Keywords': rec['Author Keywords'],
            'Keywords Plus': rec['Keywords Plus'],
            'Abstract': rec['Abstract'],
            'Research Areas': rec['Research Areas']
          }
        }
      })
    })
    return obj
  }


console.log(func(obj1.savedrecs))