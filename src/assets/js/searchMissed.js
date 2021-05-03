let config = require('./search.config.js');
const fs = require('fs');
const fetch = require('node-fetch');
//console.log(config)

let arrs = Object.values(config);
//console.log(arr);

arrs.forEach((arr) => {
  arr.forEach((path) => {	
    fs.open(path, (err, fd) => {
    if (err) {
//     console.log(err.path);
     let pathArr = path.match(/[^\/]+/g);
     let fileName = pathArr[pathArr.length - 1];	   
     let srcUrl = pathArr.splice(3).join('/') 
//     console.log(srcUrl);
     fetch(srcUrl).then(res => console.log(res))
	    
//     pathArr.pop();	    
     let pathD = '/' + pathArr.join('/')
//     console.log(fileName);	    
//     console.log(pathArr);
//       console.log(pathD);
/*	
     fs.mkdir(pathD, {recursive: true}, (err) => {
     if err throw err;
     })	   
*/
     	    
     //write file
     fs.writeFile('path', 'data', (err) => {
     
     });	 
    };
    })
  })	 
})
