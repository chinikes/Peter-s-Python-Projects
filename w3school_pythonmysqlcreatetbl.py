# Creating a table 
# To create a table in MySQL, use the "CREATE TABLE" statement 
# Make sure you define the name of the database when you create the connection. 


import mysql.connector # import MySQL Connector 

mydb = mysql.connector.connect(
    host = "localhost",
    user="root",
    password="mahanta1",
    database="mydatabase"
)

mycursor = mydb.cursor()

# mycursor.execute("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))")

# Primary Key 
# When creating a table, you should also create a column with a unique key for each record.
# We use the statement "INT AUTO_INCREMENT PRIMARY KEY" which will insert a unique number for each record.

mycursor.execute("ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY")

mycursor.execute("SHOW TABLES")

for x in mycursor:
    print(x)

