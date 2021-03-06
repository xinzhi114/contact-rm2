import React, { Component } from 'react'
import * as d3 from 'd3'
import { withTranslation } from 'react-i18next'
import './styles.scss'

interface ILoanChartProps {
  t: any
  dataList: {
    title: string
    loanRepaidPercentage: string
    originalLoanAmount: string
    repaidAmount: string
  }
}

export class LoanChart extends Component<ILoanChartProps> {
  componentDidMount() {
    this.drawChart(this.props.dataList.loanRepaidPercentage)
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.dataList !== prevProps.dataList) {
      if (this.props.dataList) {
        this.drawChart(this.props.dataList.loanRepaidPercentage)
      }
    }
  }

  drawChart(inputValue: string) {
    // Data
    const value = (100 - parseInt(inputValue.replace('%', ''), 10)) / 100

    const data = [value, 1 - value]

    // Settings
    const width = 225
    const height = 105
    const anglesRange = 0.5 * Math.PI
    const radius = Math.min(width, 2 * height) / 2
    const thickness = 11
    // Utility
    const colors = ['#006b92', '#00d1b6']

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

    const translation = (x: number, y: number) => `translate(${x}, ${y})`

    d3.select('#id-double-line-chart').selectAll('*').remove()

    // Feel free to change or delete any of the code you see in this editor!
    const svg = d3
      .select('#id-double-line-chart')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'half-donut')
      .append('g')
      .attr('transform', translation(width / 2, height))

    svg
      .selectAll('path')
      .data(pies(data))
      .enter()
      .append('path')
      .attr('fill', (d, i) => colors[i])
      .attr('d', arc as any)
  }

  render() {
    const { t } = this.props
    const { dataList } = { ...this.props }

    return (
      <div className="white-panel">
        <div className="title-bar flex-grid">
          <div className="blue-title">{dataList.title}</div>
        </div>
        <div className="chat-img">
          <svg width="1200" height="230" id="id-double-line-chart" />
          <div className="center-txt">
            <div className="parents">
              <i className="icons icon-up" />
              {dataList.loanRepaidPercentage}
            </div>
            <div className="little-txt">{t('accountsDashboard.loanChart.loan_repaid')}</div>
          </div>
        </div>
        <div className="two-lines">
          <div className="row-line flex-grid">
            <div className="lefts">
              <span className="point blue" />
              <span className="txt">{t('accountsDashboard.loanChart.original_loan_amount')}</span>
            </div>
            <div className="rights">
              <div
                className="values"
                dangerouslySetInnerHTML={{ __html: dataList.originalLoanAmount }}
              />
            </div>
          </div>
          <div className="row-line flex-grid">
            <div className="lefts">
              <span className="point green" />
              <span className="txt">{t('accountsDashboard.loanChart.repaid_amount')}</span>
            </div>
            <div className="rights">
              <div className="values" dangerouslySetInnerHTML={{ __html: dataList.repaidAmount }} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(LoanChart)
