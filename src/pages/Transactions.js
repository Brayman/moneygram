import React, { useEffect, useState } from 'react'
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
import { Filter } from '../components/Main/Filter/Filter'
import { actions } from '../redux/filter'
import { compose } from 'redux'
import { WithAuthRedirect } from "../hoc/withAuthRedirect";

const Transactions = () => {
    const login = useSelector(selectors.login)
    const transactions = useSelector(selectors.transactions)
    const isLoading = useSelector(selectors.isLoading)
    const sort = useSelector(selectors.sort)
    const filter = useSelector(selectors.filter)
    const dispatch = useDispatch()
    const location = useLocation()
    console.log(location);
    const filterProps = {
        sort,
        filter,
        setFilter: (field) => dispatch(actions.setFilter(field)),
        setSort: (sort) => dispatch(actions.setSort(sort)),
        resetFilter: () => dispatch(actions.resetFilter())
    }

    const changeFilterVisability = () => {
        setShowFilter(!showFilter)
    }

    useEffect(() => {
        console.log('send request')
        dispatch(transactionsThunk.getTransactions({login, sort, filter}))
    },[login, sort, filter, dispatch])
    const [showFilter, setShowFilter] = useState(false)

    return (
        <div>
            <FilterPanel>
                <Dropdown items={['month', 'year', 'all']} />
                <IconButton  
                    icon={MdFilterList}
                    className="icon-btn"
                    onClick={changeFilterVisability}
                />
        </FilterPanel>
            <List transactions={transactions} isLoading={isLoading} />
            <Filter {...filterProps} hide={!showFilter} showFilter={changeFilterVisability} />
        </div>
    )
}

export default compose(WithAuthRedirect)(Transactions);