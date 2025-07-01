/* eslint-disable no-console */
import { defaultLang } from "@excalidraw/excalidraw/i18n";
import { UI } from "@excalidraw/excalidraw/tests/helpers/ui";
import {
  screen,
  fireEvent,
  waitFor,
  render,
} from "@excalidraw/excalidraw/tests/test-utils";

import ExcalidrawApp from "../App";

describe("Test LanguageList", () => {
  it("rerenders UI on language change", async () => {
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

    // select rectangle tool to show properties menu
    UI.clickTool("rectangle");
    // english lang should display `thin` label
    expect(screen.queryByTitle(/thin/i)).not.toBeNull();
    fireEvent.click(document.querySelector(".dropdown-menu-button")!);

    fireEvent.change(document.querySelector(".dropdown-select__language")!, {
      target: { value: "de-DE" },
    });
    // switching to german, `thin` label should no longer exist
    await waitFor(() => expect(screen.queryByTitle(/thin/i)).toBeNull());
    // reset language
    fireEvent.change(document.querySelector(".dropdown-select__language")!, {
      target: { value: defaultLang.code },
    });
    // switching back to English
    await waitFor(() => expect(screen.queryByTitle(/thin/i)).not.toBeNull());
  });
});
