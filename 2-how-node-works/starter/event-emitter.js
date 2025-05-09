const EventEmitter=require("events")
const http=require("http")
class Sales extends EventEmitter{
    constructor(){
        super();
    }
}

const myEmitter=new Sales()
myEmitter.on("newSale",()=>{
    console.log("there was a new sale")
})
myEmitter.on("newSale",(leftStock)=>{
    console.log(`there are ${leftStock} left in stock`)
})

myEmitter.emit("newSale",9)
//-------------------------------------------------------------
//http module also depends on events
const server=http.createServer()
server.on("request",(req,res)=>{
    console.log("request received")
    console.log(req.url)
    res.end("request received")
})
server.on("close",(res,req)=>{
    console.log("server closed")
})

server.listen(8000,"127.0.0.1",()=>{
    console.log("waiting for requests")
})