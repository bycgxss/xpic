import React from 'react'
import Styled from 'styled-components'
import {Form, Input, Button, message} from 'antd'
import {useStores} from '../stores'
import {useHistory} from 'react-router-dom'

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
    offset: 12,
    span: 12,
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
  const {AuthStore} = useStores()
  const history = useHistory()


  const onFinish = (values) => {
    AuthStore.setUserName(values.username)
    AuthStore.setPassWord(values.password)
    AuthStore.login()
      .then(() => {
        history.push('/')
      })
      .catch(() => {
        message.error('登陆失败')
        console.log('登陆失败,什么也不做')
      })
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const Validators = {
    username(rule, value, callback) {
      if (value.length === 0) return callback()
      if (/\W/.test(value)) return callback('请输入字母、数字或下划线！')
      if (value.length < 3) return callback('用户名长度不能小于3位')
      if (value.length > 10) return callback('用户名长度不能大于10位')

      callback()
    }
  }

  return (
    <Wraper>
      <h1>登陆</h1>
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
            {
              validator: Validators.username
            }
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
            {
              min: 6,
              message: '请至少输入6位字符！'
            },
            {
              max: 16,
              message: '超出限制，最多16位字符！'
            }
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">登陆</Button>
        </Form.Item>

      </Form>
    </Wraper>
  )
}

export default Register