To Run otp service follow below steps
1. npm i
2. npm run start


Curl request of send and verify otp

sendOtp

curl --location 'http://localhost:3000/sendOtp' \
--header 'Content-Type: application/json' \
--data '{
    "mobile":"9967470948"
}'


verifyOtp

curl --location 'http://localhost:3000/verifyOtp' \
--header 'Content-Type: application/json' \
--data '{
    "mobile":"9967470948",
    "otp":"123456"
}'