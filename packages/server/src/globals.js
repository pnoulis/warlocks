import { debug } from "warlocks-common/debug";
import * as constants from "warlocks-common/constants";

globalThis.debug = debug;
for (const constant in constants) {
  globalThis[constant] = constants[constant];
}
