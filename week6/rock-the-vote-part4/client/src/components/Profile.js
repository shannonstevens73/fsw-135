import React, { useContext } from 'react'
import IssuesForm from './IssuesForm.js'
import IssuesList from './IssuesList.js'
import { UserContext } from '../context/UserProvider.js'


export default function Profile(){
  const { 
    user: { 
      username }, 
    addIssues, 
    issues 
  } = useContext(UserContext)

  return (
    <div className="profile">
      <h1>Welcome @{username}!</h1>
      <h3>Add An Issue</h3>
      <IssuesForm addIssues={addIssues}/>
      <h3>Your Issues</h3>
      <IssuesList issues={issues}/>
    </div>
  )
}