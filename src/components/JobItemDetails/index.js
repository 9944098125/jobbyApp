import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {GiSuitcase} from 'react-icons/gi'

import Header from '../Header'
import SimilarJobCard from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsite: data.company_website,
    jobDescription: data.job_description,
    id: data.id,
    skills: data.skills,
    title: data.title,
    rating: data.rating,
    place: data.location,
    jobType: data.employment_type,
    salary: data.package_per_annum,
    lifeAtCompany: data.life_at_company,
    description: data.description,
    imgUrl: data.image_url,
  })

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => this.getFormattedData(eachSimilarJob),
      )
      this.setState({
        jobData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Job Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Job Search
        </button>
      </Link>
    </div>
  )

  renderJobDetailsView = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsite,
      jobDescription,
      id,
      skills,
      title,
      rating,
      salary,
      jobType,
      place,
      description,
      imgUrl,
    } = jobData

    return (
      <>
        <div className="col-1">
          <div className="row-1">
            <img src={companyLogoUrl} alt={companyWebsite} />
            <div className="col-2">
              <h1 className="job-details-head">{title}</h1>
              <p className="rating">{rating}</p>
            </div>
          </div>
          <div className="row-3">
            <div className="small-row">
              <p className="suit-and-location">
                <MdLocationOn /> {place}
              </p>
              <p className="suit-and-location">
                <GiSuitcase /> {jobType}
              </p>
            </div>
            <p className="sal">{salary}</p>
          </div>
          <hr className="hr-line" />
          <h1 className="desc-head">Description</h1>
          <p className="desc5">{jobDescription}</p>
          <h1 className="skills">Skills</h1>
          <ul className="flex-wrap">
            {skills.map(eachSkill => (
              <img src={eachSkill.imageUrl} alt={eachSkill.name} />
            ))}
          </ul>
          <h1 className="life">Life At Company</h1>
          <p className="com-desc">{description}</p>
          <img src={imgUrl} alt={id} />
        </div>
        <h1 className="similar-products-heading">Similar Jobs</h1>
        <ul className="similar-products-list">
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobCard
              similarJobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
