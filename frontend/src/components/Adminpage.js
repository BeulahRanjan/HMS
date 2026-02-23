import React from 'react';
import { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Sidebar from './Sidebar';
import React from 'react'

export default function Adminpage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold">Admin Page</h1>
        <p>Welcome to the Admin Page!</p>
      </div>
    </div>
  )
}
