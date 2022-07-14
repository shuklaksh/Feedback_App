import React , {createContext , useState} from 'react'
import { useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    
    const[feedback,setFeedback] = useState([]);
    const[isLoading,setIsLoading] = useState(true);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit:false
    })
     useEffect(() => {
      fetchFeedback();
     },[]);

     //fetch feedback
     const fetchFeedback = async () => {
      const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`);
      const data = await response.json();
      setFeedback(data);
      setIsLoading(false)
     }

    const deleteFeedback = async (id) => {
        if(window.confirm("Are you sure?")){
          await fetch(`http://localhost:5000/feedback/${id}`, {
            method: 'DELETE'
          })
          setFeedback(feedback.filter((item)=> item.id !== id))
        }
      }

    const addFeedback = async (newFeedback) => {
        const response = await fetch('http://localhost:5000/feedback',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newFeedback),
        })
        const data = await response.json();
        setFeedback([data, ...feedback]);
      }
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit:true
        })
    }

    const updateItem = async (id,newItem) => {
        const response = await fetch(`http://localhost:5000/feedback/${id}`, {
          method: 'PUT',
          headers:{
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify(newItem),
        })
        const data = await response.json();
        setFeedback(feedback.map((item) => (item.id === id ? {...item, ...data} : item)))

        setFeedbackEdit({
            item:{},
            edit:false
        })
    }

    return(
        <FeedbackContext.Provider value={{
            feedback,
            deleteFeedback,
            addFeedback,
            isLoading,
            editFeedback,
            updateItem,
            feedbackEdit,
        }}>
        {children}
        </FeedbackContext.Provider>
    )
} 

export default FeedbackContext