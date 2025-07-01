import { Tooltip } from "@excalidraw/excalidraw/components/Tooltip";
import { shield } from "@excalidraw/excalidraw/components/icons";
import { useI18n } from "@excalidraw/excalidraw/i18n";

export const EncryptedIcon = () => {
  const { t } = useI18n();

  return (
    <span
      className="encrypted-icon tooltip"
      style={{
        cursor: "pointer",
      }}
      rel="noopener"
      aria-label={t("encrypted.link")}
    >
      <Tooltip label={`End to end encrypted`} long={false}>
        {shield}
      </Tooltip>
    </span>
  );
};
