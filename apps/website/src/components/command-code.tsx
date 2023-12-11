import { motion } from 'framer-motion'

export function CommandCode({ commandCode }: { commandCode: string }) {
  const variants1 = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 }
  }
  return (
    <motion.span
      initial='hidden'
      animate='visible'
      transition={{ duration: 1 }}
      variants={variants1}
      className='font-semibold drop-shadow-sm'
    >
      {commandCode}
    </motion.span>
  )
}
