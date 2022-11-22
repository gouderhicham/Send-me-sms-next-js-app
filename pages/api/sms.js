export default function handler(req, res) {
  let text = req.body.message; 
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "User-Agent":
        "Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      text: text,
      disable_web_page_preview: false,
      disable_notification: false,
      reply_to_message_id: 0,
      chat_id: "5204325500",
    }),
  };
    if (text === "") return;
  fetch("https://api.telegram.org/bot5903144277%3AAAFnShua3yy8MhrNkaQfpQwvxW0JxjFxONQ/sendMessage", options)
    .then((response) => response.json())
    .then((response) => res.json({ message: response }))
    .catch((err) => res.json({ message: err }));
  
}
