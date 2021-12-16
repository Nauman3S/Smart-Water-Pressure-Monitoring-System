#define RELAY_PIN 14
#include "GPRS.h"
#include "ads.h"
#include "pressureLimits.h"

String relayStateN="OFF";
void relayState(int v){
    if(v==0){
        digitalWrite(RELAY_PIN, 0);
        relayStateN="OFF";
    }
    else if(v==1){
        digitalWrite(RELAY_PIN, 1);
        relayStateN="ON";
    }
}
void setup(){
    Serial.begin(115200);
    pinMode(RELAY_PIN, OUTPUT);
    digitalWrite(RELAY_PIN, 0);
    setupGPRS();
    setupADS();

}

void checkLimits(){
    String event="";
    if(getPressure().toFloat()>=relayOnLimit){
        relayState(1);
        event=String(getPressure())+String("ON");
        mqtt.publish(topicPressureEventChange, event.c_str());

    }

    else if(getPressure().toFloat()<=relayOffLimit){
        relayState(0);
        event=String(getPressure())+String("OFF");
        mqtt.publish(topicPressureEventChange, event.c_str());

    }

}

void loop(){
    mqtt.publish(topicPressureSensorStatus, getPressure().c_str());
    
    mqtt.publish(topicPressureSensorLive, getPressure().c_str());
    mqtt.publish(topicPressureRelayLive, relayStateN.c_str());
    
    

    loopGPRS();
}