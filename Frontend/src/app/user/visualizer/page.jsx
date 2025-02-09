'use client';
import { Editor } from '@monaco-editor/react';
import React, { useEffect, useRef, useState } from 'react'
import axios, { Axios } from 'axios';
import toast from 'react-hot-toast';
import { IconArrowLeft, IconPencilCheck, IconPencilCode, IconTrash } from '@tabler/icons-react';
import Visualizer from './page3';
import useDiagramContext from '@/context/DiagramContext';
import useDomContext from '@/context/DOMContext';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

const HTMLEditor = () => {

  const token = localStorage.getItem('token');
  const nameRef = useRef(null);
  const urlRef = useRef(null);

  const { diagramList, loadDiagrams, selDiagram, setSelDiagram, updateDiagram } = useDiagramContext();
  const { code, setCode, extractHTMLFromUrl } = useDomContext();

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

  // const fetchDOMData = async () => {

  // }

  return (
    <div className='grid grid-cols-12 bg-white h-screen m-5 p-2 border border-gray-800 rounded'>
      <div className='col-span-2'>
        <button onClick={addVisualization} className='flex gap-2 bg-green-500 py-1 px-2 my-8 ml-3 justify-center border border-gray-700 place-items-center text-white rounded-full'>
          <IconPencilCode />
          Add diagram</button>
        <div className='my-10 mx-2 border border-gray-800'>

          {
            diagramList.map(diagram => (
              <div onClick={() => { setSelDiagram(diagram); setCode(diagram.code); }} key={diagram._id} className='border-2 flex gap-5 justify-between items-center p-2'>
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
        <Popover>
          <PopoverButton className="z-10"></PopoverButton>
          <PopoverPanel >
          </PopoverPanel>
        </Popover>
        {
          selDiagram !== null ? (
            <>
              <div className='flex gap-5 py-6'>
                <input type="text" placeholder='Enter Url' className='w-full px-3 py-1 border border-gray-800 rounded' ref={nameRef} defaultValue={selDiagram.title} />
                <input type="url" placeholder='Enter diagram name' className='w-full px-3 py-1 border border-gray-800 rounded' ref={urlRef} defaultValue={selDiagram.url} />
              </div>
              <button className='flex gap-1  justify-between p-2 bg-blue-500 py-1 px-3 my-3 items-center border border-gray-700 text-white rounded-full' onClick={() => extractHTMLFromUrl(urlRef.current.value)}>Fetch DOM from URL</button>
              <button onClick={() => updateDiagram({ title: nameRef.current.value, url: urlRef.current.value })} className='flex gap-1  justify-between p-2 bg-blue-500 py-1 px-3 my-3 items-center border border-gray-700 text-white rounded-full' >
                <IconPencilCheck /></button>
              <Editor theme={''} className='p-1 mx-auto border border-gray-800 rounded' height="40vh" defaultLanguage="html" value={code} onChange={setCode} />
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