/**
 * display the option of update the current week products with the next week product
 */

import React from 'react'
import { setNewWeek } from '../../services/NewWeekService'

export default (props) => {

    const update = () => {
        setNewWeek()
        props.updateReload()
        props.history.push("/productsList")
    }

    return (
        <>
            <div className="mt-5">
                <div className="border border-top-0 border-right-0 border-left-0 border-secondary ">
                    <h5 >
                        עדכון מוצרי השבוע הנוכחי
                                 </h5>
                </div>
                <h6 className="mt-4">לחיצה על כפתור העדכון תעדכן את מוצרי הדיל השבועי.</h6>
                <h6 className="mt-4">במידה וישנם מוצרים בשבוע הנוכחי שקבוצת הרכישה שלהם טרם הושלמה,
                 <br />הם ימחקו מעגלות הקניות של המשתמשים</h6>
                <div className="row w-50 mt-4 mx-auto">
                    <div className="col-4"></div>
                    <button className="btn btn-danger align-center w-25 btn-block " onClick={update}>עדכון....</button>
                </div>

            </div>
        </>
    )
}