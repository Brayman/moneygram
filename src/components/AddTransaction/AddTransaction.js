import React, { useState } from 'react';
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
const addCN = CreateClasssName()
const tags = ['send','shop', 'taxi', 'deliver', 'restaurant', 'ethernet', 'bus']

const DatePicker = (props) => {
    const { setFieldValue } = useFormikContext()
    const [field] = useField(props);
    return (
        <Field type='date' {...field} {...props} onChange={e => setFieldValue('date', new Date(e.target.value).toISOString().substring(0, 10))} />
    )
}
const CardSelect = (props) => {
    const { setFieldValue } = useFormikContext()
    const [field] = useField(props);
    const [value, setValue] = useState(props.value)
    const setFieldsValue = (cardName) => {
        const cardValues = props.cards.find((card) => card.name === cardName)
        setFieldValue('cardid', cardValues._id)
        setFieldValue('currency',cardValues.currency)
        setValue(cardValues.name)
    }
    return <DefaultSelect {...field} {...props} value={value} options={props.cards.map(({name}) => name)} setValue={value => setFieldsValue(value)}/>
}

function AddForm({ userid,  cards, trans = undefined, Action }) {

    const initialValues = trans || {
        userid,
        date: new Date().toISOString().substring(0, 10),
        cost: '',
        payee: '',
        tag: '',
        type: 'expense',
        currency: cards[0].currency || ''
    }
    const navigate = useNavigate()
    return (
        <Formik
            initialValues={initialValues}
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
                    <Select name="tag" tag options={tags} className="tr-add__field" />
                    <DatePicker className='tr-add__field field' name='date' id='date' placeholder="date" />
                    <Field className='tr-add__field field' name='payee' placeholder='payee' />
                    <CardSelect up cards={cards} className={addCN('add','field')} name='cardid' placeholder='select card' />
                    <GroupedButton
                        className={addCN('add','field')}
                        type='button'
                        buttons={['Income', 'Expense', 'Transfer']}
                        onClick={(type) => setFieldValue('type', type)}
                        value={values.type}
                    />
                    <section className="tr-add__field tr-add__comment">
                        <h4 className="comment__header">
                            Comment
                        </h4>

                    </section>
                    <Button primary type='submit' className="tr-add__button primary-btn">
                        save
                    </Button>
                </main>


            </Form>}
        </Formik>
    )
}
export default AddForm;