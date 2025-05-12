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

// promisifiedReadFile(`${__dirname}/dog.txt`).then(data=>{
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
// }).then(data=>{
//     return promisifiedWriteFile("dog-image-2.txt",data.body.message)
// }).then(data=>{
//     console.log(data)
// })
// .catch(err=>{
//     console.log(err)
// })


//3.using async/await and try/catch

// const getDogImage=async()=>{
//     try{
//     const data=await promisifiedReadFile(`${__dirname}/dog.txt`)
//     const image=await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//     await promisifiedWriteFile("dog-image-2.txt",image.body.message)
//     return image.body.message
//     }catch(err){
//         console.log(err)
//         throw(err)
//     }
// }
// console.log("1")
// const result=getDogImage()
// console.log(result)
// console.log("2")

//getting value from async function

//1.using then-catch
// console.log("1")
// getDogImage().then(data=>{
//     console.log(data)
//     console.log("3")
// }).catch(err=>{
//     console.log(err)
// })

//2. using IIFE async function
// (async()=>{
//     try{

    
//  console.log("1")
//  const result=await getDogImage()
//  console.log(result)
//  console.log("3")
//     }catch(err){
//         console.log(err)
//     }
// })()

//waiting for multiple promises simultinously
const getDogPic=async()=>{
try {  const data=await promisifiedReadFile(`${__dirname}/dog.txt`)
   const pic1= superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
   const pic2= superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
   const pic3= superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
   const promises=await Promise.all([pic1,pic2,pic3])
   const images=promises.map(el=>el.body.message)
   await promisifiedWriteFile("dog-images.txt",images.join("\n"))
   return images
}catch(err){
    console.log(err)
    throw(err)
}
}
getDogPic().then(data=>{
    console.log(data)
}).catch(err=>{
    console.log(err)
})