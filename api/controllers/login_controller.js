const $db = require('../config/db.inc');
const $bcrypt = require('bcrypt');
const $jwt = require('jsonwebtoken');

//To Have LoggedIn
exports.post = (req, res, next) => {
    const $sql = `SELECT * FROM signup WHERE user_email = '${req.body.user_email}'`;

    if (req.body.user_email === "" || req.body.user_password === "") {
        console.log(`Error: empty fields found`);
        res.status(404).json({
            Error: {
                message: `empty fields found`
            }
        });
    } else {
        $db.query($sql, (err, result) => {
            if (err) {
                console.log(`Error: ${err.message}`);
                res.status(404).json({
                    Error: {
                        message: err.message
                    }
                });
            } else if (result.length < 1) {
                console.log(`Error: user not found`);
                res.status(404).json({
                    Error: {
                        message: `user not found`
                    }
                });
            } else {
                $bcrypt.compare(req.body.user_password, result[0].user_password, (err, resp) => {
                    if (err) {
                        console.log(`Error: ${err.message}`);
                        res.status(409).json({
                            Error: {
                                message: err.message
                            }
                        });
                    } else if (resp) {
                        const $token = $jwt.sign({
                                Id: result[0].user_id,
                                EmailId: result[0].user_email,
                                Password: result[0].user_password
                            },
                            process.env.JWT_KEY, {
                                expiresIn: '1h'
                            });
                        console.log(`success: login successful!`);
                        res.status(200).json({
                            message: `login sucessful!`,
                            key: $token
                        });

                    } else {
                        console.log(`Error: invailid email or password`);
                        res.status(409).json({
                            Error: {
                                message: `invailid email or password`
                            }
                        })
                    }
                });
            }
        });
    }
};