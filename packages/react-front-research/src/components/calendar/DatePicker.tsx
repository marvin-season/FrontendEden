import {forwardRef, memo, useEffect, useState} from "react";
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

const DatePickerHeader = styled.div`

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
    const {dates, currentDate} = useDate();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(initDate)
    console.log('selectedDate', selectedDate)
    useEffect(() => {

    }, []);

    return <DatePickerContainer>
        <DatePickerBox>
            <DatePickerHeader>

            </DatePickerHeader>
            {
                dates.map((item, index) => {
                    return <DateBox
                        key={index}
                        isToday={item.getDate() === currentDate.getDate()}
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

export default memo(DatePicker)
