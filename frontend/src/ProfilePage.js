import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const location = useLocation();
  const email = location.state.email;
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user?email=${email}`
      );
      setDetails(response.data);
      setEditedDetails(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [email]);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    setEditedDetails({
      ...editedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEdit = () => {
    if (isEditing) {
      axios
        .put(`http://localhost:5000/user/${details.id}`, editedDetails)
        .then((response) => {
          console.log("User details updated successfully");
          // Re-fetch user details after successful update
          fetchUserData();
        })
        .catch((error) => {
          console.error("Error updating user details:", error.message);
        });
    }
    setIsEditing(!isEditing);
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  if (!details) {
    return <div className="flex justify-center items-center   text-[25px] font-bold " >Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded-lg">
      <h1 className="text-xl justify-center items-center flex self-center text-[25px] font-bold mb-4">Edit Profile</h1>
      <div className="p-4">
        {!isEditing ? (
          <div className=" flex flex-col justify-center items-center gap-2 mb-3">
            <p className=" flex flex-col ">
              <strong className="self-center ">Name:</strong> <span className="self-center ">{details.name}</span>
            </p>
            <p className=" flex flex-col ">
              <strong className="self-center ">College Name:</strong><span className="self-center "> {details.clgname}</span>
            </p>
            <p className=" flex gap-2 ">
              <strong className="self-center">Branch:</strong> <span className="self-center">{details.branch}</span>
            </p>
            <p className=" flex gap-4 ">
              <strong className=" self-center">Age:</strong> <span className="self-center">{details.age}</span>
            </p>
            <p className=" flex gap-3 ">
              <strong className="self-center">Date of Birth:</strong> <span className="self-center">{formatDate(details.dob)}</span>
            </p>
            <p className=" flex gap-4 ">
              <strong className="self-center">Contact:</strong> <span className="self-center">{details.contact}</span>
            </p>
          </div>
        ) : (
          <form>
            <div className=" flex flex-col justify-center items-center gap-2 p-2">
              <div className=" flex flex-col ">
              <label className="mb-1 font-bold">Name</label> 
              <input
                type="text"
                name="name"
                className="  p-2 rounded-[8px]  focus:outline-none border-[1px] text-md border-[#62c841]"
                value={editedDetails.name}
                onChange={handleChange}
              /></div>
              
              <div className=" flex flex-col ">
              <label className="mb-1 font-bold">Institution</label> 
              <input
                type="text"
                name="collegeName"
                className="  p-2 rounded-[8px]  focus:outline-none border-[1px] text-md border-[#62c841]"
                value={editedDetails.clgname}
                onChange={handleChange}
              /></div>

<div className=" flex flex-col ">
              <label className="mb-1 font-bold">Branch</label> 
              <input
                type="text"
                name="branch"
                value={editedDetails.branch}
                className="  p-2 rounded-[8px]  focus:outline-none border-[1px] text-md border-[#62c841]"
                onChange={handleChange}
              /></div>

<div className=" flex flex-col ">
              <label className="mb-1 font-bold">Age</label> 
              <input
                type="text"
                name="age"
                value={editedDetails.age}
                className="  p-2 rounded-[8px]  focus:outline-none border-[1px] text-md border-[#62c841]"
                onChange={handleChange}
              /></div>

<div className=" flex flex-col ">
              <label className="mb-1 font-bold">Date of Birth</label> 
              <input
                type="text"
                name="dob"
                value={formatDate(editedDetails.dob)} // Use formatDate to format the date
                className="  p-2 rounded-[8px]  focus:outline-none border-[1px] text-md border-[#62c841]"
                onChange={handleChange}
              /></div>

<div className=" flex flex-col ">
              <label className="mb-1 font-bold">Contact</label> 
              <input
                type="text"
                name="contact"
                value={editedDetails.contact}
                className="  p-2 rounded-[8px]  focus:outline-none border-[1px] text-md border-[#62c841]"
                onChange={handleChange}
              /></div>.
            </div>
          </form>
        )}
      </div>
      <div className="flex items-center -mt-4 justify-center">
        <button
          className={`bg-${isEditing ? "green" : "blue"}-500 hover:bg-${
            isEditing ? "green" : "blue"
          }-700 text-white font-bold py-2 bg-[blue] rounded-[5px] px-7  focus:outline-none focus:shadow-outline`}
          type="button"
          onClick={toggleEdit}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      <div className=" flex justify-center items-center mt-3">
      <button onClick={handleLogout}  className=" px-7 py-2 bg-[red] text-white rounded-[7px] flex justify-center items-center " >Logout</button>
    </div></div>
  );
};

export default ProfilePage;
