import React from 'react';
import { useNavigate } from "react-router-dom";
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

function AddForm({ userid,  cards, trans = undefined, Action }) {

    const initialValues = trans || {
        id: uuidv4(),
        userid,
        date: new Date().toISOString().substring(0, 10),
        cost: '',
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
                (values, actions) => {
                    const card = cards.find((card) => card.name === values.card)
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
                    <Select up options={cards.map(card => card.name)} className={addCN('add','field')} name='card' placeholder='select card' />
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