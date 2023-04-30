import React from 'react'
import { Link } from 'react-router-dom'

export default function Page404() {
  return (
    <div className="mainContent">
      <h1>Hmm, we <span style = {{color: 'var(--accentOrange)'}}>combed</span> our servers and we can't find a page matching that address. 🤷‍♂️</h1>
      <h3>Please try another search.</h3>
      <Link to = '/'><div className="orangeButton">Home</div></Link>
    </div>
  )
}
