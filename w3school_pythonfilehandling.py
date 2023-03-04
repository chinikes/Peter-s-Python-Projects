# Python File Open 
# Python has several functions for creating, reading, updating, and deleting files. 

# File handling 
# The key function for working with files in Python is the open() function. 
# The open()function takes two parameters; filename, and mode. 
# "r" - Read 
# "a" - Append
# "w" - Write
# "x" - Create 
# In addition, you can specify if the file should be handled as binary or text mode 
# "t" - Text 
# "b" - Binary 

# Syntax 
"""
f = open("demofile.txt", "rt")  
print(f.read())
"""

# Close files 
# It is a good practice to always close the file when you are done with it 

# E.g. Close the file when you are finished with it: 
"""
f = open("demofile.txt", "rt")  
print(f.read())
f.close() 
"""

# Write to an existing file 

# E.g. Open the file "demofile2.txt" and append content to the file: 
"""
f = open("demofile.txt", "a") 
f.write("Now the file has more content!")
f.close()
"""

# Open and read the file after the appending: 
"""
f = open("demofile.txt", "r")
print(f.read())
"""


# Create a new file 
# To create a new file in Python, use the open() method, with one of the following methods: 
# "x" - Create 
# "a" - Append 
# "w" - Overrite 

# E.g. Create a file called "myfile.txt" 
"""
f = open("myfile.txt", "x") 
"""

# Python Delete File 
# To delete a file, you must import the OS module, and run its os.remove() function: 

# E.g. Remove the file "demofile.txt"
"""
import os 

if os.path.exists("demofile.txt"): 
    os.remove("demofile.txt") 
else: 
    print("The file does not exist") 
"""

