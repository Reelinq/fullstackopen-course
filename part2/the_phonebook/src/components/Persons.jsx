const Persons = ({ persons, newSearch, removePerson }) => {
  console.log(persons)
  return (
    <>
      {persons
        .filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
        .map(person => (
          <div key={person.id}>
            {person.name} {person.number} 
            <button onClick={() => removePerson(person.id)}>delete</button>
          </div>
        ))}
    </>
  )
}

export default Persons