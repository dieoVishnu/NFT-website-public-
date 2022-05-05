import React, { useRef } from 'react'

function Topdash() {

  const menuLeft = useRef(null)
  const btnToggle = useRef(null)

  const menuToggle = () => {
    menuLeft.current.classList.toggle('active');
    btnToggle.current.classList.toggle('active');
  }
  return (
    <div className='dash-top'>
      <div className='dash-nav-top'>
        <div className="mobile-button" ref={btnToggle} onClick={menuToggle}><span></span></div>
      </div>
    </div>
  )
}

export default Topdash