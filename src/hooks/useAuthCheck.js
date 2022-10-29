import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../config/supabaseClient";
import { userLoggedIn } from "../fetures/auth/authSlice";

export default function useAuthCheck() {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);

    const checkSession = async () => {
        const { data: auth } = await supabase.auth.getSession();

        if (auth?.session?.access_token && auth?.session?.user) {
            dispatch(
                userLoggedIn({
                    accessToken: auth.session.access_token,
                    user: {
                        id: auth.session.user.id,
                        email: auth.session.user.email,
                        name: auth.session.user.user_metadata?.name,
                        participate:
                            auth.session.user.user_metadata?.participate,
                    },
                })
            );
        }
        setAuthChecked(true);
    };

    useEffect(() => {
        checkSession();
    }, []);

    return authChecked;
}
