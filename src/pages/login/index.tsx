import React, { useEffect, useCallback, useState } from 'react'
import Particles from 'react-particles-js'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Button, Form, Checkbox } from 'antd'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'

import { isEmpty } from 'lodash'
import { login } from '@store/modules/basic.module'
import { useStore } from '@hooks/useStore'
import styles from './login.scss'

// import { login } from './module'

const FormItem = Form.Item
const rules = {
  userName: [{ required: true, message: '请填写用户名！' }],
  password: [{ required: true, message: '请填写密码！' }],
}

interface Props {}
interface State {
  clientHeight: number
}

function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { isLogin } = useStore('basic')

  useEffect(() => {
    if (isLogin) {
      history.replace('/')
    }
  }, [isLogin, history])

  // 这个函数只在初始渲染时执行一次，后续更新状态重新渲染组件时，该函数就不会再被调用
  function getInitState(): number {
    return document.documentElement.clientHeight || document.body.clientHeight
  }

  const [clientHeight, setClientHeight] = useState(getInitState)

  const onResize = useCallback(() => {
    // setState({
    //   clientHeight: document.documentElement.clientHeight || document.body.clientHeight,
    // })
    setClientHeight(document.documentElement.clientHeight || document.body.clientHeight)
  }, [setClientHeight])
  useEffect(() => {
    // const onResize =() => {
    //   setState({
    //     clientHeight: document.documentElement.clientHeight || document.body.clientHeight,
    //   });
    // };
    window.addEventListener('resize', onResize)
    // 清除副作用
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [onResize, setClientHeight])

  const [form] = Form.useForm()
  // useEffect(() => {
  //   form.setFieldsValue({ userName: 'userName', password: 'password' });
  // }, [form]);
  const onFill = () => {
    console.log(form.getFieldsValue())
    if (isEmpty(form.getFieldsValue())) {
      form.setFieldsValue({ userName: 'userName', password: 'password' })
    } else {
      form.resetFields()
    }
  }

  const onFinish = (values: object) => {
    console.log(values)
    // message.success(values.userName)
    dispatch(login())
    // // 模拟生成一些数据
    // this.props.setUserInfo(
    //   Object.assign({}, values, { role: { type: 1, name: '超级管理员' } })
    // );
    // localStorage.setItem(
    //   'userInfo',
    //   JSON.stringify({ ...values, role: { type: 1, name: '超级管理员' } }),
    // )
  }

  return (
    <div className={styles.container}>
      <Particles
        height={`${clientHeight - 5}px`}
        params={{
          particles: {
            number: {
              value: 50,
            },
            size: {
              value: 3,
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                // mode: 'repulse',
              },
            },
          },
        }}
      />
      <div className={styles.content}>
        <div className={styles.title}>后台管理系统1</div>
        <Form className="login-form" onFinish={onFinish} form={form}>
          <FormItem name="userName" rules={rules.userName}>
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
              placeholder="用户名"
            />
          </FormItem>
          <FormItem name="password" rules={rules.password}>
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
              placeholder="密码"
            />
          </FormItem>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ color: '#fff' }}>Remember me</Checkbox>
            </Form.Item>

            <a className={styles.forgot} href="/regist">
              Forgot password
            </a>
          </Form.Item>
          <FormItem>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
            <div style={{ color: '#999', paddingTop: '10px', textAlign: 'right' }}>
              <Button type="link" htmlType="button" onClick={onFill}>
                注册
              </Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </div>
  )
}

export default Login
