now create a plan for those enpdoints and make sure those works right alos when we put the id we should not view them adn just view the anmes fo the locatoin and the descrtoipn and the places like the longaugetr and the other hting could you craete a plan so that this section looks nice and work right 
TransferRoutes


GET
/api/TransferRoutes


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
  'https://transfer.tryasp.net/api/TransferRoutes' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyODQxNjksImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.pMayt_TSXyL3kp-8GM1Q5QKUHfj4w-GgH56FZNFVwpc'
Request URL
https://transfer.tryasp.net/api/TransferRoutes
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
      "originLocationId": 1,
      "originLocationName": "The Daily Grind Coffee Co after edit.",
      "destinationLocationId": 2,
      "destinationLocationName": "second locatoin",
      "isActive": true
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,17 Jul 2026 09:47:02 GMT 
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
      "originLocationId": 0,
      "originLocationName": "string",
      "destinationLocationId": 0,
      "destinationLocationName": "string",
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
/api/TransferRoutes


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "originLocationId": 1,
  "destinationLocationId": 2,
  "isActive": true
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://transfer.tryasp.net/api/TransferRoutes' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyODQxNjksImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.pMayt_TSXyL3kp-8GM1Q5QKUHfj4w-GgH56FZNFVwpc' \
  -H 'Content-Type: application/json' \
  -d '{
  "originLocationId": 1,
  "destinationLocationId": 2,
  "isActive": true
}'
Request URL
https://transfer.tryasp.net/api/TransferRoutes
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "message": "TransferRoute created successfully",
  "data": {
    "id": 1,
    "originLocationId": 1,
    "originLocationName": "The Daily Grind Coffee Co after edit.",
    "destinationLocationId": 2,
    "destinationLocationName": "second locatoin",
    "isActive": true
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,17 Jul 2026 09:46:47 GMT 
 location: https://transfer.tryasp.net/api/TransferRoutes/1 
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
    "originLocationId": 0,
    "originLocationName": "string",
    "destinationLocationId": 0,
    "destinationLocationName": "string",
    "isActive": true
  },
  "errors": [
    "string"
  ]
}
No links

GET
/api/TransferRoutes/{id}


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
  'https://transfer.tryasp.net/api/TransferRoutes/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyODQxNjksImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.pMayt_TSXyL3kp-8GM1Q5QKUHfj4w-GgH56FZNFVwpc'
Request URL
https://transfer.tryasp.net/api/TransferRoutes/1
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
    "originLocationId": 1,
    "originLocationName": "The Daily Grind Coffee Co after edit.",
    "destinationLocationId": 2,
    "destinationLocationName": "second locatoin",
    "isActive": true
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,17 Jul 2026 09:47:13 GMT 
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
    "originLocationId": 0,
    "originLocationName": "string",
    "destinationLocationId": 0,
    "destinationLocationName": "string",
    "isActive": true
  },
  "errors": [
    "string"
  ]
}
No links

PUT
/api/TransferRoutes/{id}


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
  "originLocationId": 0,
  "destinationLocationId": 0,
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
    "originLocationId": 0,
    "originLocationName": "string",
    "destinationLocationId": 0,
    "destinationLocationName": "string",
    "isActive": true
  },
  "errors": [
    "string"
  ]
}
No links

DELETE
/api/TransferRoutes/{id}


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