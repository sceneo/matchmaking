#!/usr/bin/env bash

build_dir=$(pwd)
package_dir=$(mktemp -d)

pip3.7 install -rrequirements.txt -t src/
cp -r src/* ${package_dir}
pushd ${package_dir}
zip -r ${build_dir}/lambda.zip *
popd
