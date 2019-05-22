import json
import csv
import random
import string
import os
import boto3
from key import *
from symbol import except_clause

#note: this is not state of the art authentication. This just illustrates the 
#usage of a lambda function to provide simple information

# canonical id
# b398e72365bf041e6901bb0aa9c78fcbd0aaa2e90d90f8f7c8080a44cf428ccb

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
    
def getUsersFromS3():
    s3 = boto3.resource(u's3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
    bucket = s3.Bucket(u'matchmaking.data')
    obj = bucket.Object(key=u'users.csv')
    response = obj.get()

    users = csv.DictReader(response[u'Body'].read().split())
        # ate over those lines
#    for row in users:
#        print(row)

    return users
    
def createPassword(pwLength=10):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(pwLength))



def checkUser(username, password):
    return True
    
    
    users = getUsersFromS3()
    for user in users:
        if username == user['email']:
                if password == user['password']:
                    print('authentication successful')
                    return True
    print('could not authenticate user')
    return False


def deleteUser(username):
    names = []
    passwords = []
    with open(url) as csvfile:        
        readCSV = csv.reader(csvfile, delimiter=',')
        for row in readCSV:
            name = row[0]
            password = row[1]
            if(name != username):
                names.append(name)
                passwords.append(password)
        csvfile.close();
               
                    
    with open(url, "w") as file:
        writer = csv.writer(file)
        for i in xrange(len(names)):
            writer.writerow([names[i], passwords[i]])
        file.close()

def addUser(user,password):
    # check if user already exists
    with open(url) as csvfile:
        readCSV = csv.reader(csvfile, delimiter=',')
        for row in readCSV:
            if row[0] == user:
                print('user already exists')
                return False
        csvfile.close()
    # add row to CSV file
    with open(url, "a") as file:
        writer = csv.writer(file)
        writer.writerow([user,password])
        file.close()
    
    return True

def createNewPassword(username):
    names = []
    passwords = []
    with open(url) as csvfile:        
        readCSV = csv.reader(csvfile, delimiter=',')
        for row in readCSV:
            name = row[0]
            password = row[1]
            if(name == username):
                password = createPassword(10)
                sendEmailToUser(name,password)
            names.append(name)
            passwords.append(password)
        csvfile.close();
               
                    
    with open(url, "w") as file:
        writer = csv.writer(file)
        for i in xrange(len(names)):
            writer.writerow([names[i], passwords[i]])
        file.close()

def sendEmailToUser(name, password):
    #TODO
    return False
  


## This is the basic handling function which is called first
def auth(event, context):
    # URL is called via simple GET
    # https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/default/MatchMakingAuth
    # directly followed by a '?' and the parameters, separated by '&'
    
    # the usecase defines the following parameters:
    #?usecase=auth&email=ABCD@test.com&password=ABCDt    
    usecase = event['queryStringParameters']['usecase']
    if(usecase == 'auth'):

        email = event['queryStringParameters']['email']
        password = event['queryStringParameters']['password']   
        if(checkUser(email, password)):
            return response(json.dumps('Authentication successful'),202)
        else:
            return response(json.dumps('Not authorized'),401)

    if(usecase == 'forgot'):
    # check if user exists
        # if not found:
         # set new password
         # send email to user    
        return response(json.dumps('Email with new password has been sent'),200)
    
    
    if(usecase == 'add'):
        # All data must be provided in call and should be added to a database or file
        email = event['queryStringParameters']['email']
        return response(json.dumps('User created'),201)
    
    return response(json.dumps('Lambda available, no usecase selected'),200)

    

if __name__ == '__main__':
    getUsersFromS3()
    print("---check user---")
    print('trying correct credentials')
    checkUser('clown@here.de', 'no')
    print('trying wrong password')
    checkUser('t@k.de', 'no')
#     print('trying wrong email')
#     checkUser('tasfdsafd@.de', 'ok')
#     print('trying another user')
#     checkUser("test@testmail.com","billythekid")
#     print("---add user---")
#     print("adding exising user")
#     addUser("t@k.de",'ok')
#     print("adding new user clown")
#     addUser("clown@here.de",'noooo')
#     print('check the clown')
#     checkUser('clown@here.de','noooo')
#     print('deleting the clown again')
#     deleteUser('clown@here.de')
#     checkUser('clown@here.de','noooo')
#     print('checking main user again')
#     checkUser('t@k.de', 'ok')
#     print('------------')
#     print('create new user kyle')
#     addUser("kyle",'bla')
#     checkUser('kyle','bla')
#     createNewPassword('kyle')
#     deleteUser('kyle')



