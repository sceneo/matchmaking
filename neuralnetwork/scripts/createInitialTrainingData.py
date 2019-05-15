import numpy as np
import csv
from io import StringIO


def create_probabilites(data):
    return


if __name__ == "__main__":
    
    file = "../data/testdata/testdatanumeric.csv"

    with open(file, 'r') as f:
        reader = csv.reader(f, delimiter=',')
        data = list(reader)
        user_data = np.array(data).astype("float")

    print(user_data[len(user_data)-1])