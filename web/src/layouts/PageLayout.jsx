import React, { useState, useEffect } from 'react';
import './PageLayout.css';
import Footer from '../components/UI/footer/footer';

function PageLayout({ children }) {
  const [isEndOfPage, setIsEndOfPage] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight -200) {
        setIsEndOfPage(true);
      } else {
        setIsEndOfPage(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="pageFather">
      <div className='page-layout'>
          <div>{children}</div>
          <Footer></Footer>
      </div>
      <div className={`end-of-page-animation ${isEndOfPage ? 'visible' : ''}`}></div>
    
    
    </div>
    
  );
}

export default PageLayout;
