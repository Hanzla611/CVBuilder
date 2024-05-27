import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

function MakeCV() {
  const location = useLocation();
  const { image } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: [],
    workHistory: [
      { company: "", role: "", startDate: "", endDate: "", technologies: "" },
    ],
    education: [{ degree: "", institution: "", passingYear: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleWorkHistoryChange = (index, e) => {
    const { name, value } = e.target;
    const updatedWorkHistory = formData.workHistory.map((work, i) =>
      i === index ? { ...work, [name]: value } : work
    );
    setFormData((prevData) => ({
      ...prevData,
      workHistory: updatedWorkHistory,
    }));
  };

  const addWorkHistory = () => {
    setFormData((prevData) => ({
      ...prevData,
      workHistory: [
        ...prevData.workHistory,
        { company: "", role: "", startDate: "", endDate: "", technologies: "" },
      ],
    }));
  };

  const removeWorkHistory = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      workHistory: prevData.workHistory.filter((_, i) => i !== index),
    }));
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = formData.education.map((edu, i) =>
      i === index ? { ...edu, [name]: value } : edu
    );
    setFormData((prevData) => ({
      ...prevData,
      education: updatedEducation,
    }));
  };

  const addEducation = () => {
    setFormData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        { degree: "", institution: "", passingYear: "" },
      ],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      education: prevData.education.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonFormData = JSON.stringify(formData, null, 2);
    console.log("Form Data as JSON:", jsonFormData);
    // Here you can send the jsonFormData to a server or store it as needed
  };

  const handleSkillChange = (newValue, actionMeta) => {
    if (actionMeta.action === "create-option") {
      // If a new option is created, add it to the skills array
      const newSkill = newValue[newValue.length - 1].value;
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, newSkill],
      }));
    } else if (actionMeta.action === "remove-value") {
      // If an existing option is removed, update the skills array
      const removedSkill = actionMeta.removedValue.value;
      setFormData((prevData) => ({
        ...prevData,
        skills: prevData.skills.filter((skill) => skill !== removedSkill),
      }));
    } else if (actionMeta.action === "clear") {
      // If all options are cleared, reset the skills array
      setFormData((prevData) => ({
        ...prevData,
        skills: [],
      }));
    }
  };

  const skillOptions = formData.skills.map((skill) => ({
    value: skill,
    label: skill,
  }));

  return (
    <div className="pt-8 text-center overflow-hidden">
      <h1 className="text-3xl text-center text-red-500 font-bold">
        Start Creating Your CV
      </h1>
      {/* {image ? (
        <div className="flex justify-center mt-8">
          <img className="border-2 border-slate-500 w-1/3" src={image} alt="CV Template" />
        </div>
      ) : (
        <p className="text-center mt-8 text-red-500">No template selected.</p>
      )} */}
      <form className="mt-8 max-w-lg mx-auto pb-40" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-left font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border-2 border-slate-500 w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-slate-500 w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left font-semibold">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border-2 border-slate-500 w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left font-semibold">Skills:</label>
          <CreatableSelect
            isMulti
            value={skillOptions}
            onChange={handleSkillChange}
            className="border-2 border-slate-500 w-full"
            classNamePrefix="select p-2"
            placeholder="Add skills"
          />
        </div>
        <div className="mb-4">
          <label className="block text-left font-semibold">Work History:</label>
          {formData.workHistory.map((work, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                name="company"
                value={work.company}
                onChange={(e) => handleWorkHistoryChange(index, e)}
                className="border-2 border-slate-500 w-full p-2 mb-2"
                placeholder="Company"
                required
              />
              <input
                type="text"
                name="role"
                value={work.role}
                onChange={(e) => handleWorkHistoryChange(index, e)}
                className="border-2 border-slate-500 w-full p-2 mb-2"
                placeholder="Role"
                required
              />
              <input
                type="date"
                name="startDate"
                value={work.startDate}
                onChange={(e) => handleWorkHistoryChange(index, e)}
                className="border-2 border-slate-500 w-full p-2 mb-2"
                placeholder="Start Date"
                required
              />
              <input
                type="date"
                name="endDate"
                value={work.endDate}
                onChange={(e) => handleWorkHistoryChange(index, e)}
                className="border-2 border-slate-500 w-full p-2 mb-2"
                placeholder="End Date"
                required
              />
              <textarea
                name="technologies"
                value={work.technologies}
                onChange={(e) => handleWorkHistoryChange(index, e)}
                className="border-2 border-slate-500 w-full p-2 mb-2"
                placeholder="Technologies Used"
                rows="2"
                required
              ></textarea>
              <button
                type="button"
                onClick={() => removeWorkHistory(index)}
                className="bg-red-500 text-white font-semibold rounded-full px-6 py-2 mb-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addWorkHistory}
            className="bg-green-500 text-white font-semibold rounded-full px-6 py-2"
          >
            Add Work History
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-left font-semibold">Education:</label>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, e)}
                className="border-2 border-slate-500 w-full p-2 mb-2"
                placeholder="Degree"
                required
              />
              <input
                type="text"
                name="institution"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, e)}
                className="border-2 border-slate-500 w-full p-2 mb-2"
                placeholder="Institution"
                required
              />
              <input
                type="text"
                name="passingYear"
                value={edu.passingYear}
                onChange={(e) => handleEducationChange(index, e)}
                className="border-2 border-slate-500 w-full p-2 mb-2"
                placeholder="Passing Year"
                required
              />
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="bg-red-500 text-white font-semibold rounded-full px-6 py-2 mb-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addEducation}
            className="bg-green-500 text-white font-semibold rounded-full px-6 py-2"
          >
            Add Education
          </button>
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white font-semibold rounded-full px-52 py-6"
        >
          Save CV
        </button>
      </form>
    </div>
  );
}

export default MakeCV;
