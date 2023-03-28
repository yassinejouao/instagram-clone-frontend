import React from "react";
import "./Modal.css";
export default function Backdrop(props) {
  return <div className="backdrop" onClick={props.onClose} />;
}
