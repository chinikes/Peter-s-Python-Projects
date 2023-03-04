# False and None are considered False 
# Numeric zero values are considered False 
# range(0) is considered False 

# strings and bytes are not directly interchangeable, but they can be converted to each other using the str() and bytes() functions.
# strings contain unicode characters, while bytes contain raw 8-bit values.
"""
def main(): 
    # define some starting values
    b = bytes([0x41, 0x42, 0x43, 0x44]) # bytes() returns a bytes object, which is an immutable sequence of integers in the range 0 <= x < 256.
    print(b) 

    s = "This is a string" 
    print(s) 

    # TODO: Try combining them. 
    # print(b + s)

    # TODO: Bytes and strings need to be properly encoded and decoded 
    # before you can work on them together.
    s2 = b.decode("utf-8") # decode() returns a string object by decoding the given bytes.
    print(s+s2)
    b2 = s.encode("utf-8") # encode() returns a bytes object by encoding the given string.
    print(b+b2)

    # TODO: Encode the string as UTF-32 


if __name__ == "__main__": # if this file is run directly, run the main() function
    main()
"""

# demonstrate template strings functions 
"""

from string import Template    

def main():
    # Usual string formatting with format()
    str1 = "The age of {0} is {1}".format("Jim", 32)
    print(str1) 

    # TODO: Create a template with placeholders 
    templ = Template("The age of ${name} is ${age}") # $name and $age are placeholders

    # TODO: Use the substitute method with keyword arguments
    str2 = templ.substitute(name="Jim", age=32) # substitute() returns a copy of the string where the placeholders are replaced with the keyword arguments provided.
    print(str2)

    # TODO: Use the substitute method with a dictionary 
    data = {
        "name": "Jim",
        "age": 32
    }
    str3 = templ.substitute(data) # substitute() returns a copy of the string where the placeholders are replaced with the keyword arguments provided.
    print(str3) 





if __name__ == "__main__":
    main()

"""
""" 
# demonstrate built-in utility functions 

def main(): 
    # use any() and all() to test sequences for boolean values 
    list = [1, 2, 3, 0, 5, 6] 

    # TODO: any will return True if any item is True 
    print(any(list)) # any() returns True if any element of an iterable is true. If the iterable is empty, it will return False.

    # TODO: all will return True if all items are True 
    print(all(list)) # all() returns True if all elements of an iterable are true. If the iterable is empty, it will return True.

    # TODO: min and max will return the smallest and largest items 
    print("Min value:", min(list)) # min() returns the smallest item in an iterable or the smallest of two or more arguments.
    print("Max value:", max(list)) # max() returns the largest item in an iterable or the largest of two or more arguments.

    # TODO: Use sum() to sum all the items in a sequence 
    print("Sum:", sum(list)) # sum() returns the sum of all items in an iterable.


if __name__ == "__main__": 
    main()
"""

# use iterator functions like enumerate, zip, iter, next 
"""
def main():
    # define a list of days in English and French
    days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] 
    daysFr = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"] 

    # TODO: use iter to create an iterator over a collection 
   
    i = iter(days) # iter() returns an iterator object. 
    print(next(i)) # next() returns the next item from the iterator.
    print(next(i))
    print(next(i))
  

    # TODO: iterate using a function and a sentinel 
   
    with open("testfile.txt", "r") as fp: 
        for line in iter(fp.readline, ''):
            print(line)
  
    # TODO: use regular interation over the days 
   
    for m in range(len(days)):
        print(m+1, days[m])
  
    # TODO: using enumerate reduces code and provides a counter 
   
    for i, m in enumerate(days, start=1): # enumerate() returns an enumerate object. It contains the index and value of all the items in the list as pairs.
        print(i, m)
    
    # TODO: use zip to combine sequences 
    
    for m in zip(days, daysFr):
        print(m) # zip() returns an iterator of tuples based on the iterable object.
    
    for i, m in enumerate(zip(days, daysFr), start=1):
        print(i, m[0], "=", m[1], "in French")
  




if __name__ == "__main__":
    main()

""" 

# Use to transform functions like sorted, filter, map 

def filterFunc(x):
    if x % 2 == 0:
        return False
    return True

def filterFunc2(x):
    pass 

def is_lower_case(letter):
    if letter.isalpha() and letter.islower():
        return True
    else:
        return False

def squareFunc(x):
    return x**2

def toGrade(x): 
    if x >= 90:
        return "A"
    elif x >= 80:
        return "B"
    elif x >= 70:
        return "C"
    elif x >= 65:
        return "D"
    return "F"

 
def main():
    # define some sample sequences to operate on 
    nums = (1,8,4,5,6,2,3,0,9,7)
    chars = "abcDeFGhiJklmnoPqrstuVwxyz"
    grades = (81,89,94,78,61,66,99,74)

    # TODO: use filter to remove items from a list
    # odds = list(filter(filterFunc,nums))
    # print(odds)

    # TODO: use filter on non-numeric sequence
    # lowers = list(filter(is_lower_case,chars)) # filter() constructs an iterator from elements of an iterable for which a function returns true.
    # print(lowers)

    # TODO: use map to create a new sequence of values 
    # squared = list(map(squareFunc,nums)) # map() returns a list of the results after applying the given function to each item of a given iterable (list, tuple etc.)
    # print(squared)

    # TODO: use sorted and map to change numbers to grades
    # grades = sorted(grades)
    letterGrades = list(map(toGrade,grades))   
    for i in range(len(letterGrades)):
        print("Student {0} : Grade: {1}, Score: {2} ".format(i,letterGrades[i],grades[i]))


if __name__ == "__main__": 
    main()