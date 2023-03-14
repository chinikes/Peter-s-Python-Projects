# Python MySQL Join 

# Join Two or More Tables 
# You can combine rows from two or more tables, based on a related column between them, by using a JOIN statement. 

import mysql.connector # import MySQL Connector 

mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "mahanta1",
    database = "mydatabase"
)

mycursor = mydb.cursor() 

# sql1 = "CREATE TABLE products (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, url VARCHAR(255) NOT NULL) "
# sql2 = "CREATE TABLE users (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, fav INT(11) NOT NULL, FOREIGN KEY (fav) REFERENCES products(id)) "

# mycursor.execute(sql1) 
# mydb.commit() 
# mycursor.execute(sql2)
# mydb.commit()

# sql2 = "CREATE TABLE products (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, url VARCHAR(255) NOT NULL) "

# mydb.commit()

"""
sql = "INSERT INTO users (name,fav) VALUES (%s, %s)" 
val = [
    ('Peter', 1),
    ('John', 1),
    ('Amy', 2),
    ('Hannah',2),
    ('Michael',3)
]

mycursor.executemany(sql, val) 

mydb.commit() 

"""

# Example - Join users and products tables: to see the name and users favorite product: 

sql = "SELECT \
    users.name AS user, \
    products.name AS favorite, \
    products.url AS url \
    FROM users \
    INNER JOIN products ON users.fav = products.id"

mycursor.execute(sql) 

myresult = mycursor.fetchall() 

for x in myresult:
    print(x)