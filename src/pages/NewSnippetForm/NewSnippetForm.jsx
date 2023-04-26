import React, {useState, useEffect} from 'react'
import sendRequest from '../../utilities/send-request';
import { useNavigate } from 'react-router-dom';

export default function NewSnippetForm({user}) {
    const [title, settitle] = useState("");
    const [category, setCategory] = useState("");
    const [body, setbody] = useState("");
    const [description, setDescription] = useState("");
  
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();
  
    useEffect(() => {
      fetchCategories()
    }, []);

    async function fetchCategories() {
        const cats = await sendRequest(`/api/categories/fetchCats/${user._id}`, 'GET')
        setCategories(cats)
    }
  
    async function handleSubmit(e) {
      e.preventDefault();
      const data = {
        title,
        category,
        body,
        description,
      }
      console.log(data)
      const response = await sendRequest(`/api/snippets/create`, 'POST', data);

      navigate(`/profile/${user.username}`)
    }
  
    return (
        <div className="mainContent">
            <div style={{ textAlign: "center" }}>
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">title</label>
                    <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    >
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                        {category.name}
                        </option>
                    ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="body">Body Text</label>
                    <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setbody(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
