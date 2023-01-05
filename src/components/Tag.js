import React from "react";
import styled from "styled-components"
import { BiCartAlt } from "react-icons/bi";
import {
    RiTaxiLine,
    RiTakeawayLine,
    RiBusFill,
    RiRestaurant2Fill,
    RiPlaneFill,
    RiStethoscopeLine,
    RiGiftLine,
    RiWifiLine,
    RiScissorsFill,
    RiMoneyDollarCircleLine,
    RiHandCoinLine
} from "react-icons/ri";
import {
    MdCreditCard,
    MdAccountBalanceWallet,
    MdSavings,
    MdAccountBalance,
    MdOutlineHighlightOff
} from "react-icons/md"
import { Icon } from './Icon/Icon'
import CreateClasssName from "../utils/bemClassCreate";

export class Icons {
    card = {
        Icon: MdCreditCard,
        name: 'card',
        color: '#FCAC12',
        backgroundColor: '#FCCC6F'
    }
    bank = {
        Icon: MdAccountBalance,
        name: 'bank',
        color: '#FCAC12',
        backgroundColor: '#FCCC6F'
    }
    cash = {
        Icon: MdAccountBalanceWallet,
        name: 'cash',
        color: '#FCAC12',
        backgroundColor: '#FCCC6F'
    }
    saving = {
        Icon: MdSavings,
        name: 'saving',
        color: '#FCAC12',
        backgroundColor: '#FCCC6F'
    }
    taxi = {
        Icon: RiTaxiLine,
        name: 'taxi',
        color: '#FCAC12',
        backgroundColor: '#FCCC6F'
    }
    restaurant = {
        Icon: RiRestaurant2Fill,
        name: 'restaurant',
        color: '#FCAC12',
        backgroundColor: '#FCCC6F'
    }
    deliver = {
        Icon: RiTakeawayLine,
        name: 'deliver',
        color: '#FCAC12',
        backgroundColor: '#FCCC6F'
    }
    subscribe = {
        Icon: RiMoneyDollarCircleLine,
        name: 'subscribe',
        color: '#FCAC12',
        backgroundColor: '#FCCC6F'
    }
    shop = {
        Icon: BiCartAlt,
        name: 'shop',
        color: '#0077FF',
        backgroundColor: '#8AC0FF'
    }
    health = {
        Icon: RiStethoscopeLine,
        name: 'health',
        color: '#B18AFF',
        backgroundColor: '#7F3DFF'
    }
    beauty = {
        Icon: RiScissorsFill,
        name: 'beauty',
        color: '#B18AFF',
        backgroundColor: '#7F3DFF'
    }
    ethernet = {
        Icon: RiWifiLine,
        name: 'ethernet',
        color: '#57A5FF',
        backgroundColor: '#0077FF'
    }
    travel = {
        Icon: RiPlaneFill,
        name: 'travel',
        color: '#FCAC12',
        backgroundColor: '#FCCC6F'
    }
    gift = {
        Icon: RiGiftLine,
        name: 'gift',
        color: '#00A86B',
        backgroundColor: '#65D1AA'
    }
    bus = {
        Icon: RiBusFill,
        name: 'bus',
        color: '#0077FF',
        backgroundColor: '#57A5FF'
    }
    send = {
        Icon: RiHandCoinLine,
        name: 'send',
        color: '#00A86B',
        backgroundColor: '#65D1AA'
    }
    empty = {
        Icon: MdOutlineHighlightOff,
        name: 'empty',
        color: '#FD3C4A',
        backgraundColor: '#FD6F7A'
    }
    tag = {
        Icon: MdOutlineHighlightOff,
        name: 'empty',
        color: '#FD3C4A',
        backgraundColor: '#FD6F7A'
    }

    constructor(tag) {
        if (!!tag) {
            this.tag = this[tag]
            return this.tag
        }
        if (tag === '') {
            return this.empty
        }

    }
    allTags() {
        let propertys = []
        for (const key in this) {
            propertys.push(this[key])
        }
        return propertys
    }
    getTagsNames() {
        let tags = []
        for (const key in this) {
            tags.push(this[key].name)
        }
        return tags
    }

}


const DotStyle = styled.div`
    background: ${({ color }) => color};
    width: 1em;
    height: 1em;
    border-radius: 1em;
`
const Dot = (props) => {
    return <DotStyle {...props} />
}


export const Tag = ({ tag }) => {
    const icon = new Icons(tag)
    return (
        <Icon {...icon} />
    )
}

export const NamedTag = ({ children }) => {
    const icon = new Icons(children)
    const tagCN = CreateClasssName();
    return (
        <div className={tagCN('option')}>
            <div className={tagCN('option', 'tag')}>
                <Dot color={icon.color} />
                <div className={tagCN('tag', 'text')}>{icon.name}</div>
            </div>
        </div>

    )
}
Tag.Text = NamedTag

export default Tag;