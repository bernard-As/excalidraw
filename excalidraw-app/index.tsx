/* eslint-disable no-console */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

import "../excalidraw-app/sentry";

import ExcalidrawApp from "./App";

window.__EXCALIDRAW_SHA__ = import.meta.env.VITE_APP_GIT_SHA;
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
registerSW();
root.render(
  <StrictMode>
    <ExcalidrawApp
      id={`${Math.floor(Math.random() * 10) + 1}`}
      roomId={"518ffafc5a00978e4b55"}
      roomKey={"yzPUuXO0nGGKZP99lNqAEA"}
      username={`test user ${Math.floor(Math.random() * 10) + 1}`}
      libraryItems={[]}
      closeBoard={() => console.log("closing")}
      viewModeEnabled={false}
      zenModeEnabled={false}
      gridModeEnabled={false}
      handleTextToDiagram={async (input) => {
        console.log("handleTextToDiagram called with input:", input);
        const generatedResponse = `graph TD
  A[Start] --> B[Initialize Server]
  B --> C{Is configuration valid?}
  C -- Yes --> D[Load Configuration]
  C -- No --> E[Display Error and Exit]
  D --> F[Start Server Socket]
  F --> G[Listen for Connections]
  G --> H{Incoming Connection?}
  H -- Yes --> I[Handle Connection]
  I --> G
  H -- No --> J[Shutdown if Stopped]
  J --> K[Stop Server]
  K --> L[Cleanup Resources]
  L --> M[End]`;
        const rateLimit = 1000; // 1 second
        const rateLimitRemaining = 5; // 5 requests remaining
        // Simulate a response
        return { generatedResponse, rateLimit, rateLimitRemaining };
      }}
    />
  </StrictMode>,
);
