const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/text-mmorpg', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Player = mongoose.model('Player',{
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Email is not valid');
            }
        }
    },
    age: {
        type: Number,
        default: 20,
        validate(value){
            if(value < 1){
                throw new Error('Age must be strictly positive')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            console.log(value.includes('password'))
        }
    }

});

const me = Player({
    name:'Elouan',
    age: 2,
    email: 'erogliano@artfx.fr',
    password: 'Machinchose'
});

me.save().then(() => {
    console.log(me);
}).catch((error)=> {
    console.log('Error: ', error);
});