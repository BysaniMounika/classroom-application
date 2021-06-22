import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import CustomNavbar from "../components/navbar.component";
import Courses from "../components/course.component";

function Home(props) {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('userDetails')));
    const [courses, setCourses] = useState([]);
    const [registeredCourseIds, setRegisteredCourseIds] = useState([]);

    useEffect(() => {
        getCourses();
    }, [user]);

    const getCourses = async () => {
        var params = {
            "userId": user.id,
            "role": user.role
        };
        var qs = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        }).join('&');
        await fetch("https://v2dwxcy9k1.execute-api.us-east-2.amazonaws.com/dev/course?" + qs, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => {
                if (res && res["body"] && res["body"]["data"]) {
                    if (user["role"] === "Instructor") {
                        setCourses(res["body"]["data"]);
                    } else {
                        setCourses(res["body"]["data"]["all_courses"]);
                        console.log(res["body"]["data"]["my_courses"]);
                        var courseIds = res["body"]["data"]["my_courses"].map(item => item.course_id);
                        setRegisteredCourseIds(courseIds);
                    }
                }
                console.log(courses);
            });
    }

    const register = async (item) => {
        var params = {
            "userId": user.id,
            "userEmail": user.email,
            "userName": user.name,
            "courseId": item.course_id,
            "instructorEmail": item.email,
            "instructorName": item.name,
            "courseName": item.course_name,
        };
        console.log(params);
        await fetch("https://v2dwxcy9k1.execute-api.us-east-2.amazonaws.com/dev/user-course?", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(res => res.json())
            .then(res => {
                getCourses();
            });
    }

    const goToAttendancePage = (course) => {
        props.history.push({
            pathname: '/mark-attendance',
            state: { "user": user, "course": course }
        })
    }

    return (
        <Router>
            <div>
                <CustomNavbar />
                {
                    courses.length ?
                        <>
                            <Courses items={courses} user={user} register={register} registeredCourseIds={registeredCourseIds} goToAttendancePage={goToAttendancePage} />
                        </> : 'Loading...'
                }
            </div>
        </Router>
    );
}

export default Home;