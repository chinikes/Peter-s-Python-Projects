# Lambda functions 
# Small, anyonymous functions that can be used to perform a single action 
# Typically used in place just when needed 

# Defined as: lambda arguments: expression

def CelsiusToFahrenheit(temp):
    return (temp * 9/5) + 32

def FahrenheitToCelsius(temp):
    return (temp - 32) * 5/9


def main():
    ctemps = [0, 12, 34, 100]
    ftemps = [32, 65, 100, 212] 

    # TODO: use regular functions to convert temps 
    print(list(map(CelsiusToFahrenheit, ctemps)))
    print(list(map(FahrenheitToCelsius, ftemps)))
    
    # TODO: use lambda functions to perform the conversion
    print(list(map(lambda t: (t * 9/5) + 32, ctemps))) 
    print(list(map(lambda t: (t - 32) * 5/9, ftemps)))

if __name__ == "__main__":
    main()

