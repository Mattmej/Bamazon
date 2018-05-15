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

    idPrompt();

}

function idPrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID of the product you wish to buy.",
            name: "userIdChoice"
        }

    ])
    .then(function(response) {
        connection.query("SELECT * FROM products WHERE item_id=" + response.userIdChoice, function(error, response2) {
            if (error) throw error;
            console.log(Object.values(response2[0]));
            console.log(response.userIdChoice);
    
            if (Object.values(response2[0]).includes(parseInt(response.userIdChoice))) {
                // console.log(response2)
                // checkItemQuantity(response2[0], itemNumber);
                itemNumberPrompt(response2[0]);
            }
    
            else {
                console.log("Item not found!");
                connection.end();
            }
        })
    })
}



function itemNumberPrompt(product) {
    inquirer.prompt([
        {
            type: "input",
            message: "How many units would you like to buy?",
            name: "userProductNumber"
        }
    ])
    .then(function(response) {
        if (response.userProductNumber > product.stock_quantity) {
            console.log("Insufficient Quantity!");
        }

        else {
            console.log("Order went through!");
        }

        connection.end();
    })
}