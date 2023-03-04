# Python Datetime 

# Python Dates 
# A date in Python is not a data type on its own, but we can import a module named datetime to work with dates as date objects. 

# E.g. Import the datetime module and display the current date: 
"""
import datetime 

x = datetime.datetime.now()
print(x)
"""

# E.g. Return the year and name of weekday: 
"""
import datetime 

x = datetime.datetime.now() 

print(x.year)
print(x.strftime("%A"))
"""

# Creatoing date objects 
# To create a date, we can use the datetime() class (constructor) of the datetime module. 
# The datetime() class requires three parameters to create a date: year, month, day. 

# E.g. Create a date object: 
"""
import datetime

x = datetime.datetime(2020,5,17)
print(x)
"""

# The datetime() class also takes parameters for time and timezone(hour, minute, second, microsecond, tzone), but they are optional, and has a default value of 0, (None for timezone). 

# The strftime() method
# The datetime object has a method for formatting date objects into readable strings. 
# The method is called strftime(), and takes one parameter, format, to specify the format of the returned string: 

# E.g. Display the name of the month 
"""
import datetime

x = datetime.datetime(2018, 6, 1)
print (x.strftime("%B"))
"""
