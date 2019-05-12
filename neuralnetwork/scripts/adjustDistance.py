def adjust_distance(factor, current_distance):
    if (current_distance == 0) and (factor > 0):
        return 0.5
    elif (current_distance == 0) and (factor < 0):
        return 0
    elif (current_distance == 1) and (factor < 0):
        return 0.5
    else:
        return current_distance + factor*(1-current_distance)*current_distance


print ("some testing...")
print("")

for i in range(0,10):
    print((1/(10-i)), adjust_distance(1, 0+(1/(10-i))))

print("")

for i in range(0,10):
    print(1/(10-i), adjust_distance(-1, 1/(10-i)))