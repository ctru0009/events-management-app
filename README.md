# Event Manager Application

This is an application developed by me (Cong Chuong) and my teammate (Qian) in an assigment in course FIT2095. We used the MEAN (MongoDB, Express, Angular and Node JS).  

# Demo images
1. Add Category
![image](https://github.com/ctru0009/events-management-app/blob/main/img/add_category.png)
2. List Category
![image](https://github.com/ctru0009/events-management-app/blob/main/img/list_category.png)
3. Delete Category
![image](https://github.com/ctru0009/events-management-app/blob/main/img/delete_category.png)
4. Update Category
![image](https://github.com/ctru0009/events-management-app/blob/main/img/update_category.png)
5. Detail Category
![image](https://github.com/ctru0009/events-management-app/blob/main/img/detail_category.png)

# Technology Used
Technologies Used
* MongoDB: A scalable and flexible NoSQL database for efficient data storage.
* Express.js: A minimal and flexible Node.js web application framework for building APIs.
* Angular: A powerful front-end framework for building dynamic, single-page web applications.
* Node.js: A JavaScript runtime for server-side development, ensuring smooth communication between the client and server.
# Routing Table

Backend Endpoints
| # | Name | Endpoint | HTTP Method | Description | Example |
| --- | -------------------------- | -------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 1 | Add Category | /api/v1/category/32182988/add | POST | Insert new category by sending the data through the body of the HTTP request in a JSON format. The endpoint responds with a JSON object containing the category ID of the newly added category. | http://localhost:8080/api/v1/category/32182988/add |
| 2 | List Category | /api/v1/category/32182988/list | GET | Returns the list of all categories and the details for their events in a JSON format | http://localhost:8080/api/v1/category/32182988/list |
| 3 | Delete Category | /api/v1/category/32182988/delete | DELETE | Deletes a category by its ID and all the events that are listed in the 'eventList' field. The ID will be sent through the body of the request in a JSON object. The endpoint returns a JSON object containing the number of deleted documents. | http://localhost:8080/api/v1/category/32182988/delete |
| 4 | Update Category | /api/v1/category/32182988/update | PUT | Update category name and description by ID. The ID, new name and description are sent as a JSON object through the request body. The endpoint returns an object with a message to confirm the update or if the ID is not found. | http://localhost:8080/api/v1/category/32182988/update |
| 5 | Add Event | /qian/api/v1/add-events | POST | Insert new events by sending the data through the body of the HTTP request in a JSON format. The endpoint returns an object containing the event ID of the new event. | http://localhost:8080/qian/api/v1/add-events |
| 6 | List Event | /qian/api/v1/list-events | GET | Returns the list of all events and the details for their categories in a JSON format. | http://localhost:8080/qian/api/v1/list-events |
| 7 | Delete Event | /qian/api/v1/delete-event | DELETE | Delete events by ID. The ID is sent as a JSON object through the body of the request. | http://localhost:8080/qian/api/v1/delete-event |
| 8 | Update Event | /qian/api/v1/update-event | PUT | Update event name and capacity by ID. The ID, new name and capacity are sent as a JSON object through the request body. The endpoint returns an object with a message to confirm the update or if the ID is not found. | http://localhost:8080/qian/api/v1/update-event |
|9| Get Stats For Events and Categories | /api/v1/category/32182988/g1-stats | GET | Obtain the number of category and event documents and returns it | http://localhost:8080/api/v1/category/32182988/g1-stats |
| 10 | Get Stats For Created, Updated and Deleted Operations | /qian/api/v1/g2-stats | GET | Obtain the number of created, updated and deleted documents and returns it | http://localhost:8080/qian/api/v1/g2-stats
|11| Display Event | /qian/api/v1/display-event/:eventID | GET | Shows detailed information about a specific event. The endpoint returns a specific event object | http://localhost:8080/qian/api/v1/display-event/EEC-6359
|12| Display Event by Category ID | /api/v1/category/32182988/list-events-with-categoryID | POST | Shows detailed information about a specific category. The endpoint returns a specific category object when click on view in category list | http://localhost:8080/api/v1/category/32182988/list-events-with-categoryID

Angular Endpoints
| # | Name | Endpoint | HTTP Method | Description |
| --- | -------------------------- | -------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|12| Home Page |/ |GET|The landing page of the event management application.|
|13| Add Category|/add-category|POST|This component adds a new category. and redirects the client to the list categories component. |
|14| List Categories|/list-categories|GET|This component lists all categories in a table format and used Angular Pipe to transform the category's name to all caps.|
|15| Delete Category|/delete-category|DELETE|This component takes the category ID and deletes it from the backend database. by adding a button that deletes the required category and refreshes the list of categories after each delete operation. |
|16| Update Category|/update-category|PUT|This component takes the category ID, name and description as input and sends them to the backend API to update. It refreshes the list of categories or redirects to the List Categories component.|
|17|Display Category|/display-category|GET|This component shows the details of a category by adding a button for each row that selects and displays the required category. It also contains the list of events of the selected category.|
|18|Add Event|/add-event|POST|This component adds a new event and redirects the client to the list events component. |
|19|List Events|/list-events|GET|This component lists all events in a table format and Angular Pipe was used to transform the event's duration to hours/minutes. |
|20|Delete Event|/delete-event|DELETE|This component takes the event ID, deletes it from the backend by adding a button that deletes the required event. Then, it refreshes the list of events after each delete operation.|
|21|Update Event|/update-event|PUT|This component inputs the event ID, name and capacity and sends them to the backend API to update. It redirects the client to the list events component. |
|22|Display Event |/display-event|GET|This component shows the details of an event by adding the button to the list events component.|
|23|Text To Speech|/text-to-speech|POST|This component takes a string in English as input, sends it using Socket.io to the backend and converts the text to speech using Cloud Text-to-Speech API. It responds with the MP3 speech output of the string to the frontend component.|
|24|Translator |/translate|POST|This component takes a string in English as input, sends it using Socket.io to the backend and translates to one of three languages of your choice using Google Translate services.|
|25|Statistics of events and categories|/g1-stats|GET|Shows the statistics of the number of events and categories.|
|26|Statistics of created, updated and deleted operations | /g2-stats|GET|Shows the statistics of the number of create, update and delete operations.|
|27|Invalid Data|/invalid-data|GET|This component should be displayed if invalid data is sent to the backend. In other words, if the server responds with error 400 due to invalid data, Angular should display the "Invalid Data" component.This component is displayed if invalid data is sent to the backend and server responds with error 400 due to invalid data.|

## How to run the application

1. Clone the repository

```
https://git.infotech.monash.edu/fit2095-teams-s2-23/Lab01-Team-19/assignment-3.git
```

2. Open the terminal and navigate to the project folder
3. Run `npm install` to install all the dependencies
4. Run `npm start` to start the application
5. Open the browser and navigate to `localhost:8080` to view the application

## How to run the application on GCP

1. Ensure code is pushed to GitLab
2. Select a VM instance and open the SSH terminal
3. Clone the repository

```
https://git.infotech.monash.edu/fit2095-teams-s2-23/Lab01-Team-19/assignment-3.git
```

4. Enter username and password for verification
5. Enter `ls` to look the the list of files
6. Enter `cd assignment-3/`
1. Edit the `constant.ts` in `src/app` to change the `BASE_URL` to the external IP address of the VM instance
7. Run `npm install` to install all the dependencies
1. Build the application by running `ng build`
8. Run `npm start` to start the application
9. Copy the external IP address of the VM instance
10. enter nano/src/app/constant.ts 
11. replace the 'localhost' with the external IP address followed by :8080
12. Open a new browser and paste the IP address followed by to `:8080` to view the application
