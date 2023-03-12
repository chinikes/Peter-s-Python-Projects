# Python MySQL Insert Into Table 

# Insert Into Table 

# To fill a table in MySQL, use the "INSERT INTO" statement.


import mysql.connector # import MySQL Connector 

mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "mahanta1",
    database = "mydatabase" 
) 

mycursor = mydb.cursor()

# sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
# val1 = ("Peter", "4293 Southampton Drive") 
# val2 = ("Amy", "1234 Main Street")

# mycursor.execute(sql, val1) 
# mycursor.execute(sql, val2) 

# mydb.commit() 

# print(mycursor.rowcount, "record inserted.")


# Insert Multiple Rows 
# To insert multiple rows into a table, use the executemany() method.

"""
sql = "INSERT INTO customers (name, address) VALUES (%s, %s)" 
val = [
    ('John', 'Highway 21'),
    ('Peter', 'Lowstreet 4'),
    ('Amy', 'Apple st 652'),
    ('Hannah', 'Mountain 21'),
    ('Michael', 'Valley 345'),
    ('Sandy', 'Ocean blvd 2'),
    ('Betty', 'Green Grass 1'),
    ('Richard', 'Sky st 331'),
    ('Susan', 'One way 98'),
    ('Vicky', 'Yellow Garden 2'),
    ('Ben', 'Park Lane 38'),
    ('William', 'Central st 954'),
    ('Chuck', 'Main Road 989'),
    ('Viola', 'Sideway 1633')
]

mycursor.executemany(sql, val)

mydb.commit()

print(mycursor.rowcount, "was inserted.")
"""

# Get Inserted ID
# You can get the id of the row you just inserted by asking the cursor object. 

# Example - Insert one row, and return the ID:
"""
sql = "INSERT INTO customers (name, address) VALUES (%s, %s)" 
val = ("Michelle", "Blue Village") 
mycursor.execute(sql, val) 
mydb.commit() 

print("1 record inserted, ID:", mycursor.lastrowid)
""" 

