"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FarmProvider } from "@/lib/contexts/FarmContext";
import { Camera, Upload, Download, Copy, Check, X } from "lucide-react";
import { FarmConfig } from "@/lib/types/farm";
import farmConfigData from "@/app/farms/farmer-joe/config.json";
import { postSocialShare } from "@/lib/services/socialService";
import { applyFrame, getFrameDimensions } from "@/lib/utils/frameRenderer";
import { FRAMES } from "@/lib/constants";

const farmConfig = farmConfigData as FarmConfig;
const HASHTAGS = (farmConfig as any).hashtags || [];
const DEFAULT_CAPTION =
  (farmConfig as any).defaultCaption ||
  "Experience the pure taste of farm-fresh dairy! 🥛";

export default function SocialPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState(DEFAULT_CAPTION);
  const [selectedFrame, setSelectedFrame] = useState<string>("none");
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [apiTriggered, setApiTriggered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
    }
  }, []);

  useEffect(() => {
    if (selectedImage && selectedFrame) {
      generatePreview();
    }
  }, [selectedFrame]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setShowPreview(true);
        setFinalImage(null);
        setApiTriggered(false);
        setSelectedHashtags([]);
        setSelectedFrame("none");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHashtagClick = (hashtag: string) => {
    if (selectedHashtags.includes(hashtag)) {
      setSelectedHashtags(selectedHashtags.filter((h) => h !== hashtag));
      setCaption((prevCaption) =>
        prevCaption.replace(hashtag, "").replace(/\s+/g, " ").trim()
      );
    } else {
      setSelectedHashtags([...selectedHashtags, hashtag]);
      setCaption((prevCaption) => {
        const separator = prevCaption.trim().endsWith(" ") ? "" : " ";
        return prevCaption + separator + hashtag;
      });
    }
  };

  const generatePreview = async () => {
    if (!selectedImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = 1080;
      canvas.height = 1080;

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const imgSize = Math.min(img.width, img.height);
      const sx = (img.width - imgSize) / 2;
      const sy = (img.height - imgSize) / 2;

      const dimensions = getFrameDimensions(selectedFrame, canvas.width);
      ctx.drawImage(
        img,
        sx,
        sy,
        imgSize,
        imgSize,
        dimensions.targetX,
        dimensions.targetY,
        dimensions.targetSize,
        dimensions.targetSize
      );

      applyFrame(ctx, canvas, selectedFrame);

      const dataUrl = canvas.toDataURL("image/png", 1.0);
      setPreviewImage(dataUrl);
    };
    img.src = selectedImage;
  };

  const generatePostImage = async () => {
    if (!selectedImage || !canvasRef.current) return;

    setIsGenerating(true);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        canvas.width = 1080;
        canvas.height = 1080;

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const imgSize = Math.min(img.width, img.height);
        const sx = (img.width - imgSize) / 2;
        const sy = (img.height - imgSize) / 2;

        const dimensions = getFrameDimensions(selectedFrame, canvas.width);
        ctx.drawImage(
          img,
          sx,
          sy,
          imgSize,
          imgSize,
          dimensions.targetX,
          dimensions.targetY,
          dimensions.targetSize,
          dimensions.targetSize
        );

        applyFrame(ctx, canvas, selectedFrame);

        const dataUrl = canvas.toDataURL("image/png", 1.0);
        setFinalImage(dataUrl);
        setIsGenerating(false);
      };
      img.src = selectedImage;
    } catch (error) {
      console.error("Error generating image:", error);
      setIsGenerating(false);
    }
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

  const triggerAPI = async () => {
    if (apiTriggered || !finalImage) {
      return;
    }

    try {
      setApiTriggered(true);
      const blob = dataURLtoBlob(finalImage);
      const data = await postSocialShare(blob, caption);
      console.log("API Response:", data);
    } catch (error) {
      console.error("API Error:", error);
      setApiTriggered(false);
    }
  };

  const downloadImage = async () => {
    if (!finalImage) return;
    await triggerAPI();
    const link = document.createElement("a");
    link.download = "farmer-joe-post.png";
    link.href = finalImage;
    link.click();
  };

  const shareToWhatsApp = async () => {
    if (!finalImage) return;
    await triggerAPI();
    await copyToClipboard();

    const encodedText = encodeURIComponent(caption);

    if (isMobile && navigator.share) {
      const blob = dataURLtoBlob(finalImage);
      const file = new File([blob], "farmer-joe-post.png", {
        type: "image/png",
      });
      try {
        await navigator.share({
          files: [file],
          text: caption,
        });
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Share failed:", err);
          const whatsappUrl = isMobile
            ? `whatsapp://send?text=${encodedText}`
            : `https://web.whatsapp.com/send?text=${encodedText}`;
          window.open(whatsappUrl, "_blank");
        }
      }
    } else {
      const whatsappUrl = isMobile
        ? `whatsapp://send?text=${encodedText}`
        : `https://web.whatsapp.com/send?text=${encodedText}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setShowPreview(false);
    setPreviewImage(null);
    setFinalImage(null);
    setCaption(DEFAULT_CAPTION);
    setSelectedFrame("none");
    setSelectedHashtags([]);
    setApiTriggered(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  return (
    <FarmProvider config={farmConfig}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-green-50 to-orange-100">
        <Header />
        <main className="flex-1 w-full py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-orange-700">
                Create Social Media Post
              </h1>
              <p className="text-lg text-gray-700">
                Share the goodness of Farmer Joe's dairy products!
              </p>
            </div>

            {!showPreview ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  Upload Your Photo
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all text-sm"
                  >
                    <Upload size={20} />
                    <span>Upload from Device</span>
                  </button>
                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex flex-col items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all text-sm"
                  >
                    <Camera size={20} />
                    <span>{isMobile ? "Take Photo" : "Upload Photo"}</span>
                  </button>
                </div>
                {!isMobile && (
                  <p className="text-xs text-gray-500 mt-4 text-center">
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
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {finalImage ? "Share Your Post" : "Create Your Post"}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {!finalImage ? (
                  <div className="space-y-6">
                    <div className="relative w-full max-w-md mx-auto">
                      <img
                        src={previewImage || selectedImage!}
                        alt="Preview"
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Choose a Frame
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {FRAMES.map((frame) => (
                          <button
                            key={frame.id}
                            onClick={() => setSelectedFrame(frame.id)}
                            className={`p-4 rounded-xl border-2 transition-all text-center ${
                              selectedFrame === frame.id
                                ? "border-orange-600 bg-orange-50 shadow-lg scale-105"
                                : "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-25"
                            }`}
                          >
                            <div
                              className={`font-bold mb-1 ${
                                selectedFrame === frame.id
                                  ? "text-orange-600"
                                  : "text-gray-800"
                              }`}
                            >
                              {frame.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {frame.description}
                            </div>
                            {selectedFrame === frame.id && (
                              <div className="mt-2">
                                <Check className="w-5 h-5 text-orange-600 mx-auto" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Edit Caption
                      </label>
                      <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-gray-800"
                        placeholder="Enter your caption and hashtags..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Add Hashtags
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {HASHTAGS.map((hashtag: string) => (
                          <button
                            key={hashtag}
                            onClick={() => handleHashtagClick(hashtag)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                              selectedHashtags.includes(hashtag)
                                ? "bg-orange-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700"
                            }`}
                          >
                            {hashtag}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Click hashtags to add/remove from caption
                      </p>
                    </div>

                    <button
                      onClick={generatePostImage}
                      disabled={isGenerating}
                      className="w-full px-6 py-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all disabled:opacity-50"
                    >
                      {isGenerating ? "Generating..." : "Generate Post"}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative w-full max-w-md mx-auto">
                      <img
                        src={finalImage}
                        alt="Final Post"
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    </div>

                    <button
                      onClick={() => {
                        setFinalImage(null);
                        setApiTriggered(false);
                      }}
                      className="w-full px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                    >
                      Edit Again
                    </button>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">
                          Your Caption
                        </span>
                        <button
                          onClick={copyToClipboard}
                          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          {copiedCaption ? (
                            <>
                              <Check size={16} />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={16} />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-gray-800 whitespace-pre-wrap text-sm">
                        {caption}
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t">
                      <h3 className="text-lg font-bold text-gray-800">
                        Share Your Post
                      </h3>

                      <button
                        onClick={shareToWhatsApp}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#20BA5A] transition-all"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="w-6 h-6 fill-current"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        Share on WhatsApp
                      </button>

                      <button
                        onClick={downloadImage}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-800 transition-all"
                      >
                        <Download size={24} />
                        Download Post
                      </button>

                      {apiTriggered && (
                        <div className="text-center text-sm text-green-600 font-semibold">
                          ✓ Post logged successfully!
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />
          </div>
        </main>
        <Footer />
      </div>
    </FarmProvider>
  );
}
