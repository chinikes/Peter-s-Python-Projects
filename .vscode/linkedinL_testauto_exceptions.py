
# Option 1 - Handling exceptions using a try-except section 
"""
def print_sum(num1,num2): 
    try:
        print(num1+num2)
    except Exception as e: 
        print("Could not add those numbers: {} - {}".format(type(e).__name__, e.args))
"""

# Option 2 - Using an If conditional to raise an exception 
def print_sum(num1,num2): 
    if type(num1) != int or type(num2) != int: 
        raise Exception("Inputs to the print_sum function must be integers")
    else: 
        print(num1+num2)

try:    
    print_sum(1,"hi")
except Exception as e: 
    print("Someting went wrong: {}".format(e))


print_sum(2,3)