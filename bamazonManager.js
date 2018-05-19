var columnify = require("columnify");
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "1@rv@1p10p519",
    database: "bamazon"
});

connection.connect(function (error) {
    if (error) throw error;
    console.log("Connected as id " + connection.threadId + "\n");
    managerPrompt();
});

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
                    // addNewProduct();
                    testAdd();
            }
            // console.log(response.choices);
            // console.log(response);
        })
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (error, response) {
        if (error) throw error;
        console.log("\n" + columnify(response));
        // connection.end();
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity<5", function (error, response) {
        if (error) throw error;
        console.log("\n" + columnify(response));
        connection.end();
    })
}

function addToInventory() {
    viewProducts();

    // connection.query("SELECT * FROM products", function(error, response) {
    //     if (error) throw error;
    //     console.log("\n" + columnify(response));
    //     connection.end();
    // });





    console.log("\n");
    inquirer.prompt([
        {
            type: "input",
            message: "Select an item ID for the product you wish to restock. \n",
            name: "restockedItem"   // the item id that user wishes to restock.
        }
    ])
        .then(function (response) {
            // if (response.restockedItem)
            // console.log(response);
            connection.query("SELECT * FROM products WHERE item_id=" + response.restockedItem, function (error, response2) {
                if (error) throw error;

                console.log(response2);

                if (Object.values(response2[0]).includes(parseInt(response.restockedItem))) {
                    // restock(response2, response.restockedItem);
                    restock(response.restockedItem);
                }

                else {
                    console.log("Item not found!");
                    connection.end();
                }
            })
        })
}

// function restock(item, id) {

// }

function restock(item_id) {
    inquirer.prompt([
        {
            type: "input",
            message: "How many items would you like to add?",
            name: "numberRestocked"
        }
    ])
        .then(function (response) {
            connection.query("UPDATE products SET stock_quantity=stock_quantity+" + parseInt(response.numberRestocked) + " WHERE item_id=" + parseInt(item_id), function (error, response2) {
                if (error) throw error;

                console.log("\n" + response.numberRestocked + " items added!");
                connection.end();
            })
        })
}

// function addNewProduct() {
//     inquirer.prompt([
//         {
//             type: "input",
//             message: "Enter the name of the product you would like to add.",
//             name: "addedProduct",
//             validate: function (name) {
//                 return name !== "";
//             }
//         },

//         {
//             type: "input",
//             message: "Enter the number of products you would like to add.",
//             name: "numberOfProducts",
//             validate: function (name) {
//                 return name !== "";
//             }
//         },

//         {
//             type: "input",
//             message: "Enter the product's department name.",
//             name: "productDepartment",
//             validate: function(name) {
//                 return name !== "";
//             }
//         },

//         {
//             type: "input",
//             message: "Enter the price of the product.",
//             name: "productPrice",
//             validate: function (name) {
//                 return name !== "";
//             }
//         }
//     ])
//         .then(function (response) {
            
//             // assignId();
//             const INSERT = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (" 
//             + response.addedProduct + ", " + response.productDepartment + ", " + parseInt(response.productPrice).toFixed(2) + ", " + parseInt(response.numberofProducts) + ");";
//             connection.query(INSERT, function (error, response) {
//                 if (error) throw error;

//                 console.log(INSERT);
//                 console.log("Product Added!");
//                 connection.end();
//             })
//         })
// }

function testAdd() {
    inquirer.prompt([
        {
        type: "confirm",
        message: "Add test value?",
        name: "confirmTest",
        default: true
        }

    ])
    .then(function(response) {
        if (response.confirmTest === true) {
            connection.query("INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES (1234, 'Tweezers', 'Target', 1.00, 50)", function(error, response) {
                if (error) throw error;
                console.log("Product Added!");
            })
        }
    })
}

// function assignId() {

// }