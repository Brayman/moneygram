import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../../redux/filter';
import { Filter } from './Filter';
import * as selectors from "../../../redux/selectors";




const FilterContainer = ({ hide = false, showFilter }) => {
    const dispatch = useDispatch();

    const props = {
        hide,
        showFilter,
        sort: useSelector(selectors.sort),
        filter: useSelector(selectors.filter),
        resetFilter: () => dispatch(actions.resetFilter()),
        setFilter: filterOption => dispatch(actions.setFilter(filterOption)),
        setSort: sortOptions => dispatch(actions.setSort(sortOptions))
    }
    return (
      <Filter {...props}/>
  )
}

export default FilterContainer;