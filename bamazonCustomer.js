// Node package requirements
var columnify = require("columnify");
var mysql = require("mysql");
var inquirer = require("inquirer");

// Variable to hold sql connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "1@rv@1p10p519",
    database: "bamazon"
});

// Making the sql connection
connection.connect(function(error) {
    if (error) throw error;
    console.log("Connected as id " + connection.threadId + "\n");
    afterConnection();
});

// This function, which makes an sql query for all the table's products, will run after the sql connection is created.
function afterConnection() {
    connection.query("SELECT * FROM products", function(error, response) {
        if (error) throw error;
        console.log("\n\n" + columnify(response));
    })

    // Asks the user what product they wish to buy.
    idPrompt();

}

// Asks the user what product they wish to buy.
function idPrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID of the product you wish to buy.",
            name: "userIdChoice"
        }

    ])
    .then(function(response) {
        
        // Selects all products which have the id the user enterd.
        connection.query("SELECT * FROM products WHERE item_id=" + response.userIdChoice, function(error, response2) {
            if (error) throw error;
            console.log("\nItem Selected: " + Object.values(response2[0])[1]);
    
            // If the ID the user entered exists, then...
            if (Object.values(response2[0]).includes(parseInt(response.userIdChoice))) {

                // Asks the user how many items they would like to buy.
                itemNumberPrompt(response2[0]);
            }
    
            else {
                console.log("Item not found!");
                connection.end();
            }
        })
    })
}


// Asks the user how many items they would like to buy.
function itemNumberPrompt(product) {
    inquirer.prompt([
        {
            type: "input",
            message: "How many units would you like to buy?",
            name: "userProductNumber"
        }
    ])
    .then(function(response) {

        // If the user asks for more items than are in stock, then...
        if (response.userProductNumber > product.stock_quantity) {
            console.log("Insufficient Quantity!");
            connection.end();
        }

        else {
            
            // Finishes making the user's order
            fulfillOrder(product, response.userProductNumber);
        }

    })
}

// Finishes making the user's order
function fulfillOrder(product, userProductNumber) {
    connection.query("UPDATE products SET stock_quantity=stock_quantity-" + parseInt(userProductNumber) + " WHERE item_id=" + parseInt(product.item_id), function(error, response) {
        if (error) throw error;
        var totalCost = product.price * userProductNumber;
        console.log("\nYour order went through!");

        // Tells the user how much their order is.
        console.log("The total cost of your items is " + totalCost.toFixed(2));
        connection.end();
    })

}