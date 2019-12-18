import React, { Component } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMap from 'highcharts/modules/map'
import proj4 from 'proj4'
import mapCnData from '@highcharts/map-collection/countries/cn/cn-all.geo.json'
import Papa from 'papaparse'
import './App.css'
highchartsMap(Highcharts)

if (typeof window !== 'undefined') {
  window.proj4 = window.proj4 || proj4
}

class App extends Component {
  constructor (props) {
    super(props)
    this.getCsvData = this.getCsvData.bind(this)

    this.mapOptions = {
      chart: {
        map: 'countries/cn/cn-all',
        height: 800
      },
      title: {
        text: '金庸武侠门派分布图'
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
          return this.point.name
        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true
          },
          marker: {
            radius: 3
          }
        }
      },
      series: [
        {
          name: 'menpaiMap',
          mapData: mapCnData,
          borderColor: '#cccccc',
          nullColor: 'rgba(200, 200, 200, 0.3)',
          showInLegend: false
        },
        {
          type: 'mappoint',
          name: '如果您对位置精确度有疑欢迎提交issue，欢迎提PR创建新门派 https://github.com/menpai/ditu',
          data: [],
          marker: {
            enabled: true,
            enabledThreshold: 2,
            fillColor: '#009933',
            height: 18,
            lineColor: '#ffffff',
            lineWidth: 1,
            radius: 4,
            symbol: 'url(https://image.flaticon.com/icons/svg/1553/1553150.svg)',
            width: 18
          }
        }
      ]
    }
  }

  componentDidMount () {
    const file = require('./map.csv')

    Papa.parse(file, {
      // header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.getCsvData
    })
  }

  getCsvData (result) {
    const mapItems = []
    /*
    const mapItems = [{
      lat: 44.880296,
      lon: 84.810185,
      color: 'green',
      name: '红花会'
    }];
    */

    result.data.forEach(function (item) {
      const oneItem = {
        lat: parseFloat(item[0]),
        lon: parseFloat(item[1]),
        color: item[2],
        name: item[3]
      }
      mapItems.push(oneItem)
    })

    Highcharts.charts[0].series[1].update({
      data: mapItems
    }, true)
  }

  render () {
    return (
      <HighchartsReact
        constructorType={'mapChart'}
        highcharts={Highcharts}
        options={this.mapOptions}
      />
    )
  }
}

export default App
