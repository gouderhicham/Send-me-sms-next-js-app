const apiKey = process.env.apiKey;
export default function handler(req, res) {
  let input = req.body.message;
  let url = `https://api.callmebot.com/whatsapp.php?phone=+213776935088&text=${input}&apikey=${apiKey}`;
  if (input === "") return;
  fetch(url)
    .then((response) => res.json({ message: response }))
    .catch((err) => res.json({ message: err }));
}
