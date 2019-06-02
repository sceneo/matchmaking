import numpy as np
import csv
from io import StringIO
import utils as utils


def create_probabilites(data):
    """
        Creates target values for the data. Simple algorithm: Right now, the probability increases if occupation or industry are equal

        Parameters:
        data (array): User data read from user data csv file

        Returns:
        array: input and target value data
    """

    input_data = []
    for i in range(len(data)):
        for j in range(len(data)):
            input_data.append([np.array(data[i]), np.array(data[j])])

    num_user_items = len(input_data[0][0])
    input_data = np.array(input_data).reshape(
        len(input_data), 2 * num_user_items)

    # we add two columns, one column for the number of swipes (=1 in this case, it will become important when we updated training data during actual usage)
    # and another column for the probability that X is interested in Y
    output_data = np.ones((input_data.shape[0], input_data.shape[1] + 2))
    output_data[:, :-2] = input_data

    # loop through all pairs (X,Y) of users and determine the probability that X is interested in Y
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

    # read test user data (numerical version)
    read_file = "../data/testdata/testdatanumeric.csv"
    user_data = utils.load_data(read_file)

    # calculate probabilities for all combinations of users (including probability X is interested in X)
    training_data = create_probabilites(user_data)
    print(training_data)

    # save intial training data
    write_file = "../data/testdata/initialtrainingdata.csv"
    with open(write_file, 'w') as f:
        writer = csv.writer(f, delimiter=',')
        writer.writerows(training_data)
