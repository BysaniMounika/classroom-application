import React, { useState, useEffect } from 'react';
import CustomNavbar from "../components/navbar.component";

function MarkAttendance(props) {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('userDetails')));
    const [students, setStudents] = useState([]);
    console.log(props["location"]["state"]);
    const course = props["location"]["state"]["course"];
    const date = new Date().toISOString().slice(0, 10);

    useEffect(() => {
        getStudents();
    }, [user]);

    const getStudents = async () => {
        var params = {
            "courseId": course["course_id"]
        };

        var qs = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        }).join('&');

        await fetch("https://v2dwxcy9k1.execute-api.us-east-2.amazonaws.com/dev/course/students?" + qs, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res && res["body"] && res["body"]["data"]) {
                    setStudents(res["body"]["data"].map(student => {
                        student["status"] = "";
                        student["date"] = date;
                        student["instructor_user_course_id"] = course.user_course_id
                        student["course_name"] = course.course_name
                        student["instructor_name"] = user.name

                        return student;
                    }));
                }
            });
    }

    const updateStudentStatus = (student, index, event) => {
        if (event) {
            students[index].status = event.target.value;
        }
    }

    const submitAttendance = async () => {
        await fetch("https://v2dwxcy9k1.execute-api.us-east-2.amazonaws.com/dev/course/mark-attendance", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "data": students })
        })
            .then(res => res.json())
            .then(res => {
                var response = JSON.parse(res.body);
                console.log(response);
                props.history.push('/home');
            });
    }

    return (
        <div>
            <CustomNavbar />
            {
                students.length ?
                    <>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    students.map((student, index) => {
                                        return (
                                            <tr key={student.id}>
                                                <td>{student.name}</td>
                                                <td>
                                                    <div className="form-group">
                                                        <div className="form-check">
                                                            <input className="form-check-input" id={student.id + "_status_in_person"} type="radio" name={student.id + "_status"} value="in_person" onClick={(e) => updateStudentStatus(student, index, e)} />
                                                            <label className="form-check-label" for={student.id + "_status_in_person"}> In Person </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" id={student.id + "_status_online"} type="radio" name={student.id + "_status"} value="online" onClick={(e) => updateStudentStatus(student, index, e)} />
                                                            <label className="form-check-label" for={student.id + "_status_online"}> Online </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" id={student.id + "_status_absent"} type="radio" name={student.id + "_status"} value="absent" onClick={(e) => updateStudentStatus(student, index, e)} />
                                                            <label className="form-check-label" for={student.id + "_status_absent"}> Absent </label>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                        <br />

                        <button type="button" className="btn btn-primary btn-block" onClick={submitAttendance} >Submit Attendance</button>

                    </> : 'No students'
            }
        </div>

    );
}

export default MarkAttendance;