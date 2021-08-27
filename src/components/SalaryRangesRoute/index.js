import './index.css'

const SalaryRangesRoute = props => {
  const renderSalaryRangesList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(range => {
      const {changeSalaryRange, activeSalaryRange} = props
      const onClickSalaryRangeItem = () =>
        changeSalaryRange(range.salaryRangeId)

      const rangeClassName =
        activeSalaryRange === range.salaryRangeId
          ? `and-up active-rating`
          : `and-up`

      return (
        <li
          className="rating-item2"
          key={range.salaryRangeId}
          onClick={onClickSalaryRangeItem}
        >
          <input type="checkbox" value={range.salaryRangeId} />
          <p className={rangeClassName}>{range.label}</p>
        </li>
      )
    })
  }

  return (
    <div className="salary-range-container">{renderSalaryRangesList()}</div>
  )
}

export default SalaryRangesRoute
