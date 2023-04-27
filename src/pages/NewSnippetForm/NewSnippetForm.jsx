import React, {useState, useEffect} from 'react'
import sendRequest from '../../utilities/send-request';
import { useNavigate } from 'react-router-dom';
import hljs from "highlight.js";


export default function NewSnippetForm({user}) {
    const [title, settitle] = useState("");
    const [category, setCategory] = useState("");
    const [body, setBody] = useState("");
    const [description, setDescription] = useState("");
  
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();
    let formattedText;
  
    useEffect(() => {
      fetchCategories()
    }, []);

    async function fetchCategories() {
        const cats = await sendRequest(`/api/categories/fetchCats/${user._id}`, 'GET')
        setCategories(cats)
    }

    const handleChange = (e) => {
        formattedText = e.target.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        setBody(formattedText);
      };
  
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
                    onChange={handleChange}
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







    // const [snippet, setSnippet] = useState("");

    // let formattedText = ''

    // const handlePaste = (e) => {
    //   const text = e.target.textContent;
    //     formattedText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //   setSnippet(formattedText);
    // };
    
    // // const save = () => {
    // //   const collection = db.collection("snippets");
    // //   const doc = {
    // //     snippet: snippet,
    // //   };
    // //   collection.insertOne(doc);
    // // };
    
    // const handleChange = (e) => {
    //   formattedText = e.target.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //   setSnippet(formattedText);
    // };
    
    // return (
    //   <div className = "mainContent">
    //     <textarea
    //       id="snippet"
    //       value={snippet}
    //       onChange={handleChange}
    //     ></textarea>
    //     {/* <p>{snippet}</p> */}
    //     <pre style = {{textAlign: "left", margin: "0px"}}>
    //         {snippet}
    //     </pre>
    //     {/* <button type="submit" onClick={save}>Save</button> */}
    //   </div>
    // );
}
