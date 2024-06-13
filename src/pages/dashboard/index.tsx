import ImageUpload from '@/components/ImageUpload';
import React, { useEffect, useState } from 'react';
import { useImageUpload } from './../../components/ImageUpload/index';
import {
  Button,
  Card,
  Form,
  Input,
  Message,
  Modal,
  ModalProps,
} from '@arco-design/web-react';
import { Product, publishProduct } from '@/service/dashboard';
import { service } from '@/service';
import cls from './index.module.less';
import ProductList from '@/components/ProductList';
import useProducts from '@/hooks/useProducts';

const usePublishModal = () => {
  const [visible, setVisible] = useState(false);

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  const modalProps: ModalProps = {
    visible,
    onOk: close,
    onCancel: close,
    okText: '发布',
  };

  const props = {
    modalProps,
  };

  return {
    props,
    open,
    close,
  };
};

export default function DashBoard() {
  const [form] = Form.useForm<Product>();
  const imageUpload = useImageUpload();
  const products = useProducts();

  const publishModal = usePublishModal();

  useEffect(() => {
    service.get('');
    console.log(form.getFieldsValue());
  }, [form]);

  useEffect(() => {
    form.setFieldValue('cover', imageUpload.imageUrl);
  }, [form, imageUpload.imageUrl]);

  return (
    <div className={cls['container']}>
      <Modal {...publishModal.props.modalProps} onOk={form.submit}>
        <Form
          form={form}
          layout="vertical"
          onChange={(value, values) => {
            console.log(value, values);
          }}
          onSubmit={(values) =>
            publishProduct(values).then(() => {
              Message.success('上传成功');
              form.resetFields();
            })
          }
        >
          <Form.Item field={'cover'}>
            <ImageUpload {...imageUpload.props} />
          </Form.Item>
          <Form.Item field={'name'} rules={[{ required: true }]}>
            <Input placeholder="商品名称" />
          </Form.Item>
          <Form.Item field={'price'} rules={[{ required: true }]}>
            <Input placeholder="商品价格" />
          </Form.Item>
          <Form.Item field={'description'} rules={[{ required: true }]}>
            <Input placeholder="商品描述" />
          </Form.Item>
          {/* <Form.Item>
            <Button type="primary" htmlType="submit">
              发布
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>

      <Card
        title={
          <div className={cls['card-header']}>
            <div>
              <Button type="text">我发布的</Button>
            </div>
            <div>
              <Button type="primary" onClick={publishModal.open}>
                创建发布
              </Button>
            </div>
          </div>
        }
      >
        <ProductList products={products} show={() => 0} />
      </Card>
    </div>
  );
}
