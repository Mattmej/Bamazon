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
Choosing this option will make a sql query which displays all Bamazon items which have less than 5 items in stock. If there are no items meeting that criteria, the console will inform the user that there is "no low inventory," and then the application will end.

__Add to Inventory__
Choosing this option will display the complete table of Bamazon products, then allows inquirer to ask the user to enter the ID of the item they wish to restock. If an invalid ID is entered, then the console will inform the user of this error, and the application will end. If a valid ID is entered, then the application will ask how many items they would like to add to the inventory. If a negative value is entered, then the application will tell the user that negative values will not be accepted, and the user will once again be asked how many items they would like to add. After the user enters a valid amount they would like to add, then the application will tell the user that the items have been added, and the sql table in the "bamazon" database will have their values updated accordingly.

__Add New Product__
When the user chooses this option, inquirer will present the user with three prompts:

1. Enter the name of the product you would like to add.
2. Enter the number of products you would like to add.
3. Enter the product's department name.
4. Enter the price of the product.

Entering valid values for all of the prompts will allow the application to attach a unique and random ID number from 1 to 9999 to the product, and then the application will update the "bamazon" database so that the product will be added to the table. 

If negative values are entered for the second and/or fourth prompt, then the application will tell the user that negative values are not accepted, and then the application will present the four prompts again.