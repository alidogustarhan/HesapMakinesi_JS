const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');


let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue= false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
    // BU FONKSIYONUN İŞLEVİ QUERYSLEECTOR ILE SECTIGIMI display e 
    // dışarda degisken olarak atadıgımız displayValue degerını atamaktır.
}

// BU NOKTADA ŞUNA DİKKAT ETMELİYİZ .YUKARDA SEÇTİĞİMİZ keys kısmı
// genel bir div alanıdır. Ben button yerine boşluğa tıklarsam işlem yapmaması için
// bazı sınırlamalar yapmam gerekir. Aşağıda bunu yaptık.
keys.addEventListener('click', function(e) {
    const element = e.target;
    //Target komutu ile click yapılan elemente ulaştık.
    if (!element.matches('button')) return;
    // TIKLADIĞIMIZ YER BUTTON DEGILSE YANİ DIV IN ICINDEKI HERHANGI BIR BOSLUKSA
    // (CUNKU BURDA GERI KALANLARIN HEPSI BUTTON) DIREK RETURN YAP HİÇ ÇALIŞTIRMA
    // DEDİK.


    //ARTIK BOŞLUK İLE İLGİLİ BİR HATAMIZ KALMADI. ŞİMDİKİ TESPİTİMİZ
    //TIKLANAN BUTONUN BİR SAYI MI YOKSA OPERATÖR BUTONU MU YOKSA NE BUTONU
    //OLDUĞUNU TESPİT AŞAMASIDIR.
    if(element.classList.contains('operator')) {
        //console.log('operator', element.value);
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if(element.classList.contains('decimal')) {
        // console.log('decimal', element.value);
        inputDecimal();
        updateDisplay();
        return;
    }

    if(element.classList.contains('clear')) {
        // console.log('clear', element.value);
        clear();
        updateDisplay();
        return;
    }

    // console.log('number', element.value);
    inputNumber(element.value);
    updateDisplay();
});

function handleOperator(nextOperator){
    const value = parseFloat(displayValue);

    if(operator && waitingForSecondValue){
        operator=nextOperator;
        return;
    }
    
    if(firstValue === null){
        firstValue = value;
    }else if(operator){
        const result = calculate(firstValue,value,operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }
    waitingForSecondValue = true;
    operator= nextOperator;
}

function calculate(first,second,operator){
    if(operator === '+'){
        return first + second;
    }else if (operator === '-'){
        return first - second;
    }else if (operator === '*'){
        return first * second;
    }else if (operator === '/'){
        return first / second;
    }

    return second;
}

function inputNumber(num) {
    if(waitingForSecondValue){
        displayValue = num;
        waitingForSecondValue=false;
    }
        else{
            displayValue = displayValue === '0'? num: displayValue + num;
    //kullanıcıdan ınput alma videosu 7.30 - 9.30
            }       
        }
    

    displayValue = displayValue === '0'? num: displayValue + num;
    //kullanıcıdan ınput alma videosu 7.30 - 9.30


function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        //bu kod basit
    }
}

function clear() {
    displayValue = '0';
    //bu kod basit 
}

//HESAPLAMANIN YAPILMASI ADLI VİDEOYU İZLEMELİSİN.