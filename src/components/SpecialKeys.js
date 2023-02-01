






/*******    Special Keys Component ***********/
export default function SpecialKeys(props) {
    return (
        <div className="special-keys">
            <button
                className={`key-pads special-key-pads`}
                value={props.specialKeys[props.value]}
                onClick={(e) => {
                    props.setSpecialKey(e);
                    props.value === "clear" && props.clearDisplay();
                    props.value === "equals" && props.showResult();
                }}
                id={props.value}
            >
                {props.specialKeys[props.value]}
            </button>
        </div>
    );
};
