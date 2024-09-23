import DateTips from "./views/DateTips/index.jsx";
import Chat from "./views/Chat/index.jsx";
import Auth from "./views/Auth/index.jsx";
import { useMemo, useState } from "react";


const App = () => {
  console.log(sessionStorage.getItem("token"));
  const [isAuthed, setIsAuthed] = useState(false);

  return <>
    {
      isAuthed ? <Chat /> : <Auth setIsAuthed={setIsAuthed} />
    }
    {/*<DateTips/>*/}
  </>;
};

export default App;