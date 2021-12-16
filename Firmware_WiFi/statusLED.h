#include <jled.h>

#define LED_BUILTIN 2
#define ACTIVE_MODE 0
#define IDLE_MODE 1
#define AP_MODE 2
// blink internal LED every second; 1 second on, 1 second off.
auto led = JLed(LED_BUILTIN).Blink(1000, 1000).Forever();

void ledState(uint8_t v){
    if(v==ACTIVE_MODE){//activve
        led=JLed(LED_BUILTIN).Blink(200, 200).Forever();
    }
    else if(v==IDLE_MODE){//idle
        led=JLed(LED_BUILTIN).Blink(200, 3000).Forever();
    }
    else if(v==AP_MODE){//wifi not connected, ap mode
        led=JLed(LED_BUILTIN).Blink(1000, 1000).Forever();
    }
}

void loopLEDHandler() {
  led.Update();
}