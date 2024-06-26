const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../../models/Admin');

const dbUrl = 'mongodb+srv://domko:SmaH0gHdPhr1WyhB@domko.yxvsqww.mongodb.net/';

const connectionParams = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}


async function loginAdmin(req, res) {
    await mongoose.connect(dbUrl, connectionParams);

    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if(admin){
            const comparedPass = await bcrypt.compare(password, admin.hashedPass);

            if(comparedPass){
                req.session.admin = admin.toJSON();
                res.redirect('/admin');
            } else {
                res.send(`<script>
        
                alert('Невалидни данни!');
                window.location.href = '/admin/login';
                </script>`);
            }
        } else {
            res.send(`<script>
        
                alert('Невалидни данни!');
                window.location.href = '/admin/login';
                </script>`);

        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = { loginAdmin };
