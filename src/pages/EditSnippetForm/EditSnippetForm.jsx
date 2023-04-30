import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import sendRequest from '../../utilities/send-request'


export default function EditSnippetForm({user}) {

    const [snippet, setSnippet] = useState({})
    const [categories, setCategories] = useState([])
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

    async function fetchCategories() {
      const cats = await sendRequest(`/api/categories/fetchCats/${user._id}`, 'GET')
      setCategories(cats)
  }

    useEffect(() => {
        fetchSnip()
        fetchCategories()
    },[])

  return (
    <div className = "mainContent">
        <form className='editCategoryForm' >
            <label htmlFor="title">Title</label>
            <input
            type="text"
            name="title"
            placeholder="Title"
            value={snippet?.title}
            onChange={handleChange}
            />
            <div >
                <label htmlFor="category">Category</label>
                    <select
                    id="category"
                    name = "category"
                    value={snippet.category}
                    onChange={handleChange}
                    
                    >
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>  
                    ))}
                    </select>

                </div>
            <label htmlFor="body">Body</label>
            <textarea
              name="body"
              placeholder="Body"
              value={snippet?.body}
              onChange={handleChange}
              // onInput={handleInput}
              ></textarea>
            <label htmlFor="description">Description</label>
            <input
              name="description"
              placeholder="Description"
              value={snippet?.description}
              onChange={handleChange}
            ></input>
            <div className = "orangeButton" onClick={handleSubmit}>Submit</div>
  </form>
    </div>
  )
}
