/* eslint-disable no-console */
import { UI } from "@excalidraw/excalidraw/tests/helpers/ui";
import {
  mockBoundingClientRect,
  render,
  restoreOriginalGetBoundingClientRect,
} from "@excalidraw/excalidraw/tests/test-utils";

import ExcalidrawApp from "../App";

describe("Test MobileMenu", () => {
  const { h } = window;
  const dimensions = { height: 400, width: 800 };

  beforeAll(() => {
    mockBoundingClientRect(dimensions);
  });

  beforeEach(async () => {
    await render(
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
      />,
    );
    // @ts-ignore
    h.app.refreshViewportBreakpoints();
    // @ts-ignore
    h.app.refreshEditorBreakpoints();
  });

  afterAll(() => {
    restoreOriginalGetBoundingClientRect();
  });

  it("should set device correctly", () => {
    expect(h.app.device).toMatchInlineSnapshot(`
      {
        "editor": {
          "canFitSidebar": false,
          "isMobile": true,
        },
        "isTouchScreen": false,
        "viewport": {
          "isLandscape": false,
          "isMobile": true,
        },
      }
    `);
  });

  it("should initialize with welcome screen and hide once user interacts", async () => {
    expect(document.querySelector(".welcome-screen-center")).toMatchSnapshot();
    UI.clickTool("rectangle");
    expect(document.querySelector(".welcome-screen-center")).toBeNull();
  });
});
