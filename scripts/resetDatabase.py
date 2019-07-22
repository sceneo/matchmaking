

import boto3


def uploadFile(filename):
    s3 = boto3.resource('s3')
    BUCKET = "matchmaking.data"
    
    s3.Bucket(BUCKET).upload_file("../database/" + filename, filename)
    print('uploaded ' + filename)

def uploadAll():
    uploadFile('backup_users.csv')
    uploadFile('backup_messages.csv')
    uploadFile('autoRecovery.csv')
    uploadFile('users.csv')
    uploadFile('messages.csv')

if __name__ == '__main__':
    uploadAll()

