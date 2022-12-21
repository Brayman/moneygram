import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import Settings from "./Settings";


export default compose(
    WithAuthRedirect
)(Settings)