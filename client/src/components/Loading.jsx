import React from 'react'
import { ScaleLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ScaleLoader color="#b30808"/>
    </div>
  );
}

export default Loading