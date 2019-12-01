const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise

// Define userSchema
const chatSchema = new Schema({


    username: {
        type: String,
        require: true
    },

    message: {

        type: String,
        unique: false,
        required: false
    }

});

// // Define schema methods
// userSchema.methods = {
//     checkPassword: function (inputPassword) {
//         return bcrypt.compareSync(inputPassword, this.password)
//     },
//     hashPassword: plainTextPassword => {
//         return bcrypt.hashSync(plainTextPassword, 10)
//     }
// }

// // Define hooks for pre-saving
// userSchema.pre('save', function (next) {
//     if (!this.password) {
//         console.log('models/user.js =======NO PASSWORD PROVIDED=======')
//         next()
//     } else {
//         console.log('models/user.js hashPassword in pre save');

//         this.password = this.hashPassword(this.password)
//         next()
//     }
// })

const Chat = mongoose.model('chat', chatSchema)
module.exports = Chat;