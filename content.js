function getPageContext() {
    const pageTitle = document.title; // Simple example, you can refine this
    const urlPath = window.location.pathname;
  
    return { pageTitle, urlPath };
  }
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === "highlight") {
      const element = document.querySelector(message.selector);
      if (element) {
        element.style.border = "2px solid red";
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else if (message.command === "getContext") {
      sendResponse(getPageContext());
    }
  });
  