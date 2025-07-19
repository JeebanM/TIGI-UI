import { useEffect, useState } from "react";
import API from "../services/apiService";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser } from "@/store/slice/authSlice";

export function useUser() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      setLoading(true);
      API.get("/user/me")
        .then((res) => {
          dispatch(setUser({ user: res.data, token: localStorage.getItem('accessToken') || "" }));
        })
        .catch(() => {
          setError("Could not load user");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, user]);

  return { user, loading, error };
}
