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

# setting up initial format for a status message
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

# convert one line from CSV file into a string 
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
 
# get users from S3         
def getUsersFromS3():
    s3 = boto3.resource(u's3')
    bucket = s3.Bucket(u'matchmaking.data')
    obj = bucket.Object(key=u'users.csv')
    response = obj.get()
    users = csv.DictReader(response[u'Body'].read().decode('utf-8').split())
    return users
 
def isOnline(email):
    updateStatusOnS3(email, True)

def isOffline(email):
    updateStatusOnS3(email, False)

def replaceBlanks(user):
    header="title,firstname,lastname,gender,company,industry,functionality,city,country,type,email,username,password,whitelist,blacklist,avatar,secretId\n"
    params = [x.strip() for x in header.split(',')]
    for x in params:
        if x == "firstname":
            x = "firstName"
        if x == "lastname":
            x = "lastName"
        if x == "whitelist":
            continue
        if x == "blacklist":
            continue
        if x == "avatar":
            continue
        if x == "secretId":
            continue
        user[x] = user[x].replace(" ", "_") 
    return user
    
def replaceUnderscore(user):
    header="title,firstname,lastname,gender,company,industry,functionality,city,country,type,email,username,password,whitelist,blacklist,avatar,secretId\n"
    params = [x.strip() for x in header.split(',')]
    for x in params:
        if x == "whitelist":
            continue
        if x == "blacklist":
            continue
        if x == "avatar":
            continue
        if x == "secretId":
            continue
        user[x] = user[x].replace("_", " ") 
    return user

# adding a new user to the user list on S3  
def updateUserListOnS3(newUser):
    bucket_name = "matchmaking.data"
    file_name = "users.csv"
    s3 = boto3.resource("s3")
    #recreate old file 
    header="title,firstname,lastname,gender,company,industry,functionality,city,country,type,email,username,password,whitelist,blacklist,avatar,secretId\n"
     
    body = header
    users = getUsersFromS3()
    for row in users:
        line = row['title'] + "," + row['firstname'] + "," + row['lastname'] + "," + row['gender'] + "," + row['company'] + "," + row['industry'] + "," + row['functionality'] + "," + row['city'] + "," + row['country'] + "," + row['type'] + "," + row['email'] + "," + row['username'] + "," + row['password'] + "," + row['whitelist'] + ',' + row['blacklist'] + "," + row['avatar'] + "," + row['secretId'] + '\n'
        body = body + line 
    newUser = replaceBlanks(newUser)
    line = newUser['title'] + "," + newUser['firstName'] + "," + newUser['lastName'] + "," + newUser['gender'] + "," + newUser['company'] + "," + newUser['industry'] + "," + newUser['functionality'] + "," + newUser['city'] + "," + newUser['country'] + "," + newUser['type'] + "," + newUser['email'] + "," + newUser['username'] + "," + newUser['password'] + ','+ '' + ',' + '' + ',' + str(random.randint(0,15)) + ',' + createToken(64) + '\n'
    
    body = body + line
    # add a new user
    s3.Bucket(bucket_name).put_object(Key=file_name, Body=body)
    return(newUser)
    
def getNumberOfUsersOnS3():
    users = getUsersFromS3()
    numUsers = 0
    for user in users:
        numUsers = numUsers + 1
    return numUsers

def getNumberOfMessagesOnS3():
    messages = getMessagesFromS3()
    numMessages = 0
    for message in messages:
        numMessages = numMessages + 1
    return numMessages    

def getMessagesFromS3():
    s3 = boto3.resource(u's3')
    bucket = s3.Bucket(u'matchmaking.data')
    obj = bucket.Object(key=u'messages.csv')
    response = obj.get()
    messages = csv.DictReader(response[u'Body'].read().decode('utf-8').split())
    return messages

def getMessageHistory(email):
    filtered = []
    messages = getMessagesFromS3()
    for message in messages:
        if(email == message['email']):
            filtered.append(message)
    return filtered

