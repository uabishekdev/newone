"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FarmProvider } from "@/lib/contexts/FarmContext";
import {
  Camera,
  Upload,
  Facebook,
  Twitter,
  Instagram,
  Share2,
} from "lucide-react";
import { DEFAULT_SOCIAL_CAPTION, CANVAS_CONFIG } from "@/lib/constants";
import { FarmConfig } from "@/lib/types/farm";
import farmConfigData from "@/app/farms/farmer-joe/config.json";

const farmConfig = farmConfigData as FarmConfig;

export default function SocialPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState(DEFAULT_SOCIAL_CAPTION);
  const [isGenerating, setIsGenerating] = useState(false);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [shareSupported, setShareSupported] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      if (navigator.share) {
        setShareSupported(true);
      }
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setFinalImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePostImage = () => {
    if (!selectedImage || !canvasRef.current) return;

    setIsGenerating(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = CANVAS_CONFIG.WIDTH;
      canvas.height = CANVAS_CONFIG.HEIGHT;

      ctx.fillStyle = CANVAS_CONFIG.BACKGROUND_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const scale = Math.min(
        canvas.width / img.width,
        (canvas.height * CANVAS_CONFIG.IMAGE_SCALE) / img.height
      );
      const imgWidth = img.width * scale;
      const imgHeight = img.height * scale;
      const x = (canvas.width - imgWidth) / 2;
      const y = CANVAS_CONFIG.MARGIN_TOP;

      ctx.drawImage(img, x, y, imgWidth, imgHeight);

      const captionY = y + imgHeight + CANVAS_CONFIG.CAPTION_OFFSET;
      ctx.fillStyle = CANVAS_CONFIG.TEXT_COLOR;
      ctx.font = `bold ${CANVAS_CONFIG.FONT_SIZE}px ${CANVAS_CONFIG.FONT_FAMILY}`;
      ctx.textAlign = "center";

      const words = caption.split(" ");
      let line = "";
      let lineY = captionY;
      const maxWidth = canvas.width - CANVAS_CONFIG.MAX_WIDTH_PADDING;
      const lineHeight = CANVAS_CONFIG.LINE_HEIGHT;

      words.forEach((word, index) => {
        const testLine = line + word + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && index > 0) {
          ctx.fillText(line, canvas.width / 2, lineY);
          line = word + " ";
          lineY += lineHeight;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line, canvas.width / 2, lineY);

      const dataUrl = canvas.toDataURL("image/png");
      setFinalImage(dataUrl);
      setIsGenerating(false);
    };
    img.src = selectedImage;
  };

  const dataURLtoBlob = (dataurl: string): Blob => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareWithWebAPI = async () => {
    if (!finalImage) return;

    const blob = dataURLtoBlob(finalImage);
    const file = new File([blob], "social-post.png", { type: "image/png" });

    if (navigator.share) {
      try {
        await navigator.share({
          files: [file],
          title: "Social Media Post",
          text: caption,
        });
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
    }
  };

  const downloadImage = () => {
    if (!finalImage) return;
    const link = document.createElement("a");
    link.download = "social-post.png";
    link.href = finalImage;
    link.click();
  };

  const shareToFacebook = () => {
    if (!finalImage) return;

    copyToClipboard();
    downloadImage();

    window.open("https://www.facebook.com/", "_blank");
  };

  const shareToInstagram = () => {
    if (!finalImage) return;

    copyToClipboard();
    downloadImage();

    if (isMobile) {
      window.location.href = "instagram://";
      window.open("https://www.instagram.com/", "_blank");
    } else {
      window.open("https://www.instagram.com/", "_blank");
    }
  };

  const shareToTwitter = () => {
    if (!finalImage) return;

    downloadImage();

    const text = encodeURIComponent(caption);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  return (
    <FarmProvider config={farmConfig}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-green-50 to-orange-100">
        <Header />
        <main className="flex-1 w-full py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-orange-700">
                Create Social Media Post
              </h1>
              <p className="text-lg text-gray-700">
                Upload an image, add your caption, and share across all
                platforms!
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Step 1: Upload Image
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                  >
                    <Upload size={24} />
                    Upload from Device
                  </button>
                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
                  >
                    <Camera size={24} />
                    {isMobile ? "Take Photo" : "Upload Photo"}
                  </button>
                </div>
                {!isMobile && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Camera capture only works on mobile devices
                  </p>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {selectedImage && (
                <>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Preview
                    </h3>
                    <div className="relative w-full max-w-md mx-auto">
                      <img
                        src={selectedImage}
                        alt="Preview"
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Step 2: Edit Caption
                    </h2>
                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-gray-800"
                      placeholder="Enter your caption here..."
                    />
                    <button
                      onClick={copyToClipboard}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      {copiedCaption
                        ? "✓ Copied!"
                        : "Copy Caption to Clipboard"}
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={generatePostImage}
                      disabled={isGenerating}
                      className="w-full px-6 py-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all disabled:opacity-50"
                    >
                      {isGenerating ? "Generating..." : "Generate Post Image"}
                    </button>
                  </div>
                </>
              )}

              {finalImage && (
                <>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Final Post
                    </h3>
                    <div className="relative w-full max-w-md mx-auto">
                      <img
                        src={finalImage}
                        alt="Final Post"
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Step 3: Share
                    </h2>

                    {shareSupported && (
                      <button
                        onClick={shareWithWebAPI}
                        className="w-full mb-4 px-6 py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all flex items-center justify-center gap-3"
                      >
                        <Share2 size={24} />
                        Share to Any App
                      </button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={shareToFacebook}
                        className="flex items-center justify-center gap-3 px-6 py-4 bg-[#1877F2] text-white font-semibold rounded-lg hover:opacity-90 transition-all"
                      >
                        <Facebook size={24} />
                        Facebook
                      </button>
                      <button
                        onClick={shareToInstagram}
                        className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#E4405F] to-[#F77737] text-white font-semibold rounded-lg hover:opacity-90 transition-all"
                      >
                        <Instagram size={24} />
                        Instagram
                      </button>
                      <button
                        onClick={shareToTwitter}
                        className="flex items-center justify-center gap-3 px-6 py-4 bg-black text-white font-semibold rounded-lg hover:opacity-90 transition-all"
                      >
                        <Twitter size={24} />X (Twitter)
                      </button>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>How it works:</strong>
                        <br />
                        • Mobile: Use "Share to Any App" for instant sharing or
                        select a platform
                        <br />
                        • Desktop: Image downloads automatically, platform
                        opens, then upload and paste caption
                        <br />• Caption is auto-copied to clipboard when you
                        click a platform
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <canvas ref={canvasRef} className="hidden" />
          </div>
        </main>
        <Footer />
      </div>
    </FarmProvider>
  );
}
