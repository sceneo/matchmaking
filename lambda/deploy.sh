#!/usr/bin/env bash
# This script expects the AWS_ACCESS_KEY_ID and the AWS_SECRET_ACCESS_KEY to be set.
# These credentials can be obtained as described here: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html
# Also the document describes how to set them.
# For a test run add --dry-run to the aws command


#all available lambdas:
declare -a lambdas=( "analytics" "auth" "matchme" "ALL")

#remember where you started the script
originaldir=$(pwd)
argument=$1
selectedLambda=""
artefactDir=$originaldir

# Deploying the different lambdas 
function deploy {
	echo "Deployment of $selectedLambda starting."
	echo 'upload to aws'
	lambda=""
	sourceFile=""
	if [ "$selectedLambda" = "auth" ]; then
		lambda="MatchMakingAuth"
		sourceFile="Lambda_Auth.py"
    elif [ "$selectedLambda" = "analytics" ]; then
        lambda="MatchMakingAnalytics"
        sourceFile="Lambda_Analytics.py"
    elif [ "$selectedLambda" = "matchme" ]; then
        lambda="MatchMakingMatchMe"
		sourceFile="Lambda_MatchMe.py"
    fi
        
	build_dir=$(pwd)
	package_dir=$(mktemp -d)
#	pip3.7 install -rrequirements.txt -t src/
	cp ${sourceFile} src/
	
	cp -r src/* ${package_dir}
	pushd ${package_dir}
	zip -r ${build_dir}/lambda.zip *
	popd

	echo "deploying to AWS: ${lambda}"
	aws lambda update-function-code --function-name $lambda --region eu-west-1 --zip-file fileb://lambda.zip
	echo "cleaning up"
	rm -f lambda.zip
	rm -rf src/Lambda*
}

# Error Message if no lambda was selected 
function error_notFound {
	echo 'please select one of the following:'
	counter=0
	for i in "${lambdas[@]}"; do
		echo "$counter) $i"
		let counter=$counter+1
	done
	echo "and type <<./build_and_upload.sh [name] >>"
	exit
}

# check which lambda is selected 
function checkArgument {
	echo "checking argument: $argument"
	for i in "${lambdas[@]}"; do
		if [ "$argument" = "$i" ]; then
			selectedLambda=$i
			break
		fi
	done
	if [ "$selectedLambda" = "" ]; then
		error_notFound		
		exit
	fi
}

############ Entry point for ############

# check if any argument has been  given
if [ $# -eq 0 ]; then
	echo 'You did not specify the deployment environment.'
	error_notFound
else
	checkArgument

fi

#additional check if deploying to all
if [ "$selectedLambda" = "ALL" ]; then
	echo 'Warning: You are going to deploy to ALL lambdas.'
	while true; do
    		read -p 'Are you sure? (y/n) ' yn
    		case $yn in
        	[Yy]* ) 
			for i in "${lambdas[@]}"; do
				selectedLambda=$i		
				if [ "$selectedLambda" != "ALL" ]; then	
#					./build.sh			
					deploy;
				fi
 			done
			break;;
        	[Nn]* ) exit;;
        	* ) echo "Please answer y(es) or n(o).";;
    		esac
	done	
else
#	./build.sh
	deploy
fi


#going back to the original direction
cd $originaldir
