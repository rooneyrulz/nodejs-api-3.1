const $db = require('../config/db.inc');
const $bcrypt = require('bcrypt');


//Posting Data To The DataBase
exports.post = (req, res, next) => {

    const $sql = `SELECT * FROM signup WHERE user_email = '${req.body.user_email}'`;

    $db.query($sql, (err, result) => {
        if (err) {
            console.log(`Error: ${err.message}`);
            res.status(404).json({
                Error: {
                    message: err.message
                }
            });
        } else if (result.length >= 1) {
            console.log(`Error: duplicate email id`);
            res.status(404).json({
                Error: {
                    message: `duplicate email id`
                }
            });
        } else {
            if (req.body.user_email === "" || req.body.user_password === "") {
                console.log(`Error: empty fields found`);
                res.status(404).json({
                    Error: {
                        message: `empty fields found`
                    }
                });
            } else {
                $bcrypt.hash(req.body.user_password, 10, (err, hash) => {
                    if (err) {
                        console.log(`Error: ${err.message}`);
                        res.status(409).json({
                            Error: {
                                message: err.message
                            }
                        });
                    } else {
                        const $sql = `INSERT INTO signup SET ?`;
                        const $data = { user_email: req.body.user_email, user_password: hash };

                        $db.query($sql, $data, (err, resp) => {
                            if (err) {
                                console.log(`Error: ${err.message}`);
                                res.status(404).json({
                                    Error: {
                                        message: err.message
                                    }
                                });
                            } else {
                                console.log(`success: data just posted`);
                                res.status(200).json({
                                    success: {
                                        message: `data just posted`
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
};



//Getting All The Data Form The DataBase
exports.getAll = (req, res, next) => {

    const $sql = `SELECT * FROM signup`;

    $db.query($sql, (err, result) => {
        if (err) {
            console.log(`Error: ${err.message}`);
            res.status(404).json({
                Error: {
                    message: err.message
                }
            });
        } else if (result.length < 1) {
            console.log(`Error: data not found`);
            res.status(404).json({
                Error: {
                    message: `users not found`
                }
            });
        } else {
            const $resp = result.map(user => {
                return {
                    EmailId: user.user_email,
                    Password: user.user_password,
                    Request: {
                        type: 'GET',
                        description: `follow the link bellow to get each users`,
                        url: `http://localhost:9090/signup/${user.user_id}`
                    }
                }
            });
            console.log(`success: ${result}`);
            res.status(200).json({
                message: `requested to get all the users`,
                success: $resp
            });
        }
    });
}



//Getting Unique Data From The DataBase
exports.getUnique = (req, res, next) => {

    const $userId = req.params.id;
    const $sql = `SELECT * FROM signup WHERE user_id = ${$userId}`;

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
            const $resp = {
                Id: result[0].user_id,
                EmailId: result[0].user_email,
                Password: result[0].user_password,
                Request: {
                    type: 'GET',
                    description: `follow the link bellow to get the all users`,
                    url: `http://localhost:9090/signup`
                }
            }
            console.log(`success: ${result}`);
            res.status(200).json({
                message: `requested to get the unique users`,
                success: $resp
            });

        }
    });
};



//Delete Data From The DataBases
exports.delete = (req, res, next) => {

    const $userId = req.params.id;
    const $sql = `SELECT * FROM signup WHERE user_id = ${$userId}`;

    $db.query($sql, (err, result) => {
        if (err) {
            console.log(`Error: ${err.message}`);
            res.status(404).json({
                Error: {
                    message: err.message
                }
            });
        } else if (result.length < 1) {
            console.log(`Error: data not found`);
            res.status(404).json({
                Error: {
                    message: `data not found`
                }
            });
        } else {
            const $sql = `DELETE FROM signup WHERE user_id = ${$userId}`;

            $db.query($sql, (err, result) => {
                if (err) {
                    console.log(`Error: ${err.message}`);
                    res.status(404).json({
                        Error: {
                            message: err.message
                        }
                    });
                } else {
                    console.log(`deleted: ${result}`);
                    res.status(200).json({
                        message: `data just deleted`,
                        Request: {
                            type: 'POST',
                            description: `follow the link bellow to make another user`,
                            url: `http://localhost:9090/signup`
                        }
                    });
                }
            });
        }
    });
}



//Patching Data In The DataBase
exports.patch = (req, res, next) => {

    const $userId = req.params.id;
    const $sql = `SELECT * FROM signup WHERE user_id = ${$userId}`;

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
                console.log(`Error: data not found`);
                res.status(404).json({
                    Error: {
                        message: `user not found`
                    }
                });
            } else if (result[0].user_email === req.body.user_email) {
                console.log(`Error: user already exist`);
                res.status(404).json({
                    Error: {
                        message: `user already exist`
                    }
                });
            } else {
                $bcrypt.hash(req.body.user_password, 10, (err, hash) => {
                    if (err) {
                        console.log(`Error: ${err.message}`);
                        res.status(409).json({
                            Error: {
                                message: err.message
                            }
                        });
                    } else {
                        const $sql = `UPDATE signup SET ? WHERE user_id = ${$userId}`;
                        const $data = { user_email: req.body.user_email, user_password: hash };
                        $db.query($sql, $data, (err, result) => {
                            if (err) {
                                console.log(`Error: ${err.message}`);
                                res.status(404).json({
                                    Error: {
                                        message: err.message
                                    }
                                });
                            } else {
                                console.log(`updated: ${result}`);
                                res.status(200).json({
                                    message: `requested to patch some data`,
                                    Request: {
                                        type: 'GET',
                                        description: `follow the link bellow to get user details you just patched`,
                                        url: `http://localhost:9090/signup/${$userId}`
                                    }
                                });
                            }
                        });
                    }
                })
            }
        });
    }
};