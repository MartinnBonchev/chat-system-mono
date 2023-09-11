import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useRegister } from '@hooks/use-auth';

import type { RegisterRequest } from '@hooks/use-auth';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

export default function Register() {
  const [{ data, error, loading }, register] = useRegister();
  const navigate = useNavigate();
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data?.success) {
      navigate('/login');
    }
  }, [data?.success, navigate]);

  const onSubmit = (data: RegisterRequest) => register({ data });

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-300">

      <h1 className='font-semibold text-xl'>Register</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
          <label
            htmlFor="email"
            className={`block font-bold text-sm mb-2 ${
              errors.email ? 'text-red-400' : 'text-black'
            }`}
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="john@snow.com"
            className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-black  focus:bg-slate-100 ${
              errors.email ? 'text-black border-red-400' : 'border-black'
            }`}
            {...registerForm('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">
              A valid email is required.
            </p>
          )}
        </div>

        <div className="mb-8">
          <label
            htmlFor="password"
            className={`block font-bold text-sm mb-2 ${
              errors.password ? 'text-red-400' : 'text-black'
            }`}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 text-black focus:bg-slate-100 placeholder-black ${
              errors.password ? 'border-red-400' : 'border-black'
            }`}
            {...registerForm('password')}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              Your password is required.
            </p>
          )}
        </div>

        {error && <p className='text-red-500 font-semibold py-2'>{error.message}</p>}

        {loading ? (
          <p className='text-black' >Loading...</p>
        ) : (
          <button className="inline-block bg-blue-500 text-white rounded shadow py-2 px-5 text-sm">
            Register
          </button>
        )}
      </form>
    </div>
  );
}
