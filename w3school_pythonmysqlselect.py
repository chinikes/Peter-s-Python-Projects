# Python MySQL Selec From

# Select From a Table 
# To select from a table in MySQL, use the "SELECT" statement:

# Example - Select all records from the "customers" table, and display the result: 

import mysql.connector # import MySQL Connector 

mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "mahanta1",
    database = "mydatabase"
)

mycursor = mydb.cursor()

# mycursor.execute("SELECT * FROM customers") 

# myresult = mycursor.fetchall()

# for x in myresult:
#     print(x)    


# Selecting Columns 
# To select only some of the columns in a table, use the "SELECT" statement followed by the column name(s): 

# Example - Select only the name and address columns: 
mycursor.execute("SELECT name, address FROM customers") 

myresult = mycursor.fetchall() 

for x in myresult:
    print(x)