# TextFirst

This is a Chrome extension for people who have slow network connection and/or limited network data usage and want to surf the web as fast and less data usage as possible. The way to achieve this is to let the browser loads only necessary stuffs first and explicitly loads some heavy stuffs on demand later. This extension is intended to do that by trying to block image/video loading and let users click on a placeholder (a square placed instead of an image) to load the image and replace that placeholder.

# Caveats
  * Not every image can be clicked to load on demand because some images are links. When you click it, it navigates to wherever the link points to. And some images are background images. It's quite hard to interact with those.
  * Videos are blocked but could not be clicked to load.

# License 

The software stands under The MIT License and comes with NO WARRANTY
