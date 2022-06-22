import "./NewMain.css";
import {
    MdFilterList,
    MdKeyboardArrowDown,
    MdKeyboardArrowRight,
    MdShoppingCart
} from "react-icons/md";





export const DaySection = () => {
    return (
        <section className="day-section transactions__item">
            <header className="day-section__header">
                Today
            </header>
         
        </section>
    )
}

function Main(params) {
    return (
        <section className="transactions">
            <header className="transactions__header">
                <button className="filter-btn">
                    <MdKeyboardArrowDown className="filter-btn__icon" />
                    Month
                </button>
                <button className="icon-btn">
                    <MdFilterList />
                </button>
            </header>
            <button className="info-btn transactions__report">
                See your financial report
                <MdKeyboardArrowRight className="info-btn__icon" />
            </button>
            <DaySection />
            
        </section>
    )
}
export default Main