# Python MySQL Update Table 

# Update Table 
# You can update existing records in a table by using the "UPDATE" statement: 

# Example - Update the address column from "Valley 345" to "Canyon 123": 

import mysql.connector # import MySQL Connector 

mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "mahanta1",
    database = "mydatabase"
) 

mycursor = mydb.cursor()

"""
sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"

mycursor.execute(sql) 

mydb.commit() 

print(mycursor.rowcount, "record(s) affected")

""" 

# Prevent SQL Injection 
# It is considered a good practice to escape the values of any query, also in update statements. 
# This is to prevent SQL injections, which is a common web hacking technique to destroy or misuse your database.
# The mysql.connector uses the placeholder %s to escape values in the delete statement: 

sql = "UPDATE customers SET address = %s WHERE address = %s" 
val = ("Valley 345", "Canyon 123")

mycursor.execute(sql, val) 

mydb.commit() 

print(mycursor.rowcount, "record(s) affected") 