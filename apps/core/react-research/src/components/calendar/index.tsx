import {forwardRef, useMemo, useState} from "react";
import {Button} from "antd";
import DatePicker from "@/components/calendar/DatePicker.tsx";
import styled from "styled-components";
import moment from "moment";

const CalendarContainer = styled.div`
    position: relative;
`

export const Calendar = forwardRef<{}, {}>((props, ref) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState<Date>();

    const dateStr = useMemo(() => {
        return moment(date).format("YYYY-MM-DD");
    }, [date]);
    // const [dateStr, setDateStr] = useState("")
    return <CalendarContainer>
        <Button onClick={() => setShowDatePicker(!showDatePicker)}>{dateStr}</Button>
        {
            showDatePicker && <DatePicker initDate={date} onClose={() => setShowDatePicker(false)} onChange={(date) => {
                setDate(date);
            }}/>
        }
    </CalendarContainer>
})
