import React from 'react'
import {useHistory} from 'react-router-dom'
import Styled from 'styled-components'
import { Form, Input, Button } from 'antd'
import {useStores} from '../stores'


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

const Login = () => {

  const {AuthStore} = useStores()
  const history = useHistory()

  const onFinish = values => {
    AuthStore.setUsername(values.username)
    AuthStore.setPassword(values.password)
    AuthStore.login()
      .then(() => {
        history.push('/')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  // 登陆表单验证
  // const validateUsername = (rule, value) => {
  //   if(/\W/.test(value)) return Promise.reject('只能是字母数字下划线');
  //   if(value.length < 4 || value.length > 10) return Promise.reject('长度为4～10个字符');
  //   return Promise.resolve();
  // };

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
            // {
            //   validator: validateUsername
            // }
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
            // {
            //   min: 6,
            //   message: '请至少输入6位字符！'
            // },
            // {
            //   max: 16,
            //   message: '超出限制，最多16位字符！'
            // }
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

export default Login