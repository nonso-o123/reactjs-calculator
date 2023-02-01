

/*******  Operator Keys Component   ***********/
export default function OperatorKeys(props) {
    return (
        <>
            <div className="operator-keys-cont">
                {props.operatorKeys.map((op) => {
                    return (
                        <button
                            key={Object.keys(op)}
                            className={`key-pads operator-key-pads`}
                            value={Object.values(op)}
                            onClick={(e) => props.setOperatorVal(e)}
                            id={Object.keys(op)}
                        >
                            {Object.values(op)}
                        </button>
                    );
                })}
            </div>
        </>
    );
};
