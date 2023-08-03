import React from 'react';
import loading from '../assets/loading.svg';

const Loading = () => (
  <div className='spinner d-flex justify-content-center align-items-center'>
    <img src={loading} alt='Loading' height='40px' width='40px' />
  </div>
);

export default Loading;
