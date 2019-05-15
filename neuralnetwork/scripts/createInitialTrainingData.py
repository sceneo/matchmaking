import numpy as np
import csv
from io import StringIO


def create_probabilites(data):
    input_data = []
    for i in range(len(data)):
        for j in range(len(data)):
            input_data.append([np.array(data[i]), np.array(data[j])])
    
    num_user_items = len(input_data[0][0])
    input_data = np.array(input_data).reshape(len(input_data), 2 * num_user_items)
    
    # we add two columns, one column for the number of swipes (=1 in this case, it will become important when we updated training data during actual usage)
    # and another column for the probability that X is interested in Y
    output_data = np.ones((input_data.shape[0], input_data.shape[1] + 2))
    output_data[:, :-2] = input_data


    for i in range(output_data.shape[0]):
        prob = 0

        if output_data[i][1] == output_data[i][1 + num_user_items]:
            # same occupation increases probability
            prob += 0.2
        if output_data[i][4] == output_data[i][4 + num_user_items]:
            # same industry increases probability
            prob += 0.5
        
        output_data[i][11] = prob
    
    return output_data


if __name__ == "__main__":
    
    read_file = "../data/testdata/testdatanumeric.csv"
    with open(read_file, 'r') as f:
        reader = csv.reader(f, delimiter=',')
        data = list(reader)
        user_data = np.array(data).astype("float")

    training_data = create_probabilites(user_data)
    print(training_data)

    write_file = "../data/testdata/initialtrainingdata.csv"
    with open(write_file, 'w') as f:
        writer = csv.writer(f, delimiter=',')
        writer.writerows(training_data)
