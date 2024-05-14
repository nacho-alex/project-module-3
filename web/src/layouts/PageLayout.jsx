import React from 'react'
import './PageLayout.css'

function PageLayout({children}) {
  return (
    <div className='page-layout'>
      <div>{children}</div>
    </div>
  )
}

export default PageLayout