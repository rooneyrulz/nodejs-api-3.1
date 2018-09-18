const $db = require('../config/db.inc');

//Posting To The DataBase
exports.post = (req, res, next) => {
    const $sql = `SELECT * FROM employee WHERE id = ${req.body.emp_id}`;
    $db.query($sql, (err, result) => {
        if (err) {
            console.log(`Error: ${err.message}`);
            res.status(404).json({
                Error: {
                    message: err.message
                }
            });
        } else if (result.length < 1) {
            console.log(`Error: employee id not valid..`);
            res.status(404).json({
                Error: {
                    message: `employee not found..`
                }
            });
        } else {
            const $sql = `SELECT * FROM customer WHERE contact_number = ${req.body.contact_number}`;
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
                    if (req.body.age < 20 || req.body.age > 70) {
                        console.log(`Error: sorry! ..`);
                        res.status(404).json({
                            Error: {
                                message: `sorry! your age is preventing ..`
                            }
                        });
                    } else {
                        const $data = {
                            name: req.body.name,
                            age: req.body.age,
                            gender: req.body.gender,
                            contact_number: req.body.contact_number,
                            country: req.body.country,
                            emp_id: req.body.emp_id
                        };
                        const $sql = `INSERT INTO customer SET ?`;

                        $db.query($sql, $data, (err, result) => {
                            if (err) {
                                console.log(`Error: ${err.message}`);
                                res.status(404).json({
                                    Error: {
                                        message: err.message
                                    }
                                });
                            } else {
                                console.log(`success: data just posted..`);
                                res.status(200).json({
                                    success: `data just successfully posted..`,
                                    request: {
                                        type: 'GET',
                                        description: `post the details of another customer..`,
                                        url: `http://localhost:9090/user/customer`
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    });
};


//Getting All Of The Data From The DataBase
exports.getAll = (req, res, next) => {
    const $sql = `SELECT * FROM customer`;
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
            const $resp = result.map(cust => {
                return {
                    Id: cust.id,
                    Name: cust.name,
                    Age: cust.age,
                    Gender: cust.gender,
                    Contact_number: cust.contact_number,
                    Country: cust.country,
                    Joined_date: cust.joined_date,
                    Eployee_id: cust.emp_id,
                    request: {
                        type: 'GET',
                        description: `follow the link bellow to get more about ${cust.name}`,
                        url: `http://localhost:9090/user/customer/${cust.id}`
                    }
                }
            });
            console.log(`recieved: ${result}`);
            res.status(200).json({
                message: `all of the customers recieved..`,
                success: $resp
            });
        }
    });
};


//Getting Customer Info By Id
exports.getUnique = (req, res, next) => {
    const $cusId = req.params.id;
    const $sql = `SELECT * FROM customer WHERE id = ${$cusId}`;
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
                Age: result[0].age,
                Gender: result[0].gender,
                Contact_number: result[0].contact_number,
                Country: result[0].country,
                Joined_date: result[0].joined_date,
                Eployee_id: result[0].emp_id,
                request: {
                    type: 'GET',
                    description: `follow the link bellow to get the employee info of ${result[0].name}`,
                    url: `http://localhost:9090/user/employee/${result[0].emp_id}`
                }
            };
            console.log(`recieved: ${result[0]}`);
            res.status(200).json({
                message: `data just recieved..`,
                success: $resp
            });
        }
    });
};


//Delete Data From The DataBase
exports.delete = (req, res, next) => {
    const $cusId = req.params.id;
    const $sql = `SELECT * FROM customer WHERE id = ${$cusId}`;
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
            const $sql = `DELETE FROM customer WHERE id = ${$cusId}`;
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
                        success: `data just deleted..`,
                        request: {
                            type: 'POST',
                            description: `post another customer`,
                            url: `http://localhost:9090/user/customer`
                        }
                    });
                }
            });
        }
    });
};



//Updating Data On The DataBase
exports.patch = (req, res, next) => {
    const $cusId = req.params.id;
    const $sql = `SELECT * FROM customer WHERE id = ${$cusId}`;
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
            const $sql = `UPDATE customer SET ? WHERE id = ${$cusId}`;
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
                            description: `follow the link bellow to get customer details you just updated..`,
                            url: `http://localhost:9090/user/customer/${$cusId}`
                        }
                    });
                }
            });
        }
    });
};