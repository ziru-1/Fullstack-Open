import Part from './Part'
import type { CoursePart } from '../types'

interface CourseProps {
  courseParts: CoursePart[]
}

const Content = (props: CourseProps) => {
  return props.courseParts.map((coursePart) => (
    <div key={coursePart.name}>
      <strong>
        {coursePart.name} {coursePart.exerciseCount}
      </strong>
      <Part part={coursePart} />
    </div>
  ))
}

export default Content
