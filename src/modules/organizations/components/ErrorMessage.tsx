import { SerializedError } from "@reduxjs/toolkit";
import React from "react";

interface IProps {
  message: any;
}

const ErrorMessage: React.FC<IProps> = (props) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <span className="text-danger">{JSON.stringify(props.message)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorMessage;
