import { createRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./AddTransaktion.module.css"
import Tag from "../Tag";
    
    function AddForm({transaction, Add,AddPost,  Change}) {
    const [editMode, setEditMode] = useState(false)
    const cost = createRef();
    const receiver = createRef();
    document.title = 'new transaktion';
    return (
        <div className={style.form}>
            <label htmlFor="cost" value="cost">
                Cost
                
            </label>
            <input
                id="cost"
                value={transaction.cost}
                type="number" ref={cost}
                autoFocus={true}
                onChange={() => Change(cost.current)}
                onFocus={() => setEditMode(true)}
            />
            <input type='text' ref={receiver} id='receiver' value={transaction.receiver} onChange={() => Change(receiver.current)}/>
            <div className={style.scroller}>
                <Tag tag='shop' getTag={tag => Change({id: 'tag', value:tag})}/>                
                <Tag tag='taxi' getTag={tag => Change({id: 'tag', value:tag})}/>
                <Tag tag='deliver' getTag={tag => Change({id: 'tag', value:tag})}/>
                <Tag tag='restaurant' getTag={tag => Change({id: 'tag', value:tag})}/>
                <Tag tag='ethernet' getTag={tag => Change({id: 'tag', value:tag})}/>
                <Tag tag='bus' getTag={tag => Change({id: 'tag', value:tag})}/>                
            </div>
            
            <button onClick={() => Add(transaction.cost)}>
                Add transaction
            </button>

        </div>
    )
}
export default AddForm;