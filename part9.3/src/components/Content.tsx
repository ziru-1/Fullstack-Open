interface CoursePart {
  name: string
  exerciseCount: number
}

interface CourseProps {
  courseParts: CoursePart[]
}

const Content = (props: CourseProps) => {
  return props.courseParts.map((coursePart) => (
    <p key={coursePart.name}>
      {coursePart.name} {coursePart.exerciseCount}
    </p>
  ))
}

export default Content
