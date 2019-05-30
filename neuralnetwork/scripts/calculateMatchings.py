import tensorflow as tf
from keras.models import Sequential
from keras.layers import Dense
from keras.models import load_model
import numpy as np
import csv
from datetime import date
import json
import utils as utils



def match(model_filename, user_data_filename, user_id):
    """
        Calculates the matching factors for user given by a user_id with all other registered users (excluding the user himself).

        Parameters:
        user_id (int): user to be matched

        Returns:
        list: list of all other user ids ordered descendingly by calculated matching factor. 
                That is the user belonging to the first user id in the list is the one that fits best to the user given by user_id
    """

    # load NN
    model = load_model(model_filename)

    # load user data
    user_data = utils.load_data(user_data_filename)

    # create predictions for user_id
    predictions = []
    for i in range(user_data.shape[0]):
        if i == user_id:
            continue

        input_data = np.array([user_data[user_id], user_data[i]])
        input_data = input_data.reshape(1, 10)
        pred = model.predict(x=input_data)
        predictions.append(tuple([i, pred]))

    # sort list by matching factor
    predictions = sorted(predictions, key=lambda x: -x[1])
    print(predictions)
    predictions = [i[0] for i in predictions]
    return predictions


if __name__ == "__main__":

    model_filename = "../data/model/2019-05-23_model.h5"
    user_data_filename = "../data/testdata/testdatanumeric.csv"

    predictions = match(model_filename, user_data_filename, user_id=2)
    print(predictions)
