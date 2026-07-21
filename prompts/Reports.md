create a full plan to implment the page Reports to the admin page it should be 5 tabs and in each tab you can filter baised on the filters we have in each report after that in the table of data it should be some columns from the data we have in the response of the api but not all of it we should select the most important columns to display in the table for each report make sure the data does show any id just relevent data and if there any charts that could be added that will help the user add them could you create a full plan for that and please study the file before doing anything 
Reports


GET
/api/Reports/bookings


Parameters
Cancel
Name	Description
PageNumber
integer($int32)
(query)
PageNumber
PageSize
integer($int32)
(query)
PageSize
Search
string
(query)
Search
DateFrom
string($date-time)
(query)
DateFrom
DateTo
string($date-time)
(query)
DateTo
Status
string
(query)
Status
BookingType
string
(query)
BookingType
TripType
string
(query)
TripType
VehicleCategoryId
integer($int32)
(query)
VehicleCategoryId
VehicleId
integer($int32)
(query)
VehicleId
ServiceId
integer($int32)
(query)
ServiceId
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://transfer.tryasp.net/api/Reports/bookings' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQ2MjY5MDAsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.r89UcBDIECjzpxZoC-yDlTtg8iltJaRIeHyGFJEF8Kc'
Request URL
https://transfer.tryasp.net/api/Reports/bookings
Server response
Code	Details
200	
Response body
Download
{
  "pageNumber": 17,
  "pageSize": 1,
  "totalPages": 10,
  "totalRecords": 10,
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": 19,
      "customerName": "1123",
      "customerEmail": "q@q.co",
      "customerPhoneNumber": "123123",
      "bookingDate": "2026-07-20T14:33:37.285",
      "departureDate": "2026-07-23T14:38:00",
      "departureTime": "17:38:00",
      "returnDate": null,
      "returnTime": null,
      "passengerCount": 1,
      "status": "Confirmed",
      "bookingType": "PerJourney",
      "tripType": "OneWay",
      "originalPrice": 110,
      "discountPercentage": 0,
      "discountAmount": 0,
      "finalPrice": 110,
      "transferFrom": null,
      "transferTo": null,
      "vehicleCategoryName": null,
      "perJourneyFrom": "journey",
      "perJourneyTo": "new locatoin",
      "vehicleName": "string",
      "vehicleLicensePlate": "string"
    },
    {
      "id": 18,
      "customerName": "sdaf",
      "customerEmail": "Q@q.com",
      "customerPhoneNumber": "12312",
      "bookingDate": "2026-07-20T14:18:08.716",
      "departureDate": "2026-08-05T14:23:00",
      "departureTime": "17:23:00",
      "returnDate": null,
      "returnTime": null,
      "passengerCount": 1,
      "status": "Confirmed",
      "bookingType": "PerJourney",
      "tripType": "OneWay",
      "originalPrice": 110,
      "discountPercentage": 0,
      "discountAmount": 0,
      "finalPrice": 110,
      "transferFrom": null,
      "transferTo": null,
      "vehicleCategoryName": null,
      "perJourneyFrom": "journey",
      "perJourneyTo": "new locatoin",
      "vehicleName": "string",
      "vehicleLicensePlate": "string"
    },
    {
      "id": 17,
      "customerName": "12312",
      "customerEmail": "q@q.ocm",
      "customerPhoneNumber": "123123",
      "bookingDate": "2026-07-20T13:51:40.179",
      "departureDate": "2026-07-31T13:53:00",
      "departureTime": "16:53:00",
      "returnDate": null,
      "returnTime": null,
      "passengerCount": 13,
      "status": "Confirmed",
      "bookingType": "Transfer",
      "tripType": "OneWay",
      "originalPrice": 1300,
      "discountPercentage": 0,
      "discountAmount": 0,
      "finalPrice": 1300,
      "transferFrom": "second locatoin",
      "transferTo": "The Daily Grind Coffee Co after edit.",
      "vehicleCategoryName": "malaky",
      "perJourneyFrom": null,
      "perJourneyTo": null,
      "vehicleName": null,
      "vehicleLicensePlate": null
    },
    {
      "id": 16,
      "customerName": "12312",
      "customerEmail": "q@q.com",
      "customerPhoneNumber": "134123",
      "bookingDate": "2026-07-20T13:30:09.362",
      "departureDate": "2026-07-24T16:30:00",
      "departureTime": "19:30:00",
      "returnDate": null,
      "returnTime": null,
      "passengerCount": 2,
      "status": "Confirmed",
      "bookingType": "PerJourney",
      "tripType": "OneWay",
      "originalPrice": 110,
      "discountPercentage": 0,
      "discountAmount": 0,
      "finalPrice": 110,
      "transferFrom": null,
      "transferTo": null,
      "vehicleCategoryName": null,
      "perJourneyFrom": "journey",
      "perJourneyTo": "new locatoin",
      "vehicleName": "string",
      "vehicleLicensePlate": "string"
    },
    {
      "id": 15,
      "customerName": "12312",
      "customerEmail": "q@q.com",
      "customerPhoneNumber": "12123",
      "bookingDate": "2026-07-20T13:24:24.122",
      "departureDate": "2026-07-22T13:26:00",
      "departureTime": "16:26:00",
      "returnDate": null,
      "returnTime": null,
      "passengerCount": 1,
      "status": "Confirmed",
      "bookingType": "PerJourney",
      "tripType": "OneWay",
      "originalPrice": 200,
      "discountPercentage": 0,
      "discountAmount": 0,
      "finalPrice": 200,
      "transferFrom": null,
      "transferTo": null,
      "vehicleCategoryName": null,
      "perJourneyFrom": "new locatoin",
      "perJourneyTo": "test",
      "vehicleName": "string",
      "vehicleLicensePlate": "string"
    },
    {
      "id": 14,
      "customerName": "asdfsad",
      "customerEmail": "a@a.com",
      "customerPhoneNumber": "1234123",
      "bookingDate": "2026-07-20T13:20:23.69",
      "departureDate": "2026-07-22T13:22:00",
      "departureTime": "16:22:00",
      "returnDate": null,
      "returnTime": null,
      "passengerCount": 1,
      "status": "Confirmed",
      "bookingType": "PerJourney",
      "tripType": "OneWay",
      "originalPrice": 200,
      "discountPercentage": 0,
      "discountAmount": 0,
      "finalPrice": 200,
      "transferFrom": null,
      "transferTo": null,
      "vehicleCategoryName": null,
      "perJourneyFrom": "journey",
      "perJourneyTo": "test",
      "vehicleName": "string2",
      "vehicleLicensePlate": "string1"
    },
    {
      "id": 13,
      "customerName": "12412",
      "customerEmail": "a@a.com",
      "customerPhoneNumber": "12312312",
      "bookingDate": "2026-07-20T13:18:55.681",
      "departureDate": "2026-07-21T16:18:00",
      "departureTime": "19:18:00",
      "returnDate": null,
      "returnTime": null,
      "passengerCount": 2,
      "status": "Confirmed",
      "bookingType": "PerJourney",
      "tripType": "OneWay",
      "originalPrice": 200,
      "discountPercentage": 0,
      "discountAmount": 0,
      "finalPrice": 200,
      "transferFrom": null,
      "transferTo": null,
      "vehicleCategoryName": null,
      "perJourneyFrom": "journey",
      "perJourneyTo": "test",
      "vehicleName": "string2",
      "vehicleLicensePlate": "string1"
    },
    {
      "id": 12,
      "customerName": "12312",
      "customerEmail": "q@q.com",
      "customerPhoneNumber": "12312123",
      "bookingDate": "2026-07-20T13:09:38.316",
      "departureDate": "2026-07-20T15:09:00",
      "departureTime": "18:09:00",
      "returnDate": null,
      "returnTime": null,
      "passengerCount": 2,
      "status": "Confirmed",
      "bookingType": "PerJourney",
      "tripType": "OneWay",
      "originalPrice": 200,
      "discountPercentage": 0,
      "discountAmount": 0,
      "finalPrice": 200,
      "transferFrom": null,
      "transferTo": null,
      "vehicleCategoryName": null,
      "perJourneyFrom": "new locatoin",
      "perJourneyTo": "test",
      "vehicleName": "string",
      "vehicleLicensePlate": "string"
    },
    {
      "id": 11,
      "customerName": "123",
      "customerEmail": "a@1.com",
      "customerPhoneNumber": "1243123",
      "bookingDate": "2026-07-20T12:34:35.319",
      "departureDate": "2026-07-21T12:37:00",
      "departureTime": "15:37:00",
      "returnDate": null,
      "returnTime": null,
      "passengerCount": 1,
      "status": "Confirmed",
      "bookingType": "PerJourney",
      "tripType": "OneWay",
      "originalPrice": 110,
      "discountPercentage": 0,
      "discountAmount": 0,
      "finalPrice": 110,
      "transferFrom": null,
      "transferTo": null,
      "vehicleCategoryName": null,
      "perJourneyFrom": "journey",
      "perJourneyTo": "new locatoin",
      "vehicleName": "string",
      "vehicleLicensePlate": "string"
    },
    {
      "id": 9,
      "customerName": "sdfasd",
      "customerEmail": "a@1.com",
      "customerPhoneNumber": "12123123",
      "bookingDate": "2026-07-20T12:08:14.973",
      "departureDate": "2026-07-21T12:08:00",
      "departureTime": "15:08:00",
      "returnDate": null,
      "returnTime": null,
      "passengerCount": 2,
      "status": "Pending",
      "bookingType": "PerJourney",
      "tripType": "OneWay",
      "originalPrice": 110,
      "discountPercentage": 0,
      "discountAmount": 0,
      "finalPrice": 110,
      "transferFrom": null,
      "transferTo": null,
      "vehicleCategoryName": null,
      "perJourneyFrom": "journey",
      "perJourneyTo": "new locatoin",
      "vehicleName": "string",
      "vehicleLicensePlate": "string"
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,21 Jul 2026 08:42:39 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "customerName": "string",
      "customerEmail": "string",
      "customerPhoneNumber": "string",
      "bookingDate": "2026-07-21T08:42:58.921Z",
      "departureDate": "2026-07-21T08:42:58.921Z",
      "departureTime": "string",
      "returnDate": "2026-07-21T08:42:58.921Z",
      "returnTime": "string",
      "passengerCount": 0,
      "status": "string",
      "bookingType": "string",
      "tripType": "string",
      "originalPrice": 0,
      "discountPercentage": 0,
      "discountAmount": 0,
      "finalPrice": 0,
      "transferFrom": "string",
      "transferTo": "string",
      "vehicleCategoryName": "string",
      "perJourneyFrom": "string",
      "perJourneyTo": "string",
      "vehicleName": "string",
      "vehicleLicensePlate": "string"
    }
  ],
  "errors": [
    "string"
  ],
  "pageNumber": 0,
  "pageSize": 0,
  "totalPages": 0,
  "totalRecords": 0
}
No links

