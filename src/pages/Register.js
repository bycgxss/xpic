import React from 'react'
import Styled from 'styled-components'
import {Form, Input, Button} from 'antd'

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 20,
  },
}

const Wraper = Styled.div`
  max-width: 600px;
  margin: 50px auto;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px;
  > h1 {
    text-align: center;
  }
`

const Register = () => {
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Wraper>
      <h1>注册</h1>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: '请再次输入密码!',
            },
          ]}
        >
          <Input.Password/>
        </Form.Item>


        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交注册
          </Button>
        </Form.Item>

      </Form>
    </Wraper>
  )
}

export default Register