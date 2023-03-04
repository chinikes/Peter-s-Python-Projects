"""
EXERCISE: 
1. Iterate through the numbers 1 through 100
2. If the number is divisible by 3, print fizz, 
3. If the number is divisible by 5, print buzz, 
4. If the number is divisible by 15, print fizz buzz 
5. Other wise, just print the number 
"""

# go through numbers 1 to 100
"""
for i in range(1,101): 
    if i % 15 == 0: 
        print ("fizz buzz") 
    elif i % 3 == 0: 
        print("fizz") 
    elif i % 5 == 0: 
        print("buzz") 
    else: 
        print(i)
"""
"""
for i in range(1,101): 
    output = ""
    if i % 15 == 0: 
        output += "fizz buzz, " 
    elif i % 3 == 0: 
        output += "fizz, "
    elif i % 5 == 0: 
        output += "buzz, "
    else: 
        output += str(i) + ", " 
    print(output, end= " ")
"""
"""
for i in range(1,101):
    print("Fizz" if i % 15 == 0 else "Buzz" if i % 3 == 0 else "Fizz Buzz" if i % 5 == 0 else i)
"""

"""
# Trying out GitHub Copilot 
def calculate_age(birth_year):
    return 2021 - birth_year

mybirthyear = int(input("Enter your birth year: ")) 
print(calculate_age(mybirthyear)) 
"""