import React, { useState } from 'react';
// import Modal, Radio, InputNumber จาก Ant Design
import { Modal, Radio, InputNumber } from 'antd';

// สร้าง component ที่ใช้งาน Modal แยกออกมา เนื่องจากถ้าไม่แยก Component Product จะมีการ re-render
// จากการที่มีการแก้ไขข้อมูลตัวเลือกต่าง ๆ บน Modal ซึ่งการที่ Component Product ต้อง re-render ใหม่ทั้งหมดนั้น
// ไม่จำเป็น และไม่ควร เนื่องจาก Performance ไม่ดี
const ProductModal = ({ item, keyId, onCancel, onOk }) => {
  // function หาค่าน้อยที่สุดของ ขนาด
  const minSize = () => {
    return Math.min(...item.sizes);
  }

  // เพิ่ม state สำหรับเก็บค่าจำนวนสินค้าที่จะซื้อ
  const [quantity, setQuantity] = useState(1);
  //console.log(quantity);

  // state เก็บค่า size ที่เลือก
  const [selectedSize, setSeletedSize] = useState(minSize());
  //console.log(size);

  // state เก็บค่าสีที่เลือก
  const [selectedColor, setSelectedColor] = useState(item.colors[0]);
  //console.log(selectedColor);

  // function สำหรับ กำหนดค่า size
  const onSizesChanged = event => setSeletedSize(event.target.value);

  // สร้าง function ในการส่งค่า จำนวนสินค้ากลับไปยัง หน้า Product
  const handleSubmitForm = () => {
    // result มีค่าเท่ากับตัว item แล้วเพิ่มด้วยข้อมูล quantity, size
    const result = {
      ...item,
      quantity,
      selectedSize,
      selectedColor,
      key: keyId  // for fixed antd Table Error Key
    };
    onOk(result);
  }

  return (
    <Modal
      title={`Add ${item.name} to cart!`}
      visible={true}
      onOk={handleSubmitForm}
      onCancel={onCancel}
    >
      <strong>SIZE</strong>
      <div className="field">
        <Radio.Group
          defaultValue={`${selectedSize}`}
          buttonStyle="solid"
          onChange={onSizesChanged}>
          {
            item.sizes.map((size) => (
              <Radio.Button key={size} value={size}>{size}</Radio.Button>
            ))
          }
        </Radio.Group>
      </div>
      <strong>COLOR</strong>
      <div className="field">
        <div className="colors">
          {
            item.colors.map((color) => (
              <div key={color} className={`c-${color} ${ color === selectedColor ? 'selected' : ''}`} onClick={() => setSelectedColor(color)}><span /></div>
            ))
          }
        </div>
      </div>
      <strong>QUANTITY</strong>
      <div className="field">
        <InputNumber min={1} max={item.stock} defaultValue={1} onChange={setQuantity} /> {`${item.stock} piece(s) in stock`}
      </div>
    </Modal>
  );
}

export default ProductModal;