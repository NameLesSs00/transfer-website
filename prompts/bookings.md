now we shoud create a plan to implent those endpoint right in the app and also we should link them to the admin pages just like the rest of the admin also make srue we have an action called view booking so that we view a modle with the details of the booking create a full plan for this 
Bookings


GET
/api/Bookings


Parameters
Cancel
Name	Description
PageNumber
integer($int32)
(query)
1
PageSize
integer($int32)
(query)
3
Search
string
(query)
Search
SortBy
string
(query)
SortBy
IsDescending
boolean
(query)

--
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://transfer.tryasp.net/api/Bookings?PageNumber=1&PageSize=3' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQ1NjIzNzAsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.FqkLq7sQjqIE1WBLNkL5ML2Pr1dd7KkpuvHmUJ2v6zE'
Request URL
https://transfer.tryasp.net/api/Bookings?PageNumber=1&PageSize=3
Server response
Code	Details
200	
Response body
Download
{
  "pageNumber": 19,
  "pageSize": 1,
  "totalPages": 3,
  "totalRecords": 3,
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": 19,
      "customerName": "1123",
      "customerEmail": "q@q.co",
      "code": "BKG-20260720143338204-7668",
      "customerPhoneNumber": "123123",
      "bookingDate": "2026-07-20T14:33:37.285",
      "departureDate": "2026-07-23T14:38:00",
      "departureTime": "17:38:00",
      "returnDate": null,
      "returnTime": null,
      "passengarCount": 1,
      "status": "Confirmed",
      "type": "PerJourney",
      "tripType": "OneWay",
      "transferBookingDetailsId": null,
      "transferBookingDetails": null,
      "perJourneyId": 1,
      "perJourney": {
        "id": 1,
        "fromLocationId": 2,
        "fromLocation": {
          "id": 2,
          "name": "journey"
        },
        "toLocationId": 3,
        "toLocation": {
          "id": 3,
          "name": "new locatoin"
        },
        "vehicleId": 2,
        "vehicle": {
          "id": 2,
          "name": "string",
          "model": "string",
          "year": 2000,
          "licensePlate": "string",
          "capacity": 3,
          "imageUrl": "images/Vehicle/5c64137b-db9c-43b3-a244-6bba44b55e13.webp",
          "isActive": true,
          "vehicleCategoryId": 3,
          "vehicleCategoryName": "",
          "vehicleCategory": null,
          "vehicleFactoryId": 2,
          "vehicleFactoryName": "",
          "vehicleFactory": null
        },
        "price": 110
      },
      "originalPrice": 110,
      "discountPercentage": 0,
      "discountAmount": 0,
      "finalPrice": 110
    },
    {
      "id": 18,
      "customerName": "sdaf",
      "customerEmail": "Q@q.com",
      "code": "BKG-20260720141809417-3152",
      "customerPhoneNumber": "12312",
      "bookingDate": "2026-07-20T14:18:08.716",
      "departureDate": "2026-08-05T14:23:00",
      "departureTime": "17:23:00",
      "returnDate": null,
      "returnTime": null,
      "passengarCount": 1,
      "status": "Confirmed",
      "type": "PerJourney",
      "tripType": "OneWay",
      "transferBookingDetailsId": null,
      "transferBookingDetails": null,
      "perJourneyId": 1,
      "perJourney": {
        "id": 1,
        "fromLocationId": 2,
        "fromLocation": {
          "id": 2,
          "name": "journey"
        },
        "toLocationId": 3,
        "toLocation": {
          "id": 3,
          "name": "new locatoin"
        },
        "vehicleId": 2,
        "vehicle": {
          "id": 2,
          "name": "string",
          "model": "string",
          "year": 2000,
          "licensePlate": "string",
          "capacity": 3,
          "imageUrl": "images/Vehicle/5c64137b-db9c-43b3-a244-6bba44b55e13.webp",
          "isActive": true,
          "vehicleCategoryId": 3,
          "vehicleCategoryName": "",
          "vehicleCategory": null,
          "vehicleFactoryId": 2,
          "vehicleFactoryName": "",
          "vehicleFactory": null
        },
        "price": 110
      },
      "originalPrice": 110,
      "discountPercentage": 0,
      "discountAmount": 0,
      "finalPrice": 110
    },
    {
      "id": 17,
      "customerName": "12312",
      "customerEmail": "q@q.ocm",
      "code": "BKG-20260720135140707-2205",
      "customerPhoneNumber": "123123",
      "bookingDate": "2026-07-20T13:51:40.179",
      "departureDate": "2026-07-31T13:53:00",
      "departureTime": "16:53:00",
      "returnDate": null,
      "returnTime": null,
      "passengarCount": 13,
      "status": "Confirmed",
      "type": "Transfer",
      "tripType": "OneWay",
      "transferBookingDetailsId": 4,
      "transferBookingDetails": {
        "id": "4",
        "vehicleCategoryName": "malaky",
        "from": "second locatoin",
        "to": "The Daily Grind Coffee Co after edit."
      },
      "perJourneyId": null,
      "perJourney": null,
      "originalPrice": 1300,
      "discountPercentage": 0,
      "discountAmount": 0,
      "finalPrice": 1300
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Mon,20 Jul 2026 14:46:52 GMT 
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
      "code": "string",
      "customerPhoneNumber": "string",
      "bookingDate": "2026-07-20T14:47:29.244Z",
      "departureDate": "2026-07-20T14:47:29.244Z",
      "departureTime": "string",
      "returnDate": "2026-07-20T14:47:29.244Z",
      "returnTime": "string",
      "passengarCount": 0,
      "status": "string",
      "type": "string",
      "tripType": "string",
      "transferBookingDetailsId": 0,
      "transferBookingDetails": {
        "id": "string",
        "vehicleCategoryName": "string",
        "from": "string",
        "to": "string"
      },
      "perJourneyId": 0,
      "perJourney": {
        "id": 0,
        "fromLocationId": 0,
        "fromLocation": {
          "id": 0,
          "name": "string"
        },
        "toLocationId": 0,
        "toLocation": {
          "id": 0,
          "name": "string"
        },
        "vehicleId": 0,
        "vehicle": {
          "id": 0,
          "name": "string",
          "model": "string",
          "year": 0,
          "licensePlate": "string",
          "capacity": 0,
          "imageUrl": "string",
          "isActive": true,
          "vehicleCategoryId": 0,
          "vehicleCategoryName": "string",
          "vehicleCategory": {
            "id": 0,
            "name": "string",
            "description": "string",
            "isActive": true,
            "pricingType": "string"
          },
          "vehicleFactoryId": 0,
          "vehicleFactoryName": "string",
          "vehicleFactory": {
            "id": 0,
            "name": "string"
          }
        },
        "price": 0
      },
      "originalPrice": 0,
      "discountPercentage": 0,
      "discountAmount": 0,
      "finalPrice": 0
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
/api/Bookings/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
2
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://transfer.tryasp.net/api/Bookings/2' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQ1NjIzNzAsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.FqkLq7sQjqIE1WBLNkL5ML2Pr1dd7KkpuvHmUJ2v6zE'
Request URL
https://transfer.tryasp.net/api/Bookings/2
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Success",
  "data": {
    "id": 2,
    "customerName": "pola",
    "customerEmail": "p@a.com",
    "code": "",
    "customerPhoneNumber": "123",
    "bookingDate": "2026-07-20T07:34:55.417",
    "departureDate": "2026-07-25T20:00:00",
    "departureTime": "20:00:00",
    "returnDate": null,
    "returnTime": null,
    "passengarCount": 3,
    "status": "Pending",
    "type": "PerJourney",
    "tripType": "OneWay",
    "transferBookingDetailsId": null,
    "transferBookingDetails": null,
    "perJourneyId": 3,
    "perJourney": {
      "id": 3,
      "fromLocationId": 3,
      "fromLocation": {
        "id": 3,
        "name": "new locatoin"
      },
      "toLocationId": 4,
      "toLocation": {
        "id": 4,
        "name": "test"
      },
      "vehicleId": 2,
      "vehicle": {
        "id": 2,
        "name": "string",
        "model": "string",
        "year": 2000,
        "licensePlate": "string",
        "capacity": 3,
        "imageUrl": "images/Vehicle/5c64137b-db9c-43b3-a244-6bba44b55e13.webp",
        "isActive": true,
        "vehicleCategoryId": 3,
        "vehicleCategoryName": "",
        "vehicleCategory": null,
        "vehicleFactoryId": 2,
        "vehicleFactoryName": "",
        "vehicleFactory": null
      },
      "price": 1001
    },
    "originalPrice": 1001,
    "discountPercentage": 0,
    "discountAmount": 0,
    "finalPrice": 1001
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Mon,20 Jul 2026 14:47:14 GMT 
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
    "id": 0,
    "customerName": "string",
    "customerEmail": "string",
    "code": "string",
    "customerPhoneNumber": "string",
    "bookingDate": "2026-07-20T14:47:29.255Z",
    "departureDate": "2026-07-20T14:47:29.255Z",
    "departureTime": "string",
    "returnDate": "2026-07-20T14:47:29.255Z",
    "returnTime": "string",
    "passengarCount": 0,
    "status": "string",
    "type": "string",
    "tripType": "string",
    "transferBookingDetailsId": 0,
    "transferBookingDetails": {
      "id": "string",
      "vehicleCategoryName": "string",
      "from": "string",
      "to": "string"
    },
    "perJourneyId": 0,
    "perJourney": {
      "id": 0,
      "fromLocationId": 0,
      "fromLocation": {
        "id": 0,
        "name": "string"
      },
      "toLocationId": 0,
      "toLocation": {
        "id": 0,
        "name": "string"
      },
      "vehicleId": 0,
      "vehicle": {
        "id": 0,
        "name": "string",
        "model": "string",
        "year": 0,
        "licensePlate": "string",
        "capacity": 0,
        "imageUrl": "string",
        "isActive": true,
        "vehicleCategoryId": 0,
        "vehicleCategoryName": "string",
        "vehicleCategory": {
          "id": 0,
          "name": "string",
          "description": "string",
          "isActive": true,
          "pricingType": "string"
        },
        "vehicleFactoryId": 0,
        "vehicleFactoryName": "string",
        "vehicleFactory": {
          "id": 0,
          "name": "string"
        }
      },
      "price": 0
    },
    "originalPrice": 0,
    "discountPercentage": 0,
    "discountAmount": 0,
    "finalPrice": 0
  },
  "errors": [
    "string"
  ]
}
No links

PUT
/api/Bookings/{id}



DELETE
/api/Bookings/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://transfer.tryasp.net/api/Bookings/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQ1NjIzNzAsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.FqkLq7sQjqIE1WBLNkL5ML2Pr1dd7KkpuvHmUJ2v6zE'
Request URL
https://transfer.tryasp.net/api/Bookings/1
Server response
Code	Details
200	
Response body
Download
{
  "success": false,
  "message": "Booking deleted successfully",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Mon,20 Jul 2026 14:47:08 GMT 
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