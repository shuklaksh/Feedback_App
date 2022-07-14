import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import FeedbackList from './components/feedback/FeedbackList';
import Header from './components/header/Header';
import FeedbackStats from './components/feedback/FeedbackStats';
import FeedbackForm from './components/feedback/FeedbackForm';
import AboutPage from './components/about/AboutPage';
import {FeedbackProvider} from './context/FeedbackContext'

import AboutIcon from './components/about/AboutIcon';


function App() {
  
  return (
    <FeedbackProvider>
      <Router>
        <Header />
          <div className="container">
            <Routes>
              <Route exact path='/' element = {
                <>
                  <FeedbackForm  />
                  <FeedbackStats />
                  <FeedbackList />
                  <AboutIcon /> 
                </>
              } />
                
              <Route path='/about' element={ <AboutPage /> } />
            </Routes> 

          
          </div>
          

      </Router>
    </FeedbackProvider>
  )
}

export default App;
