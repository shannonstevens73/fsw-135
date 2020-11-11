import React, { useState } from 'react'

const initInputs = {
  date: "",
  text: ""
}

export default function CommentForm(props){
  const [inputs, setInputs] = useState(initInputs)
  const { addComments, id } = props

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addComments(inputs, id)
    setInputs(initInputs)
  }

  const { date, text } = inputs
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="date" 
        value={date} 
        onChange={handleChange} 
        placeholder="date"/>
      <input 
        type="text" 
        name="text" 
        value={text} 
        onChange={handleChange} 
        placeholder="text"/>
      <button>Add Comment</button>
    </form>
  )
}