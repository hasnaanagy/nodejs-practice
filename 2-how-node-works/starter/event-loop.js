const fs=require("fs")
console.log("top level code 1")
fs.readFile("./test-file.txt","utf-8",(err,data)=>{
    console.log("start")
    setTimeout(()=>{
        console.log("Time out")
    },0)

    setImmediate(()=>{
        console.log("set immediate")
    })
    
    console.log("end")

})