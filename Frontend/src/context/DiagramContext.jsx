import axios from "axios";
import toast from "react-hot-toast";
import useDomContext from "./DOMContext";
import { createContext, useState, useContext } from "react";
const ISSERVER = typeof window === 'undefined';

const DiagramContext = createContext();

export const DiagramProvider = ({ children }) => {

  const [selDiagram, setSelDiagram] = useState(null);
  const [diagramList, setDiagramList] = useState([]);
  const { setCode, code } = useDomContext();

  const token = !ISSERVER ? localStorage.getItem('token') : null;

  const updateDiagram = (dataToUpdate) => {
    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/dom/update/` + selDiagram._id, { code, ...dataToUpdate })
      .then((result) => {
        toast.success('Dom Updated Successfully');
        loadDiagrams();
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to Update Dom');
      });
  }

  const loadDiagrams = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dom/getall`, {
      headers: {
        'x-auth-token': token
      }
    })
      .then((result) => {
        console.table(result.data);
        setDiagramList(result.data);
        // setCode(result.data.code)
      }).catch((err) => {
        console.log(err);

        if (err?.response?.status === 403) {
          toast.error('You are not authorised to view this page');
        }
      });
  }


  return <DiagramContext.Provider value={{ selDiagram, setSelDiagram, updateDiagram, loadDiagrams, diagramList }}>
    {children}
  </DiagramContext.Provider>
}

const useDiagramContext = () => useContext(DiagramContext);

export default useDiagramContext;