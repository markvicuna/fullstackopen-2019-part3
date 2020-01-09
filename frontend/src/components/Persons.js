import React from 'react'

const Persons = ({ persons, filter, onRemovePerson }) => {
    const personsToShow = (filter === '')
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    const rows = () => personsToShow.map(person =>
        <div key={person.name}>
            <span>{person.name} {person.number} </span> 
            <button onClick={() => onRemovePerson(person.id)}>delete</button>
        </div>
    )

    return (
        <div>
            {rows()}
        </div>
    )
}

export default Persons