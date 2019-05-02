const mongoose=require('mongoose');
const User=mongoose.model('User');
const passport=require('passport');

module.exports.register=(req,res,next)=>{
    var user=new User();
    user.userName=req.body.userName;
    user.email=req.body.email;
    user.password=req.body.password;
    
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
