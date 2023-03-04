import {useRef, MutableRefObject, FormEvent, useState} from "react";
import {useAuth} from "../contexts/Auth";
import {Simulate} from "react-dom/test-utils";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import google_icon from "../assets/google.svg";
import logo from "../assets/logo.svg"
import {supabase} from "../supabase";

export default function Login() {
    const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
    const [error, setError] = useState<string | null>(null);
    const {signIn} = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError('')
        const form = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        const {data, error} = await signIn(form)
        if (error) {
            setError(error?.message ?? null)
        } else {
            toast("Welcome Back!", {
                type: "success"
            })
            navigate('/')
        }
        // @TODO: add sign up logic
    }

    const signUpWithGoogle = async () => {
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'google'
        });
    }

    return (
        <>
            <div className="flex container min-h-full flex-col justify-center pt-24 py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src={logo}
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Sign in to your
                        account</h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-light-dark py-8 px-4 shadow rounded-lg sm:px-10">
                        {error && <pre className={'text-red-500 pb-2 whitespace-pre-wrap'}>{error}</pre>}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-50">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        ref={emailRef}
                                        className="block w-full appearance-none rounded-md bg-dark text-white border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-50">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        ref={passwordRef}
                                        className="block w-full appearance-none rounded-md bg-dark text-white border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">

                                <div className="text-sm">
                                    <Link to={'/create-account'}
                                          className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Click here to Sign Up
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Sign in
                                </button>
                                <button
                                    type="button"
                                    onClick={signUpWithGoogle}
                                    className="flex mt-4 w-full items-center justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <img src={google_icon} className={'w-4 mr-2'} alt={'ddf'}/>
                                    Continue with Google
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
  