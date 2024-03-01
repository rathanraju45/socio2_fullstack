import React from 'react';
import { ClipLoader } from 'react-spinners';
import './Loading.css';

export default function Loading({loadingText}) {
  return (
    <div id='loading-container'>
        <ClipLoader />
        <p>{loadingText}</p>
    </div>
  )
}
