const $db = require('../config/db.inc');

//Posting Data To The Table Of Employee
exports.post = (req, res, next) => {
    if (req.body.first_name === "" || req.body.last_name === "" || req.body.age === "" || req.body.email === "" || req.body.contact_number === "" || req.body.gender === "" || req.body.working_hours === "" || req.body.dep_id === "") {
        console.log(`Error: empty fields found..`);
        res.status(404).json({
            Error: {
                message: `empty fields found..`
            }
        });
    } else {
        const $sql = `SELECT * FROM department WHERE id = ${req.body.dep_id}`;
        $db.query($sql, (err, result) => {
            if (err) {
                console.log(`Error: ${err.message}`);
                res.status(404).json({
                    Error: {
                        message: err.message
                    }
                });
            } else if (result.length < 1) {
                console.log(`Error: invailid department id..`);
                res.status(404).json({
                    Error: {
                        message: `department not found..`
                    }
                });
            } else {
                const $sql = `SELECT * FROM employee WHERE email = '${req.body.email}'`;
                $db.query($sql, (err, result) => {
                    if (err) {
                        console.log(`Error: ${err.message}`);
                        res.status(404).json({
                            Error: {
                                message: err.message
                            }
                        });
                    } else if (result.length >= 1) {
                        console.log(`Error: invailid email id..`);
                        res.status(404).json({
                            Error: {
                                message: `invailid email id..`
                            }
                        });
                    } else {
                        const $sql = `SELECT * FROM employee WHERE contact_number = '${req.body.contact_number}'`;
                        $db.query($sql, (err, result) => {
                            if (err) {
                                console.log(`Error: ${err.message}`);
                                res.status(404).json({
                                    Error: {
                                        message: err.message
                                    }
                                });
                            } else if (result.length >= 1) {
                                console.log(`Error: invailid contact number..`);
                                res.status(404).json({
                                    Error: {
                                        message: `invailid contact number..`
                                    }
                                });
                            } else {
                                const $data = { first_name: req.body.first_name, last_name: req.body.last_name, age: req.body.age, email: req.body.email, contact_number: req.body.contact_number, gender: req.body.gender, working_hours: req.body.working_hours, dep_id: req.body.dep_id };
                                const $sql = `INSERT INTO employee SET ?`;

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
                                            message: `data posted..`,
                                            result: {
                                                type: 'GET',
                                                description: 'follow the link bellow to get all the employees',
                                                url: `http://localhost:9090/user/employee`
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
    const $sql = `SELECT * FROM employee`;
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
            const $resp = result.map(emp => {
                return {
                    Id: emp.id,
                    First_name: emp.first_name,
                    Last_name: emp.last_name,
                    Age: emp.age,
                    Email: emp.email,
                    Contact_number: emp.contact_number,
                    Gender: emp.gender,
                    Working_hours: emp.working_hours,
                    Joined_date: emp.joined_date,
                    Department_id: emp.dep_id,
                    request: {
                        type: "GET",
                        description: `follow the link bellow to get more info of ${emp.first_name}`,
                        url: `http://localhost:9090/user/employee/${emp.id}`
                    }

                }
            });
            console.log(`recieved: ${result}`);
            res.status(200).json({
                message: `requested to get all the data`,
                success: $resp
            });
        }
    });
};



//Getting Employee By Id
exports.getUnique = (req, res, next) => {
    const $empId = req.params.id;
    const $sql = `SELECT * FROM employee WHERE id = ${$empId}`;
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
                First_name: result[0].first_name,
                Last_name: result[0].last_name,
                Age: result[0].age,
                Email: result[0].email,
                Contact_number: result[0].contact_number,
                Gender: result[0].gender,
                Working_hours: result[0].working_hours,
                Joined_date: result[0].joined_date,
                Department_id: result[0].dep_id,
                request: {
                    type: 'GET',
                    description: `follow the link bellow to get the department info of ${result[0].first_name}`,
                    url: `http://localhost:9090/user/department/${result[0].dep_id}`
                }
            };
            console.log(`recieved: ${result[0]}`);
            res.status(200).json({
                message: `requested to get data by id`,
                success: $resp
            });
        }
    });
};


//Delete Employee From The DataBase
exports.delete = (req, res, next) => {
    const $empId = req.params.id;
    const $sql = `SELECT * FROM employee WHERE id = ${$empId}`;
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
            const $sql = `DELETE FROM employee WHERE id = ${$empId}`;
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
                        message: `data just deleted..`,
                        success: {
                            type: 'POST',
                            description: `post another employee`,
                            url: `http://localhost:9090/user/employee`
                        }
                    });
                }
            });
        }
    });
};


//Patching Data On The DataBase
exports.patch = (req, res, next) => {
    const $empId = req.params.id;
    const $sql = `SELECT * FROM employee WHERE id = ${$empId}`;
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
            const $sql = `UPDATE employee SET ? WHERE id = ${$empId}`;
            $db.query($sql, req.body, (err, result) => {
                if (err) {
                    console.log(`Error: ${err.message}`);
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
                            description: `follow the link bellow to get employee details you just updated..`,
                            url: `http://localhost:9090/user/employee/${$empId}`
                        }
                    });
                }
            });
        }
    });
};