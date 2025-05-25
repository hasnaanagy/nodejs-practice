const fs = require('fs');
const Tour=require('../models/tourModel');

exports.top5Cheap=(req,res,next)=>{
    req.query.limit="5"
    req.query.sort='-ratingsAverage,price'
    req.query.field='name,price,ratingsAverage'
    next()
}

exports.getTours =async (req, res) => {
try{
    //BUILD QUERY
    console.log(req.query)
  //1- execlude[page,sort,limit,field] from query string
  const queryObj={...req.query}
  const execludedFields=["page","sort","limit","field"]
  execludedFields.forEach(field=>delete queryObj[field])

  //2- replace filtering operators with $opertor
  let queryString=JSON.stringify(queryObj)
  queryString=queryString.replace(/\b(gte|gt|lt|lte)\b/g,match=>`$${match}`)
  let query=Tour.find(JSON.parse(queryString))

  //3-Sorting 

  if(req.query.sort){
    const sortBy=req.query.sort.split(',').join(' ')
    query=query.sort(sortBy)
  }else{
    query=query.sort('-createdAt')
  }

  //4-Projection (limiting fields)

  if(req.query.field){
    const fields=req.query.field.split(',').join(' ')
    query=query.select(fields)
  }else{
        query=query.select('-__v')
  }

  //pagination (page+limit)
  const page=req.query.page*1||1
  const limit=req.query.limit*1||100
  const skip=(page-1)*limit

query=query.skip(skip).limit(limit)

//in case user request a page that does not exist

if(req.query.page){
    const numOfTours=await Tour.countDocuments()
    if(skip>=numOfTours)
        throw new Error('Page Not Exist')
}

 //EXECUTE QUERY
  const tours=await query

res.status(200).json({
    status:"success",
    results:tours.length,
    data:{
        tours
    }
})
}catch(err){
    res.status(400).json({
        status:'fail',
        message:err
    })
}
};


exports.createTour =async (req, res) => {
try{
      const newTour=await Tour.create(req.body)
      res.status(201).json({
        status:'success',
        data:{
            tour:newTour
        }
      })
}catch(err){
 res.status(400).json({
    status:'fail',
    message:err
 })
}  
};

exports.getTourById = async(req, res) => {
 try{
 const tour=await Tour.findById(req.params.id)
 res.status(200).json({
    status:'success',
    data:{
        tour
    }
 })
 }catch(err){
res.status(400).json({
    status:'fail',
    message:err
})
 }
};

exports.updateTour =async (req, res) => {
 try{
    const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
 res.status(201).json({
    status: 'success',
    data: {
      tour
    },
  });
 }catch(err){
res.status(400).json({
    status:'fail',
    message:err
})
 }
};

exports.deleteTour = async(req, res) => {
try{
await Tour.findByIdAndDelete(req.params.id)
  res.status(204).json({
    status: 'success',
    data: null,
  });
}catch(err){
res.status(404).json({
    status:'fail',
    message:err
})
}
};
