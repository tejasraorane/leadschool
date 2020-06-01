# LeadSchool
LeadSchool Test

## Heroku URL 
```sh
https://fierce-savannah-25683.herokuapp.com/
```

## Installation

Install  dependencies

Backend
```sh
npm install
```

Frontend
```sh
npm install
```

## Run Application

For development I have used nodemon package as supervisor
```sh
npm run watch
```

For production
```sh
npm start
```

Run below command in frontend to add UI build to backend
```sh
npm run build
```

### API Definitions

Postman collection is added to the project. Below are the definitions for the API's - 

1) Create Admin - Add admin details
    - METHOD: POST
    - AUTHENTICATION: No

2) Authenticate Admin - To generate JWT token for authorized API access
    - METHOD: POST
    - AUTHENTICATION: No

3) List Courses - List all the courses. It by default sorts the courses using following order (['popularity', 'DESC'], ['author', 'ASC'], ['name', 'ASC']). The same method is used for filtering by name author name and category.
    - METHOD: POST
    - AUTHENTICATION: No

4) Create Course - Admin creates a course.
    - METHOD: POST
    - AUTHENTICATION: Yes

5) Update Course - Admin updates a course.
    - METHOD: PUT
    - AUTHENTICATION: Yes

5) Find Course - To find a specific course by ID. Can be used for edit functionality.
    - METHOD: GET
    - AUTHENTICATION: Yes

6) Delete Course - Admin deletes a course.
    - METHOD: GET
    - AUTHENTICATION: Yes

7) Create Category - Admin creates a category.
    - METHOD: POST
    - AUTHENTICATION: Yes

8) List Category - Lists all categories.
    - METHOD: GET
    - AUTHENTICATION: Yes

