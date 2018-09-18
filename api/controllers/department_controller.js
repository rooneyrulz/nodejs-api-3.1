const $db = require('../config/db.inc');


//Posting Data To The DataBase
/*
id, name, email, contact_number, website, location, brances, working_field, zipcode, about
*/
exports.post = (req, res, next) => {
    if (req.body.name === "" || req.body.contact_number === "" || req.body.website === "" || req.body.location === "" || req.body.brances === "" || req.body.working_field === "" || req.body.zipcode === "") {
        console.log(`Error: empty fields found`);
        res.status(404).json({
            Error: {
                message: `you just want to fill out all the fields`
            }
        });
    } else {
        const $sql = `SELECT * FROM department WHERE email = '${req.body.email}'`;
        $db.query($sql, (err, result) => {
            if (err) {
                console.log(`Error: ${err.message}`);
                res.status(404).json({
                    Error: {
                        message: err.message
                    }
                });
            } else if (result.length >= 1) {
                console.log(`Error: invailid email id`);
                res.status(404).json({
                    Error: {
                        message: `invailid email id`
                    }
                });
            } else {
                const $sql = `SELECT * FROM department WHERE contact_number = ${req.body.contact_number}`;
                $db.query($sql, (err, result) => {
                    if (err) {
                        console.log(`Error: ${err.message}`);
                        res.status(404).json({
                            Error: {
                                message: err.message
                            }
                        });
                    } else if (result.length >= 1) {
                        console.log(`Error: invailid contact number`);
                        res.status(404).json({
                            Error: {
                                message: `invailid contact number`
                            }
                        });
                    } else {
                        const $sql = `SELECT * FROM department WHERE website = '${req.body.website}'`;
                        $db.query($sql, (err, result) => {
                            if (err) {
                                console.log(`Error: ${err.message}`);
                                res.status(404).json({
                                    Error: {
                                        message: err.message
                                    }
                                });
                            } else if (result.length >= 1) {
                                console.log(`Error: invailid website`);
                                res.status(404).json({
                                    Error: {
                                        message: `invailid website`
                                    }
                                });
                            } else {
                                const $sql = `SELECT * FROM department WHERE zipcode = ${req.body.zipcode}`;

                                $db.query($sql, (err, result) => {
                                    if (err) {
                                        console.log(`Error: ${err.message}`);
                                        res.status(404).json({
                                            Error: {
                                                message: err.message
                                            }
                                        });
                                    } else if (result.length >= 1) {
                                        console.log(`Error: invailid zipcode`);
                                        res.status(404).json({
                                            Error: {
                                                message: `invailid zipcode`
                                            }
                                        });
                                    } else {
                                        const $sql = `INSERT INTO department SET ?`;
                                        const $data = { name: req.body.name, email: req.body.email, contact_number: req.body.contact_number, website: req.body.website, location: req.body.location, brances: req.body.brances, working_field: req.body.working_field, zipcode: req.body.zipcode, about: req.body.about };

                                        $db.query($sql, $data, (err, result) => {
                                            if (err) {
                                                console.log(`Error: ${err.message}`);
                                                res.status(404).json({
                                                    Error: {
                                                        message: err.message
                                                    }
                                                });
                                            } else {
                                                console.log(`posted: ${result}`);
                                                res.status(200).json({
                                                    success: {
                                                        message: `data just posted`,
                                                        request: {
                                                            type: 'GET',
                                                            description: `follow the link bellow to get all departments`,
                                                            url: `http://localhost:9090/user/department`
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
};



//Getting All The Data From The DataBase
exports.getAll = (req, res, next) => {
    const $sql = `SELECT * FROM department`;

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
            const $resp = result.map(dep => {
                return {
                    Id: dep.id,
                    Name: dep.name,
                    Email: dep.email,
                    Contact_number: dep.contact_number,
                    Website: dep.website,
                    Location: dep.location,
                    Brances: dep.brances,
                    Working_field: dep.working_field,
                    Zipcode: dep.zipcode,
                    About: dep.about,
                    request: {
                        type: 'GET',
                        description: `follow the link bellow to get each department`,
                        url: `http://localhost:9090/user/department/${dep.id}`
                    }
                }
            });
            console.log(`recieved: ${result}`);
            res.status(200).json({
                message: `recieved all the data`,
                success: $resp
            });
        }
    });
};



//Getting Unique Data Which You Want
exports.getUnique = (req, res, next) => {
    const $depId = req.params.id;
    const $sql = `SELECT * FROM department WHERE id = ${$depId}`;

    $db.query($sql, (err, result) => {
        if (err) {
            console.log(`Error: ${err.message}`);
            res.status(404).json({
                Error: {
                    message: err.message
                }
            });
        } else if (result.length < 1) {
            console.log(`Error: data not found..`);
            res.status(404).json({
                Error: {
                    message: `data not found..`
                }
            });
        } else {
            const $resp = {
                Id: result[0].id,
                Name: result[0].name,
                Email: result[0].email,
                Contact_number: result[0].contact_number,
                Website: result[0].website,
                Location: result[0].location,
                Brances: result[0].brances,
                Working_field: result[0].working_field,
                Zipcode: result[0].zipcode,
                About: result[0].about,
                request: {
                    type: 'GET',
                    description: `follow the link bellow to get all the details of department`,
                    url: `http://localhost:9090/user/department`
                }
            };
            console.log(`recieved: ${result}`);
            res.status(200).json({
                message: `received data`,
                success: $resp
            });
        }
    });
};



//Delete Data From The DataBase
exports.delete = (req, res, next) => {
    const $depId = req.params.id;
    const $sql = `SELECT * FROM department WHERE id = ${$depId}`;

    $db.query($sql, (err, result) => {
        if (err) {
            console.log(`Error: ${err.message}`);
            res.status(404).json({
                Error: {
                    message: err.message
                }
            });
        } else if (result.length < 1) {
            console.log(`Error: data not found..`);
            res.status(404).json({
                Error: {
                    message: `data not found..`
                }
            });
        } else {
            const $sql = `DELETE FROM department WHERE id = ${$depId}`;
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
                        success: `data successfully deleted..`,
                        request: {
                            type: 'POST',
                            description: `let's post another department's datails`,
                            url: `http://localhost:9090/user/department`
                        }
                    });
                }
            });
        }
    });
}


//Patch Data On The DataBase
exports.patch = (req, res, next) => {
    const $depId = req.params.id;
    const $sql = `SELECT * FROM department WHERE id = ${$depId}`;
    $db.query($sql, (err, result) => {
        if (err) {
            console.log(`Error: ${err}`);
            res.status(404).json({
                Error: {
                    message: err.message
                }
            });
        } else if (result.length < 1) {
            console.log(`Error: data not found..`);
            res.status(404).json({
                Error: {
                    message: `data not found..`
                }

            });
        } else {
            const $sql = `UPDATE department SET ? WHERE id = ${$depId}`;
            $db.query($sql, req.body, (err, result) => {
                if (err) {
                    console.log(`Error: ${err}`);
                    res.status(404).json({
                        Error: {
                            message: err.message
                        }
                    });
                } else {
                    console.log(`patched: ${result}`);
                    res.status(200).json({
                        success: `data just updated..`,
                        request: {
                            type: 'GET',
                            description: `follow the link bellow to get the department you just updated..`,
                            url: `http://localhost:9090/user/department/${$depId}`
                        }
                    });
                }
            });
        }
    });
};