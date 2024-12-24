'use client';
import { Editor } from '@monaco-editor/react';
import React, { useEffect, useRef, useState } from 'react'
import { CodeBlock, dracula } from 'react-code-blocks';
import Visualizer from '../visualizer/page';
import axios, { Axios } from 'axios';
import toast from 'react-hot-toast';

const DOMEditor = () => {

  const token = localStorage.getItem('token');
  const [diagramList, setDiagramList] = useState([]);
  const [selDiagram, setSelDiagram] = useState(null);
  const nameRef = useRef(null);

  const [code, setCode] = useState(`
        <div className="max-w-2xl text-center mx-auto">
    <h1 className="block text-3xl font-bold text-white sm:text-4xl md:text-5xl dark:text-white">
      Designed for you to get more{" "}
      <span className="text-blue-600">simple</span>
    </h1>
    <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
      Build your business here. Take it anywhere.
    </p>
  </div>`)


  const addVisualization = () => {
    axios.post('http://localhost:5000/dom/add', { title: 'Untitled Diagram' }, {
      headers: {
        'x-auth-token': token
      }
    })
      .then((result) => {
        console.log(result.data);
        toast.success('Visualization Added Successfully');
        fetchDom();

      }).catch((err) => {
        console.log(err);
        toast.error('Failed to Add Visualization ');
      });
  }

  const deleteDom = (id) => {
    axios.delete('http://localhost:5000/dom/delete/' + id)

      .then((result) => {
        console.log(result.data);

        toast.success('Dom Deleted Successfully')
        fetchDom();
      }).catch((err) => {
        console.log(err);
        toast.error('Failed to delete dom')
      });
  }

  const fetchDom = () => {
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

  const updateDom = () => {

    axios.put('http://localhost:5000/dom/update/' + selDiagram._id, {
      code: code,
      title: nameRef.current.value,
      url: ''
    })
      .then((result) => {
        toast.success('Dom Updated Successfully');
        fetchDom();
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to Update Dom');
      });
  }


  useEffect(() => {
    fetchDom();
  }, [])


  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-2'>
        <button onClick={addVisualization} className='bg-green-500 py-1 px-3 text-white rounded-full'>Add diagram</button>
        <div className='my-10'>

          {
            diagramList.map(diagram => (
              <div onClick={() => setSelDiagram(diagram)} key={diagram._id} className='border-2 flex gap-5'>
                <button>{diagram.title}</button>
                <button onClick={() => deleteDom(diagram._id)} className='bg-red-500 py-1 px-3 text-white rounded-full' >Delete</button>

              </div>
            ))
          }
        </div>
      </div>
      <div className='col-span-10'>
        {
          selDiagram !== null ? (
            <>
              <button onClick={updateDom} className='bg-blue-500 py-1 px-3 text-white rounded-full' >Update</button>
              <input type="text" placeholder='Enter diagram name' className='border m-5' ref={nameRef} />
              <Editor theme={''} height="40vh" defaultLanguage="html" value={selDiagram.code} onChange={setCode} />
              <Visualizer />
            </>
          ) : (
            <h1>Please select a diagram to continue</h1>
          )
        }
      </div>
    </div>
  );
}

export default DOMEditor;