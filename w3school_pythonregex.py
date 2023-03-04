# A RegEx, or Regular Expression, is a sequence of characters that forms a search pattern. 
# RegEx can be used to check if a string contains the specified search pattern.

# RegEx Module 

# Python has a built-in package called "re", which can be used to work with Regular Expressions. 

# E.g. Search the string to see if it starts with "The" and ends with "Spain": 
"""
import re 

txt = "The rain in Spain"
x = re.search("^The.*Spain$", txt)

print(x)
"""

# The findall() function 
# The findall() function returns a list containing all matches 

# E.g. a list of all matches 
"""
import re 

txt = "The rain in Spain"
print(re.findall("ai", txt))
"""

# E.g. Return an empty list if no match was found: 
"""
import re

txt = "The rain in Spain"
print(re.findall("Spain", txt))
"""

# The search() function 

# The search() function searches for a match, and returns a Match object if there is a match. If there is more than one match, only the first occurrence of the match will be returned. 

# E.g. Search for the first white-space character in the string: 
"""
import re

txt = "The rain in Spain"
print ("The first white-space character is located in this position:", (re.search("\s", txt)).start())
"""

# The split() function 

# The split() function returns a list where the string has been split at each match: 

# E.g. Split at each white-space character: 
"""
import re

txt = "The rain in Spain"
print(re.split("\s", txt))
"""

# You can control the number of occurrences by specifying the maxsplit parameter: 

# E.g. Split the string only at the first occurrence: 
"""
import re 

txt = "The rain in Spain"
print(re.split("\s", txt, 1))
"""

# The sub() function 
# The sub() function replaces the matches with the text of your choice: 

# E.g. Replace every white-space character with the number 9: 
"""
import re

txt = "The rain in Spain"
print(re.sub("\s", "9", txt,2))
"""

# Match object 
# A Match Object is an object containing information about the search and the result. 
# Note - If there is no match, the value None will be returned, instead of the Match Object 

# E.g. Do a search that will return a Match Object: 
"""
import re

txt = "The rain in Spain"
x = re.search("ai", txt) 
print(x) # this will print an object 

print(x.span())
print(x.string)
print(x.group())
"""



