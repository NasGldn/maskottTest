# Maskott Test example API

## Common setup

Install Pgsql if not done :
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```
After the installation you may double-check that postgresql daemon is active with `service postgresql status`. If not use `service postgresql start`

To install dependencies, initialise DB, and launch the server locally, run :
```bash
npm install
node server.js
```

## Test the API !

To test the API, you can use the postman collection : `./Students.postman_collection.json`


# REST API

The REST API to this app is described below.

## Get list of Students

### Request

`GET api/students/`

This endpoint allows to retrieve a list of students.
### URL params (to format with ?...&...&...&)

    {
        "beforeDate": YYYY-MM-DD,
        "afterDate": YYYY-MM-DD,
        "gender":"male",
        "optionLatin": "false",
        "optionMaths": true,
        "optionEco": false,
        "search": "joh"
    }

### Response
    [
        {
            "id": 1,
            "firstname": "john",
            "surname": "doe",
            "email": "johndoe@gmail.com",
            "birthDate": "1999-11-11T00:00:00.000Z",
            "gender": "male",
            "optionLatin": false,
            "optionMaths": true,
            "optionEco": false,
            "createdAt": "2022-10-07T13:53:32.518Z",
            "updatedAt": "2022-10-07T13:53:32.518Z",
            "groups": []
        }
    ]

## Create a new Student
This endpoint allows to create a new student.

### Request

`POST api/students/`

### Request body

    {
        "firstname": "john",
        "surname": "doe",
        "email": "johndoe@gmail.com",
        "birthDate":"1999-11-11T00:00:00.000Z",
        "gender":"male",
        "optionLatin": "false",
        "optionMaths": true,
        "optionEco": false
    }

## Get a specific Student
This endpoint allows to get a student.


### Request

`GET /students/{{id}}`


### Response

    {
        "id": 1,
        "firstname": "john",
        "surname": "doe",
        "email": "johndoe@gmail.com",
        "birthDate": "1999-11-11T00:00:00.000Z",
        "gender": "male",
        "optionLatin": false,
        "optionMaths": true,
        "optionEco": false,
        "createdAt": "2022-10-10T01:53:32.518Z",
        "updatedAt": "2022-10-10T01:53:32.518Z"
    }


## Update a student
This endpoint allows to update a student.


### Request

`PUT /students/{{id}}`

### Request body
    {
        "firstname": "jane",
        "surname": "doe",
        "email": "janedoe@gmail.com",
        "birthDate":"1999-11-11T00:00:00.000Z",
        "gender":"female",
        "optionLatin": "false",
        "optionMaths": true,
        "optionEco": false
    }

### Response
    {
        "message": "Student was updated successfully."
    }

## Delete a specific Student
This endpoint allows to delete a student.


### Request

`DEL /students/{{id}}`


### Response

    {
        "message": "Student was deleted successfully!"
    }

## Delete all Students
This endpoint allows to delete all students.


### Request

`DEL /groups/`


### Response

    {
        "message": "X Students were deleted successfully!"
    }


## Get list of Groups

### Request

`GET api/groups/`

This endpoint allows to retrieve a list of groups.

### Response
    [
        {
            "id": 1,
            "name": "testgroup",
            "isActive": true,
            "createdAt": "2022-10-10T02:06:48.006Z",
            "updatedAt": "2022-10-10T02:06:48.006Z",
            "students": []
        }
    ]

## Create a new Group
This endpoint allows to create a new group.

### Request

`POST api/groups/`

### Request body
    {
        "name": "testgroup",
        "isActive": true
    }

## Get a specific Group
This endpoint allows to get a group.


### Request

`GET /users/{{id}}`


### Response

    {
        "id": 1,
        "name": "testgroup",
        "isActive": true,
        "createdAt": "2022-10-10T02:06:48.006Z",
        "updatedAt": "2022-10-10T02:06:48.006Z",
        "students": []
    }



## Update a group
This endpoint allows to update a group.


### Request

`PUT /groups/{{id}}`

### Request body
{
    "name": "testgroup2",
    "isActive": false
}

### Response
    {
        "message": "Group was updated successfully."
    }

## Delete a specific Group
This endpoint allows to delete a group.


### Request

`DEL /groups/{{id}}`


### Response

    {
        "message": "Group was deleted successfully!"
    }

## Delete all Groups
This endpoint allows to delete all groups.


### Request

`DEL /groups/`


### Response

    {
        "message": "X Groups were deleted successfully!"
    }

## Add student to a group
This endpoint allows to add a student in a group according to the defined rules :
- a group with 10 people cannot welcome a new student.
- a group cannot contains more than 2 options.


### Request

`POST /groups/{{id}}/students/{{id}}`


### Response

    {
        "message": ">> 1 students (id=1) has been added to Group id=1"
    }

## Remove student from a group
This endpoint allows to remove a student from a group according to the defined rules :
- a group with less or equal than 3 people cannot remove a student.


### Request

`DEL /groups/{{id}}/students/{{id}}`


### Response

    {
        "message": ">> 1 students (id=1) has been removed from Group id=1"
    }

## Get group rate stats
This endpoint allows to get the number of students that are in 0, 1, 2, 3,... groups.


### Request

`GET /statistics/students/`


### Response

    {
        "0": 4,
        "2": 2,
        ...
    }

## Get old group stat
This endpoint allows to list the groups that are older than 1 year.


### Request

`GET /statistics/groups/`


### Response

    [
        {
            "id": 1,
            "name": "testgroup",
            "isActive": true,
            "createdAt": "2020-10-10T02:06:48.006Z",
            "updatedAt": "2020-10-10T02:06:48.006Z",
            "students": []
        },
        ...
    ]