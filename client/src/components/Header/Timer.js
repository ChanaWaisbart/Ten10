/**
 * Shows how much time is left to complete the current sales week
 */

import React, { useEffect, useState } from 'react'
import { setNewWeek, getDeadline, dayDiffRangeWeek } from '../../services/NewWeekService'


// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

    const [reload, setReload] = useState(true)

    const [time, setTime] = useState({
        days: "",
        hours: "",
        minutes: "",
        seconds: ''
    })

    const [timeOver, setTimeOver] = useState(false)

    const updateReload = () => {
        setReload(!reload)
    }



    useEffect(() => {
        let deadline = getDeadline()
        const intervalId = setInterval(() => {
            const currentTime = new Date()
            let diff = dayDiffRangeWeek(deadline, currentTime)

            setTime({
                days: 7 - (currentTime.getDay() + 1),
                hours: 24 - currentTime.getHours(),
                minutes: 60 - currentTime.getMinutes(),
                seconds: 60 - currentTime.getSeconds()
            })
            if (diff < 0) {
                clearInterval(intervalId)
                setTime({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                })
                setNewWeek()
                props.updateReload()
            }
            if (time.days === 0 & time.hours === 0 & time.minutes === 0 & time.seconds === 0) {
                props.updateReload()
            }
        }, 1000)
    }, [reload])

    return (
        <div className="">
            <p className="row float-left mt-3">
                {/* <div className="row h-50 w-100"></div> */}
                <div className="row h-50">
                    <div className="col">
                        <div className="h-50">{time.days}</div>
                        <div className="h-50">ימים</div>
                    </div>
                    <div className="col">
                        <div className="h-50">{time.hours}</div>
                        <div className="h-50">שעות</div>
                    </div>
                    <div className="col">
                        <div className="h-50">{time.minutes}</div>
                        <div className="h-50">דקות</div>
                    </div>
                    <div className="col">
                        <div className="h-50">{time.seconds}</div>
                        <div className="h-50">שניות</div>
                    </div>
                </div>
            </p>
        </div>
    )
}
