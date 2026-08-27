const Notification = ({ message }) => {

    const successMsg = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (message == null) {
        return null
    }

    return (
        <div style={successMsg}>
            {message}
        </div>
    )
}

export default Notification