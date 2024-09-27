import React from 'react'

function Footer() {
  return (
    <footer className="footer footer-center bg-primary text-primary-content p-10">
  <aside>
    <img src="logo.png"></img>
    <p className="font-bold text-white ">
      Musix by Rishi
      <br />
      Built with ❤️ by Rishi.
    </p>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  
</footer>
  )
}

export default Footer
