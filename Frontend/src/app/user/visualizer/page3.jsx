"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Controls,
  Handle,
  MiniMap,
  Position,
  useEdgesState,
  useNodesState,
} from "reactflow";
import ReactHtmlParser from "react-html-parser";
import "reactflow/dist/style.css";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import useDomContext from "@/context/DOMContext";
import useDiagramContext from "@/context/DiagramContext";
import classes from './styles.module.css';
import DomClasses from './domStyles.module.css';
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { IconEye } from "@tabler/icons-react";

const initBgColor = "#1A192B";

const connectionLineStyle = { stroke: "#fff" };
const snapGrid = [20, 20];
const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const nodeTypes = {
  DomNode: ({ data, isConnectable, id }) => {
    //console.log(data);
    return (
      <div width={280} shadow="md">
        <div>
          <div className={clsx(DomClasses.domNode)}>
            <div className="flex flex-col">

              <Popover className="relative">
                <PopoverButton className="bg-black p-2 rounded text-white">
                  <IconEye size={10} />
                </PopoverButton>
                <PopoverPanel anchor="bottom" className="flex flex-col bg-white p-2 rounded">
                  <h5 className="">Styles</h5>
                  <hr />
                  {Object.keys(data.styles).map((styleName) => (
                    <p>
                      {styleName} : {data.styles[styleName]}
                    </p>
                  ))}
                  <div className="mt-5">
                    <h5>Classes</h5>
                    <hr />
                    <p className={`${classes.myClass}`}>{data.classes}</p>
                  </div>

                  <div className="mt-5">
                    <h5>Ids</h5>
                    <hr />
                    <p className={`${classes.myid}`}>{data.ids}</p>
                  </div>
                </PopoverPanel>
              </Popover>

              <p className={DomClasses.nodeTagName}>{data.label}</p>
            </div>
            <Handle
              type="target"
              position={Position.Top}
              id={id + "handle1"}
              style={{ top: 0, background: "red" }} //this is provide top point on the edges
              isConnectable={isConnectable}
            />
            <Handle
              type="source"
              position={Position.Bottom} //thie is provide point on the edges
              id={id + "handle2"}
              style={{ bottom: 0, background: "yellow" }}
              isConnectable={isConnectable}
            />
          </div>
        </div>
      </div>
    );
  },
};

