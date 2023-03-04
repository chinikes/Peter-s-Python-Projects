# Multiple Regression 

# Multiple regression is like linear regression, but with more than one independent value, meanthinmg that a value is predicted based on two or more variables 
# In Python, the Pandus module can bde used 

import pandas # The Pandas module allows for reading csv files and returning a DataFrame object. 
from sklearn import linear_model # Some methods from sklearn will be used 

df = pandas.read_csv("data.csv") # Read the data.csv file to fetch data 

# print(df) # test

# Then make a list of the independent values and call this variable X 
# Put the dependent values in a variable called y

X = df[['Weight', 'Volume']]
# print(X) # test 

y = df['CO2']
# print(y) # test 

# From the sklearn module use the LinearRegression() method to create a linear regression object which has a method called fit() that takes the independent and dependent values as parameters and fills the regression object with data that describes the relationship: 

regr = linear_model.LinearRegression() # Create the linear regression object 

regr.fit(X,y) # Fill regr with data representing relationship between X and y datasets 

# Predit the CO2 emission of a car where the weight is 2300kg, and the volume is 1300cm: 
# predictedCO2 = regr.predict([[2300,1300]])

# print(predictedCO2)

# Coefficient 
# The coefficient is a factor that describes the relationship with an unknown variable

# print(regr.coef_)

predictedCO2 = regr.predict([[3300,1300]])
print(predictedCO2)