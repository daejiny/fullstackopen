import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartDesc {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDesc {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartDesc {
  name: "Deepest type usage";
}

interface CoursePartDesc extends CoursePartBase {
  description: string;
}


type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {
  switch (coursePart.name) {
    case "Fundamentals":
      return <>{coursePart.name} {coursePart.exerciseCount} {coursePart.description}</>
    case "Using props to pass data":
      return <>{coursePart.name} {coursePart.exerciseCount} {coursePart.groupProjectCount}</>
    case "Deeper type usage":
      return <>{coursePart.name} {coursePart.exerciseCount} {coursePart.description} {coursePart.exerciseSubmissionLink}</>
    case "Deepest type usage":
      return <>{coursePart.name} {coursePart.exerciseCount} {coursePart.description}</>
    default:
      return assertNever(coursePart);
  }
}

const Header: React.FC<{ courseName: string }> = ({ courseName }) => (
  <h1>{courseName}</h1>
)

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((course, i) => <p key={i}><Part coursePart={course} /></p>)}
    </>
  )
}

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Deepest type usage",
      exerciseCount: 69,
      description: "extremely unfunny post"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));