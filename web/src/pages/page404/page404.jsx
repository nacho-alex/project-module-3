import img404 from '../../assets/druit404.png'
import './page404.css'


function Page404() {
    return (
      <div className='page-404'>
        <div className="notfound-div">
            <h1>Sorry, we cant find that</h1>
            <img src={img404} alt="Not Found" />
        </div>
      </div>
    )
  }
  
  export default Page404;