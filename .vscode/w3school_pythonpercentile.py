# Machine Learning - Percentiles 
# Percentiles are used in statistics to give you a numbder that describes the value that a given percent of the values are lower than. 

# Example: Let's say we have an array of the ages of all the people that live in a street.

ages = [5,31,43,48,50,41,7,11,15,39,80,82,32,2,8,6,25,36,27,61,31]

import numpy
from scipy import stats 
import math
# from num2words import num2words

def statPercentile(dataSet,percentile): 
    result = numpy.percentile(dataSet,percentile)
    print(" The {}th percentile of the provided age set is: ".format(percentile) + "{}years".format(int(result)))


statPercentile(ages,90)

