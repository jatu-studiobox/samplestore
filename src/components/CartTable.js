import React from 'react';
// import Typography, Table, Space จาก Ant Design
import { Typography, Table, Space } from 'antd';

const { Text } = Typography;

const CartTable = ({ cart, setCart }) => {
  //console.log(cart);
  // function สำหรับ generate Summary Table
  const tableSummary = (pageData) => {
    let totalPrice = 0;
    pageData.forEach(({ price, quantity }) => {
      totalPrice += price * quantity;
    });

    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell colSpan={5}>Total price</Table.Summary.Cell>
          <Table.Summary.Cell>
            <Text>{`${totalPrice} ฿`}</Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  }

  const removeProductFromCart = (e, keyToDelete) => {
    e.preventDefault();
    //console.log(keyToDelete);

    const newCart = cart.filter(item => item.key !== keyToDelete);
    setCart(newCart);
  }

  // Table Column
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Size',
      dataIndex: 'selectedSize',
      key: 'selectedSize',
    },
    {
      title: 'Color',
      dataIndex: 'selectedColor',
      key: 'selectedColor',
      render: text => (
        <div className={'colors'}>
          <div className={`c-${text}`}><span /></div>
        </div>
      )
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price per unit',
      dataIndex: 'price',
      key: 'price',
      render: text => (
        <Space size="middle">
          ${text}
        </Space>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={(e) => removeProductFromCart(e, record.key)}>Delete</a>
        </Space>
      ),
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={cart}
      pagination={false}
      summary={tableSummary}
    />
  );
}

export default CartTable;