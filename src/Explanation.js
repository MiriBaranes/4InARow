function Explanation(props) {
    return (
        <div>
            <ul>
                {props.explanation.map((rol,key) => {
                    return (<li key={key}>{rol}</li>)
                })}
            </ul>
        </div>
    )
}
export default Explanation;