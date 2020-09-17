import * as React from "react";
import styled from "styled-components";

import Panel from "./Panel";
import Display from "./Display";
import History from "./History"
import ButtonGroup from "./ButtonGroup";
import Button from "./Button";

const Container = styled.div`
  margin: 30px auto;
  text-align: center;
`;

// TODO: History 내에서 수식 표시할 때 사용
const Box = styled.div`
  display: inline-block;
  width: 270px;
  height: 65px;
  padding: 10px;
  border: 2px solid #000;
  border-radius: 5px;
  text-align: right;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
  cursor: pointer;
  h3 {
    margin: 0px;
  }
  font-size: 18px;
  font-weight: bold;
  padding: 0 15px;
  color: #000;
`;


const evalFunc = function(string) {
  // eslint-disable-next-line no-new-func
  if(string.indexOf("√") != -1) {
    string = string.replace('√', '');
    return Math.sqrt(evalFunc(string));
  }

  string = string.replace(/×/gi, "*");
  string = string.replace(/÷/gi, "/");

  return new Function("return (" + string + ")")();
};

class Calculator extends React.Component {
  // TODO: history 추가
  state = {
    displayValue: "",
    history: [],
    dot: 1,
  };

  Click = (e) => {
    console.log(e.target);
    this.setState({
      displayValue: e.target.getAttribute('id'),
    });
  }

  onClickButton = key => {
    let { displayValue = "" } = this.state;
    displayValue = "" + displayValue;
    const lastChar = displayValue.substr(displayValue.length - 1);
    const operatorKeys = ["÷", "×", "-", "+"];
    const proc = {
      AC: () => {
        this.setState({
          displayValue: "",
          dot : 1,
         });
      },
      BS: () => {
        if (displayValue.length > 0) {
          displayValue = displayValue.substr(0, displayValue.length - 1);
        }
        if(lastChar == "."){
          this.setState({
            displayValue : displayValue,
            dot : 1,
           });
        }else if(displayValue.indexOf(".") != -1 && operatorKeys.includes(lastChar)){
          this.setState({
            displayValue : displayValue,
            dot : 0,
           });
        }else{
          this.setState({ displayValue });
        }
      },
      // TODO: 제곱근 구현
      "√": () => {
        let temp = displayValue;

        if (lastChar !== "" && !operatorKeys.includes(lastChar)) {
          this.setState({
            displayValue: Math.sqrt(evalFunc(displayValue)),
            history : ["√("+ temp +")",...this.state.history]
          });
        }
      },
      // TODO: 사칙연산 구현
      "÷": () => {
        if (lastChar !== "." && lastChar !== "" && !operatorKeys.includes(lastChar)) {
          this.setState({
            displayValue: displayValue + "÷",
            dot : 1,
           });
        }
      },
      "×": () => {
        if (lastChar !== "." && lastChar !== "" && !operatorKeys.includes(lastChar)) {
          this.setState({
            displayValue: displayValue + "×",
            dot : 1,
           });
        }
      },
      "-": () => {
        if (lastChar !== "." && lastChar !== "" && !operatorKeys.includes(lastChar)) {
          this.setState({
            displayValue: displayValue + "-",
            dot : 1,
           });
        }
      },
      "+": () => {
        // + 연산 참고하여 연산 구현
        if (lastChar !== "." && lastChar !== "" && !operatorKeys.includes(lastChar)) {
          this.setState({
            displayValue: displayValue + "+",
            dot : 1,
           });
        }
      },
      "=": () => {
        let temp = displayValue;
        if(displayValue !== ""){
          if (lastChar !== "" && operatorKeys.includes(lastChar)) {
            temp = temp.substr(0, temp.length -1);
            displayValue = displayValue.substr(0, displayValue.length - 1);
          }else if (lastChar == "."){
            temp = temp.substr(0, temp.length -1);
            displayValue = displayValue.substr(0, displayValue.length - 1);
          }else if (lastChar !== "") {
            displayValue = evalFunc(displayValue);
          }

          this.setState({
            displayValue : displayValue,
            history : [temp, ...this.state.history],
            dot : 1,
           });
        }

      },
      ".": () => {
        if (lastChar !== "" && lastChar !== "." && this.state.dot && !operatorKeys.includes(lastChar)) {
          this.setState({
            displayValue: displayValue + ".",
            dot : 0,
          });
        }
      },
      "0": () => {
        if (Number(displayValue) !== 0) {
          displayValue += "0";
          this.setState({ displayValue });
        }
      }
    };

    if (proc[key]) {
      proc[key]();
    } else {
      // 여긴 숫자
      this.setState({ displayValue: displayValue + key });
    }
  };

  render() {
    return (
      <Container>
        <Panel>
          <Display displayValue={this.state.displayValue} />
          <ButtonGroup onClickButton={this.onClickButton}>
            <Button size={1} color="gray">
              AC
            </Button>
            <Button size={1} color="gray">
              BS
            </Button>
            <Button size={1} color="gray">
              √
            </Button>
            <Button size={1} color="gray">
              ÷
            </Button>

            <Button size={1}>7</Button>
            <Button size={1}>8</Button>
            <Button size={1}>9</Button>
            <Button size={1} color="gray">
              ×
            </Button>

            <Button size={1}>4</Button>
            <Button size={1}>5</Button>
            <Button size={1}>6</Button>
            <Button size={1} color="gray">
              -
            </Button>

            <Button size={1}>1</Button>
            <Button size={1}>2</Button>
            <Button size={1}>3</Button>
            <Button size={1} color="gray">
              +
            </Button>

            <Button size={2}>0</Button>
            <Button size={1}>.</Button>
            <Button size={1} color="gray">
              =
            </Button>
          </ButtonGroup>
        </Panel>
        {/* TODO: History componet를 이용해 map 함수와 Box styled div를 이용해 history 표시 */}
        <History>
          {this.state.history.map((history) => {
            return(
              <Box id = {history} onClick={this.Click}>
                <h3 id={history}>{history}</h3>
                <h3 id={history}>{"= " + evalFunc(history)}</h3>
              </Box>
            )
          })}
        </History>

      </Container>
    );
  }
}

export default Calculator;
