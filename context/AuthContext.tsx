"use client";
import React, { createContext, useContext, useState } from "react";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabaseClient";

interface AuthContextType {
  user: { username: string; userId: string } | null;
  register: (username: string, password: string) => Promise<boolean>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  register: async () => false,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ username: string; userId: string } | null>(
    null
  );

  const register = async (username: string, password: string): Promise<boolean> => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Palun täida kõik väljad!");
      return false;
    }

    try {
      const { data, error } = await supabase
        .from("Users")
        .select("*")
        .eq("username", username)
        .single();

      if (error || !data) {
        const { error: insertError } = await supabase.from("Users").insert([
          {
            username,
            password: await bcrypt.hash(password, 10),
          },
        ]);

        if (insertError) {
          alert("Kasutaja loomine ebaõnnestus");
          return false;
        }

        alert("Kasutaja registreeritud!");
        return true;
      }

      alert("Kasutaja on juba olemas.");
      return false;
    } catch (err) {
      console.error("Registreerimise viga:", err);
      return false;
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    const { data: user, error } = await supabase
      .from("Users")
      .select("*")
      .eq("username", username)
      .single();

    if (error || !user) {
      alert("Vale kasutajanimi või parool");
      return false;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      alert("Vale kasutajanimi või parool");
      return false;
    }

    setUser({ username, userId: user.id });

    return true;
  };


  const logout = () => {
    setUser(null);
    alert("Oled välja logitud.");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
