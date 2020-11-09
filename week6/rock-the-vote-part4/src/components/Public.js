import React, { useContext } from 'react'
import IssuesForm from './IssuesForm.js'
import IssuesList from './IssuesList.js'
import { UserContext } from '../context/UserProvider.js'


export default function Public(){
  const { 
    user: { 
      username }, 
    addIssues, 
    issues 
  } = useContext(UserContext)

  return (
    <div className="profile">
      <h1>Welcome @{username}!</h1>
      <h3>Public Issues Page</h3>
      <IssuesForm addIssues={addIssues}/>
      <IssuesList issues={issues}/>
    </div>
  )
}