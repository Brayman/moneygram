import { connect } from "react-redux";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { settingsChangeAC, updateProfileThunk } from "../../redux/account";
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
        Change: (item, value) => dispatch(settingsChangeAC(item, value)),
        // Save: () => dispatch(settingsSaveAC())
        Save: (login, data) => dispatch(updateProfileThunk(login, data))
    }
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    WithAuthRedirect
)(Settings)