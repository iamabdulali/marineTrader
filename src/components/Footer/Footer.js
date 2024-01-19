import React from 'react'
import logo from '../../assets/logo/logo1.png';
import '../../components/Footer/Footer.css';

export default function footer() {
  return (
    <div>
      <div className="footer">

         <div className="cl-1">
            <div className="logo"><img src={logo} alt="Marine Trader Logo" style={{width:'auto',height:'auto'}}/></div>
            <p >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde v
                oluptatum dicta ut eveniet reprehenderit ipsum beatae. Numquam ipsum,
                 rem quae possimus est ipsa expedita esse natus 
                 tempore placeat culpa nobis?</p>
         </div>

         <div className="cl-2">
            <h4>Quick Links:</h4>
            <ul>
                <a href="/login"><li>Home</li></a>
                <a href="#"><li>About</li></a>
                <a href="#"><li>Services</li></a>
                <a href="#"><li>Contact</li></a>
            </ul>
         </div>

         <div className="cl-3">
         <h4>Useful Links:</h4>
            <ul>
                <a href="#"><li>Watercraft</li></a>
                <a href="#"><li>Directory</li></a>
                <a href="#"><li>Events</li></a>
                <a href="#"><li>News</li></a>
            </ul>
         </div>



      </div>
    </div>
  )
}
