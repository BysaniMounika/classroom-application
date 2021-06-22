function Courses(props) {
    console.log(props);
    

    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Course</th>
                        {props.user.role === 'Instructor' && <td></td>}                              
                        {props.user.role === 'Student' && <th>Instructor</th>}
                        {props.user.role === 'Student' && <th>Status</th>}
                    </tr>
                </thead>
                <tbody>
                    {
                        props.items.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.course_name}</td>
                                    {props.user.role === 'Student' && <td>{item.name}</td>}
                                    {props.user.role === 'Student' && !props.registeredCourseIds.includes(item.course_id) && <td><button type="button" className="btn btn-primary btn-block" onClick={() => props.register(item)}>Register</button></td>}
                                    {props.user.role === 'Student' && props.registeredCourseIds.includes(item.course_id) && <td>Registered</td>}
                                    {props.user.role === 'Instructor' && <td><button type="button" className="btn btn-primary btn-block" onClick={() => props.goToAttendancePage(item)}>Mark Attendance</button></td>}                                
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default Courses;