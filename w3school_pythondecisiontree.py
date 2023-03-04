# Machine Learning - Decision Tree 

# Decision Tree
# A decision tree is a Flow Chart, and can help make decisions on previous experience. 

# Example
# Read and print the data set 
import pandas 
import matplotlib.pyplot as plt

df = pandas.read_csv("data2.csv")

# print(df) # test to see if data set is read correctly

# To make a decision tree, all data must be numerical.

# Change string values into numerical values 
# For Nationality 
d = {"UK":0, "USA":1, "N":2} 
df["Nationality"] = df["Nationality"].map(d)    # map() returns a list of the results after applying the given function to each item of a given iterable (list, tuple etc.)

# For Go
d = {"YES":1, "NO":0}
df["Go"] = df["Go"].map(d)  # map() returns a list of the results after applying the given function to each item of a given iterable (list, tuple etc.)

print(df) # test to see if data set is read correctly

# Then separate the feature columns from the target column 
# The feature columns are the columns that will be used to make the decision, and the target column is the column with the result.

# Example: X is the feature columns, and y is the target column: 

features = ["Age", "Experience", "Rank", "Nationality"] 

X = df[features]    # X is the feature columns
y = df["Go"]    # y is the target column

# print(X)    # test to see if feature columns are read correctly
# print(y)    # test to see if target column is read correctly

# Now we can create the decision tree, fit it with our details, and make a prediction. Start by importing the DecisionTreeClassifier class from the sklearn.tree module: 

from sklearn.tree import DecisionTreeClassifier 
import sklearn.tree as tree 
import sys
import matplotlib
from IPython.display import Image
from IPython.display import display


matplotlib.use('Agg')

# Create Decision Tree classifer object 
dtree = DecisionTreeClassifier()
dtree = dtree.fit(X,y)  # fit() fits the model according to the given training data. 

tree.plot_tree(dtree, feature_names=features)    # plot_tree() plots the decision tree.

# plt.savefig('decision_tree2.png', dpi=100) # save the plot as a png file

# Predict the response for a new observation
# Example: Should I go see a show starring 40 years old American comedian with 10 years of experience and a rank of 7? 

print(dtree.predict([[40, 10, 6, 1]]))  # predict() predicts the class labels for the provided data.
