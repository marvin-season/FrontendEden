import {forwardRef, useEffect, useState} from "react";
import styled from "styled-components";
import {getMonthData} from "@/utils/date.ts";

const DatePickerContainer = styled.div`
    position: absolute;
    top: 100px;
`

const DatePickerBox = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-radius: 8px;
    padding: 20px;
    background-color: #ffffff;
`

const DateBox = styled.div<{ isToday?: boolean; selected?: boolean }>`
    border-radius: 4px;
    cursor: pointer;
    padding: 4px 8px;
    background: ${({isToday, selected}) => isToday ? "#b0def3" : selected ? "" : "#ffffff"};

`

const DatePicker = forwardRef<
    {},
    {
        onChange: (date: Date) => void;
    }>(({}, ref) => {
    const {dates, currentDate} = useDate()

    console.log({dates, currentDate})
    useEffect(() => {

    }, []);

    return <DatePickerContainer>
        <DatePickerBox>
            {
                dates.map((item, index) => {
                    return <DateBox key={index} isToday={item.getDate() === currentDate.getDate()} selected={false}>
                        {
                            item.getDate()
                        }
                    </DateBox>
                })
            }
        </DatePickerBox>
    </DatePickerContainer>
})


const useDate = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const [dates, setDates] = useState<Date[]>([]);

    useEffect(() => {
        const r = getMonthData(currentDate.getFullYear(), currentDate.getMonth());
        setDates(r);
        return () => {
            setDates([]);
        }
    }, []);

    return {
        currentDate,
        dates
    }
}

export default DatePicker
