# PYTHON FOR LOOPS

# The while Loop 
# e.g. print i as long as i is less than 6 
"""
i = 0
while i < 6: 
    print(i)
    i += 1
"""
# The break Statement 
# With the break statement we can stop the loop even if the while conidition is true: 
# e.g. Exit the loop when i is 3: 
"""
i = 1 
while i < 6: 
    print(i)
    if i == 3: 
        break
    i +=1 
    """

# The continue Statement
# With the continue statement we can stop the current iteration, and continue with the next: 
# e.g. Continue to the next iteration if i is 3: 

"""
i = 0
while i < 6:
    i += 1
    if i == 3:
        continue
    print(i)

"""

# The else Statement 
# With the else statement we can run a block of code once when the conition is no longer true: 

"""
i = 1
while i < 6:
    print(i)
    i += 1
else: 
    print ("is i is no longer less than 6")

"""

