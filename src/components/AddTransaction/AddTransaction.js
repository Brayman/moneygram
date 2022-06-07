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
import TagSelect from '../common/TagSelect/TagSelect';

const tags = ['shop', 'taxi', 'deliver', 'restaurant', 'ethernet', 'bus']
const SelectTag = ({ label, ...props }) => {
    const { setFieldValue } = useFormikContext()
    const [field, meta] = useField(props);
    return (
        <div >
            {tags.map((item, i) => <Tag key={i} tag={item} active={meta.value === item} getTag={tag => setFieldValue('tag', tag)} />)}
        </div>
    );
};
const DatePicker = (props) => {
    const { setFieldValue } = useFormikContext()
    const [field, meta] = useField(props);
    return (
        <input type='date' {...field} {...props} onChange={e => setFieldValue('date', new Date(e.target.value).toISOString().substring(0, 10))} />
    )
}





function AddForm({ userid, cardid, Add, Change }) {
    const navigate = useNavigate();
    const validate = values => {
        const errors = {};
        if (!values.cost) {
            errors.cost = 'Required'
        }
        return errors
    }
    const initialValues = {
        userid,
        date: new Date().toISOString().substring(0, 10),
        cardid,
        card: '',
        cost: '',
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
                    console.log({
                        ...values,
                        id: uuidv4(),
                        date: new Date(values.date).toISOString()
                    });
                    // Add({
                    //     ...values,
                    //     id: uuidv4(),
                    //     date: new Date(values.date).toISOString()
                    // })
                    actions.resetForm();
                }
            }
        >
            {({ values }) => <Form>
                <section className={`tr-add tr-add_${values.type}`}>
                    <header className={`tr-add__header header_${values.type}`}>
                        <Navigation className="header_nav" title={values.type}/>
                        <div className="tr-add-header__subtitle">
                            How much?
                        </div>
                        <div className="tr-add-header__title">
                            {values.currency}
                            <Field className='tr-add-header__input' type='number' name='cost'/>
                        </div>
                    </header>
                    <main className="tr-add__content">
                        <TagSelect item={values.tag} tags={tags}/>
                        <DatePicker className='tr-add__field field' name='date' id='date' placeholder="date" />
                        <Field className='tr-add__field field' name='payee'  placeholder='payee' />
                        <Field className='tr-add__field field' name='card' placeholder='select card' />
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