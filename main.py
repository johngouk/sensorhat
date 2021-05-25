compass = 0
lastPin = -1
currentPin = -1
points = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW']
slots = [11.25, 33.75, 56.25, 78.75, 101.25, 123.75, 146.25, 168.75, 191.25, 213.75, 236.25, 258.75, 281.25, 303.75, 326.25, 348.75]
ports = [DigitalPin.P0,DigitalPin.P1,DigitalPin.P2,DigitalPin.P8,DigitalPin.P16, \
        DigitalPin.P5,DigitalPin.P6,DigitalPin.P7,DigitalPin.P8,DigitalPin.P9, \
        DigitalPin.P10,DigitalPin.P11,DigitalPin.P12,DigitalPin.P13,DigitalPin.P14, \
        DigitalPin.P15]

def getBearing(heading:int):
    for i in range(0,len(slots)-1):
        if heading < slots[i]:
            return i
    return 0


def on_forever():
    global compass
    global currentPin
    compass = input.compass_heading()
    bearing = getBearing(compass)
    currentPin = bearing
    if currentPin != -1:
        pins.digital_write_pin(ports[currentPin], 1)
        basic.pause(200)
        pins.digital_write_pin(ports[currentPin], 0)
#       led.toggle(2, 2)
        basic.pause(200)
    else:
        basic.pause(200)
#    basic.show_number(bearing)


def onIn_background():
    global currentPin
    while True:
        if currentPin != -1:
            pins.digital_write_pin(ports[currentPin], 1)
            control.wait_micros(1000000)
            pins.digital_write_pin(ports[currentPin], 0)
            led.toggle(3, 3)
        else:
            control.wait_micros(10000)


#control.in_background(onIn_background)

basic.forever(on_forever)
