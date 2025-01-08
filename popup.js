document.getElementById('submitQuery').addEventListener('click', async () => {
  const userQuery = document.getElementById('userQuery').value;
  const responseDiv = document.getElementById('response');

  // Call OpenAI API
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `AWS task: ${userQuery}`,
      max_tokens: 100
    })
  });

  const data = await response.json();
  responseDiv.innerText = data.choices[0].text;
});
