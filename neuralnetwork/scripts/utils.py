import csv
import numpy as np


def load_data(filename):
    """
        Loads data from given file

        Parameters:
        filename (string): file to load

        Returns:
        array: data
    """

    with open(filename, 'r') as f:
        reader = csv.reader(f, delimiter=',')
        data = list(reader)
        data = np.array(data).astype("float")

        return data