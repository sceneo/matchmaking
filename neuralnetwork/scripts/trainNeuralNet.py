import tensorflow as tf
import numpy as np
import csv
from datetime import date


def load_data(filename):
    """
        Loads data from given file and splits data into input and target values

        Parameters:
        filename (string): file to load

        Returns:
        array: data input
        array: data target values
    """

    with open(filename, 'r') as f:
        reader = csv.reader(f, delimiter=',')
        data = list(reader)
        data = np.array(data).astype("float")

        # input data are all columns without the last two columns
        x_data = data[:, :-2]

        # last column is target, second last column is not needed for training, only for adjusting training data later on
        y_data = data[:, -1:]

        return x_data, y_data


def split_data(x, y, test_ratio = 0.2):
    """
        Splits given data in training and test set

        Parameters:
        x (array): data input
        y (array):  data target values
        test_ratio (float): percentage to determine test set size

        Returns:
        array: training data inputs
        array: test data inputs
        array: training data target values
        array: test data target values
    """

    # splitting index (rounded in favor of training data)
    s = int(x.shape[0] * test_ratio) + 1
 
    # Create and randomly permute an index.
    index = np.zeros(x.shape[0], dtype = bool)
    index[:s] = True
    index = np.random.permutation(index)
 
    return x[index], y[index], x[np.logical_not(index)], y[np.logical_not(index)]



def train_network(data_filename, weights_filename):
    """
        Defines and trains the neural network using training data given by the specified file

        Parameters:
        data_filename (string): filename containing training data
        weights_filename (string): filename to store trained weights of the NN

        Returns:
        -
    """

    print("Loading file from path:", data_filename)
    X_data, Y_data = load_data(data_filename)

    print("Splitting data in training and test set")
    X_train, Y_train, X_test, Y_test = split_data(X_data, Y_data)

    print(X_train[0], Y_train[0])

    return


if __name__ == "__main__":

    # filename initial training data (first training of the NN)
    data_filename = "../data/testdata/initialtrainingdata.csv"

    # filename to store trained NN weights
    weights_filename = "../data/weights/{0}_weights.hdf5".format(date.today())

    train_network(data_filename, weights_filename)