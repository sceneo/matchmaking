
import numpy as np
import csv
from datetime import date
import utils as utils

def update_training_data(x_data, swipe_left, filename):
    if (filename == ''):
        print('Output file = input file')
    
    print(x_data, swipe_left, filename)
    
    # read file
    # check if x_data already available
    # if yes: update probability accordingly
    # if no: add new x_data with probability 0 or 1
    # store complete training data in file

    return


if __name__ == "__main__":
    update_training_data([1,2,3,4,5,1,2,3,4,5], True, '../data/testdata/initialtrainingdata.csv')