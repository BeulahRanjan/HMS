import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function Adminpage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentSection, setCurrentSection] = useState("departments");

  const navigate = useNavigate();

  // ✅ Fetch all departments
  useEffect(() => {
    const fetchAllDepartments = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/getAllDept", {
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex">
      <Sidebar role="admin" onNavigate={setCurrentSection} />

      <div className="ml-[100px] p-6 w-full">
        {currentSection === "departments" && (
          <div className="min-h-screen bg-[#eef6fb] p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Departments</h1>
              <button
                onClick={() => navigate("/addDept")}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Department
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dept) => (
                <div key={dept._id} className="bg-white p-5 rounded shadow">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold">{dept.name}</h2>

                    <div className="flex gap-2">
                      <EditIcon
                        className="cursor-pointer text-blue-600"
                        onClick={() =>
                          navigate(`/upDept/${dept._id}`)
                        }
                      />
                      <DeleteIcon className="cursor-pointer text-red-600" />
                    </div>
                  </div>

                  <p className="text-gray-600 mt-2">{dept.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                    <p><b>Head:</b> {dept.Head_of_department}</p>
                    <p><b>Floor:</b> {dept.floor}</p>
                    <p><b>Doctors:</b> {dept.No_of_doctors}</p>
                    <p><b>Nurses:</b> {dept.No_of_nurses}</p>
                    <p><b>Surgeons:</b> {dept.No_of_surgeons}</p>
                    <p><b>Patients:</b> {dept.No_of_patients}</p>
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold">Equipment</p>
                    <ul className="list-disc list-inside text-sm">
                      {dept.Equipment_list?.map((eq, i) => (
                        <li key={i}>
                          {eq.name} — {eq.quantity} ({eq.condition})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}