const fs=require("fs");
const http=require("http")
const url=require("url")


const data=fs.readFileSync("./starter/dev-data/data.json","utf-8")
const dataObj=JSON.parse(data)
const server=http.createServer((req,res)=>{
    const {pathname}=url.parse(req.url,true)
    if(pathname === "/" || pathname ==="/overview"){
        res.end("Home")
    }
    else if(pathname==="/product"){
       res.end("products")
    }
    else if(pathname==="/api"){
        res.writeHead(200,{
            "content-type":"application/json"
        })
        res.end(data)
    }
    else{
        res.writeHead(404,{
            "content-type":"text/html"
        })
        res.end("<h1>Page Not Found</h1>")
    }
})

server.listen(8000,"127.0.0.1",()=>{
    console.log("server listening on port number 8000")
})

//-------------------------------------------------------------------------
//blocking synchronous code
// read file using fs module 
const inputText=fs.readFileSync("./starter/txt/input.txt","utf-8")//1
console.log(inputText)//2

//write to file using fs module
const outputText=`This is what we know about avocado:${inputText}`
fs.writeFileSync("./starter/txt/output.txt",outputText)//3
console.log("file written")//4


//non-blocking ,asynchrounus code
fs.readFile("./starter/txt/start.txt","utf-8",(err,data1)=>{//6
    if(err) return console.log("error",err)
        console.log("data1",data1)//7
    fs.readFile(`./starter/txt/${data1}.txt`,"utf-8",(err,data2)=>{//8
        console.log("data2",data2)//9
        fs.writeFile("./starter/txt/final.txt",`${data1}\n${data2}`,"utf-8",(err)=>{//10
            console.log("file written")//11
        })
    })
})
console.log("will read file")//5

const input =fs.readFileSync("./starter/txt/input.txt","utf-8")
console.log(input)
console.log("hello");

fs.readFile("./starter/txt/input.txt","utf-8",(err,data)=>{
    console.log(2)
    fs.readFile("./starter/txt/input.txt","utf-8",(err,data)=>{
        console.log(3)
        fs.readFile("./starter/txt/input.txt","utf-8",(err,data)=>{
            console.log(4)          
        })
        
    })
})

console.log(1)