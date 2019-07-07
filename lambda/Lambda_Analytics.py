import json
import csv
import random
import boto3

# setting up the initial format for a status message 
def response(message, status_code):
    return {
        'statusCode': str(status_code),
        'headers': {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json; charset=utf-8'"
            },
        'body': json.dumps(message)
        }

# getting users from S3
def getUsersFromS3():
    s3 = boto3.resource(u's3')
    bucket = s3.Bucket(u'matchmaking.data')
    obj = bucket.Object(key=u'users.csv')
    response = obj.get()
    users = csv.DictReader(response[u'Body'].read().decode('utf-8').split())
    return users

# getting titel of users
def getTitle(title):
    if(title == ''):
        return 0
    if(title == 'Dr'):
        return 1
    if(title == 'Prof'):
        return 2
    if(title == 'Prof Dr'):
        return 3
    return -1

# get gender of users 
def getGender(gender):
    if(gender == 'male'):
        return 0
    if(gender == 'female'):
        return 1
    return -1

# get type of users
def getType(type):
    if(type == 'Visitor'):
        return 0
    if(type == 'Exhibitor'):
        return 1
    if(type == 'Administrator'):
        return 3
    return -1

# get functionality of users    
def getFunctionality(functionality):    
    if(functionality == 'Sales'):
        return 0
    if(functionality == 'Marketing'):
        return 1
    if(functionality == 'Procurement'):
        return 2
    if(functionality == 'Event Management'):
        return 3
    if(functionality == 'Research and Development'):
        return 4
    if(functionality == 'PR and Communication'):
        return 5
    if(functionality == 'Quality Management'):
        return 6  
    if(functionality == 'IT'):
        return 7
    if(functionality == 'Finance and Controlling'):
        return 8
    if(functionality == 'Human Ressources'):
        return 9
    if(functionality == 'Executive Management'):
        return 10
    if(functionality == 'Freelance Professional'):
        return 11
    if(functionality == 'Other'):
        return 12    
    return -1

# get industry of users where they are currently working in   
def getIndustry(industry):
    if(industry == 'Automotive'):
        return 0
    if(industry == 'Chemistry'):
        return 1
    if(industry == 'Construction'):
        return 2
    if(industry == 'Consumer goods'):
        return 3
    if(industry == 'Electronics'):
        return 4
    if(industry == 'Energy'):
        return 5
    if(industry == 'Forestry'):
        return 6
    if(industry == 'Furnitures'):
        return 7
    if(industry == 'ICT'):
        return 8
    if(industry == 'Health Care'):
        return 9
    if(industry == 'Metal Production'):
        return 10
    if(industry == 'Publishing and Media'):
        return 11
    if(industry == 'Retail and Wholesale'):
        return 12
    if(industry == 'Textile and Clothing'):
        return 13
    if(industry == 'Traffic and Transport'):
        return  14
    return -1

# create anonymous list for each user to store information of each user        
def createAnonymousUserList():
    users = getUsersFromS3()
    anonymousList = []
    for user in users:
        newUser = {
            "title": getTitle(user['title']),
            "gender": getGender(user['gender']),
            "industry": getIndustry(user['industry']),
            "functionality": getFunctionality(['functionality']),
            "type": getType(user['type']),
            "secretId": user['secretId'],
            "name": user['username']
        }
        anonymousList.append(newUser)
    
    return anonymousList;


def analytics(event, context):
#https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/Prod/MatchMakingAnalytics
    list = createAnonymousUserList()
    return response(list,202)
    


if __name__ == '__main__':
    print(analytics('test','test'))