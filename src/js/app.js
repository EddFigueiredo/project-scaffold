import '../css/main.scss'

var showAlert = function() {
	alert('clicked')
}

$('#test').click(function(e) {
	showAlert()
})