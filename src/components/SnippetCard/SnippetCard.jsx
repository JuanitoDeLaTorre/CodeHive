import React from 'react'
import { Link } from 'react-router-dom'

export default function SnippetCard({snippet, user}) {

  const numLines = (snippet.body.match(/\n/g) || '').length + 1

  return (
    <Link to = {`/snippets-show/${snippet._id}`}>
        <div className='snippetCard'>
            <h4 style = {{color: 'var(--accentOrange)'}}>{snippet.title}</h4>
            <p style = {{fontSize: '0.8em'}}>{snippet.description}</p>
            <p># of <span style = {{color: 'var(--accentOrange'}}>lines</span>: {numLines}</p>
        </div>
    </Link>
  )
}
