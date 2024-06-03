const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../../models/Admin');

const dbUrl = 'mongodb+srv://domko:SmaH0gHdPhr1WyhB@domko.yxvsqww.mongodb.net/';

const connectionParams = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}


async function createAdmin(req, res) {
    await mongoose.connect(dbUrl, connectionParams);

    const { username, password, rePass } = req.body;

    if (password != rePass) {
        res.send(`<script>
        
        alert('Паролите не съвпадат!');
        window.location.href = '/admin/register';
        </script>`);
        return;
    }
    if (password.length < 6) {
        res.send(`<script>
        
        alert('Паролата трябва да е минимум 6 символа!');
        window.location.href = '/admin/register';
        </script>`);
        return;
    }
    if (username.length < 5) {
        res.send(`<script>
        
        alert('Потребителското име трябва да е минимум 5 символа!');
        window.location.href = '/admin/register';
        </script>`);
        return;
    }

    const hashedPass = await bcrypt.hash(password, 10);
    try {
        const admin = new Admin({
            username, hashedPass
        })
        await admin.save();
        req.session.admin = admin;
        res.redirect('/admin');
    } catch (e) {
        console.log(e);
    }
}

module.exports = { createAdmin };
