const Tour=require('../models/tourModel');
const APIFeaturs=require('../utils/apiFeatures')
exports.top5Cheap=(req,res,next)=>{
    req.query.limit="5"
    req.query.sort='-ratingsAverage,price'
    req.query.field='name,price,ratingsAverage'
    next()
}

exports.getTours =async (req, res) => {
try{
let featurs=new APIFeaturs(Tour.find(),req.query).filter().sort().limitFields().paginate()
const tours=await featurs.query
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

exports.getTourStats=async(req,res)=>{
   try{
     const stats=await Tour.aggregate([
        {
            $match:{ratingsAverage:{$gte:4.5}}
        },
        {
            $group:{
                _id:{$toUpper:'$difficulty'},
                numTours:{$sum:1},
                numRatings:{$sum:'$ratingsQuantity'},
                avgRatings:{$avg:'$ratingsAverage'},
                avgPrice:{$avg:'$price'},
                minPrice:{$min:'$price'},
                 maxPrice:{$max:'$price'}
            }
        },{
            $sort:{
            ratingsAverage:1    
            }
        },
        // {
        //     $match:{
        //         _id:{$ne:'EASY'}
        //     }
        // }
    ])

    res.status(200).json({
        status:'success',
        data:{
            stats
        }
    })
   }catch(err){
   res.status(400).json({
        status:'fail',
        message:err
    })
   }
}

