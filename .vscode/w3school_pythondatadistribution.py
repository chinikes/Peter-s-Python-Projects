# Machine Learning - Data Distribution 
# Data Distribution 

# In the real world, the data sets are much bigger, but it can be difficult to gather real world data, at least at an early stage of project

# E.g. Create an array of 250 random floats between 0 and 5: 

import numpy
import matplotlib.pyplot as plt

"""
x = numpy.random.uniform(0.0,5.0,250)

print(x)
"""

# Example - Draw a histogram 
"""
x = numpy.random.uniform(0.0,5.0,250)

plt.hist(x,10)
plt.title("Randomdly Distributed Numbers")
plt.show()
"""

# Big Data Distributions 
# E.g. Create an array with 100000 random numbers, and display them using a histogram with 100 bars:

import numpy
import matplotlib.pyplot as plt 

x = numpy.random.uniform(0.0,5.0,100000)
plt.hist(x,100)
plt.title("Randomdly Distributed Numbers")
plt.show()