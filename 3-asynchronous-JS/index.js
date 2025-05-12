const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');
const { reject } = require('superagent/lib/request-base');

// 1.code with callback hell
// fs.readFile(`${__dirname}/dog.txt`,"utf-8", (err, data) => {
//   if (err) return console.log('error reading file', err);
// console.log(data)
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log('error get image', err);
//       console.log(res.body)
//       fs.writeFile("dog-image.txt", res.body.message, err => {
//         if (err) return console.log('error writing to file', err);
//       });
//     });
// });

//2.using and bulding promises and using chaining
const promisifiedReadFile=file=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(file,"utf-8",(err,data)=>{
            if(err) reject(err)
                resolve(data)
        })
    })
}
const promisifiedWriteFile=(file,txt)=>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(file,txt,err=>{
            if(err) reject(file)
                resolve("file written successfully")
        })
    })
}

promisifiedReadFile(`${__dirname}/dog.txt`).then(data=>{
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
}).then(data=>{
    return promisifiedWriteFile("dog-image-2.txt",data.body.message)
}).then(data=>{
    console.log(data)
})
.catch(err=>{
    console.log(err)
})

