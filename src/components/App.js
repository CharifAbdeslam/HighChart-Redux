import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getData} from '../actions/index';
import {Container} from 'reactstrap';
import Highcharts from 'highcharts/highstock';
import StockChart from './Stock.jsx';
require('highcharts/indicators/indicators')(Highcharts);
require('highcharts/indicators/ema')(Highcharts);

class App extends Component {


  componentWillMount() {
    this.props.getData();
  }

  render() {
    const {data} = this.props
    var stockOptions = {
      chart: {
        height: 600
      },
      xAxis: {
        gridLineWidth: 1,
        lineWidth: 2
      },
      yAxis: [
        {
          height: '80%',
          labels: {
            align: 'left',
            x: -3
          }
        }, {
          top: '37%',
          height: '45%',
          labels: {
            align: 'left',
            x: -3
          },
          offset: 0
        }, {
          top: '75%',
          height: '25%',
          labels: {
            align: 'left',
            x: -3
          },
          offset: 0
        }
      ],
      series: [

        {
          type: 'candlestick',
          data:data,
          name: 'ETH/BTC',
          id: 'aapl'
        }, {
          type: 'ema',
          marker: {
            enabled: false
          },
          linkedTo: 'aapl',
          params: {
            period: 50
          }
        }, {
          type: 'ema',
          linkedTo: 'aapl',
          marker: {
            enabled: false
          }
        }, {
          type: 'column',
          name: 'Volume',
          yAxis: 1
        }, {
          type: 'area',
          name: 'Line',
          data: data,
          yAxis: 2,
          threshold: null,
          tooltip: {
            valueDecimals: 2
          }
        }
      ]
    }

    return (<Container fluid={true}>
      <StockChart options={stockOptions} highcharts={Highcharts}/>
      <button>Click</button>
    </Container>);
  }
}

const mapStateToProps = state => ({
  data: state.candle.all
})
export default connect(mapStateToProps, {getData})(App);
