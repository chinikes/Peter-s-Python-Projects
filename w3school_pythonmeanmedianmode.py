# Mean, Median, and Mode 

# In machine language, their are often three values of interest: - Mean (the average value), Median (the mid point value) and Mode (the most common value)

# E.g. Use the Numpy mean() method to find the average speed: 

import numpy
from scipy import stats 

speed = [99,86,87,88,111,86,103,87,94,78,77,85,86]

# avgSpeed = numpy.mean(speed)

def basicStats(dataSet): 
    meanValue = numpy.mean(dataSet)
    medianValue = numpy.median(dataSet) 
    modeValue = stats.mode(dataSet, keepdims=True)
    return meanValue, medianValue, modeValue[0][0]


def printStats(stats): 
   print ("Mean value is: " + str(stats[0]))
   print ("Median value is " + str(stats [1]))
   print ("Modal value is : " + str(stats[2]))


printStats(basicStats(speed))

# The Mean, Median, and Mode are techniques that are often used in Machine Learning, so it is important to understand the concept behind them. 
