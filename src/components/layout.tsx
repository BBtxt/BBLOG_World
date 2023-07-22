import React, { ReactNode } from 'react'
import Nav from './nav'

type LayoutProps = {
    children: ReactNode;
  };

const Layout = ( {children}:LayoutProps ) => {
  return (
<div className='flex justify-center items-center gap-4 h-screen w-4/5 mx-auto'>
<section className='flex w-1/4 h-auto justify-start items-start'>
      <Nav/>
     </section>
     <section className='flex flex-col h-auto w-3/4'>
    <main>{children}</main>
     </section>
</div>
  )
}

export default Layout