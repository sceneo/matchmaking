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

def getUsersFromS3():
    s3 = boto3.resource(u's3')
    bucket = s3.Bucket(u'matchmaking.data')
    obj = bucket.Object(key=u'users.csv')
    response = obj.get()
    users = csv.DictReader(response[u'Body'].read().decode('utf-8').split())
    return users


def printAll():
    users = getUsersFromS3()
    for user in users:
        print(user)


if __name__ == '__main__':
    printAll()