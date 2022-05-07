import React from "react";
import { useStateIfMounted } from "use-state-if-mounted";

const Student = () => {
  const [studentObj, setStudentObj] = useStateIfMounted({
    studentName: "",
    fatherName: "",
    gender: "",
    phone: "",
    address: "",
    email: "",
    city: "",
    admFee: 0,
    class: "",
    isActive: true,
    createdBy: "",
    createdAt: Date.now(),
    updatedBy: "",
    updatedAt: Date.now()
  });
  return <div>Student</div>;
};

export default Student;
