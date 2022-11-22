import Head from "next/head";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function Home({ image }) {
  let [text, setText] = useState("");
  const [disabled, setdisabled] = useState(false);
  async function sendSms(e) {
    if (text === "") {
      alert("type something to send message !");
    }
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ message: text }),
    };
    e.preventDefault();
    setdisabled(true);
    toast.promise(
      fetch("api/sms", options)
        .then((res) => res.json())
        .then(async (res) => {
          console.log(res.message);
          await new Promise((resolve) => {
            setTimeout(() => {
              resolve(res.message);
              setdisabled(false);
            }, 1200);
          });
        })
        .catch((err) => console.log(err)),
      {
        loading: "Sending message ...",
        success: "Message Sent !",
        error: "Error when fetching data :(",
      }
    );
    setText(""); 
  }
  return (
    <>
      <Head>
        <title>Send Me Sms App | gouderhicham</title>
        <meta name="robots" content="gouder hicham Sms App"></meta>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Use this app to send an sms to it's developer"
        ></meta>
        <meta name="author" content="gouder hicham"></meta>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Send Me Sms App | gouderhicham" />
        <meta
          property="og:description"
          content="Use this app to send an sms to it's developer"
        />
        <meta property="og:image" content={image} />
      </Head>
      <form className="form" onSubmit={sendSms}>
        <Toaster />
        <input
          id="name"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button disabled={disabled} className={`${disabled ? "fill" : ""}`}>
          Send Sms
        </button>
      </form>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320">
        <path
          fill="rgb(0, 180, 81)"
          fillOpacity="1"
          d="M0,32L1440,288L1440,320L0,320Z"
        ></path>
      </svg>
      <a
        target={"_blank"}
        rel="noreferrer"
        className="logo"
        href="https://github.com/gouderhicham/Send-me-sms-next-js-app"
      >
        <img
          width={40}
          height={40}
          src="/gitlogo.png"
          alt="profile link to https://github.com/gouderhicham"
        />
      </a>
    </>
  );
}

export async function getServerSideProps(context) {
  const params = context.resolvedUrl;
  const base = return_url(context);
  const url = `${base}${params}`;
  const image = await fetch(
    `https://api.savepage.io/v1/?key=96d39481fc5e144daf42d4b3d03fccee&q=${url}`
  ).then((res) => res.url);
  return {
    props: {
      image: image,
    },
  };
}
function return_url(context) {
  if (process.env.NODE_ENV === "production") {
    return `https://${context.req.rawHeaders[1]}`;
  } else if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }
}
