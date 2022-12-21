import { useNavigate } from "react-router-dom"
import { MdPassword, MdOutlineMail, MdOutlineAccountCircle, MdOutlineTranslate } from "react-icons/md";

import style from "./Settings.module.css"
import Item from "./Item"
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
function SettingsList() {
    return (
        <div className="home">
            <section>
                <h2>Profile Settings</h2>
                <Item   header="Change Name"
                        item={'change-name'}
                        desc="Change your first and last name"
                >
                    <MdOutlineAccountCircle size={30}/>
                </Item>
                <Item   header="Change Mail"
                        item={'change-mail'}>
                    <MdOutlineMail size={30}/>
                </Item>
                <Item   header="Change Language"
                        item={'change-language'}>
                    <MdOutlineTranslate size={30}/>
                </Item>
            </section>
            <section>
                <h2>Security Settings</h2>
                <Item header="Change Password">
                    <MdPassword size={30}/>
                </Item>
            </section>
        </div>
        
    )
}
export default SettingsList;