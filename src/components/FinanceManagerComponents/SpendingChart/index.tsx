import React, { Component } from 'react'
import * as d3 from 'd3'
import './styles.scss'
import { SpendingRow } from '../../../domain/Spending'
import { getSpendCategory } from '../PFMConfigProvider'

interface ISpendingChartProps {
  expandedIndex?: number
  rows: SpendingRow[]
}

export class SpendingChart extends Component<ISpendingChartProps> {
  componentDidMount() {
    this.drawChart(this.props.expandedIndex, this.props.rows)
  }

  componentDidUpdate() {
    if (this.props.rows) {
      this.drawChart(this.props.expandedIndex, this.props.rows)
    }
  }

  drawChart(expandedIndex: number | undefined, rows: SpendingRow[]) {
    // Data
    const data: number[] = []
    const colors: string[] = []

    rows.forEach((item: SpendingRow, index: number) => {
      const sp = getSpendCategory(item.category)
      data.push(item.percentage)

      if (expandedIndex !== undefined && expandedIndex !== -1) {
        if (expandedIndex === index) {
          colors.push(sp.tintColor)
        } else {
          colors.push('#dfdfdf')
        }
      } else {
        colors.push(sp.tintColor)
      }
    })

    // Settings
    const width = 288
    const height = 288
    const anglesRange = Math.PI
    const radius = Math.min(width, 2 * height) / 2
    const thickness = 33
    // Utility

    const pies = d3.layout
      .pie()
      .value((d) => d)
      .sort(null as any)
      .startAngle(anglesRange * -1)
      .endAngle(anglesRange)

    const arc = d3.svg
      .arc()
      .outerRadius(radius)
      .innerRadius(radius - thickness)

    const arcCurve = d3.svg
      .arc()
      .outerRadius(radius)
      .innerRadius(radius - thickness)
      .cornerRadius(radius - thickness)

    const translation = (x: number, y: number) => `translate(${x}, ${y})`

    d3.select('#id-spending-chart').selectAll('*').remove()

    // Feel free to change or delete any of the code you see in this editor!
    const svg = d3
      .select('#id-spending-chart')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'half-donut')
      .append('g')
      .attr('transform', translation(width / 2, height / 2))

    const placeholders = svg.selectAll('path').data(pies(data)).enter()
    // Add main arcs
    placeholders
      .append('path')
      .attr('fill', (d, i) => colors[i])
      .attr('d', arc as any)
    // Add arcs with curved borders and slight rotation
    placeholders
      .append('path')
      .attr('style', 'transform:rotateZ(4deg)')
      .attr('fill', (d, i) => colors[i])
      .attr('d', arcCurve as any)
  }

  render() {
    const { expandedIndex, rows } = { ...this.props }

    return (
      <div className="white-panel ">
        {!!rows && (
          <div className="income-chat-wrap">
            <svg width="1200" height="230" id="id-spending-chart" />

            {expandedIndex !== undefined && expandedIndex > -1 && (
              <div className="black-tips">
                <img
                  className="icons"
                  src={`/assets/white-${getSpendCategory(rows[expandedIndex].category).icon.replace(
                    '/assets/',
                    ''
                  )}`}
                  alt="img"
                />
                <div className="txt">{getSpendCategory(rows[expandedIndex].category).title}</div>
                <div className="txt">{rows[expandedIndex].percentage}%</div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default SpendingChart
