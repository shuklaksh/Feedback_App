import { motion, AnimatePresence } from 'framer-motion'
import { useContext, useEffect } from 'react'
import FeedbackContext from '../../context/FeedbackContext'
import Feedback from './Feedback'

function FeedbackList() {
  const{ feedback } = useContext(FeedbackContext)
  
  if(!feedback || feedback.length === 0){
    return <p>No Feedback yet</p>
  }

  
  
  return (
    <div className='feedback-list'>
    <AnimatePresence>
        {feedback.map((item) => (
          <motion.div
          key={item.id}
          intial={{ opacity:0 }}
          animate={{ opacity:1 }}
          exit = {{ opacity:0 }}
          layout
          >
          <Feedback key={item.id} item={item}/>
          </motion.div>
        ))}
    </AnimatePresence>
    </div>
  )
}

export default FeedbackList
