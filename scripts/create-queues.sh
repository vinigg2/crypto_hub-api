#!/bin/sh
#CREATE SQS
aws sqs create-queue --endpoint-url ${AWS_ENDPOINT} --queue-name crypto-transactions-queue

#CREATE SNS
aws sns create-topic --endpoint-url ${AWS_ENDPOINT} --name crypto-transactions-topic

# CREATE SUBSCRIBE
aws sns subscribe \
    --endpoint-url ${AWS_ENDPOINT} \
    --attributes RawMessageDelivery=true \
    --topic-arn arn:aws:sns:${AWS_DEFAULT_REGION}:${AWS_ACCOUNT_ID}:crypto-transactions-topic \
    --protocol sqs \
    --notification-endpoint arn:aws:sqs:${AWS_DEFAULT_REGION}:${AWS_ACCOUNT_ID}:crypto-transactions-queue