# Machine Leaarning - Scatter Plot 

# A scatter plot is a diagram where each value in the data set is represented by a dot. 

import numpy 
import matplotlib.pyplot as plt 

"""

x = [5,7,8,7,2,17,2,9,4,11,12,9,6]

y = [99,86,87,88,111,86,103,87,94,78,77,85,86]

plt.scatter(x,y)
plt.show() 
"""

# Random Data Distributions 
# E.g. A scatter plot with 1000 dots 

x = numpy.random.normal(5.0,1.0,1000)
y = numpy.random.normal(10.0,2.0,1000)

plt.scatter(x,y)
plt.show()