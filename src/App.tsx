import "./firebase";
import { useEffect, useState } from "react";
import { authService, dbService } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import AppRouter from "./components/router/Router";

function App() {
  //
  // FOR DEV FOR DEV FOR DEV
  // FOR DEV FOR DEV FOR DEV
  // 배포시엔 아래 state 둘다 false로 바꾸기
  //
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onAuthStateChange = async () => {
    authService.onAuthStateChanged(async (user) => {
      if (user && user.displayName) {
        setIsLoggedIn(true);

        const docRef = doc(dbService, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          await setDoc(docRef, {
            displayName: user.displayName,
            uid: user.uid,
          });
        }
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  };

  useEffect(() => {
    onAuthStateChange();
  }, []);

  return (
    <div className="App">
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "로딩중.."}
    </div>
  );
}

export default App;
