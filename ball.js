const MAX_SLIDER_VALUE = 9999999999.
const MIN_SLIDER_VALUE = 0.

const MASS = 10.
const FRICTION_COEFFICIENT = .8
const MAX_VELOCITY = 5.
const VELOCITY_MULTIPLIER = MAX_SLIDER_VALUE / 1000.
const G = 9.8

const SIM_RATE = 60.
const TIME_STEP = 1000. / SIM_RATE

const slider = document.getElementById('phone-number')
slider.value = MAX_SLIDER_VALUE / 2.
const phone = document.getElementById('phone-number-value')

let ballVelocity = 0.

function computeVelocity() {
    const transformMatrix = new WebKitCSSMatrix(window.getComputedStyle(slider).transform)
    const sin = transformMatrix.b > 1 ? 1. : transformMatrix.b

    const gravityForce = G * MASS
    const acceleration = (gravityForce / MASS) * sin
    
    ballVelocity += acceleration
    ballVelocity *= FRICTION_COEFFICIENT

    if (Math.abs(ballVelocity) < 1e-3) {
        ballVelocity = 0.
    }
}

function updateSliderValue() {
    slider.value = Number(slider.value) + VELOCITY_MULTIPLIER * ballVelocity
}

const formatPhone = (val) => {
    const pt1 = String((val / 10000000) >> 0).padStart(3, '0')
    const pt2 = String((val % 10000000 / 10000) >> 0).padStart(3, '0')
    const pt3 = String((val % 10000 / 100) >> 0).padStart(2, '0')
    const pt4 = String((val % 100) >> 0).padStart(2, '0')
    return `(${pt1})-${pt2}-${pt3}-${pt4}`
}
function updateTextValue() {
    phone.textContent = formatPhone(Number(slider.value));
}

function updateBounds() {
    if (slider.value <= MIN_SLIDER_VALUE) {
        slider.value = 0
        ballVelocity = 0.
        return
    }

    if (slider.value >= MAX_SLIDER_VALUE) {
        slider.value = MAX_SLIDER_VALUE
        ballVelocity = 0.
        return
    }
}


async function loop() {
    while (true) {
        computeVelocity()
        updateSliderValue()
        updateTextValue()
        updateBounds()
        console.log(ballVelocity)
        await new Promise(r => setTimeout(r, TIME_STEP));
    }
}

(async () => await loop())()