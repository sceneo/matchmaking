import json
import csv
import random
import string
import os
import io
import time
import boto3
from symbol import except_clause
from getpass import getuser
import requests

def getUsersFromS3():
    s3 = boto3.resource(u's3')
    bucket = s3.Bucket(u'matchmaking.data')
    obj = bucket.Object(key=u'users.csv')
    response = obj.get()
    users = csv.DictReader(response[u'Body'].read().decode('utf-8').split())
    return users

def getUsersWithGet():
    headers = {'content-type' : 'application/json; utf-8'}
    data = {"usecase": "detailsList"}
    
    url = "https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/Prod/MatchMakingAuth"
    response = requests.post(url,params=json.dumps(data),headers=headers)
    print(response.text)
    print(response.status_code)
    users = response.json();
    return users

def printAll():
    users = getUsersFromS3()
    for user in users:
        print(user)

def printFromGet():
    users = getUsersWithGet()
    for user in users:
        print(user)    

if __name__ == '__main__':
    printAll()
#     printFromGet();
    

