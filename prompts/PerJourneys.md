now create a plan so that we add this section to the admin pages and make sure it works right make sure also you fetch the ideas from the follwoing enpdoint 
LocationJourneys


GET
/api/LocationJourneys


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
  'https://transfer.tryasp.net/api/LocationJourneys' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQ0NjAxMjcsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.EtxCWEzYSvnw89IqqHOeqU42lKz0OOBtPNfG-28k9s4'
Request URL
https://transfer.tryasp.net/api/LocationJourneys
Server response
Code	Details
200	
Response body
Download
{
  "pageNumber": 1,
  "pageSize": 1,
  "totalPages": 10,
  "totalRecords": 10,
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": 2,
      "name": "journey"
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,19 Jul 2026 10:23:51 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 

 if you have any more questoin please provide them before you start
PerJourneys


GET
/api/PerJourneys


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
  'https://transfer.tryasp.net/api/PerJourneys' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQ0NjAxMjcsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.EtxCWEzYSvnw89IqqHOeqU42lKz0OOBtPNfG-28k9s4'
Request URL
https://transfer.tryasp.net/api/PerJourneys
Server response
Code	Details
200	
Response body
Download
{
  "pageNumber": 1,
  "pageSize": 1,
  "totalPages": 10,
  "totalRecords": 10,
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": 1,
      "fromLocationId": 3,
      "fromLocation": {
        "id": 3,
        "name": "new locatoin"
      },
      "toLocationId": 2,
      "toLocation": {
        "id": 2,
        "name": "journey"
      },
      "vehicleId": 2,
      "vehicle": {
        "id": 2,
        "name": "VAN",
        "model": "V6",
        "year": 2000,
        "licensePlate": "A-B-C2222",
        "capacity": 3,
        "imageUrl": "images/Vehicle/5c64137b-db9c-43b3-a244-6bba44b55e13.webp",
        "isActive": true,
        "vehicleCategoryId": 3,
        "vehicleCategoryName": "Vehicle Categorye",
        "vehicleCategory": {
          "id": 3,
          "name": "Vehicle Categorye",
          "description": "DescriptionDescriptionDescription",
          "isActive": true,
          "pricingType": "FixedTrip"
        },
        "vehicleFactoryId": 4,
        "vehicleFactoryName": "BMW",
        "vehicleFactory": {
          "id": 4,
          "name": "BMW"
        }
      },
      "price": 100
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,19 Jul 2026 10:24:37 GMT 
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

POST
/api/PerJourneys


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "fromLocationId": 3,
  "toLocationId": 2,
  "vehicleId": 2,
  "price": 100
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://transfer.tryasp.net/api/PerJourneys' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQ0NjAxMjcsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.EtxCWEzYSvnw89IqqHOeqU42lKz0OOBtPNfG-28k9s4' \
  -H 'Content-Type: application/json' \
  -d '{
  "fromLocationId": 3,
  "toLocationId": 2,
  "vehicleId": 2,
  "price": 100
}'
Request URL
https://transfer.tryasp.net/api/PerJourneys
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "message": "PerJourney created successfully",
  "data": {
    "id": 1,
    "fromLocationId": 3,
    "fromLocation": {
      "id": 3,
      "name": "new locatoin"
    },
    "toLocationId": 2,
    "toLocation": {
      "id": 2,
      "name": "journey"
    },
    "vehicleId": 2,
    "vehicle": {
      "id": 2,
      "name": "VAN",
      "model": "V6",
      "year": 2000,
      "licensePlate": "A-B-C2222",
      "capacity": 3,
      "imageUrl": "images/Vehicle/5c64137b-db9c-43b3-a244-6bba44b55e13.webp",
      "isActive": true,
      "vehicleCategoryId": 3,
      "vehicleCategoryName": "",
      "vehicleCategory": null,
      "vehicleFactoryId": 4,
      "vehicleFactoryName": "",
      "vehicleFactory": null
    },
    "price": 100
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,19 Jul 2026 10:24:13 GMT 
 location: https://transfer.tryasp.net/api/PerJourneys/1 
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
  "errors": [
    "string"
  ]
}
No links

GET
/api/PerJourneys/{id}


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

curl -X 'GET' \
  'https://transfer.tryasp.net/api/PerJourneys/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQ0NjAxMjcsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.EtxCWEzYSvnw89IqqHOeqU42lKz0OOBtPNfG-28k9s4'
Request URL
https://transfer.tryasp.net/api/PerJourneys/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Success",
  "data": {
    "id": 1,
    "fromLocationId": 3,
    "fromLocation": {
      "id": 3,
      "name": "new locatoin"
    },
    "toLocationId": 2,
    "toLocation": {
      "id": 2,
      "name": "journey"
    },
    "vehicleId": 2,
    "vehicle": {
      "id": 2,
      "name": "VAN",
      "model": "V6",
      "year": 2000,
      "licensePlate": "A-B-C2222",
      "capacity": 3,
      "imageUrl": "images/Vehicle/5c64137b-db9c-43b3-a244-6bba44b55e13.webp",
      "isActive": true,
      "vehicleCategoryId": 3,
      "vehicleCategoryName": "Vehicle Categorye",
      "vehicleCategory": {
        "id": 3,
        "name": "Vehicle Categorye",
        "description": "DescriptionDescriptionDescription",
        "isActive": true,
        "pricingType": "FixedTrip"
      },
      "vehicleFactoryId": 4,
      "vehicleFactoryName": "BMW",
      "vehicleFactory": {
        "id": 4,
        "name": "BMW"
      }
    },
    "price": 100
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,19 Jul 2026 10:24:52 GMT 
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
  "errors": [
    "string"
  ]
}
No links

PUT
/api/PerJourneys/{id}


Parameters
Cancel
Reset
Name	Description
id *
integer($int32)
(path)
1
Request body

application/json
{
  "id": 1,
  "fromLocationId": 2,
  "toLocationId": 3,
  "vehicleId": 2,
  "price": 110
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://transfer.tryasp.net/api/PerJourneys/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQ0NjAxMjcsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.EtxCWEzYSvnw89IqqHOeqU42lKz0OOBtPNfG-28k9s4' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "fromLocationId": 2,
  "toLocationId": 3,
  "vehicleId": 2,
  "price": 110
}'
Request URL
https://transfer.tryasp.net/api/PerJourneys/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "PerJourney updated successfully",
  "data": {
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
      "name": "VAN",
      "model": "V6",
      "year": 2000,
      "licensePlate": "A-B-C2222",
      "capacity": 3,
      "imageUrl": "images/Vehicle/5c64137b-db9c-43b3-a244-6bba44b55e13.webp",
      "isActive": true,
      "vehicleCategoryId": 3,
      "vehicleCategoryName": "",
      "vehicleCategory": null,
      "vehicleFactoryId": 4,
      "vehicleFactoryName": "",
      "vehicleFactory": null
    },
    "price": 110
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,19 Jul 2026 10:25:09 GMT 
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
  "errors": [
    "string"
  ]
}
No links

DELETE
/api/PerJourneys/{id}


Parameters
Try it out
Name	Description
id *
integer($int32)
(path)
id
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
  "data": "string",
  "errors": [
    "string"
  ]
}