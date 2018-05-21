# Bamazon

### Description

This project involves using node packages and the SQL programming language to create, edit, and display tables to a console.

Specifically, two JavaScript files simulate the possible functions of a customer and a manager, respectively, of a hypothetical online store named "Bamazon." A customer may view the items in Bamazon's stock, and may choose a product to buy and the quantity they wish to purchase. A manager may view Bamazon's stock, view inventory in need to restocking, add new items to the inventory, or add a new product to the inventory.

### Required Items

##### Node Packages
* columnify
* inquirer
* mysql

##### Other
* Node.js
* MySQL Workbench or another database design tool

### Details

This app runs via two JavaScript files executed with node. One JavaScript file contains functionality for a customer, and the other file contains functionality for a manager. Both files make connections to a database called "bamazon," and the sql seeds for this database is also contained in this directory. 

##### bamazonCustomer.js

This file first uses the mysql node package to make a sql query displaying all of Bamazon's items for sale to the console. Also included in the display is each item's ID, amount remaining, and price. After these items are displayed, the inquirer node package asks the user to enter the ID of the item they wish to purchase. If the user enters a non-existent ID, the application will inform the user that the ID is invalid, and the app will end. If the user enters an ID for an existing item, then 


which product they would like to purchase