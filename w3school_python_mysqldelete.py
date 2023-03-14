# Python MySQL Delete From By 

# Delete Record 
# To delete a record, or row, from a table, use the "DELETE FROM" statement: 

# Example - Delete any record where the address is "Mountain 21":

import mysql.connector # import MySQL Connector 

mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "mahanta1",
    database = "mydatabase"
) 

mycursor = mydb.cursor() 

# sql = "DELETE FROM customers WHERE address = 'Mountain 21'"

# mycursor.execute(sql) 

# mydb.commit()

# print(mycursor.rowcount, "record(s) deleted")


# Prevent SQL Injection 
# It is considered a good practice to escape the values of any query, also in delete statements. 
# This is to prevent SQL injections, which is a common web hacking 