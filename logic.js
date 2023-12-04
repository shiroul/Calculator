let resultString = ''
let tempResult = null
let operator 
let dot = false
var resultOperator = document.getElementById('operator')
const result = document.getElementById('result')

function removeSparator(output){
    if(output == ''){
        return '0'
    }
    return output.replace(/,/g,'')
}

function handleSparator(len, output){
    var temp = output.substring(0,len%3)

    for(let i=0;i<parseInt(len/3);i++){
        temp+= ','
        temp+= output.substring(len%3 + 3*i, len%3 + 3*i+3)
    }
    if(len%3 === 0){
        output = temp.substring(1)
        return output
    }
    resultString = temp

    return temp
}

function limiter(){
    if(dot){
        return true
    }
    if(resultString.length<4){
        return true
    }

    resultString = removeSparator(resultString)
    var len = resultString.length
    if(len>9){
        resultString = resultString.substring(0, len-1)
        return false
    }
    resultString = handleSparator(len, resultString)
    return true
}

function handleOperator(button, resultOperator){
    resultOperator.textContent = button

    if(operator == ','){
        if(resultString == ''){
            resultString = tempResult
            tempResult = null
        }
    }

    if(!tempResult){
        operator = button
        tempResult = removeSparator(resultString)
        resultString = ''
        return false
    }

    try{
        tempResult = eval(tempResult + operator + removeSparator(resultString)).toString()
    }catch (error){
        operator = button
        return false
    }
    if(tempResult == Infinity){
        resultString = 'ERROR'
        tempResult = null
        return true
    }

    if(parseFloat(tempResult)%1 != 0){
        resultString = (parseFloat(removeSparator(tempResult.split('.')[0]) + '.' + tempResult.split('.')[1]).toPrecision(4)).toString()
        operator = button
        return true
    }
    resultString = handleSparator(tempResult.length, tempResult)
    operator = button
    return true
}

document.addEventListener("DOMContentLoaded", function() {

    var buttons = document.querySelectorAll("#calcu input[type='button']");
    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            var buttonText = this.value;
    
            switch (buttonText) {
                case "=":
                    handleOperator(buttonText, resultOperator)
                    if(resultString == ''){
                        result.textContent = 0
                    }else{
                        result.textContent = resultString
                    }
                    tempResult = resultString
                    resultString = ''
                    resultOperator.textContent = '.'
                    operator = ','
                    dot = false
                    break;
                case "+":
                    if(handleOperator(buttonText, resultOperator)){
                        result.textContent = resultString
                        resultString = ''
                    }
                    dot = false
                    break
                case "-":
                    if(handleOperator(buttonText, resultOperator)){
                        result.textContent = resultString
                        resultString = ''
                    }
                    dot = false
                    break
                case "/":
                    if(handleOperator(buttonText, resultOperator)){
                        result.textContent = resultString
                        resultString = ''
                    }
                    dot = false
                    break
                case "*":
                    if(handleOperator(buttonText, resultOperator)){
                        result.textContent = resultString
                        resultString = ''
                    }
                    dot = false
                    break
                case "c":
                    resultString = ''
                    tempResult = null
                    operator = '.'
                    result.textContent = '0'
                    resultOperator.textContent = '.'
                    dot = false
                    break;
                case ".":
                    if(!dot){
                        dot = true
                        resultString += buttonText;
                        if(limiter()){
                            result.textContent = resultString
                        }
                    }
                    break
    
                default:
                    resultString += buttonText;
                    if(limiter()){
                        result.textContent = resultString
                    }
                    break;
            }
        });
    
    });
});


document.addEventListener('keydown', function(event){
    let input = event.key
    if(input == 'Enter'){
        input = '='
    }

    if(input == 'Backspace'){
        input = 'c'
    }
    
    try{
        document.getElementById(input).click()
    }catch (error){

    }
});
