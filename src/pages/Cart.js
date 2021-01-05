import React from 'react';
// import Typogrphy จาก Ant Design
import { Typography } from 'antd';
// import cart icon
import { ShoppingCartOutlined, RollbackOutlined } from '@ant-design/icons';

import { Link } from "react-router-dom";
import CartTable from '../components/CartTable';

const { Title } = Typography;

// รับ state 'cart' และ function set state cart มาจาก app
const Cart = ({ cart, setCart }) => {
  return (
    <>
      <div className={'app-header'}>
        <div className={'header-content cart-header'}>
          <Title><ShoppingCartOutlined style={{ marginRight: '10px', fontSize: '36px' }} />Cart</Title>
          <div className={'cart-icon'}>
            <Link to="/">
              <RollbackOutlined />
            </Link>
          </div>
        </div>
      </div>
      <div className={'app-content'}>
        <CartTable cart={cart} setCart={setCart} />
      </div>
    </>
  );
};

export default Cart;