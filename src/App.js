import { Component } from "react";
import NumberKeys from "./components/NumberKeys";
import OperatorKeys from "./components/OperatorKeys";
import SpecialKeys from "./components/SpecialKeys";
import './App.scss'

/******************* DECLARATIONS ********************/
/**    Input Data **/
const calc = {
  numKeys: [
    { seven: 7 },
    { eight: 8 },
    { nine: 9 },
    { four: 4 },
    { five: 5 },
    { six: 6 },
    { one: 1 },
    { two: 2 },
    { three: 3 },
    { zero: 0 },
    { decimal: "." }
  ],
  operatorKeys: [
    { divide: "/" },
    { multiply: "*" },
    { add: "+" },
    { subtract: "-" }
  ],
  specialKeys: {
    equals: "=",
    clear: "AC"
  }
};


/*******    Main Component   ***********/
class App extends Component {
  constructor(props) {
    super(props);

    /*******   State Declaration  ***********/
    this.state = {
      keyPad: calc,
      display: "",
      input: "0",
      isDecimalDisabled: false,
      addedOperator: false,
      currentOperator: "",
      evaluated: false,
      result: ""
    };
    this.setNumVal = this.setNumVal.bind(this);
    this.setOperatorVal = this.setOperatorVal.bind(this);
    this.setSpecialKey = this.setSpecialKey.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.showResult = this.showResult.bind(this);
    this.evaluate = this.evaluate.bind(this)
  }

  /******** Set Number Value *************/
  setNumVal(e) {
    let value = e.target.value;
    let currDisplay = "";
    let currInput = this.state.input;

    this.state.evaluated
      ? (currDisplay = this.state.result.toString())
      : (currDisplay = this.state.display);
    console.log(this.state.result.toString());

    //Replace leading zero or decimal in input
    if (
      (currInput.length === 1 && currInput === "0") ||
      this.state.addedOperator
    ) {
      if (value === ".") currInput = "0";
      else currInput = "";
    }

    //Disable decimal once it's present in a number
    value === "." && this.setState({ isDecimalDisabled: true });

    //Replace leading zero and decimal in display view
    let displayArr = currDisplay.match(/[^\d.]+|[\d.]+/g);

   
    if (displayArr) {
      displayArr = displayArr.map((arr) => {
        return arr.replace(/^0+(?!$)/, "").replace(/^\./, "0.");
      });
      displayArr = displayArr.join("");

      this.setState({
        display: displayArr + value,
        input: currInput + value,
        addedOperator: false,
        evaluated: false
      });
    } else {
      this.setState({
        display: currDisplay + value,
        input: currInput + value,
        addedOperator: false,
        evaluated: false
      });
    }

  }

  /******** Set Operator Value *************/
  setOperatorVal(e) {
    let value = e.target.value;
    let currDisplay = ""

    // check that previous expression is evaluated? Use result as start of new expression
    if(this.state.evaluated){
      currDisplay = this.state.result
      this.setState({
      display: currDisplay+value,
      isDecimalDisabled: false,
      addedOperator: true,
      currentOperator: value,
      evaluated: false
    });
    }
    // if exp is not evaluated, expression is entire input
    else{
      currDisplay = this.state.display
      this.setState({
      display: currDisplay + value,
      isDecimalDisabled: false,
      addedOperator: true,
      currentOperator: value,
      evaluated: false
    });
    }
  }

  /******** Set Special Keys *************/
  setSpecialKey(e) { }
  clearDisplay() {
    this.setState({
      display: "",
      input: "0",
      isDecimalDisabled: false,
      updateDisplay: "",
      evaluated: false,
      result: ""
    });
  }
evaluate(fn){
  return new Function('return ' + fn)()
}
  showResult() {
    let exp = this.state.display;
    let res = Math.round(1000000000000 * this.evaluate(exp)) / 1000000000000;
    this.setState((prev) => ({
      evaluated: true,
      input: res,
      display: prev.display + " = " + res,
      isDecimalDisabled: false,
      result: res
    }));

    console.log(`display3: ${this.state.display}`)
    console.log(`addedOperator3: ${this.state.addedOperator}`)
    console.log(`evaluated3: ${this.state.evaluated}`)
    console.log(`result3: ${this.state.result}`)
  }


  /**** Use result as new value if an operator is pressed ****/
  newExpression() {

  }

  /*******     RENDER COMPONENTS ***********/
  render() {
    const { numKeys } = this.state.keyPad;
    const { operatorKeys } = this.state.keyPad;
    const { specialKeys } = this.state.keyPad;
    return (
      <div className="calc-main">
        <div id="display-view">
          <div>{this.state.display}</div>
          <div id="display">{this.state.input}</div>
        </div>
        <div className="pad-container">
          <NumberKeys
            numKeys={numKeys}
            setNumVal={this.setNumVal}
            isDecimalDisabled={this.state.isDecimalDisabled}
          />
          <div>
            <SpecialKeys
              specialKeys={specialKeys}
              value={"clear"}
              setSpecialKey={this.setSpecialKey}
              clearDisplay={this.clearDisplay}
            />
            <OperatorKeys
              operatorKeys={operatorKeys}
              setOperatorVal={this.setOperatorVal}
            />
            <SpecialKeys
              specialKeys={specialKeys}
              value={"equals"}
              setSpecialKey={this.setSpecialKey}
              showResult={this.showResult}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
