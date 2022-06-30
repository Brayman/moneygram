import React from 'react';
import { useNavigate } from "react-router-dom";
import "./AddTransaktion.css"
import { v4 as uuidv4 } from 'uuid';

import {
    Form,
    Formik,
    useField,
    useFormikContext
} from "formik";
import { Navigation } from '../common/Navigation/Navigation';
import { SelectField as Select } from '../common/Select/SelectField';
import { Field, SpecialField } from '../common/Field/Field';
import { Button, GroupedButton } from '../common/Button/Buttons';
import CreateClasssName from '../../utils/bemClassCreate';
import { transactionType } from '../../types';

const add = CreateClasssName('tr')
const tags = ['send', 'shop', 'taxi', 'deliver', 'restaurant', 'ethernet', 'bus']

const DatePicker = (props: any) => {
    const { setFieldValue } = useFormikContext()
    const [field] = useField(props);
    return (
        <Field type='date' {...field} {...props} onChange={(e: any) => setFieldValue('date', new Date(e.target.value).toISOString().substring(0, 10))} />
    )
}

interface addFormInterface {
    userid: string,
    cards: any,
    trans?: any,
    Action: (form: transactionType) => void
}
function AddForm({ userid, cards, trans = undefined, Action }: addFormInterface) {

    const initialValues: transactionType = trans || {
        id: uuidv4(),
        userid,
        date: new Date().toISOString().substring(0, 10),
        card: cards[0].name || '',
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
                (values: any, actions: any) => {
                    const card = cards.find((card: any) => card.name === values.card)
                    Action({
                        ...values,
                        date: new Date(values.date).toISOString(),
                        cardid: card.id,
                        currency: card.currency
                    })
                    actions.resetForm();
                    navigate(-1)
                }
            }
        >
            {({ values, setFieldValue }) => <Form className={add('add', { [values.type]: true })} >

                <header className={`tr-add__header header_${values.type}`}>
                    <Navigation className="header_nav" title={values.type} />
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
                    <Select up options={cards.map((card: any) => card.name)} className={add('add', 'field')} name='card' placeholder='select card' />
                    <GroupedButton
                        className={add('add', 'field')}
                        type='button'
                        buttons={['Income', 'Expense', 'Transfer']}
                        onClick={(type: string) => setFieldValue('type', type)}
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