import json
import csv
import random
import string
import os

#note: this is not state of the art authentication. This just illustrates the 
#usage of a lambda function to provide simple information

#In the webcase:
url = "https://s3-eu-west-1.amazonaws.com/matchmaking.data/users.csv"


def response(message, status_code):
    return {
        'statusCode': str(status_code),
        'body': json.dumps(message),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
        }

    
## This is the basic handling function which is called first
def analytics(event, context):

#https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/Prod/MatchMakingAnalytics
    matchingAccepted = event['queryStringParameters']['matchingAccepted']
    
    
    
    
    return response(json.dumps('Life is good'),202)
    


if __name__ == '__main__':
     url = 'users.csv'



