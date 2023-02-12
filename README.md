# IIT ASC


API endpoints

For authentication
- localhost:3001/api/auth/login
- localhost:3001/api/auth/logout

All the courses related apis
- localhost:3001/api/course/running   : Get all the departments having a course running
- localhost:3001/api/course/running/:dept_id : Get all the running courses from the department (dept_id)
- localhost:3001/api/course/:course_id : Get information about the course including prereqs, instructor
- localhost:3001/api/course/:registration_courses : 
- localhost:3001/api/course/currenCourses
- localhost:3001/api/course/allcourses
- localhost:3001/api/course/allcourses/:dept_name

All the student related apis
- localhost:3001/api/student
- localhost:3001/api/student/:student_id

All the instructor related apis
- localhost:3001/api/instructor
- localhost:3001/api/instructor/instrDept
- localhost:3001/api/instructor/:instructor_id

To get the list of department instructors
- localhost:3001/api/dept_instructors/:dept_name

For registration and dropping of course
- localhost:3001/api/registration
- localhost:3001/api/drop_course