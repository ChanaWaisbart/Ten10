/**
 * Displays the home page with a brief explanation of the nature of the site and an attraction title to join and earn
 */
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

import './Home.css'


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    const [reload, setReload] = useState(true)

    const [count, setcount] = useState([])

    const icon = <i className="bi bi-person-fill mr-2 ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
    </i>


    useEffect(() => {
        let id = setInterval(() => {
            if (count.length < 10) {
                count.push("*")
                setcount([...count])
            }
            else {
                setcount([])
                setReload(!reload)
                clearInterval(id)
            }
        }, 1000)
    }, [reload])


    return (
        <>
            <div className="container-fluid bg-light ">
                <div className="row">
                    <div className="col-6 mt-5">
                        <div className="h-75">
                            <div className="font lh-lg display-4 fw-bold">
                                <strong>
                                    בואו להיות
                            </strong>
                            </div>
                            <div className="display-4">
                                <strong>
                                    מ-10 הראשונים
                            </strong>
                            </div>
                            <div className="font lh-lg display-4 fw-bold mt-4 pb-4">
                                <strong className="text-danger">
                                    שמרוויחים בגדול!
                             </strong>
                            </div>

                        </div>
                        <div className="h-25 row">
                            <div className="row h-50 w-100">
                                <img className="mr-5" src={"/images/logo.png"} style={{ width: 100, height: 50 }} alt="logo" />
                            </div>
                            <div className="row h-50 w-100 mt-n5">
                                <strong className="pr-5 text-danger" style={{ fontSize: 30 }} >
                                    בראש
                                     </strong>
                                {count.map(item => icon)}
                            </div>
                        </div>

                    </div>
                    <div className="col-6 h-100 border-dark border border-left-0 border-top-0 quarterCircleBottomLeft">
                        <div className="w-100 border-danger border border-left-0 border-top-0 quarterCircleBottomLeft homePage">
                        </div>

                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row display-4 mt-5 mb-5 mr-3">
                        חולמים על חופשה בחול, שעון ממותג, ערכת איפור עשירה?
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="col-5 h-100 border-dark border border-right-0 border-bottom-0 quarterCircleTopLeft">
                                <div className="w-100 border-danger border border-right-0 border-bottom-0 quarterCircleTopLeft homePage">
                                </div>
                            </div>
                        </div>

                        <div className="col-6 align-center container-fluid">
                            <div className="row w-75 mb-3" style={{ fontSize: 20 }}>
                                ten10 מציגה בפניכם זירת מכירות שבועית
                                המציעה מידי שבוע 10 דילים בתמהיל מגוון.
                                </div>
                            <div className="row w-75 text-align-center" style={{ fontSize: 25 }}>
                                מכל מוצר מוצעות למכירה 10 יחידות בלבד בהוזלה משמעותית!!!
                                 </div>
                            <div className="row w-50 mt-4 mx-auto">
                                <NavLink exact className="" to="/productsList">
                                    <button className="btn btn-danger float-left btn-block">התחילו להרוויח...</button>
                                </NavLink>
                            </div>
                            <div className="row h-25"> </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
