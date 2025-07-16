"use client"

import * as React from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

import { Card, CardContent } from "@/components/ui/card"
import { useBookedSeats } from "@/context/BookedSeatsContext"
export function CarouselImages() {
  const { selectedShow } = useBookedSeats();

  const images = [
    {
      'src': 'https://res.cloudinary.com/delljgt3m/image/upload/v1751861761/assets/poster-1.jpg',
      'layout': 'https://res.cloudinary.com/delljgt3m/image/upload/v1752640341/assets/layout-reconnect_h1s1qz.png',
      'show_id': 'reconnect',
    },
    {
      'src': 'https://res.cloudinary.com/delljgt3m/image/upload/v1751861761/assets/poster-2.jpg',
      'layout': 'https://res.cloudinary.com/delljgt3m/image/upload/v1752640332/assets/layout-disconnect_rdacyb.png',
      'show_id': 'disconnect',
    }
  ];

  const showImages = images.filter(img => img.show_id === selectedShow);

  const [selectedImage, setSelectedImage] = React.useState<string | null>(null)

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto">
      <Card className="h-full shadow-none border-none bg-transparent">
        <CardContent className="">
          <img
            src={showImages[0]?.src}
            alt={`Image`}
            className="w-full h-full object-cover rounded-xl cursor-zoom-in"
            onClick={() => setSelectedImage(showImages[0]?.src)}
          />
        </CardContent>
      </Card>
      <h1 className="text-xl lg:text-4xl font-semibold text-center uppercase mt-5">
        {`Layout Kursi`}
      </h1>
      <Card className="h-full shadow-none border-none bg-transparent">
        <CardContent className="">
          <img
            src={showImages[0]?.layout}
            alt={`Image`}
            className="w-full h-full object-cover rounded-xl cursor-zoom-in"
            onClick={() => setSelectedImage(showImages[0]?.layout)}
          />
        </CardContent>
      </Card>
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="absolute top-5 right-5 text-white text-2xl cursor-pointer z-50" onClick={() => setSelectedImage(null)}>
            ✕
          </div>
          <TransformWrapper
            initialScale={1}
            minScale={0.1}
            maxScale={4}
            wheel={{ step: 50 }}
            pinch={{ step: 5 }}
            doubleClick={{ disabled: true }}
          >
            <TransformComponent>
              <img
                src={selectedImage}
                alt="Zoomed"
                className="max-w-[90vw] max-h-[90vh] object-contain"
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
      )}
    </div>
  )
}
