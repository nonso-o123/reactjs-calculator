import { Component } from "react";
import NumberKeys from "./components/NumberKeys";
import OperatorKeys from "./components/OperatorKeys";
import SpecialKeys from "./components/SpecialKeys";
import './App.scss'

/******************* INPUT DATA ********************/
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


/*******    MAIN COMPONENT   ***********/
class App extends Component {
  constructor(props) {
    super(props);

    /*******   State Declaration  ***********/
    this.state = {
      keyPad: calc,
      display: "",
      input: "0",
      isKeyDisabled: true,
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
    this.leadingZeroesDecimals = this.leadingZeroesDecimals.bind(this)
  }


  /**** Leading Zero And Decimal Replacement Function *****/
  leadingZeroesDecimals(num){
    num = num.split(/(?=[\/\+\-\*])|(?<=[\/\+\-\*])/g).map((arr) => {
      return arr.replace(/^0+(?!$)/, "").replace(/^\./, "0.");
    });
    return(num.join(""));
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

    //Replace leading zero or decimal in current input
    if (
      (currInput.length === 1 && currInput === "0") ||
      this.state.addedOperator
    ) {
      if (value === ".") currInput = "0";
      else currInput = "";
    }

    //Disable decimal once it's present in a number
    //remove leading zeroes and decimals on display
    value === "." && this.setState({ isDecimalDisabled: true });
    let displayArr = this.leadingZeroesDecimals(currDisplay)
      this.setState({
        display: displayArr + value,
        input: currInput + value,
        addedOperator: false,
        evaluated: false,
        isKeyDisabled: false
      });
  }

  /******** Set Operator Value *************/
  setOperatorVal(e) {
    let value = e.target.value;
    let currDisplay = ""

console.log(`display: ${this.state.display}`)

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
    // replace leading zeroes and decimals on display
    else{
      currDisplay = this.state.display
      currDisplay = this.leadingZeroesDecimals(currDisplay)
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
      result: "",
      isKeyDisabled: true
    });
  }

/**** Evaluate Function ****/
evaluate(fn){
  return new Function('return ' + fn)()
}

/****** Show Result ******/
  showResult() {
    let exp = this.state.display;
    exp = this.leadingZeroesDecimals(exp)
    console.log(exp)
    let res = Math.round(1000000000000 * this.evaluate(exp)) / 1000000000000;
    this.setState(() => ({
      evaluated: true,
      input: res,
      display: exp + " = " + res,
      isDecimalDisabled: false,
      result: res
    }));

    console.log(`display3: ${this.state.display}`)
    console.log(`addedOperator3: ${this.state.addedOperator}`)
    console.log(`evaluated3: ${this.state.evaluated}`)
    console.log(`result3: ${this.state.result}`)
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
          {/* <div id="display">{this.state.evaluated && this.state.result}</div> */}
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
              isKeyDisabled={this.state.isKeyDisabled}
            />
            <SpecialKeys
              specialKeys={specialKeys}
              value={"equals"}
              setSpecialKey={this.setSpecialKey}
              showResult={this.showResult}
              isKeyDisabled={this.state.isKeyDisabled}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
