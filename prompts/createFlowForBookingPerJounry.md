first of all we need to make sure the user can view the per journey page this is the page for the Cities 
first of all we should change the UI a bit we will make the section Available Vehicles in Hurghada to be in the center of the page and make it show all of data in the perJourneys but not the senstive data 
we will remove the Popular Destinations from Hurghada section and remove this section 
Hurghada
Hurghada is one of the most popular destinations on the Red Sea. We provide reliable and comfortable airport transfers from Hurghada Airport to all hotels and resorts in Hurghada.

Easy Booking
Book in advance in just a few steps
Fixed Prices
No hidden fees, what you see is what you pay
Professional Drivers
Experienced, friendly and always on time
24/7 Support
We're here to help you anytime, anywhere
as this is not needed

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
  -H 'accept: text/plain'
Request URL
https://transfer.tryasp.net/api/PerJourneys
Server response
Code	Details
200	
Response body
Download
{
  "pageNumber": 4,
  "pageSize": 1,
  "totalPages": 10,
  "totalRecords": 10,
  "success": true,
  "message": "Success",
  "data": [
    {
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
        "vehicleCategoryName": "Vehicle Categorye",
        "vehicleCategory": {
          "id": 3,
          "name": "Vehicle Categorye",
          "description": "DescriptionDescriptionDescription",
          "isActive": true,
          "pricingType": "FixedTrip"
        },
        "vehicleFactoryId": 2,
        "vehicleFactoryName": "CCC",
        "vehicleFactory": {
          "id": 2,
          "name": "CCC"
        }
      },
      "price": 110
    },
    {
      "id": 2,
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
        "vehicleCategoryName": "Vehicle Categorye",
        "vehicleCategory": {
          "id": 3,
          "name": "Vehicle Categorye",
          "description": "DescriptionDescriptionDescription",
          "isActive": true,
          "pricingType": "FixedTrip"
        },
        "vehicleFactoryId": 2,
        "vehicleFactoryName": "CCC",
        "vehicleFactory": {
          "id": 2,
          "name": "CCC"
        }
      },
      "price": 200
    },
    {
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
        "vehicleCategoryName": "Vehicle Categorye",
        "vehicleCategory": {
          "id": 3,
          "name": "Vehicle Categorye",
          "description": "DescriptionDescriptionDescription",
          "isActive": true,
          "pricingType": "FixedTrip"
        },
        "vehicleFactoryId": 2,
        "vehicleFactoryName": "CCC",
        "vehicleFactory": {
          "id": 2,
          "name": "CCC"
        }
      },
      "price": 1001
    },
    {
      "id": 4,
      "fromLocationId": 4,
      "fromLocation": {
        "id": 4,
        "name": "test"
      },
      "toLocationId": 2,
      "toLocation": {
        "id": 2,
        "name": "journey"
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
        "vehicleCategoryName": "Vehicle Categorye",
        "vehicleCategory": {
          "id": 3,
          "name": "Vehicle Categorye",
          "description": "DescriptionDescriptionDescription",
          "isActive": true,
          "pricingType": "FixedTrip"
        },
        "vehicleFactoryId": 2,
        "vehicleFactoryName": "CCC",
        "vehicleFactory": {
          "id": 2,
          "name": "CCC"
        }
      },
      "price": 300
    }
  ],
  "errors": null
}

and we show the data we should be able to do the booking but we will do that in the next step we first need to make srue the data shown is looking nice and could you update the page cities so that it show the right data and also make it work create a plan for it 