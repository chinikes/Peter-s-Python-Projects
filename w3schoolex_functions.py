# A function is a block of code which only runs when it is called. 
# You can pass data, known as parameters, into a function. 
# A function can return data as a result 

# Creating a function 
"""
def my_function(): 
    print ("Hello from a function")
"""

# Calling a function 
"""
def my_function(): 
    print ("Hello from a function")

my_function()
"""

# Arguments 
# Information can be passed into functions as arguments. 

# e.g 
"""
def my_function(fname): 
    print(fname + " Refsnes")

my_function("Emil")
my_function("Tobias")
my_function("Linus")
"""

# Parameters Vs Arguments? 
# Parameter - variable listed inside () during function definition 
# Argument - variable listed inside () during function call 
"""
def my_function(fname, lname):
    print (fname + " " + lname)

my_function("Emil", "Refsnes")
"""

# Arbitrary Arguments, *args 

# If the developer does not know how many arguments that will be passed into a function, add a * before the parameter name in the function definition. This way the function will receive a tuple of arguments, and can access the items accordingly: 
# e.g. If the number of arguments is unknown, add a * before the parameter name: 

"""
def my_function(*kids): 
    print ("The youngest child is " + kids[2])

my_function("Emil", "Tobias", "Linus")
"""

# Keyword Arguments 
# You can also send arguments with the key = value syntax. This way the order of the arguments does not matter 
# The phrase Keyword Arguments are often shortened to kwargs in Python documentations.
# e.g. 

"""
def my_function(child1, child2, child3): 
    print ("The youngest child is " + child3)


my_function(child3 = "Linus", child1= "Emeka", child2= "Ikenna")
"""

# Arbitrary keyword arguments, **kwargs 
# If you do not know how many keyword arguments that will be passed into your function, add two asterisks: ** before the parameter name in the function defintion. This way the function will receive a dictionary of arguments, and can access the items accordingly: 
# e.g. If the number of keyword arguments is unknown, add a double ** before the parameter name: 

"""
def my_function(**kid): 
    print("His last name is " + kid["lname"] )

my_function(fname="Ikenna", lname= "Chinaka")
"""

# Default parameter value
# If we call a function without an argument, it uses the default value: 
# e.g. 
"""
def my_function(country = "Norway"): 
    print ("I am from " + country)

my_function()
my_function("Nigeria")
my_function("Brazil")
"""

# Passing a list as an argument
# You can send any data types of argument to a function (string, number, list, dictionary etc), and it will be treated as the same data type inside the function. 
# e.g. If you send a List as an argument, it will still be a List when it reaches the function: 

"""
def my_function(food): 
    for x in food: 
        print (x)


fruits = ["apples", "oranges", "grapes"]
my_function(fruits)
"""

# Return values
# To let a function return a value, use the "return" statement: 

"""
def my_function(x): 
    return 5 * x

print(my_function(5))
print(my_function(3))
print(my_function(6))
"""

# The pass statement 
# function definitons cannot be empty, but if you for some reason have a function definition with no content, put in the "pass" statement to avoid getting an error. 
# e.g 
"""
def my_function(): 
    pass

my_function()
"""

# Recursion
# Python also accepts function recursion, which means a defined function can call itself
# e.g. 

"""
def tri_recursion(k): 
    if (k > 0): 
        result = k + tri_recursion(k - 1)
        print(result)
    else: 
        result = 0
    return result

print("\n\nRecursion Example Results")
tri_recursion(7)
"""