import {useRef, MutableRefObject, FormEvent, useState} from "react";
import {useAuth} from "../contexts/Auth";
import {Simulate} from "react-dom/test-utils";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {supabase} from "../supabase";
import google_icon from "../assets/google.svg"
import logo from "../assets/logo.svg";


export default function Login() {
    const navigate = useNavigate();
    const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>('')
    const {signUp} = useAuth()

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError('')
        const form = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        const {data, error} = await signUp(form)
        if (error) {
            console.log(JSON.stringify(error))
            setError(error?.message ?? null)
        } else {
            setSuccessMessage('Account Created, we sent you a mail to confirm your Account Creation');
            emailRef.current.value = ''
            passwordRef.current.value = ''
            toast("Account Created Successfully", {
                type: "success"
            })
        }
        // @TODO: add sign up logic
    }

    const signUpWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
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
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Create An Account</h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-light-dark py-8 px-4 shadow rounded-lg sm:px-10">
                        {error && <pre className={'text-red-500 pb-2 whitespace-pre-wrap'}>{error}</pre>}
                        {successMessage && <pre className={'text-green-500 pb-2 whitespace-pre-wrap'}>{successMessage}</pre>}
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
                                        className="block w-full appearance-none bg-dark text-white rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                                        className="block w-full appearance-none bg-dark text-white rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">

                                <div className="text-sm">
                                    <Link to={'/login'} className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Already Have an account
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Sign Up
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
