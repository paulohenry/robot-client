import React from 'react';
import './style.css'

import {
  FaEye,
  FaSoundcloud,
  FaCogs,
  FaRobot
} from 'react-icons/fa'

import {Link} from 'react-router-dom'

function Home() {


 

  return (
      <div>
        <Link className="vision" to="/vision"><FaEye size={100}></FaEye ></Link>
        <Link className="voice" to="/voice"><FaSoundcloud size={100}/></Link>
        <Link className="config" to="/config"><FaCogs size={100}></FaCogs></Link>
        <Link className="robot" to="/robot"><FaRobot size={100}></FaRobot></Link>
      </div>
  )
}

export default Home;