import React, { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function Deptpage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllDepartments = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("https://hms-1-1u51.onrender.com/getAllDept", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDepartments(res.data.departments || res.data);
      } catch (err) {
        setError("Failed to load departments");
      } finally {
        setLoading(false);
      }
    };

    fetchAllDepartments();
  }, []);

  if (loading) {
    return <div className="p-6">Loading departments...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e3f0f7] to-[#eff6fa] p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Departments
      </h1>

      {departments.length === 0 ? (
        <p className="text-center">No departments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {departments.map((dept) => (
            <div
              key={dept._id}
              className="bg-blue-100 border rounded-xl shadow-sm p-6 transition-transform duration-200 hover:shadow-md hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {dept.name}
                </h2>

                {/* icons ready for future use */}
                <div className="flex gap-2 text-blue-500">
                  {/* <EditIcon className="cursor-pointer" /> */}
                  {/* <DeleteIcon className="cursor-pointer" /> */}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                {dept.description}
              </p>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-800">
                <p><span className="font-medium">Head:</span> {dept.Head_of_department}</p>
                <p><span className="font-medium">Floor:</span> {dept.floor}</p>

                <p><span className="font-medium">Doctors:</span> {dept.No_of_doctors}</p>
                <p><span className="font-medium">Nurses:</span> {dept.No_of_nurses}</p>

                <p><span className="font-medium">Surgeons:</span> {dept.No_of_surgeons}</p>
                <p><span className="font-medium">Patients:</span> {dept.No_of_patients}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}