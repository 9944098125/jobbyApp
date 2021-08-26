import {BsSearch} from 'react-icons/bs'

import './index.css'

const SalaryRangeAndEmploymentType = props => {
  const renderSalaryRangesList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(range => {
      const {changeRange, activeSalaryRange} = props
      const onClickSalaryRangeItem = () => changeRange(range.salaryRangeId)

      const rangeClassName =
        activeSalaryRange === range.salaryRangeId
          ? `and-up active-rating`
          : `and-up`

      return (
        <li
          className="rating-item"
          key={range.salaryRangeId}
          onClick={onClickSalaryRangeItem}
        >
          <input type="checkbox" value={range.salaryRangeId} />
          <p className={rangeClassName}>{range.label}</p>
        </li>
      )
    })
  }

  const renderEmploymentTypesList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(employment => {
      const {changeEmploymentType, activeEmploymentType} = props
      const onClickEmploymentTypeItem = () =>
        changeEmploymentType(employment.employmentTypeId)

      const employmentClassName =
        activeEmploymentType === employment.employmentTypeId
          ? `and-up active-rating`
          : `and-up`

      return (
        <li
          className="rating-item"
          key={employment.employmentTypeId}
          onClick={onClickEmploymentTypeItem}
        >
          <input type="checkbox" value={employment.employmentTypeId} />
          <p className={employmentClassName}>{employment.label}</p>
        </li>
      )
    })
  }

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>
    )
  }
  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      {renderSalaryRangesList()}
      {renderEmploymentTypesList()}
    </div>
  )
}

export default SalaryRangeAndEmploymentType
