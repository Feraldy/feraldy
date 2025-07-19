import React, { useState, useEffect } from 'react'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { auto, fill } from '@cloudinary/url-gen/actions/resize'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { format, quality } from '@cloudinary/url-gen/actions/delivery'
import Navbar from '../components/Navbar'

const Photography: React.FC = () => {
  const [currentCollage, setCurrentCollage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'do2fsq5mr'
    }
  })

  const allImages = [
    'braga-asia-africa-17_ushlt8',
    'sample-2', 
    'sample-3',
    'sample-4',
    'sample-5',
    'sample-6',
    'sample-7',
    'sample-8',
    'sample-9',
    'sample-10',
    'sample-11',
    'sample-12'
  ]

  const collageLayouts = [
    {
      name: "Mosaic",
      items: [
        { id: 0, className: "col-span-2 row-span-2", width: 600, height: 600 },
        { id: 1, className: "col-span-1 row-span-1", width: 300, height: 300 },
        { id: 2, className: "col-span-1 row-span-1", width: 300, height: 300 },
        { id: 3, className: "col-span-1 row-span-2", width: 300, height: 600 },
        { id: 4, className: "col-span-2 row-span-1", width: 600, height: 300 }
      ]
    },
    {
      name: "Gallery Wall",
      items: [
        { id: 5, className: "col-span-1 row-span-2", width: 300, height: 600 },
        { id: 6, className: "col-span-2 row-span-1", width: 600, height: 300 },
        { id: 7, className: "col-span-1 row-span-1", width: 300, height: 300 },
        { id: 8, className: "col-span-1 row-span-1", width: 300, height: 300 },
        { id: 9, className: "col-span-2 row-span-2", width: 600, height: 600 }
      ]
    },
    {
      name: "Magazine",
      items: [
        { id: 10, className: "col-span-3 row-span-2", width: 900, height: 600 },
        { id: 11, className: "col-span-1 row-span-1", width: 300, height: 300 },
        { id: 0, className: "col-span-1 row-span-1", width: 300, height: 300 },
        { id: 1, className: "col-span-1 row-span-1", width: 300, height: 300 },
        { id: 2, className: "col-span-2 row-span-1", width: 600, height: 300 }
      ]
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentCollage((prev) => (prev + 1) % collageLayouts.length)
        setIsTransitioning(false)
      }, 500)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const getOptimizedImage = (publicId, width, height) => {
    return cld
      .image(publicId)
      .resize(fill().width(width).height(height).gravity(autoGravity()))
      .delivery(format('auto'))
      .delivery(quality('auto'))
  }

  const getFullSizeImage = (publicId) => {
    return cld
      .image(publicId)
      .resize(auto().gravity(autoGravity()).width(1920))
      .delivery(format('auto'))
      .delivery(quality('auto'))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6">
            Photography
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Capturing moments and telling stories through the lens. 
            Watch as each collage transforms into a new visual narrative.
          </p>
          <div className="mt-8 flex justify-center items-center space-x-4">
            <div className="text-sm text-gray-400">
              {collageLayouts[currentCollage].name} Layout
            </div>
            <div className="flex space-x-2">
              {collageLayouts.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentCollage ? 'bg-white' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Collage */}
      <div className="relative px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div 
            className={`grid grid-cols-3 grid-rows-3 gap-4 h-[600px] md:h-[800px] transition-all duration-500 ${
              isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {collageLayouts[currentCollage].items.map((item, index) => {
              const imageId = allImages[item.id] || allImages[0]
              return (
                <div
                  key={`${currentCollage}-${index}`}
                  className={`${item.className} group relative overflow-hidden rounded-xl shadow-2xl cursor-pointer transform transition-all duration-700 hover:scale-105 hover:z-10`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isTransitioning ? 'none' : 'fadeInScale 0.8s ease-out forwards'
                  }}
                  onClick={() => setSelectedImage(imageId)}
                >
                  <AdvancedImage
                    cldImg={getOptimizedImage(imageId, item.width, item.height)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={`Photography ${item.id + 1}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <div className="text-white text-sm font-medium">
                      Click to view full size
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-neutral-700">
            <h2 className="text-3xl font-bold text-white mb-6">About My Photography</h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-8">
              Photography has been my passion for [X] years. I specialize in [your specialty - 
              landscape, portrait, street, etc.] photography and love capturing [what you love to capture].
              Each image tells a story and represents a moment frozen in time.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Equipment</h3>
                <div className="space-y-2 text-gray-300">
                  <div>Camera: [Your camera model]</div>
                  <div>Favorite Lenses: [Your lens preferences]</div>
                  <div>Editing: [Your editing software]</div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Style</h3>
                <div className="space-y-2 text-gray-300">
                  <div>Focus: [Your photography focus]</div>
                  <div>Inspiration: [What inspires you]</div>
                  <div>Approach: [Your approach to photography]</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <AdvancedImage
              cldImg={getFullSizeImage(selectedImage)}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              alt="Full size photography"
            />
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Photography