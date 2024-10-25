import { useNavigate, useParams } from "react-router-dom";
import AddnewStudent from "./AddNewStudent";
import { useEffect, useState } from "react";
import axios from "axios";

const EditStudent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/students/getAllstudents", { params: { id }, withCredentials: true })
            .then(res => {
                setStudent(res.data.students);
            })
            .catch(error => {
                navigate("/signin");
            })
    }, []);

    return (
        <>
            {student && <AddnewStudent student={student[0]} />}
        </>
    )
}

export default EditStudent;