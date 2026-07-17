now create a plan for the vehicles section when we select the id for the stuff we have added earler it should be a dropdown menu with the names of the things not the id as the id is hard to remember and is seceartere we can't show it could you now create a plan to add the pages and make sure this section work right 
GET
/api/Vehicles


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
  'https://transfer.tryasp.net/api/Vehicles' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyODAxMzgsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.x4998t0XWRlZ4c62rIO6pdBCNWal4Bv6elfSTcXpEt0'
Request URL
https://transfer.tryasp.net/api/Vehicles
Server response
Code	Details
200	
Response body
Download
{
  "pageNumber": 1,
  "pageSize": 10,
  "totalPages": 1,
  "totalRecords": 1,
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": 1,
      "name": "my fast car ",
      "model": "B2",
      "year": 1999,
      "licensePlate": " ب-ح-ب-1234",
      "capacity": 3,
      "imageUrl": "images/Vehicle/a4eb6431-a7e8-4db5-81a9-885451244546.webp",
      "isActive": true,
      "vehicleCategoryId": 1,
      "vehicleCategoryName": "Car",
      "vehicleCategory": {
        "id": 1,
        "name": "Car",
        "description": "Car go vrom vro",
        "isActive": true,
        "pricingType": "PerPerson"
      },
      "vehicleFactoryId": 2,
      "vehicleFactoryName": "CCC",
      "vehicleFactory": {
        "id": 2,
        "name": "CCC"
      }
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,17 Jul 2026 09:15:56 GMT 
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
/api/Vehicles


Parameters
Cancel
Reset
No parameters

Request body

multipart/form-data
Name
string
my fast car 
Send empty value
Model
string
B2
Send empty value
Year
integer($int32)
1999
Send empty value
LicensePlate
string
 ب-ح-ب-1234
Send empty value
Capacity
integer($int32)
3
Send empty value
ImageUrl
string($binary)
blackCar.png
Send empty value
IsActive
boolean

true
Send empty value
VehicleCategoryId
integer($int32)
1
Send empty value
VehicleFactoryId
integer($int32)
2
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://transfer.tryasp.net/api/Vehicles' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyODAxMzgsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.x4998t0XWRlZ4c62rIO6pdBCNWal4Bv6elfSTcXpEt0' \
  -H 'Content-Type: multipart/form-data' \
  -F 'VehicleCategoryId=1' \
  -F 'Model=B2' \
  -F 'Name=my fast car ' \
  -F 'IsActive=true' \
  -F 'ImageUrl=@blackCar.png;type=image/png' \
  -F 'LicensePlate= ب-ح-ب-1234' \
  -F 'VehicleFactoryId=2' \
  -F 'Capacity=3' \
  -F 'Year=1999'
Request URL
https://transfer.tryasp.net/api/Vehicles
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "message": "Vehicle created successfully",
  "data": {
    "id": 1,
    "name": "my fast car ",
    "model": "B2",
    "year": 1999,
    "licensePlate": " ب-ح-ب-1234",
    "capacity": 3,
    "imageUrl": "images/Vehicle/a4eb6431-a7e8-4db5-81a9-885451244546.webp",
    "isActive": true,
    "vehicleCategoryId": 1,
    "vehicleCategoryName": "Car",
    "vehicleCategory": {
      "id": 1,
      "name": "Car",
      "description": "Car go vrom vro",
      "isActive": true,
      "pricingType": "PerPerson"
    },
    "vehicleFactoryId": 2,
    "vehicleFactoryName": "CCC",
    "vehicleFactory": {
      "id": 2,
      "name": "CCC"
    }
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,17 Jul 2026 09:15:41 GMT 
 location: https://transfer.tryasp.net/api/Vehicles/1 
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
  "errors": [
    "string"
  ]
}
No links

GET
/api/Vehicles/{id}


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
  'https://transfer.tryasp.net/api/Vehicles/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyODAxMzgsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.x4998t0XWRlZ4c62rIO6pdBCNWal4Bv6elfSTcXpEt0'
Request URL
https://transfer.tryasp.net/api/Vehicles/1
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
    "name": "my fast car ",
    "model": "B2",
    "year": 1999,
    "licensePlate": " ب-ح-ب-1234",
    "capacity": 3,
    "imageUrl": "images/Vehicle/a4eb6431-a7e8-4db5-81a9-885451244546.webp",
    "isActive": true,
    "vehicleCategoryId": 1,
    "vehicleCategoryName": "Car",
    "vehicleCategory": {
      "id": 1,
      "name": "Car",
      "description": "Car go vrom vro",
      "isActive": true,
      "pricingType": "PerPerson"
    },
    "vehicleFactoryId": 2,
    "vehicleFactoryName": "CCC",
    "vehicleFactory": {
      "id": 2,
      "name": "CCC"
    }
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,17 Jul 2026 09:16:06 GMT 
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
  "errors": [
    "string"
  ]
}
No links

PUT
/api/Vehicles/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
id
Request body

application/json
{
  "id": 0,
  "name": "string",
  "model": "string",
  "year": 0,
  "licensePlate": "string",
  "capacity": 0,
  "imageUrl": "string",
  "isActive": true,
  "vehicleCategoryId": 0,
  "vehicleFactoryId": 0
}
Execute
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
  "errors": [
    "string"
  ]
}
No links

DELETE
/api/Vehicles/{id}


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