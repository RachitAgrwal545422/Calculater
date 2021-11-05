let history = document.querySelector(".history_voult");
let output = document.querySelector(".output_voult");
var getHistory = () => {
  return history.innerHTML;
};
var printHistory = (num) => {
  history.innerHTML = num;
};
var getOutput = () => output.innerHTML;
var printOutput = (num) => {
  if (num == "") {
    output.innerHTML = num;
  } else {
    output.innerHTML = getformatedNumber(num);
  }
};
var getformatedNumber = (num) => {
  if (num == "-") {
    return "";
  }
  var n = Number(num);
  var value = n.toLocaleString("en");
  return value;
};
var reverseNumberFormat = (num) => {
  return Number(num.replace(/,/g, ""));
};
var operators = Array.from(document.getElementsByClassName("operator"));
operators.forEach((op) => {
  op.addEventListener("click", (e) => {
    if (op.classList[1] == "clear") {
      printOutput("");
      printHistory("");
    } else if (op.classList[1] == "backspace") {
      var output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        output = output.substring(0, output.length - 1);
        printOutput(output);
      }
    } else {
      var output = getOutput();
      var history = getHistory();
      if (output == "" && history != "") {
        if (isNaN(history[history.length - 1])) {
          history = history.substring(0, history.length - 1);
        }
      }
      if (output != "" || history!="") {
        output = output==""?output:reverseNumberFormat(output);
        history = history + output;
        if (op.classList[1] == "=") {
          var result = eval(history);
          printOutput(result);
          printHistory("");
        } else {
          history += op.classList[1];
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
});
var numbers = Array.from(document.getElementsByClassName("number"));
numbers.forEach((num) => {
  num.addEventListener("click", (e) => {
    var number = reverseNumberFormat(getOutput());
    if (number != NaN) {
      number += num.classList[1];
      printOutput(number);
    }
  });
});
