# Machine Learning - Scale 

# Scale Features 
# Scale features are applied to resolve when trying to compare values with different units 

import pandas # The Pandas module allows for reading csv files and returning a DataFrame object. 
from sklearn import linear_model # Some methods from sklearn will be used 
from sklearn.preprocessing import StandardScaler

df = pandas.read_csv('data.csv')
X = df[["Weight", "Volume"]]
y = df["CO2"]

"""
weightDS = df['Weight']

# print(weightDS) # test to view values

meanWeight = weightDS.mean()
stdWeight = weightDS.std()
print("Mean value of weight is: {:.2f}".format(meanWeight)) # test
print("Standard deviation of weight is: {:.2f}".format(stdWeight)) # test

volumeDS = df['Volume']

# print(weightDS) # test to view values

meanVolume = volumeDS.mean()
stdVolume = volumeDS.std()
print("Mean value of volume is: {:.2f}".format(meanVolume)) # test
print("Standard deviation of volume is: {:.2f}".format(stdVolume)) # test
"""

# Scale data using the standardization method 
"""
scale = StandardScaler()

scaledX = scale.fit_transform(X)

print(scaledX) # test to see values of scaled X 
"""


# Predict CO2 values 
# E.g. Predict the C02 emission from a 1.3 liter car that weighs 2300 kilograms: 
"""
scale = StandardScaler()

scaledX = scale.fit_transform(X)

regr = linear_model.LinearRegression()
regr.fit(scaledX,y)

scaled = scale.transform([[2300,1.3]])

predictedC02 = regr.predict([scaled[0]])

print(predictedC02)
"""