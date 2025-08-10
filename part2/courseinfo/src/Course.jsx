import React from "react";

const Header = ({ name }) => <h2>{name}</h2>;

const Content = ({ parts }) => {
  return parts.map((part) => <Part key={part.id} part={part} />);
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);

  return <h4>Number of exercises {totalExercises}</h4>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
