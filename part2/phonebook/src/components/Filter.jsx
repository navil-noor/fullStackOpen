const Filter = ({ searchName, setSearch }) => {

    const handleSearchChange = (event) => {
    setSearch(event.target.value)
    }

    return (
        <div>
        filter shown with <input value={searchName}
        onChange={handleSearchChange}
        />
      </div>
    )
}

export default Filter