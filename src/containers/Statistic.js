import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BarChart } from '../components/Charts/BarChart'
import { GroupedButton, IconButton } from '../components/common/Button/Buttons'
import { Dropdown } from '../components/common/Dropdown/Dropdown'
import { Navigation } from '../components/common/Navigation/Navigation'
import { FilterPanel } from '../components/FilterPanel/FilterPanel'
import * as selectors from '../redux/selectors'
import {API} from '../api/api'
import { transactionsThunk } from '../redux/transactions-reducer'
import {
    BiBarChartAlt,
    BiPieChartAlt2,
    BiSortDown,
    BiSortUp
} from "react-icons/bi";
import { LineChart, PieChart } from '../components/Charts/Chart'
import { actions } from '../redux/filter'
import { List } from '../components/List/List'
import { compose } from 'redux'
import { WithAuthRedirect } from '../hoc/withAuthRedirect'
const getCatigoriesState = (transactions) => {
    let catigoriesState = []
    transactions.forEach(({ tag, cost }, i) => {
        const hasItem = catigoriesState.find(({ name }) => name === tag)
        if (hasItem) {
            catigoriesState = catigoriesState.map((category) => {
                if (category.name === tag) {
                    return { name: tag, amount: category.amount + cost }
                }
                return category
            })
        } else {
            catigoriesState = [...catigoriesState, { name: tag, amount: cost }]
        }


    })
    return catigoriesState
}

const Statistic = () => {
    const [diraction, setDirection] = useState('month')
    const [type, setType] = useState('transactions')
    const [chart, setChart] = useState('line')
    const [catigories, setCatigories] = useState([])
    const [statistic, setStatistic] = useState(undefined)

    const dispatch = useDispatch()

    const transactions = useSelector(selectors.transactions)
    const filter = useSelector(selectors.filter)
    const sort = useSelector(selectors.sort)
    const account = useSelector(selectors.account)
    const isLoading = useSelector(selectors.isLoading)
    
    

    useEffect(() => {
        dispatch(transactionsThunk.getTransactions({login: account.login, sort}))
    },[account.login, sort, dispatch])
    useEffect(() => {
        const getStats = async (type, login) => {
            if (type === 'line') {
                const stat = await API.getBalanceStatistic(login)
                setStatistic(stat)
            }
            if (type === 'pie' || 'categories') {
                const stat = await API.getCategoryStatistic(login, filter)
                setCatigories(stat)
            }
        }
        getStats(chart, account.login, filter)
    }, [account, chart, filter])
    useEffect(() => {
        setCatigories(getCatigoriesState(transactions))
    }, [transactions])
    const filtredTransactions = (filter) => {
        dispatch(actions.setFilter(filter))
    }
    const setSort = () => {
        const order = sort.order === 'asc' ? 'desc' : 'asc'
        dispatch(actions.setSort({ order, field: 'date' }))
    }
    return (
        <div className='page__statistic'>
            <Navigation title='Financial Report' className='chart__nav' />
            <FilterPanel>
                <Dropdown items={['month', 'year']} onClick={(direction) => setDirection(direction)}>
                    {diraction}
                </Dropdown>
                <div>
                    <IconButton icon={BiBarChartAlt} onClick={() => setChart('line')} />
                    <IconButton icon={BiPieChartAlt2} onClick={() => setChart('pie')} />
                </div>

            </FilterPanel>
            {chart === 'pie' ?
                <PieChart categories={catigories} /> :
                <LineChart lines={statistic} balance={account.balance} currency={account.currency} />
            }

            <GroupedButton
                value={filter}
                buttons={['expense', 'income']}
                onClick={filtredTransactions}
            />
            <FilterPanel>
                <Dropdown items={['transactions', 'categories']} onClick={(type) => setType(type)}>
                    {type}
                </Dropdown>
                <IconButton
                    icon={sort.order === 'asc' ? BiSortUp : BiSortDown}
                    className="icon-btn"
                    onClick={setSort}
                />
            </FilterPanel>
            {type === 'categories' ?
                <BarChart
                    catigories={catigories}
                    className='statistic__bottom-element'
                /> :
                <List
                    transactions={transactions}
                    isLoading={isLoading}
                    className='statistic__bottom-element'
                />
            }
        </div>
    )
}
export default compose(WithAuthRedirect)(Statistic)