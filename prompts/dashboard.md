here is the right data that should be displayed in the dashboard could you create a plan to view this data ?
Dashboard


GET
/api/Dashboard


Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://transfer.tryasp.net/api/Dashboard' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMTdlMDhhLWEwNjYtNDMyNi05ODFkLTE1MTVkN2YzYjhhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkthQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJLYXJpbSBBeW1hbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODQyODAxMzgsImlzcyI6IlRyYW5zZmVyV2Vic2l0ZSIsImF1ZCI6IlRyYW5zZmVyV2Vic2l0ZVVzZXJzIn0.x4998t0XWRlZ4c62rIO6pdBCNWal4Bv6elfSTcXpEt0'
Request URL
https://transfer.tryasp.net/api/Dashboard
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Success",
  "data": {
    "general": {
      "totalVehicles": 0,
      "totalVehicleCategories": 1,
      "totalVehicleFactories": 0,
      "totalLocations": 0,
      "totalTransferRoutes": 0,
      "totalPerJourneys": 0,
      "totalServices": 1,
      "totalBookings": 0,
      "totalReviews": 0
    },
    "bookings": {
      "pending": 0,
      "confirmed": 0,
      "completed": 0,
      "cancelled": 0
    },
    "bookingTypes": {
      "totalTransferBookings": 0,
      "totalPerJourneyBookings": 0
    },
    "tripTypes": {
      "oneWayBookings": 0,
      "roundTripBookings": 0
    },
    "payments": {
      "totalPayments": 0,
      "successfulPayments": 0,
      "failedPayments": 0,
      "pendingPayments": 0
    },
    "revenue": {
      "totalRevenue": 0,
      "revenueToday": 0,
      "revenueThisWeek": 0,
      "revenueThisMonth": 0
    },
    "reviews": {
      "averageRating": 0,
      "totalReviews": 0
    }
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,17 Jul 2026 08:56:18 GMT 
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
    "general": {
      "totalVehicles": 0,
      "totalVehicleCategories": 0,
      "totalVehicleFactories": 0,
      "totalLocations": 0,
      "totalTransferRoutes": 0,
      "totalPerJourneys": 0,
      "totalServices": 0,
      "totalBookings": 0,
      "totalReviews": 0
    },
    "bookings": {
      "pending": 0,
      "confirmed": 0,
      "completed": 0,
      "cancelled": 0
    },
    "bookingTypes": {
      "totalTransferBookings": 0,
      "totalPerJourneyBookings": 0
    },
    "tripTypes": {
      "oneWayBookings": 0,
      "roundTripBookings": 0
    },
    "payments": {
      "totalPayments": 0,
      "successfulPayments": 0,
      "failedPayments": 0,
      "pendingPayments": 0
    },
    "revenue": {
      "totalRevenue": 0,
      "revenueToday": 0,
      "revenueThisWeek": 0,
      "revenueThisMonth": 0
    },
    "reviews": {
      "averageRating": 0,
      "totalReviews": 0
    }
  },
  "errors": [
    "string"
  ]
}