import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function DeptForm() {
  const { id } = useParams();          // /editDept/:id
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    Head_of_department: "",
    floor: "",
    rooms: "",
    established_year: "",
    No_of_doctors: "",
    No_of_nurses: "",
    No_of_surgeons: "",
    No_of_attendents: "",
    No_of_patients: "",
    Equipment_list: [],
  });

  const [equipment, setEquipment] = useState({
    name: "",
    quantity: "",
    condition: "Good",
  });

  /* ================= FETCH DEPARTMENT (EDIT MODE) ================= */
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

        const dept = res.data;
        console.log(res.data);

        setFormData({
          ...dept,
          Equipment_list: dept.Equipment_list || [],
        });
      } catch (err) {
        toast.error("Failed to load department");
      }
    };

    fetchDept();
  }, [id]);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= EQUIPMENT ================= */
  const addEquipment = () => {
    if (!equipment.name || !equipment.quantity) return;

    setFormData((prev) => ({
      ...prev,
      Equipment_list: [...prev.Equipment_list, equipment],
    }));

    setEquipment({ name: "", quantity: "", condition: "Good" });
  };

  const removeEquipment = (index) => {
    setFormData((prev) => ({
      ...prev,
      Equipment_list: prev.Equipment_list.filter((_, i) => i !== index),
    }));
  };

  /* ================= SUBMIT ================= */
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const url = isEditMode
  //       ? `http://localhost:5000/upDept/${id}`
  //       : "http://localhost:5000/addDept";

  //     const method = isEditMode ? "put" : "post";

  //     await axios({
  //       method,
  //       url,
  //       data: formData,
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });

  //     toast.success(
  //       isEditMode ? "Department updated successfully" : "Department added successfully"
  //     );

  //     navigate("/admin");
  //   } catch (err) {
  //     toast.error("Failed to save department");
  //   }
  // };

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...formData,

    floor: Number(formData.floor),
    rooms: Number(formData.rooms),
    established_year: Number(formData.established_year),

    No_of_doctors: Number(formData.No_of_doctors),
    No_of_nurses: Number(formData.No_of_nurses),
    No_of_surgeons: Number(formData.No_of_surgeons),
    No_of_attendents: Number(formData.No_of_attendents),
    No_of_patients: Number(formData.No_of_patients),

    Equipment_list: formData.Equipment_list.map(eq => ({
      name: eq.name,
      quantity: Number(eq.quantity),
      condition: eq.condition,
    })),
  };

  // 🚨 client-side safety check
  for (const [key, value] of Object.entries(payload)) {
    if (
      value === "" ||
      value === null ||
      (typeof value === "number" && isNaN(value))
    ) {
      toast.error(`Field "${key}" is missing`);
      return;
    }
  }

  try {
    const url = isEditMode
      ? `http://localhost:5000/upDept/${id}`
      : "http://localhost:5000/addDept";

    const method = isEditMode ? "put" : "post";

    await axios({
      method,
      url,
      data: payload,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    toast.success(
      isEditMode ? "Department updated successfully" : "Department added successfully"
    );

    navigate("/admin");
  } catch (err) {
    console.error(err.response?.data);
    toast.error(err.response?.data?.message || "Failed to save department");
  }
};  
  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#d0e5f1] flex justify-center items-center">
      <div className="bg-white w-[90%] md:w-[70%] p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          {isEditMode ? "Update Department" : "Add Department"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* BASIC INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Department Name *" className="input" required />
            <input name="Head_of_department" value={formData.Head_of_department} onChange={handleChange} placeholder="Head of Department *" className="input" required />
            <input name="floor" value={formData.floor} onChange={handleChange} placeholder="Floor" className="input" />
            <input name="rooms" value={formData.rooms} onChange={handleChange} placeholder="Rooms" className="input" />
            <input name="established_year" value={formData.established_year} onChange={handleChange} placeholder="Established Year" className="input" />
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Department Description"
            className="input h-24"
          />

          {/* COUNTS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <input name="No_of_doctors" value={formData.No_of_doctors} onChange={handleChange} placeholder="Doctors" className="input" />
            <input name="No_of_nurses" value={formData.No_of_nurses} onChange={handleChange} placeholder="Nurses" className="input" />
            <input name="No_of_surgeons" value={formData.No_of_surgeons} onChange={handleChange} placeholder="Surgeons" className="input" />
            <input name="No_of_attendents" value={formData.No_of_attendents} onChange={handleChange} placeholder="Attendants" className="input" />
            <input name="No_of_patients" value={formData.No_of_patients} onChange={handleChange} placeholder="Patients" className="input" />
          </div>

          {/* EQUIPMENT */}
          <div>
            <h3 className="font-semibold mb-2">Equipment</h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
              <input placeholder="Name" value={equipment.name} onChange={(e) => setEquipment({ ...equipment, name: e.target.value })} className="input" />
              <input placeholder="Quantity" value={equipment.quantity} onChange={(e) => setEquipment({ ...equipment, quantity: e.target.value })} className="input" />
              <select value={equipment.condition} onChange={(e) => setEquipment({ ...equipment, condition: e.target.value })} className="input">
                <option>Excellent</option>
                <option>Good</option>
                <option>Needs Repair</option>
              </select>
              <button type="button" onClick={addEquipment} className="bg-blue-500 text-white rounded-md">
                Add
              </button>
            </div>

            <ul className="space-y-1">
              {formData.Equipment_list.map((eq, i) => (
                <li key={i} className="flex justify-between bg-gray-100 p-2 rounded">
                  {eq.name} — {eq.quantity} ({eq.condition})
                  <button type="button" onClick={() => removeEquipment(i)} className="text-red-500">
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            {isEditMode ? "Update Department" : "Add Department"}
          </button>
        </form>
      </div>
    </div>
  );
}