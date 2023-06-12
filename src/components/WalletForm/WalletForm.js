import React from "react";
import { Formik, Form } from "formik";
import { Navigation } from "../common/Navigation/Navigation";
import "./style.css"
import { Field, SpecialField } from "../common/Field/Field";
import Select from "../common/Select/SelectField";
import { Button } from "../common/Button/Buttons";
import CreateClasssName from "../../utils/bemClassCreate";
import ToggleField from "../common/Toggle/toggle-field";

const WalletForm = ({ wallet, saveAction }) => {
    const walletCN = CreateClasssName()
    return (
        <section className="wallet-add">
            <Navigation className="wallet-add__nav" title="Add new wallet" />
            <Formik
                initialValues={wallet}
                onSubmit={formData => saveAction(formData)}
            >
                {({ values }) => <Form className="wallet-add__form">
                    <SpecialField
                        placeholder="balance"
                        type='number'
                        label={values.currency}
                        name='balance'
                        className='wallet-add__header-input'
                    />

                    <section className="wallet-add__fields">
                        <Field name="name" placeholder="Name" className={walletCN('wallet-add', 'field')} />
                        <Select
                            up
                            name='currency'
                            className={walletCN('wallet-add', 'field')}
                            options={["USD", "BYN", "GEL", "EUR"]}
                        />
                        <ToggleField label='Saving' name='saving' tabIndex={0} />
                        <Button primary type="submit">
                            Save
                        </Button>
                    </section>
                </Form>}
            </Formik>
        </section>

    )
}
export default WalletForm;