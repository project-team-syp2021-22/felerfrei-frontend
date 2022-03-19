//todo in den Pages: signup, login, reset(nur index) sind exacte kopien dieser beiden Funktionen aber ich weiß nd wie ich von dort auf die zugreifen kann

function validateEmail(ref) {
    if (ref.current == null || ref.current === "") {
        return false;
    }
    const exp = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    return !exp.test(ref.current.value.trim().toLowerCase());
}

function validateInput(validation, ref) {
    if (validation(ref)) {
        ref.current.style.backgroundColor = "rgba(255, 52, 52, 0.2"
    } else {
        ref.current.style.backgroundColor = "white"
    }
}

function validateName(ref) {
    if (ref.current == null || ref.current === "") {
        return false;
    }
    const exp = new RegExp(/^[A-Za-z-ÄÜÖäüöß\s-]*$/g)
    return !exp.test(ref.current.value);
}