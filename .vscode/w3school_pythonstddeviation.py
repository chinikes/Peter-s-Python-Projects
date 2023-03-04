# Machine Learning - Standard Deviation 

# Standard deviation is a number that describes how spread out the values are. 
# A low standard deviation means that most of the numbers are close to the mean (average) value 
# A high standard deviation means that the values are spread out over a wider range 

import numpy
from scipy import stats 
import math

"""
speed = [86,87,88,86,87,85,86]

stdDeviation = "{:.2f}".format(numpy.std(speed))
print("Standard Deviation is: " + str(stdDeviation))
"""

# Variance 
# Variance is another number that indicates how spread out the values are. The variance is the square root of the standard variance 

# speed = [86,87,88,86,87,85,86]
speed = [32,111,138,28,59,77,97]

stdDeviation = numpy.std(speed) 
variance = numpy.var(speed)

#stdDeviation = "{:.2f}".format(numpy.std(speed))
# variance = "{:.2f}".format(numpy.var(speed))

print("Standard Deviation is: " + "{:.2f}".format(stdDeviation))
print("Variance is: " + "{:.2f}".format(variance))

print("Fun fact: The square root of the variance is also: " + "{:.2f}".format(math.sqrt(variance))+"!")


# Summary: The Standard Deviation and Variance are terms that are often used in Machine Learning, so it is important to understand how to get them, and the concept behind them
