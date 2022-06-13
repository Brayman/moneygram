import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./AddTransaktion.css"
import Tag from "../Tag";
import { v4 as uuidv4 } from 'uuid';

import {
    Field,
    Form,
    Formik,
    useField,
    useFormikContext
} from "formik";
import { Navigation } from '../common/Navigation/Navigation';
import Select from '../common/Select/Select';
import { useSelector } from 'react-redux';
import { SpecialField } from '../common/Field/SpecialField';

const tags = ['shop', 'taxi', 'deliver', 'restaurant', 'ethernet', 'bus']
const DatePicker = (props) => {
    const { setFieldValue } = useFormikContext()
    const [field, meta] = useField(props);
    return (
        <input type='date' {...field} {...props} onChange={e => setFieldValue('date', new Date(e.target.value).toISOString().substring(0, 10))} />
    )
}

function AddForm({ userid, cardid, cards, trans = undefined, Action, Change }) {

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
                }
            }
        >
            {({ values }) => <Form>
                <section className={`tr-add tr-add_${values.type}`}>
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
                        <Select name="tag" tag options={tags} />
                        <DatePicker className='tr-add__field field' name='date' id='date' placeholder="date" />
                        <Field className='tr-add__field field' name='payee' placeholder='payee' />
                        <Select up options={cards.map(card => card.name)} name='card' placeholder='select card' />
                        <section className="tr-add__field tr-add__comment">
                            <h4 className="comment__header">
                                Comment
                            </h4>

                        </section>
                        <button className="tr-add__button primary-btn">
                            save
                        </button>
                    </main>
                </section>

            </Form>}
        </Formik>
    )
}
export default AddForm;