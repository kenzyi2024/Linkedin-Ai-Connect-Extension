if (typeof OPENAI_API_KEY === "undefined") {
    alert("Missing API key. Please create a config.js file with your key.");
  } else {
    // Grab the user's name and headline from the LinkedIn profile
    const nameElement = document.querySelector(".text-heading-xlarge");
    const headlineElement = document.querySelector(".text-body-medium");
  
    if (!nameElement || !headlineElement) {
      alert("Couldn't find name or headline on this profile.");
      return;
    }
  
    const name = nameElement.innerText.trim();
    const headline = headlineElement.innerText.trim();
  
    const prompt = `Write a short, professional but friendly LinkedIn connection message to ${name}, who has the headline: "${headline}".`;
  
    // Send request to OpenAI API
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful professional assistant writing personalized connection messages." },
          { role: "user", content: prompt }
        ]
      })
    })
      .then(res => res.json())
      .then(data => {
        const message = data.choices?.[0]?.message?.content;
        if (message) {
          alert("Suggested message:\n\n" + message);
        } else {
          alert("OpenAI response was empty or invalid.");
          console.error(data);
        }
      })
      .catch(err => {
        console.error(err);
        alert("There was an error contacting OpenAI.");
      });
  }
  