import json


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


def checkUser(username, password):
    
    #TODO: here we must add the DB-File
    if(username == 't@k.de' and password == 'ok'):
        return True
    
    return False

def addUser(user):
    #TODO: add user to DB-File here 
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
    
    if(usecase == 'add'):
        # All data must be provided in call and should be added to a database or file
        email = event['queryStringParameters']['email']
        return response(json.dumps('User created'),201)
    
    return response(json.dumps('Lambda available, no usecase selected'),200)