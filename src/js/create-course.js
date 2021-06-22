import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import CustomNavbar from "../components/navbar.component";

function CreateCourse(props) {
    const courseName = useFormInput('');
    const capacity = useFormInput('');
    const startDate = useFormInput('');
    const endDate = useFormInput('');
    const [user, setUser] = useState('');

    useEffect(() => {
        async function init() {
            const data = await sessionStorage.getItem('userDetails');
            setUser(JSON.parse(data));
        }
        init();
    }, []);

    const createCourse = async () => {
        const body = JSON.stringify({
            courseName: courseName.value,
            capacity: capacity.value,
            startDate: startDate.value,
            endDate: endDate.value,
            instructorId: user.id
        });

        console.log("Login request", body);
        await fetch("https://v2dwxcy9k1.execute-api.us-east-2.amazonaws.com/dev/course", {
            method: 'POST', 
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: body 
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                props.history.push('/home');
            });
    };

    return (
        <div>
            <CustomNavbar />
            <Card style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' }}>
                <Card.Body>
                    <form>
                        <h3>Create Course</h3>

                        <div className="form-group">
                            <label>Course Name</label>
                            <input type="text" className="form-control" {...courseName} placeholder="Enter Course Name" />
                        </div>

                        <br />

                        <div className="form-group">
                            <label>Capacity</label>
                            <input type="number" className="form-control" {...capacity} placeholder="Enter Max Capacity" />
                        </div>

                        <br />

                        <div className="form-group">
                            <label>StartDate</label>
                            <input type="date" className="form-control" {...startDate} placeholder="Enter Max Capacity" />
                        </div>

                        <br />

                        <div className="form-group">
                            <label>EndDate</label>
                            <input type="date" className="form-control" {...endDate} placeholder="Enter Max Capacity" />
                        </div>

                        <br />

                        <button type="button" className="btn btn-primary btn-block" onClick={createCourse} >Create Course</button>
                    </form>
                </Card.Body>
            </Card>
        </div>
    )
};

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }

    return {
        value,
        onChange: handleChange
    }
}

export default CreateCourse;