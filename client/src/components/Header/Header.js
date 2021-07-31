/**
 * Displays the navigation title for all options on the site
 */

import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Timer from './Timer'

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState(null)

    const logOut = () => {
        localStorage.removeItem("user")
        props.updateReload()
    }

    useEffect(() => {
        if (props.userDetails) {
            setUser(props.userDetails)
            setLogged(true)
        }
        else {
            setLogged(false)
            setUser(null)
        }
    }, [props.userDetails])

    return (
        <div className="container-fluid bg-light border-danger sticky-top shadow border border-right-0 border-left-0 border-top-0">
            <nav className="navbar-expand-lg navbar-light navbar-fluid ">
                <div className="row">
                    <div className="col-2">
                        <li className="navbar-brand">
                            <NavLink exact className="ml-3" to="/">
                                <img src={"/images/fullLogo.png"} style={{ width: 150 }} alt="logo" />
                            </NavLink>
                        </li>
                    </div>
                    <div className="col-6">
                        <div className="row h-50">
                        </div>
                        <div className="row h-50">
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <NavLink className="nav-link  pb-4 text-secondary" to="/productsList">
                                        הדיל השבועי
                                </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link  pb-4 text-secondary" to="/about">
                                        קצת עלינו
                                </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link  pb-4 text-secondary" to="/cart">
                                        ההזמנות שלי
                                 </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-2">
                        {/* If the user is not logged in, a login option is displayed, otherwise a login out option is displayed */}
                        {!logged ? <>
                            <div className="row h-50">
                                <div className="w-50"></div>
                                <NavLink className="nav-link mt-2 pl-5 text-dark w-50 h5" to="/login">
                                    כניסה
                                </NavLink>
                            </div>
                            <div className="row h-50"></div></>
                            :
                            <>
                                <div className="row h-50">
                                    <ul className="nav pl-3" role="tablist">
                                        <li className="h-50">
                                            <div className="nav-link pt-3">
                                                {`שלום ${user.userName}`}
                                            </div>
                                        </li>
                                        <li className="h-50 pt-2">
                                            <NavLink onClick={logOut} className="nav-link pb-4 text-dark h5" to="/">
                                                יציאה
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </>}
                    </div>
                    <div className="col-2">
                        <div className="row">
                            {/* Shows how much time is left until the end of the week */}
                            <Timer updateReload={props.updateReload} />
                        </div>
                    </div>

                </div>
            </nav>
            {/*When the administrator is logged in, additional navigation to the administrator options is displayed */}
            {logged && user.isManager && <div className="navbar-expand-lg navbar-light bg-danger">
                <ul className="nav" role="tablist">
                    <li className="nav-item">
                        <NavLink className="nav-link text-dark" to="/next-week">
                            מוצרי השבוע הבא
                                </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-dark" to="/set-next-week">
                            עריכת השבוע הבא
                                </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-dark" to="/update-products">
                            עדכון המוצרים
                                </NavLink>
                    </li>

                </ul>
            </div>}

        </div >


    )
}
