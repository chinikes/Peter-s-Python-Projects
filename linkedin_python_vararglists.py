# Demonstrate the use of variable argument lists 

# TODO: define a function that takes a variable number of arguments 
def addition(*args): 
    result = 0
    for arg in args: 
        result += arg
    return result 


def main():
    # TODO: pass in different arguments 
    print(addition(5,10,15))

    # TODO: pass in an existing list 
    myList = [5,10,15,20,25] 
    print(addition(*myList))


if __name__ == "__main__":
    main()

