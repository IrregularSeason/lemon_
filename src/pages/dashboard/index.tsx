import ImageUpload from '@/components/ImageUpload';
import React, { useEffect } from 'react';
import { useImageUpload } from './../../components/ImageUpload/index';
import { Button, Form, Input } from '@arco-design/web-react';
import { Product, publishProduct } from '@/service/dashboard';
import { service } from '@/service';

export default function DashBoard() {
  const [form] = Form.useForm<Product>();
  const imageUpload = useImageUpload();

  useEffect(() => {
    service.get('');
    console.log(form.getFieldsValue());
  }, [form]);

  useEffect(() => {
    form.setFieldValue('cover', imageUpload.imageUrl);
  }, [form, imageUpload.imageUrl]);

  return (
    <div style={{ background: '#fff', padding: 4, height: 480 }}>
      <Form
        form={form}
        onChange={(value, values) => {
          console.log(value, values);
        }}
        onSubmit={(values) => publishProduct(values)}
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            发布
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
