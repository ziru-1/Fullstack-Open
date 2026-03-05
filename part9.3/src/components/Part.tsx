import type { CoursePart } from '../types'

interface PartProps {
  part: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  )
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case 'basic':
      return (
        <p>
          <em>{part.description}</em>
        </p>
      )

    case 'group':
      return <p>project exercise {part.groupProjectCount}</p>

    case 'background':
      return (
        <div>
          <p>
            <em>{part.description}</em>
          </p>
          <p>submit to {part.backgroundMaterial}</p>
        </div>
      )
    case 'special':
      return (
        <div>
          <p>
            <em>{part.description}</em>
          </p>
          <p>Required skills: {part.requirements.join(', ')}</p>
        </div>
      )

    default:
      return assertNever(part)
  }
}

export default Part
