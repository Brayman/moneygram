import React, { useEffect, useState } from "react";
import './Charts.css';
import Chart from "react-apexcharts";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { Navigation } from "../common/Navigation/Navigation";
import { Button, GroupedButton } from "../common/Button/Buttons";
import { orderBy } from "lodash";
import Main from "../Main/Main";
import { BarChart } from "./BarChart";
import { Dropdown } from "../common/Dropdown/Dropdown";
import { FilterPanel } from "../FilterPanel/FilterPanel";
import classNames from "classnames";

export const LineChart = ({ transactions, balance, className }) => {
    const [data, setData] = useState([]);


    useEffect(() => {
        setData(agregateData(transactions, balance))
    }, [transactions, balance])
    const agregateData = (transactions, balance) => {

        let currentBalance = balance
        const balanceLine = orderBy(transactions, 'date', 'desc')
            .map(({ cost, type, date }) => {
                if (type === 'expense') {
                    currentBalance = Math.trunc(currentBalance + cost)
                    return { date: new Date(date).toDateString(), amount: currentBalance }
                }
                if (type === 'income') {
                    currentBalance = Math.trunc(currentBalance - cost)
                    return { date: new Date(date).toDateString(), amount: currentBalance }
                }
                return undefined;
            })

        return balanceLine.reverse()
    }
    
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
                            categories: data.map(({ date }) => date)
                        }
                    }
                }
                series={[{
                    name: 'balance',
                    data: data.map(({ amount }) => amount)
                }]}
                type="line"
                width='100%'

            />
        </div>
    )
}


export const PieChart = ({ categories }) => {
    return (
        <div className="chart__pie">
            <Chart
                options={{
                    type: "pie",
                    labels: categories.map(({ name }) => name)
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




