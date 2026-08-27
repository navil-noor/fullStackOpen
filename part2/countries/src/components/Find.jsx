const Find = ({ findCountry, setFind }) => {

    const handleFind = (event) => {
        setFind(event.target.value)
    }

    return (
        <div>
        filter shown with <input value={findCountry}
        onChange={handleFind}
        />
      </div>
    )
}

export default Find