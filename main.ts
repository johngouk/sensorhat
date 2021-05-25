let compass = 0
let lastPin = -1
let currentPin = -1
let points = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
let slots = [11.25, 33.75, 56.25, 78.75, 101.25, 123.75, 146.25, 168.75, 191.25, 213.75, 236.25, 258.75, 281.25, 303.75, 326.25, 348.75]
let ports = [DigitalPin.P0, DigitalPin.P1, DigitalPin.P2, DigitalPin.P8, DigitalPin.P16, DigitalPin.P5, DigitalPin.P6, DigitalPin.P7, DigitalPin.P8, DigitalPin.P9, DigitalPin.P10, DigitalPin.P11, DigitalPin.P12, DigitalPin.P13, DigitalPin.P14, DigitalPin.P15]
function getBearing(heading: number): number {
    for (let i = 0; i < slots.length - 1; i++) {
        if (heading < slots[i]) {
            return i
        }
        
    }
    return 0
}

//     basic.show_number(bearing)
function onIn_background() {
    
    while (true) {
        if (currentPin != -1) {
            pins.digitalWritePin(ports[currentPin], 1)
            control.waitMicros(1000000)
            pins.digitalWritePin(ports[currentPin], 0)
            led.toggle(3, 3)
        } else {
            control.waitMicros(10000)
        }
        
    }
}

// control.in_background(onIn_background)
basic.forever(function on_forever() {
    
    
    compass = input.compassHeading()
    let bearing = getBearing(compass)
    currentPin = bearing
    if (currentPin != -1) {
        pins.digitalWritePin(ports[currentPin], 1)
        basic.pause(200)
        pins.digitalWritePin(ports[currentPin], 0)
        //        led.toggle(2, 2)
        basic.pause(200)
    } else {
        basic.pause(200)
    }
    
})
