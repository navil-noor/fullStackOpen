import { useState } from "react";

const Button = (props) => {
  return <button onClick={() => props.setValue(props.value+1)}>{props.text}</button>
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td> {props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const total = props.good+props.neutral+props.bad

  if (total==0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={((good*1)+(bad*(-1)))/total} />
          <StatisticLine text="positive" value={good*100/total + "%"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good+neutral+bad

  return (
    <div>
      <h1>give feedback</h1>
      <p>
        <Button value={good} setValue={setGood} text={"good"} />
        <Button value={neutral} setValue={setNeutral} text={"neutral"} />
        <Button value={bad} setValue={setBad} text={"bad"} />
      </p>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App