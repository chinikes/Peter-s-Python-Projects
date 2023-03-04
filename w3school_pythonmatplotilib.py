# Matplotlib 

# Matplotlib is a low level graph plotting library in python that serves as a visualization utility. 
"""
import matplotlib 

# E.g. checking matplotlib version 
print(matplotlib.__version__)
"""

# Pyplot 

# Most of the Matplotlib utilities lies under the pyplot submodule, and are usually imported under the plt alias:
# E.g. Draw a line in a diagram from (0,0) to position (6,250): 
"""
import matplotlib.pyplot as plt 

import numpy as np 

xpoints = np.array([0,6])
ypoints = np.array([0,250])

plt.plot(xpoints, ypoints)
plt.show() 
"""

# Matplotlib Plotting 

# Plotting x and y points 
# The plot() function is used to draw points (markers) in a diagram. By default, the plot() function draws a line from point to point. The function takes parameters for specifying points in the diagram. 
# Parameter 1 is an array containing the points on the x-axis.
# Parameter 2 is an array containing the points on the y-axis. 

# E.g. draw a line from (1,3) to position (8,10)
"""
import matplotlib.pyplot as plt
import numpy as np

# Define the starting and ending points of the line
xpoints = np.array([1,8])
ypoints = np.array([3,10])

plt.plot(xpoints, ypoints)
plt.show()
"""

# Plotting without line 
# To plot only the markers, you can use shortcut string notation parameters 'o', which means 'rings' 

# E.g. Draw 2 points in the diagram, one at position (1,3) and one position (8,10): 
"""
import matplotlib.pyplot as plt
import numpy as np

xpoints = np.array([1,8])
ypoints = np.array([3,10])

plt.plot(xpoints,ypoints, "o")
plt.show()
"""

# Multiple Points 
# You can plot as many points as you like, just make sure you have the same number or points in both axis. 

# E.g. Draw a line in a diagram from position (1,3) to (2,8) to (6,1) and finally to position (8,10): 
"""
import matplotlib.pyplot as plt
import numpy as np 

# Use numpy to create arrays for x and y points 
xpoints = np.array([1,2,6,8])
ypoints = np.array([3,8,1,10])

plt.plot(xpoints, ypoints)
plt.show() 
"""

# Default X-Points 
# If we don not specify the points on the x-axis, they will get the default values 0,1,2,3 (etc, depending on the lenght of the y-points). 
# So, if we take the same examples as above, and leave out the the x-points, the diagram looks like this 
"""
import matplotlib.pyplot as plt 
import numpy as np

# Use numpy to create arrays for y points only (leaving out x points) 
ypoints = np.array([3,8,1,10,5,7])

# Plot the graph points using plot() 
plt.plot(ypoints) 

# Show the plotted graph 
plt.show() 
"""

# Matplotlib Markers 

# Markers
# You can sue the keyword "marker" to emphasize each point with a specified marker: 
# E.g. Mark each point with a circle
"""
import matplotlib.pyplot as plt
import numpy as np 

# Use numpy to create an array for y-points. x-points will be default 
ypoints = np.array([3,8,1,10,7,5])

# Plot the graph with "o" marked for each plot point 
plt.plot(ypoints, marker = "o")

# Show the plotted graph 
plt.show() 
"""

# Format strings "fmt" 
# You can also use the short string notation parameter to specify the marker. This parameter is also called "fmt", and is written with this syntax: marker|line|color
"""
import matplotlib.pyplot as plt
import numpy as np 

# Use numpy to create an array for y-points. x-points will be default 
ypoints = np.array([3,8,1,10,7,5])

# Plot the graph with "o" marked for each plot point 
plt.plot(ypoints, "o:b")

# Show the plotted graph 
plt.show() 
"""

# Marker size 
# You can use the keyword argument "markersize" or the shorthor version, "ms" to set the size of the markers: 
# E.g. Set the size of the markers at 20: 
"""
import matplotlib.pyplot as plt
import numpy as np 

# Use numpy to create an array for y-points. x-points will be default 
ypoints = np.array([3,8,1,10,7,5])

# Plot the graph with "o" size 20 marked for each plot point 
plt.plot(ypoints, marker = "o", ms = 20)

# Show the plotted graph 
plt.show() 
"""

