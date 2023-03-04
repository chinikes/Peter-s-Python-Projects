# Machine Learning - Polynomial Regression 

# Polynomial Regression 
# If data points clearly will not fit a linear regression (a straight line through all data points), it might be ideal for polynomial regression 
# Polynomial regression, like linear regression, uses the relationship between the variables x and y to find the best way to draw a line through the data points. 
# Python has methods for finding a relationship between data-points and to draw a line of polynomial regression. 

import numpy
import matplotlib.pyplot as plt 
from sklearn.metrics import r2_score

# Data set  representing 18 registered cars they were passing a certain tollbooth 
x = [1,2,3,5,6,7,8,9,10,12,13,14,15,16,18,19,21,22]
y = [100,90,80,60,60,55,60,65,70,70,75,76,78,79,90,99,99,100]

"""
plt.scatter(x,y)
plt.show()
"""
# Make a polynomial model for the data-set 
"""
mymodel = numpy.poly1d(numpy.polyfit(x,y,3))

# Specify how the line will display, starting at position 1, and ending at position 22
myline = numpy.linspace(1,22,100)

plt.scatter(x,y)
plt.plot(myline,mymodel(myline))
plt.show()
"""

# R-Squared 
# The relationship for polynomial regression is measured with a value called the r-squared, which ranges from 0 to 1. 
# Python and the Sklearn module can compute the value of r-squared once fed with the x and y arrays. 

# Example - How well does a dataset fit in a polynomial regression? 

# Make a polynomial model for the data-set 
mymodel = numpy.poly1d(numpy.polyfit(x,y,3))

"""
print("{:.2f}".format(r2_score(y,mymodel(x))))
"""

# Predict Future Values 
# Example - Try to predict the speed of a car that passes the tollbooth at around the time 17:00: 
"""
speed = mymodel(17)

print("{:.2f} mph".format(speed))
"""