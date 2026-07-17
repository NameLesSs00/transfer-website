now create a plan for this section so that it work right and also implelment a buttoin in the actions in the columns when we show the data that takes the  "latitude": 47.6062,
      "longitude": -122.3321, and show them in google maps so that the admin knows where is this place exactily could you do that create a full plan for the admin pages 
Locations


GET
/api/Locations


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
  'https://transfer.tryasp.net/api/Locations' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyODQxNjksImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.pMayt_TSXyL3kp-8GM1Q5QKUHfj4w-GgH56FZNFVwpc'
Request URL
https://transfer.tryasp.net/api/Locations
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
      "name": "The Daily Grind Coffee Co.",
      "address": "123 Main Street, Seattle, WA 98101",
      "latitude": 47.6062,
      "longitude": -122.3321,
      "isActive": true
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,17 Jul 2026 09:29:53 GMT 
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
      "address": "string",
      "latitude": 0,
      "longitude": 0,
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
/api/Locations


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": "The Daily Grind Coffee Co.",
  "address": "123 Main Street, Seattle, WA 98101",
  "latitude": 47.6062,
  "longitude": -122.3321,
  "isActive": true
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://transfer.tryasp.net/api/Locations' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyODQxNjksImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.pMayt_TSXyL3kp-8GM1Q5QKUHfj4w-GgH56FZNFVwpc' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "The Daily Grind Coffee Co.",
  "address": "123 Main Street, Seattle, WA 98101",
  "latitude": 47.6062,
  "longitude": -122.3321,
  "isActive": true
}'
Request URL
https://transfer.tryasp.net/api/Locations
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "message": "Location created successfully",
  "data": {
    "id": 1,
    "name": "The Daily Grind Coffee Co.",
    "address": "123 Main Street, Seattle, WA 98101",
    "latitude": 47.6062,
    "longitude": -122.3321,
    "isActive": true
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,17 Jul 2026 09:29:46 GMT 
 location: https://transfer.tryasp.net/api/Locations/1 
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
    "address": "string",
    "latitude": 0,
    "longitude": 0,
    "isActive": true
  },
  "errors": [
    "string"
  ]
}
No links

GET
/api/Locations/{id}


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
  'https://transfer.tryasp.net/api/Locations/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyODQxNjksImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.pMayt_TSXyL3kp-8GM1Q5QKUHfj4w-GgH56FZNFVwpc'
Request URL
https://transfer.tryasp.net/api/Locations/1
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
    "name": "The Daily Grind Coffee Co.",
    "address": "123 Main Street, Seattle, WA 98101",
    "latitude": 47.6062,
    "longitude": -122.3321,
    "isActive": true
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,17 Jul 2026 09:29:59 GMT 
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
    "address": "string",
    "latitude": 0,
    "longitude": 0,
    "isActive": true
  },
  "errors": [
    "string"
  ]
}
No links

PUT
/api/Locations/{id}


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
  "name": "The Daily Grind Coffee Co after edit.",
  "address": "123 Main Street, Seattle, WA 98101",
  "latitude": 47.6062,
  "longitude": -122.3321,
  "isActive": true
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://transfer.tryasp.net/api/Locations/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyODQxNjksImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.pMayt_TSXyL3kp-8GM1Q5QKUHfj4w-GgH56FZNFVwpc' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "name": "The Daily Grind Coffee Co after edit.",
  "address": "123 Main Street, Seattle, WA 98101",
  "latitude": 47.6062,
  "longitude": -122.3321,
  "isActive": true
}'
Request URL
https://transfer.tryasp.net/api/Locations/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Location updated successfully",
  "data": {
    "id": 1,
    "name": "The Daily Grind Coffee Co after edit.",
    "address": "123 Main Street, Seattle, WA 98101",
    "latitude": 47.6062,
    "longitude": -122.3321,
    "isActive": true
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,17 Jul 2026 09:30:26 GMT 
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
    "address": "string",
    "latitude": 0,
    "longitude": 0,
    "isActive": true
  },
  "errors": [
    "string"
  ]
}
No links

DELETE
/api/Locations/{id}


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