# Marker Color 
# You can use the keyword argument "markeredgecolor" or the shorter "mec" to set the color of the edge of the markers: 
# E.g. Set the Edge color to red: 
"""
import matplotlib.pyplot as plt
import numpy as np 

# Use numpy to create an array for y-points. x-points will be default 
ypoints = np.array([3,8,1,10,7,5])

# Plot the graph with "o" color, size as 20 and edge color as red for each plot point 
plt.plot(ypoints, marker = "o", ms = 20, mec = "r")

# Show the plotted graph 
plt.show() 
"""

# You can use the keyword "markerfacecolor" or the shorter "mfc" to set the color inside the edge of the markers: 
# E.g. Set the FACE color to red: 
"""
import matplotlib.pyplot as plt
import numpy as np 

# Use numpy to create an array for y-points. x-points will be default 
ypoints = np.array([3,8,1,10,7,5])

# Plot the graph with "o" color, size as 20, face color and edge color as red for each plot point 
plt.plot(ypoints, marker = "o", ms = 20, mfc = "r", mec = "b")

# Show the plotted graph 
plt.show() 
"""

# Matplotlib Line 

# Linestyle 
# You can use the keyword argument "linestyle", or shorter "ls", to change the style of the plotted line: 
# E.g. use a dotted line 
"""
import matplotlib.pyplot as plt
import numpy as np 

# Use numpy to create an array for y-points. x-points will be default 
ypoints = np.array([3,8,1,10,7,5])

# Plot the graph with "ls" to format the graph line 
plt.plot(ypoints, color = "r", lw = "20.5")

# Show the plotted graph 
plt.show() 
"""

# Multiple Lines 
# You can plot as many lines as you like by simply adding more "plt.plot()" functions: 
"""
import matplotlib.pyplot as plt
import numpy as np 

# Use numpy to create an array for y-points. x-points will be default 
ypoints1 = np.array([3,8,1,10,7,5])
ypoints2 = np.array([1,6,3,8,4,9])

# Plot the graph with "ls" to format the graph line 
plt.plot(ypoints1, color = "r")
plt.plot(ypoints2, color = "b")

# Show the plotted graph 
plt.show()
"""

# You can also plot many lines by adding the points for the x- and y-axis for each line in the same plt.plot() function. 
"""
import matplotlib.pyplot as plt
import numpy as np 

# Use numpy to create an array for y-points. x-points will be default 
xpoints1 = np.array([0,1,2,3])
ypoints1 = np.array([3,8,1,10])
xpoints2 = np.array([0,1,2,3])
ypoints2 = np.array([1,6,3,8])

# Plot the graph with "ls" to format the graph line 
plt.plot(xpoints1,ypoints1,xpoints2,ypoints2)

# Show the plotted graph 
plt.show()
"""

# Matplotlib Labels and Titles 

# Create labels for a plot 
# With Pyplot, you can use the xlabel() and ylabel() functions to set a label for the x- and y-axis. 

# E.g. Add labels to the x- and y-axis. 
"""
import matplotlib.pyplot as plt 
import numpy as np

# Use numpy to create an array for y-points. x-points will be default 
x = np.array([80,85,90,95,100,105,110,115,120,125])
y = np.array([240,250,260,270,280,290,300,310,320,330])

# Plot the graph 
plt.plot(x,y) 

plt.xlabel("Average Pulse") 
plt.ylabel("Calorie Burnage")

# Show the graph 
plt.show() 
"""

# Create a title for a plot 

# With Pyplot, you can use the title() function to set a title for the plot. 

# E.g. Add a plot title and lables for the x- and y-axis. 
"""
import matplotlib.pyplot as plt
import numpy as np 

# Use numpy to create an array for y-points. x-points will be default 
x = np.array([80,85,90,95,100,105,110,115,120,125])
y = np.array([240,250,260,270,280,290,300,310,320,330])

# Plot the graph 
plt.plot(x,y) 

plt.xlabel("Average Pulse") 
plt.ylabel("Calorie Burnage")
plt.title("Sports Watch Data")

# Show the graph 
plt.show() 
"""

# Set fondt properties for title and labels 
# You can set the "fontdict" parameter in xlabel(), ylabel(), and title() to set font properties for the title and labels. 

