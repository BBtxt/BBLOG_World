import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'


const Mono = () => {
 const [selectedItem, setSelectedItem] = useState(1);

 const handleSelect = () => {
    setSelectedItem( selectedItem + 1);  
  };

  if(selectedItem >= 8) {
    setSelectedItem(1)
  }

  return (
    <div
    onClick={handleSelect}
    >
      <Image
      src={`/mono/mono-${selectedItem}.jpg`}
      alt="Picture of the author"
      width={600}
      height={600}
      />
    </div>
  )
}

export default Mono