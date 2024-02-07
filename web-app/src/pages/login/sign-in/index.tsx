import React from "react";
export default function index() {
  return (
    <div className="h-screen bg-tahiti flex justify-center items-center">
      <div className="lg:w-2/5 md:w-1/2 w-2/3">
        <form className="bg-white p-10 rounded-lg shadow-lg min-w-full">
          <h1 className="text-center text-2xl mb-4 text-gray-600 font-bold font-sans">
            Se connecter
          </h1>
          <div>
            <input
              className="w-full bg-silver px-4 py-2 rounded-lg focus:outline-none mb-2"
              type="text"
              name="email"
              id="email"
              placeholder="@email"
            />
          </div>
          <div>
            <input
              className="w-full bg-silver px-4 py-2 rounded-lg focus:outline-none mb-2"
              type="text"
              name="password"
              id="password"
              placeholder="Mot de passe"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-tahiti rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
          >
            Se connecter
          </button>
          <div className="px-4 py-2 focus:outline-none mb-2">
            <p>
              Première visite ? Vous pouvez créer un compte{" "}
              <a href="sign-up">ici</a>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
