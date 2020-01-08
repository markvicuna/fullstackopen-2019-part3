import React from 'react'

const Notification = ({ error }) => {
    if (error === null) {
        return null
    }

    const errorStyle = {
        color: error.success ? 'green' : 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return (
        <div style={errorStyle}>
            {error.message}
        </div>
    )
}

export default Notification