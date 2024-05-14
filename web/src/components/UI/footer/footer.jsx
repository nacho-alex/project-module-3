import React from 'react'
import './footer.css'
import logo from '../../../assets/fittrackerWhite.svg'

function Footer() {
  return (
    <div className='footer'>
        <div className="footer-logo-div" >
            <div>
                <img src={logo} alt=""/>
            </div>
            <p>Just a social network of fitness life created with care for a class project.</p>
        </div>
        
        <div className="footer-social">
            <h3>follow us</h3>
            <div>
                <p>Nacho</p>
                <a href=""><i className="fa-brands fa-linkedin"></i></a>
                <a href=""><i className="fa-brands fa-github"></i></a>
                <p>Alex</p>
                <a href=""><i className="fa-brands fa-linkedin"></i></a>
                <a href=""><i className="fa-brands fa-github"></i></a>
            </div>
        </div>

    </div>
  )
}

export default Footer