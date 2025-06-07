import { debug } from "warlocks-common/debug";
import * as constants from "warlocks-common/constants";
import { MessageType } from "warlocks-common/message-type";

// Circular reference to globalThis
globalThis.g = globalThis;

// Debuging
g.debug = debug;

// Global constants
g.constants = constants;

// Global Message types
g.MessageType = MessageType;
