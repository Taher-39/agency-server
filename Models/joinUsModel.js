const mongoose = require('mongoose');

const joinUsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    country: { type: String, required: true },
    city: { type: String, required: true },
    experience: { type: String, required: true },
    role: { type: String, required: true },
    gender: { type: String, required: true },
    resume: { type: String, required: true },
    memberStatus: { type: String, default: 'pending' },

});

const JoinUs = mongoose.model('JoinUs', joinUsSchema);

module.exports = JoinUs;
