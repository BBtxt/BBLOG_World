import React, { ReactNode } from 'react'
import Nav from './Nav'

type LayoutProps = {
    children: ReactNode;
  };

const Layout = ( {children}:LayoutProps ) => {
  return (
<div>
<section>
      <Nav/>
     </section>
     <section>
    <main>{children}</main>
     </section>
</div>
  )
}

export default Layout