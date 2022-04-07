import { useEffect, useState } from "react";
import { BiCartAlt } from "react-icons/bi";
import { 
    RiTaxiLine,
    RiTakeawayLine,
    RiRestaurant2Fill,
    RiPlaneFill,
    RiStethoscopeLine,
    RiGiftLine,
    RiWifiLine,
    RiScissorsFill,
    RiMoneyDollarCircleLine,
    RiForbidLine
 } from "react-icons/ri";
function Tag({tag}) {
    const [icon, setIcon] = useState(<RiForbidLine/>)
    
    useEffect(() =>{
        switch (tag) {
        case 'taxi':
            setIcon(<RiTaxiLine/>)
            break;
        case 'deliver':
            setIcon(<RiTakeawayLine/>)
            break;
        case 'shop':
            setIcon(<BiCartAlt/>)
            break;
        case 'health':
            setIcon(<RiStethoscopeLine/>)
            break;
        case 'beauty':
            setIcon(<RiScissorsFill/>)
            break;
        case 'ethernet':
            setIcon(<RiWifiLine/>)
            break;
        case 'travel':
            setIcon(<RiPlaneFill/>)
            break;
        case 'gift':
            setIcon(<RiGiftLine/>)
            break;

    
        default:

            break;
    }
    },[tag])
    
    return (
    <div className="tag">
        {icon}
    </div>
    )
}
export default Tag;