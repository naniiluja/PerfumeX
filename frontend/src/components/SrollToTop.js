import React from 'react'
import {useState} from 'react'

function SrollToTop() {
    const [isShow, setIsShow] = useState(false);
    const handleScrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          setIsShow(true);
        } else {
          setIsShow(false);
        }
      });
        
  return (
    <div
      onClick={handleScrollToTop}
      className={isShow ? "scroll-btn show" : "scroll-btn"}
    >
      <div className="scroll-btn__icon">
      <i class="fa fa-arrow-up"></i>
      </div>
    </div>
  )
}

export default SrollToTop