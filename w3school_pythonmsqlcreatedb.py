# Creating a Database 
# To create a database in MySQL, use the "CREATE DATABASE" statement.


# Import MySQL Connector 
import mysql.connector 

# Create Connection - Start by creating a connection to the database. Use the username and password from your MySQL database.

mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "mahanta1",
    database = "mydatabase"
)

# mycursor = mydb.cursor()

# mycursor.execute("CREATE DATABASE mydatabase") 


# Check if Database Exists 
# mycursor.execute("SHOW DATABASES")

# for x in mycursor:
#     print(x)


# Try connecting to the database "mydatabase"

