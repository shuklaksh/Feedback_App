import React, { useState, useContext, useEffect } from 'react'
import Card from '../shared/Card'
import Button from '../shared/Button';
import RatingSelect from '../shared/RatingSelect';
import FeedbackContext from '../../context/FeedbackContext';

function FeedbackForm({handleAdd}) {
    const[review,setReview] = useState("");
    const[btnDisabled,setbtnDisabled] = useState(true);
    const[message,setMessage] = useState("");
    const[rating,setRating] = useState(10);

    const { addFeedback, feedbackEdit, updateItem } = useContext(FeedbackContext);

    useEffect(()=>{
        if(feedbackEdit.edit === true) {
            setReview(feedbackEdit.item.text)
            setbtnDisabled(false)
            setRating(feedbackEdit.item.rating);
        }
    },[feedbackEdit])

    const handleTextChange = (e)=> {
        if(review === '') {
            setbtnDisabled(true);
            setMessage(null);
        } else if(review !== '' && review.trim().length < 10) {
            setMessage('Text must be atleast 10 characters');
            setbtnDisabled(true);
        }
        else{
            setMessage(null);
            setbtnDisabled(false);
        }
        setReview(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(review.trim().length > 10) {
            const newFeedback = {
                text:review,
                rating:rating,
            }

            if(feedbackEdit.edit === true) {
                updateItem(feedbackEdit.item.id, newFeedback)
            } else{
                addFeedback(newFeedback);
            }
            

            setbtnDisabled(true);
            setRating(10);
            setReview('');
        }
    }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect setRating= {setRating} rating={rating} />
        <div className="input-group">
            <input type='text' onChange={handleTextChange} value={review} placeholder='Write a review'></input>
            <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>

        {message && <div className='message'>{message}</div>}

        </form>
        
    </Card>
  )
}

export default FeedbackForm
