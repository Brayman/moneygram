import { BiUser, BiEnvelope,  } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom"
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
function ProfileName({Save, account}) {
    const {first_name,second_name}=account
    const [settings, setSettings] = useState({first_name,second_name})
    const navigator = useNavigate()
    const ChangeSettings = (item, value) => {
        setSettings({
            ...settings,
            [item]: value
        })
    }
    const SaveClick = (id, props) => {
        Save(id,props)
        navigator(-1)
    }
    return (
            <section className={`home ${style.section}`}>
                <h2>Change Name</h2>
                <label htmlFor='first_name'>First name</label>
                <input  id='first_name'
                        type='text'
                        value={settings.first_name}
                        onChange={e => ChangeSettings(e.target.id, e.target.value)}
                />
                <label htmlFor='second_name'>Second name</label>
                <input  id='second_name'
                        type='text'
                        value={settings.second_name}
                        onChange={e => ChangeSettings(e.target.id, e.target.value)}
                />
                <button onClick={() => SaveClick(account.id,settings)}>save</button>
            </section>
        
    )
}
function ProfileMail({Save, account}) {
    
    const [settings, setSettings] = useState({mail: account.mail})
    const navigator = useNavigate()
    const ChangeSettings = (item, value) => {
        setSettings({
            ...settings,
            [item]: value
        })
    }
    const SaveClick = (id, props) => {
        Save(id,props)
        navigator(-1)
    }
    return (
            <section className={style.section}>
                <h2>Change Mail</h2>
                <label htmlFor='mail'>Your mail</label>
                <input  id='mail'
                        type='mail'
                        value={settings.mail}
                        onChange={e => ChangeSettings(e.target.id, e.target.value)}
                />
                <button onClick={() => SaveClick(account.id,settings)}>save</button>
            </section>
        
    )
}

function Settings({profile,account, Change, Save}) {
    console.log(profile);
    return (
        <Routes>
           <Route path="/" element={<SettingsList/>}/> 
           <Route path="/change-name" element={<ProfileName Change={Change} Save={Save} account={account}/>}/>
           <Route path="/change-mail" element={<ProfileMail Change={Change} Save={Save} account={account}/>}/> 
        </Routes>
        
    )
    
}

export default Settings;