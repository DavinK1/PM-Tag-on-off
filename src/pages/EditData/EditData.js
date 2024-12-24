import React, { useState, useEffect } from "react";
import styles from "./EditData.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditData = () => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">
              Line *
            </label>
            <input
              type="text"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">
              OP No.
            </label>
            <input
              type="text"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Add other fields in this column */}
        </div>

        {/* Right Column */}
        <div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">
              Machine No.
            </label>
            <select className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option>Machine 1</option>
              <option>Machine 2</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">
              Activity
            </label>
            <select className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option>Activity 1</option>
              <option>Activity 2</option>
            </select>
          </div>
          {/* Add other fields in this column */}
        </div>
      </div>
    </div>
  );
};

export default EditData;
