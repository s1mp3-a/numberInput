const ANGLE_STEP = 15
const ANGLE_LIMIT = 90

const numberSlider = document.getElementById('phone-number')

const getAngle = (matrix) => {
    let sc_x = DOMMatrix.fromMatrix(matrix).a
    sc_x = Math.abs(sc_x) > 1. ? 1. * Math.sign(sc_x) : sc_x
    const angle = Math.acos(sc_x)
    // console.log(sc_x, angle * 180. / Math.PI * Math.sign(matrix.b))
    return angle * Math.sign(matrix.b)
}

const radToDeg = (angle) => {
    return angle * 180. / Math.PI
}

const clampRotation = (matrix, angle) => {
    const currentAngleDeg = radToDeg(getAngle(matrix))
    if (Math.abs(currentAngleDeg + angle) > ANGLE_LIMIT) {
        const diff = ANGLE_LIMIT - Math.abs(currentAngleDeg)
        return DOMMatrix.fromMatrix(matrix).rotate(diff * Math.sign(currentAngleDeg))
    }
    return DOMMatrix.fromMatrix(matrix).rotate(angle)
}

const rotateClockwise = (event) => {
    const matrix = new WebKitCSSMatrix(window.getComputedStyle(numberSlider).transform)
    const newMatrix = clampRotation(matrix, ANGLE_STEP)
    numberSlider.style.transform = newMatrix
}

const rotateAntiClockwise = (event) => {
    const matrix = new WebKitCSSMatrix(window.getComputedStyle(numberSlider).transform)
    const newMatrix = clampRotation(matrix, -ANGLE_STEP)
    numberSlider.style.transform = newMatrix
}

document.getElementById('rotate-clockwise').addEventListener('click', rotateClockwise)
document.getElementById('rotate-anti-clockwise').addEventListener('click', rotateAntiClockwise)

document.onkeydown = function (e) {
    switch (e.key) {
        case "ArrowLeft":
            rotateAntiClockwise(e)
            break;
        case "ArrowRight":
            rotateClockwise(e)
            break;
    }
}