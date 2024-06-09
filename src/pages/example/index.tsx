import React, { useEffect, useState } from 'react';
import {
  Avatar,
  List,
  Message,
  Modal,
  ModalProps,
} from '@arco-design/web-react';
import { getProducts, removeProduct } from '@/service/example';
import { Product } from '@/service/dashboard';
import cls from './index.module.less';
import { IconDelete } from '@arco-design/web-react/icon';

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

function Example() {
  const [products, setProducts] = useState<Product[]>([]);
  const deleteModal = useDeleteModal();

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.data);
    });
  }, []);
  return (
    <div className={cls['container']}>
      <Modal {...deleteModal.modalProps}>确认删除吗</Modal>
      <List
        dataSource={products}
        render={(item, index) => (
          <List.Item
            key={index}
            actions={[
              <span className="list-demo-actions-icon" key={index.toFixed(2)}>
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
    </div>
  );
}

export default Example;
