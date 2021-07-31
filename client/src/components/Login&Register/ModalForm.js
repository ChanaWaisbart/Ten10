/**
 * A modal that presents the option of registration and login
 */
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap'
import Login from './Login/Login'
import Register from './Register/Register'



// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

    const [signIn, setSignIn] = useState(true)
    const [show, setShow] = useState(true)

    const active = " bg-light"
    const notActive = "bg-secondary"

    const hide = () =>{
        setShow(false)
        props.history.push("/")
        props.updateReload()
    }


    return (<>
        <Modal show={show} onHide={hide}>
            <Modal.Header className="ml-n4 mr-n4 border-bottom-0">
                <Modal.Title className="container-fluid">
                    <nav className="navbar-fluid container mt-n3 mb-n3 mr-n2 pl-n3 pr-n3">
                        <div className="row nav-tabs w-100 ">
                            <div className="col nav-item">
                                <div className={signIn ? notActive : active} onClick={() => setSignIn(false)}>
                                    <button className="btn btn-block">הרשמה</button>
                                </div>
                            </div>
                            <div className="col nav-item pl-n5">
                                <div className={signIn ? active : notActive} onClick={() => setSignIn(true)}>
                                    <button className="btn btn-block">התחברות</button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="container-fluid text-right">
                {
                    signIn ? <Login {...props} updateReload={props.updateReload} switch={() => setSignIn(false)} setShow={() => setShow(false)} />
                        : <Register {...props} updateReload={props.updateReload} switch={() => setSignIn(true)} setShow={() => setShow(false)}/>
                }
            </Modal.Body>
        </Modal> </>)
}