def updateMessageHistory(email,roomId,messageId):
    messages = getMessagesFromS3()
    foundItem = False

    bucket_name = "matchmaking.data"
    file_name = "messages.csv"
    s3 = boto3.resource("s3")
    #recreate old file 
    header="email,roomId,messageId\n"
    body = header
    for row in messages:
        if(email == row['email'] and roomId == row['roomId']):
            print('line is updated')
            row['messageId'] = messageId;
            foundItem = True
        line = row['email'] + "," + row['roomId'] + "," + row['messageId'] + '\n'
        body = body + line

    if(foundItem == False):
        print('adding a new line')
        line = email + "," + roomId + "," + messageId + '\n'  
        body = body + line
        
    s3.Bucket(bucket_name).put_object(Key=file_name, Body=body)    
 

def addToList(email, candidateId, listname):
    bucket_name = "matchmaking.data"
    file_name = "users.csv"
    s3 = boto3.resource("s3")
    
    candidate = getUserBySecretId(candidateId)
    
    #recreate old file 
    header="title,firstname,lastname,gender,company,industry,functionality,city,country,type,email,username,password,whitelist,blacklist,avatar,secretId\n"
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
            line = row['title'] + "," + row['firstname'] + "," + row['lastname'] + "," + row['gender'] + "," + row['company'] + "," + row['industry'] + "," + row['functionality'] + "," + row['city'] + "," + row['country'] + "," + row['type'] + "," + row['email'] + "," + row['username'] + "," + row['password'] + ','+ listing + ',' + row['blacklist'] + ',' + row['avatar'] + ',' + row['secretId'] + '\n'
        if(listname in 'blacklist'):
            line = row['title'] + "," + row['firstname'] + "," + row['lastname'] + "," + row['gender'] + "," + row['company'] + "," + row['industry'] + "," + row['functionality'] + "," + row['city'] + "," + row['country'] + "," + row['type'] + "," + row['email'] + "," + row['username'] + "," + row['password'] + ',' + row['whitelist'] + ',' + listing + ',' + row['avatar'] + ',' + row['secretId'] + '\n'
        body = body + line
    # add a new user
    s3.Bucket(bucket_name).put_object(Key=file_name, Body=body)

# create password      
def createPassword(pwLength=10):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(pwLength))

# create token  
def createToken(tokenLength=64):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(tokenLength))
 
# check if user is authenticated on S3
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

#check if user already exists 
def exists(username):
    users = getUsersFromS3()
    for user in users:
        if username == user['email']:
            print('user ' + username + ' exists')
            return True
    print('user ' + username + ' does not exist')
    return False

# getting user with different options from S3 
def getUser(email):
    users = getUsersFromS3()
    for user in users:
        if email == user['email']:
            return replaceUnderscore(user)
        
def getDetailsList():
    users = getUsersFromS3()
    list = []
    for user in users:
        list.append(replaceUnderscore(user))
    return list
 
def getUserByUsername(username):
    users = getUsersFromS3()
    for user in users:
        if username == user['username']:
            return replaceUnderscore(user)
        
def getUserBySecretId(secretId):
    secretId = str(secretId)
    users = getUsersFromS3()
    for user in users:
        if secretId == user['secretId']:
            return replaceUnderscore(user)
    print('SecretId not found!')

# get a status report from S3      
def getStatusFromS3():
    s3 = boto3.resource(u's3')
    bucket = s3.Bucket(u'matchmaking.data')
    obj = bucket.Object(key=u'status.csv')
    response = obj.get()
    status = csv.DictReader(response[u'Body'].read().decode('utf-8').split())
    return status

# update status on S3 
def updateStatusOnS3(email, isOnline):
    bucket_name = "matchmaking.data"
    file_name = "status.csv"
    s3 = boto3.resource("s3")
    #recreate old file 
    header="email,timestamp\n"
    body = header
    status = getStatusFromS3();
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

# get information about online status of users 
def getOnlineList():
    status = getStatusFromS3()
    onlineUsers = ''
    for row in status:
        if(time.time() - float(row['timestamp']) < 300):
            if row['email'] not in onlineUsers:
                onlineUsers += row['email'] + ';'
    return onlineUsers   


