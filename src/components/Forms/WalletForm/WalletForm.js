import React from "react";
import { Formik } from "formik";
import { Navigation } from "../../common/Navigation/Navigation";
import "./style.css"
import { Field, SpecialField } from "../../common/Field/Field";
import Select from "../../common/Select/SelectField";
import { Button } from "../../common/Button/Buttons";
import CreateClasssName from "../../../utils/bemClassCreate";
import ToggleField from "../../common/Toggle/toggle-field";
import { Header, Segment, StyledForm } from "../Forms.styles";

const WalletForm = ({ wallet, saveAction }) => {
    const walletCN = CreateClasssName()
    return (
        <Formik
            initialValues={{
                ...wallet,
                balance: '',
                name: ''
            }}
            onSubmit={formData => saveAction(formData)}
        >
            {({ values }) => <StyledForm>
                <Header>
                    <Navigation title="Add new wallet" />
                </Header>
                <SpecialField
                    placeholder="balance"
                    type='number'
                    label='balance'
                    currency={values.currency}
                    name='balance'
                />

                <Segment>
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
                </Segment>
            </StyledForm>}
        </Formik>
    )
}
export default WalletForm;