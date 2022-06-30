import React, { Component } from "react";
import Chart from "react-apexcharts";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";

class ChartPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "basic-bar"
                }
            },
            series: [{
                data: this.props.data.map(transaction => {
                    return {x: new Date(transaction.date).getTime(), y: transaction.cost}
                })
            }],
            xaxis: {
                type: 'datetime'
            }
        };
    }

    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            width="95%"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(WithAuthRedirect)(ChartPage);