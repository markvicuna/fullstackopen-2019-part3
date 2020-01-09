import React from 'react'

const Filter = ({ onFilterChange, filterValue }) => {
    return (
      <div>
        filter shown with
          <input value={filterValue} onChange={onFilterChange} />
      </div>
    )
  }

  export default Filter