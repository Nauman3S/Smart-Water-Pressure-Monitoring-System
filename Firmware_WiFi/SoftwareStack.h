//Software Stack

class SoftwareStack
{
public:
#define DebugPrint(x) Serial.println(x)

    String StringSeparator(String data, char separator, int index);
    char *StrToCharArray(String data);
    String getMacAddress();

private:
    //  String configs="";
    char buf[100];
};

char *SoftwareStack::StrToCharArray(String data)
{
    data.toCharArray(this->buf, data.length() + 1);
    return this->buf;
}

String SoftwareStack::StringSeparator(String data, char separator, int index)
{

    int found = 0;
    int strIndex[] = {0, -1};
    int maxIndex = data.length() - 1;

    for (int i = 0; i <= maxIndex && found <= index; i++)
    {
        if (data.charAt(i) == separator || i == maxIndex)
        {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i + 1 : i;
        }
    }

    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}
String SoftwareStack::getMacAddress()
{
    String NodeID;
    NodeID = String(WiFi.macAddress());
    NodeID = StringSeparator(NodeID, ':', 0) + StringSeparator(NodeID, ':', 1) + StringSeparator(NodeID, ':', 2) + StringSeparator(NodeID, ':', 3) +
             StringSeparator(NodeID, ':', 4) + StringSeparator(NodeID, ':', 4) + StringSeparator(NodeID, ':', 5);

    return NodeID;
}
