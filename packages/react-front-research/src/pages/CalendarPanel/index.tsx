import {Calendar} from "@/components/calendar";
import {md5} from "js-md5";
import {sleep} from "@marvin/shared";
sleep(1000).then()
// const s1 = md5('').match(/\d/g)?.map(i => +i + 1).join('');
// console.log("🚀 => ", s1)
const CalendarPanel = () => {
    return <>
        <Calendar/>
    </>
}
export default CalendarPanel;
