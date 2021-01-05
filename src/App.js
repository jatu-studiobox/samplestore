// ใช้ useState จาก React Hook
import React, { useState } from 'react';
//import './App.css';
// import style
import './assets/style.css';
// import ant design style เข้ามา
import 'antd/dist/antd.css';
// import React Router
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProductPage from './pages/Product';
import CartPage from './pages/Cart';

function App() {
  // เพิ่ม state สำหรับเก็บค่า สินค้าที่ถูกเลือกเข้าตะกร้า -> กำหนดค่าเริ่มต้นให้เป็น [] array เนื่องจากสินค้ามมีได้หลายชิ้น
  // แชร์ร่วมกันระหว่าง Product และ Cart
  const [cart, setCart] = useState([]);
  //console.log(cart);

  return (
    <div className="App">
      <Router>
        {/* ใส่ Switch เพื่อเป็นตัวจัดการเลือก route จาก path ที่ใส่เข้ามา */}
        <Switch>
          <Route path="/cart">
            <CartPage cart={cart} setCart={setCart} />
          </Route>
          <Route path="/">
            <ProductPage cart={cart} setCart={setCart} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
