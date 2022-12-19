import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Form,
    Formik,
    useField,
    useFormikContext
} from "formik";
import { Navigation } from '../common/Navigation/Navigation';
import { SelectField as Select } from '../common/Select/SelectField';
import DefaultSelect from '../common/Select/Select';
import { Field, SpecialField } from '../common/Field/Field';
import { Button, GroupedButton } from '../common/Button/Buttons';
import CreateClasssName from '../../utils/bemClassCreate';
import "./AddTransaktion.css"
import { Icons } from '../Tag';
const addCN = CreateClasssName()


const DatePicker = (props) => {
    const { setFieldValue } = useFormikContext()
    const [field] = useField(props);
    return (
        <Field type='date' {...field} {...props} onChange={e => setFieldValue('date', new Date(e.target.value).toISOString().substring(0, 10))} />
    )
}
const CardSelect = ({cards, ...props}) => {
    const [field] = useField(props);
    const [value, setValue] = useState(props.value)
    useEffect(() => {
        if (props.value) {
            setValue(cards.find((card) => card._id === props.value).name)
        }
    },[props, cards])
    const { setFieldValue } = useFormikContext()
    const setFieldsValue = (cardName) => {
        const cardValues = cards.find((card) => card.name === cardName)
        setFieldValue('cardid', cardValues._id)
        setFieldValue('currency',cardValues.currency)
        setValue(cardValues.name)
    }
    return <DefaultSelect {...field} {...props} value={value} options={cards.map(({name}) => name)} setValue={value => setFieldsValue(value)}/>
}

function TransactionForm({ userid, cards, transaction, date, Action, card }) {

    const navigate = useNavigate()
    const tags = new Icons().getTagsNames()
    return (
        <Formik
            initialValues={{
                ...transaction,
                userid,
                type: 'expense',
                date: new Date(date).toISOString().substring(0,10)
            }}
            onSubmit={
                (values, actions) => {
                    Action({
                        ...values,
                        date: new Date(values.date).toISOString(),
                    })
                    actions.resetForm();
                    navigate(-1)
                }
            }
        >
            {({ values, setFieldValue }) => <Form className={addCN('add', null, { [values.type]: true })} >

                <header className={addCN('add', null, { [values.type]: true })}>
                    <Navigation className={addCN('header', 'nav', {[values.type]: true })} title={values.type} />
                    <SpecialField
                        name='cost'
                        placeholder='How much?'
                        label={values.currency}
                        type='number'
                    />
                </header>
                <main className="tr-add__content">
                    <Select name="tag" tag options={tags} className={addCN('add','field')} />
                    <DatePicker className={addCN('add','field')} name='date' id='date' placeholder="date" />
                    <Field className={addCN('add','field')} name='payee' placeholder='payee' />
                    <CardSelect up cards={cards} value={values.cardid} className={addCN('add','field')} name='cardid' placeholder='select card' />
                    <GroupedButton
                        className={addCN('add','field')}
                        type='button'
                        buttons={['Income', 'Expense', 'Transfer']}
                        onClick={(type) => setFieldValue('type', type)}
                        value={values.type}
                    />
                    <Button primary type='submit' className="tr-add__button primary-btn">
                        save
                    </Button>
                </main>


            </Form>}
        </Formik>
    )
}
export default TransactionForm;