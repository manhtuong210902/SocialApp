const mongoose = require('mongoose');

//function connect to database
const connnect = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://ManhTuong:manh210902@chat-app.oiearro.mongodb.net/?retryWrites=true&w=majority`,
        );
        console.log('connnect db sucessfully');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = { connnect };