GET
/api/Reports/payments


Parameters
Cancel
Name	Description
PageNumber
integer($int32)
(query)
PageNumber
PageSize
integer($int32)
(query)
PageSize
Status
string
(query)
Status
DateFrom
string($date-time)
(query)
DateFrom
DateTo
string($date-time)
(query)
DateTo
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://transfer.tryasp.net/api/Reports/payments' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQ2MjY5MDAsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.r89UcBDIECjzpxZoC-yDlTtg8iltJaRIeHyGFJEF8Kc'
Request URL
https://transfer.tryasp.net/api/Reports/payments
Server response
Code	Details
200	
Response body
Download
{
  "pageNumber": 17,
  "pageSize": 1,
  "totalPages": 10,
  "totalRecords": 10,
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": 22,
      "transactionId": "499357062",
      "paymentReference": "8392301",
      "status": "Paid",
      "amount": 110,
      "paidAt": "2026-07-20T16:34:21.579377",
      "bookingId": 19,
      "bookingDate": "2026-07-20T14:33:37.285",
      "bookingType": "PerJourney",
      "finalPrice": 110,
      "customerName": "1123",
      "customerEmail": "q@q.co",
      "customerPhoneNumber": "123123"
    },
    {
      "id": 21,
      "transactionId": "499348330",
      "paymentReference": "6453768",
      "status": "Paid",
      "amount": 110,
      "paidAt": "2026-07-20T16:18:50.1565388",
      "bookingId": 18,
      "bookingDate": "2026-07-20T14:18:08.716",
      "bookingType": "PerJourney",
      "finalPrice": 110,
      "customerName": "sdaf",
      "customerEmail": "Q@q.com",
      "customerPhoneNumber": "12312"
    },
    {
      "id": 20,
      "transactionId": "499334081",
      "paymentReference": "3367582",
      "status": "Paid",
      "amount": 1300,
      "paidAt": "2026-07-20T15:52:19.2506479",
      "bookingId": 17,
      "bookingDate": "2026-07-20T13:51:40.179",
      "bookingType": "Transfer",
      "finalPrice": 1300,
      "customerName": "12312",
      "customerEmail": "q@q.ocm",
      "customerPhoneNumber": "123123"
    },
    {
      "id": 19,
      "transactionId": "499322920",
      "paymentReference": "2722437",
      "status": "Paid",
      "amount": 110,
      "paidAt": "2026-07-20T15:30:48.4818656",
      "bookingId": 16,
      "bookingDate": "2026-07-20T13:30:09.362",
      "bookingType": "PerJourney",
      "finalPrice": 110,
      "customerName": "12312",
      "customerEmail": "q@q.com",
      "customerPhoneNumber": "134123"
    },
    {
      "id": 18,
      "transactionId": "499319894",
      "paymentReference": "5483615",
      "status": "Paid",
      "amount": 200,
      "paidAt": "2026-07-20T15:25:01.5134882",
      "bookingId": 15,
      "bookingDate": "2026-07-20T13:24:24.122",
      "bookingType": "PerJourney",
      "finalPrice": 200,
      "customerName": "12312",
      "customerEmail": "q@q.com",
      "customerPhoneNumber": "12123"
    },
    {
      "id": 17,
      "transactionId": "499317747",
      "paymentReference": "7841314",
      "status": "Paid",
      "amount": 200,
      "paidAt": "2026-07-20T15:20:57.5287932",
      "bookingId": 14,
      "bookingDate": "2026-07-20T13:20:23.69",
      "bookingType": "PerJourney",
      "finalPrice": 200,
      "customerName": "asdfsad",
      "customerEmail": "a@a.com",
      "customerPhoneNumber": "1234123"
    },
    {
      "id": 16,
      "transactionId": "499317067",
      "paymentReference": "7548268",
      "status": "Paid",
      "amount": 200,
      "paidAt": "2026-07-20T15:19:34.4208057",
      "bookingId": 13,
      "bookingDate": "2026-07-20T13:18:55.681",
      "bookingType": "PerJourney",
      "finalPrice": 200,
      "customerName": "12412",
      "customerEmail": "a@a.com",
      "customerPhoneNumber": "12312312"
    },
    {
      "id": 15,
      "transactionId": "499312170",
      "paymentReference": "2585200",
      "status": "Paid",
      "amount": 200,
      "paidAt": "2026-07-20T15:10:15.5826769",
      "bookingId": 12,
      "bookingDate": "2026-07-20T13:09:38.316",
      "bookingType": "PerJourney",
      "finalPrice": 200,
      "customerName": "12312",
      "customerEmail": "q@q.com",
      "customerPhoneNumber": "12312123"
    },
    {
      "id": 14,
      "transactionId": "499293803",
      "paymentReference": "7076247",
      "status": "Paid",
      "amount": 110,
      "paidAt": "2026-07-20T14:35:14.9531547",
      "bookingId": 11,
      "bookingDate": "2026-07-20T12:34:35.319",
      "bookingType": "PerJourney",
      "finalPrice": 110,
      "customerName": "123",
      "customerEmail": "a@1.com",
      "customerPhoneNumber": "1243123"
    },
    {
      "id": 5,
      "transactionId": "",
      "paymentReference": "7663623",
      "status": "Pending",
      "amount": 400,
      "paidAt": null,
      "bookingId": 3,
      "bookingDate": "2026-07-20T08:09:09.198",
      "bookingType": "Transfer",
      "finalPrice": 400,
      "customerName": "John Doe",
      "customerEmail": "john.doe@example.com",
      "customerPhoneNumber": "+15551234567"
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,21 Jul 2026 08:42:47 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "transactionId": "string",
      "paymentReference": "string",
      "status": "string",
      "amount": 0,
      "paidAt": "2026-07-21T08:42:58.932Z",
      "bookingId": 0,
      "bookingDate": "2026-07-21T08:42:58.932Z",
      "bookingType": "string",
      "finalPrice": 0,
      "customerName": "string",
      "customerEmail": "string",
      "customerPhoneNumber": "string"
    }
  ],
  "errors": [
    "string"
  ],
  "pageNumber": 0,
  "pageSize": 0,
  "totalPages": 0,
  "totalRecords": 0
}
No links

