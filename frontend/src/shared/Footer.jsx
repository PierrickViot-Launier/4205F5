import React from "react";
export default function Footer({ derniereModification }) {
  return (
    <footer className="bg-neutral-100 text-center text-neutral-600 lg:text-left">
      <div className="bg-neutral-200 p-6 text-center">
        <div>
          <h6 className="mb-4 flex justify-center font-semibold uppercase">
            Contact
          </h6>
          <p className="mb-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-3 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Sylvain Labranche
          </p>
          <p className="mb-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-3 h-5 w-5"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
            <a href="mailto:sylvain.labranche@cmontmorency.qc.ca">
              sylvain.labranche@cmontmorency.qc.ca
            </a>
          </p>
        </div>
        <span>Dernière modification: {derniereModification}</span>
      </div>
    </footer>
  );
}
