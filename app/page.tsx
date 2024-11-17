export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">
          Prepscpective
        </h1>
        <p className="text-lg text-white mt-4">
          Your go-to platform for sharing interview experiences anonymously.
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:bg-purple-100">
          Get Started
        </button>
      </div>
    </div>
  );
}
