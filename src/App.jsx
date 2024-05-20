import React from "react";
import * as d3 from "d3";
class Chart extends React.Component {

    render() {
        const { data } = this.props

        const width = 1000
        const height = 300
        const color = d3.scaleOrdinal(d3.schemeCategory10)
        const xmax = d3.max(data["series"].map((_, i) => {
            return d3.max(data["series"][i]["values"])
        }))
        
        const A = Array.from({ length: Math.floor(xmax / 100) + 1 + 1 }).map((_, i) => i * 100)

        const xScale = d3.scaleLinear()
            .domain([0,  (Math.floor(xmax / 100) + 1) * 100])
            .range([0, width-50-25])
            .nice()
        const yw = (height - 50) / data["labels"].length
        const yh = 1 + data["series"].length * 3
        const yhscale = d3.scaleLinear()
            .domain([0, yh])
            .range([0, yw])
            .nice()
        return (<svg width={width} height={height}>
            {A.map((item) => {
                return (
                    <>
                        <line x1={xScale(item)+50} y1="0" x2={xScale(item)+50} y2={height - 40} stroke="black" />
                        <text
                            x={50+xScale(item)}
                            y={height - 20}
                            fontSize="20"
                            textAnchor="middle"
                            fill="black"
                            strokeWidth="3">{item}</text>
                    </>
                )
            })}
            <line x1="50" y1={yhscale(1 + data["series"].length * 3) * data["labels"].length} x2={width-25} y2={yhscale(1 + data["series"].length * 3) * data["labels"].length} stroke="black" />
            {
                data["labels"].map((item, i) => {
                    return (<>
                            <line x1="40" y1={yw * i + yhscale(1 + data["series"].length * 3) / 2} x2="50" y2={yw * i + yhscale(1 + data["series"].length * 3) / 2} stroke="black" />
                            <text
                                x="25"
                                y={yw * i + yhscale(1 + data["series"].length * 3) / 2+10}
                                fontSize="20"
                                textAnchor="middle"
                                fill="black"
                                strokeWidth="3">{item}</text>
                            {data["series"].map((_, j) => {
                                return (
                                    <rect x="50" y={yw * i + yhscale(1 + j * 3)} width={xScale(data["series"][j]["values"][i])} height={yhscale(2)} fill={color(j)} />
                                )
                            })}
                            </>



                    )
                })

            }

        </svg>
        )
    }
}

class App extends React.Component {
    render() {
        const data = {
            labels: ['A', 'B', 'C', 'D'],
            series: [
              {
                name: 'data',
                values: [123, 456, 789, 1111]
              },
              {
                name: 'another data',
                values: [234, 567, 891, 1024]
              },
              {
                name: 'and more',
                values: [567, 678, 789, 890]
              }
            ]
          }

        return <Chart data={data} />
    }
}
export default App;