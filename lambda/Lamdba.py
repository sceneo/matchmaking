import json


#note: this is not state of the art authentication. This just illustrates the 
#usage of a lambda function to provide simple information



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
            return {
                'statusCode': 202,
                'body': json.dumps('Authentication succesfull')
                }
        else:
            return {
                'statusCode': 401,
                'body': json.dumps('Not authorized')
                }             
    
    
    if(usecase == 'add'):
        # All data must be provided in call and should be added to a database or file
        email = event['queryStringParameters']['email']
        return {
            'statusCode': 201,
            'body': json.dumps('User created')
            }
    
    return {
        'statusCode': 200,
        'body': json.dumps('Lambda available, no usecase selected')
    }