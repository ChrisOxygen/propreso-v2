import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AuthMobileHeader() {
  return (
    <div className="flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-[7px] flex items-center justify-center shrink-0 bg-linear-to-br from-[#C8491A] to-[#E06030] shadow-[0_0_16px_rgba(200,73,26,0.3),0_2px_4px_rgba(0,0,0,0.15)]">
          <Image
            src="/assets/site-icon-white.svg"
            alt="Propreso"
            width={11}
            height={14}
            className="shrink-0"
          />
        </div>
        <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground [font-family:var(--font-space-grotesk)]">
          Propreso
        </span>
      </div>

      {/* Back to website */}
      <Link
        href="/"
        className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground hover:text-text-secondary transition-colors duration-150 [font-family:var(--font-space-grotesk)] border border-border hover:border-border-strong rounded-full px-3 py-1"
      >
        <ArrowLeft size={13} />
        Back to website
      </Link>
    </div>
  );
}
