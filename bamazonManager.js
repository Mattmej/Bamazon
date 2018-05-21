// Node package requirements
var columnify = require("columnify");
var inquirer = require("inquirer");
var mysql = require("mysql");

// Variable to hold sql connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "1@rv@1p10p519",
    database: "bamazon"
});

// Making the sql connection
connection.connect(function (error) {
    if (error) throw error;

    // This will display once user is connected.
    console.log("Connected as id " + connection.threadId + "\n");

    // This function will give the manager options.
    managerPrompt();
});

// The main function which will give the manager various options.
function managerPrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: "Select an option.",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "managerChoice"
        }
    ])
        .then(function (response) {
            switch (response.managerChoice) {
                case "View Products for Sale":
                    viewProducts();
                    connection.end();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addToInventory();
                    break;
                case "Add New Product":
                    addNewProduct();
            }

        })
}

// Allows the manager to view the table of products
function viewProducts() {
    connection.query("SELECT * FROM products", function (error, response) {
        if (error) throw error;
        console.log("\n" + columnify(response));
    });
}

// Allows the manager to view any items for which the stock of items is less than 5.
function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity<5", function (error, response) {
        if (error) throw error;

        // If the response is an empty array, then...
        if (response.length === 0) {
            console.log("No low inventory!");
        }

        else {
            console.log("\n" + columnify(response));
        }
        connection.end();
    })
}

// Allows the manager to add existing items to the inventory.
function addToInventory() {

    // Shows a list of products.
    viewProducts();

    console.log("\n");

    inquirer.prompt([
        {
            type: "input",
            message: "Select an item ID for the product you wish to restock.",
            name: "restockedItem"   // the item id that user wishes to restock.
        }
    ])
        .then(function (response) {

            connection.query("SELECT * FROM products WHERE item_id=" + response.restockedItem, function (error, response2) {
                if (error) throw error;

                // If response2 is an empty array, then...
                if (response2.length === 0) {
                    console.log("\nItem not found!");
                    connection.end();
                }

                else {
                    console.log("\nItem Selected: " + response2[0].product_name);

                    // Restocks the item the manager has selected.
                    restock(response.restockedItem);
                }
            })
        })
}

// Part of the addToInventory() function.
// Restocks the item the manager has selected.
function restock(item_id) {
    inquirer.prompt([
        {
            type: "input",
            message: "How many items would you like to add?",
            name: "numberRestocked",
            validate: function (name) {
                return name !== "";
            }
        }   
    ])
        .then(function (response) {


            if (parseInt(response.numberRestocked) < 0) {
                console.log("\nNegative values are not valid!\n");
                // connection.end();
                restock(item_id);
            }


            else {
                connection.query("UPDATE products SET stock_quantity=stock_quantity+" + parseInt(response.numberRestocked) + " WHERE item_id=" + parseInt(item_id), function (error, response2) {
                    if (error) throw error;

                    console.log("\n" + response.numberRestocked + " items added!");
                    connection.end();
                })
            }
        })
}

// Allows the manager to add a new product to the table.
function addNewProduct() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the name of the product you would like to add.",
            name: "addedProduct",
            validate: function (name) {
                return name !== "";
            }
        },

        {
            type: "input",
            message: "Enter the number of products you would like to add.",
            name: "numberOfProducts",
            validate: function (name) {
                return name !== "";
            }
        },

        {
            type: "input",
            message: "Enter the product's department name.",
            name: "productDepartment",
            validate: function(name) {
                return name !== "";
            }
        },

        {
            type: "input",
            message: "Enter the price of the product.",
            name: "productPrice",
            validate: function (name) {
                return name !== "";
            }
        }
    ])
        .then(function (response) {

            // if (parseInt(response.numberOfProducts) < 0) {
            //     console.log("Negative amounts are not valid!");
            //     addNewProduct();
            // }

            // else if (parseInt(response.productPrice) < 0) {
            //     console.log("Negative prices are not valid!");
            //     addNewProduct();
            // }

            if (parseInt(response.numberOfProducts) < 0 || response.productPrice < 0) {
                console.log("\nNegative values are not valid!\n");
                addNewProduct();
            }

            else {

                // Assigns a random id to the added product, then finishes adding the item to the table.
                assignId(response.addedProduct, response.numberOfProducts, response.productDepartment, response.productPrice);
            }

            
        })
}

// Assign a random id to the added product
function assignId(product, quantity, department, price) {

    connection.query("SELECT item_id FROM products", function(error, response) {
        if (error) throw error;

        // Selects a new random id number from 1 to 9999.
        var randomId = Math.floor(Math.random() * 10000) + 1;

        // Holds the current product IDs
        var idValueArray = [];

        // Adds the product IDs to the idValueArray
        for (i = 0; i < response.length; i++) {
            idValueArray.push(response[i].item_id);
        }
        
        // If the random id already exists, then...
        if (idValueArray.includes(randomId)) {

            // Runs the function again, in effect choosing a new random id.
            assignId(); 
        }

        else {

            // Finishes adding the product to the table.
            finishAddProduct(randomId, product, quantity, department, price);
        }
       
    })
    
}


// Finishes adding the product to the table
function finishAddProduct(randomId, product, quantity, department, price) {
    const INSERT = "INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES (" + parseInt(randomId) + ", '" + product + "', '" + department + "', " + parseInt(price).toFixed(2) + ", " + parseInt(quantity) + ")";
    connection.query(INSERT, function (error, response2) {
        if (error) throw error;

        console.log("Product Added!");
        connection.end();
    })
}

