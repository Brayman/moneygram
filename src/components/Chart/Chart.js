import React, { Component } from "react";
import Chart from "react-apexcharts";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";

class ChartPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                line: {
                    chart: {
                        type: "line",
                        id: "basic-bar",
                        width: "95%"
                    }
                },
                bar: {
                    plotOptions: {
                        bar: {
                            horizontal: true
                        }
                    },
                    chart: {
                        type: "pie",
                        id: "donut",
                        width: "50%"
                    },
                    labels: this.getPieData(this.props.data, 'tag')
                }
            },
            series: {
                line: [{
                    data: this.props.data.map(transaction => {
                        return { x: new Date(transaction.date).getTime(), y: transaction.cost }
                    })
                }],
                bar: this.getPieData(this.props.data, 'amount')

            },
            xaxis: {
                type: 'datetime'
            }
        };
    }
    getPieData(transactions, field) {
        
        let tags = [];
        let amounts = [];
        transactions.forEach(({ tag, cost }) => {
            debugger
            const i = tags.findIndex((item) => item === tag)
            if (i !== -1) {
                amounts[i] = cost + amounts[i]

            } else {
                tags.push(tag)
                amounts.push(cost)
            }
        })
        switch (field) {
            case 'tag':
                return tags
            case 'amount':
                return amounts
            default:
                break;
        }
    }
    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options.line}
                            series={this.state.series.line}
                            type={this.state.options.line.chart.type}
                            width='90%'
                        />
                        <Chart
                            options={this.state.options.bar}
                            series={this.state.series.bar}
                            type={this.state.options.bar.chart.type}
                            width='50%'
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(WithAuthRedirect)(ChartPage);