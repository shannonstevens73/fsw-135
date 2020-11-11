import React, { useEffect, useState} from 'react'
import CommentForm from './CommentForm'
import axios from 'axios'

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function Issues(props){
  const { title, description, _id } = props
  const [comments, setComments] = useState([])
  useEffect(() =>  {userAxios.get("/api/comment/issue/" + _id).then(res => {
    console.log(res)
    setComments(res.data)
  })})
  
  
  function addComments(newComment, id){  // issue
    console.log(newComment)
    userAxios.post("/api/comment/issue/" + id, newComment)
      .then(res => {
        console.log(res)
        setComments(prevState => (
           [...prevState.comments, res.data]
        ))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  return (
    <div className="issue">
      <h1>{ title }</h1>
      <h3>{ description }</h3>
      {console.log(comments)}
  <p>{comments.map(comment => <div>{comments.date} {comments.text}</div>)}</p>
      <CommentForm id={_id} addComments={addComments}/>
    </div>
  )
}

