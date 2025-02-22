import axios from "axios";

const { createContext, useState, useContext } = require("react")

const DomContext = createContext();

export const DomProvider = ({ children }) => {

  const [code, setCode] = useState(`<div className="max-w-2xl text-center mx-auto">
    <h1 className="block text-3xl font-bold text-white sm:text-4xl md:text-5xl dark:text-white">
      Designed for you to get more{" "}
      <span className="text-blue-600">simple</span>
    </h1>
    <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
      Build your business here. Take it anywhere.
    </p>
  </div>`);

  const extractHTMLFromUrl = async (url) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dom/fetch-dom`, { url });
    console.log(res.data);
    setCode(res.data);
  }

  return <DomContext.Provider value={{ code, setCode, extractHTMLFromUrl }}>
    {children}
  </DomContext.Provider>
}

const useDomContext = () => useContext(DomContext);

export default useDomContext;