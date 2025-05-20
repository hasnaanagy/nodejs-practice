const fs=require('fs')
const express=require('express')
const morgan=require('morgan')
const app=express()


//1-Middle wares
app.use(express.json())
app.use(morgan('dev'))

app.use((req,res,next)=>{
console.log('Hello From My Middleware')
next()
})

app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString()
    next()
})
//2-Route Handllers
const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
const getTours=(req,res)=>{
    console.log(req.requestTime)
 res.status(200).json({
    status:"success",
    results:tours.length,
    data:{
    tours
}
})
}

const createTour=(req,res,)=>{
    const newId=tours[tours.length-1].id +1
    const newTour=Object.assign({id:newId},req.body)
    console.log(newTour)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),(err)=>{
           res.status(201).json({
        status:'success',
        data:{
            tour:newTour
        }
    })
    })
   
}

const getTourById=(req,res)=>{
 if(req.params.id*1>tours.length){
    return res.status(404).json({
        status:'Fail',
        message:'Invalid Id'
    })
 }
 const tour=tours.find(tour=>tour.id===req.params.id*1)
 res.status(200).json({
    status:'success',
    data:{
        tour
    }
 })
}

const updateTour=(req,res)=>{
     if(req.params.id*1>tours.length){
    return res.status(404).json({
        status:'Fail',
        message:'Invalid Id'
    })
 }

 res.status(201).json({
    status:'success',
    data:{
        tour:'updated tour'
    }
 })
}

const deleteTour=(req,res)=>{
     if(req.params.id*1>tours.length){
    return res.status(404).json({
        status:'Fail',
        message:'Invalid Id'
    })
 }

 res.status(204).json({
    status:'success',
    data:null
 })
}

//3-ROUTES
app.route('/api/v1/tours').get(getTours).post(createTour)
app.route('/api/v1/tours/:id').get(getTourById).patch(updateTour).delete(deleteTour)


//4-STARTING SERVER
const port=3000
app.listen(port,(err)=>{
    console.log('Listening on port 3000 ...')
})