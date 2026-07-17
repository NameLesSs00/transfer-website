now create a plan for this section there is a small bug tho that in the craete it reutrns nulls but in the final build it will return the names of the locatoin anyways could you create a plan for this section so that the admin pages works right 
RoutePricings


GET
/api/RoutePricings


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
  'https://transfer.tryasp.net/api/RoutePricings' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyODQxNjksImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.pMayt_TSXyL3kp-8GM1Q5QKUHfj4w-GgH56FZNFVwpc'
Request URL
https://transfer.tryasp.net/api/RoutePricings
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
      "vehicleCategoryName": "Car",
      "locationFrom": "The Daily Grind Coffee Co after edit.",
      "locationTo": "second locatoin",
      "price": 200,
      "isActive": true
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,17 Jul 2026 10:00:17 GMT 
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
      "vehicleCategoryName": "string",
      "locationFrom": "string",
      "locationTo": "string",
      "price": 0,
      "isActive": true
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
/api/RoutePricings


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "transferRouteId": 1,
  "vehicleCategoryId": 1,
  "price": 200,
  "isActive": true
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://transfer.tryasp.net/api/RoutePricings' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyODQxNjksImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.pMayt_TSXyL3kp-8GM1Q5QKUHfj4w-GgH56FZNFVwpc' \
  -H 'Content-Type: application/json' \
  -d '{
  "transferRouteId": 1,
  "vehicleCategoryId": 1,
  "price": 200,
  "isActive": true
}'
Request URL
https://transfer.tryasp.net/api/RoutePricings
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "message": "RoutePricing created successfully",
  "data": {
    "id": 1,
    "vehicleCategoryName": "Car",
    "locationFrom": null,
    "locationTo": null,
    "price": 200,
    "isActive": true
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,17 Jul 2026 09:58:59 GMT 
 location: https://transfer.tryasp.net/api/RoutePricings/1 
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
    "vehicleCategoryName": "string",
    "locationFrom": "string",
    "locationTo": "string",
    "price": 0,
    "isActive": true
  },
  "errors": [
    "string"
  ]
}
No links

GET
/api/RoutePricings/{id}


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
  'https://transfer.tryasp.net/api/RoutePricings/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyODQxNjksImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.pMayt_TSXyL3kp-8GM1Q5QKUHfj4w-GgH56FZNFVwpc'
Request URL
https://transfer.tryasp.net/api/RoutePricings/1
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
    "vehicleCategoryName": "Car",
    "locationFrom": "The Daily Grind Coffee Co after edit.",
    "locationTo": "second locatoin",
    "price": 200,
    "isActive": true
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,17 Jul 2026 09:59:56 GMT 
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
    "vehicleCategoryName": "string",
    "locationFrom": "string",
    "locationTo": "string",
    "price": 0,
    "isActive": true
  },
  "errors": [
    "string"
  ]
}
No links

PUT
/api/RoutePricings/{id}


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
  "transferRouteId": 0,
  "vehicleCategoryId": 0,
  "price": 0,
  "isActive": true
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
    "vehicleCategoryName": "string",
    "locationFrom": "string",
    "locationTo": "string",
    "price": 0,
    "isActive": true
  },
  "errors": [
    "string"
  ]
}
No links

DELETE
/api/RoutePricings/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
id
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
  "data": "string",
  "errors": [
    "string"
  ]
}