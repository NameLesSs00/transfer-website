"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import type { AuthSession } from "./features/auth/authModels";
import { clearAuthSession, setAuthSession } from "./features/auth/authSlice";
import { store } from ".";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    function handleRefresh(event: Event) {
      const session = (event as CustomEvent<AuthSession>).detail;
      if (!session?.accessToken) return;

      store.dispatch(setAuthSession(session));
    }

    function handleLogout() {
      store.dispatch(clearAuthSession());

      if (
        window.location.pathname.startsWith("/admin") &&
        window.location.pathname !== "/admin/login"
      ) {
        window.location.replace("/admin/login");
      }
    }

    window.addEventListener("transfer:auth:refresh", handleRefresh);
    window.addEventListener("transfer:auth:logout", handleLogout);

    return () => {
      window.removeEventListener("transfer:auth:refresh", handleRefresh);
      window.removeEventListener("transfer:auth:logout", handleLogout);
    };
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
