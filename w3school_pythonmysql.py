# Python MySQL 

# Python can be used in database applications.
# One of the most poupular databases is MySQL.  

# Import MySQL Connector 
import mysql.connector 

# Create Connection - Start by creating a connection to the database. Use the username and password from your MySQL database.

mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "mahanta1"
) 

print(mydb)