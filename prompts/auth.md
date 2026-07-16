now we should create a plan to create the admin page for this website it will have for now the section for the admins and the side bar should be on the left and also the footer and the header should be removed 
make sure the admin page should be on the admin/login and admin/dashboard 
now create a full plan for those 
the section for the 
POST
/api/Auth/forgot-password



POST
/api/Auth/verify-otp



POST
/api/Auth/reset-password
those will not be implemented could you do that 

Auth


POST
/api/Auth/login


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "email": "Ka@gmail.com",
  "password": "Admin123!"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://transfer.tryasp.net/api/Auth/login' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjlhMTc1NThlLWVhOWItNDlhNS1hZDczLWFhYmI1NzgwOWU5NyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGFAYS5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicG9sYSBzYW15IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3ODQyMTk1NTksImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.hYHjWHLX9DsISvPk2E27yjHL5dN73RIff-NmKSdOXSk' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "Ka@gmail.com",
  "password": "Admin123!"
}'
Request URL
https://transfer.tryasp.net/api/Auth/login
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Success",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyMjEyMTEsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.SevK8NjSV6sDjdnqcqZlcmXBlR7P8yaXKZXaHKd1rYM",
    "refreshToken": "OZxGE/3Nw7MPorPYcZWyyIKE3fdNDkSwQ0XSBu5AoPs=",
    "email": "Ka@gmail.com",
    "fullName": "Karim Ayman"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,16 Jul 2026 16:00:11 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/Auth/logout


Parameters
Cancel
Reset
No parameters

Request body

application/json
"rzzamZU0bYNEgnmVPv7tSTCzMU0BWocxpoXqQGUQWs4="
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://transfer.tryasp.net/api/Auth/logout' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyMTkzMDMsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.s93jzPqppt4gGEtYhGc2cvZbteWW5Uzso2LjlppfGt8' \
  -H 'Content-Type: application/json' \
  -d '"rzzamZU0bYNEgnmVPv7tSTCzMU0BWocxpoXqQGUQWs4="'
