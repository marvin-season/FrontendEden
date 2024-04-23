import {forwardRef, useState} from "react";
import {Input} from "antd";
import DatePicker from "@/components/calendar/DatePicker.tsx";
import styled from "styled-components";
import moment from "moment";

const CalendarContainer = styled.div`
    position: relative;
`

export const Calendar = forwardRef<{}, {}>((props, ref) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateStr, setDateStr] = useState("")
    return <CalendarContainer>
        <Input value={dateStr} onFocus={() => setShowDatePicker(true)} onChange={(e) => setDateStr(e.target.value)}/>
        {
            showDatePicker && <DatePicker onClose={() => setShowDatePicker(false)} onChange={(date) => {
                const dateStr_ = moment(date).format("YYYY-MM-DD");
                setDateStr(dateStr_);
            }}/>
        }
    </CalendarContainer>
})
