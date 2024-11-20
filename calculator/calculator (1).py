# Calculator code

import math

#Add operation
def add(*args):
    return sum(args)
#Subtract operation
def subtract(*args):
    result = args[0]
    for num in args[1:]:
        result -= num
    return result
#Multiply operation
def multiply(*args):
    result = 1
    for num in args:
        result *= num
    return result
#Devide operation
def divide(*args):
    result = args[0]
    for num in args[1:]:
        if num == 0:
            return "Error! Division by zero."
        result /= num
    return result
#Power operation
def power(*args):
    if len(args)>2:
        return "You should enter only two numbers"
    return args[0]**args[1]
#Square root opetarion
def square_root(*args):
    sqrt_list=[]
    for i in args:
        if i<0:
            return "Error! Square root of a negative number."
        else:
            sqrt_list.append(math.sqrt(i))
    return sqrt_list


def get_numbers():
    numbers = []
    while True:
        user_input = input("Enter a number or type 'done' to finish: ")
        if user_input.lower() == 'done':
            break
        try:
            num = float(user_input)
            numbers.append(num)
        except ValueError:
            print("Invalid input! Please enter a valid number.")
        
    return numbers

def calculator():
    print("Select operation:")
    print("1. Add")
    print("2. Subtract")
    print("3. Multiply")
    print("4. Divide")
    print("5. Power")
    print("6. Square root")

    while True:
        #Ask which operation
        choice = input("Enter choice form 1 to 6: ")

        if choice not in ['1', '2', '3', '4', '5', '6']:
            print("Invalid choice, please select 1, 2, 3, 4, 5 or 6.")
            continue

        # Get list of numbers
        numbers = get_numbers()

        if choice == '1':
            print(add(*numbers))
        elif choice == '2':
            print(subtract(*numbers))
        elif choice == '3':
            print(multiply(*numbers))
        elif choice == '4':
            print(divide(*numbers))
        elif choice == '5':
            print(power(*numbers))
        elif choice == '6':
            print(square_root(*numbers))

        #Ask if user wants to continue
        next_calculation = input("Do you want to perform another calculation? (yes/no): ").lower()
        if next_calculation != 'yes':
            print("Exiting calculator. Goodbye!")
            break

print(calculator())
