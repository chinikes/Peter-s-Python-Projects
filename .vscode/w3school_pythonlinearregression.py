# Machine Learning - Linear Regression 

# Regression 
# The term regression is used when tyring to find the relationship between variables . 
# In machine learning, and in statistical modelling, that relationship is used to predict the outcome of future events. 

# Linear Regression 
# Linear regression uses the relationship between the data-points to draw a straight line through all them. This line can be used to predict future values. 

import matplotlib.pyplot as plt 
from scipy import stats 

# Data set representing recorded ages and corresponding speeds of vehicles 
x = [5,7,8,7,2,17,2,9,4,11,12,9,6]
y = [99,86,87,88,111,86,103,87,94,78,77,85,86]

# Calculate result set from linear regression calculations based on the ages and corresponding speeds 
slope, intercept, r, p, std_err = stats.linregress(x,y)

# Function takes the list of car ages and returns a list of updated y values with linear regression values factored in 
def myfunc(x): 
    return slope * x + intercept


"""
plt.scatter(x,y)
plt.show()
"""

# Example - import scipy and draw the line of linear regression 
"""
slope, intercept, r, p, std_err = stats.linregress(x,y)

def myfunc(x): 
    return slope * x + intercept

mymodel = list(map(myfunc,x))

plt.scatter(x,y)
plt.plot(x,mymodel)
plt.show()
"""

# R for Relationhsip 
# It is important to know how the relationship between the values of the x-axis and the values of the y-axis is, if there are no relationship the linear regression can not be used to predict anything
# This relationship - the coefficient of correleation - is called "r"
# The r value ranges from -1 to 1, whee 0 means no relationship, and 1 (and -1) means 100% related 
# Python and the Scipy module will compute the value once the values of x and y have been fed to it 

# Example - How well does my data fit in a linear regression?
"""
slope, intercept, r, p, std_err = stats.linregress(x,y)

print("{:.2f}".format(r))
"""

# Predict Future Values 
# With the information gathered, future values can be predicted 

# Example - Predicting the speed of a 10 years old car 
"""
speed = myfunc(10) 

print("{:.2f} mph".format(speed))
"""

# Bad Fit? 
# Creating an example where linear regression would not be the best method to predict future values 
# These values for the x- and y- axis should result in a very bad fit for linear regression: 

x2 = [89,43,36,36,95,10,66,34,38,20,26,29,48,64,6,5,36,66,72,40]
y2 = [21,46,3,35,67,95,53,72,58,10,26,34,90,33,38,20,56,2,47,15]

slope, intercept, r, p, std_err = stats.linregress(x2,y2)

mymodel = list(map(myfunc,x2))

print(r)

plt.scatter(x2,y2)
plt.plot(x2,mymodel)
plt.show()