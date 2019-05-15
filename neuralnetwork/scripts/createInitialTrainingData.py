import numpy as np
import csv
from io import StringIO


def create_probabilites(data):
    input_data = []
    for i in range(len(data)):
        for j in range(len(data)):
            input_data.append([np.array(data[i]), np.array(data[j])])
    input_data = np.array(input_data).reshape(len(input_data), 10)

    output_data = np.zeros((input_data.shape[0], input_data.shape[1] + 1))
    output_data[:, :-1] = input_data

    for i in range(output_data.shape[0]):
        prob = 0
        if output_data[i][1] == output_data[i][6]:
            # same occupation increases probability
            prob += 0.2
        if output_data[i][4] == output_data[i][9]:
            # same industry increases probability
            prob += 0.5
        
        output_data[i][10] = prob
    
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
