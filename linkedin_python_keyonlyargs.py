# Demonstrate the use of keyword-only arguments 

# use keyword-only arguments to help ensure code clarity 
def myFunction(arg1, arg2, *, suppressExceptions=False): 
    pass 

def main(): 
    myFunction(1,2, suppressExceptions=True)

if __name__ == "__main__":
    main()
