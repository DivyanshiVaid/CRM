import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    //local states
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    //functions
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    //api call and handle submit
    const onSubmit = async (values) => {
        setLoading(true)
        axios.post('https://dummyjson.com/auth/login', {
            username: formValues?.username,
            password: formValues?.password,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                navigate("/dashboard")
                setLoading(false)
                localStorage.setItem('token', response?.data?.token);
            })
            .catch(error => {
                setLoading(false)
                message.error('Invalid username or password');
            });
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}>
            <h2>Login</h2>
            <Form
                name="login-form"
                onFinish={onSubmit}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username' }]}
                >
                    <Input placeholder="Username" name="username" onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                >
                    <Input.Password placeholder="Password" name='password' onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;