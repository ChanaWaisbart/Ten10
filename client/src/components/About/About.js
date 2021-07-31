/**
 * display information about the website
 */
import React from 'react';
import './About.css'


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return (
        <div className="container-fluid not">
            <div className="row "></div>
            <div className="row">
                <div className="col-6">
                    <div className="h-100"></div>
                    <div className="h-75 border-dark border border-right-0 border-top-0 smallquarterCircle">
                    <div className="row h-25"></div>
                    <div className="row text-align-center ml-5  mt-5" style={{fontSize:25}}>
                                כשקבוצת הרכישה של המוצרים שבסל הקניות תיסגר, <br/> תקבלו עדכון במיייל ולאחר ביצוע התשלום תזכו במוצר
                        </div>

                    </div>
                </div>

                <div className="col-6">
                    <div className="row h-25"></div>
                    <div className=" border-danger h-100 border-light border border-left-0 border-top-0 quarterCircle pl-n5 ml-n5">
                        <div className="bg-light w-100 border-danger border border-left-0 border-top-0 quarterCircle">
                            <div className="row h-25"></div>
                            <div className="float-left">
                                <div className="row h-25"></div>
                                <div className="display-4 mb-5 mt-n3">
                                    <strong className="font lh-lg display-4 fw-bold ">
                                        אז איך זה עובד?
                                                                    
                                    </strong>
                                </div>
                                <div className="row h-25 "></div>
                                <div className="row text-align-center mr-5 ml-5 mb-5" style={{ fontSize: 25 }}>
                                    בעת כניסה לאתר תוכלו לצפות במוצרי השבוע<br />-בכל שבוע מוצגים
                                    למכירה 10 מוצרים שונים בהוזלה משמעותית,
                        </div>
                        <div className="row text-align-center mr-5 pr-5" style={{fontSize:25}}>
                                    מכל מוצר נמכרים 10 יחידות בלבד- כל
                                    הקודם מרוויח!
                        </div>
                        <div className="row text-align-center mr-5 pr-5 mt-2" style={{fontSize:30}}>
                                הזדרזו להירשם<br/> ולהוסיף לסל הקניות שלכם את הדילים<br/> בהם תרצו להשתתף.
                        </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row not"></div>
        </div>
    )
}