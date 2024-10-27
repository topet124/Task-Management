import Link from "next/link";
import { ArrowRight } from "lucide-react"


export default function Home() {
  return (

    <main className="min-h-screen bg-gradient-to-br from-teal-100 via-teal-300 to-teal-200 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Target Management Dashboard
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Welcome to your centralized hub for managing and tracking targets.
        </p>
        <div className="flex justify-center">
          <Link href="/dashboard" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
            Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </main>

  );
}
