"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useUsername } from "./context/UserContetext"
import { useRouter } from "next/navigation";
import { Delete, Edit, Trash } from "lucide-react";
import Modal from "./components/Modal";

type Post = {
	id: number;
	username: string;
	title: string;
	content: string;
	created_datetime: string;
}

type FormData = {
	username: string;
	title: string;
	content: string;
}

export default function Home() {

	const router = useRouter()

	const { user } = useUsername()

	const { register, handleSubmit, reset } = useForm<FormData>()

	const [posts, setPosts] = useState<Post[]>([])
	const [deletedPost, setDeletedPost] = useState<number>(0)
	const [editedPost, setEditedPost] = useState<number>(0)

	const fetchPosts = async () => {
		try {
			const response = await axios.get("https://dev.codeleap.co.uk/careers/");
			setPosts(response.data.results);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	};

	useEffect(() => {
		if (!user) {
			alert("You need to log in")
			router.push("/signup")
		};
		fetchPosts()
	}, [])

	const createPost = async (data: FormData) => {
		try {
			const response = await axios.post("https://dev.codeleap.co.uk/careers/", {
				username: user?.username,
				title: data.title,
				content: data.content
			})
			reset()
			fetchPosts()
			console.log(response.data)
		} catch (error) {

		}
	}

	const updatePost = async (data: FormData) => {
		try {
			await axios.patch(`https://dev.codeleap.co.uk/careers/${editedPost}/`, {
				title: data.title,
				content: data.content
			})
			reset()
			setEditedPost(0)
			fetchPosts()
		} catch (error) {
			console.error(error)
		}
	}

	const deletePost = async (id: number) => {
		try {
			const response = await axios.delete(`https://dev.codeleap.co.uk/careers/${id}/`)
			console.log(response.data)
			fetchPosts()
		} catch (error) {

		}
	}

	function timeAgo(dateString: string) {

		const now = new Date()
		const past = new Date(dateString)

		const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

		if (diffInSeconds < 60) {
			return `${diffInSeconds} seconds ago`
		}

		const diffInMinutes = Math.floor(diffInSeconds / 60)

		if (diffInMinutes < 60) {
			return `${diffInMinutes} minutes ago`
		}

		const diffInHours = Math.floor(diffInMinutes / 60)

		if (diffInHours < 24) {
			return `${diffInHours} hours ago`
		}

		const diffInDays = Math.floor(diffInHours / 24)

		return `${diffInDays} days ago`
	}

	return (
		<main className="w-full min-h-screen flex items-center justify-center bg-neutral-200">
			<div className="w-full flex flex-col max-w-5xl min-h-screen bg-white">
				<header className="w-full px-10 py-8 bg-primary">
					<h2 className="text-neutral-50 text-lg font-semibold">CodeLeap Network</h2>
				</header>
				<div className="flex flex-col p-4 gap-4">
					<form onSubmit={handleSubmit(createPost)} className="flex flex-col gap-4 border border-neutral-300 rounded-2xl p-6">
						<h3 className='text-xl font-semibold'>What's on your mind?</h3>

						<div className="flex flex-col gap-1">
							<label htmlFor="title">Title</label>
							<input {...register("title")} type="text" placeholder="What is on your mind?" className="p-2 px-4 border border-neutral-400 rounded-xl" />
						</div>

						<div className="flex flex-col gap-1">
							<label>Content</label>
							<textarea  {...register("content")} placeholder="Content here" className="p-2 px-4 border border-neutral-400 rounded-xl resize-none h-32" />
						</div>

						<button type="submit" className="ml-auto relative right-0 bg-primary text-white py-1 px-8 cursor-pointer w-max rounded-lg hover:scale-105 hover:bg-blue-600 transition-all duration-300">
							Create
						</button>
					</form>

					<div className="flex flex-col gap-4 ">
						{posts?.reverse().map((post: Post) =>
							<div key={post.id.toString()} className="flex flex-col gap-2 rounded-2xl border border-neutral-200">
								<div className="flex flex-row justify-between items-center gap-4 bg-primary rounded-t-2xl p-4">
									<h4 className="font-semibold text-lg text-neutral-50">{post.title}</h4>
									<div className="flex gap-3 text-neutral-50">
										<Trash onClick={() => setDeletedPost(post.id)} />

										{user?.username == post.username && <Edit onClick={() => setEditedPost(post.id)} />}
									</div>
								</div>

								<div className="flex flex-col gap-2 p-4">
									<div className="flex w-full justify-between">
										<span className="text-sm text-neutral-500">@{post.username}</span>
										<span className="text-sm text-neutral-500 ml-2">
											{timeAgo(post.created_datetime)}
										</span>
									</div>
									<p>{post.content}</p>
								</div>
							</div>

						)}
						{deletedPost > 0 && (
							<Modal onClose={() => setDeletedPost(0)}>
								<div className="flex flex-col gap-6 p-2">
									<h2 className="text-lg font-semibold">
										Are you sure you want to delete this item?
									</h2>

									<div className="flex justify-end gap-3">
										<button
											onClick={() => setDeletedPost(0)}
											className="border px-8 py-0.5 rounded"
										>
											Cancel
										</button>

										<button
											onClick={() => deletePost(deletedPost)}
											className="bg-red-500 text-white px-8 py-0.5 rounded"
										>
											Delete
										</button>
									</div>
								</div>
							</Modal>
						)}
						{editedPost > 0 && (
							<Modal onClose={() => setEditedPost(0)}>
								<div className="flex flex-col gap-6 p-2 md:w-125">
									<h2 className="text-lg font-semibold">
										Edit item
									</h2>

									<form
										onSubmit={handleSubmit(updatePost)}
										className="flex flex-col gap-2"
									>
										<label>Title</label>
										<input
											{...register("title")}
											type="text"
											className="p-2 border rounded-xl"
										/>

										<label>Content</label>
										<textarea
											{...register("content")}
											className="p-2 border rounded-xl"
										/>

										<div className="flex justify-end gap-3 mt-4">
											<button
												type="button"
												onClick={() => setEditedPost(0)}
												className="border px-8 py-0.5 rounded-lg"
											>
												Cancel
											</button>

											<button
												type="submit"
												className="bg-green-500 text-white px-8 py-0.5 rounded-lg"
											>
												Save
											</button>
										</div>
									</form>
								</div>
							</Modal>
						)}
					</div>

				</div>
			</div>
		</main>
	);
}
