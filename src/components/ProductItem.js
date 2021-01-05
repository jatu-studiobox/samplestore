// import 'useRef' จาก React Hook เข้ามาเพื่อทำให้สามารถ Handle Add className และ handle event ของ element ได้
import React, { useRef } from 'react';
// import รูปเข้ามาใช้งาน
import shoeImg from '../assets/shoe.png';

// ปรับเปลี่ยนรูปแบบของการรับค่า props จาก props เป็น {item} (destructure ออกมา) เนื่องจากจะใช้งานง่ายกว่าเวลาจะส่งค่ากลับจาก ProductItem ไปยัง Product
//const ProductItem = (props) => {
const ProductItem = ({ item, onAddItem }) => {
  // useRef ส่วนใหญ่ใส่ค่า initial value เป็น null
  const card = useRef(null);

  const handleMouseOver = () => {
    //console.log('mouse over', card);
    // current คือ component ปัจจุบันที่ทำงาน
    card.current.classList.add('animate');
  }

  const handleMouseLeave = () => {
    //console.log('mouse leave');
    card.current.classList.remove('animate');
  }

  // function สำหรับ handle event onclick ของปุ่ม Add to cart เพื่อทำการ เรียกใช้ function '' ที่ส่งมาจาก parent
  // เพื่อ set ค่า item ทีถูกเลือกที่ state ของ parent ได้
  const handleAddToCartButton = () => {
    // ใช้งาน props ที่เป็น function state product ที่ถุกเลือก กลับไปยังตัว parent เอง
    onAddItem(item);
  }

  return (
    <div className="product-container">
      {/* ใส่ reference 'card' เพื่อกำหนดว่าอยู่กับ element ตัวนี้ */}
      {/* <div className={`product-card ${ props.stock === 0 ? 'product-out-of-stock' : ''}`} ref={card} onMouseOver={ handleMouseOver } onMouseLeave={ handleMouseLeave }> */}
      <div className={`product-card ${ item.stock === 0 ? 'product-out-of-stock' : ''}`} ref={card} onMouseOver={ handleMouseOver } onMouseLeave={ handleMouseLeave }>
        <img src={shoeImg} alt="" />
        {/* เพิ่ม event onClick ให้กับปุ่ม */}
        <div className="add-to-cart-button" onClick={ handleAddToCartButton }>Add to Cart</div>
        <div className="stats">
          <div className="stats-container">
            {/* <span className="product_price">${ props.price }</span>
            <span className="product_name">{ props.name }</span>
            <p>{ props.description }</p> */}
            <span className="product_price">${ item.price }</span>
            <span className="product_name">{ item.name }</span>
            <p>{ item.description }</p>

            <div className="product-options">
              <strong>SIZES</strong>
              {/* ตัว array สามารถใช้ function join ได้ */}
              {/* <span>{ props.sizes.join(', ') }</span> */}
              <span>{ item.sizes.join(', ') }</span>
              <strong>COLORS</strong>
              {/* ใช้ grave ` เป็น template literal */}
              {/* ถ้ามีการใช้งานรูปแบบ list component ที่มาจาก array จะต้องมีการระบุ key ให้กับ แต่ละ item component ใน list */}
              <div className="colors">
                { 
                  // props.colors.map((color) => (
                  //   <div key={ color } className={ `c-${ color }` }><span /></div>
                  // ))
                  item.colors.map((color) => (
                    <div key={ color } className={ `c-${ color }` }><span /></div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;