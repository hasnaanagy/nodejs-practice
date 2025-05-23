const fs = require('fs');
const Tour=require('../models/tourModel')


exports.getTours =async (req, res) => {
try{
 const tours=await Tour.find()
 res.status(200).json({
    status:'success',
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
