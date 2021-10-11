import React, { VFC } from "react";

import { EventsAndInteraction } from "./models/EventsAndInteraction";
import { LoadingModels } from "./models/LoadingModels";
import { PointerLock } from "./models/PointerLock";

export const IndexPage: VFC = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* <EventsAndInteraction /> */}
      {/* <LoadingModels /> */}
      <PointerLock />
    </div>
  );
};