Request URL
https://transfer.tryasp.net/api/Auth/logout
Server response
Code	Details
200	
Response body
Download
{
  "success": false,
  "message": "Logged out successfully",
  "data": null,
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,16 Jul 2026 15:29:56 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/Auth/add-admin


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "firstName": "pola",
  "lastName": "samy",
  "email": "pola@a.com",
  "password": "!Admin12345"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://transfer.tryasp.net/api/Auth/add-admin' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyMTk0MDUsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.lzqyGkJXAxZ5gMYztOTYiBxFUTwUdTWFXmeNEDwYkRs' \
  -H 'Content-Type: application/json' \
  -d '{
  "firstName": "pola",
  "lastName": "samy",
  "email": "pola@a.com",
  "password": "!Admin12345"
}'
Request URL
https://transfer.tryasp.net/api/Auth/add-admin
Server response
Code	Details
200	
Response body
Download
{
  "success": false,
  "message": "9a17558e-ea9b-49a5-ad73-aabb57809e97",
  "data": null,
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,16 Jul 2026 15:31:13 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/Auth/update-password


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "oldPassword": "!Admin12345",
  "newPassword": "!Admin12345!",
  "confirmPassword": "!Admin12345!"
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://transfer.tryasp.net/api/Auth/update-password' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjlhMTc1NThlLWVhOWItNDlhNS1hZDczLWFhYmI1NzgwOWU5NyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGFAYS5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicG9sYSBzYW15IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3ODQyMTk1NTksImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.hYHjWHLX9DsISvPk2E27yjHL5dN73RIff-NmKSdOXSk' \
  -H 'Content-Type: application/json' \
  -d '{
  "oldPassword": "!Admin12345",
  "newPassword": "!Admin12345!",
  "confirmPassword": "!Admin12345!"
}'
Request URL
https://transfer.tryasp.net/api/Auth/update-password
Server response
Code	Details
200	
Response body
Download
{
  "success": false,
  "message": "Password updated successfully",
  "data": null,
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,16 Jul 2026 15:33:14 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/Auth/delete-admin/{id}


Parameters
Cancel
Name	Description
id *
string
(path)
9a17558e-ea9b-49a5-ad73-aabb57809e97
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://transfer.tryasp.net/api/Auth/delete-admin/9a17558e-ea9b-49a5-ad73-aabb57809e97' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyMjEyMTEsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.SevK8NjSV6sDjdnqcqZlcmXBlR7P8yaXKZXaHKd1rYM'
Request URL
https://transfer.tryasp.net/api/Auth/delete-admin/9a17558e-ea9b-49a5-ad73-aabb57809e97
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Success",
  "data": true,
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,16 Jul 2026 16:00:28 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/Auth/refresh-token


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "refreshToken": "tjf3x+2NCLq5drNfT+llq6Ngpk36Z0m8GjXbf76wuRU="
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://transfer.tryasp.net/api/Auth/refresh-token' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjlhMTc1NThlLWVhOWItNDlhNS1hZDczLWFhYmI1NzgwOWU5NyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGFAYS5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicG9sYSBzYW15IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3ODQyMTk1NTksImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.hYHjWHLX9DsISvPk2E27yjHL5dN73RIff-NmKSdOXSk' \
  -H 'Content-Type: application/json' \
  -d '{
  "refreshToken": "tjf3x+2NCLq5drNfT+llq6Ngpk36Z0m8GjXbf76wuRU="
}'
Request URL
https://transfer.tryasp.net/api/Auth/refresh-token
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Success",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjlhMTc1NThlLWVhOWItNDlhNS1hZDczLWFhYmI1NzgwOWU5NyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGFAYS5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicG9sYSBzYW15IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3ODQyMTk2MTgsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.JbTxISQ20qF1xGedPE2hkaTf_Cw0PZneF-Ue4OUQoDI",
    "refreshToken": "T0kluAEcBSmCpDHMQAoy23hfl6KP8K9IgEWKY9+qusM=",
    "email": "pola@a.com",
    "fullName": "pola samy"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,16 Jul 2026 15:33:37 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/Auth/forgot-password



POST
/api/Auth/verify-otp



POST
/api/Auth/reset-password



GET
/api/Auth/admins


Parameters
Cancel
Name	Description
pageNumber
integer($int32)
(query)
1
pageSize
integer($int32)
(query)
10
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://transfer.tryasp.net/api/Auth/admins?pageNumber=1&pageSize=10' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjlhMTc1NThlLWVhOWItNDlhNS1hZDczLWFhYmI1NzgwOWU5NyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGFAYS5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicG9sYSBzYW15IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3ODQyMTk1NTksImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.hYHjWHLX9DsISvPk2E27yjHL5dN73RIff-NmKSdOXSk'
Request URL
https://transfer.tryasp.net/api/Auth/admins?pageNumber=1&pageSize=10
Server response
Code	Details
200	
Response body
Download
{
  "pageNumber": 3,
  "pageSize": 1,
  "totalPages": 10,
  "totalRecords": 10,
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": "9a17558e-ea9b-49a5-ad73-aabb57809e97",
      "username": "pola@a.com",
      "role": "pola",
      "email": "Admin",
      "createdAt": "2026-07-16T15:31:14.0983181"
    },
    {
      "id": "5f17e08a-a066-4326-981d-1515d7f3b8ac",
      "username": "Ka@gmail.com",
      "role": "Karim",
      "email": "SuperAdmin",
      "createdAt": "2026-07-11T09:44:45.2034596"
    },
    {
      "id": "c85cec35-0579-423e-87c1-123d940bddae",
      "username": "admin@realestate.com",
      "role": "System",
      "email": "SuperAdmin",
      "createdAt": "2026-07-11T09:44:44.7213543"
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,16 Jul 2026 15:34:43 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/Auth/update-admin


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "userName": "string",
  "email": "string",
  "phoneNumber": "string"
}
Responses
Code	Description	Links
200	
OK