import axios from "axios";
import { useEffect, useState } from "react";

export default function useUser() {
  const [Loading, setLoading] = useState(true);
  const [UserDetails, setUserDetails] = useState(null);

  async function getDetails() {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "api/v1/user/me",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("todo_token"),
          },
        }
      );
      setUserDetails(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getDetails();
  }, []);

  return {
    Loading,
    UserDetails,
  };
}
