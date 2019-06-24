import json
import csv
import random
import string
import os
import ast
import boto3
import requests
import httplib2 as http
from wheel.util import utf8

def response(message, status_code):
    return {
        'statusCode': str(status_code),
        'body': json.dumps(message),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
        }
    
def getUsersFromAnalytics():
    response = requests.get('https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/Prod/MatchMakingAnalytics')
    data = response.json()
    data = eval(json.dumps(data))
    return data
    
def getMatchingList(secretId):
        #this should be replaced by a call to "Analytics"-Lambda
    list = getUsersFromAnalytics()
    sortedList = [];
    for user in list:
        if(secretId == user['secretId']):
            continue
        if(secretId == 1):
            continue;
        sortedList.append(user['secretId'])
        

    # do some sorting:
    # currently it is only random
    random.shuffle(sortedList) #shuffle method
    return sortedList

## This is the basic handling function which is called first
def matchme(event, context):
    body = json.loads(event['body'])    
    if(body['usecase'] == 'matchme'):
        secretId = body['secretId']
        userlist = getMatchingList(secretId)
        return(userlist,200)
        
    return response('Lambda available, no usecase selected',200)

if __name__ == '__main__':
    print(getMatchingList('lea.reckhord@gmail.com'))
