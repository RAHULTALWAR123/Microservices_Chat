import axios from "axios";
import { create } from "zustand";

interface LoginResponse {
  message: string;
}

interface UserState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
  loading: boolean;
  email : string ;
  setEmail : (email: string) => void;
  loginMessage: LoginResponse | null;

  login: (email: string) => Promise<void>;
  verify : (email : string , otp : string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  loading: false,
  loginMessage: null,
  email: "",

  setEmail : (email: string) => {
    set({ email });
  },

  login: async (email: string) => {
    try {
      set({ loading: true });

      const res = await axios.post(
        "http://localhost:5000/api/v1/login",
        { email }   // FIXED: send object
      );
      
      console.log(res.data);
      
      set({
        loginMessage: res.data,
        loading: false,
      });


    } catch (error) {
      console.log("error in login", error);
      set({ loading: false });
    }
  },

  verify : async(email : string , otp : string) => {
    try {
        const res = await axios.post("http://localhost:5000/api/v1/verify",{email,otp});
        console.log(res.data);
        set({user : res.data});
        
    } catch (error) {
      console.log("error in verify", error);
      set({ loading: false });
    }
}
}));
