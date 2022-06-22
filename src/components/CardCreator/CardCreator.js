import React from "react";
import { Formik, Form } from "formik";
import { v4 as uuidv4 } from 'uuid';
import { Navigation } from "../common/Navigation/Navigation";
import "./style.css"
import { Field } from "../common/Field/Field";
import { SpecialField } from "../common/Field/SpecialField";
import Select from "../common/Select/Select";

const CardCreateForm = ({ userid, CreateCard }) => {
    return (
        <section className="wallet-add">
            <Navigation className="wallet-add__nav" title="Add new wallet" />
            <Formik
                initialValues={{
                    userid,
                    cardid: uuidv4(),
                    name: '',
                    currency: "USD",
                    balance: ''
                }}
                onSubmit={formData => CreateCard(formData)}
            >
                { ({values}) => <Form className="wallet-add__form">
                    <SpecialField
                        placeholder="balance"
                        label={values.currency}
                        name='balance'
                        className='wallet-add__header-input'
                    />
                    <section className="wallet-add__fields">
                        <Field name="name" placeholder="Name" className="wallet-add__field" />
                        <Select up name='currency' options={["USD", "BYN", "GEL", "EUR"]} />
                        <button className="primary-btn" type="submit">
                            Save
                        </button>
                    </section>
                    
                </Form>}
            </Formik>
        </section>

    )
}
export default CardCreateForm;