const Parts = ({ parts }) => {
    return (
        <div>
            {parts.map(part => 
            <p key={part.id}>{part.name} {part.exercises}</p>  
        )}
        </div>
    )
}

const Total = ({ parts }) => {
    return <p><b>Total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises</b></p>
}

const Course = ({ course }) => {
    return (
        <div>
            <h2>{course.name}</h2>
            <Parts parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course