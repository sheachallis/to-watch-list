import { UAParser } from "ua-parser-js";
import WatchListItem from "./models/WatchListItem";

const webShareApiDeviceTypes: string[] = ["mobile", "smarttv", "wearable"];
const parser = new UAParser();
const browser = parser.getBrowser();
const device = parser.getDevice();

export const shareStatus = (
  title: string,
  content: WatchListItem[],
  handleShareToClipboard = () => {}
) => {
  const textToShare = generateShareText(title, content);

  const shareData = { text: textToShare };

  let shareSuccess = false;

  try {
    if (attemptShare(shareData)) {
      navigator.share(shareData);
      shareSuccess = true;
    }
  } catch (error) {
    shareSuccess = false;
  }

  if (!shareSuccess) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare).then(handleShareToClipboard);
    } else {
      throw new Error("Failed to copy list to clipboard");
    }
  }
};

function generateShareText(title: string, content: WatchListItem[]): string {
  if (content.length === 0) {
    throw new Error("List '" + title + "' is empty");
  }

  let list = title + "\n\n" + convertWatchListItems(content);

  return list;
}

function convertWatchListItems(content: WatchListItem[]) {
  return content
    .map(
      (item, index) => index + 1 + ".\t" + item.title + " (" + item.year + ")"
    )
    .join("\n");
}

const attemptShare = (shareData: object) => {
  return (
    // Deliberately exclude Firefox Mobile, because its Web Share API isn't working correctly
    browser.name?.toUpperCase().indexOf("FIREFOX") === -1 &&
    webShareApiDeviceTypes.indexOf(device.type ?? "") !== -1 &&
    navigator.canShare &&
    navigator.canShare(shareData) &&
    navigator.share
  );
};
