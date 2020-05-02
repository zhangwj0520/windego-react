import React, { useEffect, useCallback, useState } from 'react'
import Particles from 'react-particles-js'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Button, Form, Row, Col } from 'antd'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'

// import { isEmpty } from 'lodash'
import { login, getCodeApi } from '@store/modules/basic.module'
import { LoginParams } from '@store/modules/module.type'
import { useStore } from '@hooks/useStore'
import { useSetState } from '@hooks/index'
import styles from './login.scss'

const FormItem = Form.Item
const rules = {
  phone: [{ required: true, message: '请填写手机号码！' }],
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
  const [state, setState] = useSetState({ phone: '', code: '' })
  const { phone, code } = state

  useEffect(() => {
    if (isLogin) {
      history.push('/')
    }
  }, [isLogin, history])

  // 这个函数只在初始渲染时执行一次，后续更新状态重新渲染组件时，该函数就不会再被调用
  function getInitState(): number {
    return document.documentElement.clientHeight || document.body.clientHeight
  }

  const [clientHeight, setClientHeight] = useState(getInitState)

  const onResize = useCallback(() => {
    setClientHeight(document.documentElement.clientHeight || document.body.clientHeight)
  }, [setClientHeight])
  useEffect(() => {
    window.addEventListener('resize', onResize)
    // 清除副作用
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [onResize, setClientHeight])

  const [form] = Form.useForm()

  const onFinish = (values: object) => {
    dispatch(login(values as LoginParams))
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
          <FormItem name="phone" rules={rules.phone}>
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
              placeholder="手机号"
              onChange={(e) => setState({ phone: e.target.value })}
              maxLength={11}
            />
          </FormItem>
          <FormItem name="code">
            <Row gutter={8} justify="space-between">
              <Col span={16}>
                <Input
                  onChange={(e) => setState({ code: e.target.value })}
                  prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                  placeholder="验证码"
                  maxLength={6}
                />
              </Col>
              <Col span={8} style={{ textAlign: 'end' }}>
                <Button
                  disabled={!/^1[3456789]\d{9}/.test(phone)}
                  onClick={() => getCodeApi({ phone })}
                >
                  获取验证码
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button
              disabled={code.length !== 6}
              type="primary"
              htmlType="submit"
              block
              className={styles.button}
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  )
}

export default Login
