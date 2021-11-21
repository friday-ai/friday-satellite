import React from 'react';
import Favicon from '../../assets/favicon.svg';

const App: React.FC = () => {
  return (
    <div className="bg-base-200 h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto" src={Favicon} alt="Friday icon" width="50" height="50" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6 bg-base-100 p-10 rounded-btn shadow-lg" action="http://localhost:3002/login" method="POST">
          <div className="rounded-md shadow-sm">
            <div className="form-control">
              <label htmlFor="email-address" className="label">
                <span className="label-text">Email address</span>
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                required
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                required
                className="input input-bordered"
              />
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-block btn-primary flex justify-center relative">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
