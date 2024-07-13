const inputSlider = document.querySelector("[data-lengthSlider]")
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMSG]");
const uppercaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase")
const numbersCheck = document.querySelector("#numbers")
const symbolsCheck = document.querySelector("#symbols")
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allcheckBox = document.querySelectorAll("input[type=checkbox]");
const passwordDislay = document.querySelector("[data-passwordDisplay]")
console.log(allcheckBox)
const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let password = "";
let passwordLength = 10;
let checkcount = 0;
setIndicator("#ccc")
handleSlider()
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerHTML = passwordLength
    const min=inputSlider.min;
    const max=inputSlider.max;
    console.log("min:",min);
    console.log(" max:",max)
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%";
}
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomNumber() {
    return getRndInteger(0, 10);
}
function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}
function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
    const index = getRndInteger(0, symbol.length);
    return symbol.charAt(index)
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) { hasUpper = true; }
    if (lowercaseCheck.checked) { hasLower = true; }
    if (numbersCheck.checked) { hasNum = true; }
    if (symbolsCheck.checked) { hasSym = true; }

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0")
    }
    else if ((hasUpper || hasLower) && (hasNum || hasSym) && passwordLength >= 6) {
        setIndicator("#ff0")
    }
    else {
        setIndicator("#f00")
    }
}
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDislay.value);
        copyMsg.innerText = "copied";
    }
    catch (e) {
        copyMsg.innerText = "Failed"
    }
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000)
}
function handleCheckBoxChange() {
    checkcount = 0;
    allcheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            ++checkcount;
        }
    })
    //special condition
    if (passwordLength < checkcount) {
        passwordLength = checkcount;
        handleSlider()
    }
}
allcheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckBoxChange)
})
inputSlider.addEventListener("input", (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener("click", () => {
    if (passwordDislay.value) {
        copyContent();
    }
})
function sufflePassword(array)
{
    for(let i=array.length-1; i>0; i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j]
        array[j]=temp;
    } 
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
}
generateBtn.addEventListener("click", (e) => {

    if (checkcount <= 0) {
        return
    }
    if (passwordLength < checkcount) {
        passwordLength = checkcount
    }

    password = "";

    // if (uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }
    // if (lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }
    // if (numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }
    // if (symbolsCheck.checked) {
    //     password +=generateSymbol();
    // }

    let funArr = [];

    if (uppercaseCheck.checked) {
        funArr.push(generateUpperCase)
    }
    if (lowercaseCheck.checked) {
        funArr.push(generateLowerCase)
    }
    if (numbersCheck.checked) {
        funArr.push(generateRandomNumber)
    }
    if (symbolsCheck.checked) {
        funArr.push(generateSymbol)
    }

    for (let i = 0; i < funArr.length; ++i) {
       password+=funArr[i]();
    }
    

    for(let i=0; i<passwordLength-funArr.length; ++i)
        {
            let randomindex=getRndInteger(0,funArr.length);
            password+=funArr[randomindex]();
        }
         
        console.log(Array.from(password))
        password=sufflePassword(Array.from(password))
        passwordDislay.value=password;
        calcStrength();
})