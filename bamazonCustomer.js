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
    console.log("Connected as id " + connection.threadId + "\n");
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function(error, response) {
        if (error) throw error;
        console.log("\n\n" + columnify(response));
    })

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
            console.log("\nItem Selected: " + Object.values(response2[0])[1]);
    
            if (Object.values(response2[0]).includes(parseInt(response.userIdChoice))) {

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
            connection.end();
        }

        else {
            fulfillOrder(product, response.userProductNumber);
        }

    })
}

function fulfillOrder(product, userProductNumber) {
    connection.query("UPDATE products SET stock_quantity=stock_quantity-" + parseInt(userProductNumber) + " WHERE item_id=" + parseInt(product.item_id), function(error, response) {
        if (error) throw error;
        var totalCost = product.price * userProductNumber;
        console.log("\nYour order went through!");
        console.log("The total cost of your items is " + totalCost.toFixed(2));
        connection.end();
    })

}