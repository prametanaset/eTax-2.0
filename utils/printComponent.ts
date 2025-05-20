/*
 * if print a Component is display
 * e.g. const someRefNameComponent = ref<HTMLElement | null>(null);
 * use argument (someRefNameComponent.innerHTML)
 *
 * if print a custom Component is non-display or disappear
 * e.g. const someStringHtml = `
 *   <h1>Invoice Test Drive</h1>
 *   <p>This is the content to print.</p>
 * `
 * use argument (someStringHtml)
 *
 */

export default (printSection: string) => {
  if (!printSection) return;

  // Create a hidden iframe
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.top = "-10000px";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  document.body.appendChild(iframe);

  // Get the iframe's document
  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) {
    console.error("Failed to access iframe document");
    return;
  }

  // Build the HTML structure inside the iframe
  const html = iframeDoc.createElement("html");
  const head = iframeDoc.createElement("head");
  const body = iframeDoc.createElement("body");

  // Add custom styles
  const style = iframeDoc.createElement("style");
  style.textContent = `
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    h1 {
      color: #333;
    }
  `;
  head.appendChild(style);

  // Copy content to the iframe body
  if (printSection) {
    // body.innerHTML = printSection.value.innerHTML;
    body.innerHTML = printSection;
  } else {
    body.innerHTML = `
      <h1>Invoice</h1>
      <p>This is the content to print.</p>
    `;
  }

  // Append head and body to the HTML element
  html.appendChild(head);
  html.appendChild(body);

  // Replace the iframe's content with the newly built HTML
  iframeDoc.documentElement.innerHTML = html.outerHTML;

  // Trigger the print
  iframe.contentWindow?.focus();
  iframe.contentWindow?.print();

  // Cleanup the iframe after printing
  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 1000);
};
