import React, { Component } from 'react'
import * as d3 from 'd3'
import './styles.scss'
import { Aggregation } from '../../../domain/Aggregation'
import { getAccountColor, PFM_COLORS } from '../PFMConfigProvider'

interface IAccountChartProps {
  index: number
  aggregation: Aggregation
}

class AccountChart extends Component<IAccountChartProps> {
  componentDidMount() {
    this.drawChart(this.props.aggregation)
  }

  componentDidUpdate(prevProps: IAccountChartProps) {
    if (this.props.aggregation !== prevProps.aggregation) {
      if (this.props.aggregation) {
        this.drawChart(this.props.aggregation)
      }
    }
  }

  drawChart(aggregation: Aggregation) {
    // Data
    const data: number[] = []
    const colors: string[] = []
    aggregation.accounts.forEach((item, index) => {
      data.push(item.percentage)
      colors.push(getAccountColor(index))
      if (item.overdraft) {
        data.push(Math.max((item.overdraft * 100) / item.balance, 5))
        colors.push(PFM_COLORS.RoyalRed)
      }
    })

    // Settings
    const width = 225
    const height = 115
    const anglesRange = 0.5 * Math.PI
    const radius = Math.min(width, 2 * height) / 2
    const thickness = 18
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

    d3.select(`#id-double-line-chart-${this.props.index}`).selectAll('*').remove()

    // Feel free to change or delete any of the code you see in this editor!
    const svg = d3
      .select(`#id-double-line-chart-${this.props.index}`)
      .attr('width', width)
      .attr('height', height + 10)
      .attr('class', 'half-donut')
      .append('g')
      .attr('transform', translation(width / 2, height))

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
    // Add extra arc to the other side of the first bar
    svg
      .select('path')
      .attr('style', 'transform:rotateZ(-4deg)')
      .attr('fill', (d, i) => colors[i])
      .attr('d', arcCurve as any)
  }

  render() {
    const { index } = { ...this.props }

    return (
      <div className="white-panel">
        <svg width="1200" height="230" id={`id-double-line-chart-${index}`} />
      </div>
    )
  }
}

export default AccountChart
