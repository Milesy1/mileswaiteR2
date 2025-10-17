import GenerativeArt from '@/components/GenerativeArt';

export default function CollectiblePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Generative Art
          </h1>
          <p className="text-xl text-teal-300 mb-2">by Miles Waite</p>
          <p className="text-sm text-white/60">Made with code • JavaScript + Canvas API</p>
        </div>

        {/* Main Art Display */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Art Piece */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <GenerativeArt 
                width={500} 
                height={500} 
                className="mx-auto"
              />
            </div>
            
            {/* Art Details */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Artwork Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Type:</span>
                  <span className="text-white">Generative Art</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Technology:</span>
                  <span className="text-white">JavaScript + Canvas API</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Resolution:</span>
                  <span className="text-white">500x500px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Style:</span>
                  <span className="text-white">Abstract, Dynamic</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Interaction Stats */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Engagement</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                    <span className="text-white">Likes</span>
                  </div>
                  <span className="text-white font-semibold">24</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <span className="text-white">Collectors</span>
                  </div>
                  <span className="text-white font-semibold">7</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <span className="text-white">Comments</span>
                  </div>
                  <span className="text-white font-semibold">12</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">About This Piece</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                A dynamic generative art piece featuring rotating ribbons that create the illusion of a three-dimensional cylinder. 
                The artwork uses mathematical functions to generate flowing, organic forms that continuously evolve and transform.
              </p>
              <p className="text-white/80 leading-relaxed">
                Each viewing is unique as the algorithm generates new patterns and movements, creating an ever-changing visual experience 
                that explores the intersection of mathematics, code, and artistic expression.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/25">
                Collect
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Like
                </button>
                
                <button className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex space-x-4 mb-4">
                <button className="text-teal-400 border-b-2 border-teal-400 pb-2 px-1 text-sm font-medium">
                  Comments
                </button>
                <button className="text-white/60 hover:text-white border-b-2 border-transparent pb-2 px-1 text-sm font-medium">
                  Collectors
                </button>
                <button className="text-white/60 hover:text-white border-b-2 border-transparent pb-2 px-1 text-sm font-medium">
                  History
                </button>
              </div>
              
              <div className="text-white/60 text-sm">
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

