import React, { useEffect } from 'react'
import { Dropdown } from '../components/common/Dropdown/Dropdown'
import { FilterPanel } from '../components/FilterPanel/FilterPanel'
import { List } from '../components/List/List'
import { IconButton } from '../components/common/Button/Buttons'
import {
    MdFilterList
} from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import * as selectors from '../redux/selectors'
import { transactionsThunk } from '../redux/transactions-reducer'
import { useLocation } from 'react-router-dom'
const Transactions = ({props}) => {
    const login = useSelector(selectors.login)
    const transactions = useSelector(selectors.transactions)
    const isLoading = useSelector(selectors.isLoading)
    const sort = useSelector(selectors.sort)
    const dispatch = useDispatch()
    const location = useLocation()
    console.log(location);
useEffect(() => {
   
    dispatch(transactionsThunk.getTransactions({login, sort}))
},[login, sort, dispatch])

    return (
        <div>
            <FilterPanel>
                <Dropdown items={['month', 'year', 'all']} />
                <IconButton  icon={MdFilterList}
                    className="icon-btn"/>
        </FilterPanel>
            <List transactions={transactions} isLoading={isLoading} />
        </div>
    )
}

export default Transactions;