import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import sendRequest from '../../utilities/send-request';
import './EditCategoryForm.css'



export default function EditCategoryForm({user}) {

    const [category, setCategory] = useState({})

    const {catID} = useParams();
    const navigate = useNavigate()


    async function fetchCat() {
        const cat = await sendRequest(`/api/categories/fetchOne/${catID}`)
        setCategory(cat)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const update = await sendRequest(`/api/categories/update/${catID}`, "PUT", category)
        console.log(update)
        navigate(`/profile/${user.username}`)

    }
    

    const handleChange = (e) => {
        const value = e.target.value;
        setCategory({
          ...category,
          [e.target.name]: value,
        });
      };

    useEffect(() => {
       fetchCat() 
    },[])


  return (
    <div className = "mainContent">
        <form onSubmit = {handleSubmit} className='editCategoryForm'>
            <label htmlFor="name">Name</label>
            <input
            type="text"
            name="name"
            placeholder="Name"
            value={category.name}
            onChange={handleChange}
            />
            <label htmlFor="description">Description</label>
            <textarea
            name="description"
            placeholder="Description"
            value={category.description}
            onChange={handleChange}
            ></textarea>
            <button className='orangeButton' type="submit">Submit</button>
  </form>
    </div>
  )
}
