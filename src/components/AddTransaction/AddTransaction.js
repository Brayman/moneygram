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
import {SelectField as Select} from '../common/Select/SelectField';
import { SpecialField } from '../common/Field/SpecialField';
import { Field } from '../common/Field/Field';
import { Button } from '../common/Button/Buttons';
const tags = ['shop', 'taxi', 'deliver', 'restaurant', 'ethernet', 'bus']
const DatePicker = (props) => {
    const { setFieldValue } = useFormikContext()
    const [field] = useField(props);
    return (
        <Field type='date' {...field} {...props} onChange={e => setFieldValue('date', new Date(e.target.value).toISOString().substring(0, 10))} />
    )
}

function AddForm({ userid, cardid, cards, trans = undefined, Action }) {

    const initialValues = trans || {
        id: uuidv4(),
        userid,
        date: new Date().toISOString().substring(0, 10),
        cardid,
        card: '',
        cost: 0,
        payee: '',
        tag: '',
        type: 'expense',
        currency: 'GEL'
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
                        cardid: cards.find((card) => card.name === values.card).id
                    })
                    actions.resetForm();
                    navigate(-1)
                }
            }
        >
            {({ values }) => <Form className={`page tr-add tr-add_${values.type}`}>

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
                    <Select name="tag" tag options={tags} className="tr-add__field"/>
                    <DatePicker className='tr-add__field field' name='date' id='date' placeholder="date" />
                    <Field className='tr-add__field field' name='payee' placeholder='payee' />
                    <Select up options={cards.map(card => card.name)} name='card' placeholder='select card' />
                    <section className="tr-add__field tr-add__comment">
                        <h4 className="comment__header">
                            Comment
                        </h4>

                    </section>
                    <Button primary className="tr-add__button primary-btn">
                        save
                    </Button>
                </main>


            </Form>}
        </Formik>
    )
}
export default AddForm;