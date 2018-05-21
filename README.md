# Bamazon

### Description

This project involves using node packages and the SQL programming language to create, edit, and display tables to a console.

Specifically, two JavaScript files simulate the possible functions of a customer and a manager, respectively, of a hypothetical online store named "Bamazon." A customer may view the items in Bamazon's stock, and may choose a product to buy and the quantity they wish to purchase. A manager may view Bamazon's stock, view inventory in need to restocking, add new items to the inventory, or add a new product to the inventory.

### Required Items

##### Node Packages
* columnify (optional; for formatting of the sql data)
* inquirer
* mysql

##### Other
* Node.js
* MySQL Workbench or another database design tool

### Details

This app runs via two JavaScript files executed with node. One JavaScript file contains functionality for a customer, and the other file contains functionality for a manager. Both files make connections to a database called "bamazon," and the sql seeds for this database is also contained in this directory. 

##### bamazonCustomer.js

This file first uses the mysql node package to make a sql query displaying all of Bamazon's items for sale to the console. Also included in the display is each item's ID, amount remaining, and price. After these items are displayed, the inquirer node package asks the user to enter the ID of the item they wish to purchase. If the user enters a non-existent ID, the application will inform the user that the ID is invalid, and the app will end. If the user enters an ID for an existing item, then inquirer will ask how many of that item the user wishes to purchase. If the amount of items the user wishes to purchase exceeds the amount in stock, the application will inform the user that there are not enough items in stock, and the application will end. If the user enters a valid amount of items to purchase, the application will display the total cost of the items, and the application will end. The table in the "bamazon" database will then have their values updated accordingly.

##### bamazonManager.js

When the user first opens this file, the inquirer package will display four possible tasks the manager can perform:

__View Products for Sale__
Choosing this option will make a sql query which displays the complete table of Bamazon products to the console.

__View Low Inventory__
Choosing this option will make a sql query which displays all Bamazon items which have less than 5 items in stock. If there are no items meeting that criteria, the console will inform the user that there is "no low inventory."

__Add to Inventory__
Choosing this option will display the complete table of Bamazon products, then allows inquirer to ask the user to enter the ID of the item they wish to restock. If an invalid ID is entered, then the console will inform the user of this error, and the application will end. If a valid ID is entered, then the application will ask how many items 