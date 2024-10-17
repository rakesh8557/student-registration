import { useParams } from "react-router-dom";
import AddnewStudent from "./AddNewStudent";
import { useEffect, useState } from "react";
import axios from "axios";

const EditStudent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/students/getAllstudents", { params: { id }, withCredentials: true })
            .then(res => {
                setStudent(res.data.students);
            })
            .catch(error => {

            })
    }, []);

    return (
        <AddnewStudent student={student}/>
    )
}

export default EditStudent;