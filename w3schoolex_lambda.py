# Python Lambda 

# A lambda function is a small anonymous function 
# A lambda function can take any number of arguments, but can only have one expression 

# E.g. Add 10 to argument a, and return the result: 
"""
x = lambda a : a + 10
print(x(5))
"""

# E.g. Multiply argument a with argument b and return the result: 
"""
x = lambda a,b : a*b 
print (x(5,6))
"""

# E.g. Summarize argument a,b, and c and return the result: 
"""
x = lambda a,b,c : a+b+c 
print(x(5,6,7))
"""

# Why use lambda Functions? 
# The power of lambda is better shown when you use them as an anonymous function inside another function. 

# E.g. Say you have a function definition that takes one argument, and that argument will be multiplied with an unknown number 
"""
def myfunc(n):
    return lambda a : a*n

mydoubler = myfunc(2)

print(mydoubler(11))
"""

# Or, use the same function definition to make both functions, in the same program: 

"""
def myfunc(n): 
    return lambda a : a*n 

mydoubler = myfunc(2)
mytripler = myfunc(3)

print (mydoubler(11))
print(mytripler(11))
"""

# Exercise: Create a lambda function that takes one parameter (a) and returns it

x = lambda a : a 
print(x(2))
