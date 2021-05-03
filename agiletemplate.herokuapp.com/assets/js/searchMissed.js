let config = require('./search.config.js');

//console.log(config)

let arrs = Object.values(config);
//console.log(arr);

arrs.forEach((arr) => {
  arr.forEach((path) => {	
  fetch(path).
    then((res) => console.log(res));
  })	 
})
