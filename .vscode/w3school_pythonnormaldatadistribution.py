# Machine Learning - Normal Data Distribution 

# Normal Data Distribution 
# In normal data distribution, values are concentrated around a given value. This is also known as Gaussian data distribution. 

# E.g. A typical normal data distribution 

import numpy
import matplotlib.pyplot as plt 

x = numpy.random.normal(5.0,1.0,10000)

plt.hist(x,100)

plt.show()