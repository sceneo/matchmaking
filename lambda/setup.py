import boto3
import os
import sys
import zipfile

REQUIREMENTS_BUCKET_NAME = ''
REQUIREMENTS_KEY = ''

pkgdir = '/tmp/requirements'
zip_requirements = '/tmp/lambda-requirements.zip'

sys.path.append(pkgdir)

if os.environ.get("AWS_EXECUTION_ENV") is not None:
    if not os.path.exists(pkgdir):

        s3 = boto3.resource('s3')
        bucket = s3.Bucket(REQUIREMENTS_BUCKET_NAME)
        bucket.download_file(REQUIREMENTS_KEY, zip_requirements)

        zipfile.ZipFile(zip_requirements, 'r').extractall(pkgdir)
        os.remove('zip_requirements')

        sys.path.append(pkgdir)