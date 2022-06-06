import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./AddTransaktion.css"
import Tag from "../Tag";
import { v4 as uuidv4 } from 'uuid';
import {
    MdKeyboardBackspace,
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowUp
} from "react-icons/md";
import {
    Field,
    Form,
    Formik,
    useField,
    useFormikContext
} from "formik";

const tags = ['shop', 'taxi', 'deliver', 'restaurant', 'ethernet', 'bus']
const TagSelect = ({ label, ...props }) => {
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


const SelectTag = ({item}) => {
    const [open, setOpen] = useState(false);
    const { setFieldValue } = useFormikContext()
    const hiddenClass = !open ? 'options__hidden' : 'options';
    return (
        <div className='select-field'>
            <div className='select field tr-add__field' onClick={() => setOpen(!open)}>
                <div className='tag-option tag-option__selected'>
                    <div className='tag-option__dot' />
                    {item}
                </div>
                {open ?
                    <MdOutlineKeyboardArrowUp className='select__icon' /> :
                    <MdOutlineKeyboardArrowDown className='select__icon' />
                }
            </div>
            <div className={hiddenClass}>
                {tags.map(item => {
                    return (
                        <div
                            key={item}
                            className='tag-option'
                            onClick={e => {
                                setOpen(!open)
                                setFieldValue('tag', e.target.outerText)}
                            }
                        >
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>
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
                <section className="tr-add">
                    <header className={`tr-add__header header_${values.type}`}>
                        <nav className="header__nav nav">
                            <button className="nav__button">
                                <MdKeyboardBackspace />
                            </button>
                            <h2 className="nav__title">
                                {values.type}
                            </h2>
                        </nav>
                        <div className="tr-add-header__subtitle">
                            How much?
                        </div>
                        <h1 className="tr-add-header__title">
                            {`${values.currency} ${values.cost}`}
                        </h1>

                        <div className="header__date">

                        </div>
                    </header>
                    <main className="tr-add__content">
                        <SelectTag item={values.tag}/>
                        <Field className='tr-add__field field' name='payee'  placeholder='payee' />
                        <Field className='tr-add__field field' name='card' placeholder='select card' />
                        <section className="tr-add__field tr-add__comment">
                            <h4 className="comment__header">
                                Comment
                            </h4>

                        </section>
                        <button className="tr-add__button">
                            edit
                        </button>
                    </main>
                </section>
                <label htmlFor="cost">price</label>
                <Field type='number' id='cost' name='cost' />
                <Field type='text' name='payee' placeholder='shop' />
                <DatePicker name='date' id='date' placeholder="date" />
                <TagSelect name='tag' />
                <button type='submit'> Save</button>
            </Form>}
        </Formik>
    )
}
export default AddForm;