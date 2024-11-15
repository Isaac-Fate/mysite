import { sleep } from "@/lib/utils";

export function getSearchForms() {
  return document.getElementsByClassName(
    "pagefind-ui__form",
  ) as HTMLCollectionOf<HTMLFormElement>;
}

export function getSearchInputs() {
  return document.getElementsByClassName(
    "pagefind-ui__search-input",
  ) as HTMLCollectionOf<HTMLInputElement>;
}

export function getSearchClearButtons() {
  return document.getElementsByClassName(
    "pagefind-ui__search-clear",
  ) as HTMLCollectionOf<HTMLButtonElement>;
}

export function clearSearchInputs() {
  // Clear the input by clicking the clear button
  for (const clearButton of getSearchClearButtons()) {
    clearButton.click();
  }
}

export function getSearchDialog() {
  return document.getElementById("search-dialog");
}

export function openSearchDialog() {
  // Get the search dialog
  const searchDialog = getSearchDialog();

  if (!searchDialog) {
    return;
  }

  // Remove the hidden class
  searchDialog.classList.remove("hidden");

  // Remove the search-dialog-fade-out class
  searchDialog.classList.remove("search-dialog-fade-out");

  // Play fade-in animation and remove hidden
  searchDialog.classList.add("search-dialog-fade-in");
}

export async function closeSearchDialog() {
  // Get the search dialog
  const searchDialog = getSearchDialog();

  if (!searchDialog) {
    return;
  }

  // Remove the search-dialog-fade-in class
  searchDialog.classList.remove("search-dialog-fade-in");

  // Play fade-out animation and set hidden
  searchDialog.classList.add("search-dialog-fade-out");
  searchDialog.classList.add("hidden");

  // Delay clearing the search inputs
  await sleep(300);

  // Clear the search inputs
  clearSearchInputs();
}
