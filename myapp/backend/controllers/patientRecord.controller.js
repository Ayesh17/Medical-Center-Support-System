const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');

const Precord=mongoose.model('patientRecord');


var { PatientRecord }=require('../models/patientRecord.model');
/** localhost:3000/patientRecor*/
// router.get('/',(req,res)=>{
//     PatientRecord.find((err,docs)=>{
//         if(!err){res.send(docs);}
//         else{ console.log('Error in Retriving Patients Records :' + JSON.stringify(err,undefined,2));}
//     });
// });

module.exports.getRegRecord=(req,res)=>{
    console.log("in side getReg REcords");
    Precord.find((err,docs)=>{
                if(!err){res.send(docs);}
                else{ console.log('Error in Retriving Patients Records :' + JSON.stringify(err,undefined,2));}
            });
}


module.exports.regRecord=(req,res,next)=>{
    var precord=new Precord();
    console.log("submit in d controller ");
    console.log(req.body);
    precord.id=req.body.id;
    precord.name=req.body.name;
    precord.age=req.body.age;
    precord.cost=req.body.cost;
    precord.description=req.body.description;
    precord.medicenList=req.body.medicenList;
    var tempDate=new Date().toISOString();
    precord.date=tempDate.substring(0,10);
    console.log('*******************regRecord');//string.substring(0, length);
    console.log(precord.date);
    console.log('*******************regRecord');

    
    
    precord.save((err,doc)=>{
        if(!err){
            console.log("not errrrr");
            res.send(doc);}
        else{
          console.log("submit error in precord controller ");
          
        }
    });
   console.log('inside precord fn.');
}

module.exports.getRegRecordForList=(req,res)=>{
    console.log("in side get selected patient Reg REcords "+req);
    Precord.find({date:req.params.date},
        (err,patientrecords )=>{
        console.log("******########****");
        console.log(patientrecords);
        console.log("******########****");
            console.log("in in side patientrecords  findone");

            if(!patientrecords ){
                console.log("not found");
                // console.log(err);
                return res.status(404).json({status:false,message:'patientrecords  record not found. '});}
            else{
                console.log("found");
                // return res.status(200).json({status:true,patientrecords:__.pick(patientrecords ,['name','id'])});
                res.send(patientrecords);
            }
        });
}

/**
module.exports.deleteDoctor=(req,res)=>{
    Doctor.findByIdAndRemove(req.params._id,(err,docs)=>{
        if(!err){res.send(docs);}
        else{ console.log('Error in Deleting Doctor Records :' + JSON.stringify(err,undefined,2));}
    });
} */

module.exports.getPatientsRecordById=(req, res) => {
    console.log("in side getPatientsRecord");
    console.log(req.params);

    Precord.findById(req.params.id, (err, docs) => {
        console.log("fdfd");
        if (!err) { res.send(docs); }
        else {
            console.log('Error in Retriving Pateints Records By ID:' + JSON.stringify(err, undefined, 2));
            res.status(400).send(JSON.stringify("error"));
        }
    });

    console.log("f2222dfd");


}


module.exports.deletePatientRecord=(req,res)=>{

    
    Precord.findByIdAndRemove(req.params._id,(err,docs)=>{
        if(!err){res.send(docs);}
        else{ console.log('Error in Deleting Patient Records :' + JSON.stringify(err,undefined,2));}
    });
}



