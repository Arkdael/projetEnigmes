'use client';
import Header from "../app/shared/header";
import Footer from "../app/shared/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <div className="content">
          <h1>Lorem Ipsum</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
