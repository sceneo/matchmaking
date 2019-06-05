import json
import csv
import random
import string
import os
import io
import boto3
from symbol import except_clause
from getpass import getuser

#note: this is not state of the art authentication. This just illustrates the 
#usage of a lambda function to provide simple information


def response(message, status_code):
    return {
        'statusCode': str(status_code),
        'body': json.dumps(message),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
        }
    
def csvLineToString(line):
    si = BytesIO.StringIO()
    cw = csv.writer(si)
    cw.writerow(line)
    return si.getvalue().strip('\r\n')

def csvToString(data):
    si = BytesIO.StringIO()
    cw = csv.writer(si)
    for line in data:
        cw.writerow(line)
    return si.getvalue()

        
def getUsersFromS3():
    s3 = boto3.resource(u's3')
    bucket = s3.Bucket(u'matchmaking.data')
    obj = bucket.Object(key=u'users.csv')
    response = obj.get()
    users = csv.DictReader(response[u'Body'].read().split())
    return users

def updateUserListOnS3(users):
    bucket_name = "matchmaking.data"
    file_name = "users_test.csv"
    s3 = boto3.resource("s3")
    
    header="email,password\n"
    
    body = header
    
    users = getUsersFromS3()
    for row in users:
        line = row['email'] + "," + row['password'] + '\n'
        body = body + line
    
    s3.Bucket(bucket_name).put_object(Key=file_name, Body=body)
    
def createPassword(pwLength=10):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(pwLength))

def createToken(tokenLength=64):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(tokenLength))


def checkUser(username, password): 
    users = getUsersFromS3()
    for user in users:
        if username == user['email']:
                if password == user['password']:
                    print('authentication for user ' + username + ' successful')
                    return True
                else:
                    print('authentication for user ' + username + ' failed: wrong password')
                    return False
    print('could not find user ' + username)
    return False

def exists(username):
    users = getUsersFromS3()
    for user in users:
        if username == user['email']:
            print('user ' + username + ' exists')
            return True
    print('user ' + username + ' does not exist')
    return False

def changeUserPassword(username,newPassword):
    users = getUsersFromS3()
    for user in users:
        if username == user['email']:
            user['password'] = newPassword
    updateUserListOnS3(users)



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

    if(usecase == 'check'):
        email = event['queryStringParameters']['email']   
        if(exists(email)):
            return response(json.dumps('Existing user found!'))

    if(usecase == 'forgot'):
        email = event['queryStringParameters']['email']
        if(exists(username)):
            
            
            return response(json.dumps('Email with new password has been sent'),200)
        else:
            return response(json.dumps('User does not exist'),402)
        
    
    
    if(usecase == 'add'):
        # All data must be provided in call and should be added to a database or file
        email = event['queryStringParameters']['email']
        return response(json.dumps('User created'),201)
    
    return response(json.dumps('Lambda available, no usecase selected'),200)

if __name__ == '__main__':
    getUsersFromS3()
    checkUser('clown@here.de', 'no')
    checkUser('clown@here.de', 'blabla')
    checkUser('t@k.de', 'no')
    exists('t@k.de')
    exists('clown@here.de')
    changeUserPassword('clown@here.de', 'DasIstEinTest')
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



