import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import sendRequest from '../../utilities/send-request'


export default function EditSnippetForm({user}) {

    const [snippet, setSnippet] = useState({})
    const {snipID} = useParams();

    const navigate = useNavigate()

    async function fetchSnip() {
        const response = await sendRequest(`/api/snippets/fetchOne/${snipID}`, 'GET')
        setSnippet(response)
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setSnippet({
          ...snippet,
          [e.target.name]: value,
        });
      };

      async function handleSubmit(e) {
        e.preventDefault()
        const updateSnip = await sendRequest(`/api/snippets/update/${snipID}`, 'PUT', snippet)

        navigate(`/snippets-show/${snipID}`)
      }

    //   const handleInput = (e) => {
    //     const textarea = e.target;
    //     const height = textarea.scrollHeight + 16;
    //     textarea.style.height = height + "px";
    //   };

    useEffect(() => {
        fetchSnip()
    },[])

  return (
    <div className = "mainContent">
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", alignItems: 'center', gap: '20px'}}>
            <label htmlFor="title">Title</label>
            <input
            type="text"
            name="title"
            placeholder="Title"
            value={snippet?.title}
            onChange={handleChange}
            />
            <label htmlFor="category">Category</label>
            <input
            type="text"
            name="category"
            placeholder="Category"
            value={snippet?.category}
            onChange={handleChange}
            />
            <label htmlFor="body">Body</label>
            <textarea
            name="body"
            placeholder="Body"
            value={snippet?.body}
            onChange={handleChange}
            // onInput={handleInput}
            ></textarea>
            <label htmlFor="description">Description</label>
            <textarea
            name="description"
            placeholder="Description"
            value={snippet?.description}
            onChange={handleChange}
            ></textarea>
            <button type="submit">Submit</button>
  </form>
    </div>
  )
}
