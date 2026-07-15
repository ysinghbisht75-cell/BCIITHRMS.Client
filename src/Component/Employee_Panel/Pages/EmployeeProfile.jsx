import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function MyProfile() {
  let email=useOutletContext();
  console.log("MyProfile: ",email)
  let [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    department: "Engineering",
    role: "Software Engineer",
    address: "123 Main Street, New York, USA",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <p className="text-indigo-100 mt-1">Personal information</p>
        </div>

        <div className="p-6 md:flex gap-8">
          <div className="flex flex-col items-center md:items-start">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
            />
            <label className="mt-4 cursor-pointer rounded-md border border-indigo-200 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50">
              Update profile picture
              <input
                type="file"
                accept="image/*"
                className="hidden"
                name="empImage"
              />
            </label>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-500">{user.role}</p>
          </div>

          <div className="flex-1 mt-6 md:mt-0 grid gap-4 sm:grid-cols-2">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{user.email}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-gray-800">{user.phone}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium text-gray-800">{user.department}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium text-gray-800">{user.role}</p>
            </div>
            <div className="sm:col-span-2 bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium text-gray-800">{user.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}