import { useField } from 'formik'
import React from 'react'
import styled from 'styled-components'
import { Button, GroupedButton } from '../common/Button/Buttons'
import { Field, SpecialField } from '../common/Field/Field'
import { Navigation } from '../common/Navigation/Navigation'
import CreateClasssName from '../../utils/bemClassCreate'
import { Header, Segment, StyledForm } from './Forms.styles'

import { BalanceRow, RowFields, StyledSelect } from './TransactionForm/TransactionForm.styles'
const addCN = CreateClasssName()




const DatePicker = ({ setFieldValue, ...props }) => {
    const [field] = useField(props);
    return (
        <Field type='date' {...field} {...props} onChange={e => setFieldValue('date', new Date(e.target.value).toISOString().substring(0, 10))} />
    )
}

const DateField = styled(DatePicker)`
    margin-bottom: 16px;
`

const TransferForm = ({ setValues, setFieldValue, wallets, ...props }) => {
    const setWallet = (value, type) => {
        const wallet = wallets.find(wallet => wallet.name === value)
        setFieldValue([`${type}Currency`], wallet.currency)
        setFieldValue([`${type}Wallet`], wallet.name)
    }
    return (
        <StyledForm type={props.values.type} >
            <Header>
                <Navigation title='Transfer' />
            </Header>
            <BalanceRow>
                <SpecialField
                    currency={props.values.outcomeCurrency}
                    name='outcome'
                    label='How much?'
                    placeholder='0'
                    type='number'
                />
                {props.values.outcomeCurrency !== props.values.incomeCurrency && <SpecialField
                    currency={props.values.incomeCurrency}
                    name='income'
                    label='How much?'
                    placeholder='0'
                    type='number'
                />}
            </BalanceRow>
            <Segment>
                <DateField
                    name='date'
                    id='date'
                    placeholder="date"
                    setFieldValue={setFieldValue}
                />
                <RowFields>
                    <StyledSelect
                        options={wallets.map(wallet => wallet.name)}
                        name='outcomeWallet'
                        up
                        onClick={(value) => setWallet(value, 'outcome')}
                    />
                    <StyledSelect
                        options={wallets.map(wallet => wallet.name)}
                        name='incomeWallet'
                        up
                        onClick={(value) => setWallet(value, 'income')}
                    />
                </RowFields>
                <GroupedButton
                    className={addCN('add', 'field')}
                    type='button'
                    buttons={['Income', 'Expense', 'Transfer']}
                    onClick={(type) => setFieldValue('type', type)}
                    value={props.values.type}
                />

                <Button primary type='submit'>
                    Continue
                </Button>
            </Segment>
        </StyledForm>
    )
}

export default TransferForm