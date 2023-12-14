import { motion } from 'framer-motion'

type CommandCodeProps = {
  commandCode: string
  hasEffect?: boolean
}

export function CommandCode({ commandCode, hasEffect }: CommandCodeProps) {
  const variants1 = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 }
  }
  return (
    <motion.span
      initial='hidden'
      animate='visible'
      transition={{ duration: 1 }}
      variants={hasEffect ? variants1 : undefined}
      className='font-semibold drop-shadow-sm'
    >
      {commandCode}
    </motion.span>
  )
}
