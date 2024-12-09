import React, { useState } from "react";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState("all");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("Kathmandu, Nepal");

  const handlePasswordChange = () => {
    // Logic for password change
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      console.log("Password changed:", password);
      alert("Password successfully updated!");
    }
  };

  const handleSaveChanges = () => {
    // Logic to save changes (e.g., updating email notifications or address)
    console.log("Saved Changes:", { emailNotifications, address });
    alert("Settings updated successfully!");
  };

  return (
    <div className="settings bg-white p-6 rounded-xl shadow-md mx-12 md:mx-20">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h2>

      {/* Change Password Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Change Password
        </h3>
        <div>
          <label className="block text-gray-600 font-medium">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full p-3 border rounded-md mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full p-3 border rounded-md mt-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handlePasswordChange}
          className="w-auto bg-[#040A27] text-white p-3 rounded-md mt-4"
        >
          Update Password
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Email Notifications
        </h3>
        <div>
          <label className="block text-gray-600 font-medium">
            Notification Preferences
          </label>
          <select
            className="w-full p-3 border rounded-md mt-2"
            value={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.value)}
          >
            <option value="all">All Notifications</option>
            <option value="none">No Notifications</option>
            <option value="important">Only Important</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Delivery Address
        </h3>
        <div>
          <label className="block text-gray-600 font-medium">
            Update Address
          </label>
          <input
            type="text"
            placeholder="Enter new delivery address"
            className="w-full p-3 border rounded-md mt-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleSaveChanges}
        className="w-autol bg-[#040A27] text-white p-3 rounded-md mt-4"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Settings;
