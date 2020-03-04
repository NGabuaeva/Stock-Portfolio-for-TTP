import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { buyStock } from '../store/portfolio';

function StockForm() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const onSubmit = values => {
    dispatch(buyStock(values));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <label htmlFor="ticker">Ticker</label>
      <input type="text" name="ticker" ref={register} />

      <label htmlFor="quantity">Quantity</label>
      <input type="number" name="quantity" ref={register} />

      <button className="button" type="submit">
        Buy
      </button>
    </form>
  );
}

export default StockForm;
