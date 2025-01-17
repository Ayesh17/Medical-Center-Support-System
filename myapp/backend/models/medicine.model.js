const mongoose=require('mongoose');

var medicineSchema=new mongoose.Schema({
    name:{
        type:String,
        required:'Full name can\'t be empty'
    },

    notes:{
        type:String
    },

    type:{
        type:String
    },
    dose:{
        type:Number
    },
    unit:{
        type:String
    },
    price:{
        type:Number
    },
    qty:{
        type:Number
    }

});

mongoose.model('medicine',medicineSchema);
