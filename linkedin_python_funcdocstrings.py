# Function documentation strings 

def myFunction(arg1,arg2=None):
    """
    myFunction(arg1,arg2=None) -> Doesn't really do anything, just prints the arguments passed to it
    
    Parameters:
    arg1: The first argument
    arg2: The second argument, defaults to None
    
    """
    print(arg1,arg2)


def main():
    print(myFunction.__doc__)



if __name__ == "__main__":
    main() 