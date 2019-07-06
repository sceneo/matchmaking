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


#note: this is not state of the art authentication. This just illustrates the 
#usage of a lambda function to provide simple information
def response(message, status_code):
    return {
        'statusCode': str(status_code),
        'body': json.dumps(message),
        'headers': {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json; utf-8"
            }
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
    obj = bucket.Object(key=u'users_fake_secrets.csv')
    response = obj.get()
    users = csv.DictReader(response[u'Body'].read().decode('utf-8').split())
    return users
 
def isOnline(email):
    updateStatusOnS3(email, True)

def isOffline(email):
    updateStatusOnS3(email, False)
 
def updateUserListOnS3(newUser):
    bucket_name = "matchmaking.data"
    file_name = "users.csv"
    s3 = boto3.resource("s3")
    #recreate old file 
    header="title,firstname,lastname,gender,company,industry,functionality,city,country,type,email,username,password,whitelist,blacklist,avatar\n"
     
    body = header
    users = getUsersFromS3()
    for row in users:
        line = row['title'] + "," + row['firstname'] + "," + row['lastname'] + "," + row['gender'] + "," + row['company'] + "," + row['industry'] + "," + row['functionality'] + "," + row['city'] + "," + row['country'] + "," + row['type'] + "," + row['email'] + "," + row['username'] + "," + row['password'] + "," + row['whitelist'] + ',' + row['blacklist'] + "," + row['avatar'] + '\n'
        body = body + line
     
    line = newUser['title'] + "," + newUser['firstName'] + "," + newUser['lastName'] + "," + newUser['gender'] + "," + newUser['company'] + "," + newUser['industry'] + "," + newUser['functionality'] + "," + newUser['city'] + "," + newUser['country'] + "," + newUser['type'] + "," + newUser['email'] + "," + newUser['username'] + "," + newUser['password'] + ','+ '' + ',' + '' + ',' + str(random.randint(0,15)) + '\n'
    body = body + line
    
    # add a new user
    s3.Bucket(bucket_name).put_object(Key=file_name, Body=body)

def addToList(email, candidateId, listname):
    bucket_name = "matchmaking.data"
    file_name = "users.csv"
    s3 = boto3.resource("s3")
    
    candidate = getUserBySecretId(candidateId)
    
    #recreate old file 
    header="title,firstname,lastname,gender,company,industry,functionality,city,country,type,email,username,password,whitelist,blacklist,avatar\n"
    body = header
    users = getUsersFromS3()
    for row in users:
        if(row['secretId'] == 1):
            continue;
        listing = row[listname]
        if(email == row['email']):
            if(candidate == None):
                print('No candidate found!')
                break
            if(candidate['email'] in listing):
                print("already in list")
            else:
                 listing = row[listname] + ';' + candidate['email']        
        if(listname in 'whitelist' ):
            line = row['title'] + "," + row['firstname'] + "," + row['lastname'] + "," + row['gender'] + "," + row['company'] + "," + row['industry'] + "," + row['functionality'] + "," + row['city'] + "," + row['country'] + "," + row['type'] + "," + row['email'] + "," + row['username'] + "," + row['password'] + ','+ listing + ',' + row['blacklist'] + ',' + row['avatar'] + '\n'
        else:
            line = row['title'] + "," + row['firstname'] + "," + row['lastname'] + "," + row['gender'] + "," + row['company'] + "," + row['industry'] + "," + row['functionality'] + "," + row['city'] + "," + row['country'] + "," + row['type'] + "," + row['email'] + "," + row['username'] + "," + row['password'] + ',' + row['whitelist'] + ',' + listing + ',' + row['avatar'] + '\n'
        body = body + line
    # add a new user
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
        if(username == user['email']):
                if(password == user['password']):
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
 
def getUser(email):
    users = getUsersFromS3()
    for user in users:
        if email == user['email']:
            return user
     
def getUserByUsername(username):
    users = getUsersFromS3()
    for user in users:
        if username == user['username']:
            return user
        
def getUserBySecretId(secretId):
    secretId = str(secretId)
    users = getUsersFromS3()
    for user in users:
        if secretId == user['secretId']:
            return user
    print('SecretId not found!')
     
def getStatusFromS3():
    s3 = boto3.resource(u's3')
    bucket = s3.Bucket(u'matchmaking.data')
    obj = bucket.Object(key=u'status.csv')
    response = obj.get()
    status = csv.DictReader(response[u'Body'].read().decode('utf-8').split())
    return status
 
def updateStatusOnS3(email, isOnline):
    bucket_name = "matchmaking.data"
    file_name = "status.csv"
    s3 = boto3.resource("s3")
    #recreate old file 
    header="email,timestamp\n"
    body = header
    status = getStatusFromS3()
    for row in status:
        if(time.time() - float(row['timestamp']) < 300):
            if(isOnline == False):
                if(row['email'] == email):
                    continue
            line = row['email'] + "," + row['timestamp'] + '\n'
            body = body + line
    
    if(isOnline == True): 
        line = email + ',' + str(time.time()) + '\n'
        body = body + line
        
    s3.Bucket(bucket_name).put_object(Key=file_name, Body=body)
 
def getOnlineList():
    status = getStatusFromS3()
    onlineUsers = ''
    for row in status:
        if(time.time() - float(row['timestamp']) < 300):
            if row['email'] not in onlineUsers:
                onlineUsers += row['email'] + ';'
    return onlineUsers   
    
                
## This is the basic handling function which is called first
def auth(event, context):
    # URL is called via simple POST
    # https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/default/MatchMakingAuth

    body = json.loads(event['body'])    
    if(body['usecase'] == 'auth'):
        email = body['email']
        password = body['password']
        
        if(checkUser(email, password)):
            isOnline(email)
            return response('Authentication successful',202)
        else:
            return response('Not authorized',401)
         
    if(body['usecase'] == 'listOnline'):
        return response(getOnlineList(),200) 
 
    if(body['usecase'] == 'logout'):
        email = body['email']
        isOffline(email)
        return response('Logout successfull',200)
 
    if(body['usecase'] == 'isOnline'):
        email = body['email']
        if(email in getOnlineList()):
            return response('Online',200) 
        else:
            return response('Offline',200)
 
    if(body['usecase'] == 'detailsByEmail'):
        email = body['email']  
        return response(getUser(email),200)          
 
    if(body['usecase'] == 'detailsByUsername'):
        username = body['username']  
        return response(getUserByUsername(username),200)  
        
    if(body['usecase'] == 'detailsBySecretId'):
        secretId = body['secretId']  
        return response(getUserBySecretId(secretId),200)      
 
    if(body['usecase'] == 'register'):
        if(exists(body['email'])):
            return response('already existing',201)
        updateUserListOnS3(body)
        return response("created succesfully",200)
 
    if(body['usecase'] == 'alive'):
        email = body['email']
        isOnline(email)
        return response('updated',200)

    if(body['usecase'] == 'addToBlacklist'):
        email = body['email']
        blacklistCandidate = body['blacklistCandidate']
        isOnline(email)
        addToList(email, blacklistCandidate,'blacklist')
 
    if(body['usecase'] == 'addToWhitelist'):
        email = body['email']
        whitelistCandidate = body['whitelistCandidate']
        isOnline(email)
        addTolist(email, whitelistCandidate,'whitelist')   
          
    return response('Lambda available, no usecase selected',200)

if __name__ == '__main__':
    checkUser('lea.reckhord@gmail.de','lea')