import { Link } from 'react-router-dom'
import Card from '../shared/Card'


function AboutPage() {
  return (
    <Card>
      <h2>This is a Feedback Form made using ReactJS</h2>
      <Link to='/'> back to home </Link>
    </Card>
  )
}

export default AboutPage
