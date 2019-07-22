import json
import csv
import random
import string
import os
import ast
import boto3
from botocore.vendored import requests
import numpy as np
from keras.models import Sequential
from keras.layers import Dense
from keras.models import load_model

#from wheel.util import utf8


def response(message, status_code):
    return {
        'statusCode': str(status_code),
        'body': json.dumps(message),
        'headers': {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json; utf-8"
        },
    }


def getUsersFromAnalytics():
    response = requests.get(
        'https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/Prod/MatchMakingAnalytics')
    data = response.json()
    data = eval(json.dumps(data))
    return data


def getMatchingList(secretId):
        
    # get user list with attributes as numbers
    userDataList = getUsersFromAnalytics()

    # load the NN
    # load file from S3
    # s3 = boto3.resource(u's3')
    # bucket = s3.Bucket(u'matchmaking.data')
    # obj = bucket.Object(key=u'2019-05-23_model.h5')
    # response = obj.download_file('/tmp/2019-05-23_model.h5')
    model = load_model("../neuralnetwork/data/model/2019-05-23_model.h5")

    # store input data for the user who wants to get recommendations
    buffer = [u for u in userDataList if u['secretId'] == secretId]
    my_user_data = np.zeros(5)
    my_user_data[0] = buffer[0]['gender']
    my_user_data[1] = buffer[0]['industry']
    my_user_data[2] = buffer[0]['functionality']
    my_user_data[3] = buffer[0]['type']
    my_user_data[4] = buffer[0]['title']

    predictions = []

    for user in userDataList:
        if (user['secretId'] == secretId):
            continue

        user_data = np.zeros(5)
        user_data[0] = user['gender']
        user_data[1] = user['industry']
        user_data[2] = user['functionality']
        user_data[3] = user['type']
        user_data[4] = user['title']

        input_data = np.array([my_user_data, user_data])
        input_data = input_data.reshape(1, 10)

        print("Evaluate for", input_data)

        # calculate values with NN
        pred = model.predict(x=input_data)
        predictions.append(tuple([user['secretId'], pred]))

    # sort by matching factor
    predictions = sorted(predictions, key=lambda x: -x[1])
    return predictions

# This is the basic handling function which is called first


def matchme(event, context): 

    body = json.loads(event['body'])  

    if(body['usecase'] == 'matchme'):
        id = body['secretId']
        recommendation_list = getMatchingList(id)
        return(recommendation_list, 200)
          
    return response('Lambda available, no usecase selected',200)



if __name__ == '__main__':
    print(getMatchingList(1))
