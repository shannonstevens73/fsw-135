import React from 'react'
import IssuesList from './IssuesList.js'

export default function Issues(props){
  const { title, description, _id } = props
  return (
    <div className="issue">
      <h1>{ title }</h1>
      <h3>{ description }</h3>
    </div>
  )
}