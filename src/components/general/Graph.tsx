import "./styles/Graph.css"

import { observer } from "mobx-react-lite"
import { FunctionComponent } from "react"
import { IGameStats } from "../../shared"

interface IGraphProps {
  stats: IGameStats;
  selected?: number;
}

// const dummyStats: IGameStats = {
//   date: "2022-05-18",
//   results: [[10, 1], [15, 3], [16, 4], [18, 2], [19, 5], [20, 7], [21, 11], [22, 5], [24, 16], [25, 21], [26, 28], [27, 10], [28, 21], [29, 60], [30, 72], [31, 130]]
// }

export const Graph: FunctionComponent<IGraphProps> = observer(props => {
  const { results } = props.stats

  const xMin: number = results.reduce((min: number | undefined, result) => {
    return (!min || result[0] < min) ? result[0] : min
  }, undefined) || 0
  const xMax: number = results.reduce((max: number, result) => {
    return result[0] > max ? result[0] : max
  }, 0)
  const yMin: number = 0
  const yMax: number = results.reduce((max: number, result) => {
    return result[1] > max ? result[1] : max
  }, 0)
  const yRange = yMax - yMin

  const xAxis: number[] = [...new Array(xMax - xMin + 1)].map((_, index) => index + xMin)

  return (
    <div className="graph">
      <div className="graph-inner">
        { xAxis.map(xAxe => {
          const result = results.find(result => result[0] === xAxe)
          const value = result ? result[1] : 0

          const barHeight = (value - yMin)  / yRange

          return (
            <div key={xAxe} className="x-column">
              <div className="x-column-inner">
                { value > 0 && (
                  <div className="graph-bar" style={{ height: (barHeight * 100).toFixed(0) + "%" }}/>
                )}
                { xAxe === props.selected && (
                  <div className="selected-bar"/>
                ) }
              </div>
              <div className="x-column-axe">
                <span>
                  { xAxe }
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})