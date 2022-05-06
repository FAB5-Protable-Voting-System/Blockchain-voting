function showAlert(type, msg) {
    document.getElementById("alertContainer").innerHTML =
        '<div class="alert alert-' + type + '" role="alert">' + msg + "</div>";
    setTimeout(() => {
        document.getElementById("alertContainer").innerHTML = "";
    }, 5000);
}
