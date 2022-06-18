import React from 'react'
import './footer.css'
import playstore from '../../../assets/playstore.png'
import appstore from '../../../assets/appstore.png'


const Footer = () => {
  return (
    <footer >
   <div >
     <h1 >No Shop</h1>
     <p>We create business for the connected world</p>
   </div>

   <div>
     <h3>Explore</h3>
     <p>Home</p>
     <p>About</p>
     <p>Contact</p>
     <p>Service</p>
   </div>

   <div>
     <h3>Visit</h3>
     <p>Street No 4973 Seeb Bazaar Muttrah Oman</p>
     
     <div className='footerthirdsection'>
     <h4>New Business</h4>
     <p>noshop@gmail.com</p>
     <p>96867367237</p>
   
   </div>
   </div>


   <div>
     <h3>Follow</h3>
     <p>Facebook</p>
     <p>Instagram</p>
     <p>Tiktok</p>
     
   </div>


   <div >
     <h3>Legal</h3>
     <p>Terms</p>
     <p>Privacy</p>
     
     
   </div>

   <div className='footerlastsection'>Next : About</div>

</footer>
  )
}

export default Footer