# E.g. Set font properties for the title and labels 
"""
import matplotlib.pyplot as plt
import numpy as np 

# Use numpy to create an array for y-points. x-points will be default 
x = np.array([80,85,90,95,100,105,110,115,120,125])
y = np.array([240,250,260,270,280,290,300,310,320,330])

font1 = {'family':'serif','color':'blue','size':20}
font2 = {'family':'serif','color':'darkred','size':15}

# Plot the graph 
plt.plot(x,y) 

plt.xlabel("Average Pulse", fontdict= font2) 
plt.ylabel("Calorie Burnage", fontdict= font2)
plt.title("Sports Watch Data", fontdict= font1)

# Show the graph 
plt.show() 
"""

# Add grid lines to a plot 

# With Pyplot, you can use the grid() function to add grid lines to the plot. 
"""
import matplotlib.pyplot as plt
import numpy as np 

# Use numpy to create an array for y-points. x-points will be default 
x = np.array([80,85,90,95,100,105,110,115,120,125])
y = np.array([240,250,260,270,280,290,300,310,320,330])

# Plot the graph 
plt.plot(x,y) 

plt.xlabel("Average Pulse") 
plt.ylabel("Calorie Burnage")
plt.title("Sports Watch Data")

# Add grids to the graph 
plt.grid() 

# Show the graph 
plt.show() 
"""

# Specify which grid lines to display 

# You can use the "axis" parameter in the grid() function to specify which grid lines to display. Legal values are: "x" and "y" 
"""
import matplotlib.pyplot as plt
import numpy as np 

# Use numpy to create an array for y-points. x-points will be default 
x = np.array([80,85,90,95,100,105,110,115,120,125])
y = np.array([240,250,260,270,280,290,300,310,320,330])

# Plot the graph 
plt.plot(x,y) 

plt.xlabel("Average Pulse") 
plt.ylabel("Calorie Burnage")
plt.title("Sports Watch Data")

# Add grids to the graph 
plt.grid(axis= "y") 

# Show the graph 
plt.show() 
"""

# Set line properties for the grid 

# You can also set the line properties of the grid, like this: grid(color = 'color', linestyle = 'linestyle', linewidth = number). 

# E.g. Set the properties of the grid. 
"""
import matplotlib.pyplot as plt
import numpy as np 

# Use numpy to create an array for y-points. x-points will be default 
x = np.array([80,85,90,95,100,105,110,115,120,125])
y = np.array([240,250,260,270,280,290,300,310,320,330])

# Plot the graph 
plt.plot(x,y) 

plt.xlabel("Average Pulse") 
plt.ylabel("Calorie Burnage")
plt.title("Sports Watch Data")

# Add grids to the graph 
plt.grid(color = "green", linestyle = "--", linewidth = 0.25) 

# Show the graph 
plt.show() 
"""

# Display multiple plots 

# With the subplot() function you can draw multiple plots in one figure: 

# E.g. Draw 2 plots: 
"""
import matplotlib.pyplot as plt 
import numpy as np 

# Use numpy to create an array for y-points. x-points will be default 

# Plot both graphs in one figure using the subplot function 

# for plot 1 
x = np.array([0,1,2,3])
y = np.array([3,8,1,10])

# Use subplot function
plt.subplot(1,2,1) 
plt.plot(x,y)

# for plot 2 
x = np.array([0,1,2,3])
y = np.array([10,20,30,40])

# Use subplot function
plt.subplot(1,2,2) 
plt.plot(x,y)

# Show the graph 
plt.show() 
"""

# E.g. Draw 2 plots on top of each other: 
"""
import matplotlib.pyplot as plt 
import numpy as np 

# Use numpy to create an array for y-points. x-points will be default 

# Plot both graphs in one figure using the subplot function 

# for plot 1 
x = np.array([0,1,2,3])
y = np.array([3,8,1,10])

# Use subplot function
plt.subplot(2,1,1) 
plt.plot(x,y)

# for plot 2 
x = np.array([0,1,2,3])
y = np.array([10,20,30,40])

# Use subplot function
plt.subplot(2,1,2) 
plt.plot(x,y)

# Show the graph 
plt.show() 
"""

