const mongoose=require('mongoose');
const User=mongoose.model('User');
const passport=require('passport');
const _=require('lodash');

module.exports.register=(req,res,next)=>{
    var user=new User();
    user.userName=req.body.userName;
    user.email=req.body.email;
    user.password=req.body.password;
    user.phone=req.body.phone;
    
    user.save((err,doc)=>{ 
        if(!err)
            res.send(doc);
        else{
            if(err.code==11000){
                console.log(err);
                res.status(422).send(['Duplicate email address found.']);}
            else{
                console.log(err);
                return next(err);}
        }
    });
   console.log('inside register fn.');
}

module.exports.authenticate=(req,res,next)=>{
    //call for passport authentication
    passport.authenticate('local',(err,user,info)=>{ 
        //error from passport middleware
        if(err) return res.status(400).json(err);
        //registered user
        else if(user) return res.status(200).json({
            "token":user.generateJwt()});
            //unknown user or wrong password
        else return res.status(404).json(info);
    })(req,res);
}

module.exports.userProfile=(req,res,next)=>{
    console.log("in in side userprofile");
    
    User.findOne({_id:req._id},
        (err,user)=>{
            console.log("in in side userprofile findone");

            if(!user){
                console.log("not found");
                return res.status(404).json({status:false,message:'User record not found. '});}
            else{
                console.log("found");
                return res.status(200).json({status:true,user:_.pick(user,['userName','email'])});}
        });
}

module.exports.getPatientDetails=(req,res)=>{
    console.log("in side getPatientDetails ");
    User.find({type:'patient'},(err,docs)=>{
                if(!err){res.send(docs);}
                else{ console.log('Error in Retriving Patients Records :' + JSON.stringify(err,undefined,2));}
            });
}


module.exports.getDoctorDetails=(req,res)=>{
    console.log("in side getDoctorDetails ");
    User.find({type:'doctor'},(err,docs)=>{
                if(!err){res.send(docs);}
                else{ console.log('Error in Retriving Doctor :' + JSON.stringify(err,undefined,2));}
            });
}


module.exports.getpharmacistDetails=(req,res)=>{
    console.log("in side getpharmacistDetails ");
    User.find({type:'pharmacist'},(err,docs)=>{
                if(!err){res.send(docs);}
                else{ console.log('Error in Retriving getpharmacistDetails Records :' + JSON.stringify(err,undefined,2));}
            });
}