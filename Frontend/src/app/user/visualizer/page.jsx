'use client';
import { Editor } from '@monaco-editor/react';
import React, { useEffect, useRef, useState } from 'react'
import axios, { Axios } from 'axios';
import toast from 'react-hot-toast';
import { IconArrowLeft, IconPencilCheck, IconPencilCode, IconTrash } from '@tabler/icons-react';
import Visualizer from './page3';
import useDiagramContext from '@/context/DiagramContext';
import useDomContext from '@/context/DOMContext';

const HTMLEditor = () => {

  const token = localStorage.getItem('token');
  const nameRef = useRef(null);
  const urlRef = useRef(null);

  const { diagramList, loadDiagrams, selDiagram, setSelDiagram } = useDiagramContext();
  const { code, setCode } = useDomContext();

  useEffect(() => {
    loadDiagrams();
  }, [])

  const addVisualization = () => {
    axios.post('http://localhost:5000/dom/add', { title: 'Untitled Diagram' }, {
      headers: {
        'x-auth-token': token
      }
    })
      .then((result) => {
        console.log(result.data);
        toast.success('Visualization Added Successfully');
        loadDiagrams();
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
        loadDiagrams();
      }).catch((err) => {
        console.log(err);
        toast.error('Failed to delete dom')
      });
  }

  const fetchDOMData = async () => {
    const res = await axios.post('http://localhost:5000/dom/fetch-dom', { url: urlRef.current.value });
    console.log(res.data);
    setCode(res.data);
  }

  return (
    <div className='grid grid-cols-12 bg-white h-screen m-5 p-2 border border-gray-800 rounded'>
      <div className='col-span-2'>
        <button onClick={addVisualization} className='flex gap-2 bg-green-500 py-1 px-2 my-8 ml-3 justify-center border border-gray-700 place-items-center text-white rounded-full'>
          <IconPencilCode />
          Add diagram</button>
        <div className='my-10 mx-2 border border-gray-800'>

          {
            diagramList.map(diagram => (
              <div onClick={() => setSelDiagram(diagram)} key={diagram._id} className='border-2 flex gap-5 justify-between items-center p-2'>
                <button>{diagram.title}</button>
                <button onClick={() => deleteDom(diagram._id)} className='flex gap-2  justify-between p-2 bg-red-500 py-1 px-3 border border-gray-700 text-white rounded-full' >
                  <IconTrash />
                </button>
              </div>
            ))
          }
        </div>
      </div>
      <div className='col-span-10'>
        {
          selDiagram !== null ? (
            <>
              <div className='flex gap-5 py-6'>
                <input type="text" placeholder='Enter Url' className='w-full px-3 py-1 border border-gray-800 rounded' ref={nameRef} />
                <input type="url" placeholder='Enter diagram name' className='w-full px-3 py-1 border border-gray-800 rounded' ref={urlRef} />
              </div>
              <button className='flex gap-1  justify-between p-2 bg-blue-500 py-1 px-3 my-3 items-center border border-gray-700 text-white rounded-full' onClick={fetchDOMData}>Fetch DOM from URL</button>
              {/* <button onClick={updateDom} className='flex-item-baseline gap-2 bg-blue-500 py-2 px-4 mt-6 mb-6 self-center text-white rounded-full' >
                <IconPencilCheck /></button> */}


              <Editor theme={''} className='p-1 mx-auto border border-gray-800 rounded' height="40vh" defaultLanguage="html" value={selDiagram.code} onChange={setCode} />

              <Visualizer />
            </>
          ) : (
            <h1 className='item-center-right'>Please select a diagram to continue</h1>
          )
        }
      </div>
    </div>
  );
}

export default HTMLEditor;