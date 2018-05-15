var columnify = require("columnify");
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "1@rv@1p10p519",
    database: "bamazon"
});

connection.connect(function(error) {
    if (error) throw error;
    console.log("Connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    // connection.query("SELECT * FROM products", function(error, response) {
    //     if (error) throw error;
    //     // console.log("\n" + columnify(response));
    //     console.log(response);
    //     promptUser();
    //     connection.end();
    // })

    // checkItemId(3123);
    promptUser();
    // connection.end();
}

function promptUser() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID of the product you wish to buy.",
            name: "userIdChoice"
        },

        {
            type: "input",
            message: "How many units would you like to buy?",
            name: "userProductNumber"
        }

    ])
    .then(function(response1) {
        checkItemId(response1.userIdChoice, response1.userProductNumber);
    })
}

function checkItemId(ID, itemNumber) {
    connection.query("SELECT * FROM products WHERE item_id=" + ID, function(error, response2) {
        if (error) throw error;
        // console.log(response);
        // console.log(Object.values(response2[0]));

        if (Object.values(response2[0]).includes(ID)) {
            // console.log(response2)
            checkItemQuantity(response2[0], itemNumber);
        }

        else {
            console.log("Item not found!");
            connection.end();
        }
    })
}

function checkItemQuantity(product, itemNumber) {
    if (itemNumber > product.stock_quantity) {
        console.log("Insufficient Quantity!");
    }

    else {
        console.log("Order went through!");
    }
    connection.end();
}