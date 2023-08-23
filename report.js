const outputLog = document.getElementById('outputLog');

var textAreaContent = '';

function updateTextArea( text ) {
    textAreaContent += new Date().toLocaleTimeString() + ' - ';
    textAreaContent += text;
    textAreaContent += '\n';
    outputLog.innerHTML = textAreaContent;
    outputLog.scrollTop = outputLog.scrollHeight;
}




