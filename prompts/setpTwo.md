after that we should implment the following enpoinds as we will use them in the booking process 
first this 
that should be called to know the pirce in Eurs that we will display in the booking page 

POST
/api/Bookings/calculate-per-journey-price


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "perJourneyId": 3,
  "tripType": 1
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://transfer.tryasp.net/api/Bookings/calculate-per-journey-price' \
  -H 'accept: text/plain' \
  -H 'Content-Type: application/json' \
  -d '{
  "perJourneyId": 3,
  "tripType": 1
}'
Request URL
https://transfer.tryasp.net/api/Bookings/calculate-per-journey-price
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Price calculated successfully",
  "data": 1001,
  "errors": null
}
this will be to view the price of the journey and we will use it in the booking process and its a EUR basid 
after that we have the booking endpoint for the type that is per journey or the fixed trip one 
then we should sue this enpoidnt 
POST
/api/Bookings/per-journey


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "customerName": "pola",
  "customerEmail": "p@a.com",
  "customerPhoneNumber": "123",
  "bookingDate": "2026-07-20T07:34:55.417Z",
  "departureDate": "2026-07-25T20:00:00.000Z",
  "departureTime": "20:00:00",

  "tripType": 1,
  "passengarCount": 3,
  "perJourneyId": 3
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://transfer.tryasp.net/api/Bookings/per-journey' \
  -H 'accept: text/plain' \
  -H 'Content-Type: application/json' \
  -d '{
  "customerName": "pola",
  "customerEmail": "p@a.com",
  "customerPhoneNumber": "123",
  "bookingDate": "2026-07-20T07:34:55.417Z",
  "departureDate": "2026-07-25T20:00:00.000Z",
  "departureTime": "20:00:00",

  "tripType": 1,
  "passengarCount": 3,
  "perJourneyId": 3
}'
Request URL
https://transfer.tryasp.net/api/Bookings/per-journey
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Per journey booking created successfully",
  "data": 4,
  "errors": null
}
make sure the data in the respoinse here means the bookingId that will be used in the next step 
and the tripType 1 means that you are only doing to the destaiont and 2 means we will expecting you to get here are the return date and time just like the following request
POST
/api/Bookings/per-journey


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "customerName": "pola",
  "customerEmail": "p@a.com",
  "customerPhoneNumber": "123",
  "bookingDate": "2026-07-20T07:34:55.417Z",
  "departureDate": "2026-07-25T20:00:00.000Z",
  "departureTime": "20:00:00",
  "returnDate": "2026-07-26T02:00:00.000Z",
  "returnTime": "02:00:00",
  "tripType": 2,
  "passengarCount": 3,
  "perJourneyId": 3
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://transfer.tryasp.net/api/Bookings/per-journey' \
  -H 'accept: text/plain' \
  -H 'Content-Type: application/json' \
  -d '{
  "customerName": "pola",
  "customerEmail": "p@a.com",
  "customerPhoneNumber": "123",
  "bookingDate": "2026-07-20T07:34:55.417Z",
  "departureDate": "2026-07-25T20:00:00.000Z",
  "departureTime": "20:00:00",
  "returnDate": "2026-07-26T02:00:00.000Z",
  "returnTime": "02:00:00",
  "tripType": 2,
  "passengarCount": 3,
  "perJourneyId": 3
}'
Request URL
https://transfer.tryasp.net/api/Bookings/per-journey
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Per journey booking created successfully",
  "data": 5,
  "errors": null
}
make sure if the tripType is 1 we dont have the returnDate , returnTime

and make you put the perJourneyId from the card that the user clicked on when he chooses it and it should be send in the backend it should not be a filed 
then we will go to the billing page
in it make sure you show the deatlis that we can show and make sure we have the data for the next request that is booking POST
/api/Bookings/per-journey

also there are sectoin that needs to be chagned like the 
Payment Method
we will remove it and only have continue payment that will work like that 
when you click on it , it should use following endpoint and redirect it to the link in that response 
Payments


POST
/api/Payments/initialize


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "bookingId": 5
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://transfer.tryasp.net/api/Payments/initialize' \
  -H 'accept: text/plain' \
  -H 'Content-Type: application/json' \
  -d '{
  "bookingId": 5
}'
Request URL
https://transfer.tryasp.net/api/Payments/initialize
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Success",
  "data": {
    "paymentUrl": "https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_test_vzFIi703p3QjptQKTQACStHySHdjPszY&clientSecret=egy_csk_test_30e64b5fa302c41c10fdf7920dcb2d28",
    "bookingId": 5
  },
  "errors": null
}
that is the flow till now we still have more things that gonna happen but later 
could you create a plan so that the flow works right ?