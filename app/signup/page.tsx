"use client"
import { useForm } from "react-hook-form"
import { useUsername } from "../context/UserContetext"
import { useRouter } from "next/navigation"

type FormData = {
    username: string
}

export default function Signup() {

    const router = useRouter()

    const {user, setUser} = useUsername()

    const { register, handleSubmit } = useForm<FormData>()

    const submitUsername = async (data: FormData) => {
        try {
            setUser(data)
            router.push("/")
        } catch (error) {
            
        }
        console.log(data)
    }

    return (
        <main className="w-full h-screen flex items-center justify-center bg-neutral-200 px-4 md:px-0">
            <form onSubmit={handleSubmit(submitUsername)} className="w-125 h-52 p-6 flex flex-col gap-4 bg-white rounded-2xl shadow-md">
                <h2 className="text-xl font-bold">Welcome to CodeLeap network!</h2>

                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Please enter your username</label>

                    <input
                        {...register("username")}
                        type="text"
                        placeholder="John doe"
                        className="p-2 px-4 border border-neutral-400 rounded-xl"
                    />
                </div>

                <button
                    type="submit"
                    className="ml-auto bg-primary text-white py-1 px-8 cursor-pointer uppercase w-max rounded-lg hover:scale-105 hover:bg-blue-600 transition-all duration-300"
                >
                    Enter
                </button>
            </form>
        </main>
    )
}