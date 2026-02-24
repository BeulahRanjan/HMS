import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function DeptForm() {
  const { id } = useParams(); // 👈 if exists → edit mode
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    Head_of_department: "",
    floor: "",
    No_of_doctors: "",
    No_of_nurses: "",
    No_of_surgeons: "",
    No_of_patients: "",
    Equipment_list: [],
  });

  // ✅ Fetch department for edit
useEffect(() => {
  if (!id) return;

  const fetchDept = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/getDept/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setFormData(res.data.department);
    } catch (err) {
      console.error(err);
      toast.error("Unauthorized or department not found");
    }
  };

  fetchDept();
}, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditMode) {
      await axios.put(
        `http://localhost:5000/upDept/${id}`,
        formData
      );
    } else {
      await axios.post(
        "http://localhost:5000/addDept",
        formData
      );
    }

    navigate("/admin");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? "Edit Department" : "Add Department"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          placeholder="Department Name"
          className="w-full border p-2"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2"
        />

        <input
          name="Head_of_department"
          value={formData.Head_of_department}
          onChange={handleChange}
          placeholder="Head of Department"
          className="w-full border p-2"
        />

        <input
          name="floor"
          value={formData.floor}
          onChange={handleChange}
          placeholder="Floor"
          className="w-full border p-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isEditMode ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}