import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react/cjs/react.development'
import PostData from '../data/posts.json';
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import swal from 'sweetalert';


function Login() {

    let history = useHistory();

    const [user, setUser] = useState([{ userName: '', Password: '' }]);

    useEffect(()=>{
        const userId = JSON.parse(localStorage.getItem('userid'));
        console.log(userId,'login page userid')
        if(userId){
          history.push('./ItemData')
        }
      },[])

    const check = () => {
        // console.log(PostData[0].username, 'name');
        for (let i = 0; i < PostData.length; i++) {
            if (PostData[i].username !== user.userName) {
                swal('Check your Username')
            }
            if (PostData[i].password !== user.Password) {
                swal('Check your password')
            }
            if (!user.Password && !user.userName) {
                swal('fields cannot be empty')
            }
            if (PostData[i].username == user.userName && PostData[i].password == user.Password) {
                swal('Successfully Logged In')
                localStorage.setItem('userid',JSON.stringify(PostData[i].id))
                history.push('/ItemData')
                break;
            }
          
        }

    }

    return (
        <>
            <Card className="text-center">
                <Card.Header>Welcome to Login Page</Card.Header>
                <Card.Body>
                    <Card.Title className="text">Login Here</Card.Title>
                    <Card.Text>
                        <Form className="text-center">
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail" className="form_text">
                                <Form.Label column sm="2">
                                    User Name
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control type="text" placeholder="username" value={user.userName} onChange={e => setUser({ ...user, userName: e.target.value })} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword" className="form_text">
                                <Form.Label column sm="2">
                                    Password
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control type="password" placeholder="password" value={user.Password} onChange={e => setUser({ ...user, Password: e.target.value })} />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Text>
                    <Button variant="primary" size="lg" onClick={check}>
                        Login
                    </Button>
                    
                </Card.Body>
            </Card>

        </>
    )
}
export default Login;