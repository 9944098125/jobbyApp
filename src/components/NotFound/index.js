import {Link} from 'react-router-dom'

import Profile from '../Profile'
import SalaryRangesRoute from '../SalaryRangesRoute'
import EmploymentTypesList from '../EmploymentTypeRoute'
import Header from '../Header'

import './index.css'

const NotFound = () => (
  <>
    <Link to="/not-found0">
      <Header />
      <div className="not-found-container">
        <div className="col">
          <Profile />
          <EmploymentTypesList />
          <SalaryRangesRoute />
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="not-found-img"
        />
      </div>
    </Link>
  </>
)

export default NotFound
