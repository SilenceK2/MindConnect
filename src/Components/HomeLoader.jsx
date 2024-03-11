import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/atom";
import { verify } from "../utils/auth";

const HomeLoader = () => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await verify();
        if (result.success) {
          setUser(result.user);
        } else {
          throw new Error("인증실패");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return {};
};

export default HomeLoader;
