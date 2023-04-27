import React from 'react'

export default function SnippetCard({snippet, user}) {
  return (
    <div className='categoryCard'>{snippet.title}</div>
  )
}
