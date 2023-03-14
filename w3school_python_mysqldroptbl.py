# Python MySQL Drop Table 

# Delete a Table 
# You can delete an existing table by using the "DROP TABLE" statement: 

# Example - Delete the "customers" table: 

import mysql.connector # import MySQL Connector 

mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "mahanta1",
    database = "mydatabase"
) 

mycursor = mydb.cursor() 

sql = "DROP TABLE IF EXISTS customers" 

mycursor.execute(sql) 