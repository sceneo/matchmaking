import tensorflow as tf
from keras.models import Sequential
from keras.layers import Dense
import numpy as np
import csv
from datetime import date
import utils as utils


def load_data_for_training(filename):
    """
        Loads data from given file and splits data into input and target values

        Parameters:
        filename (string): file to load

        Returns:
        array: data input
        array: data target values
    """

    data = utils.load_data(filename)

    # input data are all columns without the last two columns
    x_data = data[:, :-2]

    # last column is target, second last column is not needed for training, only for adjusting training data later on
    y_data = data[:, -1:]

    return x_data, y_data


def split_data(x, y, test_ratio=0.2):
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
    s = int(x.shape[0] * (1 - test_ratio)) + 1

    # Create and randomly permute an index.
    index = np.zeros(x.shape[0], dtype=bool)
    index[:s] = True
    index = np.random.permutation(index)

    return x[index], y[index], x[np.logical_not(index)], y[np.logical_not(index)]


def train_network(data_filename, model_filename, epochs, batch_size, loss='mse'):
    """
        Defines and trains the neural network using training data given by the specified file

        Parameters:
        data_filename (string): filename containing training data
        model_filename (string): filename to store the model and trained weights of the NN

        Returns:
        -
    """

    print("Loading file from path:", data_filename)
    X_data, Y_data = load_data_for_training(data_filename)

    print("Splitting data in training and test set")
    X_train, Y_train, X_test, Y_test = split_data(X_data, Y_data)

    # define the NN
    num_user_data = 10
    model = Sequential()

    model.add(Dense(units=64, activation='relu',
                    input_dim=num_user_data))
    model.add(Dense(units=128, activation='relu'))
    model.add(Dense(units=64, activation='relu'))
    model.add(Dense(units=16, activation='relu'))
    model.add(Dense(units=1, activation='relu'))

    model.compile(optimizer='adam', loss=loss,
                  metrics=['accuracy'])

    # train NN and store model
    model.fit(x=X_train, y=Y_train, epochs=epochs, batch_size=batch_size)
    model.save(model_filename)

    return


if __name__ == "__main__":

    # filename initial training data (first training of the NN)
    data_filename = "../data/testdata/initialtrainingdata.csv"

    # filename to store model and trained NN weights
    model_filename = "../data/model/{0}_model.h5".format(date.today())

    train_network(data_filename=data_filename,
                  model_filename=model_filename, epochs=100, batch_size=32)
