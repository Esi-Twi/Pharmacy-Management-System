import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Carousel from '../components/Carousel'

function Home() {
  const slides = [
    '../../assets/icons/email.png',
    '../../assets/icons/email.png',
    '../../assets/icons/email.png',
    '../../assets/icons/email.png',
  ]

    return (
      <div>
        <header className='absolute top-0 left-0 bg-white right-0 flex items-center justify-between px-[5%] py-2'>
          <Link className='text-brandTeal ff-tangerine font-bold text-5xl'>DunonPharmacy</Link>

          <nav>
            <ul className='flex items-center gap-[60px]'>
              <li><NavLink to='#hero'>Home</NavLink></li>
              <li><NavLink to='#'>Services</NavLink></li>
              <li><NavLink to='#'>Mission</NavLink></li>
              <li><NavLink to='#'>Contact</NavLink></li>
              <li><NavLink className='bg-brandYellow px-[1.5rem] text-white py-[10px] text-sm rounded-sm' to='/login'>LogIn</NavLink></li>
            </ul>
          </nav>
        </header>


        {/* --------hero--------------- */}
        <section id='#hero' className='h-[100vh] bg-gray-200 flex items-center gap-[10%] px-[5%]'>
          <div className='w-[40%]'>
            <h1 className='text-center text-gray-900'>Welcome to <br/> 
            <span className='ff-tangerine font-bold text-8xl text-brandTeal'>Dunon Pharmacy</span></h1>
            <p className='text-center'>Your trusted partner in health and wellness.</p>

            <button className='b-button mt-8'>Explore Our Services</button>
          </div>

          <div className='w-[60%]'>
              <Carousel autoSlide={true} autoSlideInterval={3000}>
                <img className='rounded-md' src='../../assets/imgs/bottle.jpg' alt='#' />
                <img className='rounded-md' src='../../assets/imgs/capsule.jpg' alt='#' />
                <img className='rounded-md' src='../../assets/imgs/syringe.jpg' alt='#' />
              </Carousel>
          </div>
        </section>

{/*


Description (2–3 sentences):
At Bluegle Pharmacy, we provide high-quality medicines, professional pharmaceutical care, and personalized service. Whether it’s prescriptions, over-the-counter drugs, or expert health advice, we’re here to serve you with excellence and compassion.

CTA Button:

“Explore Services”

“Login to Dashboard”
*/}

        {/* --------services--------------- */}
        {/* --------mission--------------- */}
        {/* --------contact--------------- */}


        <footer>

        </footer>

      </div>
    )
  }

  export default Home