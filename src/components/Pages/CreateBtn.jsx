import React, { useState } from 'react';
import { Button, Modal, Form, Input, DatePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const CreateBtn = ({ handleUpdateData }) => {
  //创建From实例，用于管理所有的数据状态
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const handleCreate = () => {
    form.validateFields().then(values => {
      const jsonObj = {
        ...values,
      };
      fetch("http://jinli-regret.top/api/v1/application/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonObj),
      }).then(response => {
        if (response.ok) {
          alert("添加成功！");
          form.resetFields();
          setVisible(false);
          fetch("http://jinli-regret.top/api/v1/application/listAll")
            .then(response => response.json())
            .then(responseData => {
              handleUpdateData(responseData);
            })
        } else {
          alert("添加失败！");
        }
      })
    }).catch(error => console.log(`Error!${error}`))
  }

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  }

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        新建
      </Button>
      <Modal
        forceRender
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            返回
          </Button>,
          <Button key="submit" type='primary' htmlType="submit" onClick={handleCreate}>
            提交
          </Button>
        ]}
      >
        <Form form={form} labelCol={{ span: 4, }} wrapperCol={{ span: 18 }} layout="horizontal">
          <Form.Item label="应用名" rules={[
            {
              required: true,
              message: "应用名不能为空！"
            },
          ]}
            name="app_name">
            <Input />
          </Form.Item>
          <Form.Item label="应用描述" name="app_desc" >
            <TextArea />
          </Form.Item>
          <Form.Item label="选择日期" name="publish_date">
            <DatePicker />
          </Form.Item>
          <Form.Item label="上传图标" name="icon" >
            <Input placeholder='填写需要上传的图片的链接' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default CreateBtn;