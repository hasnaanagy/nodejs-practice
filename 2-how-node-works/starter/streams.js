const { error } = require("console")
const fs=require("fs")
const server=require("http").createServer()
//we will try to read large file and send it to browser using 3 ways 


server.on("request",(req,res)=>{
//1. with no streams ,it will waits untill full data is read and sent to browser
// fs.readFile("./test-file.txt",(err,data)=>{
//     if(err) console.log(err)
//         res.end(data)
// })

//2. with streams ,but this way will cause backpressure problem while readable streams are faster than writable streams
const readable=fs.createReadStream("./test-file.txt")
// readable.on("data",chunk=> res.write(chunk))
// readable.on("end",()=>{
//     res.end()
// })
// readable.on("error",()=>{
//     console.log("File not Found")
//     res.statusCode=500
//     res.end(error)
// })

//3. best solution is to pipe between readable and writable streams
readable.pipe(res)
})

server.listen(8000,"127.0.0.1",()=>{
    console.log("waiting for requests")
})