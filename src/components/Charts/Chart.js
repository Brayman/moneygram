import React from "react";
import './Charts.css';
import Chart from "react-apexcharts";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { Navigation } from "../common/Navigation/Navigation";
import { Button, GroupedButton } from "../common/Button/Buttons";
import Main from "../Main/Main";
import { BarChart } from "./BarChart";
import { Dropdown } from "../common/Dropdown/Dropdown";
import { FilterPanel } from "../FilterPanel/FilterPanel";
import classNames from "classnames";
import Loader from "../common/Loader/Loader";

export const LineChart = ({ transactions, lines, balance, className }) => {


    if (lines === undefined) {
        return <Loader />
    }
    const [line, prevLine] = lines
    return (
        <div className={classNames("chart__line", className)}>
            <div className="chart__balance">
                {balance} USD
            </div>
            <Chart
                options={
                    {
                        type: "line",
                        stroke: {
                            curve: "smooth"
                        },
                        xaxis: {
                            categories: line.map(({ date }) => date)
                        }
                    }
                }
                series={[{
                    name: 'previous month',
                    data: prevLine.map(({ amount }) => amount)
                },
                {
                    name: 'this month',
                    data: line.map(({ amount }) => amount)
                }]}
                type="line"
                width='100%'

            />
        </div>
    )
}


export const PieChart = ({ categories }) => {
    if (categories === undefined) {
        return <Loader />
    }
    return (
        <div className="chart__pie">
            <Chart
                options={{
                    type: "pie",
                    labels: categories.map(({ category }) => category)
                }}
                series={categories.map(({ amount }) => amount)}

                type="pie"
                width='100%'
            />
        </div>
    )
}


export const Page = ({ transactions }) => {
    return (
        <div className="chart">
            <Navigation title='Financial Report' className='chart__nav' />
            <FilterPanel>
                <Dropdown items={['month', 'year']}>
                    month
                </Dropdown>
                <Button>
                    filer
                </Button>
            </FilterPanel>
            <GroupedButton value='expense' buttons={['expense', 'income']} />
            <BarChart transactions={transactions} />


            <Main props={{ transactions }} />
        </div>
    )
}


export default compose(WithAuthRedirect)(Page);




