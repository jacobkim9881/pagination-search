const express = require('express')
const path = require('path')
const fs = require('fs')
const PORT = process.env.PORT || 3000
const app = express();
const glob = require("glob")
//console.log(process.env) 
// options is optional
glob(__dirname + "/**/*.*", function (er, files) {
  files.map( file => {
//	console.log(path.dirname(file), file)
    let aPath = file.split('src')[1];
//	console.log(aPath)
    app.get(aPath, (req, res) => {
      res.sendFile(file);
    })
  })
})

glob(__dirname + "/**/*.html", function (er, files) {
  files.map( file => {
//	console.log(path.dirname(file), file)
    let filePath = file.split('src')[1];
    let url = file.split(path.extname(file))[0].split('src')[1];
	console.log(url)
    app.get(url, (req, res) => {
      res.sendFile(file);
    })
  })
})


//app.use('/login.html', express.static(path.join(__dirname, 'login.html')));


/*
app.get('/', (req, res) => {
  res.sendFile(express.static(path.join(__dirname, 'file')));
})
*/
app.listen(PORT, () => console.log(`Listening on ${ PORT }`)); 
