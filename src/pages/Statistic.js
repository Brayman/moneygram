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

export const Statistic = () => {
    const [diraction, setDirection] = useState('month')
    const [type, setType] = useState('categories')
    const [chart, setChart] = useState('line')
    const [catigories, setCatigories] = useState([])
    const [balanceLine, setBalanceLine] = useState(undefined)

    const dispatch = useDispatch()

    const transactions = useSelector(selectors.transactions)
    const filter = useSelector(selectors.filter)
    const sort = useSelector(selectors.sort)
    const account = useSelector(selectors.account)
    const isLoading = useSelector(selectors.isLoading)
    
    const getStats = async (login) => {
        const stat = await API.getStatistic(login)
        setBalanceLine(stat)
    }

    useEffect(() => {
        dispatch(transactionsThunk.getTransactions({login: account.login, sort}))
    },[account.login, sort, dispatch])
    useEffect(() => {
        getStats(account.login)
    }, [account])
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
                <LineChart line={balanceLine} balance={account.balance} />
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
