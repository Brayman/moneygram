import { BiUser, BiEnvelope,  } from "react-icons/bi";
import { MdPassword, MdOutlineMail, MdOutlineAccountCircle, MdOutlineTranslate } from "react-icons/md";

import style from "./Settings.module.css"
import Item from "./Item"
function Settings() {
    return (
        <div>
            <section className={style.section}>
                <h2>Profile Settings</h2>
                <Item   header="Change Name"
                        desc="Change your first and last name"
                >
                    <MdOutlineAccountCircle size={30}/>
                </Item>
                <Item header="Change Mail">
                    <MdOutlineMail size={30}/>
                </Item>
                <Item header="Change Language">
                    <MdOutlineTranslate size={30}/>
                </Item>
            </section>
            <section className={style.section}>
                <h2>Security Settings</h2>
                <Item header="Change Password">
                    <MdPassword size={30}/>
                </Item>
            </section>
        </div>
        
    )
}
export default Settings;