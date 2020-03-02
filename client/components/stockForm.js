import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function StockForm() {
  const { handleSubmit, register, getValues } = useForm();
  const [ticker, quantity] = useState('');
  const dispatch = useDispatch();
  const onSubmit = values => {
    console.log(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="ticker">Ticker</label>
      <input type="text" name="ticker" ref={register} />

      <label htmlFor="quantity">Quantity</label>
      <input type="number" name="quantity" ref={register} />

      <button type="submit">Buy</button>
    </form>
  );
}

export default StockForm;
