const router = require("express").Router();
const userRoutes = require("./user.js");
// const mysql = require("mysql2");
// const connection = mysql.createConnection({
//     host: "hcm4e9frmbwfez47.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//     user: "dq1vocex9imr5voq",
//     password: "q32zx4na7260vbkq",
//     database: "vzqlt1dmmjo19zll"
// });
// connection.connect(err => {
//     if (err) {
//         return err;
//     }
// });


router.use("/", userRoutes);


module.exports = router;