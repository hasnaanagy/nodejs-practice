const express=require('express')
const app=express()

app.get('/',(req,res)=>{
 res.send("hello from server")
})

const port=3000
app.listen(port,(err)=>{
    console.log('Listening on port 3000 ...')
})