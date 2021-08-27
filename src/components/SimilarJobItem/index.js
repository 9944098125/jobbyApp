import './index.css'

const SimilarJobCard = props => {
  const {similarJobDetails} = props
  const {title, imageUrl, rating, description} = similarJobDetails

  return (
    <li className="similar-product-item">
      <div className="first-row">
        <img src={imageUrl} alt={title} />
        <div className="first-col">
          <h1 className="title-head">{title}</h1>
          <p className="rating-para">{rating}</p>
        </div>
      </div>
      <div className="sec-col">
        <h1 className="desc-head">Description</h1>
        <p className="description">{description}</p>
      </div>
    </li>
  )
}

export default SimilarJobCard
