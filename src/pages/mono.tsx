import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'




const Mono = () => {
  
 const [selectedItem, setSelectedItem] = useState(1);

 const handleSelect = () => {
    setSelectedItem( (selectedItem) => (selectedItem >= 8 ? 1 : selectedItem + 1));  
  };


  return (
    <motion.div
    initial={false}
    animate={{ opacity: 1, x:100}}
    transition={{ease: "easeOut", duration: 2}}
    onClick={handleSelect}
    >
      <motion.img
      key={selectedItem}
      src={`/mono/mono-${selectedItem}.jpg`}
      alt="Picture of the author"
      width={600}
      height={600}
      />
    </motion.div>
  )
}

export default Mono