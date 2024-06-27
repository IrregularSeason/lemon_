import React from 'react';
import { Card, List } from '@arco-design/web-react';
import cls from './index.module.less';

export default function ProductList({ products, show, hiddenExtra = false }) {
  return (
    <List
      grid={{
        sm: 24,
        md: 12,
        lg: 8,
        xl: 6,
      }}
      dataSource={products}
      render={(item, index) => (
        <List.Item key={index}>
          <Card
            title={item.name}
            extra={
              hiddenExtra ? null : <span onClick={() => show(item)}>想要</span>
            }
          >
            <div
              className={cls['product-card']}
              onClick={() => show(item)}
              key={index.toFixed(2)}
            >
              <img className={cls['cover']} src={item.cover} alt="" />
              <div className={cls['price']}>￥{item.price}</div>
              <div>
                {item.description.length > 50
                  ? `${item.description.slice(0, 50)}...`
                  : item.description}
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
}
