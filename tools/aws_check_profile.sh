#!/bin/sh
# Must return "Account": "609474313408"
echo "Must return AWS account ID 609474313408"
aws sts get-caller-identity