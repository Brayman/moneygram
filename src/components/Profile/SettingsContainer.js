import { connect } from "react-redux";
import { settingsChangeAC, settingsSaveAC } from "../../redux/account";
import Settings from "./Settings";

const mapStateToProps = state => {
    return {
        profile: state.account.settings
    }
}
const mapDispatchToProps = dispatch => {
    return {
        Change: (item, value) => dispatch(settingsChangeAC(item, value)),
        Save: () => dispatch(settingsSaveAC())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Settings)