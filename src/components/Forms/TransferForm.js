import { Form, useField } from 'formik'
import React from 'react'
import styled from 'styled-components'
import { Button } from '../common/Button/Buttons'
import { Field, SpecialField } from '../common/Field/Field'
import { Navigation } from '../common/Navigation/Navigation'
import { SelectField as Select } from '../common/Select/SelectField'

const Header = styled.div`
    color: var(--light-80);
    flex-grow: 1;
    background-color: inherit;
`

const StyledForm = styled(Form)`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--blue-100);
`

const Segment = styled.div`
    margin: auto 0 2em 0;
    display: flex;
    flex-direction: column;
    border-radius: 32px 32px 0 0;
    padding: 24px 16px;
    background-color: var(--light-100);
`

const RowFields = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
    div:first-child {
        margin-right: 16px;
    }
`
const BalanceRow = styled(RowFields)`
    flex-wrap: wrap;
    justify-content: space-between;
`
const StyledSelect = styled(Select)`
    width: 50%;
`



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
        <StyledForm>
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

                <Button primary type='submit'>
                    Continue
                </Button>
            </Segment>
        </StyledForm>
    )
}

export default TransferForm