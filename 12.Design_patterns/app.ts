import { Client } from "./src/client";
import { MockGui } from "./src/mock_gui";

const mock = new MockGui();
const CLIENT = new Client(mock);

CLIENT.shipmentString;
/* 
Shipment with the ID 123 will be picked up from 12292 4th Ave SE, Bellevue, Wa 67721 and shipped to 1313 Mockingbird Lane, Tulsa, OK 92021

Cost = 5.5

**MARK FRAGILE**

**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**

**MARK RETURN RECEIPT REQUESTED**
*/
