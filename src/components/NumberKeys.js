


/*******   Number Keys Component    ***********/
export default function NumberKeys(props) {
    return (
        <div className="key-pad-container">
            {props.numKeys.map((k) => {
                if (Object.keys(k) == "decimal") {
                    return (
                        <button
                            key={Object.keys(k)}
                            className="key-pads"
                            id={Object.keys(k)}
                            value={Object.values(k)}
                            onClick={(e) => props.setNumVal(e)}
                            disabled={props.isDecimalDisabled}
                        >
                            {Object.values(k)}
                        </button>
                    );
                } else {
                    return (
                        <button
                            key={Object.keys(k)}
                            className="key-pads"
                            id={Object.keys(k)}
                            value={Object.values(k)}
                            onClick={(e) => props.setNumVal(e)}
                        >
                            {Object.values(k)}
                        </button>
                    );
                }
            })}
        </div>
    );
};