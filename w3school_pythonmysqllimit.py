# Python MySQL Limit 

# Limit the Result 
# To limit the result in MySQL, use the "LIMIT" statement: 

# Example - Return the 5 first records of the "customers" table: 

import mysql.connector # import MySQL Connector

mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "mahanta1",
    database = "mydatabase"
) 

mycursor = mydb.cursor() 

""" 
mycursor.execute("SELECT * FROM customers LIMIT 5")

myresult = mycursor.fetchall() 

for x in myresult:
    print(x) 

""" 

# Start From Another Position 
# If you want to return five records, starting from the third record, you can use the "OFFSET" keyword: 

# Example - Return five records, starting from the third record: 

mycursor.execute("SELECT * FROM customers LIMIT 5 OFFSET 2") 

myresult = mycursor.fetchall()

for x in myresult:
    print(x) 