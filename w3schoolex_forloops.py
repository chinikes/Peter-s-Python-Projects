# PYTHON FOR LOOPS
# A for loop is used for iterating over a sequence (that is either a list, tuple, a dictionary, a set, or a string). 

# e.g. Print each fruit in a fruit list 
"""
fruits = ["apple", "banana", "cherry"]
for x in fruits: 
    print(x) # the for loop does not require an indexing variable ("e.g fruits[x]") to be set beforehand
"""

# Looping through a string 
# Loop through the letters in the word "banana"
"""
for x in "banana": 
    print (x)

"""

# The break Statement
# With the break statement we can stop the loop before it has looped through all the items
# e.g. Exit the loop when x is "banana"

"""
fruits = ["apple", "banana", "cherry"]
for x in fruits: 
    print(x)
    if x == "banana":
        break
"""

# The continue Statement 
# With the continue statement, we can stop the current iteration of the loop, and continue with the next
# e.g. Do not print banana

"""
fruits = ["apple", "banana", "cherry"]
for x in fruits: 
    if x == "banana": 
        continue
    print (x)
"""

# The range() Function
# The range() funtion returns a sequence of numbers, starting from 0 by default, and increments of 1 (by default), and ends at a specified number. 
# e.g. Using the range() funtion
"""
for x in range(6): 
    print(x)
"""
# e.g. Using the rang(start,stop,step) function
"""
for x in range(2,36,3): 
    print (x)
"""

# Else in For Loop
# The else keyword in a for loop specifies a block of code to be executed when the loop is finished: 

"""
for x in range(6): 
    print(x)
else: 
    print ("Finally finished!")
"""

# The else block will NOT be executed if the loop is stopped by a break statement. 

# Nested Loops 
"""
adj = ["red", "big","tasty" ]
fruits = ["apple", "banana", "cherry"]

for x in adj:
    for y in fruits: 
        print (x,y)
"""

# The pass statement 
"""
for x in [0,1,2]:
    pass
"""

