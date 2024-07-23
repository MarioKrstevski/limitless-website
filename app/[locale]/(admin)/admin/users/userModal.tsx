'use client';

import { Button, Checkbox, Form, Input, Modal } from 'antd';
import ReactQuill from 'react-quill';
import { useForm } from 'antd/es/form/Form';
import 'react-quill/dist/quill.snow.css';
import { useEffect } from 'react';

interface ModalProps {
  open: boolean;
  close: () => void;
  id?: string | null;
}

const UserModal = ({ open, close, id }: ModalProps) => {

  const [form] = useForm();
  
  useEffect(() => {
    if(open && id) {
      fetch(`/api/user/${id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((datta) => {
          form.setFieldsValue(datta)
        })
    }
  }, [])
  
  const handleOk = async () => {
    form.validateFields().then(async () => {
      const formData = form.getFieldsValue();
      try {
        await fetch(`/api/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        form.resetFields();
        close();
      } catch (error) {
        console.error(error);
      }
    })
  };

  const handleUpdate = async () => {
    form.validateFields().then(async () => {
      const formData = form.getFieldsValue();
      try {
        await fetch(`/api/user/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        form.resetFields();
        close();
      } catch (error) {
        console.error(error);
      }
    })
  };

  return (
    <Modal title="User" open={open} footer={null} onCancel={() => close()} forceRender >
      <Form
        form={form}
        layout="vertical"
        name="basic"
        style={{ maxWidth: 600 }}
        className="p-4"
      >
        <Form.Item
          label="Fullname"
          name='name'
          rules={[{ required: true, message: 'Please input full name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: 'Please input valid email!' }]}
        >
          <Input />
        </Form.Item>
      
        <Form.Item name="active" valuePropName="checked" >
          <Checkbox>Active</Checkbox>
        </Form.Item>

        <Form.Item className="flex justify-end">
          {!id && <Button type="primary" onClick={() => handleOk()}>
            Submit
          </Button>}
          {id && <Button type="primary" onClick={() => handleUpdate()}>
            Update
          </Button>}
        </Form.Item>
      </Form>
      </Modal>
  );
};

export default UserModal;
