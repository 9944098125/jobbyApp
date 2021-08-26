import './index.css'

const SimilarJobs = props => {
  const {jobDetails} = props
  const {title, imageUrl, rating, description} = jobDetails

  return (
    <li className="similar-product-item">
      <div className="row">
        <img
          src={imageUrl}
          className="similar-product-image"
          alt={`similar product ${title}`}
        />
        <h1 className="similar-product-title">{title}</h1>
        <p className="similar-products-brand">{rating}</p>
      </div>
      <p className="desc">{description}</p>
    </li>
  )
}

export default SimilarJobs
