import { useEffect, useState } from "react";

type ApiResponse = {
  magicNumber: {
    num: number;
  };
};

const RESET_TIME = 3;

const MagicCard = () => {
  const [magicNumber, setMagicNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [countdown, setCountdown] = useState<number>(RESET_TIME);

  const revealMagicNumber = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/magic-num");
      const data: ApiResponse = await res.json();

      setMagicNumber(data.magicNumber.num);
      setUnlocked(true);
      setLoading(false);
      setCountdown(RESET_TIME);
    } catch (error) {
      console.error("API error:", error);
      setLoading(false);
    }
  };

  // countdown + reset logic
  useEffect(() => {
    if (!unlocked) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      setUnlocked(false);
      setMagicNumber(null);
      setCountdown(RESET_TIME);
    }

    return () => clearInterval(interval);
  }, [unlocked, countdown]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-72 h-96 bg-white rounded-3xl border-2 border-black flex flex-col items-center justify-center gap-6">
        {/* Circle */}
        <div className="w-40 h-40 rounded-full border-2 border-black flex items-center justify-center transition-all duration-500">
          {!unlocked ? (
            <span className="text-4xl">{loading ? "🔓" : "🔒"}</span>
          ) : (
            <span className="text-5xl font-bold animate-fade-in">
              {magicNumber}
            </span>
          )}
        </div>

        {/* Countdown message */}
        {unlocked && (
          <p className="text-sm text-gray-600 animate-fade-in">
            Will be gone in <span className="font-semibold">{countdown}</span>
          </p>
        )}

        {/* Button */}
        <button
          onClick={revealMagicNumber}
          disabled={loading || unlocked}
          className="px-6 py-3 border-2 border-black rounded-xl text-lg font-medium
          hover:bg-black hover:text-white transition disabled:opacity-50"
        >
          Reveal Magic Number
        </button>
      </div>
    </div>
  );
};

export default MagicCard;
