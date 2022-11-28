import { motion } from 'framer-motion';

const AnimatedPage = ({children}) => {

    const animations = {
        initial: {opacity: 0, y: -10},
        animate: {opacity: 1, y: 0},
        exit: {opacity: 0, y: 10},
        transition: { duration: 100 }
    }

  return (
    <motion.div variants={animations} 
        initial="initial" 
        animate="animate" 
        exit="exit"
        transition="transition"
    >
        {children}
    </motion.div>
  )
}

export default AnimatedPage