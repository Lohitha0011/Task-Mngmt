import React from "react"

const images = {
  "abstract-geometric-shapes": "/abstract-geometric-shapes.png",
  "diverse-group-avatars": "/diverse-group-avatars.png",
  "mentor-and-mentee": "/mentor-and-mentee.png",
  "mentor1": "/mentor1.png",
  "placeholder-logo": "/placeholder-logo.png",
  "placeholder-logo-svg": "/placeholder-logo.svg",
  "placeholder-user": "/placeholder-user.jpg",
  "placeholder": "/placeholder.jpg",
  "placeholder-svg": "/placeholder.svg",
  "video-player": "/video-player.jpg",
  "website-design-concept": "/website-design-concept.png",
}

const ImageLoader = ({ name, alt, ...props }) => {
  const src = images[name]
  if (!src) {
    console.warn(`Image "${name}" not found.`)
    return null
  }
  return <img src={src} alt={alt || name} {...props} />
}

export default ImageLoader
