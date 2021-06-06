import { Suspense, lazy, memo, useCallback, useMemo, useState } from 'react';

const AddButton = lazy(() => import('./AddButton'));

const App = () => {
  console.log('renders <App />');

  const [item, setItem] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const handleChange = useCallback((event) => {
    setItem(event.target.value);
  }, []);

  const handleAdd = useCallback(() => {
    if (cartItems.includes(item)) {
      return;
    }

    setCartItems((items) => [...items, item]);
    setItem('');
  }, [cartItems, item]);

  const handleClear = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <div style={{ margin: '10px' }}>
      <h1>商品を購入</h1>
      <Input value={item} onChange={handleChange} />
      <Suspense fallback={<div>Loading…</div>}>
        <AddButton disabled={item.trim() === ''} onClick={handleAdd} />
      </Suspense>
      <ul>
        {cartItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Total cartItems={cartItems} />
      <ClearButton onClick={handleClear} />
    </div>
  );
};

const Input = ({ value, onChange }) => {
  console.log('renders <Input />');

  return (
    <p>
      <label>
        アイテム名: <input type="text" value={value} onChange={onChange} />
      </label>
    </p>
  );
};

const Total = ({ cartItems }) => {
  console.log('renders <Total />');

  const total = useMemo(() => {
    return cartItems.reduce((acc, cur) => cur.length * 100 + acc, 0);
  }, [cartItems]);

  return <p>合計: {total}円</p>;
};

const ClearButton = memo(({ onClick }) => {
  console.log('renders <ClearButton />');

  return (
    <p>
      <button onClick={onClick}>
        カートを空にする
      </button>
    </p>
  );
});

export default App;
