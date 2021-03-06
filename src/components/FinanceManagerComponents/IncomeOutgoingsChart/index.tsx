import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import { withTranslation } from 'react-i18next'
import _ from 'lodash'
import './styles.scss'
import { amountToFloat, formatAmount } from '../../../services/Util'

interface IIncomeOutgoingsChartProps {
  t: any
  chartData: {
    symbol: string
    isEmpty: boolean
    dataList: number[][]
    xTitles: string[]
  }
}

interface IIncomeOutgoingsChartState {
  series: {
    name: string
    data: number[]
  }[]
  options: any
}

export class IncomeOutgoingsChart extends Component<
  IIncomeOutgoingsChartProps,
  IIncomeOutgoingsChartState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      series: [
        {
          name: '',
          data: [],
        },
      ],
      options: {},
    }
  }

  componentDidMount() {
    this.drawChart(this.props.chartData)
  }

  componentDidUpdate(prevProps: any) {
    if (this.difference(this.props.chartData, prevProps.chartData).dataList !== undefined) {
      if (this.props.chartData) {
        this.drawChart(this.props.chartData)
      }
    }
  }

  difference(object: any, base: any) {
    function changes(_objectChanges: any, baseChanges: any) {
      return _.transform(object, (result: any, value: any, key: any) => {
        if (!_.isEqual(value, baseChanges[key])) {
          result[key] =
            _.isObject(value) && _.isObject(baseChanges[key])
              ? changes(value, baseChanges[key])
              : value
        }
      })
    }
    return changes(object, base)
  }

  drawChart(chartData: { isEmpty: boolean; dataList: number[][]; xTitles: string[] }) {
    this.setState({
      series: [
        {
          name: 'Income',
          data: chartData.dataList[0],
        },
        {
          name: 'Outgoings',
          data: chartData.dataList[1],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ['#00d1b6', '#dfdfdf'],
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        stroke: {
          curve: 'straight',
          width: 4,
        },
        markers: {
          size: 6,
          hover: {
            size: 7,
          },
        },
        grid: {
          show: !chartData.isEmpty,
          row: {
            colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        tooltip: {
          enabled: !chartData.isEmpty,
          shared: false,
          custom: ({ series, seriesIndex, dataPointIndex }: any) => {
            return (
              '<div class="tooltip_arrow_box">' +
              '<span class="span-txt">' +
              this.toThousands(series[seriesIndex][dataPointIndex].toString()) +
              '</span>' +
              '</div>'
            )
          },
        },
        yaxis: {
          labels: {
            formatter: (value: number) => {
              return this.toThousands(value.toString())
            },
            style: {
              colors: '#979797',
              fontSize: '12px',
              fontFamily: 'Open Sans',
              fontWeight: 400,
            },
          },
        },
        xaxis: {
          categories: chartData.xTitles,
          labels: {
            style: {
              colors: '#979797',
              fontSize: '12px',
              fontFamily: 'Open Sans',
              fontWeight: 400,
            },
          },
        },
      },
    })
  }

  toThousands(num: string) {
    return `${this.props.chartData.symbol} ${formatAmount(amountToFloat(num))}`
  }

  // is Mobile view
  isMobileView() {
    return window.innerWidth <= 768
  }

  render() {
    const { t } = this.props
    const { chartData } = { ...this.props }

    return (
      <div className="white-panel">
        <Chart
          options={this.state.options}
          series={this.state.series}
          width="100%"
          height={!this.isMobileView() ? '490px' : '350px'}
        />
        {chartData.isEmpty && (
          <div className="no-transactions-txt">
            {t('financeManager.incomeOutgoingsChart.no_transactions_for')}
          </div>
        )}
      </div>
    )
  }
}

// @ts-ignore
export default withTranslation()(IncomeOutgoingsChart)
