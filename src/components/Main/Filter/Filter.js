import React, { useEffect, useState } from 'react';
import { withNaming } from '@bem-react/classname';
import "./Filter.css";
import { Button } from '../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/filter';
import { useSearchParams } from 'react-router-dom';
import * as selectors from "../../../redux/selectors";

const cn = withNaming({ n: 'fltr-', e: '__', m: '_', v: '_' })
const fcn = (b, e, m) => cn(b, e)(m);

const FilterOption = ({ title, options, option, action }) => {

    const isActive = (name) => {
        if (typeof name === 'string') {
            return { active: option === name }
        }
        const [setField, setOrder] = name;
        const [field, order] = option;
        return { active: order === setOrder && field === setField }
    }
    return (
        <article className={fcn('filter', 'section')}>
            <header className={`${fcn('filter', 'header')} ${fcn('header')}`}>
                {title}
            </header>
            <div className={fcn('section', 'options')}>
                {options.map(({ name, option }) => {
                    return (<Button key={name} className={fcn('option', 'button', isActive(option))} onClick={() => action(option)}>
                        {name}
                    </Button>)
                }
                )}
            </div>
        </article>
    )
}

export const Filter = ({ hide = false, showFilter }) => {
    const sort = useSelector(selectors.sort)
    const filter = useSelector(selectors.filter)
    const [sortOption, setSortOption] = useState([sort.field, sort.order])
    const [filterOption, setFilterOption] = useState(filter)
    useEffect(() => {
        setFilterOption(filter)
    },[filter])
    const dispatch = useDispatch();
    

    const setFilters = ({ filter, sort }) => {
        const [field, order] = sort;
        dispatch(actions.setFilter(filter))
        dispatch(actions.setSort({ order, field }))
        showFilter()
    }

    const resetFilters = () => {
        dispatch(actions.resetFilter())
        showFilter()
    }
    return (
        <div className={fcn('shadow', '', { hide })} >
            <div className={fcn('filter')}>
                <header className={`${fcn('filter', 'header')} ${fcn('header')}`}>
                    <span className={fcn('header', 'title')}>
                        Filter transaction
                    </span>
                    <Button
                        secondary
                        className={fcn('header', 'button')}
                        onClick={() => {
                            resetFilters()
                            }}>
                        Reset
                    </Button>
                </header>
                <FilterOption
                    title='Filter by'
                    options={[
                        { name: 'income', option: 'income' },
                        { name: 'Expense', option: 'expense' },
                        { name: 'Transfer', option: 'transfer' }
                    ]}
                    option={filterOption}
                    action={item => setFilterOption(item)}
                />
                <FilterOption
                    title='Sort by'
                    options={[
                        { name: 'Highest', option: ['cost', 'desc'] },
                        { name: 'Lowest', option: ['cost', 'asc'] },
                        { name: 'Newest', option: ['date', 'desc'] },
                        { name: 'Oldest', option: ['date', 'asc'] }
                    ]}
                    option={sortOption}
                    action={item => setSortOption(item)}
                />

                <Button primary onClick={() => setFilters({ filter: filterOption, sort: sortOption })}>
                    Apply
                </Button>
            </div>
        </div>


    )
}
