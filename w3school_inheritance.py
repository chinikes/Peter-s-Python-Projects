# Python Inheritance 
# Inheritance allows us to define a class that inherits all the methods and properties from another class 

# Parent class is the class being inherited from, also called the base class 
# Child class is the class that inherits from another class, but also called derived class 

# Create a parent class 
# Any class can be a parent class, so the syntax is the same as creating any other class: 

# E.g. Create a class named Person, with firstname, and lastname properties, and a printname method: 

class Person: 
    def __init__(self, firstname, lastname) -> None:
        self.firstname = firstname
        self.lastname = lastname
    
    def printname(self): 
        print(self.firstname, self.lastname)

# x = Person("Ikenna", "Chinaka")
# x.printname()

# Create a child class 
# To create a class that inherits the functionality from another class, send the parent class as a parameter when creating the child class: 

# E.g. Create a class named Student, which will inherit the properties and methods from the Person class: 
"""
class Student(Person):
    pass 

x = Student("Ikenna","Chinaka Student")
x.printname()
"""

# Add __init__() function to the Student class 
"""
class Studen(Person): 
    def __init__(self, firstname, lastname) -> None:
        self.firstname = firstname
        self.lastname = lastname

"""

# To keep the inheritance of the parent's __init__() function, add a call the parent's __init__() function: 
# E.g. 
"""
class Student(Person): 
    def __init__(self, firstname, lastname) -> None:
        Person.__init__(self,firstname,lastname)
"""

# Use the super() function 
# Python also has a super() function that will make the child class inherit all the methods and properties from its parent: 
# E.g. 
"""
class Student(Person): 
    def __init__(self, firstname, lastname) -> None:
        super().__init__(firstname, lastname)
"""

# By using the super() function, you do not have to use the name of the parent element, it will automatically inherit the methods and properties from its parent. 

# Add Properties 
# E.g. Add a property called gratudationyear to the Student class: 

"""
class Student(Person): 
    def __init__(self, firstname, lastname) -> None:
        super().__init__(firstname, lastname) 
        self.graduationyear = 2019 

x = Student("Obinna","Okeke")
x.printname()
print(x.graduationyear)
"""

# In the example below, the year 2019 should be a variable, and passed into the Student class when creating student objects. To do so, add another parameter in the __init__() function: 
# E.g. Add a year parameter, and pass the correct year when creating objects: 

"""
class Student(Person): 
    def __init__(self, firstname, lastname, graduationyear) -> None:
        super().__init__(firstname, lastname)
        self.graduationyear = graduationyear 

x = Student("Obinna", "Okeke", 2005)
x.printname()   
print(x.graduationyear)
"""

# Add Methods 

# E.g. Add a method called welcome to the Student class: 
"""
class Student(Person): 
    def __init__(self, firstname, lastname, graduationyear) -> None:
        super().__init__(firstname, lastname)
        self.graduationyear = graduationyear 

    def welcome(self): 
        print("Welcome", self.firstname, self.lastname, "to the class of", self.graduationyear)


Student("Obinna", "Okeke", 2019).welcome
"""