GET
/api/Reports/revenue


Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://transfer.tryasp.net/api/Reports/revenue' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQ2MjY5MDAsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.r89UcBDIECjzpxZoC-yDlTtg8iltJaRIeHyGFJEF8Kc'
Request URL
https://transfer.tryasp.net/api/Reports/revenue
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Success",
  "data": {
    "revenueToday": 0,
    "revenueThisWeek": 2540,
    "revenueThisMonth": 2540,
    "revenueThisYear": 2540,
    "revenueByBookingType": [
      {
        "bookingType": "Transfer",
        "totalRevenue": 1300,
        "totalBookings": 1
      },
      {
        "bookingType": "PerJourney",
        "totalRevenue": 1240,
        "totalBookings": 8
      }
    ],
    "revenueByVehicleCategory": [
      {
        "vehicleCategoryId": 1,
        "vehicleCategoryName": "malaky",
        "totalRevenue": 1300,
        "totalBookings": 1
      }
    ]
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,21 Jul 2026 08:42:50 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "string",
  "data": {
    "revenueToday": 0,
    "revenueThisWeek": 0,
    "revenueThisMonth": 0,
    "revenueThisYear": 0,
    "revenueByBookingType": [
      {
        "bookingType": "string",
        "totalRevenue": 0,
        "totalBookings": 0
      }
    ],
    "revenueByVehicleCategory": [
      {
        "vehicleCategoryId": 0,
        "vehicleCategoryName": "string",
        "totalRevenue": 0,
        "totalBookings": 0
      }
    ]
  },
  "errors": [
    "string"
  ]
}
No links

