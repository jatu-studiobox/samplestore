// useEffect เป็น react hook ที่จะเข้ามาช่วยในเรื่องของการเปลี่ยนแปลงของ state
// ในที่นี้จะเข้ามาแก้ปัญหาเรื่องการดึงค่าจาก Web API แล้วเอาเข้ามาใส่ state ซึงโดยปกติแล้ว เมื่อ state มีการเปลี่ยนแปลง
// ตัว Component จะมีการ re-render คัวเองใหม่ ดังนั้น สิ่งที่จะเกิดขึ้นคือ จะมี render Product -> Call Web API -> setState วนแบบไม่รู้จบ
// จึงต้องใช้ useEffect เข้ามาช่วยตรงนี้ คือ ช่วยเรื่อง handle state เมื่อ state มีการเปลี่ยนแปลงแล้วต้องการทำอะไรบางอย่าง
import React, { useState, useEffect } from 'react';

// import Typogrphy, Radio จาก Ant Design
import { Typography, Radio } from 'antd';
// import json data เข้ามาใช้งาน
//import data from '../data.json';  ** เปลี่ยนดึงจาก Web API
// import cart icon
import { ShoppingCartOutlined } from '@ant-design/icons';
// import Link component จาก React-Router เพื่อสร้าง link
import { Link } from "react-router-dom";
// เรียกใช้งาน ProductItem component
import ProductItem from '../components/ProductItem';
// เรียกใช้งาน ProductModal component
import ProductModal from '../components/ProductModal';
// เรียกใช้งาน axios
import axios from 'axios';

// เรียกใช้งาน component 'Title' ใน Typography
const { Title } = Typography;

