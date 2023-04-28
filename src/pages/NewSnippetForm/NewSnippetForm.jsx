import React, {useState, useEffect} from 'react'
import './NewSnippetForm.css'
import sendRequest from '../../utilities/send-request';
import { useNavigate, Link } from 'react-router-dom';
import hljs from "highlight.js";


export default function NewSnippetForm({user}) {
    const [title, settitle] = useState("");
    const [category, setCategory] = useState("");
    const [body, setBody] = useState("");
    const [description, setDescription] = useState("");
  
    const [categories, setCategories, isLoading] = useState([]);

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

    function handleInput2(e) {
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
          } else if (e.key === 'Tab' && e.shiftKey) {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;
            this.value = this.value.substring(0, start) + '     ' + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 5;
          }
    }
  
    return (
        <div className="mainContent">
            {isLoading ? <p>HELLO</p> : null}
            <h1>Add new <span style = {{color: 'var(--accentOrange)'}}>snippet</span></h1>
            {categories.length && !isLoading ?
            <div style={{ textAlign: "center" }}>
                <form onSubmit={handleSubmit} className='newSnippetForm'>
                <div >
                    <label htmlFor="title">Title</label>
                    <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                    />
                </div>
                <div >
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
                    <label htmlFor="body">Code</label>
                    <textarea
                    id="body"
                    value={body}
                    onChange={handleChange}
                    onInput={handleInput2}
                    autoFocus = 'autofocus'
                    tabIndex='-1'
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    
                    ></input>
                </div>
                <button type="submit" className="orangeButton">Submit</button>
                </form>
            </div>
            : 
            <>
                <hr />
                <h1>Looking pretty empty in here!</h1>
                <h3>Head to your <Link to = {`/profile/${user.username}`} style = {{color: 'var(--accentOrange)'}}>profile</Link> to add a bin!</h3>
            </>
            }
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
