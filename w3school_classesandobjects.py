# Python Classes / Objects 

# Python is an object oriented programming language. 
# Almost everthing in Python is an object, with its properties and methods. 
# A Class is like an object constructor, or a "blueprint" for creating objects. 

# Create a Class 

class MyClass: 
    x = 5

# Create an object 
p1 = MyClass()
print(p1.x)

# The _init_() Function
# All classes have a function called _init_(), which is always executed when the class is being initiated 
# Use the _init_() function to assign values to object properties, or other operations that are necessary to do when the object is being created: 

# E.g. Create a class name Person, use the _init_() function to assign values for name and age: 
"""
class Person: 
    def __init__(self, name, age): 
        self.name = name
        self.age = age
        print ("Welcome to the world", self.name + "!")


p1 = Person("Ikenna",42)
p2 = Person("Chioma", 41)
print(p1.name, "is", p1.age, "years old ") 
"""

# The _str_() Function
# The __str__() function controls what should be returned when the class object is represented as a string. 
# If the __str__() is not set, the string representation of the object is returned 

# E.g. The string representation of an object WITHOUT the __str__() function: 
"""
class Person: 
    def __init__(self, name, age) -> None:
        self.name = name
        self.age = age 


p1 = Person("Ikenna", "42")

print(p1)
"""

# E.g. The string representation of an object WITH the __str__() function: 
"""
class Person: 
    def __init__(self, name, age) -> None:
        self.name = name
        self.age = age

    def __str__(self) -> str:
        return f"{self.name}({self.age})"


p1 = Person("Ikenna", 42)

print(p1)
"""

# Object methods 
# E.g. Insert a function that prints a greeting, and execute it on the p1 object: 
"""
class Person: 
    def __init__(self, name, age) -> None:
        self.name = name 
        self.age = age 

    def myfunc(self): 
        print("Hello my name is " + self.name)


p1 = Person ("Ikenna", 42)
p1.myfunc()
"""

# The self parameter 
# The self parameter is a reference to the current instance of the class, and is used to access variables that belong to the class. 
# It does not have to be name self, you can call it whatever you like, but it has to be the first parameter of any function in the class: 

# E.g. Use the words mysillyobject and abc instead of self: 
"""
class Person: 
    def __init__(mysillyobject, name, age) -> None:
        mysillyobject.name = name 
        mysillyobject.age = age 

    def myfunc(abc): 
        print("Hello my name is " + abc.name)

p1 = Person("Ikenna", 42)
p1.myfunc()
"""

# Modify object properties 
# You can modify properties an object like this:
# E.g. Set the age of p1 to 40: 
"""
class Person: 
    def __init__(self, name, age) -> None:
        self.name = name
        self.age = age 

    def __str__(self) -> str:
        return f"{self.name}({self.age})"

p1 = Person("Ikenna", 42)
p1.age = 40 

print(p1)
"""

# Delete objects 
# You can delete objects by using the del keyword: 
# E.g. Delete the p1 object: 
"""
del p1 
print(p1)
"""

# The pass statement 
# class definitions cannot be empty, but if you for some reason have a class definition with no content, put in the pass statement to avoid getting an error 

"""
class Person: 
    pass 
"""

class Person: 
    def __init__(self, name, age) -> None:
        self.name = name
        self.age = age 

    def __str__(self) -> str:
        return f"{self.name}({self.age})"

p1 = Persons("Ikenna", 42)
p1.age = 40 

print(p1)