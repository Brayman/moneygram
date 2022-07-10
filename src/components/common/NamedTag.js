import CreateClasssName from "../../utils/bemClassCreate";
const tagCN = CreateClasssName();

export const NamedTag = ({ children }) => {
    return (
        <div className={tagCN('option')}>
            <div className={tagCN('option', 'tag')}>
                <div className={tagCN('tag', 'dot')}></div>
                <div className={tagCN('tag', 'text')}>{children}</div>
            </div>
        </div>

    )
}
