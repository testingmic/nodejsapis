const mongoose = require("mongoose");
const websiteSchema = mongoose.Schema({
    idsite: {
        type: Number,
        required: [true, 'The idsite value is required.']
    }
});

module.exports = mongoose.model('Websites', websiteSchema);