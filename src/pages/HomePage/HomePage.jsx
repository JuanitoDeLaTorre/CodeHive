import React from 'react'
import hive from '../../resources/hiveIcon.png'
import bee from '../../resources/bee.png'
import { Link } from 'react-router-dom'
import './HomePage.css'



export default function HomePage() {
  return (
    <div className='mainContent'>
        <div className="mainPageTitle" style = {{textAlign: 'left'}}>

            <h1>LETS GET</h1>
            <h1 style = {{fontSize: '6em', color: 'var(--accentOrange)', marginTop: '0'}}>BUZZING!</h1>
            <img id = "titleHive" src={hive} alt="" />
            <img src={bee} alt="" />
        </div>
        <div className="sideTitle" style = {{textAlign: 'right'}}>
            <h2>Try the hot new developer tool</h2>
            <h2><Link to = '/community'><span style = {{color: 'var(--accentOrange)', textDecoration: 'underline'}}>everyone</span></Link> is talking about.</h2>
        </div>
        <div className="sideTitle" style = {{textAlign: 'left'}}>
            <h2>Features <span style = {{color: 'var(--accentOrange)'}}>include:</span></h2>
            {/* <h2><Link to = '/community'><span style = {{color: 'var(--accentOrange)', textDecoration: 'underline'}}>everyone</span></Link> is talking about.</h2> */}
        </div>
    </div>
  )
}
