import { connect } from "react-redux";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import Settings from "./Settings";

const mapStateToProps = state => {
    return {
        isAuth: state.account.isAuth,
        account: state.account,
        profile: state.account.settings
    }
}
const mapDispatchToProps = dispatch => {
    return {
        
    }
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    WithAuthRedirect
)(Settings)