import React, { useState } from 'react';
import {
  Avatar,
  List,
  Message,
  Modal,
  ModalProps,
  Tabs,
} from '@arco-design/web-react';
import { removeProduct } from '@/service/example';
import { Product } from '@/service/dashboard';
import cls from './index.module.less';
import { IconDelete } from '@arco-design/web-react/icon';
import ProductList from '@/components/ProductList';
import useProducts from '@/hooks/useProducts';

const useDeleteModal = () => {
  const [visible, setVisible] = useState(false);
  const [targetId, setTargetId] = useState<number>(null);

  const open = (id: number) => {
    setVisible(true);
    setTargetId(id);
  };

  const close = () => {
    setVisible(false);
    setTargetId(null);
  };

  const onOk = () => {
    removeProduct(targetId).then(() => Message.success('删除成功'));
    close();
  };

  const modalProps: ModalProps = {
    visible,
    onOk,
    onCancel: close,
  };

  return {
    modalProps,
    open,
    close,
  };
};

const useShowModel = () => {
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState<Product>(null);

  const open = (product: Product) => {
    setVisible(true);
    setProduct(product);
  };

  const close = () => {
    setVisible(false);
    setProduct(null);
  };

  const onOk = () => {
    close();
  };

  const modalProps: ModalProps = {
    title: product?.name,
    visible,
    onOk,
    onCancel: close,
  };

  return {
    props: {
      modalProps,
      product,
    },
    open,
    close,
  };
};

function Example() {
  const products = useProducts();
  const deleteModal = useDeleteModal();
  const showModal = useShowModel();

  return (
    <div className={cls['container']}>
      <Modal {...deleteModal.modalProps}>确认删除吗</Modal>

      <Modal {...showModal.props.modalProps}>
        {showModal.props.modalProps.visible && (
          <div className={cls['product-detail']}>
            <img
              className={cls['cover']}
              src={showModal.props.product.cover}
              alt=""
            />
            <div className={cls['price']}>
              ￥{showModal.props.product.price}
            </div>
            <div>{showModal.props.product.description}</div>
          </div>
        )}
      </Modal>

      <Tabs>
        <Tabs.TabPane key={'list'} title={'列表'}>
          <List
            dataSource={products}
            render={(item, index) => (
              <List.Item
                key={index}
                actions={[
                  <span
                    onClick={() => showModal.open(item)}
                    key={index.toFixed(2)}
                  >
                    查看
                  </span>,
                  <span key={index.toFixed(2)}>加购</span>,
                  <span
                    className="list-demo-actions-icon"
                    key={index.toFixed(2)}
                  >
                    <IconDelete onClick={() => deleteModal.open(item.id)} />
                  </span>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar shape="square">
                      <img src={item.cover} />
                    </Avatar>
                  }
                  title={item.name}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key={'card'} title={'卡片'}>
          <ProductList products={products} show={showModal.open} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Example;
