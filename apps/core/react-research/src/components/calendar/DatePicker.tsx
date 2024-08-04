import {forwardRef, memo, useEffect, useState} from "react";
import styled from "styled-components";
import {getMonthData} from "@/utils/date.ts";
import {Button} from "antd";

const DatePickerContainer = styled.div`
    padding: 20px;
    position: absolute;
    top: 100px;
`

const DatePickerContent = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-radius: 8px;
    background-color: #ffffff;
`

const DatePickerHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const DateBox = styled.div<{ isToday?: boolean; selected?: boolean }>`
    user-select: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 4px 8px;
    background: ${({isToday, selected}) => isToday ? "#b0def3" : selected ? "#d9b6df" : "#ffffff"};

    &:hover {
        background-color: #f4d1e9;
    }
`

const DatePicker = forwardRef<
    {},
    {
        initDate?: Date,
        onChange: (date: Date) => void;
        onClose: () => void;
    }>(({onChange, onClose, initDate}, ref) => {
    const [someDate, setSomeDate] = useState<Date>(new Date())
    const {dates, todayDate} = useDate(someDate);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(initDate)


    return <DatePickerContainer>
        <DatePickerHeader>
            <Button type={"text"} onClick={() => {
                // someDate.setDate(someDate.getDate() - 1)
                // setSomeDate(todayDate)
            }}>{'<'}</Button>
            {'04'}
            <Button type={"text"}>{'>'}</Button>
        </DatePickerHeader>
        <DatePickerContent>
            {
                dates.map((item, index) => {
                    return <DateBox
                        key={index}
                        isToday={item.getDate() === todayDate.getDate()}
                        selected={selectedDate?.getDate() === item.getDate()}
                        onDoubleClick={() => {
                            setSelectedDate(item);
                            onChange(item);
                            onClose();
                        }}
                    >
                        {
                            item.getDate()
                        }
                    </DateBox>
                })
            }
        </DatePickerContent>
    </DatePickerContainer>
})


const useDate = (someDate?: Date) => {
    const [dates, setDates] = useState<Date[]>([]);

    useEffect(() => {
        console.log("some ", someDate)
        if (!someDate) {
            someDate = new Date()
        }
        const r = getMonthData(someDate.getFullYear(), someDate.getMonth());
        setDates(r);
        return () => {
            setDates([]);
        }
    }, [someDate]);

    return {
        someDate,
        dates,
        todayDate: new Date()
    }
}

export default memo(DatePicker)
