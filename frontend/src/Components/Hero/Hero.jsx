import React from "react";
import './Hero.css'
import hero_image from '../Assets/hero_image.png'

const Hero = ()=> {
    return(
        
            <div className="Hero">
            <div className='hero-left'>
            <h2>LET'S BE VIBRANT & GO WITH THE TRENDS</h2>
    

            <div>
                <div className='hero-hand-icon'>
                    <p>New Vibrant Collections</p>   
                </div>
                <p>Just Under Your Fingertips!</p>
            </div>        
        </div>
        <div className='hero-right'>
            <img src={hero_image} alt="" />

        </div>

            </div>
    )
}

export default Hero