# You can draw as many plots you like on one figure, just descibe the number of rows, columns, and the index of the plot.
"""
import matplotlib.pyplot as plt 
import numpy as np 

# Use numpy to create an array for y-points. x-points will be default 

# Plot both graphs in one figure using the subplot function 

# for plot 1 
x = np.array([0,1,2,3])
y = np.array([3,8,1,10])

# Use subplot function
plt.subplot(2,2,1) 
plt.plot(x,y)

# for plot 2 
x = np.array([0,1,2,3])
y = np.array([10,20,30,40])

# Use subplot function
plt.subplot(2,2,2) 
plt.plot(x,y)

# for plot 3
x = np.array([0,1,2,3])
y = np.array([7,14,21,28])

# Use subplot function
plt.subplot(2,2,3) 
plt.plot(x,y)

# for plot 4
x = np.array([0,1,2,3])
y = np.array([13,24,31,48])

# Use subplot function
plt.subplot(2,2,4) 
plt.plot(x,y)

# Show the graph 
plt.show() 
"""

# Matplotlib Scatter 

# Creating Scatter plots

# With Pyplot, you can use the scatter() function to draw a scatter plot. 
# The scatter() function plots one dot for each observation, it needs two arrays of the same of the length, one for the values of the x-axis, and one for the values of the y-axis: 

# E.g. A simple scatter plot: 
"""
import matplotlib.pyplot as plt
import numpy as np

x = np.array([5,7,8,7,2,17,2,9,4,11,12,9,6])
y = np.array([99,86,87,88,111,86,103,87,94,78,77,85,86])

plt.scatter(x,y) 

plt.show()
"""

# Compare plots 

# E.g draw 2 plots on the same figure
"""
import matplotlib.pyplot as plt
import numpy as np

#day one, the age and speed of 13 cars:
x = np.array([5,7,8,7,2,17,2,9,4,11,12,9,6])
y = np.array([99,86,87,88,111,86,103,87,94,78,77,85,86])
plt.scatter(x, y)

#day two, the age and speed of 15 cars:
x = np.array([2,2,8,1,15,8,12,9,7,3,11,4,7,14,12])
y = np.array([100,105,84,105,90,99,90,95,94,100,79,112,91,80,85])
plt.scatter(x, y) 

plt.show() 
"""

# Colors 
# You can set your own color for each scatter plot with the "color" or the "c" argument: 

# E.g. Set your own color of the markers
"""
import matplotlib.pyplot as plt
import numpy as np

#day one, the age and speed of 13 cars:
x = np.array([5,7,8,7,2,17,2,9,4,11,12,9,6])
y = np.array([99,86,87,88,111,86,103,87,94,78,77,85,86])
plt.scatter(x, y, color = 'hotpink')

#day two, the age and speed of 15 cars:
x = np.array([2,2,8,1,15,8,12,9,7,3,11,4,7,14,12])
y = np.array([100,105,84,105,90,99,90,95,94,100,79,112,91,80,85])
plt.scatter(x, y, color = '#88c999' ) 

plt.show() 
"""

# Color each dot 

# You can even set a specific color for each dot by using an array of colors as value for the "c" argument: 
# E.g. Set your own color of the markers: 
"""
import matplotlib.pyplot as plt
import numpy as np

x = np.array([5,7,8,7,2,17,2,9,4,11,12,9,6])
y = np.array([99,86,87,88,111,86,103,87,94,78,77,85,86])
colors = np.array(["red","green","blue","yellow","pink","black","orange","purple","beige","brown","gray","cyan","magenta"])

plt.scatter(x,y,c = colors) 

plt.show()
"""

# ColorMap 

# The Matplotlib module has a number of avaialble colormaps. 
# You can specify the colormap with keyword argument "cmap" with the value of the colormap 
# E.g. Create a color array, and specify a colormap in the scatter plot: 

import matplotlib.pyplot as plt 
import numpy as np 

x = np.array([5,7,8,7,2,17,2,9,4,11,12,9,6])
y = np.array([99,86,87,88,111,86,103,87,94,78,77,85,86])
colors = np.array([0, 10, 20, 30, 40, 45, 50, 55, 60, 70, 80, 90, 100])

plt.scatter(x,y, c=colors, cmap= 'viridis')

plt.colorbar()

plt.show() 