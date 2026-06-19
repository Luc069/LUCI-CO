"use client"

import { useCallback, useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const defaultMorphTime = 0.85
const defaultCooldownTime = 3
const maxBlur = 1.5

const useMorphingText = (
  texts: string[],
  morphTime = defaultMorphTime,
  cooldownTime = defaultCooldownTime
) => {
  const textIndexRef = useRef(0)
  const morphRef = useRef(0)
  const cooldownRef = useRef(0)
  const timeRef = useRef(new Date())

  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current]
      if (!current1 || !current2) return

      current2.style.filter = `blur(${(1 - fraction) * maxBlur}px)`
      current2.style.opacity = `${fraction * 100}%`
      current2.style.transform = `translateY(${(1 - fraction) * 0.25}em)`

      const invertedFraction = 1 - fraction
      current1.style.filter = `blur(${fraction * maxBlur}px)`
      current1.style.opacity = `${invertedFraction * 100}%`
      current1.style.transform = `translateY(${-fraction * 0.2}em)`

      current1.textContent = texts[textIndexRef.current % texts.length]
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length]
    },
    [texts]
  )

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current
    cooldownRef.current = 0

    let fraction = morphRef.current / morphTime

    if (fraction > 1) {
      cooldownRef.current = cooldownTime
      fraction = 1
    }

    setStyles(fraction)

    if (fraction === 1) {
      textIndexRef.current++
    }
  }, [cooldownTime, morphTime, setStyles])

  const doCooldown = useCallback(() => {
    morphRef.current = 0
    const [current1, current2] = [text1Ref.current, text2Ref.current]
    if (current1 && current2) {
      current2.style.filter = "none"
      current2.style.opacity = "100%"
      current2.style.transform = "translateY(0)"
      current1.style.filter = "none"
      current1.style.opacity = "0%"
      current1.style.transform = "translateY(0)"
    }
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const newTime = new Date()
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000
      timeRef.current = newTime

      cooldownRef.current -= dt

      if (cooldownRef.current <= 0) doMorph()
      else doCooldown()
    }

    animate()
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [doMorph, doCooldown])

  return { text1Ref, text2Ref }
}

interface MorphingTextProps {
  className?: string
  texts: string[]
  morphTime?: number
  cooldownTime?: number
}

const Texts: React.FC<
  Pick<MorphingTextProps, "cooldownTime" | "morphTime" | "texts">
> = ({ texts, morphTime, cooldownTime }) => {
  const { text1Ref, text2Ref } = useMorphingText(
    texts,
    morphTime,
    cooldownTime
  )
  return (
    <>
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text1Ref}
      />
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text2Ref}
      />
    </>
  )
}

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className,
  morphTime,
  cooldownTime,
}) => (
  <div
    className={cn(
      "relative mx-auto h-16 w-full max-w-3xl overflow-hidden text-center font-sans text-[40pt] leading-none font-bold md:h-24 lg:text-[6rem]",
      className
    )}
  >
    <Texts texts={texts} morphTime={morphTime} cooldownTime={cooldownTime} />
  </div>
)
