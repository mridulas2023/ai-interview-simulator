import axios from "axios";

const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;

export async function getAIResponse(answer) {

  try {

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content:
              `Analyze this interview answer professionally and give short constructive feedback:\n${answer}`
          }
        ]
      },

      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }

    );

    return response.data.choices[0].message.content;

  }

  catch (error) {

    console.log(error.response?.data || error);

    return "AI feedback unavailable.";

  }

}