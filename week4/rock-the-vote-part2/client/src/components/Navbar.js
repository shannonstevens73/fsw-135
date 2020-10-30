import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <div className="navbar">
      <Link style={{color: "whitesmoke"}} to="/profile">Profile</Link>
      <Link style={{color: "whitesmoke"}} to="/issues">Issues</Link>
    </div>
  )
}