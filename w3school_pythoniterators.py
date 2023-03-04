# Python Iterators 

# An iterator is an object that contains a countable number of values. 
# An iterator is an object that can be iterated upon, meaning that you can traverse through all the values. 
# Technically, in Python, an iterator is an object which implements the iterator protocol, which consist of the methods __iter__() and __next__(). 

# Iterator vs Iterable 

# Lists, tuples, dictionaries, and sets are all iterable objects. They are iterable containers which you can get an iterator from. 
# All these objects have a iter() method which is used to get an iterator: 

# E.g. Return an iterator from a tuple, and print each value: 
"""
mytuple = ("apple", "banana", "cherry")
myit = iter(mytuple)

print(next(myit))
print(next(myit))
print(next(myit))
"""

# Even strings are iterable objects, and can return an iterator: 
# E.g. Strings are also iterable objects, containing a sequence of characters: 

"""
mystr = "banana"
myit = iter(mystr)

print(next(myit))
print(next(myit))
print(next(myit))
print(next(myit))
print(next(myit))
print(next(myit))
"""

# Looping through an iterator 
# We can also use a for loop to iterate through an iterable object: 

# E.g. Iterate the values of a tuple: 
"""
mytuple = ("apple", "banana", "orange")

for x in mytuple: 
    print(x)
"""
# E.g. Iterate the characters of a string: 
"""
mystr = "banana"

for x in mystr: 
    print(x)
"""

# Create an iterator 
# To create an object/class as an iterator you have to implement the methods __iter__() and __next__() to your object. 

# E.g. Create an iterator that returns numbers, starting with 1, and each sequence will increase with one (returning 1,2,3,4,5 etc.): 
"""
class MyNumbers:
  def __iter__(self):
    self.a = 1
    return self

  def __next__(self):
    x = self.a
    self.a += 1
    return x

myclass = MyNumbers()
myiter = iter(myclass)

print(next(myiter))
print(next(myiter))
print(next(myiter))
print(next(myiter))
print(next(myiter))
"""

# StopIteration 
# In the __next__() method, we can add a terminating condition to raise an error if the iteration is done a specified number of times: 

# E.g. Stop after 20 iterations: 
"""
class MyNumbers: 
    def __iter__(self): 
        self.a = 1 
        return self 

    def __next__(self): 
        if self.a <= 20: 
            x = self.a 
            self.a += 1 
            return x
        else: 
            raise StopIteration

myclass = MyNumbers() 
myiter = iter(myclass)

for x in myiter:
    print(x)
"""