// รับ state 'cart' และ function set state cart มาจาก app
const Product = ({ cart, setCart }) => {
  // กำหนด selectedFilter เพื่อเก็บค่า state ของ radio และ function setSelectedFilter สำหรับ set ค่า state
  // กำหนด default value ให้เท่ากับ 'select-all'
  // ** ข้อควรระวัง useState ต้องกำหนดตัวแปรที่มารับเป็น array
  const [selectedFilter, setSelectedFilter] = useState('select-all');
  console.log(selectedFilter);
  // เพิ่ม state สำหรับเก็บค่า product ที่เลือก (โดยปุ่ม add to cart) เพื่อจะได้รู้ว่าเลือกสินค้าชิ้นไหน
  const [selectedProduct, setSelectedProduct] = useState(undefined);
  //console.log(selectedProduct);

  // ** ย้าย state cart ไปอยู่ที่ parent app เพราะว่า หน้า Product และ หน้า Cart ต้องใช้ State ร่วมกัน
  // เพิ่ม state สำหรับเก็บค่า สินค้าที่ถูกเลือกเข้าตะกร้า -> กำหนดค่าเริ่มต้นให้เป็น [] array เนื่องจากสินค้ามมีได้หลายชิ้น
  //const [cart, setCart] = useState([]);

  // สร้าง state สำหรับเก็บค่าทีได้จาก Web API โดย axios
  const [products, setProducts] = useState([]);

  // ใช้งาน useEffect
  // parameter ตัวแรก คือ effect
  // parameter ตัวที่สอง คือ state ที่ต้องการตรวจสอบว่า state ตัวนี้มีการเปลี่ยนแปลง เราจะทำอะไรบางอย่าง ที่ effect
  //    กรณี้ไม่ใส่ parameter ตัวที่สอง effect นี้จะทำเฉพาะตอนที่ component mount ครั้งเดียวเท่านั้น ตอนที่ component render
  //    ดังนั้น การเรียก Web API นั้นจะทำแค่ครั้งเดียวเท่านั้นคือ ตอนที่ Component mount เสร็จเท่านั้น
  useEffect(() => {
    //console.log('call api');
    // เรียก Web API ผ่าน axios
    axios.get('https://basic-react-8c559.web.app/static/data.json')
      // Destructure ออกมาจาก Response
      .then(({ data }) => {
        //setProducts(data.products)
        let filteredData = data.products;
        if (selectedFilter === 'in-stock') {
          filteredData = data.products.filter(product => product.stock !== 0);
        }
        setProducts(filteredData);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, [selectedFilter]);

  // สร้าง funcion เพื่อให้ง่ายต่อการเข้าใจ code
  const onFilterChanged = event => setSelectedFilter(event.target.value);

  // generate keyId
  const generatekeyId = () => {
    const maxKey = Math.max(...cart.map(cartItem => cartItem.key), 0);
    return maxKey + 1;
  }

  // สร้าง function สำหรับการ push สินค้าที่ถูกเลือกเข้า state cart
  const addProductToCart = (product) => {
    // เอาข้อมูลเดิม ที่มีอยู่ใน state cart รวมกับ ของใหม่ทีใส่เข้ามา
    setCart([
      ...cart,
      product,
    ]);
    // หรือก็คือ push ข้อมูลเข้า array
    // cart.push(product) แต่อยู่ในรูปแบบของ destructure

    // set ตัวสินค้าที่ถูกเลือกทำรายการให้เป็น undefined เพื่อปิด modal
    setSelectedProduct(undefined);

    //console.log(cart);
  }

  // สร้าง function สำหรับนับจำนวนสินค้าใน cart
  const sumOfQuantity = () => {
    // ใช้ funciton reduce ของ array ในการรวมผลจำนวนสินค้า
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  // สร้างตัวแปร สำหรับเก็บข้อมูลที่สามารถ filter ได้
  //let filteredData = data.products;
  // เปลี่ยนดึงค่าจาก ไฟล์ data.json เป็นที่ได้จาก Web API
  //let filteredData = products;

  // เมื่อ state เท่ากับ in-stock ต้องทำการ filter
  // if (selectedFilter === 'in-stock') {
  //   filteredData = products.filter(product => product.stock !== 0);
  // }

  return (
    <>
      <div className={'app-header'}>
        <div className={'header-content'}>
          <Title>Pastel Store</Title>
          <div className={'cart-icon'}>
            {/* ใส่ component Link ของ React-Router */}
            <Link to="/cart">
              <ShoppingCartOutlined />
              {/* เพิ่ม node สำหรับการแสดงผลตัวเลขจำนวนสินค้าใน cart */}
              <div className={'cart-quantity'}>{sumOfQuantity()}</div>
            </Link>
          </div>
          {/* เรียกใช้งาน onChange เพื่อเก็บค่า Radio ที่ถูกเลือกโดย event.target.value */}
          <Radio.Group
            defaultValue={selectedFilter}
            buttonStyle="solid"
            onChange={onFilterChanged}>
            <Radio.Button value="select-all">Select all</Radio.Button>
            <Radio.Button value="in-stock">Only in stock</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <div className={'app-content'}>
        <div className="product-list">
          {/* ถ้ามีการใช้งานรูปแบบ list component ที่มาจาก array จะต้องมีการระบุ key ให้กับ แต่ละ item component ใน list */}
          {
            // ปรับเปลี่ยนรูปแบบของการส่ง props จาก ...product เป็น item={product} เนื่องจากจะใช้งานง่ายกว่าเวลาจะส่งค่ากลับจาก ProductItem กลับมาหา Product
            products.map((product) => (
              // <ProductItem key={product.id} {...product} />
              // ส่ง props 'onAddItem' ที่เป็น function set state ของ item ที่ถูกเลือกที่ child กลับมายัง parent ได้
              <ProductItem key={product.id} item={product} onAddItem={setSelectedProduct} />
            ))
          }
        </div>
      </div>
      {/* ส่วนของ Modal - จะมีการตรวจสอบด้วยว่า ต้องมีข้อมูลใน selectedProduct ก่อนถึงจะสามารถแสดง Modal ขึ้นมาได้
      onCancel - เมื่อกดปุ่ม cancel บน Modal ให้ทำการ clear selectedProduct โดยกำหนดให้ มีค่าเป็น undefined
      Quantity - ใช้ component InputNumber ของ Ant
      *** รูปแบบ การใช้งาน function 
      onOk={(item) => addProductToCart(item)}
      สามารถ refactor ให้เหลือแค่
      onOk={addProductToCart}
      ได้
      */}
      {
        selectedProduct && <ProductModal
          item={selectedProduct}
          keyId={generatekeyId()}
          onOk={addProductToCart}
          onCancel={() => setSelectedProduct(undefined)}
        />
      }
    </>
  );
}

export default Product;