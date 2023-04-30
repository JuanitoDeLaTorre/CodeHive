import React, {useState, useEffect} from 'react'
import './NewSnippetForm.css'
import sendRequest from '../../utilities/send-request';
import { useNavigate, Link, useParams } from 'react-router-dom';
import hljs from "highlight.js";


export default function NewSnippetForm({user}) {
    const [title, settitle] = useState("");
    const [category, setCategory] = useState("");
    const [body, setBody] = useState("");
    const [description, setDescription] = useState("");
  
    const [categories, setCategories, isLoading] = useState([]);
    const [incomingCategory, setIncomingCategory] = useState({});

    const {catID} = useParams();

    const navigate = useNavigate();
    let formattedText;
  
    useEffect(() => {
      fetchCategories()
      fetchIncomingCat()
      console.log(catID)
     
    }, []);

    async function fetchIncomingCat() {
        if(catID === "1") return
        const cat = await sendRequest(`/api/categories/fetchOne/${catID}`, 'GET')
        setIncomingCategory(cat)
        setCategory(cat._id)
    }

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
            {catID !== "1" ? 
            
            <h1>Add new snippet to<span style = {{color: 'var(--accentOrange)'}}> {incomingCategory.name}</span></h1> 
            :
            
            <h1>Add new <span style = {{color: 'var(--accentOrange)'}}>snippet</span></h1>
            }
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
                    {catID === "1" ?
                    <>
                        <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        
                        >
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>  
                        ))}
                        </select>
                    </>
                    :
                    <p>{incomingCategory.name}</p>
                    }
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
                    style = {{backgroundColor: 'var(--paynesGray)', color: 'white'}}
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
}
