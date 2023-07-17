const previousOperationsText = document.querySelector("#previous-operation");
const currentOperationsText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator{
    constructor(previousOperationsText, currentOperationsText){
        this.previousOperationsText = previousOperationsText;
        this.currentOperationsText = currentOperationsText;
        this.currentOperation = "";
    }
    //add digit to calculator screen
    addDigit(digit){
        console.log(digit);
        //check if current operation already have a dot
        if(digit === "." && currentOperationsText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //process all operations calculator
    processOperation(operation){
        //check if current is empty
        if (this.currentOperationsText.innerText === "" && operation !== "C") {
            //Change operation
            if (this.previousOperationsText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        //get current and previous values
        let operationValue;
        const previous = + this.previousOperationsText.innerText.split(" ")[0];
        const current = + this.currentOperationsText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;   
            case "C":
                this.processClearAllOperation();
                break;     
            case "=":
                this.processEqualOperator();
                break;  
            default:
                return;
        }
    }

    updateScreen(operationValue = null, operation = null, current = null, previous = null){
        
        if(operationValue === null){
            this.currentOperationsText.innerText += this.currentOperation; 
        }
        else{
            //check if value is Zero, if it is just add the current value
            if (previous === 0) {
                operationValue = current;
            }
            // Add current value to the previous value
            this.previousOperationsText.innerText = `${operationValue} ${operation}`;
            this.currentOperationsText.innerText = "";
        }
    }

    // Change math operation
    changeOperation(operation){
        const mathOperations = ["*", "/", "+", "-"];
        if (!mathOperations.includes(operation)) {
            return;    
        }
        this.previousOperationsText.innerText = this.previousOperationsText.innerText.slice(0,-1) + operation;
    }

    // delete the last digit
    processDelOperator(operation){
        this.currentOperationsText.innerText = this.currentOperationsText.innerText.slice(0,-1);
    }

    // clear current operation
    processClearCurrentOperation(operation){
        this.currentOperationsText.innerText = "";
    }

    // clear all operation
    processClearAllOperation(operation){
        this.currentOperationsText.innerText = "";
        this.previousOperationsText.innerText = "";
    }


        // process an operation
    processEqualOperator(operation){
        console.log("a processar o igual");
        let eq_operation = previousOperationsText.innerText.split(" ")[1];
        console.log(eq_operation);
        this.processOperation(eq_operation);
    }
    
}

const calc = new Calculator(previousOperationsText, currentOperationsText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        //console.log(value);
        if(+value >= 0 || value === "."){
            calc.addDigit(value);
        }
        else{
            calc.processOperation(value);
        }
    })
})