const mongoose = require('mongoose');
const Rent = require('./models/Rent');

const dbUrl = 'mongodb+srv://domko:fSSNqd7zySE0aZdW@cluster0.soh1wrl.mongodb.net/';

const connectionParams = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}


async function deleteRentReq(req, res) {
    await mongoose.connect(dbUrl, connectionParams);

    const rentId = req.params.rentId;

    try {
        await Rent.findByIdAndDelete(rentId);
        res.redirect('/admin/rent');
    } catch (err) {
        console.log(err);
    } finally {
        mongoose.disconnect();
    }
}
module.exports = { deleteRentReq };