def autoRecovery():
    s3 = boto3.resource(u's3')
    bucket = s3.Bucket(u'matchmaking.data')
    obj = bucket.Object(key=u'autoRecovery.csv')
    response = obj.get()
    users = csv.DictReader(response[u'Body'].read().decode('utf-8').split())
    reco_numUsers = -1
    reco_numMessages = -1
    for user in users:
        reco_numUsers = user['numUsers']
        reco_numMessages = user['numMessages']
    numUsers = getNumberOfUsersOnS3()
    numMessages = getNumberOfMessagesOnS3()
    
    if reco_numUsers != str(numUsers) or reco_numMessages != str(numMessages):
        if int(reco_numUsers) > numUsers:
            recoverUsers()
        if int(reco_numUsers) < numUsers:
            backupUsers()
        if int(reco_numMessages) > numMessages:
           recoverMessages()
        if int(reco_numMessages) < numMessages:
            backupMessages()
            
        updateRecoveryCounter(max(reco_numUsers,numUsers), max(reco_numMessages,numMessages))
    else:
        print('no recovery needed')

def backupUsers():
    print('backup users')
    s3 = boto3.resource('s3')
    source= { 'Bucket' : 'matchmaking.data','Key':'users.csv'}
    s3.meta.client.copy(source, 'matchmaking.data', 'backup_users.csv')
    

def recoverUsers():
    print('recover users')
    s3 = boto3.resource('s3')
    source= { 'Bucket' : 'matchmaking.data','Key':'backup_users.csv'}
    s3.meta.client.copy(source, 'matchmaking.data', 'users.csv')

def backupMessages():
    print('backup messages')
    s3 = boto3.resource('s3')
    source= { 'Bucket' : 'matchmaking.data','Key':'messages.csv'}
    s3.meta.client.copy(source, 'matchmaking.data', 'backup_messages.csv')

def recoverMessages():
    print('recover messages')
    s3 = boto3.resource('s3')
    source= { 'Bucket' : 'matchmaking.data','Key':'backup_messages.csv'}
    s3.meta.client.copy(source, 'matchmaking.data', 'messages.csv')
    
def updateRecoveryCounter(numUsers,numMessages):
    print('update counter')
    bucket_name = "matchmaking.data"
    file_name = "autoRecovery.csv"
    s3 = boto3.resource("s3")

    header="numUsers,numMessages\n"
    body = header
    line = str(numUsers) + "," + str(numMessages) + '\n'
    body = body + line
    # add a new user
    s3.Bucket(bucket_name).put_object(Key=file_name, Body=body)

    

                
## This is the basic handling function which is called first
def auth(event, context):
    # URL is called via simple POST
    # https://05vtryrhrg.execute-api.eu-west-1.amazonaws.com/default/MatchMakingAuth
#     autoRecovery()
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
        return response('adding user',200)

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
        addToList(email, whitelistCandidate,'whitelist')
        
    if(body['usecase'] == 'getMessageHistory'):
        email = body['email']
        return response(getMessageHistory(email),200) 
    
    if(body['usecase'] == 'updateMessageHistory'):
        email = body['email']
        roomId = body['roomId']
        messageId = body['messageId']
        return response(updateMessageHistory(email,roomId,messageId),200)         
        
    if(body['usecase'] == 'detailsList'):
        return response(getDetailsList(),200)  
          
    return response('Lambda available, no usecase selected',200)

if __name__ == '__main__':
#     updateMessageHistory('lea.reckhord@gmail.de','testchannel','20002')
#     users = getUsersFromS3()
#     for user in users:
#         print(user)
#     
#     event = '{ "usecase": "register",  "title": "Dr", "firstName": "Tobias Tobias", "lastName": "Kunz", "gender": "Male", "company": "TNG", "industry": "Some Industry", "functionality": "IT Master", "city": "Munich", "country": "Germany",  "type": "Visitor", "email": "kunzi@gmail.de", "username": "testi", "password": "test"}'
#     y = json.loads(event);
#     updateUserListOnS3(y)
#     users = getUsersFromS3()
#     for user in users:
#         print(user)     
#     print(getUser('tobias.kunz@tngtech.com'))
    print(getUserBySecretId(3))

    
