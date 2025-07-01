const Header = ({ name }) => {
  return(
  <>
    <h1>
      {name}
    </h1>
  </>
  )
}

const Content = ({ parts }) => {
  return(
    <div>
      {parts.map(part => 
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      )}
    </div>
  );
};

const Total = ({ parts }) => {

  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)

  return(
      <p><b>total of {totalExercises} exercises</b></p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App