# IIT ASC

## References

1) Primarily we used a ReactJS platform for our application hence we referred to [this](https://reactjs.org/docs/getting-started.html) documentation
2) For Backend we referred to [this](https://github.com/AkshayAlenchery/picter-app) repository of a social networking application made on nodejs. This also contained references required to use bcrypt
3) We have used components from Material UI in order to create the frontend and referred to [this](https://mui.com/) documentation for all the codes of Material UI template components along with some styling.
4) We referred to [this](https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/) document to learnm about how to handle sessions
5) Parts of Login using session was taken from [this](https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d) article
6) We also referred to parts of videos from [this](https://www.youtube.com/playlist?list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL) tutorial series on full stack development

## API endpoints

For authentication
- localhost:3001/api/auth/login : This API takes the user ID and password passed and returns wether login was succesfull. creates session and stores session ID and other information
- localhost:3001/api/auth/logout : This API deletes/destroy the session hence logging out the user

All the courses related apis
- localhost:3001/api/course/running   : Get all the departments having a course running
- localhost:3001/api/course/running/:dept_id : Get all the running courses from the department (dept_id)
- localhost:3001/api/course/:course_id : Get information about the course including prereqs, instructors (current AND past)
- localhost:3001/api/course/currentCourses : Get information of all running courses for registration including section mapping (for dropdown)
- localhost:3001/api/course/allcourses : endpoint API to get all the courses (both running and past)
- localhost:3001/api/course/allcourses/:dept_name : endpoint API to get all courses in a department (both past and running)

All the student related apis
- localhost:3001/api/student : This api takes the user ID of the logged in user from session and returns info about students including all courses taken by him
- localhost:3001/api/student/:student_id : this API is an endpoint API to be used to access data about a student (by a logged in instructor or the student himself) This is never called in frontend as no frontend support is available for the isntructor

All the instructor related apis
- localhost:3001/api/instructor/instrDept : This API is used to list all the departments in the frontend
- localhost:3001/api/instructor/:instructor_id : This API is used to get information about a specific instructor (instructor_id)

To get list of all departments:
- localhost:3001/api/departments : This can be used as an endpoint API to get list of all the API

To get the list of department instructors
- localhost:3001/api/dept_instructors/:dept_name : This API is used to get all the instructors of a particular department

For registration and dropping of course
- localhost:3001/api/registration : This API takes all the required information and inserts a record into the takes table to register for a course
- localhost:3001/api/drop_course : This API takes the course_id from the frontend and deletes the course from the takes table