//var createError = require('http-errors');
var express = require('express');
//var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');
var cors = require("cors");
const mongoose = require('mongoose')
var app = express()
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//var testAPIRouter = require("./routes/testAPI");
const bodyParser= require('body-parser');
const PORT = 9000;
let wishlist = require('./wishlist.model');
let list = require('./list.model')
//const mongo = require('mongodb').MongoClient;
const url = "mongodb+srv://al:C0C0MaN910910@test-izw4a.mongodb.net/test?retryWrites=true&w=majority";



const wishlistRoutes=express.Router();





// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(cors());
app.use(bodyParser.json());

//app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
//app.use("/testAPI",testAPIRouter);


// catch 404 and forward to error handler
//app.use(function(req, res, next) {
 // next(createError(404));
//});

// error handler
//app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
 // res.render('error');
//});




mongoose.connect(url,{
  useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once('open',function() {
  console.log(" databse connection established");
})


wishlistRoutes.route('/').get(function(req, res) {
  wishlist.distinct("wishlist_list",function(err, ans) {
    if (err) {
        console.log(err);
    } else {
        res.json(ans);
    }
});
});
wishlistRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  var search= {wishlist_list : id}
  wishlist.find(search,function(err, ans) {
      res.json(ans);
  });
});

wishlistRoutes.route('/add').post(function(req,res){
  let ans = new wishlist(req.body);
  ans.save()
    .then(ans => {
      res.status(200).json({'ans' : 'ans added'});
    })
    .catch(err => {
      res.status(400).send('failed add');
    });
});


wishlistRoutes.route('/update/:id').post(function(req,res){
  let id = req.params.id;
  wishlist.findById(id, function(err, data){
    if (!data){
      res.status(404).send("data is not found");
    }
    else{
      data.wishlist_book = req.body.wishlist_book;
      data.wishlist_description = req.body.wishlist_description;
      data.wishlist_list = req.body.wishlist_list;
      data.save().then(data => {
        res.json('Updated');
      })
      .catch(err => {
        res.status(400).send("Update not completed");
      });
    }
  });
});



wishlistRoutes.route('/delete/:id').delete(function(req,res){
  let id = req.params.id;
  wishlist.findByIdAndDelete(id, function(err){
    if(err){
      res.send(err);
    }else {
      res.status(200).json({'ans' : 'ans removed'});
    }
  });
});

wishlistRoutes.route('/loadlist/:id').get(function(req, res) {
  let id = req.params.id;
  var search= {list_user : id};
  list.find(search,function(err, ans) {
    res.json(ans);
   });
});
 


wishlistRoutes.route('/loadlist/add').post(function(req,res){
  let ans = new list(req.body);
  ans.save()
    .then(ans => {
      res.status(200).json({'ans' : 'ans added'});
    })
    .catch(err => {
      res.status(400).send('failed add');
    });
});

wishlistRoutes.route('/loadlist/add/:user/:id').post(function(req,res){
  let user = req.params.user;
  let id = req.params.id;
  let ans = new list({list_name: id , list_user: user})
  ans.save()
    .then(ans => {
      res.status(200).json({'ans' : 'ans added'});
    })
    .catch(err => {
      res.status(400).send('failed add');
    });
});

wishlistRoutes.route('/loadlist/delete/:id').delete(function(req,res){
  let id = req.params.id;
  list.findByIdAndDelete(id, function(err){
    if(err){
      res.send(err);
    }else {
      res.status(200).json({'ans' : 'ans removed'});
    }
  });
});



app.use('/wishlist',wishlistRoutes);

app.listen(PORT, function(){
  console.log("Server is running on port:" + PORT);
});

module.exports = app;
