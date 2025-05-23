const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('database connected successfully');
  });

//create tour schema
const tourSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'A Tour Must Have A Name'],
        unique:true
    },
    rating:{
        type:Number,
        default:4.5
    },
    price:{
        type:Number,
        required:[true,'A Tour Must Have A Price']
    }
})

const Tour=mongoose.model('Tour',tourSchema)
const tour1=new Tour({
    name:'Tour 1',
    rating:3.5,
    price:100
})

tour1.save().then(doc=>{
    console.log(doc)
}).catch(err=>{
    console.log(err)
})

const port = 3000;
app.listen(port, () => {
  console.log('Listening on port 3000 ...');
});