const HtmlToReactFlow = ({ htmlMarkup, zoomedIn, setZoomedIn }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // const {code, setCode} = useDomContext();
  console.log(htmlMarkup);


  let nodeId = 0;
  let edgeId = 0;

  const createReactFlowNodes = (node, parentIndex = 0, parentCount = 0, parentPosition = { x: 0, y: 0 }, parentNodeId = null) => {
    if (!node) {
      return [];
    }

    const currentNodeId = `node-${nodeId++}`;

    const childNodes = node.children
      ? node.children.flatMap((child, index) =>
        createReactFlowNodes(child, index, node.children.length, {
          x: parentPosition.x + parentIndex * 300 + index * 150, // adjust x-position based on index within parent's children and parent's index
          y: parentPosition.y + 150,
        }, currentNodeId)
      )
      : [];

    const nodes = [
      ...childNodes,
      {
        id: currentNodeId,
        type: "DomNode",
        parent: parentNodeId,
        data: {
          label: node.nodeName,
          styles: node.styles,
          classes: node.classes,
        },
        position: parentPosition,
      },
    ];

    return nodes;
  };

  const createReactFlowEdges = (nodes) => {
    const edges = [];

    for (let i = 0; i < nodes.length; i++) {
      const currentNode = nodes[i];
      const parentNodeId = currentNode.parent;

      if (parentNodeId) {
        edges.push({
          id: `edge-${currentNode.id}-${parentNodeId}`,
          source: parentNodeId,
          target: currentNode.id,
        });
      }
    }

    return edges;
  };

  const extractNodeNameAndStyles = (element) => {
    if (!React.isValidElement(element)) {
      return null;
    }

    const { type, props } = element;
    // console.log(props);
    const nodeName = typeof type === "string" ? type : type.name;
    const styles = props.style || {};
    const classes = props.className || "";
    const id = props.id || "";
    // console.log(id);

    let children = null;
    if (props.children) {
      children = React.Children.map(props.children, extractNodeNameAndStyles);
    }

    return {
      nodeName,
      styles,
      classes,
      id,
      children,
    };
  };

  const parsedHtml = ReactHtmlParser(htmlMarkup);
  // console.log(parsedHtml);
  const domTree = extractNodeNameAndStyles(parsedHtml[0]);
  const reactFlowNodes = createReactFlowNodes(domTree);
  // console.log(reactFlowNodes);

  useEffect(() => {
    setNodes(reactFlowNodes);
    setEdges(createReactFlowEdges(reactFlowNodes));
    // console.log("reset");
  }, [htmlMarkup]);

  return (
    <AnimatePresence>
      <motion.div
        animate={{
          marginTop: zoomedIn ? "-40vh" : "0",
          width: zoomedIn ? "100%" : "30%",
          height: zoomedIn ? "70vh" : "20vh",
        }}
        transition={{ duration: 0.5 }}
        pt="100px"
        className={classes.parent_react_flow}
      >
        <ReactFlow
          className={classes.react_flow}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          style={{
            background: "#666",
            // transform: zoomedIn ? 'scale(1.5)' : 'scale(1)' // Add this line
          }}
          nodeTypes={nodeTypes}
          connectionLineStyle={connectionLineStyle}
          snapToGrid={true}
          snapGrid={snapGrid}
          defaultViewport={defaultViewport}
          fitView
          attributionPosition="bottom-left"
        >


          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.type === "input") return "#0041d0";
              if (n.type === "selectorNode") return bgColor;
              if (n.type === "output") return "#ff0072";
            }}
            nodeColor={(n) => {
              if (n.type === "selectorNode") return bgColor;
              return "#fff";
            }}
          />
          <Controls />
        </ReactFlow>
        <button
          className="bg-blue-500 px-3 py-1 m-2 text-white rounded-md z-10"
          onClick={(e) => setZoomedIn(!zoomedIn)}
        >
          {zoomedIn ? "Zoom Out" : "Zoom In"}
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

const Visualizer = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { code, setCode, extractHTMLFromUrl } = useDomContext();
  console.log(code);

  const { selDiagram, setSelDiagram, updateDiagram, loadDiagrams } =
    useDiagramContext();

  const [zoomedIn, setZoomedIn] = useState(false);

  const urlRef = useRef();

  const extractNodeNameAndStyles = (element) => {
    if (!React.isValidElement(element)) {
      return null;
    }

    const { type, props } = element;
    const nodeName = typeof type === "string" ? type : type.name;
    const styles = props.style || {};

    let children = null;
    if (props.children) {
      children = React.Children.map(props.children, extractNodeNameAndStyles);
    }

    return {
      nodeName,
      styles,
      children,
    };
  };

  useEffect(() => {
    const ele = ReactHtmlParser(code);

    const node = extractNodeNameAndStyles(ele[0]);
    //console.log(node);
  }, []);

  // useEffect(() => {
  //   if (selDiagram === null) return;
  //   setCode(selDiagram.html);
  // }, [selDiagram])


  useEffect(() => {
    setNodes([
      {
        id: "6",
        type: "DomNode",
        data: { nodeName: "document", id: "x1" },
        position: { x: -200, y: 400 },
        sourcePosition: "right",
      },
    ]);

    setEdges([
      {
        id: "num1i-num1",
        source: "1",
        target: "2",
        sourceHandle: "num1i",
        animated: true,
        style: { stroke: "#fff" },
      },
    ]);
  }, []);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, eds)
      ),
    []
  );

  const changeName = (e) => {
    setSelDiagram({
      ...selDiagram,
      name: e.target.value,
    });
    console.log(selDiagram);
  };
  const deleteDiagram = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/diagram/delete/${selDiagram._id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Refresh the diagrams list after a successful delete
        loadDiagrams();
        setSelDiagram(null);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  return (
    <div>
      {selDiagram === null ? (
        <h2>
          Select or Create a New Diagram
        </h2>
      ) : (
        <>
          <div>
            <HtmlToReactFlow
              htmlMarkup={code}
              zoomedIn={zoomedIn}
              setZoomedIn={setZoomedIn}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Visualizer;