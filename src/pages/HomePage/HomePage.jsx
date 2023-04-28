import React from 'react'
import hive from '../../resources/hiveIcon.png'
import bee from '../../resources/bee (2).png'
import { Link } from 'react-router-dom'
import './HomePage.css'



export default function HomePage() {
  return (
    <div className='mainContent'>
        <div className="mainPageTitle" style = {{textAlign: 'left'}}>

            <h1>LET'S GET</h1>
            <h1 style = {{fontSize: '6em', color: 'var(--accentOrange)', marginTop: '0'}}>BUZZING!</h1>
            <img id = "titleHive" src={hive} alt="" />
        </div>
        <div className="sideTitle" style = {{textAlign: 'right', position: "relative"}}>
            <h2>Try the hot new developer tool</h2>
            <h2 style = {{zIndex: '100'}}><Link to = '/community'><span style = {{color: 'var(--accentOrange)', textDecoration: 'underline'}}>everyone</span></Link> is talking about.</h2>
            <img id = "titleBees" src={hive} alt="" />
        </div>
        <div className="sideTitle" style = {{textAlign: 'left', marginTop: '5%', fontSize: '1.3em'}}>
            <h2>Features <span style = {{color: 'var(--accentOrange)'}}>include:</span></h2>
            <ul id = "featuresList">
                <li>Save snippets of <span style = {{color: 'var(--accentOrange)'}}>any language</span></li>
                <li><span style = {{color: 'var(--accentOrange)'}}>Group your snippets</span> by category using bins</li>
                <li>Gain inspiration from other users in our <Link to = '/community'><span style = {{color: 'var(--accentOrange)', textDecoration: 'underline'}}>community page</span></Link></li>
            </ul>
        </div>
    </div>
  )
}
