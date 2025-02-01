import axios from "axios";
import toast from "react-hot-toast";

const { createContext, useState, useContext } = require("react")

const DiagramContext = createContext();

export const DiagramProvider = ({ children }) => {

    const [selDiagram, setSelDiagram] = useState(null);
    const [diagramList, setDiagramList] = useState([]);

    const token = localStorage.getItem('token');

    const updateDiagram = (dataToUpdate) => {
        axios.put('http://localhost:5000/dom/update/' + selDiagram._id, dataToUpdate)
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
        axios.get('http://localhost:5000/dom/getall', {
            headers: {
              'x-auth-token': token
            }
          })
            .then((result) => {
              console.table(result.data);
              setDiagramList(result.data);
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