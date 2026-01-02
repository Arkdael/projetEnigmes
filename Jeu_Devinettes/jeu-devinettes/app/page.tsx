'use client';
import { ChangeEventHandler, Dispatch, FormEventHandler, SetStateAction, useState } from "react";
import Link from 'next/link';
import { redirect } from "next/navigation";
import Header from "./shared/header";
import Footer from "./shared/footer";
export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <div className="content">
          <p>Allo</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
