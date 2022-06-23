import React, { useEffect, useState } from 'react';
import { withNaming } from '@bem-react/classname';
import "./Filter.css";
import { Button } from '../../common/Button/Button';


const cn = withNaming({ n: 'fltr-', e: '__', m: '_', v: '_' })
const fcn = (b, e, m) => cn(b, e)(m);

const FilterOption = ({ title, options, selectFilter, action }) => {

    const isActiveSortButton = sortOptions => {
        const [field, order] = sortOptions;
        const [selectField, selectOrder] = selectFilter;
        return order === selectOrder && field === selectField
    }
    const isActiveFilterButton = filterOption => {
        return filterOption === selectFilter
    }
    return (
        <article className={fcn('filter', 'section')}>
            <header className={`${fcn('filter', 'header')} ${fcn('header')}`}>
                {title}
            </header>
            <div className={fcn('section', 'options')}>
                {options.map(({ name, filterOption, sortOptions }) => {
                    const selectOptionType = () => {
                        return !!filterOption ? isActiveFilterButton(filterOption) : isActiveSortButton(sortOptions)
                    }
                    return (<Button key={name} className={fcn('option', 'button', { active: selectOptionType() })} onClick={() => action(filterOption || sortOptions)}>
                        {name}
                    </Button>)
                }
                )}
            </div>
        </article>
    )
}

export const Filter = (props) => {
    const {
        hide,
        showFilter,
        sort,
        filter,
        setFilter,
        setSort,
        resetFilter
    } = props
    const [sortOption, setSortOption] = useState([sort.field, sort.order])
    const [filterOption, setFilterOption] = useState(filter)
    useEffect(() => {
        setFilterOption(filter)
    }, [filter])


    const clickSetFilters = ({ filter, sort }) => {
        const [field, order] = sort;
        setFilter(filter)
        setSort({ order, field })
        showFilter()
    }

    const clickResetFilters = () => {
        resetFilter()
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
                        onClick={() =>clickResetFilters()}>
                        Reset
                    </Button>
                </header>
                <FilterOption
                    title='Filter by'
                    options={[
                        { name: 'Income', filterOption: 'income' },
                        { name: 'Expense', filterOption: 'expense' },
                        { name: 'Transfer', filterOption: 'transfer' }
                    ]}
                    selectFilter={filterOption}
                    action={item => setFilterOption(item)}
                />
                <FilterOption
                    title='Sort by'
                    options={[
                        { name: 'Highest', sortOptions: ['cost', 'desc'] },
                        { name: 'Lowest', sortOptions: ['cost', 'asc'] },
                        { name: 'Newest', sortOptions: ['date', 'desc'] },
                        { name: 'Oldest', sortOptions: ['date', 'asc'] }
                    ]}
                    selectFilter={sortOption}
                    action={item => setSortOption(item)}
                />

                <Button primary onClick={() => clickSetFilters({ filter: filterOption, sort: sortOption })}>
                    Apply
                </Button>
            </div>
        </div>
    )
}
