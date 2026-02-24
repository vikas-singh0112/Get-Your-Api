const AboutPage = () => {
  return (
    <div className="w-full min-h-screen text-zinc-200 px-6 py-16 md:px-12 lg:px-24">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Why <span className="text-green-500">GetYourApi?</span>
        </h2>
        <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed">
          We’ve all been there: you have a killer frontend idea, but you spend
          three hours setting up a Mock Lab or hardcoding JSON files. 
          <span className="block mt-4 text-zinc-300">
            GetYourApi was built to eliminate that friction. Our mission is to
            provide a no-config data source for the developer community.
          </span>
        </p>

        {/* Quick Highlights */}
        <div className="mt-10 flex flex-wrap gap-4">
          <span className="px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-sm font-medium">
            🔒 Zero Auth Required
          </span>
          <span className="px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-sm font-medium">
            💎 Realistic Schemas
          </span>
          <span className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium">
            💸 Always Free
          </span>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-10 text-white flex items-center gap-2">
          What we offer <div className="h-1 w-20 bg-green-500 rounded-full"></div>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-green-500/50 transition-colors group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">🚀</div>
            <h4 className="text-xl font-bold text-white mb-2">Instant Access</h4>
            <p className="text-zinc-400">No API keys, no sign-up loops. Just fetch and go. Start prototyping in seconds.</p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-green-500/50 transition-colors group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">🛠️</div>
            <h4 className="text-xl font-bold text-white mb-2">Frontend Ready</h4>
            <p className="text-zinc-400">Perfect for fetching, creating, and searching data. Supports CRUD operations for practice.</p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-green-500/50 transition-colors group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">📈</div>
            <h4 className="text-xl font-bold text-white mb-2">High Availability</h4>
            <p className="text-zinc-400">Fast response times to keep your development environment snappy and productive.</p>
          </div>

          {/* Card 4 */}
          <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-green-500/50 transition-colors group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">📄</div>
            <h4 className="text-xl font-bold text-white mb-2">Diverse Data</h4>
            <p className="text-zinc-400">Comprehensive collections for E-commerce, Social Media, and Task Management apps.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;