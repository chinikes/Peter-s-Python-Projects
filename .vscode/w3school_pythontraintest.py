# Machine Learning - Train / Test 

# Evaluate your model 
# In machine learning, we create models to predict the outcome of certain events. To measure if the model is good enough, we can use a method called Train / Test. 
# Train / Test is a method to measure the accuracy of a model. 
# The data set is split into two - a training set and a test set 80:20. Model is trained by creating it and tested for accuracy 

# Start with a data set 

# Example 
import numpy 
import matplotlib.pyplot as plt
from sklearn.metrics import r2_score

numpy.random.seed(2)

x = numpy.random.normal(3,1,100) 
y = numpy.random.normal(150,40,100) / x 

# print(x)
# print(y)


# plt.scatter(x,y) 
# plt.show() 


# Split into Train / Test 

train_x = x[:80]
train_y = y[:80]

test_x = x[80:]
test_y = y[80:]

# plt.scatter(train_x,train_y)
# plt.scatter(test_x,test_y)
# plt.show()

# Fit the Data Set 
# Example - Draw a polynomial regression line through the data points: 

mymodel = numpy.poly1d(numpy.polyfit(train_x,train_y,4))   # numpy.poly1d() returns a 1-D polynomial class. numpy.polyfit() returns a vector of coefficients that minimizes the squared error.

# r2 = r2_score(train_y,mymodel(train_x))   # r2_score() returns the coefficient of determination R^2 of the prediction. 

# r2 = r2_score(test_y,mymodel(test_x))   # r2_score() returns the coefficient of determination R^2 of the prediction.
# print("{:.3f}".format(r2))

# myline = numpy.linspace(0,6,100)    # numpy.linspace() returns evenly spaced numbers over a specified interval.

"""
plt.scatter(train_x,train_y)
plt.plot(myline,mymodel(myline))
plt.show()
"""

# Predict Future Values 
print(mymodel(5))
