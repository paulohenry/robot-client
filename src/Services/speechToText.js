const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition
const recog = new speechRecognition()



recog.lang='pt-BR'
recog.continuous=true
recog.interimResults = false
recog.maxAlternatives = 1


export default recog