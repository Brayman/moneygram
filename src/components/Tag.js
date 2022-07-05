import { useEffect, useState } from "react";
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
    RiForbidLine,
    RiHandCoinLine
} from "react-icons/ri";
import {
    MdOutlineHighlightOff
} from "react-icons/md"
function Tag({ tag, getTag = undefined, active }) {
    const [Icon, setIcon] = useState(<RiForbidLine />)

    useEffect(() => {
        switch (tag) {
            case 'taxi':
                setIcon(<RiTaxiLine className="transaction__icon taxi-icon" />)
                break;
            case 'restaurant':
                setIcon(<RiRestaurant2Fill className="transaction__icon taxi-icon" />)
                break;
            case 'deliver':
                setIcon(<RiTakeawayLine className="transaction__icon taxi-icon" />)
                break;
            case 'subscribe':
                setIcon(<RiMoneyDollarCircleLine className="transaction__icon taxi-icon" />)
                break;
            case 'shop':
                setIcon(<BiCartAlt className="transaction__icon taxi-icon" />)
                break;
            case 'health':
                setIcon(<RiStethoscopeLine className="transaction__icon taxi-icon" />)
                break;
            case 'beauty':
                setIcon(<RiScissorsFill className="transaction__icon taxi-icon" />)
                break;
            case 'ethernet':
                setIcon(<RiWifiLine className="transaction__icon taxi-icon" />)
                break;
            case 'travel':
                setIcon(<RiPlaneFill className="transaction__icon taxi-icon" />)
                break;
            case 'gift':
                setIcon(<RiGiftLine className="transaction__icon taxi-icon" />)
                break;
            case 'bus':
                setIcon(<RiBusFill className="transaction__icon" />)
                break;
            case 'send':
                setIcon(<RiHandCoinLine className="transaction__icon" />)
                break;
            default:
                setIcon(<MdOutlineHighlightOff className="transaction__icon error-icon" />)
                break;
        }
    }, [tag])

    return (

        <div onClick={getTag && (() => getTag(tag))}>
            {Icon}
        </div>

    )
}
export default Tag;