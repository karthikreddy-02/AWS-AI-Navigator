require('dotenv').config()
const apiKey = process.env.OPENAI_API_KEY;

document.getElementById('userQuery').addEventListener('input', async (event) => {
  const userQuery = event.target.value;
  const suggestionsList = document.getElementById('suggestions');

  if (userQuery.length < 3) {
    suggestionsList.innerHTML = '';
    return;
  }

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Suggest AWS tasks based on partial input: ${userQuery}.`,
      max_tokens: 50
    })
  });

  const data = await response.json();
  const suggestions = data.choices[0].text.trim().split('\n');
  suggestionsList.innerHTML = suggestions.map(s => `<li>${s}</li>`).join('');
});

document.getElementById('suggestions').addEventListener('click', (event) => {
  document.getElementById('userQuery').value = event.target.innerText;
  document.getElementById('suggestions').innerHTML = '';
});

document.getElementById('submitFeedback').addEventListener('click', () => {
  const feedback = document.getElementById('feedback').value;

  // Log feedback or send it to a server
  console.log(`User Feedback: ${feedback}`);
  alert('Thank you for your feedback!');
});

