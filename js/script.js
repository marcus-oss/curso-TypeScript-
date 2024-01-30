    const previousOperatiosText = document.querySelector("#previous-operations");
    const currentOperationText = document.querySelector("#current-operation");
    const buttons = document.querySelectorAll("#buttons-container button");

    class  Calculator {

        constructor(previousOperatiosText, currentOperationText){
            this.previousOperatiosText = previousOperatiosText
            this.currentOperationText = currentOperationText
            this.currentOperation = ""
        }

        //add digit to calculator screen 
        addDigit(digit){
            //check if current operation already as dot 
            if(digit === "." && this.currentOperationText.innerText.includes(".")){
                return;
            }
            this.currentOperation = digit; 
            this.updateScreen();
        }
        //process al calculator operations 
        processOperation(operation){ 
            //check if current value is empty 
            if(this.currentOperationText.innerText === "" && operation !== "C" ){
                //change operation
                if(this.previousOperatiosText.innerText !== "") {
                    this.changeOperation(operation);
                }
                return;
            }
            //get current andprevious values 
           let operationValue;
            const previous =  +this.previousOperatiosText.innerText.split(" ")[0]; 
            const current =  +this.currentOperationText.innerText;

            switch(operation){
                case "+":
                operationValue = previous + current; 
                this.updateScreen(operationValue,operation,current,previous);
                break;
                case "-":
                operationValue = previous - current; 
                this.updateScreen(operationValue,operation,current,previous);
                break;
                case "/":
                operationValue = previous / current; 
                this.updateScreen(operationValue,operation,current,previous);
                break;
                case "*":
                operationValue = previous * current; 
                this.updateScreen(operationValue,operation,current,previous);
                break;
                case "DEL":
                this.processDelOperator();
                break;
                case "CE":
                this.proccesClearCurrentOperantion();
                break;
                case "C":
                this.proccesClearAlloperation();
                break;
                case "=":
                this.processEqualsOperator();
                break;
                default:
                return;        
            }

        }
        //change values of the calculator screen 
        updateScreen(
            operationValue = null, 
            operation = null, 
            current = null, 
            previous = null
            ) {
           if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;

           }else{
            //check if value  is zero , if  is just and add current value 
            if(previous === 0) {
                operationValue = current
            } 
            //add current to previus 
            this.previousOperatiosText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
           }

        }
        // change math operation 
        changeOperation(operation) {

        const mathOperation = ["*", "/" , "+", "-"];

        if(!mathOperation.includes(operation)){
            return
        }
        this.previousOperatiosText.innerText = 
        this.previousOperatiosText.innerText.slice(0, -1) + operation;
    
    }
    
    //delete the last digit
    processDelOperator(){
        this.currentOperationText.innerText = 
        this.currentOperationText.innerText.slice(0, -1)
    }
    
    //clear current operation 
    proccesClearCurrentOperantion(){
        this.currentOperationText.innerText = "";
    }

    //clear all operations 
    proccesClearAlloperation(){
        this.currentOperationText.innerText = "";
        this.previousOperatiosText.innerText = "";
    }
    //process and operation
    processEqualsOperator(){
      
        const operation = previousOperatiosText.innerText.split(" ")[1];


        this.processOperation(operation);
    }

    }
   
    const calc = new  Calculator(previousOperatiosText, currentOperationText);

    buttons.forEach((btn) => {

            btn.addEventListener("click", (e) =>{

                    const value = e.target.innerText;

                    if(+value >= 0 || value === "."){
                        calc.addDigit(value); 
                    }else {
                        calc.processOperation(value);
                    }
              })
    });