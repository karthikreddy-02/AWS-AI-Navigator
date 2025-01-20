document.getElementById('submitQuery').addEventListener('click', async () => {
  const userQuery = document.getElementById('userQuery').value;
  const responseDiv = document.getElementById('response');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { command: "getContext" }, async (context) => {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: `AWS task: ${userQuery}. Context: ${JSON.stringify(context)}. Provide the CSS selector for the element to highlight.`,
          max_tokens: 100
        })
      });

      const data = await response.json();
      const selector = data.choices[0].text.trim();
      responseDiv.innerText = `Highlighting: ${selector}`;

      chrome.tabs.sendMessage(tabs[0].id, { command: "highlight", selector: selector });
    });
  });
});
