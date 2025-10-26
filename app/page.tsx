export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-green-50 to-orange-100">
      <div className="text-center max-w-4xl px-4">
        <h1 className="text-6xl font-bold text-gray-800 mb-6">
          Dairy Saathi
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          Config-Driven Multi-Farm Landing Page System
        </p>
        
        <div className="bg-white rounded-2xl shadow-2xl p-12 mb-8">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">
            Available Farms
          </h2>
          
          <div className="space-y-4">
            <a 
              href="/farmer-joe" 
              className="block p-6 bg-gradient-to-r from-orange-100 to-green-100 rounded-xl hover:shadow-lg transition-shadow border-2 border-orange-200 hover:border-orange-400"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Farmer Joe's Dairy
              </h3>
              <p className="text-gray-600 mb-2">
                No Kill, No Soy, No Corn, No Silage - No Bullshit
              </p>
              <p className="text-sm font-semibold text-orange-600">
                Click to view →
              </p>
            </a>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <p>Built with Next.js 14 • TypeScript • Tailwind CSS • MongoDB</p>
        </div>
      </div>
    </div>
  );
}