GET
/api/Reports/vehicles


Parameters
Cancel
Name	Description
topN
integer($int32)
(query)
10
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://transfer.tryasp.net/api/Reports/vehicles?topN=10' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQ2MjY5MDAsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.r89UcBDIECjzpxZoC-yDlTtg8iltJaRIeHyGFJEF8Kc'
Request URL
https://transfer.tryasp.net/api/Reports/vehicles?topN=10
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Success",
  "data": {
    "mostBooked": [
      {
        "vehicleId": 2,
        "vehicleName": "string",
        "model": "string",
        "licensePlate": "string",
        "vehicleCategoryName": "Vehicle Categorye",
        "vehicleFactoryName": "CCC",
        "bookingCount": 11,
        "totalRevenue": 840
      },
      {
        "vehicleId": 1,
        "vehicleName": "string2",
        "model": "string33",
        "licensePlate": "string1",
        "vehicleCategoryName": "malaky",
        "vehicleFactoryName": "CCC",
        "bookingCount": 4,
        "totalRevenue": 400
      }
    ],
    "leastBooked": [
      {
        "vehicleId": 1,
        "vehicleName": "string2",
        "model": "string33",
        "licensePlate": "string1",
        "vehicleCategoryName": "malaky",
        "vehicleFactoryName": "CCC",
        "bookingCount": 4,
        "totalRevenue": 400
      },
      {
        "vehicleId": 2,
        "vehicleName": "string",
        "model": "string",
        "licensePlate": "string",
        "vehicleCategoryName": "Vehicle Categorye",
        "vehicleFactoryName": "CCC",
        "bookingCount": 11,
        "totalRevenue": 840
      }
    ]
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,21 Jul 2026 08:42:54 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "string",
  "data": {
    "mostBooked": [
      {
        "vehicleId": 0,
        "vehicleName": "string",
        "model": "string",
        "licensePlate": "string",
        "vehicleCategoryName": "string",
        "vehicleFactoryName": "string",
        "bookingCount": 0,
        "totalRevenue": 0
      }
    ],
    "leastBooked": [
      {
        "vehicleId": 0,
        "vehicleName": "string",
        "model": "string",
        "licensePlate": "string",
        "vehicleCategoryName": "string",
        "vehicleFactoryName": "string",
        "bookingCount": 0,
        "totalRevenue": 0
      }
    ]
  },
  "errors": [
    "string"
  ]
}
No links

GET
/api/Reports/services


Parameters
Cancel
Name	Description
topN
integer($int32)
(query)
10
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://transfer.tryasp.net/api/Reports/services?topN=10' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQ2MjY5MDAsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.r89UcBDIECjzpxZoC-yDlTtg8iltJaRIeHyGFJEF8Kc'
Request URL
https://transfer.tryasp.net/api/Reports/services?topN=10
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Success",
  "data": {
    "mostBooked": [
      {
        "serviceId": 1,
        "serviceKey": "DiscountBooking",
        "serviceValue": "0",
        "bookingCount": 0
      }
    ],
    "leastBooked": [
      {
        "serviceId": 1,
        "serviceKey": "DiscountBooking",
        "serviceValue": "0",
        "bookingCount": 0
      }
    ]
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,21 Jul 2026 08:42:57 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "string",
  "data": {
    "mostBooked": [
      {
        "serviceId": 0,
        "serviceKey": "string",
        "serviceValue": "string",
        "bookingCount": 0
      }
    ],
    "leastBooked": [
      {
        "serviceId": 0,
        "serviceKey": "string",
        "serviceValue": "string",
        "bookingCount": 0
      }
    ]
  },
  "errors": [
    "string"
  ]
}