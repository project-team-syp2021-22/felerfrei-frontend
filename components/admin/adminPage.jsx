import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../authprovider";
import { API_URL } from "../constants";

function AdminPage({ children }) {
  const { userToken } = useAuth();
  const [loading, setLoading] = useState(true);

  let router = useRouter();

  if (!userToken) {
    return <div>You are not logged in</div>;
  }

  useEffect(async () => {
    await axios
      .get(`${API_URL}/auth/isAdmin`, {
        headers: { Authorization: `Bearer ${userToken.token}` },
      })
      .catch((err) => {
        router.push("/");
      });
    setLoading(false);
  }, []);

  return (
    <div>
      {loading && (<>Loading...</>)}
      {!loading && children}
    </div>
  );
}

export default AdminPage;
