import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { buyStock } from '../store/user';

function StockForm() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const type = 'BUY';
  const onSubmit = values => {
    dispatch(buyStock(values));
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
