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

  // Add search cancel buttons
  addSearchCancelButtons();
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

export function addSearchCancelButtons() {
  // Find the search forms
  const searchForms = document.getElementsByClassName("pagefind-ui__form");

  for (const searchForm of searchForms) {
    // Check if there already exists a cancel button
    const existingCancelButton = searchForm.querySelector(
      ".search-cancel-button",
    );

    if (existingCancelButton) {
      return;
    }

    // Create a container for the cancel button
    const cancelButtonContainer = document.createElement("div");

    // Set class name
    cancelButtonContainer.className = "search-cancel-button-container";

    // Create a cancel button
    const cancelButton = document.createElement("button");

    // Set class name
    cancelButton.className = "search-cancel-button";

    // Set text content
    cancelButton.textContent = "Cancel";

    // Set up the click event handler
    cancelButton.onclick = () => {
      console.log("cancel");

      // Close the search dialog
      closeSearchDialog();
    };

    // Attach the cancel button to the cancel button container
    cancelButtonContainer.appendChild(cancelButton);

    // Attach the cancel button container to the search form
    searchForm.appendChild(cancelButtonContainer);
  }
}
