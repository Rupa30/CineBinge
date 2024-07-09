import React from 'react'

const Header = () => {
  return (
    <div className='w-full flex fixed items-center justify-center uppercase py-4 shadow z-50 bg-slate-800 text-white text-[5vw] max-1000:text-6.4vw font-thin cursor-pointer tracking-wider'
    onClick={() => window.scroll(0,0)}
    >🎞️CineBinge🍿</div>
  )
}

export default Header
